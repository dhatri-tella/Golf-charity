import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = createAdminClient();
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing webhook signature' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    const eventType: string = event.event;
    const payload = event.payload;

    switch (eventType) {
      case 'payment.captured': {
        const payment = payload.payment?.entity;
        if (!payment) break;

        const { notes } = payment;
        const userId = notes?.supabase_user_id;
        const charityId = notes?.charity_id;
        const plan = notes?.plan ?? 'monthly';

        if (userId) {
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            razorpay_order_id: payment.order_id,
            razorpay_payment_id: payment.id,
            charity_id: charityId ?? null,
            status: 'active',
            plan,
            charity_percentage: 10,
            amount_paid: payment.amount,
            paid_at: new Date().toISOString(),
          });

          await supabase
            .from('users')
            .update({ role: 'subscriber' })
            .eq('id', userId);
        }
        break;
      }

      case 'payment.failed': {
        const payment = payload.payment?.entity;
        if (!payment) break;

        const userId = payment.notes?.supabase_user_id;
        if (userId) {
          await supabase.from('subscriptions')
            .update({ status: 'failed' })
            .eq('razorpay_order_id', payment.order_id);
        }
        break;
      }

      case 'subscription.cancelled': {
        const subscription = payload.subscription?.entity;
        if (!subscription) break;

        const { data: sub } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('razorpay_order_id', subscription.id)
          .single();

        if (sub) {
          await supabase
            .from('subscriptions')
            .update({ status: 'canceled' })
            .eq('razorpay_order_id', subscription.id);

          await supabase
            .from('users')
            .update({ role: 'user' })
            .eq('id', sub.user_id);
        }
        break;
      }

      default:
        console.log(`[Razorpay Webhook] Unhandled event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('[Razorpay Webhook]', err);
    return NextResponse.json(
      { error: err?.message ?? 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
