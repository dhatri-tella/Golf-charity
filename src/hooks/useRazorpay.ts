/**
 * useRazorpay - A React hook for initiating Razorpay checkout
 *
 * Usage:
 *   const { initiatePayment, loading, error } = useRazorpay();
 *   await initiatePayment({ amount: 50000, currency: 'INR', charityId, plan, userId });
 */

'use client';

import { useState, useCallback } from 'react';

interface RazorpayCheckoutOptions {
  amount: number;       // In paise (e.g. 50000 = ₹500)
  currency?: string;    // Default: 'INR'
  charityId?: string;
  plan?: 'monthly' | 'yearly';
  userId: string;
  userEmail?: string;
  userName?: string;
  onSuccess?: (data: RazorpaySuccessPayload) => void;
  onFailure?: (error: RazorpayErrorPayload) => void;
}

export interface RazorpaySuccessPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayErrorPayload {
  error: {
    code: string;
    description: string;
    reason: string;
  };
}

// Dynamically load the Razorpay script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function useRazorpay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(async (options: RazorpayCheckoutOptions) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Load Razorpay checkout script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK. Check your internet connection.');
      }

      // 2. Create an order on the backend
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: options.amount,
          currency: options.currency ?? 'INR',
          charityId: options.charityId,
          plan: options.plan,
        }),
      });

      if (!orderRes.ok) {
        const { error: errMsg } = await orderRes.json();
        throw new Error(errMsg ?? 'Failed to create order');
      }

      const { orderId, keyId, currency, amount } = await orderRes.json();

      // 3. Open Razorpay checkout modal
      const razorpayOptions = {
        key: keyId ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: orderId,
        name: 'Golf Charity Platform',
        description: `${options.plan ?? 'monthly'} subscription`,
        prefill: {
          name: options.userName ?? '',
          email: options.userEmail ?? '',
        },
        theme: { color: '#6366f1' }, // Indigo to match the design system
        handler: async (response: RazorpaySuccessPayload) => {
          // 4. Verify payment on the backend
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: options.userId,
              charityId: options.charityId,
              plan: options.plan,
              amount: options.amount,
            }),
          });

          if (!verifyRes.ok) {
            const { error: errMsg } = await verifyRes.json();
            setError(errMsg ?? 'Payment verification failed');
            options.onFailure?.({ error: { code: 'VERIFY_FAILED', description: errMsg, reason: errMsg } });
            return;
          }

          options.onSuccess?.(response);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(razorpayOptions);
      rzp.on('payment.failed', (response: RazorpayErrorPayload) => {
        setError(response.error.description);
        options.onFailure?.(response);
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message ?? 'Payment failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { initiatePayment, loading, error };
}
