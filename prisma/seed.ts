import { PrismaClient, Role } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const ORIGINAL_DOMAIN = 'https://volunteermedicalcorps.org';

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
  const dataPath = path.join(process.cwd(), 'extracted_data.json');
  if (!fs.existsSync(dataPath)) {
    console.error('extracted_data.json not found. Run extract_data.js first.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const hashedDefaultPassword = await bcrypt.hash('Password123!', 10);

  console.log('Cleaning up existing data...');
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.courseCategory.deleteMany({});
  await prisma.news.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.gallery.deleteMany({});
  await prisma.campaign.deleteMany({});
  // Note: We don't delete users to avoid locking ourselves out, but we could if needed.

  console.log('Seeding Admin and Member types...');
  
  const usersToSeed = [
    {
      email: 'admin@vmc.org',
      name: 'VMC Admin',
      role: Role.ADMIN,
      profile: {
        firstName: 'VMC',
        lastName: 'Admin',
        profession: 'Administrator'
      }
    },
    {
      email: 'volunteer@vmc.org',
      name: 'John Volunteer',
      role: Role.VOLUNTEER,
      profile: {
        firstName: 'John',
        lastName: 'Volunteer',
        profession: 'Doctor',
        country: 'Nigeria'
      }
    },
    {
      email: 'member@vmc.org',
      name: 'Jane Member',
      role: Role.MEMBER,
      profile: {
        firstName: 'Jane',
        lastName: 'Member',
        profession: 'Nurse',
        country: 'United Kingdom'
      }
    },
    {
      email: 'partner@vmc.org',
      name: 'Robert Partner',
      role: Role.PARTNER,
      profile: {
        firstName: 'Robert',
        lastName: 'Partner',
        profession: 'Engineer',
        country: 'USA'
      }
    }
  ];

  for (const u of usersToSeed) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        password: hashedDefaultPassword,
        role: u.role,
        profile: {
          create: u.profile
        }
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

  console.log('Seeding Volunteers (Limit 500 for performance)...');
  const volunteers = data.volunteers.slice(0, 500); // Limit to 500 for now
  for (const v of volunteers) {
    try {
      await prisma.user.create({
        data: {
          email: v.email,
          name: `${v.firstName} ${v.lastName}`.trim() || 'Volunteer',
          password: v.password || hashedDefaultPassword,
          role: Role.VOLUNTEER,
          profile: {
            create: {
              vid: v.vid,
              firstName: v.firstName,
              lastName: v.lastName,
              phone: v.phone,
              bio: v.bio,
              avatar: normalizeImagePath(v.image),
              gender: v.gender,
              dob: v.dob,
              profession: v.profession,
              qualification: v.qualification,
              preferredRole: v.preferredRole,
              church: v.church,
              location: v.location,
              country: v.country,
              newsletter: v.newsletter,
              stats: v.stats,
              dateJoined: v.dateJoined ? new Date(v.dateJoined) : new Date(),
              timeJoined: v.timeJoined,
              ref: v.ref
            }
          }
        }
      });
    } catch (e) {
      // Skip duplicates or errors
    }
  }

  console.log('Seeding E-learning Categories and Courses...');
  const healthCat = await prisma.courseCategory.upsert({
    where: { name: 'Health & Medical' },
    update: {},
    create: { name: 'Health & Medical' }
  });

  const reliefCat = await prisma.courseCategory.upsert({
    where: { name: 'Relief & Humanitarian' },
    update: {},
    create: { name: 'Relief & Humanitarian' }
  });

  await prisma.course.create({
    data: {
      title: 'Introduction to First Aid',
      description: 'Learn the basics of first aid and emergency response.',
      level: 'Beginner',
      categoryId: healthCat.id,
      isActive: true,
      lessons: {
        create: [
          { title: 'Welcome to the Course', order: 1 },
          { title: 'Basic CPR', order: 2 },
          { title: 'Choking Response', order: 3 }
        ]
      }
    }
  });

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
