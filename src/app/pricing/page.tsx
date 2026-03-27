'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, ShieldCheck, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const PricingPage = () => {
  const plans = [
    {
      name: "MONTHLY PRO",
      price: "19",
      period: "per month",
      description: "Ideal for regular club players looking to make an impact.",
      features: [
        "1 Free Monthly Draw Entry",
        "Unlimited Score Logging",
        "Dashboard Access",
        "Charity Impact Tracking",
        "Community Discord Access"
      ],
      buttonText: "Start Monthly",
      isPopular: false
    },
    {
      name: "ANNUAL ELITE",
      price: "190",
      period: "per year",
      description: "Our best value plan for dedicated enthusiasts and pros.",
      features: [
        "12 Monthly Draw Entries",
        "2 Bonus Draw Entries (Save £38)",
        "Priority Winner Verification",
        "Exclusive Partner Perks",
        "Annual Impact Certificate",
        "Digital Member ID"
      ],
      buttonText: "Get Annual Pro",
      isPopular: true,
      badge: "2 MONTHS FREE"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Badge variant="active">MEMBERSHIPS</Badge>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Choose your <br />
            <span className="text-primary">Impact.</span>
          </h1>
          <p className="text-lg text-white/40 font-medium leading-relaxed">
            Transparent pricing with no hidden fees. Every membership fuels world-class golf prizes and global charity projects.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative glass-card p-10 lg:p-14 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-2xl rounded-[3rem] ${
                plan.isPopular ? 'border-primary ring-1 ring-primary/50' : 'border-white/5'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest translate-x-[10%] translate-y-[-50%] rotate-[15deg] shadow-2xl rounded-xl">
                  Most Popular
                </div>
              )}

              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{plan.name}</h3>
                    {plan.badge && <Badge variant="active" className="bg-primary/20 text-primary border-primary/30">{plan.badge}</Badge>}
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-6xl font-black text-white">£{plan.price}</span>
                    <span className="text-white/40 text-sm font-medium">{plan.period}</span>
                  </div>
                  <p className="text-white/40 text-sm font-medium leading-relaxed italic">{plan.description}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">Includes:</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-3 text-white/60 group">
                        <Check size={16} className="text-primary flex-shrink-0" />
                        <span className="text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                 <Link href="/auth/signup"><Button fullWidth size="lg">{plan.buttonText}</Button></Link>
                 <div className="flex items-center justify-center space-x-2 text-[10px] text-white/40 font-black uppercase tracking-tighter">
                    <ShieldCheck size={14} className="text-primary" />
                    <span>Secure Checkout via Razorpay</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-white/5 max-w-5xl mx-auto">
           <div className="space-y-4 text-center">
              <div className="inline-flex h-12 w-12 rounded-2xl bg-primary/10 items-center justify-center text-primary">
                 <Zap size={24} />
              </div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Instant Activation</h4>
              <p className="text-xs text-white/40 font-medium leading-relaxed">Start supporting your charity and entering draws immediately after payment.</p>
           </div>
           <div className="space-y-4 text-center">
              <div className="inline-flex h-12 w-12 rounded-2xl bg-gold/10 items-center justify-center text-gold">
                 <Star size={24} />
              </div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Premium Rewards</h4>
              <p className="text-xs text-white/40 font-medium leading-relaxed">Access exclusive golf gear discounts and partner rewards only for members.</p>
           </div>
           <div className="space-y-4 text-center">
              <div className="inline-flex h-12 w-12 rounded-2xl bg-[#32CD3210] items-center justify-center text-[#32CD32]">
                 <Info size={24} />
              </div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">No Commitment</h4>
              <p className="text-xs text-white/40 font-medium leading-relaxed">Cancel or switch tiers anytime directly from your dashboard. No hidden fees.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
