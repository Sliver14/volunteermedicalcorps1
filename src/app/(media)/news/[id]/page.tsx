import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import NewsDetailClient from '@/components/NewsDetailClient';

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let news = null;
  let recentBlogs: any[] = [];
  let galleryItems: any[] = [];

  try {
    news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      notFound();
    }

    [recentBlogs, galleryItems] = await Promise.all([
      prisma.blog.findMany({
        where: { isActive: true },
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
    console.error("Database fetch error in NewsDetailPage:", error);
    notFound();
  }

  return (
    <NewsDetailClient 
      news={news} 
      recentBlogs={recentBlogs} 
      galleryImages={galleryItems.map(item => item.imageUrl)} 
    />
  );
}
