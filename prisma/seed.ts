import { PrismaClient, Role } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});
const ORIGINAL_DOMAIN = 'https://medicalmissionsnetwork.org';

function normalizeImagePath(imagePath: string | null | undefined): string {
  if (!imagePath || imagePath === '/logo.png' || imagePath === 'default-avatar.jpg') return '/logo.png';
  
  let localPath = imagePath.trim();
  if (localPath.startsWith('http')) return localPath;
  if (!localPath.startsWith('/')) {
    localPath = '/' + localPath;
  }
  if (localPath.startsWith('/give/images/')) {
    localPath = localPath.replace('/give/images/', '/give-images/');
  }

  const fullPath = path.join(process.cwd(), 'public', localPath);
  if (fs.existsSync(fullPath)) {
    return localPath;
  }
  return `${ORIGINAL_DOMAIN}${localPath}`;
}

async function main() {
  const dataPath = path.join(process.cwd(), 'ready_to_seed.json');
  if (!fs.existsSync(dataPath)) {
    console.error('ready_to_seed.json not found. Run prepare_data.js first.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const hashedDefaultPassword = await bcrypt.hash('Password123!', 10);

  console.log('Cleaning up existing data...');
  await prisma.lessonStats.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.courseCategory.deleteMany({});
  await prisma.news.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.gallery.deleteMany({});
  await prisma.campaign.deleteMany({});
  await prisma.testimonial.deleteMany({});
  // Note: We don't delete users to avoid locking ourselves out, but we could if needed.

  console.log('Seeding Course Categories...');
  const categoryMap = new Map();
  for (const cat of data.categories) {
    const created = await prisma.courseCategory.upsert({
      where: { name: cat.name },
      update: { cid: cat.cid },
      create: { name: cat.name, cid: cat.cid }
    });
    categoryMap.set(cat.cid, created.id);
  }

  console.log('Seeding Instructors...');
  const instructorMap = new Map();
  for (const ins of data.instructors) {
    const created = await prisma.instructor.upsert({
      where: { iid: ins.iid },
      update: { ...ins, avatar: normalizeImagePath(ins.avatar) },
      create: { ...ins, avatar: normalizeImagePath(ins.avatar) }
    });
    instructorMap.set(ins.iid, created.id);
  }

  console.log('Seeding Courses...');
  const courseMap = new Map();
  for (const course of data.courses) {
    const created = await prisma.course.create({
      data: {
        cid: course.cid,
        title: course.title,
        brief: course.brief,
        description: course.description,
        image: normalizeImagePath(course.image),
        price: course.price,
        duration: course.duration,
        level: course.level,
        isActive: course.isActive,
        categoryId: categoryMap.get(course.categoryId) || (await prisma.courseCategory.findFirst())?.id || '',
        instructorId: instructorMap.get(course.instructorId) || null,
      }
    });
    courseMap.set(course.cid, created.id);
  }

  console.log('Seeding Lessons...');
  for (const lesson of data.lessons) {
    await prisma.lesson.create({
      data: {
        lid: lesson.lid,
        title: lesson.title,
        content: lesson.content,
        videoUrl: lesson.videoUrl,
        duration: lesson.duration,
        order: lesson.order,
        courseId: courseMap.get(lesson.courseId) || '',
      }
    });
  }

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
        eid: item.eid,
        title: item.title,
        brief: item.brief,
        description: item.description,
        image: normalizeImagePath(item.image),
        location: item.location,
        date: new Date(item.date),
        startDate: item.startDate,
        endDate: item.endDate,
        startTime: item.startTime,
        endTime: item.endTime,
        isLive: item.isLive,
        streamUrl: item.streamUrl,
        volOnly: item.volOnly,
        isActive: item.isActive,
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

  console.log(`Seeding All Users (${data.users.length} total)...`);
  const BATCH_SIZE = 50;
  for (let i = 0; i < data.users.length; i += BATCH_SIZE) {
    const batch = data.users.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (u: any) => {
        try {
          await prisma.user.create({
            data: {
              email: u.email,
              name: u.name || 'VMC User',
              password: u.password || hashedDefaultPassword,
              role: u.role || Role.USER,
              profile: {
                create: {
                  ...u.profile,
                  avatar: normalizeImagePath(u.profile?.avatar),
                  dateJoined: u.profile?.dateJoined ? new Date(u.profile.dateJoined) : new Date(),
                }
              }
            }
          });
        } catch (e) {
          // Skip duplicates or errors
        }
      })
    );
    if ((i + BATCH_SIZE) % 500 === 0 || i + batch.length === data.users.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, data.users.length)} / ${data.users.length} users seeded`);
    }
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
