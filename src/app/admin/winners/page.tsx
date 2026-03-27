'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Trophy, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  Target,
  ArrowRight,
  TrendingUp,
  History,
  Star,
  ChevronRight,
  MoreVertical,
  Hexagon,
  Lock,
  ExternalLink,
  Image as ImageIcon,
  Zap,
  Activity,
  User,
  CreditCard,
  Calendar
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const AdminWinnerVerificationPage = () => {
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [selectedWin, setSelectedWin] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchWinners();
  }, [supabase]);

  const fetchWinners = async () => {
    const { data, error } = await supabase
      .from('draw_results')
      .select('*, user:users(*), draw:draws(*)')
      .order('created_at', { ascending: false });
      
    if (!error && data) setWinners(data);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    setProcessing(id);
    const { error } = await supabase
      .from('draw_results')
      .update({ verification_status: status })
      .eq('id', id);
      
    if (!error) {
       fetchWinners();
       if (selectedWin?.id === id) {
          setSelectedWin({ ...selectedWin, verification_status: status });
       }
    }
    setProcessing(null);
  };

  const handleInitiatePayout = async (id: string) => {
    setProcessing(id);
    const { error } = await supabase
      .from('draw_results')
      .update({ payout_status: 'paid' })
      .eq('id', id);
      
    if (!error) fetchWinners();
    setProcessing(null);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-4">
            <h1 className="text-4xl font-black text-white">Trust <span className="text-gold">Engine</span></h1>
            <p className="text-white/40 max-w-lg font-medium leading-relaxed">
               Review and verify performance proof for jackpot winners. Maintain platform integrity through rigorous auditing of submitted metrics.
            </p>
         </div>

         <div className="flex items-center space-x-4">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3">
               <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{winners.filter(w => w.verification_status === 'pending').length} Actions Required</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Claims Feed */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center space-x-3">
               <Star className="text-white/40 w-5 h-5" />
               <span>Winning Claim Audit Trail</span>
            </h3>

            <div className="space-y-4">
               {loading ? (
                  <div className="py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-gold" /></div>
               ) : (
                  winners.map((w, index) => (
                     <div key={w.id} className={cn(
                        'group glass-card p-8 border-white/5 hover:bg-white/[0.03] transition-all relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer',
                        selectedWin?.id === w.id && 'border-gold/40 bg-white/[0.05]'
                     )} onClick={() => setSelectedWin(w)}>
                        <div className="flex items-center space-x-8">
                           <div className={cn(
                              'w-16 h-16 rounded-[24px] flex items-center justify-center font-black relative shadow-2xl transition-all group-hover:rotate-6',
                              w.verification_status === 'approved' ? 'bg-primary text-white' : 
                              w.verification_status === 'pending' ? 'bg-gold text-white' : 'bg-red-500 text-white'
                           )}>
                              {w.verification_status === 'approved' ? <ShieldCheck className="w-8 h-8" /> : 
                               w.verification_status === 'pending' ? <Activity className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center space-x-4">
                                 <span className="text-xl font-black text-white">{w.user?.full_name || 'Legacy Participant'}</span>
                                 <div className={cn(
                                    'px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest',
                                    w.verification_status === 'approved' ? 'bg-primary/20 text-primary' : 
                                    w.verification_status === 'pending' ? 'bg-gold/20 text-gold' : 'bg-red-500/20 text-red-500'
                                 )}>
                                    {w.verification_status}
                                 </div>
                              </div>
                              <div className="flex items-center space-x-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                 <span className="flex items-center space-x-2"><Trophy className="w-3 h-3" /><span>Reward: {formatCurrency(w.prize_amount)}</span></span>
                                 <span className="flex items-center space-x-2"><Calendar className="w-3 h-3" /><span>Draw: {w.draw?.month}/{w.draw?.year}</span></span>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center space-x-3">
                           <div className={cn(
                              'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all',
                              w.payout_status === 'paid' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white/5 border-white/10 text-white/20'
                           )}>
                              Payout: {w.payout_status}
                           </div>
                           <ChevronRight className={cn('w-5 h-5 text-white/10 group-hover:text-gold transition-all', selectedWin?.id === w.id && 'rotate-90 text-gold')} />
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>

         {/* Audit Sidebar / Multi-panel */}
         <div className="lg:col-span-1 space-y-8">
            <AnimatePresence mode="wait">
               {selectedWin ? (
                  <motion.div
                     key={selectedWin.id}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     className="glass-card p-10 border-gold/20 flex flex-col space-y-8 relative overflow-hidden shadow-2xl sticky top-8"
                  >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center"><User className="w-6 h-6" /></div>
                           <h3 className="text-xl font-black text-white">Audit Profile</h3>
                        </div>
                        <button onClick={() => setSelectedWin(null)} className="text-white/20 hover:text-white"><X /></button>
                     </div>

                     <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                        <div className="relative group cursor-zoom-in" onClick={() => window.open(selectedWin.verification_image_url, '_blank')}>
                           {selectedWin.verification_image_url ? (
                              <img src={selectedWin.verification_image_url} alt="Proof" className="w-full rounded-xl transition-all group-hover:opacity-50" />
                           ) : (
                              <div className="w-full h-40 bg-white/5 rounded-xl flex flex-col items-center justify-center space-y-2 opacity-30">
                                 <ImageIcon className="w-10 h-10" />
                                 <span className="text-[10px] font-black uppercase">No Proof Uploaded</span>
                              </div>
                           )}
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="w-8 h-8 text-white" />
                           </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-center text-white/20">Official Score Record Uploaded</p>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <button 
                           onClick={() => handleStatusChange(selectedWin.id, 'approved')}
                           disabled={processing === selectedWin.id || selectedWin.verification_status === 'approved'}
                           className="flex-grow py-4 bg-primary/10 border border-primary/40 text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                           {processing === selectedWin.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
                           <span>Approve</span>
                        </button>
                        <button 
                           onClick={() => handleStatusChange(selectedWin.id, 'rejected')}
                           disabled={processing === selectedWin.id || selectedWin.verification_status === 'rejected'}
                           className="flex-grow py-4 bg-red-500/10 border border-red-500/40 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                           {processing === selectedWin.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <AlertCircle className="w-3 h-3" />}
                           <span>Reject</span>
                        </button>
                     </div>

                     {selectedWin.verification_status === 'approved' && selectedWin.payout_status === 'pending' && (
                        <div className="pt-8 border-t border-white/5 space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                           <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center"><CreditCard className="w-6 h-6" /></div>
                              <h4 className="font-black text-white uppercase text-xs tracking-widest">Payout Execution</h4>
                           </div>
                           <button 
                              onClick={() => handleInitiatePayout(selectedWin.id)}
                              className="w-full bg-gold text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-gold/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-3"
                           >
                              {processing === selectedWin.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                              <span>Initiate Payment</span>
                           </button>
                           <p className="text-[8px] font-black uppercase tracking-widest text-white/20 text-center italic">Funds will be dispatched to original payment source.</p>
                        </div>
                     )}
                  </motion.div>
               ) : (
                  <div className="glass-card p-10 border-white/5 flex flex-col items-center justify-center text-center space-y-6 h-[400px] opacity-30">
                     <ShieldCheck className="w-16 h-16 text-white/20" />
                     <div className="space-y-2">
                        <h4 className="text-xl font-black">Audit Ready</h4>
                        <p className="text-sm font-medium italic">Select a claim from the feed to initiate verification logic.</p>
                     </div>
                  </div>
               )}
            </AnimatePresence>
            
            <div className="glass-card p-8 border-white/5 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center space-x-2">
                  <History className="w-3 h-3" />
                  <span>Recent Action Log</span>
               </h4>
               <div className="space-y-4">
                  {[
                     { desc: 'Jackpot approved for Tiger', time: '2h ago' },
                     { desc: 'Proof rejected for Arnold', time: '5h ago' },
                     { desc: 'Payout triggered: £1,200', time: '1d ago' },
                  ].map((log, i) => (
                     <div key={i} className="flex justify-between items-center text-[10px] font-medium">
                        <span className="text-white/60">{log.desc}</span>
                        <span className="text-white/10">{log.time}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminWinnerVerificationPage;
