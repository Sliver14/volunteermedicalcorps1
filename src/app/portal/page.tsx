import prisma from "@/lib/prisma";
import { 
  FaCheckCircle, 
  FaClock, 
  FaHandsHelping 
} from "react-icons/fa";
import PortalDashboardClient from "@/components/PortalDashboardClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  let enrollmentCount = 0;
  let completedEnrollments = 0;
  let recentEnrollments: any[] = [];
  let recentDonations: any[] = [];
  let profileStats = 0;

  try {
    const userId = session.user.id;

    const userProfile = await prisma.profile.findUnique({
      where: { userId }
    });
    profileStats = userProfile?.stats || 0;

    enrollmentCount = await prisma.enrollment.count({
      where: { userId }
    });

    completedEnrollments = await prisma.enrollment.count({
      where: { userId, isCompleted: true }
    });

    recentEnrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: { include: { category: true } }
      },
      orderBy: { enrolledAt: 'desc' },
      take: 5
    });

    recentDonations = await prisma.donation.findMany({
      where: { userId },
      include: { campaign: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
  } catch (error) {
    console.error("Database fetch failed in PortalDashboard:", error);
  }

  const stats = [
    { 
      label: "My Campaigns", 
      value: enrollmentCount.toString(), 
      icon: "FaCheckCircle", 
      color: "text-green-600", 
      bg: "bg-green-50" 
    },
    { 
      label: "Donations", 
      value: recentDonations.length.toString(), 
      icon: "FaClock", 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Tasks Undertaken", 
      value: profileStats.toString(), 
      icon: "FaHandsHelping", 
      color: "text-amber-600", 
      bg: "bg-amber-50" 
    },
    { 
      label: "Tasks Completed", 
      value: completedEnrollments.toString(), 
      icon: "FaCheckCircle", 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
  ];

  return (
    <PortalDashboardClient 
      stats={stats}
      recentEnrollments={recentEnrollments}
      recentDonations={recentDonations}
    />
  );
}