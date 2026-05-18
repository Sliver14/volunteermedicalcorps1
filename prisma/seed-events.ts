import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up existing "View Event" placeholders...');
  await prisma.event.deleteMany({
    where: { title: 'View Event' }
  });

  console.log('Seeding proper upcoming events...');
  
  const upcomingEvents = [
    {
      title: "Global Hospital Outreach Campaign 2026",
      description: "Join our global initiative to reach millions with healthcare and the Gospel. We are targeting 200 countries this year with specialized medical missions.",
      location: "Worldwide",
      date: new Date('2026-06-23T09:00:00Z'), // June 23, 2026
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
      isActive: true
    },
    {
      title: "VMC Annual Coordinators Summit",
      description: "A gathering of all VMC coordinators worldwide for training, strategy, and inspiration. Learn new ways to lead your local team effectively.",
      location: "Lagos, Nigeria & Online",
      date: new Date('2026-08-15T10:00:00Z'), // Aug 15, 2026
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
      isActive: true
    },
    {
      title: "World Humanitarian Day Celebration",
      description: "Celebrating our heroes on the frontlines. Join us as we showcase the impact of our volunteers in crisis regions.",
      location: "Global",
      date: new Date('2026-08-19T12:00:00Z'), // Aug 19, 2026
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
      isActive: true
    },
    {
      title: "Medical Missions Training 2026",
      description: "Get equipped for specialized medical missions. This intensive training covers disaster response, community health, and spiritual care.",
      location: "London, UK",
      date: new Date('2026-10-10T09:00:00Z'), // Oct 10, 2026
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
      isActive: true
    },
    {
      title: "International Volunteers Day Fiesta",
      description: "A grand celebration of volunteerism. Join us for awards, testimonies, and a special message from our leadership.",
      location: "Online (Global)",
      date: new Date('2026-12-05T18:00:00Z'), // Dec 5, 2026
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
      isActive: true
    }
  ];

  for (const event of upcomingEvents) {
    await prisma.event.create({
      data: event
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
