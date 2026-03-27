'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Search,
  ExternalLink,
  Trophy,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Star,
  Activity,
  Zap
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';
import { Charity } from '@/types';
import Link from 'next/link';
import { MOCK_CHARITIES } from '@/lib/mockData';

const CharitiesPage = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const supabase = createClientComponentClient();

  const fetchCharities = async () => {
    if (!supabase) {
      console.warn('Supabase not configured. Using mock data.');
      setCharities(MOCK_CHARITIES);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .order('total_raised', { ascending: false });

    if (error || !data || data.length === 0) {
      console.error('Charities fetch error or empty data. Using mock data.');
      setCharities(MOCK_CHARITIES);
      setError(null);
    } else {
      setCharities(data ?? []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharities();
  }, [supabase]);

  const filtered = charities.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(search.toLowerCase()) ||
                         charity.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || charity.is_featured;
    return matchesSearch && matchesCategory;
  });

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

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
       <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
       </div>
       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Loading Charities...</span>
    </div>
  );

  if (!loading && error) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center p-6">
      <p className="text-xl font-black text-white">Error loading charities</p>
      <p className="text-sm text-white/50 max-w-md">{error}</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button onClick={fetchCharities} className="px-6 py-3 rounded-xl bg-primary text-black font-bold tracking-wide">Retry</button>
        <a href="/api/seed/charities" className="px-6 py-3 rounded-xl bg-secondary text-black font-bold tracking-wide">Seed Sample Data</a>
      </div>
    </div>
  );

  if (!loading && charities.length === 0) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center p-6">
      <p className="text-xl font-black text-white">No charities available yet.</p>
      <p className="text-sm text-white/50 max-w-md">It looks like your charity pool is empty. Add charity items to your Supabase table or run the seed script to populate sample data.</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button onClick={fetchCharities} className="px-6 py-3 rounded-xl bg-primary text-black font-bold tracking-wide">Reload</button>
        <a href="/api/seed/charities" className="px-6 py-3 rounded-xl bg-secondary text-black font-bold tracking-wide">Seed Data</a>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-20"
    >
      {/* Header Section */}
      <motion.div variants={item} className="flex flex-col lg:flex-row items-center justify-between gap-10">
         <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
               <Globe className="w-5 h-5 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Global Impact Network</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Charity <span className="gradient-text-animated">Directory</span></h1>
            <p className="text-white/30 max-w-xl font-bold text-lg leading-relaxed tracking-tight">
               Discover verified charities making real impact. Every subscription contributes to these organizations transforming lives worldwide.
            </p>
         </div>

         <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center px-10 py-6 glass-card border border-primary/20 bg-primary/5 rounded-[2.5rem] shadow-2xl shadow-primary/10 relative overflow-hidden group"
         >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />
            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2">Total Impact</span>
            <span className="block text-5xl font-black text-white tracking-tighter tabular-nums">
               {formatCurrency(charities.reduce((sum, c) => sum + c.total_raised, 0))}
            </span>
         </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={item} className="flex flex-col md:flex-row gap-6">
        <div className="relative group flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search charities..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-primary/40 transition-all text-white font-medium shadow-inner"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all',
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
            )}
          >
            All Charities
          </button>
          <button
            onClick={() => setSelectedCategory('featured')}
            className={cn(
              'px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all',
              selectedCategory === 'featured'
                ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
            )}
          >
            <Star className="w-4 h-4 inline mr-2" />
            Featured
          </button>
        </div>
      </motion.div>

      {/* Charities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((charity, index) => (
          <motion.div
            key={charity.id}
            variants={item}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-card p-8 flex flex-col relative overflow-hidden group border-white/5 hover:border-primary/30 transition-all duration-500"
          >
            {charity.is_featured && (
              <div className="absolute -top-3 -right-3 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                <Star className="w-3 h-3 inline mr-1" />
                Featured
              </div>
            )}

            <div className="flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white tabular-nums">
                    {formatCurrency(charity.total_raised)}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Raised
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-3 tracking-tighter">
                {charity.name}
              </h3>

              <p className="text-white/60 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                {charity.description}
              </p>

              {charity.website && (
                <a
                  href={charity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href="/auth/signup"
                className="group w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-2xl py-4 px-6 text-primary font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Support This Cause</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all duration-1000" />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-20">
          <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-white/20" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">No charities found</h3>
          <p className="text-white/40 font-medium">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CharitiesPage;