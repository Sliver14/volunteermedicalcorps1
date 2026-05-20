import PageBanner from '@/components/PageBanner';
import prisma from '@/lib/prisma';
import BlogClient from '@/components/BlogClient';

export default async function BlogPage() {
  let allBlogs: any[] = [];
  try {
    allBlogs = await prisma.blog.findMany({
      where: { isActive: true },
      orderBy: { date: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch error in BlogPage:", error);
  }

  return (
    <BlogClient allBlogs={allBlogs} />
  );
}
