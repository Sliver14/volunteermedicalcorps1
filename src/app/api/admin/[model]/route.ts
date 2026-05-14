import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

export async function GET(req: Request, { params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  try {
    const table = (prisma as any)[model];
    if (!table) return NextResponse.json({ error: 'Invalid model' }, { status: 400 });

    const items = await table.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch ${model}` }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ model: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { model } = await params;
  try {
    const data = await req.json();
    const table = (prisma as any)[model];
    const item = await table.create({ data });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: `Failed to create ${model}` }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ model: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { model } = await params;
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    const table = (prisma as any)[model];
    const item = await table.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: `Failed to update ${model}` }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ model: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { model } = await params;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const table = (prisma as any)[model];
    await table.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete ${model}` }, { status: 500 });
  }
}
