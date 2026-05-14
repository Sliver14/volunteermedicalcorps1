const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'src', 'volunteer original', 'volunteermedicalcorps.org');

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
    if (!fs.existsSync(mediaDir)) return { news: [], blogs: [] };
    const dirs = fs.readdirSync(mediaDir).filter(d => fs.lstatSync(path.join(mediaDir, d)).isDirectory());
    const news = [], blogs = [];
    dirs.forEach(dir => {
        try {
            const folderFiles = fs.readdirSync(path.join(mediaDir, dir));
            const htmlFile = folderFiles.find(f => f.endsWith('.html') && f !== 'index.html') || folderFiles.find(f => f.endsWith('.html'));
            if (!htmlFile) return;
            const content = fs.readFileSync(path.join(mediaDir, dir, htmlFile), 'utf8');
            const title = content.match(/<h3 class="blog-title mb-20">[\s\S]*?<a[\s\S]*?>([\s\S]*?)<\/a>/)?.[1].trim();
            const body = content.match(/<div style="text-align: justify;[\s\S]*?">([\s\S]*?)<\/div>/)?.[1].trim();
            const image = content.match(/<div class="blog__thumb mb-35">[\s\S]*?<img src="([\s\S]*?)"/)?.[1];
            const dateStr = content.match(/<i class="far fa-calendar-alt"><\/i>\s*([\s\S]*?)\s*<\/li>/)?.[1].trim();
            const category = content.match(/<a class="tag"[\s\S]*?>([\s\S]*?)<\/a>/)?.[1].trim();
            if (title && body) {
                const date = dateStr ? new Date(dateStr) : new Date();
                const item = { title, content: body, image: image ? image.replace('../../', '/') : "/logo.png", date: isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(), category: category || "News", isActive: true };
                if (category === 'Blog') blogs.push(item); else news.push(item);
            }
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

const data = {
    campaigns: extractCampaigns(),
    ...extractMedia(),
    events: extractEvents(),
    gallery: extractGallery(),
    testimonials: extractTestimonials()
};

fs.writeFileSync('extracted_data.json', JSON.stringify(data, null, 2));
console.log(`Extraction complete. Campaigns: ${data.campaigns.length}, News: ${data.news.length}, Blogs: ${data.blogs.length}, Events: ${data.events.length}, Gallery: ${data.gallery.length}, Testimonials: ${data.testimonials.length}`);
