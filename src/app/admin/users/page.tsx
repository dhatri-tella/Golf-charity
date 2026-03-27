'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  ShieldCheck,
  ChevronRight,
  MoreVertical,
  Calendar,
  Trophy,
  Activity,
  Filter,
  ArrowRight,
  Settings,
  PlusCircle
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingScores, setEditingScores] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  const fetchUsers = async () => {
    const { data: results, error } = await supabase
      .from('users')
      .select('*, subscriptions(*), scores(*)');
      
    if (!error && results) setUsers(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [supabase]);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditingScores(user.scores || []);
    setShowEditModal(true);
  };

  const filtered = users.filter((u: any) => 
    u.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-4">
            <h1 className="text-4xl font-black text-white">Identity <span className="text-gold">Ops</span></h1>
            <p className="text-white/40 max-w-lg font-medium leading-relaxed">
               Manage platform participants, update performance records, and audit subscriber status.
            </p>
         </div>
      </div>

      <div className="glass-card p-10 border-white/5 space-y-10 min-h-[600px] flex flex-col">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative group w-full md:w-[400px]">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
               <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email or ID..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-gold/40 transition-all font-medium" 
               />
            </div>
            
            <div className="flex items-center space-x-4">
               <button className="flex items-center space-x-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all">
                  <Filter className="w-4 h-4" />
                  <span>Filter Status</span>
               </button>
               <button className="flex items-center space-x-2 px-6 py-4 bg-gold text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-gold/20 hover:scale-105 active:scale-95 transition-all">
                  <Users className="w-4 h-4" />
                  <span>Export Data</span>
               </button>
            </div>
         </div>

         <div className="flex-grow overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/5">
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/20">Name / Identity</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/20">Subscription</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/20 text-center">Active Scores</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/20 text-center">Performance Avg</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/20 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {loading ? (
                     <tr><td colSpan={5} className="py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-gold" /></td></tr>
                  ) : filtered.length > 0 ? (
                     filtered.map((u: any) => (
                        <tr key={u.id} className="group hover:bg-white/[0.02] transition-all">
                           <td className="py-6">
                              <div className="flex items-center space-x-4">
                                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold text-white group-hover:bg-gold group-hover:text-white transition-all">
                                    {u.full_name?.[0] || 'G'}
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="font-bold text-white leading-none mb-1">{u.full_name || 'Golf Pro'}</span>
                                    <span className="text-xs font-medium text-white/20">{u.email}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="py-6">
                              <div className="flex flex-col">
                                 <div className={cn(
                                    'px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest w-fit mb-1',
                                    u.subscriptions?.[0]?.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'
                                 )}>
                                    {u.subscriptions?.[0]?.status || 'Incomplete'}
                                 </div>
                                 <span className="text-[10px] font-bold text-white/30 italic uppercase tracking-widest">{u.subscriptions?.[0]?.plan || 'No Plan'}</span>
                              </div>
                           </td>
                           <td className="py-6 text-center">
                              <span className="font-black text-white/60">{u.scores?.length || 0} / 5</span>
                           </td>
                           <td className="py-6 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                 <Activity className="w-3 h-3 text-primary/40" />
                                 <span className="font-black text-white">
                                    {u.scores?.length > 0 ? (u.scores.reduce((a: any, b: any) => a + b.score, 0) / u.scores.length).toFixed(1) : '0.0'}
                                 </span>
                              </div>
                           </td>
                           <td className="py-6 text-right">
                              <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button onClick={() => handleEditUser(u)} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-gold hover:text-white transition-all" title="Manage User">
                                    <Settings className="w-4 h-4" />
                                 </button>
                                 <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all" title="Archive Identity">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr><td colSpan={5} className="py-20 text-center text-white/20 font-black italic">Identity search returned zero results.</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Edit User Modal */}
      <AnimatePresence>
         {showEditModal && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/80 backdrop-blur-xl"
            >
               <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="w-full max-w-4xl glass-card p-10 relative overflow-hidden shadow-2xl border-gold/20 flex flex-col h-[80vh]"
               >
                  <button onClick={() => setShowEditModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"><X /></button>
                  
                  <div className="flex items-center space-x-6 mb-12">
                     <div className="w-16 h-16 bg-gold/10 rounded-3xl flex items-center justify-center">
                        <Users className="w-8 h-8 text-gold" />
                     </div>
                     <div>
                        <h3 className="text-3xl font-black text-white">Manage Participant</h3>
                        <p className="text-white/40 text-sm font-medium">{selectedUser?.id}</p>
                     </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 flex-grow overflow-y-auto pr-4 custom-scrollbar">
                     <div className="space-y-10">
                        <div className="space-y-6">
                           <h4 className="text-[10px] font-black uppercase tracking-[3px] text-gold/60">Core Performance Scores</h4>
                           <div className="space-y-3">
                              {editingScores.map((s, i) => (
                                 <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/5 group">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black text-white/60">{i+1}</div>
                                    <div className="flex-grow flex items-center justify-between">
                                       <div className="flex flex-col">
                                          <span className="text-xs font-black uppercase tracking-widest text-white/20">Stableford</span>
                                          <input 
                                             type="number" 
                                             value={s.score} 
                                             onChange={(e) => {
                                                const newScores = [...editingScores];
                                                newScores[i].score = parseInt(e.target.value);
                                                setEditingScores(newScores);
                                             }}
                                             className="bg-transparent border-none text-xl font-black text-white outline-none w-20" 
                                          />
                                       </div>
                                       <div className="text-right">
                                          <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block">Played On</span>
                                          <span className="text-xs font-bold text-white/60">{formatDate(s.date_played)}</span>
                                       </div>
                                    </div>
                                    <button className="p-2 opacity-0 group-hover:opacity-100 text-red-500/40 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                 </div>
                              ))}
                              {editingScores.length < 5 && (
                                 <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center space-x-2 text-white/20 font-black text-xs uppercase hover:bg-white/5 hover:border-gold/30 hover:text-gold transition-all">
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Manual Performance Entry</span>
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>

                     <div className="space-y-10">
                        <div className="space-y-6">
                           <h4 className="text-[10px] font-black uppercase tracking-[3px] text-gold/60">Subscription Meta</h4>
                           <div className="glass-card p-8 border-white/5 space-y-6">
                              <div className="space-y-2">
                                 <span className="text-xs font-black uppercase tracking-widest text-white/40 block">Stripe Subscription ID</span>
                                 <div className="p-4 bg-white/5 rounded-xl font-medium text-xs text-white group flex items-center justify-between">
                                    {selectedUser?.subscriptions?.[0]?.stripe_subscription_id || 'NOT_CONNECTED'}
                                    <ArrowRight className="w-4 h-4 text-white/20" />
                                 </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <span className="text-xs font-black uppercase tracking-widest text-white/40 block">Current Status</span>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-black uppercase tracking-widest outline-none focus:border-gold/40">
                                       <option>Active</option>
                                       <option>Cancelled</option>
                                       <option>Lapsed</option>
                                       <option>Pending</option>
                                    </select>
                                 </div>
                                 <div className="space-y-2">
                                    <span className="text-xs font-black uppercase tracking-widest text-white/40 block">Plan Level</span>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-black uppercase tracking-widest outline-none focus:border-gold/40">
                                       <option>Monthly</option>
                                       <option>Yearly</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl space-y-4">
                           <div className="flex items-center space-x-3 text-red-500">
                              <ShieldCheck className="w-5 h-5" />
                              <h4 className="font-black uppercase text-xs tracking-widest">Administrative Override</h4>
                           </div>
                           <p className="text-xs font-medium text-red-500/60 leading-relaxed">System-level overrides bypass standard platform validation. Record audit will be triggered automatically upon save.</p>
                           <button className="w-full py-4 bg-red-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-105 transition-all">
                              Reset Participant Record
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 mt-auto border-t border-white/5 flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">Audit Status: Ready to commit</span>
                     <div className="flex items-center space-x-4">
                         <button onClick={() => setShowEditModal(false)} className="px-8 py-4 text-white/40 font-black text-xs uppercase">Cancel</button>
                         <button className="bg-gold text-white px-10 py-4 rounded-xl font-black text-sm shadow-2xl shadow-gold/30 hover:scale-[1.02] transition-all">Commit Changes</button>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUserManagementPage;
