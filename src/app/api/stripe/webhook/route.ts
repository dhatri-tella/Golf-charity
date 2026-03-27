import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20' as any,
  });

  const supabase = createAdminClient();
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object as any;

  switch (event.type) {
    case 'checkout.session.completed': {
      const { supabase_user_id, charity_id } = session.metadata;
      const stripe_subscription_id = session.subscription;

      // Update or Insert subscription logic
      const { error } = await supabase.from('subscriptions').upsert({
        user_id: supabase_user_id,
        stripe_subscription_id,
        charity_id: charity_id,
        status: 'active',
        plan: session.amount_total > 4000 ? 'yearly' : 'monthly', // Simplified
        charity_percentage: 10
      });

      // Update user role to subscriber
      await supabase.from('users').update({ role: 'subscriber' }).eq('id', supabase_user_id);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from('subscriptions')
        .update({ status: subscription.status })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single();
        
      if (sub) {
        await supabase.from('subscriptions').update({ status: 'canceled' }).eq('stripe_subscription_id', subscription.id);
        await supabase.from('users').update({ role: 'user' }).eq('id', sub.user_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
