import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await req.json();
    const confession = await prisma.dailyConfession.create({ data: { ...data, date: new Date(data.date) } });
    return NextResponse.json(confession);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create confession' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    const confession = await prisma.dailyConfession.update({
      where: { id },
      data: { ...updateData, date: updateData.date ? new Date(updateData.date) : undefined },
    });
    return NextResponse.json(confession);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update confession' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await prisma.dailyConfession.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete confession' }, { status: 500 });
  }
}
