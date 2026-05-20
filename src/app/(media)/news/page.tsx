import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import NewsClient from '@/components/NewsClient';

export default async function NewsPage() {
  let allNews: any[] = [];
  let recentBlogs: any[] = [];
  let galleryItems: any[] = [];

  try {
    [allNews, recentBlogs, galleryItems] = await Promise.all([
      prisma.news.findMany({
        where: { isActive: true },
        orderBy: { date: 'desc' },
      }),
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
    console.error("Database fetch error in NewsPage:", error);
  }

  return (
    <NewsClient 
      allNews={allNews} 
      recentBlogs={recentBlogs} 
      galleryImages={galleryItems.map(item => item.imageUrl)} 
    />
  );
}
