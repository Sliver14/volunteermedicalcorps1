import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const userProfile = await prisma.profile.findUnique({
      where: { userId }
    });
    const profileStats = userProfile?.stats || 0;

    const enrollmentCount = await prisma.enrollment.count({
      where: { userId }
    });

    const completedEnrollments = await prisma.enrollment.count({
      where: { userId, isCompleted: true }
    });

    const recentEnrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: { include: { category: true } }
      },
      orderBy: { enrolledAt: 'desc' },
      take: 5
    });

    const recentDonations = await prisma.donation.findMany({
      where: { userId },
      include: { campaign: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    const stats = [
      { 
        label: "My Campaigns", 
        value: enrollmentCount.toString(), 
        icon: "FaCheckCircle"
      },
      { 
        label: "Donations", 
        value: recentDonations.length.toString(), 
        icon: "FaClock"
      },
      { 
        label: "Tasks Undertaken", 
        value: profileStats.toString(), 
        icon: "FaHandsHelping"
      },
      { 
        label: "Tasks Completed", 
        value: completedEnrollments.toString(), 
        icon: "FaCheckCircle"
      },
    ];

    return NextResponse.json({
      stats,
      recentEnrollments,
      recentDonations
    });
  } catch (error) {
    console.error("Portal Dashboard error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
