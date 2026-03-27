export const dynamic = 'force-dynamic';

export async function POST(req: any) {
  try {
    // Mock successful response
    return ({
      success: true,
      id: `mock_${Math.random().toString(36).substring(7)}`,
      message: 'Email sent successfully (mock mode)'
    });
  } catch (error: any) {
    console.error('Email API error:', error);
    return (
      { status: 500 }
    );
  }
}
