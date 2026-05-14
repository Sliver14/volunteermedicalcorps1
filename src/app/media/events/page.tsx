import PageBanner from '@/components/PageBanner';
import prisma from '@/lib/prisma';
import EventsClient from '@/components/EventsClient';

export default async function EventsPage() {
  let allEvents: any[] = [];
  try {
    allEvents = await prisma.event.findMany({
      where: { isActive: true },
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    console.error("Database fetch error in EventsPage:", error);
  }

  return (
    <EventsClient allEvents={allEvents} />
  );
}
