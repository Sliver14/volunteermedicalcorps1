const fs = require('fs');
const path = require('path');

const EXTRACTED_DATA_PATH = path.join(__dirname, 'extracted_data.json');
const TBL_EVENTS_SQL_PATH = path.join(__dirname, 'tbl_events.sql');
const LEARNING_DB_SQL_PATH = path.join(__dirname, 'volunteermedic_learning_db.sql');
const OUTPUT_PATH = path.join(__dirname, 'ready_to_seed.json');

function parseSqlInsert(sqlContent, tableName) {
    const regex = new RegExp(`INSERT INTO \`${tableName}\` \\((.*?)\\) VALUES[\\s\\S]*?;`, 'g');
    let match;
    const results = [];

    while ((match = regex.exec(sqlContent)) !== null) {
        const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
        const valuesPart = match[0].substring(match[0].indexOf('VALUES') + 6).trim().slice(0, -1);
        
        // Split values by rows, handling nested parentheses in strings is tricky
        // Simple split by '),(' might fail if it exists in strings
        // But for these SQL dumps it's usually safe or we can use a more advanced approach
        const rows = [];
        let currentRow = '';
        let inString = false;
        let parenLevel = 0;

        for (let i = 0; i < valuesPart.length; i++) {
            const char = valuesPart[i];
            if (char === "'" && valuesPart[i - 1] !== "\\") {
                inString = !inString;
            }
            if (!inString) {
                if (char === '(') parenLevel++;
                if (char === ')') parenLevel--;
            }

            if (char === ',' && !inString && parenLevel === 0) {
                rows.push(currentRow.trim());
                currentRow = '';
            } else {
                currentRow += char;
            }
        }
        if (currentRow) rows.push(currentRow.trim());

        for (let row of rows) {
            row = row.trim();
            if (row.startsWith('(') && row.endsWith(')')) {
                row = row.substring(1, row.length - 1);
            }
            
            const vals = [];
            let currentVal = '';
            let inStr = false;
            for (let i = 0; i < row.length; i++) {
                const char = row[i];
                if (char === "'" && row[i - 1] !== "\\") {
                    inStr = !inStr;
                }
                if (char === ',' && !inStr) {
                    vals.push(currentVal.trim());
                    currentVal = '';
                } else {
                    currentVal += char;
                }
            }
            if (currentVal) vals.push(currentVal.trim());

            const obj = {};
            columns.forEach((col, index) => {
                let val = vals[index];
                if (val === undefined) return;
                
                if (val === 'NULL') {
                    val = null;
                } else if (val.startsWith("'") && val.endsWith("'")) {
                    val = val.substring(1, val.length - 1).replace(/\\'/g, "'").replace(/\\r/g, '\r').replace(/\\n/g, '\n');
                } else if (val.startsWith('0x')) {
                    try {
                        val = Buffer.from(val.substring(2), 'hex').toString('utf8');
                    } catch (e) {
                        // keep as is if not valid hex string
                    }
                } else if (!isNaN(val)) {
                    val = Number(val);
                }
                obj[col] = val;
            });
            results.push(obj);
        }
    }
    return results;
}

async function prepareData() {
    console.log('Reading files...');
    const extractedData = JSON.parse(fs.readFileSync(EXTRACTED_DATA_PATH, 'utf8'));
    const tblEventsSql = fs.readFileSync(TBL_EVENTS_SQL_PATH, 'utf8');
    const learningDbSql = fs.readFileSync(LEARNING_DB_SQL_PATH, 'utf8');

    console.log('Parsing SQL files...');
    const sqlEvents = parseSqlInsert(tblEventsSql, 'tbl_events');
    const sqlUsers = parseSqlInsert(learningDbSql, 'users');
    const sqlCategories = parseSqlInsert(learningDbSql, 'tbl_categories');
    const sqlCourses = parseSqlInsert(learningDbSql, 'tbl_courses');
    const sqlLessons = parseSqlInsert(learningDbSql, 'tbl_lessons');
    const sqlInstructors = parseSqlInsert(learningDbSql, 'tbl_instructors');
    const sqlMyCourses = parseSqlInsert(learningDbSql, 'tbl_mycourses');

    console.log('Processing Users and Volunteers...');
    const usersMap = new Map();

    // 1. Add users from SQL
    sqlUsers.forEach(u => {
        if (!u.email) return;
        const email = u.email.toLowerCase().trim();
        usersMap.set(email, {
            email,
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim(),
            password: u.password || 'password123', // Default if missing
            role: u.role_id === 1 ? 'ADMIN' : 'USER',
            profile: {
                firstName: u.first_name,
                lastName: u.last_name,
                bio: u.biography,
                title: u.title,
                status: u.status === 1 ? 'Active' : 'Pending'
            }
        });
    });

    // 2. Add volunteers from JSON and merge
    extractedData.volunteers.forEach(v => {
        if (!v.email) return;
        const email = v.email.toLowerCase().trim();
        const existing = usersMap.get(email);

        const profileData = {
            vid: v.vid,
            firstName: v.firstName || v.first_name,
            lastName: v.lastName || v.last_name,
            phone: v.phone,
            gender: v.gender,
            dob: v.dob,
            profession: v.profession,
            qualification: v.qualification,
            preferredRole: v.preferredRole,
            church: v.church,
            location: v.location,
            country: v.country,
            bloodGroup: v.bloodGroup,
            newsletter: !!v.newsletter,
            stats: v.stats || 0,
            bio: v.bio,
            avatar: v.image === 'default-avatar.jpg' ? null : v.image,
            dateJoined: v.dateJoined ? new Date(v.dateJoined) : new Date(),
            timeJoined: v.timeJoined,
            ref: v.ref
        };

        if (existing) {
            existing.role = 'VOLUNTEER';
            existing.profile = { ...existing.profile, ...profileData };
        } else {
            usersMap.set(email, {
                email,
                name: `${v.firstName || ''} ${v.lastName || ''}`.trim(),
                password: v.password || 'password123',
                role: 'VOLUNTEER',
                profile: profileData
            });
        }
    });

    console.log('Processing Instructors...');
    const instructors = sqlInstructors.map(i => ({
        iid: i.instructor_iid,
        firstName: i.instructor_fname,
        lastName: i.instructor_lname,
        email: i.instructor_email,
        phone: i.instructor_phone,
        bio: i.instructor_bio,
        discipline: i.instructor_discipline,
        qualification: i.instructor_qualification,
        avatar: i.instructor_img,
        country: i.instructor_country,
        facebook: i.instructor_facebook,
        twitter: i.instructor_twitter,
        linkedin: i.instructor_linkedin,
        instagram: i.instructor_instagram
    }));

    // Add instructors to users if they don't exist
    instructors.forEach(inst => {
        const email = inst.email.toLowerCase().trim();
        if (!usersMap.has(email)) {
            usersMap.set(email, {
                email,
                name: `${inst.firstName} ${inst.lastName}`,
                password: 'password123',
                role: 'INSTRUCTOR'
            });
        } else {
            usersMap.get(email).role = 'INSTRUCTOR';
        }
    });

    console.log('Processing Categories...');
    const categories = sqlCategories.map(c => ({
        cid: c.cat_cid,
        name: c.cat_name
    }));

    console.log('Processing Courses...');
    const courses = sqlCourses.map(c => ({
        cid: c.cours_cid,
        title: c.cours_title,
        brief: c.cours_brief,
        description: c.cours_desc,
        image: c.cours_img,
        price: parseFloat(c.cours_fee) || 0,
        duration: c.cours_duration,
        level: c.cours_level,
        categoryId: c.cours_catid, // This is the old cat_id, will need matching in seed
        instructorId: c.cours_iid, // Old instructor_iid
        isActive: c.cours_stats === 1
    }));

    console.log('Processing Lessons...');
    const lessons = sqlLessons.map(l => ({
        lid: l.lesson_lid,
        title: l.lesson_title,
        content: l.lesson_desc,
        videoUrl: l.lesson_video,
        duration: l.lesson_duration,
        courseId: l.lesson_cid // Old cours_cid
    }));

    console.log('Merging Events...');
    const eventsMap = new Map();
    
    // Add events from extracted_data.json
    extractedData.events.forEach(e => {
        eventsMap.set(e.title, {
            eid: e.eid || null,
            title: e.title,
            brief: e.brief,
            description: e.description,
            image: e.image,
            location: e.location,
            date: e.date ? new Date(e.date) : new Date(),
            startDate: e.startDate,
            endDate: e.endDate,
            startTime: e.startTime,
            endTime: e.endTime,
            isLive: !!e.isLive,
            isActive: true,
            volOnly: !!e.volOnly
        });
    });

    // Merge/Overwrite with SQL events (more detailed)
    sqlEvents.forEach(e => {
        const dateStr = e.events_startdate && e.events_startdate.includes('-') ? e.events_startdate : e.events_date;
        eventsMap.set(e.events_title, {
            eid: e.events_eid,
            title: e.events_title,
            brief: e.events_brief,
            description: e.events_desc,
            image: e.events_img1,
            location: e.events_type === 'offline' ? 'Physical' : 'Online',
            date: dateStr ? new Date(dateStr) : new Date(),
            startDate: e.events_startdate,
            endDate: e.events_enddate,
            startTime: e.events_starttime,
            endTime: e.events_endtime,
            isLive: e.events_stats === 1,
            isActive: true,
            volOnly: e.events_volonly === 1
        });
    });

    console.log('Finalizing Data...');
    const campaignIdMap = {
      "1 Million Smiles": "EUT-254138",
      "Mosquito Nets & Repellants": "MIR-092003",
      "Mother & Baby Care Kits": "MBB-475564",
      "Medical Kits/Hygiene Packs/Medical outreaches": "MEO-192993",
      "Sponsor a Good Deeds Project Today!": "RTS-837822",
      "Adopt a Community Health Extension Worker": "PMJ-328791",
      "Sponsor Relief Missions": "CXK-145723",
      "Adopt a Hospital/Community Clinic": "CUR-139658",
      "Sponsor VMC Free Surgeries": "EUB-254139"
    };

    const processedCampaigns = extractedData.campaigns.map(c => {
      const id = campaignIdMap[c.title];
      return id ? { ...c, id } : c;
    });

    const finalData = {
        users: Array.from(usersMap.values()),
        instructors,
        categories,
        courses,
        lessons,
        events: Array.from(eventsMap.values()),
        campaigns: processedCampaigns,
        news: extractedData.news,
        blogs: extractedData.blogs,
        gallery: extractedData.gallery,
        testimonials: extractedData.testimonials
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData, null, 2));
    console.log(`Data prepared successfully! Saved to ${OUTPUT_PATH}`);
    console.log(`Total Users: ${finalData.users.length}`);
    console.log(`Total Events: ${finalData.events.length}`);
    console.log(`Total Courses: ${finalData.courses.length}`);
}

prepareData().catch(err => {
    console.error('Error preparing data:', err);
    process.exit(1);
});
