import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@volunteermedicalcorps.org';
  const newPassword = 'ChangeMe123!'; // Update this

  console.log('--- Updating Admin Password ---');

  try {
    const admin = await prisma.user.findUnique({
      where: {
        email: adminEmail
      }
    });

    if (!admin) {
      console.log(`❌ No admin user found with email: ${adminEmail}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        email: adminEmail
      },
      data: {
        password: hashedPassword
      }
    });

    console.log('✅ Admin password updated successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`New Password: ${newPassword}`);
    console.log('--- Password Update Complete ---');

  } catch (error) {
    console.error('❌ Error updating admin password:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();