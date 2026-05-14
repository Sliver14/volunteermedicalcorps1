import PageBanner from "@/components/PageBanner";
import prisma from "@/lib/prisma";
import TestimonialsClient from "@/components/TestimonialsClient";

export default async function TestimonialsPage() {
  let allTestimonials: any[] = [];
  try {
    allTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch error in TestimonialsPage:", error);
  }

  return (
    <TestimonialsClient allTestimonials={allTestimonials} />
  );
}
