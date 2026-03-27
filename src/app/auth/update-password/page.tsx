'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Loader2, ArrowRight, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { createClientComponentClient } from '@/lib/supabase';
import AuthLayout from '@/components/auth/AuthLayout';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Check if we have a valid session for password reset
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        setError('Invalid or expired reset link. Please request a new one.');
      }
    };

    checkSession();
  }, [supabase.auth]);

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    return null;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (!isValidSession && !error) {
    return (
      <AuthLayout title="Loading..." subtitle="Verifying your reset link.">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Verifying...</span>
        </div>
      </AuthLayout>
    );
  }

  if (error && !isValidSession) {
    return (
      <AuthLayout title="Invalid Link" subtitle="This password reset link is not valid.">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-red-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-red-500/30">
            <Lock className="w-10 h-10 text-red-500" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Invalid Reset Link</h3>
            <p className="text-white/60 font-medium leading-relaxed">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>

          <Link
            href="/auth/reset"
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/30"
          >
            <span>Request New Reset Link</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  if (success) {
    return (
      <AuthLayout title="Password Updated!" subtitle="Your password has been successfully changed.">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-green-500/30">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">Password Updated!</h3>
            <p className="text-white/60 font-medium leading-relaxed">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
          </div>

          <div className="text-sm text-white/40 font-medium">
            Redirecting to dashboard...
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="New Password" subtitle="Enter your new password below.">
      <form onSubmit={handleUpdatePassword} className="space-y-6">
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
            <label className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-3 block">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-12 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-2 text-xs text-white/40 font-medium">
              Password must be at least 8 characters with uppercase, lowercase, and numbers
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-3 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-12 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
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
              <span>Update Password</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}