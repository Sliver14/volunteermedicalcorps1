import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const confession = await prisma.dailyConfession.findFirst({
      where: { isActive: true },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(confession);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch confession' }, { status: 500 });
  }
}
