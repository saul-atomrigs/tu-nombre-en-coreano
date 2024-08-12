import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { content } = await request.json();
  console.log('content', content);

  try {
    const submission = await prisma.submission.create({
      data: { content },
    });

    return NextResponse.json({ submission }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}
