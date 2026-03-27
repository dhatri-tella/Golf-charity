'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Download, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useNotification } from '@/components/layout/NotificationProvider';

interface PaymentConfirmationModalProps {
  sessionId: string;
  charityName: string;
  amount: number;
  isOpen: boolean;
  currencySymbol?: string;
}

export default function PaymentConfirmationModal({
  sessionId,
  charityName,
  amount,
  isOpen,
  currencySymbol = '£',
}: PaymentConfirmationModalProps) {
  const confirmationCode = `GLC-${sessionId.slice(0, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  useEffect(() => {
    if (isOpen) {
      // Play success sound (optional)
      const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
      audio.play().catch(() => {});
    }
  }, [isOpen]);

  const { notify } = useNotification();

  const handleCopy = () => {
    navigator.clipboard.writeText(confirmationCode);
    notify('success', 'Copied!', 'Confirmation code copied to clipboard.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-navy-dark border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-2xl" />
            <CheckCircle2 className="w-20 h-20 text-primary relative animate-pulse" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-black mb-2 gradient-text">Payment Confirmed!</h2>
          <p className="text-white/60 text-sm">Your subscription is active and ready to go</p>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8 bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-white/60 text-sm">Charity Partner</span>
            <span className="font-bold">{charityName}</span>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-white/60 text-sm">Amount Charged</span>
            <span className="text-xl font-black text-primary">{currencySymbol}{amount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Billing Period</span>
            <span className="font-bold">Monthly (Auto-Renewal)</span>
          </div>
        </motion.div>

        {/* Confirmation Code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-3">
            Confirmation Code
          </p>
          <div className="flex items-center space-x-3 bg-primary/10 border border-primary/30 rounded-xl p-4">
            <code className="flex-1 font-mono font-black text-lg text-primary tracking-widest">
              {confirmationCode}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
              title="Copy confirmation code"
            >
              <Copy className="w-5 h-5 text-primary hover:scale-110 transition-transform" />
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2">
            Save this code for your records. A receipt has been sent to your email.
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-8 flex items-start space-x-3"
        >
          <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold mb-1">Welcome! 🎉</p>
            <p className="text-white/70 text-xs">
              Your first 5 golf scores are rolling. Enter them anytime to qualify for the monthly draw!
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Link href="/dashboard" className="w-full">
            <button className="w-full bg-primary text-white font-black py-4 rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2">
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          
          <button
            onClick={() => window.print()}
            className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
        </motion.div>

        <p className="text-center text-xs text-white/40 mt-6">
          Need help? Check our <a href="#" className="text-primary hover:underline">FAQ</a> or <a href="#" className="text-primary hover:underline">contact support</a>.
        </p>
      </motion.div>
    </div>
  );
}
