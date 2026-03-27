'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  History, 
  Trash2, 
  Edit3, 
  Calendar, 
  Target,
  ArrowRight,
  TrendingUp,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Zap,
  Activity
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';
import { Score } from '@/types';

const ScoreEntryPage = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    score: '',
    datePlayed: new Date().toISOString().split('T')[0],
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchScores();
  }, [supabase]);

  const fetchScores = async () => {
    let currentUser = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      currentUser = user;
    }

    if (!currentUser) {
      console.warn("Supabase auth missing, falling back to localStorage.");
      const localScores = JSON.parse(localStorage.getItem('mock_scores') || '[]');
      setScores(localScores);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('date_played', { ascending: false });

    if (error || !data) {
      const localScores = JSON.parse(localStorage.getItem('mock_scores') || '[]');
      setScores(localScores);
    } else {
      setScores(data);
    }
    setLoading(false);
  };

  const handleAddScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    const scoreNum = parseInt(formData.score);
    if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 45) {
       setError("Score must be between 1 and 45.");
       setSubmitting(false);
       return;
    }

    let currentUser = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      currentUser = user;
    }

    if (!currentUser) {
       // Mock fallback for adding scores
       let localScores = JSON.parse(localStorage.getItem('mock_scores') || '[]');
       const newScore = {
         id: `mock-${Date.now()}`,
         user_id: 'mock-user-id',
         score: scoreNum,
         date_played: formData.datePlayed,
         created_at: new Date().toISOString()
       };
       localScores.unshift(newScore);
       
       // Keep only 5 scores
       if (localScores.length > 5) {
         localScores = localScores.slice(0, 5);
       }
       
       localStorage.setItem('mock_scores', JSON.stringify(localScores));
       setSuccess("Score Cycle Updated Successfully (Demo).");
       setFormData({ score: '', datePlayed: new Date().toISOString().split('T')[0] });
       setShowAddForm(false);
       fetchScores();
       setSubmitting(false);
       setTimeout(() => setSuccess(null), 4000);
       return;
    }

    const { error: insertError } = await supabase
      .from('scores')
      .insert({
        user_id: currentUser.id,
        score: scoreNum,
        date_played: formData.datePlayed
      });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    const { data: allScores } = await supabase
      .from('scores')
      .select('id')
      .eq('user_id', currentUser.id)
      .order('date_played', { ascending: false });

    if (allScores && allScores.length > 5) {
       const idsToDelete = allScores.slice(5).map((s: any) => s.id);
       await supabase.from('scores').delete().in('id', idsToDelete);
    }

    setSuccess("Score Cycle Updated Successfully.");
    setFormData({ score: '', datePlayed: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
    fetchScores();
    setSubmitting(false);
    
    setTimeout(() => setSuccess(null), 4000);
  };

  const handleDeleteScore = async (id: string) => {
    let currentUser = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      currentUser = user;
    }

    if (!currentUser || id.startsWith('mock-')) {
       // Mock deletion
       let localScores = JSON.parse(localStorage.getItem('mock_scores') || '[]');
       localScores = localScores.filter((s: any) => s.id !== id);
       localStorage.setItem('mock_scores', JSON.stringify(localScores));
       setScores(localScores);
       setSuccess("Entry Purged From Cycle (Demo).");
       setTimeout(() => setSuccess(null), 3000);
       return;
    }

    const { error } = await supabase.from('scores').delete().eq('id', id);
    if (!error) {
       setScores(prev => prev.filter(s => s.id !== id));
       setSuccess("Entry Purged From Cycle.");
       setTimeout(() => setSuccess(null), 3000);
    }
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
               <Activity className="w-5 h-5 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Metric Injection System</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Performance <span className="gradient-text-animated">Flow</span></h1>
            <p className="text-white/30 max-w-xl font-bold text-lg leading-relaxed tracking-tight">
               Your standing is calculated from your latest 5 entries. Adding a new entry automatically cycles the oldest out to maintain peak accuracy.
            </p>
         </div>

         <div className="flex items-center space-x-8">
            <motion.div 
               whileHover={{ scale: 1.05 }}
               className="text-center px-10 py-6 glass-card border border-primary/20 bg-primary/5 rounded-[2.5rem] shadow-2xl shadow-primary/5"
            >
               <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2">Current Cycle Avg</span>
               <span className="block text-5xl font-black text-white tracking-tighter tabular-nums">
                  {scores.length > 0 ? (scores.reduce((a, b) => a + b.score, 0) / scores.length).toFixed(1) : '0.0'}
               </span>
            </motion.div>
            
            <motion.button
               onClick={() => setShowAddForm(!showAddForm)}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="group p-8 bg-primary text-white rounded-[2rem] flex flex-col items-center justify-center space-y-2 font-black text-xs uppercase tracking-widest transition-all shadow-3xl shadow-primary/40 border border-white/10"
            >
               {showAddForm ? (
                  <><span>Abort Log</span></>
               ) : (
                  <>
                    <PlusCircle className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                    <span>Log Entry</span>
                  </>
               )}
            </motion.button>
         </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Score Entry Form */}
         <AnimatePresence mode="popLayout">
            {showAddForm && (
               <motion.div
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="lg:col-span-1"
               >
                  <div className="glass-card p-12 border-primary/30 shadow-3xl shadow-primary/10 overflow-hidden relative">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                     <h2 className="text-3xl font-black mb-12 flex items-center space-x-3 tracking-tighter">
                        <Zap className="text-primary w-6 h-6 fill-current animate-pulse" />
                        <span>Log Score</span>
                     </h2>

                     <form onSubmit={handleAddScore} className="space-y-10">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 block ml-1">Stableford Score (1-45)</label>
                           <div className="relative group">
                              <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-primary transition-colors" />
                              <input
                                 type="number"
                                 required
                                 min="1"
                                 max="45"
                                 value={formData.score}
                                 onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-black text-xl tracking-tight shadow-inner"
                                 placeholder="38"
                              />
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 block ml-1">Date Played</label>
                           <div className="relative group">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-primary transition-colors" />
                              <input
                                 type="date"
                                 required
                                 value={formData.datePlayed}
                                 onChange={(e) => setFormData({ ...formData, datePlayed: e.target.value })}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-black shadow-inner"
                              />
                           </div>
                        </div>

                        <button
                           type="submit"
                           disabled={submitting}
                           className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3 shadow-3xl shadow-primary/40 border border-white/10"
                        >
                           {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Commit Entry</span> <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                     </form>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Score List */}
         <motion.div 
            layout
            className={cn('space-y-8', showAddForm ? 'lg:col-span-2' : 'lg:col-span-3')}
         >
            <div className="flex items-center justify-between mb-2">
               <h2 className="text-2xl font-black tracking-tighter flex items-center space-x-3">
                  <History className="text-primary w-6 h-6" />
                  <span>Cycle History</span>
               </h2>
               <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{scores.length} / 5 Slots Active</span>
                  <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(scores.length / 5) * 100}%` }}
                        className="h-full bg-primary"
                     />
                  </div>
               </div>
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
               {scores.length > 0 ? (
                  scores.map((score, index) => (
                     <motion.div
                        key={score.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: 50 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative p-8 glass-card flex items-center justify-between border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
                     >
                        <div className="absolute left-0 top-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex items-center space-x-10 relative z-10">
                           <div className={cn(
                               'w-16 h-16 rounded-[1.5rem] flex flex-col items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-3xl overflow-hidden relative',
                               index === 0 ? 'bg-primary text-white' : 'bg-navy-dark text-white/80 border border-white/5'
                           )}>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100" />
                              <span className="text-3xl font-black tracking-tighter relative z-10">{score.score}</span>
                              <span className="text-[8px] font-black uppercase tracking-widest relative z-10 opacity-60">Pts</span>
                           </div>

                           <div className="space-y-2">
                              <span className="block text-white font-black text-2xl tracking-tighter group-hover:text-primary transition-colors">{formatDate(score.date_played)}</span>
                              <div className="flex items-center space-x-4">
                                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">System Entry ID: {score.id.slice(0, 8)}</span>
                                 <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                 <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded', score.score >= 38 ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary')}>
                                    {score.score >= 38 ? 'Legendary Tier' : 'Performance Tier'}
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center space-x-4 pr-4">
                           <motion.button 
                              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                              className="p-4 bg-white/5 rounded-2xl transition-all" title="Edit Entry"
                           >
                              <Edit3 className="w-5 h-5 text-white/40 group-hover:text-white" />
                           </motion.button>
                           <motion.button 
                              whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                              onClick={() => handleDeleteScore(score.id)}
                              className="p-4 bg-white/5 rounded-2xl transition-all" 
                              title="Delete Entry"
                           >
                              <Trash2 className="w-5 h-5 text-white/20 group-hover:text-red-500" />
                           </motion.button>
                        </div>
                     </motion.div>
                  ))
               ) : (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="glass-card p-24 border-dashed border-white/10 flex flex-col items-center justify-center space-y-8 text-center group"
                  >
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center relative"
                     >
                         <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-pulse" />
                        <Target className="w-10 h-10 text-white/10" />
                     </motion.div>
                     <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white/20 tracking-tighter uppercase">No Cycle History</h3>
                        <p className="text-white/20 font-bold text-sm max-w-xs mx-auto">Initiate your performance tracking by logging your first Stableford entry.</p>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </div>

      {/* Modern Notifications */}
      <AnimatePresence>
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
               <span className="font-black text-sm uppercase tracking-widest">{success}</span>
            </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScoreEntryPage;
