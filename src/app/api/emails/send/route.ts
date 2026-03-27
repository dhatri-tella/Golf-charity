import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, subject, type, data } = await req.json();

    if (!email || !subject || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`[MOCK EMAIL] Sending ${type} email to ${email} with subject: ${subject}`);
    console.log('Template Data:', data);

    // Mock successful response
    return NextResponse.json({ 
      success: true, 
      id: `mock_${Math.random().toString(36).substring(7)}`,
      message: 'Email sent successfully (mock mode)'
    });
  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
