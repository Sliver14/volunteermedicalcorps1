import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BlogDetailClient from '@/components/BlogDetailClient';

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let blog = null;
  let recentNews: any[] = [];
  let galleryItems: any[] = [];

  try {
    blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      notFound();
    }

    [recentNews, galleryItems] = await Promise.all([
      prisma.news.findMany({
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
    console.error("Database fetch error in BlogDetailPage:", error);
    notFound();
  }

  return (
    <BlogDetailClient 
      blog={blog} 
      recentNews={recentNews} 
      galleryImages={galleryItems.map(item => item.imageUrl)} 
    />
  );
}
