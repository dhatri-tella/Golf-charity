'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Trophy, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Total Active Subscribers',
    value: '12,500+',
    icon: Users,
    color: 'primary',
  },
  {
    label: 'Charitable Donations',
    value: '£254,120',
    icon: Heart,
    color: 'gold',
  },
  {
    label: 'Competitions Won',
    value: '3,842',
    icon: Trophy,
    color: 'primary',
  },
  {
    label: 'Performance Metrics',
    value: '1.2M+',
    icon: Target,
    color: 'gold',
  },
];

const SocialProof = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group p-8 glass-card border-none hover:bg-white/5 transition-colors duration-500 rounded-3xl"
            >
              <div className={cn(
                'w-16 h-16 rounded-3xl flex items-center justify-center mb-8 mx-auto transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12',
                stat.color === 'primary' ? 'bg-primary text-white' : 'bg-gold text-white'
              )}>
                <stat.icon className="w-8 h-8" />
              </div>

              <div className="text-4xl font-black mb-2 text-white tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
