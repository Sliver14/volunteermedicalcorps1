import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@vmc.org';
  const adminPassword = 'adminpassword123'; // Change this for production

  console.log('--- Starting Admin Seeding ---');

  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { 
        OR: [
          { email: adminEmail },
          { role: Role.ADMIN }
        ]
      }
    });

    if (existingAdmin) {
      console.log(`Admin user already exists (${existingAdmin.email}). Skipping seed.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'VMC Super Admin',
        role: Role.ADMIN,
        profile: {
          create: {
            firstName: 'VMC',
            lastName: 'Admin',
            status: 'Active',
            bio: 'Lead System Administrator'
          }
        }
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('--- Seeding Complete ---');

  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
