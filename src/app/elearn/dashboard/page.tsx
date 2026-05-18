import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { 
  FaBook, 
  FaClock, 
  FaTrophy, 
  FaStar,
  FaPlay,
  FaSearch
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ElearnDashboardClient from "@/components/ElearnDashboardClient";

export default async function ElearnDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  // Fetch real data
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: {
      course: {
        include: {
          lessons: true,
          category: true
        }
      }
    },
    orderBy: { enrolledAt: 'desc' }
  });

  const recommendedCourses = await prisma.course.findMany({
    where: { 
      isActive: true,
      enrollments: {
        none: { userId: session.user.id }
      }
    },
    include: { category: true },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const stats = {
    certificates: enrollments.filter(e => e.isCompleted).length,
    learningTime: "12h", // Mock for now as we don't track exact time
    totalCourses: enrollments.length
  };

  return (
    <ElearnDashboardClient 
      session={session}
      enrollments={enrollments}
      recommendedCourses={recommendedCourses}
      stats={stats}
    />
  );
}
