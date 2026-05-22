import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EventDetailClient from '@/components/EventDetailClient';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let event = null;
  let otherEvents: any[] = [];
  let galleryItems: any[] = [];

  try {
    event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      notFound();
    }

    [otherEvents, galleryItems] = await Promise.all([
      prisma.event.findMany({
        where: { 
          isActive: true,
          id: { not: id }
        },
        orderBy: { date: 'desc' },
        take: 5,
      }),
      prisma.gallery.findMany({
        where: { isActive: true, type: 'IMAGE' },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
    ]);
  } catch (error) {
    console.error("Database fetch error in EventDetailPage:", error);
    notFound();
  }

  return (
    <EventDetailClient 
      event={event} 
      otherEvents={otherEvents} 
      galleryImages={galleryItems.map(item => item.imageUrl)} 
    />
  );
}
