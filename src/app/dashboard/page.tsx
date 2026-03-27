'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Heart, 
  Target, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Star,
  Activity,
  Award
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const OverviewPage = () => {
  const [stats, setStats] = useState({
    totalWon: 0.00,
    totalDonated: 125.50,
    latestScore: null as number | null,
    drawEntryId: 'OCT-24-MATCH',
    countdown: '12d 04h 22m',
  });
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchStats = async () => {
      let currentUser = null;
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
      }
      
      if (!currentUser) {
        // Mock fallback for dashboard
        setUser({ user_metadata: { full_name: 'Demo Golfer' } });
        const localScores = JSON.parse(localStorage.getItem('mock_scores') || '[]');
        if (localScores.length > 0) {
           setStats(prev => ({ ...prev, latestScore: localScores[0].score }));
        }
        return;
      }

      setUser(currentUser);
      
      const { data: latestScore } = await supabase
        .from('scores')
        .select('score')
        .eq('user_id', currentUser?.id)
        .order('date_played', { ascending: false })
        .limit(1)
        .single();
        
      if (latestScore) setStats(prev => ({ ...prev, latestScore: latestScore.score }));
    };
    fetchStats();
  }, [supabase]);

  const cards = [
    {
      label: 'Performance Peak',
      value: stats.latestScore ? `${stats.latestScore} pts` : 'No scores',
      icon: Target,
      color: 'primary',
      trend: '+4.5% vs avg',
      link: '/dashboard/scores',
      glow: 'shadow-primary/20'
    },
    {
      label: 'Charity Legend',
      value: formatCurrency(stats.totalDonated),
      icon: Heart,
      color: 'secondary',
      trend: '10% of sub',
      link: '/dashboard/charity',
      glow: 'shadow-secondary/20'
    },
    {
       label: 'Jackpot Gains',
       value: formatCurrency(stats.totalWon),
       icon: Trophy,
       color: 'primary',
       trend: 'Elite Ranking',
       link: '/dashboard/winnings',
       glow: 'shadow-primary/20'
    },
    {
       label: 'Next Global Draw',
       value: stats.countdown,
       icon: Calendar,
       color: 'secondary',
       trend: 'Entry Locked',
       link: '/dashboard/draws',
       glow: 'shadow-secondary/20'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {/* Welcome Banner */}
      <motion.div 
        variants={item}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-8"
      >
        <div className="space-y-2">
           <div className="flex items-center space-x-3 text-primary mb-2">
              <Zap className="w-5 h-5 fill-current animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Live Analytics Feed</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
             Welcome, <span className="gradient-text-animated">{user?.user_metadata?.full_name?.split(' ')[0] || 'Golf Pro'}</span>
           </h1>
           <p className="text-white/30 font-bold text-lg tracking-tight">
             You are in the top 15% of performance tracking this month.
           </p>
        </div>
        
        <motion.div
           whileHover={{ scale: 1.02 }}
           className="bg-navy-light/20 border border-white/5 p-6 rounded-[2rem] flex items-center space-x-6 backdrop-blur-3xl group relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 relative z-10">
              <Star className="text-primary w-7 h-7 fill-current" />
           </div>
           <div className="relative z-10">
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Platinum Multiplier</span>
              <span className="block text-xl font-black text-white">+2 entries for next draw</span>
           </div>
        </motion.div>
      </motion.div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            variants={item}
            whileHover={{ y: -10, scale: 1.02 }}
            className={cn(
              "group relative p-8 glass-card border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden",
              "shadow-2xl hover:shadow-primary/5"
            )}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <card.icon className="w-20 h-20 -rotate-12 translate-x-4 -translate-y-4" />
            </div>
            
            <div className="flex flex-col h-full space-y-8 relative z-10">
               <div className="flex items-center justify-between">
                  <div className={cn(
                     'w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg',
                     card.color === 'primary' ? 'bg-primary text-white' : 'bg-secondary text-white'
                  )}>
                     <card.icon className="w-7 h-7" />
                  </div>
                  <div className={cn('flex items-center space-x-1.5 text-[9px] font-black uppercase tracking-[0.2em]', card.color === 'primary' ? 'text-primary' : 'text-secondary')}>
                     <TrendingUp className="w-3.5 h-3.5" />
                     <span>{card.trend}</span>
                  </div>
               </div>
               
               <div>
                  <span className="block text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{card.label}</span>
                  <span className="block text-4xl font-black text-white tracking-tighter">{card.value}</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Performance Visualization */}
         <motion.div
            variants={item}
            className="lg:col-span-2 glass-card p-12 border-white/5 min-h-[500px] flex flex-col relative overflow-hidden group"
         >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 relative z-10">
               <div>
                  <div className="flex items-center space-x-2 mb-2">
                     <Activity className="w-4 h-4 text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Metric Visualization</span>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tighter">Performance Analysis</h3>
                  <p className="text-white/40 text-sm font-medium mt-1">Stabledord performance over your last 5 professional entries.</p>
               </div>
               <div className="flex items-center bg-white/5 border border-white/10 p-2 rounded-2xl space-x-2">
                  <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">Analytics</button>
                  <button className="px-5 py-2.5 text-white/40 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors">History</button>
               </div>
            </div>
            
            <div className="flex-grow flex items-end justify-between px-12 relative h-[250px] mb-8">
               {/* Vertical grid lines */}
               {[0, 25, 50, 75, 100].map(val => (
                  <div key={val} className="absolute left-0 right-0 border-t border-white/[0.03]" style={{ bottom: `${val}%` }}>
                     <span className="absolute -left-8 -top-2 text-[8px] font-black text-white/10">{ (val * 45) / 100 }</span>
                  </div>
               ))}
               
               {/* Bar Chart Bars */}
               {[42, 38, 45, 39, 41].map((val, i) => (
                  <div key={i} className="relative group/bar w-20">
                     <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(val / 45) * 100}%` }}
                        transition={{ duration: 1.2, delay: 0.5 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        className="bg-primary/20 group-hover/bar:bg-primary/40 border-t-4 border-primary rounded-t-2xl transition-all relative shadow-[0_0_30px_rgba(139,92,246,0.1)] group-hover/bar:shadow-primary/30"
                     >
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-navy-dark border border-primary/40 p-3 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all text-xs font-black text-white whitespace-nowrap z-20 shadow-2xl scale-90 group-hover/bar:scale-100">
                           {val} Stableford Pts
                        </div>
                     </motion.div>
                     <span className="block text-center mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/15 group-hover/bar:text-primary transition-colors">Entry {i+1}</span>
                  </div>
               ))}
            </div>
         </motion.div>

         {/* Right Column Stats */}
         <motion.div
            variants={item}
            className="lg:col-span-1 space-y-10"
         >
            <div className="glass-card p-10 border-white/5 flex flex-col items-center text-center relative group overflow-hidden">
               <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="w-24 h-24 bg-secondary/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-secondary/20 relative z-10">
                  <Award className="w-12 h-12 text-secondary drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
               </div>
               <h3 className="text-2xl font-black mb-4 tracking-tighter relative z-10">Jackpot Tier</h3>
               <p className="text-white/30 font-bold text-sm mb-10 leading-relaxed max-w-[200px] relative z-10">You're tracking at an elite pace this month. Keep it up!</p>
               
               <div className="w-full space-y-3 relative z-10">
                  <div className="flex items-center justify-between w-full px-1">
                     <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Monthly Pulse</span>
                     <span className="text-xs font-black text-secondary uppercase tracking-widest">85% Elite</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: '85%' }}
                       className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                     />
                  </div>
               </div>
            </div>

            <div className="glass-card p-10 border-white/5 relative group overflow-hidden">
                <div className="flex items-center space-x-4 mb-8">
                   <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                     <ShieldCheck className="w-6 h-6 text-primary" />
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-tight text-white">Trust Center</h3>
                </div>
                <div className="space-y-4">
                   {[
                      { l: 'Identity Check', v: 'Verified', c: 'text-primary bg-primary/20' },
                      { l: 'Score Audit', v: '98% Accurate', c: 'text-accent bg-accent/20' },
                      { l: 'Global Ranking', v: '#1,204', c: 'text-white/40 bg-white/5' }
                   ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 group-hover:bg-white/10 rounded-2xl transition-all">
                        <span className="text-xs font-black uppercase tracking-[0.15em] text-white/30">{row.l}</span>
                        <span className={cn('text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest', row.c)}>{row.v}</span>
                      </div>
                   ))}
                </div>
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
};

export default OverviewPage;
