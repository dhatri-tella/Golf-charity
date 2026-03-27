'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNotification } from '@/components/layout/NotificationProvider';
import { createClientComponentClient } from '@/lib/supabase';
import AuthLayout from '@/components/auth/AuthLayout';
import CharitySelector from '@/components/auth/CharitySelector';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    charityId: null as string | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { notify } = useNotification();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
        localStorage.setItem('demo_user', JSON.stringify({ email: formData.email, password: formData.password }));
        notify('success', '🎉 Welcome to Golf Legacy (Demo)', `Welcome ${formData.fullName}! Your demo account is ready.`);
        router.push('/dashboard');
        router.refresh();
        return;
    }

    if (!formData.charityId) {
        setError("Please select a charity to proceed.");
        setLoading(false);
        return;
    }
    setLoading(true);
    setError(null);

    // 1. Signup auth user
    const { data: authData, error: signupError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          role: 'subscriber',
        },
      },
    });

    if (signupError) {
       console.warn('Signup failed, using mock auth for demo:', signupError.message);
       localStorage.setItem('demo_user', JSON.stringify({ email: formData.email, password: formData.password }));
       notify('success', '🎉 Welcome to Golf Legacy (Demo)', `Welcome ${formData.fullName}! Your demo account is ready. Let's make an impact! 🏌️`);
       router.push('/dashboard');
       router.refresh();
       return;
    }

    if (!authData.user) return;

    // 2. Insert into public.users
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      email: formData.email,
      full_name: formData.fullName,
      role: 'subscriber',
    });

    if (profileError) {
       console.error("Profile creation error:", profileError.message);
    }

    // 3. Create initial subscription record (pending)
    const { error: subError } = await supabase.from('subscriptions').insert({
      user_id: authData.user.id,
      charity_id: formData.charityId,
      status: 'pending',
    });

    if (subError) {
       console.error("Subscription creation error:", subError.message);
    }

    // Show success toast with celebration
    notify('success', '🎉 Welcome to Golf Legacy!', `Welcome ${formData.fullName}! Your account is ready. Let's make an impact! 🏌️`);

    // Redirect to dashboard (if using stripe redirect later)
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <AuthLayout 
      title={step === 1 ? "Create Account" : "Pick Your Cause"} 
      subtitle={step === 1 ? "Start your journey of golf and giving today." : "Every subscription makes a real-world impact."}
    >
      <form onSubmit={step === 1 ? handleNext : handleSignup} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="relative group">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
                    placeholder="Tiger Woods"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
                    placeholder="golf@charity.com"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/20 mb-2 block">Create Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CharitySelector 
                selectedId={formData.charityId} 
                onSelect={(id) => setFormData({...formData, charityId: id})} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-primary text-white py-5 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3 shadow-2xl shadow-primary/30 border border-white/10"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <span>{step === 1 ? "Choose Charity" : "Create Account"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {step === 2 && (
            <button
               type="button"
               disabled={loading}
               onClick={() => setStep(1)}
               className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl font-bold text-white/60 flex items-center justify-center space-x-2 hover:bg-white/10 transition-all"
            >
               <ArrowLeft className="w-4 h-4" />
               <span>Go Back</span>
            </button>
          )}
        </div>

        <p className="text-center text-white/40 text-sm font-medium">
          Already have an account? <Link href="/auth/login" className="text-primary font-black hover:underline tracking-tight">Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
