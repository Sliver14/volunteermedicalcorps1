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

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          include: {
            category: true,
            _count: {
              select: { lessons: true }
            }
          }
        }
      },
      orderBy: { enrolledAt: "desc" }
    });

    const completedCourses = enrollments.filter(e => e.isCompleted).length;
    const inProgressCourses = enrollments.filter(e => !e.isCompleted).length;

    // Recent activity (e.g., latest lesson stats)
    const recentActivity = await prisma.lessonStats.findMany({
      where: { userId: session.user.id },
      include: {
        lesson: {
          include: { course: true }
        }
      },
      orderBy: { updatedAt: "desc" },
      take: 5
    });

    return NextResponse.json({
      enrollments,
      stats: {
        totalEnrolled: enrollments.length,
        completedCourses,
        inProgressCourses,
      },
      recentActivity
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
