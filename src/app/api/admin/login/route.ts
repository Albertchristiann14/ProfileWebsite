import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();
    const secret = process.env.ADMIN_SECRET_KEY || 'krevia2026';

    if (passcode && passcode.trim() === secret.trim()) {
      return NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
        authenticated: true,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid administrative passcode' },
      { status: 401 }
    );
  } catch (_error) {
    return NextResponse.json(
      { success: false, message: 'Bad request' },
      { status: 400 }
    );
  }
}

