import PageBanner from '@/components/PageBanner';
import prisma from '@/lib/prisma';
import EventsClient from '@/components/EventsClient';

export default async function EventsPage() {
  let allEvents: any[] = [];
  try {
    // Fetch upcoming events
    allEvents = await prisma.event.findMany({
      where: { 
        isActive: true,
        date: { gte: new Date() }
      },
      orderBy: { date: 'asc' },
    });

    // If no upcoming events, fetch all active events
    if (allEvents.length === 0) {
      allEvents = await prisma.event.findMany({
        where: { isActive: true },
        orderBy: { date: 'desc' },
      });
    }
  } catch (error) {
    console.error("Database fetch error in EventsPage:", error);
  }

  return (
    <EventsClient allEvents={allEvents} />
  );
}
