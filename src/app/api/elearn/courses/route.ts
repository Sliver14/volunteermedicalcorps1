import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        category: true,
        instructor: true,
        _count: {
          select: { lessons: true }
        }
      },
      orderBy: { cid: 'desc' }
    });

    const formattedCourses = courses.map(course => ({
      id: course.id,
      cid: course.cid,
      title: course.title,
      image: course.image?.startsWith('http') 
        ? course.image 
        : `https://volunteermedicalcorps.org/elearn/instructors/images/courses/${course.image || 'default.jpg'}`,
      category: course.category?.name || "General",
      instructor: course.instructor ? `${course.instructor.firstName} ${course.instructor.lastName}` : "VMC Instructor",
      lessonCount: course._count.lessons,
      duration: course.duration,
      level: course.level,
      price: course.price
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error("Fetch all courses error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
