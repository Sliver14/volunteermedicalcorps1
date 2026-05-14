import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const ORIGINAL_DOMAIN = 'https://volunteermedicalcorps.org';

function normalizeImagePath(imagePath: string | null | undefined): string {
  if (!imagePath || imagePath === '/logo.png') return '/logo.png';
  
  // Clean up the path
  let localPath = imagePath.trim();

  // If it's already a full URL, return it
  if (localPath.startsWith('http')) return localPath;

  // Ensure it starts with a slash
  if (!localPath.startsWith('/')) {
    localPath = '/' + localPath;
  }

  // Fix common path issues from extraction
  if (localPath.startsWith('/give/images/')) {
    localPath = localPath.replace('/give/images/', '/give-images/');
  }

  // Check if it exists in the public folder locally
  const fullPath = path.join(process.cwd(), 'public', localPath);
  if (fs.existsSync(fullPath)) {
    return localPath;
  }

  // If not found locally, point to the original domain
  return `${ORIGINAL_DOMAIN}${localPath}`;
}

async function main() {
  const dataPath = path.join(process.cwd(), 'extracted_data.json');
  if (!fs.existsSync(dataPath)) {
    console.error('extracted_data.json not found. Run extract_data.js first.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('Seeding Campaigns...');
  for (const campaign of data.campaigns) {
    await prisma.campaign.create({
      data: {
        ...campaign,
        image: normalizeImagePath(campaign.image),
        date: campaign.date ? new Date(campaign.date) : null,
      },
    });
  }

  console.log('Seeding News...');
  for (const item of data.news) {
    await prisma.news.create({
      data: {
        ...item,
        image: normalizeImagePath(item.image),
        date: new Date(item.date),
      },
    });
  }

  console.log('Seeding Blogs...');
  for (const item of data.blogs) {
    await prisma.blog.create({
      data: {
        ...item,
        image: normalizeImagePath(item.image),
        date: new Date(item.date),
      },
    });
  }

  console.log('Seeding Events...');
  for (const item of data.events) {
    await prisma.event.create({
      data: {
        ...item,
        image: normalizeImagePath(item.image),
        date: new Date(item.date),
      },
    });
  }

  console.log('Seeding Gallery...');
  for (const item of data.gallery) {
    await prisma.gallery.create({
      data: {
        ...item,
        imageUrl: normalizeImagePath(item.imageUrl),
      },
    });
  }

  console.log('Seeding Testimonials...');
  for (const item of data.testimonials) {
    await prisma.testimonial.create({
      data: {
        ...item,
        image: normalizeImagePath(item.image),
        date: item.date ? new Date(item.date) : null,
      },
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
