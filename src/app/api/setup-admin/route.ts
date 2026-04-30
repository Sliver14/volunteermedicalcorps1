import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (adminExists) {
      return NextResponse.json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@vmc.org',
        password: hashedPassword,
        name: 'VMC Admin',
        role: 'ADMIN',
      }
    });

    return NextResponse.json({ 
      message: 'Admin created successfully', 
      credentials: { email: 'admin@vmc.org', password: 'admin123' } 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to setup admin' }, { status: 500 });
  }
}
