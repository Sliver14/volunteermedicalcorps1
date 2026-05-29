import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CoursePlayer from "@/components/CoursePlayer";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const { courseId } = await params;

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId,
      },
    },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
          instructor: true,
        },
      },
    },
  });

  if (!enrollment) {
    // If not enrolled, redirect to the course info page or dashboard
    redirect("/elearn/dashboard");
  }

  // Fetch lesson stats (progress) for this course and user
  const lessonStats = await prisma.lessonStats.findMany({
    where: {
      userId: session.user.id,
      lesson: {
        courseId,
      },
    },
  });

  return (
    <CoursePlayer 
      course={enrollment.course as any} 
      initialProgress={lessonStats} 
    />
  );
}
