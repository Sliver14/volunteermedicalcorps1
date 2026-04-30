import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const confessions = await prisma.dailyConfession.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(confessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch confessions' }, { status: 500 });
  }
}
