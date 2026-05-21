import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const level = searchParams.get("level");

    const courses = await prisma.course.findMany({
      where: {
        isActive: true,
        ...(categoryId && { categoryId }),
        ...(level && { level }),
      },
      include: {
        category: true,
        instructor: true,
        _count: {
          select: { lessons: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Fetch courses error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
