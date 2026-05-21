import prisma from "@/lib/prisma";
import { 
  FaCheckCircle, 
  FaClock, 
  FaHandsHelping 
} from "react-icons/fa";
import PortalDashboardClient from "@/components/PortalDashboardClient";

export default async function PortalDashboard() {
  
  // Optional: Try to get session but don't block rendering
  let profile = null;
  let enrollmentCount = 0;
  let completedEnrollments = 0;
  let recentEnrollments: any[] = [];
  let recentDonations: any[] = [];

  try {
    // Fetch real data if possible (won't break if no user)
    const profileData = await prisma.profile.findFirst(); // or findUnique if you prefer
    profile = profileData;

    enrollmentCount = await prisma.enrollment.count();
    completedEnrollments = await prisma.enrollment.count({
      where: { isCompleted: true }
    });

    recentEnrollments = await prisma.enrollment.findMany({
      include: {
        course: { include: { category: true } }
      },
      orderBy: { enrolledAt: 'desc' },
      take: 5
    });

    recentDonations = await prisma.donation.findMany({
      include: { campaign: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
  } catch (error) {
    console.log("Database fetch skipped or failed (dev mode)", error);
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
      value: profile?.stats?.toString() || "27", 
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