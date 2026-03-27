'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Wallet, ArrowUpRight, History, ShieldCheck, Download, Gavel } from 'lucide-react';
import { winnerApi } from '@/lib/api';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';

const WinningsPage = () => {
  const [winnings, setWinnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    winnerApi.getMyWins()
      .then((res: any) => setWinnings(res.data.data || []))
      .catch(() => setWinnings([]))
      .finally(() => setLoading(false));
  }, []);

  const totalWon = winnings.reduce((acc, w) => acc + (w.prizeAmount || 0), 0);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-leaf/20 pb-8">
        <div className="space-y-2">
           <Badge variant="active">REWARDS HUB</Badge>
           <h1 className="text-4xl md:text-6xl font-display font-black text-chalk uppercase tracking-tighter leading-none">
             My <span className="text-signal">Winnings.</span>
           </h1>
           <p className="text-ash font-sans text-sm max-w-xl">Every victory is verified and distributed within 72 hours of draw completion.</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-pine border border-signal/30 p-10 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-signal/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-signal/30 transition-all duration-700" />
           
           <div className="h-40 w-40 bg-forest flex items-center justify-center text-signal shadow-2xl rounded-sm flex-shrink-0 animate-pulse-red">
              <Trophy size={80} />
           </div>
           
           <div className="space-y-8 flex-grow text-center md:text-left relative z-10">
              <div className="space-y-2">
                 <p className="text-[10px] font-bold text-ash uppercase tracking-[0.2em]">Total Career Payouts</p>
                 <p className="text-6xl font-display font-black text-chalk uppercase tracking-tighter">
                    £{totalWon.toLocaleString()}.00
                 </p>
                 <div className="flex items-center justify-center md:justify-start space-x-3 text-gold">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">ALL FUNDS VERIFIED & DISBURSED</span>
                 </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Button className="flex-1">Withdraw Funds <ArrowUpRight size={18} className="ml-2" /></Button>
                 <Button variant="secondary" className="flex-1">Winning Certificates <Download size={18} className="ml-2" /></Button>
              </div>
           </div>
        </div>

        <div className="bg-pine/60 border border-leaf/30 p-10 flex flex-col justify-between shadow-xl">
           <div className="space-y-6">
              <div className="flex items-center space-x-3 text-ash">
                 <Wallet size={18} strokeWidth={2.5} />
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Available Balance</h3>
              </div>
              <div className="space-y-2">
                 <p className="text-4xl font-display font-bold text-chalk">£1,240.20</p>
                 <Badge variant="active">READY FOR Payout</Badge>
              </div>
           </div>

           <div className="pt-8 border-t border-leaf/10 space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                 <span className="text-ash">Last Payout</span>
                 <span className="text-chalk">Sept 24, 2024</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                 <span className="text-ash">Payout Method</span>
                 <span className="text-chalk">Bank *4402</span>
              </div>
           </div>
        </div>
      </div>

      {/* Results History */}
      <div className="space-y-6">
         <h3 className="text-[10px] font-bold text-ash uppercase tracking-widest flex items-center border-b border-leaf/10 pb-4">
            <History size={18} className="mr-2" /> Prize Distribution History
         </h3>
         
         {loading ? <LoadingSpinner /> : (
           <div className="grid grid-cols-1 gap-4">
              {winnings.map((win, index) => (
                <motion.div
                  key={win.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-pine/40 border border-leaf/20 p-6 flex flex-col lg:flex-row items-center gap-10 hover:border-signal/30 transition-all group"
                >
                   <div className="flex items-center space-x-6 w-full lg:w-1/3">
                      <div className="h-12 w-12 bg-forest flex items-center justify-center text-gold border border-leaf/30 group-hover:border-gold/50 transition-colors">
                         <Gavel size={24} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold text-ash uppercase tracking-widest">{new Date(win.created_at || win.winDate).toLocaleDateString()}</p>
                         <p className="text-lg font-bold text-chalk uppercase tracking-tighter">Event Winner Picked</p>
                      </div>
                   </div>

                   <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                      <div className="space-y-1">
                         <p className="text-[8px] font-bold text-ash uppercase tracking-widest">Prize Amount</p>
                         <p className="text-xl font-display font-black text-white">£{(win.prize_amount || win.prizeAmount || 0).toLocaleString()}.00</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[8px] font-bold text-ash uppercase tracking-widest">Transaction ID</p>
                         <p className="text-xs font-mono text-ash uppercase truncate max-w-[120px]">TXN_{win.id.slice(0, 8)}</p>
                      </div>
                      <div className="flex items-center justify-end">
                         <Badge variant="active">SENT TO BANK</Badge>
                      </div>
                   </div>
                </motion.div>
              ))}

              {winnings.length === 0 && (
                <div className="py-20 text-center space-y-4 border border-dashed border-leaf/30 bg-forest/20">
                   <Trophy size={48} className="text-ash/30 mx-auto" />
                   <p className="text-[10px] font-bold text-ash uppercase tracking-widest">No winnings recorded in your career yet</p>
                   <Button variant="secondary" size="sm">Learn how to win</Button>
                </div>
              )}
           </div>
         )}
      </div>
    </div>
  );
};

export default WinningsPage;
