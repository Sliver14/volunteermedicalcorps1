import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

export async function GET(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          role: {
            in: ["VOLUNTEER", "USER", "MEMBER", "PARTNER"]
          }
        },
        include: {
          profile: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: {
          role: {
            in: ["VOLUNTEER", "USER", "MEMBER", "PARTNER"]
          }
        }
      })
    ]);

    return NextResponse.json({
      users,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Fetch volunteers error:", error);
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { searchParams } = new URL(req.url);
    const exportCsv = searchParams.get('export') === 'true';

    if (exportCsv) {
      const users = await prisma.user.findMany({
        where: {
          role: {
            in: ["VOLUNTEER", "USER", "MEMBER", "PARTNER"]
          }
        },
        include: {
          profile: true
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(users);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
