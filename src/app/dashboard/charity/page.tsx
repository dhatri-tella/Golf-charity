'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Settings, 
  TrendingUp, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Loader2,
  AlertCircle,
  Trophy,
  Activity,
  ArrowRight,
  Zap,
  Globe,
  HandHeart,
  Star
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';
import { Charity, Subscription } from '@/types';
import Link from 'next/link';

const CharityPage = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [charity, setCharity] = useState<Charity | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [percentage, setPercentage] = useState(10);
  const [totalContributed, setTotalContributed] = useState(125.40); 
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchCharityData();
  }, [supabase]);

  const fetchCharityData = async () => {
    let currentUser = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      currentUser = user;
    }

    if (!currentUser) {
      // Demo mode fallback
      const localUser = localStorage.getItem('demo_user');
      if (!localUser) { setLoading(false); return; }
      
      const savedCharity = JSON.parse(localStorage.getItem('demo_charity') || 'null');
      const savedPct = parseInt(localStorage.getItem('demo_charity_pct') || '10');
      
      setCharity(savedCharity || {
        id: 'demo-charity-1',
        name: 'Global Golf Foundation',
        description: 'Providing golf access to underserved communities worldwide. Empowering youth through sport, discipline, and character development.',
        website: 'https://globalgolffoundation.org',
        logo_url: null,
      } as any);
      setPercentage(savedPct);
      setTotalContributed(parseFloat(localStorage.getItem('demo_charity_total') || '125.40'));
      setLoading(false);
      return;
    }

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('*, charity:charity_id(*)')
      .eq('user_id', currentUser.id)
      .single();

    if (sub) {
       setSubscription(sub as any);
       setCharity((sub as any).charity);
       setPercentage((sub as any).charity_percentage || 10);
    }
    setLoading(false);
  };

  const handleUpdatePercentage = async (val: number) => {
    setPercentage(val);
    setUpdating(true);

    let currentUser = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      currentUser = user;
    }

    if (!currentUser) {
      // Demo mode: save to localStorage
      localStorage.setItem('demo_charity_pct', val.toString());
      setTimeout(() => setUpdating(false), 300);
      return;
    }
    
    await supabase
      .from('subscriptions')
      .update({ charity_percentage: val })
      .eq('user_id', currentUser.id);
      
    setUpdating(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
       <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
       </div>
       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Decrypting Impact Data...</span>
    </div>
  );

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {/* Header Section */}
      <motion.div variants={item} className="flex flex-col lg:flex-row items-center justify-between gap-10">
         <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
               <Globe className="w-5 h-5 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Global Impact Controller</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Impact <span className="gradient-text-animated">Dashboard</span></h1>
            <p className="text-white/30 max-w-xl font-bold text-lg leading-relaxed tracking-tight">
               Every professional round you play fuels substantial change through your chosen foundation. Track your legacy below.
            </p>
         </div>

         <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center px-10 py-6 glass-card border border-primary/20 bg-primary/5 rounded-[2.5rem] shadow-2xl shadow-primary/10 relative overflow-hidden group"
         >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2">Total Contribution</span>
            <span className="block text-5xl font-black text-white tracking-tighter tabular-nums">{formatCurrency(totalContributed)}</span>
         </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Featured Charity Card */}
         <motion.div
            variants={item}
            whileHover={{ y: -10 }}
            className="lg:col-span-1"
         >
            <div className="relative group glass-card p-1 items-center justify-center overflow-hidden h-full flex flex-col min-h-[550px] border-primary/20 shadow-3xl shadow-primary/5 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent opacity-90 z-10" />
                
                <div className="relative z-20 flex flex-col items-center justify-center text-center p-12 space-y-8">
                   <motion.div 
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="w-32 h-32 bg-primary/20 rounded-[3rem] flex items-center justify-center backdrop-blur-3xl mb-4 border border-primary/30 shadow-2xl"
                   >
                      <HandHeart className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
                   </motion.div>
                   
                   <div className="space-y-4">
                      <h2 className="text-4xl font-black text-white tracking-tighter">{charity?.name || 'Vanguard Foundation'}</h2>
                      <div className="inline-flex items-center px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                         Verified Global Partner
                      </div>
                   </div>

                   <p className="text-white/40 text-sm font-bold leading-loose italic line-clamp-4 tracking-tight px-4">
                      "{charity?.description || 'Chosen as your primary vehicle for social transformation. 10% of all platform activities flow directly to this organization.'}"
                   </p>
                   
                   <div className="pt-8 w-full space-y-4">
                      <motion.a 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={charity?.website || '#'} 
                        target="_blank" 
                        className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl font-black text-white flex items-center justify-center space-x-3 hover:bg-white/10 transition-all group/link"
                      >
                         <span className="text-[10px] uppercase tracking-widest leading-none">Intelligence Feed</span>
                         <ExternalLink className="w-4 h-4 text-white/20 group-hover/link:text-primary transition-colors" />
                      </motion.a>
                      
                      <Link href="/charities" className="w-full bg-primary text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(139,92,246,0.5)] border border-white/10">
                         <Settings className="w-5 h-5" />
                         <span className="text-[10px] uppercase tracking-widest leading-none">Reconfigure Core</span>
                      </Link>
                   </div>
                </div>

                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>
         </motion.div>

         {/* Configuration & Details */}
         <div className="lg:col-span-2 space-y-12">
            {/* Allocation Settings */}
            <motion.div variants={item} className="glass-card p-12 border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-1000" />
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                        <Activity className="w-7 h-7" />
                     </div>
                     <h3 className="text-3xl font-black text-white tracking-tighter">Impact Velocity</h3>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                     <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">System Baseline:</span>
                     <span className="text-xs font-black text-primary uppercase tracking-widest">10% Active</span>
                  </div>
               </div>

               <div className="space-y-16 relative z-10">
                  <div className="space-y-8">
                     <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Voluntary Multiplier</label>
                        <div className="flex items-center space-x-6">
                           <motion.span 
                              key={percentage}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-5xl font-black text-white tracking-tighter"
                           >
                              {percentage}%
                           </motion.span>
                           {updating && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                        </div>
                     </div>
                     
                     <div className="relative pt-4 px-2">
                        <input
                           type="range"
                           min="10"
                           max="100"
                           step="5"
                           value={percentage}
                           onChange={(e) => handleUpdatePercentage(parseInt(e.target.value))}
                           className="w-full h-3 bg-white/5 border border-white/10 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(139,92,246,0.6)] shadow-inner"
                        />
                        <div className="flex justify-between mt-8 text-[9px] font-black uppercase tracking-[0.4em] text-white/15">
                           <span className={cn(percentage === 10 ? 'text-primary' : '')}>Base Tier (10%)</span>
                           <span className={cn(percentage === 100 ? 'text-primary' : '')}>Founder Tier (100%)</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     {[
                        { icon: Trophy, color: 'text-secondary bg-secondary/10', title: 'Global Standing', desc: 'Higher multipliers boost your "Social Hero" ranking in monthly draws.' },
                        { icon: ShieldCheck, color: 'text-primary bg-primary/10', title: 'Lossless Flow', desc: '100% of your voluntary increase is transmitted directly. Zero platform fees.' }
                     ].map((box, i) => (
                        <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6 hover:bg-white/[0.08] transition-all group/box">
                           <div className="flex items-center justify-between">
                              <box.icon className={cn('w-8 h-8 transition-transform group-hover/box:scale-110 group-hover/box:rotate-6', box.color.split(' ')[0])} />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/15">Intelligence Module</span>
                           </div>
                           <h4 className="text-lg font-black text-white tracking-tight">{box.title}</h4>
                           <p className="text-sm font-bold text-white/30 leading-relaxed group-hover/box:text-white/60 transition-colors">
                              {box.desc}
                           </p>
                        </div>
                     ))}
                  </div>

                  <motion.button 
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 text-primary font-black text-xs uppercase tracking-[0.3em] group"
                  >
                     <span>Initiate Independent Transfer</span>
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
               </div>
            </motion.div>

            {/* Impact History */}
            <motion.div variants={item} className="space-y-8">
               <h3 className="text-2xl font-black tracking-tighter flex items-center space-x-3">
                  <Activity className="text-primary w-6 h-6" />
                  <span>Cycle History</span>
               </h3>
               
               <div className="space-y-4">
                  {[
                     { date: 'March 12, 2024', amount: '£2.50', type: 'Platform Feed', ref: 'SUB-4982', icon: Zap },
                     { date: 'February 12, 2024', amount: '£2.50', type: 'Platform Feed', ref: 'SUB-4102', icon: Zap },
                     { date: 'January 25, 2024', amount: '£50.00', type: 'External Burst', ref: 'DON-1022', icon: Star },
                  ].map((row, i) => (
                     <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.01, x: 10 }}
                        className="group glass-card p-8 flex items-center justify-between border-white/5 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 overflow-hidden relative"
                     >
                        <div className="absolute left-0 top-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex items-center space-x-8 relative z-10">
                           <div className="w-16 h-16 bg-navy-dark border border-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                              <row.icon className="w-7 h-7" />
                           </div>
                           <div className="space-y-2">
                              <span className="block text-white font-black text-2xl tracking-tighter">{row.date}</span>
                              <div className="flex items-center space-x-3">
                                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/15">Ref ID: {row.ref}</span>
                                 <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{row.type}</span>
                              </div>
                           </div>
                        </div>
                        
                        <div className="text-right space-y-1 relative z-10">
                           <span className="block text-3xl font-black text-primary tracking-tighter tabular-nums">{row.amount}</span>
                           <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                              Transmitted
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
};

export default CharityPage;
