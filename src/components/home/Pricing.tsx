'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Heart, Trophy, Zap, Star, Layout, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useNotification } from '@/components/layout/NotificationProvider';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState('GBP');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showConfirmationModel, setShowConfirmationModal] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { initiatePayment, loading: razorpayLoading } = useRazorpay();
  const { notify } = useNotification();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      let user = null;
      if (supabase) {
        const { data } = await supabase.auth.getUser();
        user = data?.user;
      }
      if (!user) {
        const local = localStorage.getItem('demo_user');
        if (local) user = JSON.parse(local);
      }
      setCurrentUser(user);
    };
    fetchUser();
  }, [supabase]);

  // Exchange rates relative to base GBP
  const rates: Record<string, number> = { GBP: 1, USD: 1.25, EUR: 1.16, INR: 105 };
  const symbols: Record<string, string> = { GBP: '£', USD: '$', EUR: '€', INR: '₹' };

  const handleSubscribe = (plan: any) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async (method: 'stripe' | 'razorpay') => {
    setLoading(true);

    if (method === 'razorpay') {
      // Convert price to paise for INR, or lowest denomination for others
      const priceInGbp = isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
      const priceInCurrency = parseFloat((priceInGbp * rates[currency]).toFixed(2));
      // Razorpay always processes in the smallest currency unit
      const amountInPaise = Math.round(priceInCurrency * 100);

      await initiatePayment({
        amount: amountInPaise,
        currency: currency === 'INR' ? 'INR' : 'USD', // Razorpay supports INR & USD
        charityId: 'demo-charity-id',
        plan: isYearly ? 'yearly' : 'monthly',
        userId: currentUser?.id ?? 'demo-user',
        userEmail: currentUser?.email ?? currentUser?.email ?? '',
        userName: currentUser?.user_metadata?.full_name ?? currentUser?.email ?? 'Guest',
        onSuccess: () => {
          notify('success', '🎉 Payment Successful!', 'Your subscription is now active via Razorpay.');
          setLoading(false);
          setShowPaymentModal(false);
          setShowConfirmationModal(true);
        },
        onFailure: (err) => {
          notify('error', 'Payment Failed', err.error.description ?? 'Razorpay payment failed.');
          setLoading(false);
        },
      });
      return;
    }

    // --- Stripe flow ---
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: isYearly ? 'price_yearly_demo' : 'price_monthly_demo',
          charityId: 'demo-charity-id'
        }),
      });
      const data = await response.json();
      if (data.sessionId) {
        setLoading(false);
        setShowPaymentModal(false);
        setShowConfirmationModal(true);
        return;
      }
      throw new Error(data.error || 'No Session ID returned');
    } catch (err) {
      console.warn('Stripe fallback → demo simulation:', err);
      setTimeout(() => {
        setLoading(false);
        setShowPaymentModal(false);
        setShowConfirmationModal(true);
      }, 2000);
    }
  };

  const plans = [
    {
      name: 'Essential Impact',
      monthlyPrice: 24.99,
      yearlyPrice: 20.99,
      description: 'The flexible way to play and give back every month.',
      features: [
        'Rolling 5-score tracking',
        'Monthly draw entry',
        'Select 1 core charity',
        'Basic performance analytics',
        'Stripe direct payments',
      ],
      cta: 'Subscribe Monthly',
      isPopular: false,
      icon: Layout,
    },
    {
      name: 'Platinum Champion',
      monthlyPrice: 19.99,
      yearlyPrice: 16.99,
      description: 'The ultimate commitment to your game and the community.',
      features: [
        'Rolling 5-score tracking',
        '2 entries per monthly draw',
        'Priority charity spotlights',
        'Advanced performance insights',
        'Custom charity allocation',
        '2 months free (Yearly)',
      ],
      cta: 'Subscribe Yearly',
      isPopular: true,
      badge: 'Best Value',
      icon: Star,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-navy-dark/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8 backdrop-blur-xl"
          >
             <Zap className="w-4 h-4 text-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Membership Access</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            Upgrade Your <span className="gradient-text-animated">Play</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-white/40 mb-12 max-w-2xl mx-auto font-medium"
          >
            Transparent pricing that directly contributes to positive global change.
          </motion.p>

          {/* Preferences Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {/* Country/Currency Selector */}
            <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-white/40">Region</span>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer"
              >
                 <option value="GBP" className="bg-navy-dark text-white">🇬🇧 United Kingdom (£)</option>
                 <option value="USD" className="bg-navy-dark text-white">🇺🇸 United States ($)</option>
                 <option value="EUR" className="bg-navy-dark text-white">🇪🇺 Europe (€)</option>
                 <option value="INR" className="bg-navy-dark text-white">🇮🇳 India (₹)</option>
              </select>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center space-x-6">
              <span className={cn('text-sm font-black uppercase tracking-widest transition-colors', !isYearly ? 'text-white' : 'text-white/20')}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-20 h-10 bg-white/5 border border-white/10 rounded-full p-1.5 transition-all hover:border-primary/40 group"
              >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                animate={{ x: isYearly ? 40 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-7 h-7 bg-primary rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)] flex items-center justify-center"
              >
                 <Zap className="w-3 h-3 text-white" />
              </motion.div>
            </button>
            <span className={cn('text-sm font-black uppercase tracking-widest transition-colors', isYearly ? 'text-white' : 'text-white/20')}>
              Yearly <span className="text-secondary text-[8px] ml-2 px-2 py-1 rounded-full border border-secondary/20 animate-pulse">Save 25%</span>
            </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={cn(
                'relative p-12 glass-card transition-all duration-500 hover:scale-[1.02] flex flex-col group overflow-hidden',
                plan.isPopular ? 'border-primary/40 shadow-3xl shadow-primary/20 scale-105 z-10' : 'border-white/5 shadow-xl hover:border-white/10'
              )}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl">
                  {plan.badge}
                </div>
              )}

              <div className="flex flex-col flex-grow relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-3xl font-black text-white tracking-tighter">{plan.name}</h3>
                   <plan.icon className={cn('w-8 h-8', plan.isPopular ? 'text-primary' : 'text-white/20')} />
                </div>
                
                <p className="text-white/50 text-sm mb-10 leading-relaxed font-medium">
                  {plan.description}
                </p>

                <div className="flex items-baseline space-x-2 mb-12">
                  <span className="text-6xl font-black text-white tracking-tighter leading-none">
                    {symbols[currency]}{Math.floor((isYearly ? plan.yearlyPrice : plan.monthlyPrice) * rates[currency])}
                  </span>
                  <div className="flex flex-col">
                     <span className="text-white/60 font-black text-xl leading-none">
                       .{(Math.floor(((isYearly ? plan.yearlyPrice : plan.monthlyPrice) * rates[currency]) % 1 * 100)).toString().padStart(2, '0')}
                     </span>
                     <span className="text-white/20 text-[10px] uppercase tracking-widest font-black mt-1">per month</span>
                  </div>
                </div>

                <div className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start space-x-4 group/item">
                      <div className="w-6 h-6 bg-white/5 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-primary/50 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-bold text-white/50 group-hover/item:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                className={cn(
                  'group w-full py-5 rounded-2xl font-black text-lg text-center transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-3 relative z-10 overflow-hidden',
                  plan.isPopular 
                    ? 'bg-primary text-white shadow-[0_20px_40px_-10px_rgba(139,92,246,0.4)]' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary/40'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-20" />
                <span className="relative z-10">{plan.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
              
              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Selection Modal Wrapper */}
      <AnimatePresence>
        {showPaymentModal && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl overflow-y-auto">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="bg-navy-dark border border-white/10 rounded-3xl p-8 max-w-lg w-full relative z-50 overflow-hidden"
            >
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <PaymentMethodSelector 
                plan={{
                  name: selectedPlan.name,
                  price: parseFloat(((isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice) * rates[currency]).toFixed(2)),
                  billing: isYearly ? 'yearly' : 'monthly'
                }}
                onConfirm={handlePaymentConfirm}
                currencySymbol={symbols[currency]}
                loading={loading || razorpayLoading}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PaymentConfirmationModal
        isOpen={showConfirmationModel}
        sessionId="DEMO-SESSION"
        charityName="Global Golf Foundation"
        amount={selectedPlan ? parseFloat(((isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice) * rates[currency]).toFixed(2)) : 0}
        currencySymbol={symbols[currency]}
      />
    </section>
  );
};

export default Pricing;
