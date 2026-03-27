'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Zap, Shield, ArrowRight, Loader2 } from 'lucide-react';

interface PaymentMethodSelectorProps {
  plan: {
    name: string;
    price: number;
    billing: string;
  };
  onConfirm: (method: 'stripe' | 'razorpay') => void;
  loading?: boolean;
  currencySymbol?: string;
}

export default function PaymentMethodSelector({ plan, onConfirm, loading, currencySymbol = '£' }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'razorpay'>('stripe');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Cart Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
          <Zap className="w-5 h-5 text-primary animate-pulse" />
          <span>Order Summary</span>
        </h3>
        
        <div className="space-y-4 pb-4 border-b border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-white/60">{plan.name}</span>
            <span className="font-bold">{currencySymbol}{plan.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Billing</span>
            <span className="text-white/40 text-sm">{plan.billing}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <span className="font-bold text-lg">Total</span>
          <span className="text-2xl font-black text-primary">{currencySymbol}{plan.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center space-x-3">
          <CreditCard className="w-5 h-5 text-primary" />
          <span>Choose Payment Method</span>
        </h3>

        <div className="space-y-3">
          {/* Stripe Option */}
          <motion.button
            onClick={() => setSelectedMethod('stripe')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              selectedMethod === 'stripe'
                ? 'border-primary bg-primary/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'stripe' ? 'border-primary bg-primary' : 'border-white/30'
                }`}>
                  {selectedMethod === 'stripe' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h4 className="font-bold">Stripe — Debit / Credit Card</h4>
                  <p className="text-xs text-white/40">Secure payment with any card worldwide</p>
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-wrap gap-2 ml-8">
              {['Fast checkout', 'Secure encryption', 'Auto-renewal'].map((f) => (
                <span key={f} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{f}</span>
              ))}
            </div>
          </motion.button>

          {/* Razorpay Option */}
          <motion.button
            onClick={() => setSelectedMethod('razorpay')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              selectedMethod === 'razorpay'
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'razorpay' ? 'border-amber-400 bg-amber-400' : 'border-white/30'
                }`}>
                  {selectedMethod === 'razorpay' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h4 className="font-bold flex items-center gap-2">
                    Razorpay
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">India &amp; Global</span>
                  </h4>
                  <p className="text-xs text-white/40">UPI, Net Banking, Cards &amp; Wallets</p>
                </div>
              </div>
              <span className="text-amber-400 font-black text-xs tracking-widest">₹ PAY</span>
            </div>
            <div className="flex flex-wrap gap-2 ml-8">
              {['UPI', 'Net Banking', 'Cards', 'Wallets', 'EMI'].map((f) => (
                <span key={f} className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full border border-amber-500/20">{f}</span>
              ))}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 text-sm text-white/50 bg-white/5 p-4 rounded-xl border border-white/10">
        <Shield className="w-4 h-4 text-primary" />
        <span>Your payment is secure and encrypted</span>
        <Lock className="w-4 h-4 text-primary" />
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={() => onConfirm(selectedMethod)}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full font-black py-6 rounded-2xl flex items-center justify-center space-x-3 shadow-2xl border border-white/10 hover:shadow-lg transition-all disabled:opacity-50 ${
          selectedMethod === 'razorpay'
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/30'
            : 'bg-gradient-to-r from-primary to-rose-500 text-white shadow-primary/30'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>{selectedMethod === 'razorpay' ? 'Pay with Razorpay' : 'Complete Purchase'}</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </motion.button>

      <p className="text-center text-xs text-white/40">
        By subscribing, you agree to our Terms of Service. Cancel anytime from your dashboard.
      </p>
    </motion.div>
  );
}
