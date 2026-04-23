const fs = require('fs');
const path = require('path');

const authenticImages = [
  "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg",
  "https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg",
  "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg",
  "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg",
  "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg",
  "https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg",
  "https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg",
  "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
  "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg",
  "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg"
];

const dummyPatterns = [
  /\/give-15-768x512\.jpg/g,
  /\/give-17-300x200\.jpg/g,
  /\/give-20-768x512\.jpg/g,
  /\/sw-post-1-min-768x512\.jpg/g,
  /\/sw-post-3-min-300x200\.jpg/g,
  /\/vcn-post-7-min-768x512\.jpg/g,
  /\/pmr-bg-slide\.jpg/g,
  /\/pmr-bg-mission\.jpg/g
];

function getRandomImage() {
  return authenticImages[Math.floor(Math.random() * authenticImages.length)];
}

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.tsx')) {
      callback(fullPath);
    }
  });
}

walk('src', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  dummyPatterns.forEach(pattern => {
    content = content.replace(pattern, () => getRandomImage());
  });
  
  // also add unoptimized if it's missing in <Image> tags after replacing, since external URLs need it
  content = content.replace(/(<Image[^>]+)(>)/g, (match, p1, p2) => {
      if (match.includes('unoptimized') || !match.includes('volunteermedicalcorps.org')) {
          return match;
      }
      return `${p1} unoptimized${p2}`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
