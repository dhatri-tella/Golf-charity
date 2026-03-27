import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Use service role for trusted server-side DB writes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      charityId,
      plan,
      amount,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment fields.' },
        { status: 400 }
      );
    }

    // Verify signature using HMAC SHA256
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const receivedBuffer = Buffer.from(razorpay_signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    // Timing-safe comparison to prevent timing attacks
    if (
      receivedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
    ) {
      return NextResponse.json(
        { error: 'Invalid payment signature. Payment verification failed.' },
        { status: 400 }
      );
    }

    // Payment is verified — update database
    if (userId) {
      // Upsert subscription record
      const { error: subError } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        razorpay_order_id,
        razorpay_payment_id,
        charity_id: charityId ?? null,
        status: 'active',
        plan: plan ?? 'monthly',
        charity_percentage: 10,
        amount_paid: amount ?? 0,
        paid_at: new Date().toISOString(),
      });

      if (subError) {
        console.error('[Razorpay verify] DB upsert error:', subError);
        // Don't fail the response — payment was valid
      }

      // Upgrade user role
      await supabase
        .from('users')
        .update({ role: 'subscriber' })
        .eq('id', userId);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subscription activated.',
      razorpay_payment_id,
      razorpay_order_id,
    });
  } catch (err: any) {
    console.error('[Razorpay verify]', err);
    return NextResponse.json(
      { error: err?.message ?? 'Payment verification failed' },
      { status: 500 }
    );
  }
}
