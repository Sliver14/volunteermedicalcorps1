import PageBanner from '@/components/PageBanner';
import prisma from '@/lib/prisma';
import GalleryClient from '@/components/GalleryClient';

export default async function GalleryPage() {
  let allGalleryItems: any[] = [];
  try {
    allGalleryItems = await prisma.gallery.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch error in GalleryPage:", error);
  }

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="PHOTO GALLERY" parent={{ label: "Media", href: "#" }} />
      <GalleryClient allGalleryItems={allGalleryItems} />
    </div>
  );
}
