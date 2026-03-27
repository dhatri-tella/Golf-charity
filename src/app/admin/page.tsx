'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  Trophy, 
  Heart, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  ArrowUpRight,
  Zap,
  Star,
  ShieldAlert,
  Hexagon,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const AdminAnalyticsPage = () => {
  const [stats, setStats] = useState({
    activeSubscribers: 12500,
    subscriberTrend: '+12.5%',
    totalPrizePool: 45000.00,
    totalDonated: 254120.00,
    revenue: 550000.00,
    revenueTrend: '+8.2%'
  });
  const [charityBreakdown, setCharityBreakdown] = useState([
    { name: 'Youth Sports Foundation', amount: 12500, color: 'primary' },
    { name: 'Clean Oceans Project', amount: 8400, color: 'blue' },
    { name: 'Habitat for Future', amount: 6200, color: 'gold' },
    { name: 'Health Global Initiative', amount: 5100, color: 'primary' },
  ]);

  const cards = [
    { label: 'Active Subscribers', value: stats.activeSubscribers.toLocaleString(), icon: Users, color: 'primary', trend: stats.subscriberTrend },
    { label: 'Total Prize Pool', value: formatCurrency(stats.totalPrizePool), icon: Trophy, color: 'gold', trend: '+15.4%' },
    { label: 'Charity Contributions', value: formatCurrency(stats.totalDonated), icon: Heart, color: 'primary', trend: '+10.2%' },
    { label: 'Gross Platform Revenue', value: formatCurrency(stats.revenue), icon: TrendingUp, color: 'gold', trend: stats.revenueTrend },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-4">
            <h1 className="text-4xl font-black text-white">Platform <span className="text-gold">Analytics</span></h1>
            <p className="text-white/40 max-w-lg font-medium leading-relaxed">
               Real-time insights into subscriber growth, prize pool dynamics, and charitable impact.
            </p>
         </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {cards.map((card, index) => (
            <motion.div
               key={card.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 * index }}
               className="glass-card p-6 border-white/5 hover:border-gold/20 transition-all group"
            >
               <div className="flex flex-col h-full space-y-6">
                  <div className="flex items-center justify-between">
                     <div className={cn(
                        'w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6 shadow-2xl',
                        card.color === 'primary' ? 'bg-primary text-white' : 'bg-gold text-white'
                     )}>
                        <card.icon className="w-6 h-6" />
                     </div>
                     <span className="text-[10px] font-black text-gold uppercase tracking-[2px]">{card.trend}</span>
                  </div>
                  <div>
                     <span className="block text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{card.label}</span>
                     <span className="block text-2xl font-black text-white">{card.value}</span>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart Card (Subscriber Growth Placeholder) */}
         <div className="lg:col-span-2 glass-card p-10 border-white/5 space-y-10 min-h-[450px] flex flex-col">
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="text-2xl font-black mb-2">Subscriber Volume</h3>
                  <p className="text-white/40 text-sm font-medium italic">Active subscription trends over the last 12 months.</p>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-gold" /><span className="text-xs font-bold text-white/60">Actual</span></div>
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-white/10" /><span className="text-xs font-bold text-white/60">Target</span></div>
               </div>
            </div>

            <div className="flex-grow flex items-end justify-between px-6 relative">
               {[0, 25, 50, 75, 100].map(val => (<div key={val} className="absolute left-0 right-0 border-t border-white/5" style={{ bottom: `${val}%` }} />))}
               {/* Simplified area chart simulation with bars */}
               {[65, 72, 68, 80, 85, 92, 88, 95, 105, 115, 128, 140].map((v, i) => (
                  <div key={i} className="relative group w-8">
                     <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(v / 150) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className={cn('w-full rounded-t-lg transition-all', i === 11 ? 'bg-gold shadow-2xl shadow-gold/20' : 'bg-white/5 group-hover:bg-white/10')}
                     />
                  </div>
               ))}
            </div>
            
            <div className="flex justify-between px-6 text-[8px] font-black uppercase tracking-widest text-white/20">
               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (<span key={m}>{m}</span>))}
            </div>
         </div>

         {/* Charity Breakdown Pie Chart Alternative */}
         <div className="lg:col-span-1 glass-card p-10 border-white/5 space-y-10">
            <h3 className="text-2xl font-black">Impact Distribution</h3>
            
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="80" className="stroke-white/5 fill-none" strokeWidth="20" />
                  <circle cx="96" cy="96" r="80" className="stroke-primary fill-none" strokeWidth="20" strokeDasharray={`${(12500 / 32200) * 502} 502`} />
                  <circle cx="96" cy="96" r="80" className="stroke-gold fill-none" strokeWidth="20" strokeDasharray={`${(8400 / 32200) * 502} 502`} strokeDashoffset={`${-(12500 / 32200) * 502}`} />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">£32.2k</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">This Period</span>
               </div>
            </div>

            <div className="space-y-4">
               {charityBreakdown.map(c => (
                  <div key={c.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                     <div className="flex items-center space-x-3">
                        <div className={cn('w-3 h-3 rounded-full', c.color === 'primary' ? 'bg-primary' : 'bg-gold')} />
                        <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{c.name}</span>
                     </div>
                     <span className="text-xs font-black text-white/40">{formatCurrency(c.amount)}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="glass-card p-8 border-white/5 flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold"><Star className="w-6 h-6" /></div>
               <h4 className="text-lg font-black uppercase tracking-tight">Match Distribution</h4>
            </div>
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span className="text-white/40">5-Match (Jackpot)</span><span className="text-white">1 Winner</span></div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gold" style={{ width: '5%' }} /></div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span className="text-white/40">4-Match</span><span className="text-white">12 Winners</span></div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: '25%' }} /></div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span className="text-white/40">3-Match</span><span className="text-white">84 Winners</span></div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-white/20" style={{ width: '70%' }} /></div>
               </div>
            </div>
         </div>

         <div className="glass-card p-10 border-gold/20 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-6 shadow-2xl shadow-gold/5">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-4">
               <Zap className="w-10 h-10 text-gold" />
            </div>
            <div className="space-y-2">
               <h4 className="text-2xl font-black">Platform Profitability</h4>
               <p className="text-white/40 text-sm font-medium max-w-xs mx-auto">Operating at <strong>18.4%</strong> efficiency after prize pool and charity allocations.</p>
            </div>
            <button className="flex items-center space-x-3 text-gold font-black hover:underline transition-all">
               <span>View Revenue Breakdown</span>
               <ArrowUpRight className="w-5 h-5" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
