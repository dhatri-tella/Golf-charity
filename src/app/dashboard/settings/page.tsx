'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  User, 
  Mail, 
  Lock, 
  CreditCard, 
  Heart, 
  Bell, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Hexagon,
  X,
  PlusCircle,
  Archive,
  Zap,
  Globe,
  Database,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';
import CharitySelector from '@/components/auth/CharitySelector';

const SettingsPage = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [showCharitySelector, setShowCharitySelector] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchUserData();
  }, [supabase]);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUser(user);
    
    const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (profile) {
       setProfile(profile);
       setFullName(profile.full_name || '');
    }

    const { data: sub } = await supabase.from('subscriptions').select('*, charity:charity_id(*)').eq('user_id', user.id).single();
    if (sub) setSubscription(sub);
    
    setLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('users').update({ full_name: fullName }).eq('id', user.id);
    if (!error) {
       setSuccess("Identity Sequence Updated.");
       setTimeout(() => setSuccess(null), 4000);
    }
    setSaving(false);
  };

  const handleChangeCharity = async (charityId: string) => {
    setSaving(true);
    const { error } = await supabase.from('subscriptions').update({ charity_id: charityId }).eq('user_id', user.id);
    if (!error) {
       setSuccess("Core Charity Target Reconfigured.");
       fetchUserData();
       setShowCharitySelector(false);
       setTimeout(() => setSuccess(null), 4000);
    }
    setSaving(false);
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
       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Loading System Config...</span>
    </div>
  );

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-24"
    >
      {/* Header Section */}
      <motion.div variants={item} className="flex flex-col lg:flex-row items-center justify-between gap-10">
         <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
               <Cpu className="w-5 h-5 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Global Environment Settings</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Platform <span className="gradient-text-animated">Control</span></h1>
            <p className="text-white/30 max-w-xl font-bold text-lg leading-relaxed tracking-tight">
               Manage your operational parameters, subscription architecture, and charitable focus from a centralized command center.
            </p>
         </div>
         
         <div className="bg-navy-light/10 border border-white/5 px-8 py-4 rounded-[2rem] flex items-center space-x-4 backdrop-blur-3xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="w-10 h-10 bg-primary/20 text-primary border border-primary/30 rounded-xl flex items-center justify-center transition-all group-hover:rotate-12">
               <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Identity System Verified</span>
               <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mt-1">2FA Status: Inactive</span>
            </div>
         </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
         {/* Navigation Pane */}
         <motion.div variants={item} className="lg:col-span-1 space-y-4 sticky top-6">
            {[
               { name: 'Core Identity', icon: User, tab: 'identity' },
               { name: 'Platform Tier', icon: CreditCard, tab: 'billing' },
               { name: 'Impact Focus', icon: Heart, tab: 'charity' },
               { name: 'Access Key', icon: Lock, tab: 'security' },
               { name: 'Protocol Alert', icon: Bell, tab: 'notifications' },
            ].map((nav, i) => (
               <button 
                  key={nav.tab}
                  className={cn(
                     "w-full flex items-center space-x-5 p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
                     nav.tab === 'identity' 
                        ? "bg-primary text-white border-primary shadow-[0_15px_30px_rgba(139,92,246,0.2)]" 
                        : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/20 hover:text-white"
                  )}
               >
                  <nav.icon className={cn("w-5 h-5 relative z-10 transition-colors", nav.tab === 'identity' ? "text-white" : "text-white/40 group-hover:text-primary")} />
                  <span className="font-black uppercase text-[10px] tracking-widest relative z-10">{nav.name}</span>
               </button>
            ))}
         </motion.div>

         {/* Content Pane */}
         <div className="lg:col-span-3 space-y-12">
            {/* Identity Form */}
            <motion.div variants={item} className="glass-card p-12 border-white/5 space-y-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <User className="w-32 h-32 -rotate-12 translate-x-10 -translate-y-10" />
               </div>
               
               <div className="flex items-center space-x-4 mb-2">
                  <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center">
                     <User className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Core Identity</h3>
               </div>

               <form onSubmit={handleUpdateProfile} className="space-y-10 relative z-10">
                  <div className="grid md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 block ml-1">Legal Full Name</label>
                        <div className="relative group">
                           <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-primary transition-colors" />
                           <input 
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full bg-navy-dark/40 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all font-black text-white shadow-inner"
                              placeholder="Tiger Woods"
                           />
                        </div>
                     </div>
                     <div className="space-y-4 opacity-50 cursor-not-allowed">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 block ml-1">Email Protocol (Hard Lockdown)</label>
                        <div className="relative">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
                           <input 
                              readOnly
                              value={user?.email || ''}
                              className="w-full bg-navy-dark/40 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none font-black text-white/40"
                           />
                        </div>
                     </div>
                  </div>

                  <motion.button 
                     type="submit"
                     disabled={saving}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="group bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 hover:shadow-3xl hover:shadow-primary/40 transition-all border border-white/10"
                  >
                     {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Commit Parameters</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                  </motion.button>
               </form>
            </motion.div>

            {/* Subscription Section */}
            <motion.div variants={item} className="glass-card p-12 border-white/5 space-y-10 group overflow-hidden">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-secondary/10 text-secondary border border-secondary/20 rounded-2xl flex items-center justify-center">
                        <CreditCard className="w-7 h-7" />
                     </div>
                     <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Platform Tier</h3>
                  </div>
                  <div className={cn(
                     'px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border transition-all',
                     subscription?.status === 'active' 
                        ? 'bg-primary/20 text-primary border-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
                        : 'bg-red-500/20 text-red-500 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                  )}>
                     {subscription?.status || 'No Plan'} Tier Active
                  </div>
               </div>

               <div className="p-10 bg-navy-dark/40 border border-white/5 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-12 group-hover:bg-navy-dark/60 transition-all duration-700">
                  <div className="space-y-6 text-center lg:text-left">
                     <div className="space-y-2">
                        <span className="block text-6xl font-black text-white tracking-tighter">
                           {subscription?.plan === 'yearly' ? '£199.99' : '£24.99'} 
                        </span>
                        <div className="flex items-center justify-center lg:justify-start space-x-3 text-white/30 font-black uppercase tracking-[0.4em] text-[10px]">
                           <span>Billed {subscription?.plan || 'monthly'}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                           <span className="text-secondary animate-pulse">Next renewal: March 12, 2025</span>
                        </div>
                     </div>
                     <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        {['5 Entry Pass', 'Impact Shield', 'Instant Access'].map((f, i) => (
                           <div key={i} className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                              <Zap className="w-3 h-3 text-primary" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-white/50">{f}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-all shadow-3xl group/btn"
                  >
                     <div className="flex items-center space-x-3">
                        <Globe className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
                        <span>Manage via Stripe</span>
                     </div>
                  </motion.button>
               </div>
            </motion.div>

            {/* Charity Section */}
            <motion.div variants={item} className="glass-card p-12 border-white/5 space-y-10 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                   <Heart className="w-32 h-32 rotate-12 translate-x-10 translate-y-10" />
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center">
                         <Heart className="w-7 h-7" />
                      </div>
                      <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Impact Focus</h3>
                   </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.01, x: 10 }}
                  className="p-10 bg-navy-dark/40 border border-white/5 rounded-[2.5rem] flex items-center justify-between hover:bg-navy-dark/60 hover:border-primary/20 transition-all duration-500 cursor-pointer group/charity relative z-10 overflow-hidden" 
                  onClick={() => setShowCharitySelector(true)}
                >
                   <div className="absolute left-0 top-0 w-1 h-full bg-primary opacity-0 group-hover/charity:opacity-100 transition-opacity" />
                   
                   <div className="flex items-center space-x-8">
                      <div className="w-20 h-20 bg-primary/20 border border-primary/30 rounded-[1.5rem] flex items-center justify-center text-primary group-hover/charity:scale-110 group-hover/charity:rotate-12 transition-all duration-700 shadow-2xl">
                         <Heart className="w-10 h-10 fill-current drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
                      </div>
                      <div className="space-y-2">
                         <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Primary Foundation Target</span>
                         <span className="block text-3xl font-black text-white tracking-tighter">{subscription?.charity?.name || 'Reaching System...'}</span>
                      </div>
                   </div>
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover/charity:bg-primary group-hover/charity:text-white transition-all shadow-xl">
                      <Settings className="w-6 h-6 text-white/20 group-hover/charity:animate-spin-slow" />
                   </div>
                </motion.div>
            </motion.div>
         </div>
      </div>

      {/* Modern Overlays */}
      <AnimatePresence>
         {showCharitySelector && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/90 backdrop-blur-3xl"
            >
               <motion.div
                  initial={{ scale: 0.9, y: 50, filter: 'blur(10px)' }}
                  animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ scale: 0.9, y: 50, filter: 'blur(10px)' }}
                  className="w-full max-w-xl glass-card p-12 relative overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.2)] border-primary/30"
               >
                  <motion.button 
                    whileHover={{ rotate: 90, scale: 1.2 }}
                    onClick={() => setShowCharitySelector(false)} 
                    className="absolute top-8 right-8 text-white/20 hover:text-white transition-all"
                  >
                     <X className="w-6 h-6" />
                  </motion.button>
                  
                  <div className="mb-12">
                     <div className="flex items-center space-x-3 mb-2 text-primary">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">Target Reconfiguration</span>
                     </div>
                     <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Update Focus</h3>
                     <p className="text-white/30 text-base font-bold tracking-tight mt-2">Redirect your future 10% impact flow to a new global partner.</p>
                  </div>

                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar-minimal pr-4">
                     <CharitySelector 
                       onSelect={handleChangeCharity} 
                       selectedId={subscription?.charity_id} 
                     />
                  </div>
                  
                  {saving && (
                     <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-xl flex flex-col items-center justify-center z-50 space-y-4">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Re-routing Flow...</span>
                     </div>
                  )}
               </motion.div>
            </motion.div>
         )}

         {success && (
            <motion.div
               initial={{ opacity: 0, x: 50, scale: 0.9 }}
               animate={{ opacity: 1, x: 0, scale: 1 }}
               exit={{ opacity: 0, x: 50, scale: 0.9 }}
               className="fixed bottom-12 right-12 z-[100] bg-primary text-white border border-white/20 p-6 rounded-3xl shadow-4xl flex items-center space-x-5"
            >
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
               <span className="font-black text-xs uppercase tracking-widest">{success}</span>
            </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SettingsPage;
