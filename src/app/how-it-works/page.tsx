'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Heart, 
  Target, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe 
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Join the Club",
      description: "Create your professional account and select a membership tier (Monthly or Annual). Every membership includes 1 base entry per month.",
      color: "text-signal",
      bg: "bg-signal/10"
    },
    {
      icon: Heart,
      title: "Choose Your Cause",
      description: "Select one of our verified global charities to support. 50% of our platform profits go directly to the cause you choose.",
      color: "text-gold",
      bg: "bg-gold/10"
    },
    {
      icon: Target,
      title: "Log Your Score",
      description: "After your round, upload your official scorecard to your dashboard. Verified scores increase your winning probability multiplier.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: Trophy,
      title: "Win Monthly Draws",
      description: "Every month, we draw winners for significant cash prizes. Winners are announced live on our platform and social channels.",
      color: "text-signal",
      bg: "bg-signal/10"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="active">THE BLUEPRINT</Badge>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
            How it <span className="text-primary">Works.</span>
          </h1>
          <p className="text-xl text-white/40 font-medium leading-relaxed max-w-2xl mx-auto">
            GreenDraw combines the prestige of golf with the power of philanthropy. Here is how we turn your game into global change.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-white/5 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 space-y-6"
            >
              <div className={`w-24 h-24 rounded-3xl ${step.bg} flex items-center justify-center border border-white/5 shadow-2xl backdrop-blur-xl`}>
                <step.icon size={40} className={step.color} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">{step.title}</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="glass-card p-12 lg:p-20 relative overflow-hidden rounded-[3rem] border-white/5">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-8">
                 <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                   Transparent. <br />
                   <span className="text-primary">Transformative.</span>
                 </h2>
                 <p className="text-lg text-white/40 font-medium leading-relaxed">
                   At GreenDraw, we believe in radical transparency. Every donation is tracked on the blockchain and verified by third-party auditors to ensure your membership makes the maximum impact.
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <ShieldCheck className="text-primary" size={32} />
                       <p className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">Audited <br />Results</p>
                    </div>
                    <div className="space-y-2">
                       <Globe className="text-gold" size={32} />
                       <p className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">Global <br />Reach</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-6 bg-white/5 p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl">
                 <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Platform Allocations</h4>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-white">Charity Funding</span>
                          <span className="text-primary">50%</span>
                       </div>
                       <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-1/2" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-white">Prize Pool</span>
                          <span className="text-gold">40%</span>
                       </div>
                       <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                          <div className="h-full bg-gold w-[40%]" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-white">Operations</span>
                          <span className="text-white/20">10%</span>
                       </div>
                       <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                          <div className="h-full bg-white/20 w-[10%]" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-10 py-20 border-t border-white/5">
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest leading-none">Ready to Tee Off?</h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/auth/signup"><Button size="lg">Get Started Now <ArrowRight size={20} className="ml-2" /></Button></Link>
              <Link href="/pricing"><Button variant="secondary" size="lg">View Pricing</Button></Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
