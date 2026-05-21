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

    // Get upcoming events
    const upcomingEvents = await prisma.event.findMany({
      where: {
        date: { gte: new Date() },
        isActive: true,
      },
      orderBy: { date: "asc" },
      take: 5
    });

    // Get volunteer stats from profile
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { stats: true, status: true, vid: true }
    });

    return NextResponse.json({
      upcomingEvents,
      stats: profile?.stats || 0,
      status: profile?.status || "Pending",
      vid: profile?.vid || "N/A"
    });
  } catch (error) {
    console.error("Fetch engagement error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
