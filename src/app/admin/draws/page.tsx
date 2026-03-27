'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Calendar, 
  Settings, 
  Archive, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  Play,
  Activity,
  ArrowRight,
  TrendingUp,
  History,
  Star,
  Target,
  ChevronRight,
  MoreVertical,
  Hexagon,
  Trash2,
  Lock,
  Search
} from 'lucide-react';
import { cn, generateDrawNumbers, formatCurrency } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const AdminDrawManagementPage = () => {
  const [draws, setDraws] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [simResults, setSimResults] = useState<any | null>(null);
  const [config, setConfig] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    logic: 'random' as 'random' | 'algorithmic'
  });
  const supabase = createClientComponentClient();

  const fetchDraws = async () => {
    const { data, error } = await supabase.from('draws').select('*').order('created_at', { ascending: false });
    if (!error && data) setDraws(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDraws();
  }, [supabase]);

  const handleSimulate = async () => {
    setSimulating(true);
    setSimResults(null);

    // Simulate drawing numbers
    const drawn = generateDrawNumbers(5);
    
    // Create draft draw in DB
    const { data: draw, error } = await supabase.from('draws').insert({
       month: config.month,
       year: config.year,
       logic_type: config.logic,
       drawn_numbers: drawn,
       status: 'simulated'
    }).select().single();

    if (error) {
       alert(error.message);
       setSimulating(false);
       return;
    }

    // Identify potential winners (algorithmic mockup)
    const { data: activeSubs } = await supabase.from('users').select('*, scores(*)').eq('role', 'subscriber');
    
    const winners: any[] = [];
    if (activeSubs) {
       activeSubs.forEach((user: any) => {
          const userScores = user.scores?.slice(0, 5).map((s: any) => s.score) || [];
          const matches = userScores.filter((s: any) => drawn.includes(s)).length;
          if (matches >= 3) {
             winners.push({ user_id: user.id, user, matches, prize: matches === 5 ? 18000 : matches === 4 ? 1200 : 250 });
          }
       });
    }

    setSimResults({ draw, drawn, winners });
    setSimulating(false);
    fetchDraws();
  };

  const handlePublish = async () => {
    if (!simResults) return;
    setPublishing(true);

    // 1. Mark draw as published
    const { error: drawError } = await supabase
       .from('draws')
       .update({ status: 'published' })
       .eq('id', simResults.draw.id);

    if (drawError) {
       alert(drawError.message);
       setPublishing(false);
       return;
    }

    // 2. Insert draw_results
    const resultsData = simResults.winners.map((w: any) => ({
       draw_id: simResults.draw.id,
       user_id: w.user_id,
       match_type: w.matches.toString(),
       prize_amount: w.prize,
       verification_status: 'pending',
       payout_status: 'pending'
    }));

    if (resultsData.length > 0) {
       const { error: resultsError } = await supabase.from('draw_results').insert(resultsData);
       if (resultsError) {
          alert(resultsError.message);
          setPublishing(false);
          return;
       }
    }

    setPublishing(false);
    setSimResults(null);
    setShowConfigModal(false);
    fetchDraws();
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-4">
            <h1 className="text-4xl font-black text-white">Draw <span className="text-gold">Command</span></h1>
            <p className="text-white/40 max-w-lg font-medium leading-relaxed">
               Execute monthly prize draws, configure RNG logic, and validate match distributions before publishing official results.
            </p>
         </div>

         <button
            onClick={() => setShowConfigModal(true)}
            className="group p-6 bg-gold text-white rounded-2xl flex items-center space-x-3 font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gold/30"
         >
            <Play className="w-6 h-6 fill-current" />
            <span>Initialize New Draw</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Draw History Feed */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center space-x-3">
               <History className="text-white/40 w-5 h-5" />
               <span>Historical Executions</span>
            </h3>
            
            <div className="space-y-4">
               {loading ? (
                  <div className="py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-gold" /></div>
               ) : (
                  draws.map((d, index) => (
                     <div key={d.id} className="group glass-card p-8 border-white/5 hover:bg-white/[0.03] transition-all relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center space-x-8">
                           <div className={cn(
                              'w-16 h-16 rounded-[24px] flex flex-col items-center justify-center font-black relative shadow-2xl',
                              d.status === 'published' ? 'bg-gold text-white' : 'bg-white/5 text-white/40'
                           )}>
                              <span className="text-sm">{d.month}</span>
                              <span className="text-[8px] uppercase tracking-widest leading-none mt-1">/ {d.year}</span>
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center space-x-4">
                                 <span className="text-xl font-black text-white">Monthly Reward Cycle</span>
                                 <div className={cn(
                                    'px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest',
                                    d.status === 'published' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/40'
                                 )}>
                                    {d.status}
                                 </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                 {d.drawn_numbers?.map((num: number) => (
                                    <div key={num} className={cn(
                                       'w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs border transition-all group-hover:scale-110',
                                       d.status === 'published' ? 'border-gold/40 text-gold' : 'border-white/10 text-white/20'
                                    )}>{num}</div>
                                 ))}
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-gold hover:text-white transition-all"><Search className="w-5 h-5" /></button>
                           <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>

         {/* Pool Statistics Sidebar */}
         <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-10 border-gold/20 flex flex-col items-center text-center space-y-8 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Star className="w-24 h-24 text-gold animate-spin-slow" />
               </div>

               <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-gold" />
               </div>

               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Pool Health</h3>
                  <div className="space-y-1">
                     <span className="block text-4xl font-black text-white">£45k+</span>
                     <span className="block text-[10px] font-black uppercase tracking-widest text-gold/60">Estimated Liquidity</span>
                  </div>
               </div>

               <div className="w-full pt-4 space-y-4">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                     <span className="text-xs font-bold text-white/40 italic">Active Pot Cycles</span>
                     <span className="text-[10px] font-black text-white/60">12 Months</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                     <span className="text-xs font-bold text-white/40 italic">Global Avg Match</span>
                     <span className="text-[10px] font-black text-primary uppercase">3.2 Numbers</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Draw Configuration Overlays */}
      <AnimatePresence>
         {showConfigModal && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/80 backdrop-blur-xl overflow-y-auto"
            >
               <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="w-full max-w-4xl glass-card p-12 relative overflow-hidden shadow-2xl border-gold/20"
               >
                  <button onClick={() => setShowConfigModal(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><X /></button>
                  
                  {!simResults ? (
                     <div className="space-y-12">
                        <div className="flex items-center space-x-6">
                           <div className="w-16 h-16 bg-gold/10 rounded-3xl flex items-center justify-center shadow-2xl">
                              <Trophy className="w-8 h-8 text-gold" />
                           </div>
                           <div>
                              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Initialize Execution</h3>
                              <p className="text-white/40 font-medium italic">Configure draw parameters to run simulation.</p>
                           </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Reference Month</label>
                              <select 
                                 value={config.month}
                                 onChange={(e) => setConfig({ ...config, month: parseInt(e.target.value) })}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-gold/40 text-white font-bold"
                              >
                                 {Array.from({ length: 12 }).map((_, i) => (
                                    <option key={i+1} value={i+1} className="bg-navy">{new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(0, i))}</option>
                                 ))}
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Reference Year</label>
                              <input 
                                 type="number" 
                                 value={config.year}
                                 onChange={(e) => setConfig({ ...config, year: parseInt(e.target.value) })}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-gold/40 text-white font-bold" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Matching Logic</label>
                              <select 
                                 value={config.logic}
                                 onChange={(e) => setConfig({ ...config, logic: e.target.value as any })}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-gold/40 text-white font-bold"
                              >
                                 <option value="random" className="bg-navy">Pure RNG Random</option>
                                 <option value="algorithmic" className="bg-navy">Algorithmic Weighted</option>
                              </select>
                           </div>
                        </div>

                        <button
                           onClick={handleSimulate}
                           disabled={simulating}
                           className="w-full bg-gold text-white py-6 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-4 shadow-2xl shadow-gold/30"
                        >
                           {simulating ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Run Dry Simulation</span> <Activity className="w-5 h-5" /></>}
                        </button>
                     </div>
                  ) : (
                     <div className="space-y-10 animate-in fade-in zoom-in duration-500">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><ShieldCheck className="w-6 h-6" /></div>
                              <h3 className="text-2xl font-black text-white">Simulation Results</h3>
                           </div>
                           <button onClick={() => setSimResults(null)} className="text-[10px] font-black uppercase tracking-[3px] text-white/20 hover:text-white transition-colors">Discard Execution</button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                           <div className="col-span-1 glass-card p-8 border-white/10 space-y-6">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Drawn Performance Metrics</span>
                              <div className="grid grid-cols-2 gap-4">
                                 {simResults.drawn.map((n: number) => (
                                    <div key={n} className="bg-gold text-white py-4 rounded-xl text-center text-xl font-black shadow-lg shadow-gold/10">{n}</div>
                                 ))}
                              </div>
                           </div>

                           <div className="col-span-2 glass-card p-8 border-white/10">
                              <div className="flex items-center justify-between mb-8">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Identified Potential Winners</span>
                                 <span className="text-[10px] font-black text-primary uppercase tracking-widest">{simResults.winners.length} Success Cases</span>
                              </div>
                              
                              <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                 {simResults.winners.map((w: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                       <div className="flex items-center space-x-4">
                                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">{w.user.full_name?.[0]}</div>
                                          <div>
                                             <span className="text-xs font-bold block">{w.user.full_name}</span>
                                             <span className="text-[10px] text-white/20">{w.matches} Number Match</span>
                                          </div>
                                       </div>
                                       <span className="text-sm font-black text-gold">{formatCurrency(w.prize)}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>

                        <div className="p-8 bg-gold/10 border border-gold/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                           <div className="flex items-center space-x-4 text-center md:text-left">
                              <Hexagon className="w-10 h-10 text-gold animate-spin-slow" />
                              <div className="space-y-1">
                                 <h4 className="font-black text-lg text-white">Commit Official Publication?</h4>
                                 <p className="text-white/40 text-xs font-medium">This will publish results, notify winners, and lock the monthly pot.</p>
                              </div>
                           </div>
                           <button
                              onClick={handlePublish}
                              disabled={publishing}
                              className="w-full md:w-auto px-12 py-5 bg-gold text-white rounded-2xl font-black text-lg shadow-2xl shadow-gold/40 hover:scale-[1.05] transition-all flex items-center justify-center space-x-3"
                           >
                              {publishing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Publish Officially</span> <CheckCircle2 className="w-5 h-5" /></>}
                           </button>
                        </div>
                     </div>
                  )}
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDrawManagementPage;
