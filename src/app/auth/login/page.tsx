'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight, Code2 } from 'lucide-react';
import { useNotification } from '@/components/layout/NotificationProvider';
import { createClientComponentClient } from '@/lib/supabase';
import AuthLayout from '@/components/auth/AuthLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { notify } = useNotification();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let hasError = false;
    
    if (supabase) {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        console.warn('Login failed, using mock auth for demo:', loginError.message);
        hasError = true;
      }
    } else {
      console.warn('Supabase client not initialized, using mock auth.');
      hasError = true;
    }

    // Check credentials if real Supabase auth failed (demo mode)
    if (hasError) {
      let isAuthorized = false;
      if (email === 'admin@demo.com' && password === 'admin123') {
        isAuthorized = true;
      } else {
        const localUserStr = localStorage.getItem('demo_user');
        if (localUserStr) {
          const localUser = JSON.parse(localUserStr);
          if (localUser.email === email && localUser.password === password) {
            isAuthorized = true;
          }
        }
      }

      if (!isAuthorized) {
         setLoading(false);
         notify('error', 'Authentication Failed', 'Invalid credentials. Please verify your email and password or sign up.');
         return;
      }

      // Save demo user to localStorage so dashboard can identify them
      localStorage.setItem('demo_user', JSON.stringify({
        id: 'demo-' + Date.now(),
        email: email,
        password: password,
        user_metadata: { full_name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) },
      }));

      notify('success', 'Login Completed', 'Welcome to the Golf Charity demo mode!');
    } else {
      notify('success', 'Login Completed', 'Welcome back! Ready to track scores and support your charity?');
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Track your performance and impact lives.">
      <form onSubmit={handleLogin} className="space-y-6">
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

          <div className="relative group">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-white/20 block">Password</label>
              <Link href="/auth/reset" className="text-xs font-bold text-primary hover:underline tracking-tight">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
                placeholder="••••••••"
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
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="relative py-6 opacity-40">
           <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/10" />
           <div className="relative flex justify-center"><span className="bg-navy px-4 text-[10px] uppercase font-black tracking-[0.25em] text-white/40">Or continue with</span></div>
        </div>

        <button
          type="button"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
          className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl font-black text-white/60 flex items-center justify-center space-x-3 hover:bg-white/10 transition-all"
        >
          <Code2 className="w-5 h-5 text-primary" />
          <span className="text-xs uppercase tracking-widest leading-none">Github Access</span>
        </button>

        <p className="text-center text-white/40 text-sm font-medium">
          Don't have an account? <Link href="/auth/signup" className="text-primary font-black hover:underline tracking-tight">Subscribe Now</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
