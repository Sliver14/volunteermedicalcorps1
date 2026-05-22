import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration: Completed -> SUCCESS...');
  
  const result = await prisma.donation.updateMany({
    where: {
      status: 'Completed' as any, // Cast to any because types might be out of sync
    },
    data: {
      status: 'SUCCESS' as any,
    },
  });

  console.log(`Successfully migrated ${result.count} donation records.`);
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
