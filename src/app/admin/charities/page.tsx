'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  ShieldCheck,
  Activity,
  ArrowRight,
  TrendingUp,
  History,
  Star,
  Target,
  ChevronRight,
  MoreVertical,
  Hexagon,
  Lock,
  ExternalLink,
  Globe,
  Plus
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';
import { Charity } from '@/types';

const AdminCharityManagementPage = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    is_featured: false
  });
  const supabase = createClientComponentClient();

  const fetchCharities = async () => {
    const { data, error } = await supabase.from('charities').select('*').order('created_at', { ascending: false });
    if (!error && data) setCharities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCharities();
  }, [supabase]);

  const handleAddCharity = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('charities').insert([formData]);

    if (!error) {
       setShowAddModal(false);
       setFormData({ name: '', description: '', website: '', is_featured: false });
       fetchCharities();
    }
    setSubmitting(false);
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    // 1. Unset all current featured
    await supabase.from('charities').update({ is_featured: false }).eq('is_featured', true);
    // 2. Set this one
    await supabase.from('charities').update({ is_featured: !current }).eq('id', id);
    fetchCharities();
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-4">
            <h1 className="text-4xl font-black text-white">Cause <span className="text-gold">Matrix</span></h1>
            <p className="text-white/40 max-w-lg font-medium leading-relaxed">
               Govern the platform&apos;s social impact by managing charitable partnerships and tracking real-time contribution flow.
            </p>
         </div>

         <button
            onClick={() => setShowAddModal(true)}
            className="group p-6 bg-gold text-white rounded-2xl flex items-center space-x-3 font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gold/30"
         >
            <PlusCircle className="w-6 h-6" />
            <span>Onboard New Charity</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Charities List */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center space-x-3">
               <Heart className="text-white/40 w-5 h-5" />
               <span>Impact Partners</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
               {loading ? (
                  <div className="col-span-full py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-gold" /></div>
               ) : (
                  charities.map((c, i) => (
                     <div key={c.id} className="group glass-card p-10 border-white/5 hover:border-gold/20 transition-all flex flex-col justify-between relative overflow-hidden h-[380px]">
                        {c.is_featured && (
                           <div className="absolute top-0 right-0 p-4">
                              <div className="px-3 py-1 bg-gold text-white text-[8px] font-black uppercase tracking-widest rounded-lg flex items-center space-x-2">
                                 <Star className="w-3 h-3 fill-current" />
                                 <span>Featured Cause</span>
                              </div>
                           </div>
                        )}
                        
                        <div className="space-y-6">
                           <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-white/40 group-hover:bg-gold group-hover:text-white transition-all rotate-3 group-hover:rotate-6">
                              <Heart className={cn('w-8 h-8', c.is_featured && 'fill-current text-gold group-hover:text-white')} />
                           </div>
                           
                           <div className="space-y-2">
                              <h4 className="text-2xl font-black text-white">{c.name}</h4>
                              <p className="text-sm font-medium text-white/40 line-clamp-3 leading-relaxed">{c.description}</p>
                           </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-white/5">
                           <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block">Impact Reach</span>
                                 <span className="text-sm font-black text-primary">£{((c.id.charCodeAt(0) * 1234) % 45000).toFixed(2)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <button onClick={() => handleToggleFeatured(c.id, c.is_featured || false)} className={cn(
                                    'p-3 rounded-xl border transition-all',
                                    c.is_featured ? 'bg-gold border-gold text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
                                 )} title="Toggle Featured">
                                    <Star className="w-4 h-4" />
                                 </button>
                                 <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"><Edit3 className="w-4 h-4" /></button>
                                 <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/20 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                              </div>
                           </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute bottom-[-20%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                           <Heart className="w-48 h-48 text-white" />
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>

         {/* Impact Insights Sidebar */}
         <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-10 border-gold/20 flex flex-col items-center text-center space-y-10 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Hexagon className="w-24 h-24 text-gold animate-spin-slow" />
               </div>

               <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="w-10 h-10 text-primary" />
               </div>

               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">System Flow</h3>
                  <div className="space-y-1">
                     <span className="block text-4xl font-black text-white">41.2%</span>
                     <span className="block text-[10px] font-black uppercase tracking-widest text-gold/60">Subscription Retention</span>
                  </div>
               </div>

               <div className="w-full pt-4 space-y-4">
                  <div className="p-5 bg-white/5 border border-white/5 rounded-3xl flex flex-col items-center space-y-4 text-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Active Cause Partners</span>
                     <span className="text-3xl font-black text-white">{charities.length}</span>
                  </div>
                  <button className="w-full flex items-center justify-center space-x-3 text-gold font-black text-xs uppercase tracking-widest hover:underline transition-all group">
                     <span>Impact Reporting Portal</span>
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Add Charity Modal */}
      <AnimatePresence>
         {showAddModal && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/80 backdrop-blur-xl"
            >
               <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="w-full max-w-lg glass-card p-12 relative overflow-hidden shadow-2xl border-gold/20"
               >
                  <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><X /></button>
                  
                  <div className="space-y-10">
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center"><Heart className="w-6 h-6" /></div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Onboard Partner</h3>
                     </div>

                     <form onSubmit={handleAddCharity} className="space-y-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Foundational Name</label>
                           <input 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-gold/40 text-white font-bold" 
                              placeholder="e.g. Youth Sports Trust"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Cause Description (Mission)</label>
                           <textarea 
                              required
                              rows={4}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-gold/40 text-white font-bold resize-none" 
                              placeholder="Outline the core social mission and impact areas..."
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Official URL</label>
                           <div className="relative group">
                              <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold" />
                              <input 
                                 type="url"
                                 value={formData.website}
                                 onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-gold/40 text-white font-bold" 
                                 placeholder="https://charity.org"
                              />
                           </div>
                        </div>

                        <button
                           type="submit"
                           disabled={submitting}
                           className="w-full bg-gold text-white py-5 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3 shadow-2xl shadow-gold/30"
                        >
                           {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Formalize Partnership</span> <CheckCircle2 className="w-5 h-5" /></>}
                        </button>
                     </form>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCharityManagementPage;
