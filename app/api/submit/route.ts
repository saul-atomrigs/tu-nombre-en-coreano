import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { content } = await request.json();
  const trimmedContent = content.trim();

  try {
    const submission = await prisma.submission.create({
      data: { content: trimmedContent },
    });

    return NextResponse.json({ submission }, { status: 200 });
  } catch (error) {
    console.log('[api/submission] error', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
