'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { createClientComponentClient } from '@/lib/supabase';
import AuthLayout from '@/components/auth/AuthLayout';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <AuthLayout title="Reset Requested" subtitle="Password reset has been initiated.">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-green-500/30">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Reset Initiated</h3>
            <p className="text-white/60 font-medium leading-relaxed">
              A password reset request has been processed for <span className="text-primary font-bold">{email}</span>.
              Please follow the instructions provided by your administrator.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-white/40 font-medium">
              Didn&apos;t receive the email? Check your spam folder or try again.
            </p>

            <Link
              href="/auth/login"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive a reset link.">
      <form onSubmit={handleResetPassword} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-6">
          <div className="relative group">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-3 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
                placeholder="golf@charity.com"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group w-full bg-primary text-white py-5 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3 shadow-2xl shadow-primary/30 border border-white/10"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <span>Send Reset Link</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center space-x-2 text-white/40 hover:text-white/60 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}