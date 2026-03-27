'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  ShieldCheck,
  Zap,
  Star,
  Activity,
  ArrowRight,
  Hexagon,
  Image as ImageIcon
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const WinnerVerificationModal = ({ win, onClose, onRefresh }: { win: any, onClose: () => void, onRefresh: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClientComponentClient();

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const fileExt = file.name.split('.').pop();
    const filePath = `verifications/${win.id}.${fileExt}`;

    // 1. Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage.from('verification_proofs').upload(filePath, file);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('verification_proofs').getPublicUrl(filePath);

    // 2. Update draw_results record
    const { error: updateError } = await supabase
      .from('draw_results')
      .update({
        verification_status: 'pending',
        verification_image_url: publicUrl
      })
      .eq('id', win.id);

    if (updateError) {
      alert(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    onRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/80 backdrop-blur-xl"
    >
      <motion.div
         initial={{ scale: 0.9, y: 20 }}
         animate={{ scale: 1, y: 0 }}
         className="w-full max-w-lg glass-card p-10 relative overflow-hidden shadow-2xl border-primary/20"
      >
         <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"><X /></button>

         {success ? (
            <div className="text-center space-y-8">
               <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Verification Pending</h3>
                  <p className="text-white/60 font-medium leading-relaxed">
                     Your proof of performance has been submitted. Our admin team will review it within 24-48 hours.
                  </p>
               </div>
               <button onClick={onClose} className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                  Got it
               </button>
            </div>
         ) : (
            <div className="space-y-8">
               <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                     <Star className="w-8 h-8 text-primary fill-current" />
                  </div>
                  <div>
                     <span className="block text-xs font-black uppercase tracking-widest text-primary/60">Winner Verification</span>
                     <h3 className="block text-2xl font-black text-white">{formatCurrency(win.prize_amount)} Jackpot</h3>
                  </div>
               </div>

               <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-sm font-bold text-white/80 leading-relaxed">
                     To claim your prize, please upload a screenshot of your official golf platform scores for the month of {win.draw?.month}/{win.draw?.year}.
                  </p>
                  <ul className="space-y-2 text-[10px] font-black uppercase tracking-widest text-white/30 italic">
                     <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-primary rounded-full" /><span>Must show Stableford points</span></li>
                     <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-primary rounded-full" /><span>Must show dates & club name</span></li>
                     <li className="flex items-center space-x-2"><div className="w-1 h-1 bg-primary rounded-full" /><span>Clear and unedited image (PNG/JPG)</span></li>
                  </ul>
               </div>

               <div className="relative group">
                  <input 
                     type="file" 
                     className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                     accept="image/*"
                     onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <div className={cn(
                     'w-full py-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center space-y-4 transition-all duration-300',
                     file ? 'border-primary/40 bg-primary/10' : 'border-white/10 bg-white/5 group-hover:border-white/20'
                  )}>
                     <div className={cn('w-12 h-12 rounded-full flex items-center justify-center shadow-lg', file ? 'bg-primary text-white' : 'bg-white/10 text-white/40')}>
                        {file ? <ImageIcon className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                     </div>
                     <span className="text-sm font-bold text-white/60">{file ? file.name : 'Select or drop screenshot'}</span>
                  </div>
               </div>

               <button
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-black text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-xl shadow-primary/30"
               >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Submit Proof</span> <ArrowRight className="w-5 h-5" /></>}
               </button>
            </div>
         )}
      </motion.div>
    </motion.div>
  );
};

export default WinnerVerificationModal;
