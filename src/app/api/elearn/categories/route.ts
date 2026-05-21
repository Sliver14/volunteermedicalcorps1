import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.courseCategory.findMany({
      include: {
        _count: {
          select: { courses: true }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
