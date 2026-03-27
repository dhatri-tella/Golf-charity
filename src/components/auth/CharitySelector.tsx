'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Check, Loader2 } from 'lucide-react';
import { createClientComponentClient } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Charity } from '@/types';
import { MOCK_CHARITIES } from '@/lib/mockData';

const CharitySelector = ({ onSelect, selectedId }: { onSelect: (id: string) => void, selectedId: string | null }) => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCharities = async () => {
      if (!supabase) {
        setCharities(MOCK_CHARITIES);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase.from('charities').select('*').order('name');
      if (error || !data || data.length === 0) {
        setCharities(MOCK_CHARITIES);
      } else {
        setCharities(data);
      }
      setLoading(false);
    };
    fetchCharities();
  }, [supabase]);

  const filtered = charities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-black uppercase tracking-widest text-white/40 block">Select Your Core Charity</label>
        <div className="flex items-center space-x-2 text-primary">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-[10px] font-bold uppercase tracking-widest">10% Donation</span>
        </div>
      </div>

      <div className="relative group mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search charities..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary/40 transition-all text-sm font-medium"
        />
      </div>

      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length > 0 ? (
          filtered.map((charity) => (
            <motion.button
              key={charity.id}
              onClick={() => onSelect(charity.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group',
                selectedId === charity.id 
                  ? 'bg-primary/10 border-primary/50' 
                  : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
              )}
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                   'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all',
                   selectedId === charity.id ? 'bg-primary text-white' : 'bg-white/10 text-white group-hover:bg-primary group-hover:text-white'
                )}>
                   {charity.name[0]}
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-white">{charity.name}</p>
                  <p className="text-[10px] text-white/40 font-medium truncate max-w-[180px]">{charity.description}</p>
                </div>
              </div>
              {selectedId === charity.id && <Check className="w-5 h-5 text-primary" />}
            </motion.button>
          ))
        ) : (
          <p className="text-center py-10 text-white/40 text-sm italic">No charities found.</p>
        )}
      </div>
    </div>
  );
};

export default CharitySelector;
