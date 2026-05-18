const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'volunteer original', 'volunteermedicalcorps.org');

function extractCampaigns() {
    const campaigns = [];
    
    // From donation/
    const donationDir = path.join(baseDir, 'donation');
    if (fs.existsSync(donationDir)) {
        const files = fs.readdirSync(donationDir).filter(f => f.endsWith('.html') && f !== 'GET.html');
        files.forEach(file => {
            try {
                const content = fs.readFileSync(path.join(donationDir, file), 'utf8');
                const title = content.match(/<h2><span style="color: #FFF">([\s\S]*?)<\/span><\/h2>/)?.[1].trim() || 
                              content.match(/<title>([\s\S]*?) - Volunteer Medical Corps<\/title>/)?.[1].trim();
                const description = content.match(/<p style="color: #000">([\s\S]*?)<\/p>/)?.[1].trim();
                const image = content.match(/<img src="(\.\.\/give\/images\/projects\/[\s\S]*?)"/)?.[1];
                const goal = content.match(/Goal: \$([\d,]+)/)?.[1]?.replace(/,/g, '');

                if (title) {
                    campaigns.push({
                        title,
                        description: description || "Join us to save more lives. Give Now!",
                        image: image ? image.replace('../', '/') : "/logo.png",
                        category: "Medical Projects",
                        region: "Global",
                        target: goal ? parseFloat(goal) : 100000,
                        raised: 0,
                        isActive: true
                    });
                }
            } catch (e) {}
        });
    }

    // From causes/
    const causesDir = path.join(baseDir, 'causes');
    if (fs.existsSync(causesDir)) {
        const categories = fs.readdirSync(causesDir).filter(d => fs.lstatSync(path.join(causesDir, d)).isDirectory());
        categories.forEach(cat => {
            const catDir = path.join(causesDir, cat);
            const files = fs.readdirSync(catDir).filter(f => f.endsWith('.html'));
            files.forEach(file => {
                try {
                    const content = fs.readFileSync(path.join(catDir, file), 'utf8');
                    const title = content.match(/<h2 class="page-title">([\s\S]*?)<\/h2>/)?.[1].trim();
                    const description = content.match(/<div class="causes-details-text mb-30">[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1]?.trim();
                    const image = content.match(/<div class="causes-details-img mb-30">[\s\S]*?<img src="([\s\S]*?)"/)?.[1];
                    
                    if (title) {
                        campaigns.push({
                            title,
                            description: description || "",
                            image: image ? image.replace('../../', '/') : "/logo.png",
                            category: cat.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                            region: "Global",
                            target: 50000,
                            raised: 0,
                            isActive: true
                        });
                    }
                } catch (e) {}
            });
        });
    }
    return campaigns;
}

function extractMedia() {
    const mediaDir = path.join(baseDir, 'view-media');
    const news = [], blogs = [];
    const titlesSeen = new Set();

    if (!fs.existsSync(mediaDir)) return { news, blogs };
    const dirs = fs.readdirSync(mediaDir).filter(d => fs.lstatSync(path.join(mediaDir, d)).isDirectory());
    
    dirs.forEach(dir => {
        try {
            const folderFiles = fs.readdirSync(path.join(mediaDir, dir));
            const htmlFile = folderFiles.find(f => f.endsWith('.html') && f !== 'index.html') || folderFiles.find(f => f.endsWith('.html'));
            if (!htmlFile) return;
            const content = fs.readFileSync(path.join(mediaDir, dir, htmlFile), 'utf8');
            const titleMatch = content.match(/<h3 class="blog-title mb-20">[\s\S]*?<a[\s\S]*?>([\s\S]*?)<\/a>/) || 
                               content.match(/<title>([\s\S]*?) - Volunteer Medical Corps<\/title>/);
            const title = titleMatch?.[1].trim();
            if (!title || titlesSeen.has(title)) return;
            titlesSeen.add(title);

            const bodyMatch = content.match(/<div style="text-align: justify;[\s\S]*?">([\s\S]*?)<\/div>/);
            const body = bodyMatch ? bodyMatch[1].trim() : "";
            const image = content.match(/<div class="blog__thumb mb-35">[\s\S]*?<img src="([\s\S]*?)"/)?.[1];
            const dateStr = content.match(/<i class="far fa-calendar-alt"><\/i>\s*([\s\S]*?)\s*<\/li>/)?.[1].trim();
            const category = content.match(/<a class="tag"[\s\S]*?>([\s\S]*?)<\/a>/)?.[1].trim();
            
            const date = dateStr ? new Date(dateStr) : new Date();
            const item = { 
                title, 
                content: body || "Read more about this story...", 
                image: image ? image.replace('../../', '/') : "/logo.png", 
                date: isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(), 
                category: category || "News", 
                isActive: true 
            };
            if (category === 'Blog') blogs.push(item); else news.push(item);
        } catch (e) {}
    });
    return { news, blogs };
}

function extractEvents() {
    const eventsDir = path.join(baseDir, 'view-event');
    if (!fs.existsSync(eventsDir)) return [];
    const dirs = fs.readdirSync(eventsDir).filter(d => fs.lstatSync(path.join(eventsDir, d)).isDirectory());
    const events = [];
    dirs.forEach(dir => {
        try {
            const folderFiles = fs.readdirSync(path.join(eventsDir, dir));
            const htmlFile = folderFiles.find(f => f.endsWith('.html'));
            if (!htmlFile) return;
            const content = fs.readFileSync(path.join(eventsDir, dir, htmlFile), 'utf8');
            const title = content.match(/<h2 class="page-title">([\s\S]*?)<\/h2>/)?.[1].trim();
            const description = content.match(/<div class="event-details-content[\s\S]*?">([\s\S]*?)<\/div>/)?.[1]?.trim();
            if (title) events.push({ title, description: description || "", date: new Date().toISOString(), isActive: true });
        } catch (e) {}
    });
    return events;
}

function extractTestimonials() {
    const testimonials = [];
    try {
        const filePath = path.join(baseDir, 'testimonials.html');
        if (!fs.existsSync(filePath)) return [];
        const content = fs.readFileSync(filePath, 'utf8');
        const items = content.match(/<div class="card-body mb-10">[\s\S]*?<\/div>/g) || [];
        items.forEach(item => {
            const name = item.match(/<h4 class="semi-02-title">([\s\S]*?)<\/h4>/)?.[1].trim();
            const body = item.match(/<p>([\s\S]*?)<\/p>/)?.[1].trim();
            const image = item.match(/<img src="([\s\S]*?)"/)?.[1];
            const meta = item.match(/<small[\s\S]*?>([\s\S]*?)<\/small>/)?.[1].trim();
            if (name && body) testimonials.push({ name, content: body, image: image || "/logo.png", role: meta || "" });
        });
    } catch (e) {}
    return testimonials;
}

function extractGallery() {
    const gallery = [];
    try {
        const filePath = path.join(baseDir, 'gallery.html');
        if (!fs.existsSync(filePath)) return [];
        const content = fs.readFileSync(filePath, 'utf8');
        const items = content.match(/<div class="gallery pos-rel text-center[\s\S]*?<\/div>\s*<\/div>/g) || [];
        items.forEach(item => {
            const title = item.match(/<h3><a[\s\S]*?>([\s\S]*?)<\/a><\/h3>/)?.[1].trim();
            const image = item.match(/<img src="([\s\S]*?)"/)?.[1];
            if (image) gallery.push({ title: title || "", imageUrl: image, type: "IMAGE", isActive: true });
        });
    } catch (e) {}
    return gallery;
}

function extractVolunteers() {
    const volunteers = [];
    const sqlPath = path.join(process.cwd(), 'tbl_volunteers18may2026.sql');
    if (!fs.existsSync(sqlPath)) return [];

    try {
        const content = fs.readFileSync(sqlPath, 'utf8');
        // The SQL file can be very large, let's process it more carefully if needed
        // For now, let's use a regex that matches multi-line INSERT values
        const insertMatch = content.match(/INSERT INTO `tbl_volunteers` .*? VALUES\s*([\s\S]*?);/g);
        
        if (insertMatch) {
            insertMatch.forEach(match => {
                const valuesStr = match.replace(/INSERT INTO `tbl_volunteers` .*? VALUES\s*/, '').replace(/;$/, '');
                // Match (val1, val2, ...) records
                const records = valuesStr.match(/\(([^)]+)\)/g);
                if (records) {
                    records.forEach(record => {
                        const cleanRecord = record.slice(1, -1);
                        // Split by comma, handling quoted strings
                        const fields = cleanRecord.match(/'(?:''|[^'])*'|[^,]+/g).map(f => f.trim().replace(/^'|'$/g, '').replace(/''/g, "'"));
                        
                        if (fields[4] && fields[4].includes('@')) {
                            volunteers.push({
                                vid: fields[1],
                                firstName: fields[2],
                                lastName: fields[3],
                                email: fields[4],
                                phone: fields[5],
                                bio: fields[6],
                                password: fields[7],
                                image: fields[8],
                                gender: fields[9],
                                dob: fields[10],
                                profession: fields[11],
                                qualification: fields[12],
                                preferredRole: fields[13],
                                church: fields[14],
                                location: fields[15],
                                country: fields[16],
                                bloodGroup: fields[17],
                                newsletter: fields[18] === '1',
                                stats: parseInt(fields[20]) || 0,
                                dateJoined: fields[21],
                                timeJoined: fields[22],
                                ref: fields[23]
                            });
                        }
                    });
                }
            });
        }
    } catch (e) {
        console.error("Error extracting volunteers:", e);
    }
    return volunteers;
}

const data = {
    campaigns: extractCampaigns(),
    ...extractMedia(),
    events: extractEvents(),
    gallery: extractGallery(),
    testimonials: extractTestimonials(),
    volunteers: extractVolunteers()
};

fs.writeFileSync('extracted_data.json', JSON.stringify(data, null, 2));
console.log(`Extraction complete. Campaigns: ${data.campaigns.length}, News: ${data.news.length}, Blogs: ${data.blogs.length}, Events: ${data.events.length}, Gallery: ${data.gallery.length}, Testimonials: ${data.testimonials.length}, Volunteers: ${data.volunteers.length}`);
