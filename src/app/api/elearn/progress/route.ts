import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { lessonId, status } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ message: "Lesson ID is required" }, { status: 400 });
    }

    const lessonStat = await prisma.lessonStats.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      update: { status: status || 1 },
      create: {
        userId: session.user.id,
        lessonId,
        status: status || 1,
      },
      include: {
        lesson: {
          select: { courseId: true }
        }
      }
    });

    // Recalculate course progress
    const courseId = lessonStat.lesson.courseId;
    const totalLessons = await prisma.lesson.count({ where: { courseId } });
    const completedLessons = await prisma.lessonStats.count({
      where: {
        userId: session.user.id,
        lesson: { courseId },
        status: 1
      }
    });

    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        }
      },
      data: {
        progress,
        isCompleted: progress === 100,
        completedAt: progress === 100 ? new Date() : null,
      }
    });

    return NextResponse.json({ message: "Progress updated", progress });
  } catch (error) {
    console.error("Progress error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
