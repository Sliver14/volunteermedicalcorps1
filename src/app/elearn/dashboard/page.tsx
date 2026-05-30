// app/elearn/students/dashboard/page.tsx
import ElearnDashboardClient from "@/components/ElearnDashboardClient";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ElearnDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch real library stats
  const totalCourses = await prisma.course.count({
    where: { isActive: true }
  });

  // Fetch recommended (latest) courses
  const latestCourses = await prisma.course.findMany({
    where: { isActive: true },
    include: {
      category: true,
    },
    orderBy: { cid: 'desc' },
    take: 3
  });

  const stats = {
    totalCourses,
    myCourses: 0, // Will be hydrated by client
    myQuizzes: 0,
  };

  const recommended = latestCourses.map(course => ({
    id: course.id,
    title: course.title,
    image: course.image?.startsWith('http') 
      ? course.image 
      : `https://volunteermedicalcorps.org/elearn/instructors/images/courses/${course.image || 'default.jpg'}`,
    category: course.category?.name || "General",
  }));

  return (
    <ElearnDashboardClient
      stats={stats}
      inProgress={[]}
      recommended={recommended}
    />
  );
}