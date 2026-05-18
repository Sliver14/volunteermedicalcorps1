import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { FaCalendarAlt, FaUser, FaComment, FaQuoteLeft, FaStar, FaHeart } from "react-icons/fa";

export default async function Home() {
  let latestNews: any[] = [];
  let latestEvents: any[] = [];
  let latestBlogs: any[] = [];
  let latestTestimonials: any[] = [];

  try {
    // Fetch upcoming events
    latestEvents = await prisma.event.findMany({
      where: { 
        isActive: true,
        date: { gte: new Date() }
      },
      orderBy: { date: 'asc' },
      take: 4,
    });

    // If no upcoming events, fetch most recent past events
    if (latestEvents.length === 0) {
      latestEvents = await prisma.event.findMany({
        where: { isActive: true },
        orderBy: { date: 'desc' },
        take: 4,
      });
    }

    [latestNews, latestBlogs, latestTestimonials] = await Promise.all([
      prisma.news.findMany({
        where: { isActive: true },
        orderBy: { date: 'desc' },
        take: 3,
      }),
      prisma.blog.findMany({
        where: { isActive: true },
        orderBy: { date: 'desc' },
        take: 3,
      }),
      prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
    ]);
  } catch (error) {
    console.error("Database fetch error in Home:", error);
    // Fallback to empty arrays if db fails
  }

  // Fallback data for campaigns (currently still static or can be fetched)
  const campaignData = [
    { id: 1, title: "Lagos Medical Outreach", country: "Nigeria", date: "Oct 2023", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg", description: "Providing essential medical screenings and treatments to underserved communities in Lagos." },
    { id: 2, title: "Accra Hygiene Drive", country: "Ghana", date: "Nov 2023", image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg", description: "Distributing hygiene kits and conducting health education workshops in Accra." },
    { id: 3, title: "Johannesburg Free Surgery", country: "South Africa", date: "Dec 2023", image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg", description: "Funding and performing life-changing surgeries for those in need in Johannesburg." },
    { id: 4, title: "Nairobi Mother & Baby Kit", country: "Kenya", date: "Jan 2024", image: "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg", description: "Supporting maternal health by providing essential care kits for mothers and newborns." },
    { id: 5, title: "Abuja Disaster Relief", country: "Nigeria", date: "Feb 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg", description: "Delivering rapid emergency aid and relief supplies to disaster-affected areas." },
    { id: 6, title: "London Fundraising Gala", country: "United Kingdom", date: "Mar 2024", image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg", description: "A global gathering to raise funds and awareness for VMC's international projects." },
  ];

  return (
    <HomeClient 
      initialNews={latestNews} 
      initialEvents={latestEvents} 
      initialBlogs={latestBlogs} 
      initialTestimonials={latestTestimonials}
      campaignData={campaignData}
    />
  );
}
