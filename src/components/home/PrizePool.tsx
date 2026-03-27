'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Trophy, Star, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(spring, (val) => Math.floor(val).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{displayValue}</motion.span>;
};

const tiers = [
  {
    name: '5-Match Jackpot',
    percentage: 40,
    amount: 18000.50,
    icon: Trophy,
    color: 'primary',
    description: 'Match all 5 numbers to win the ultimate prize. Rolls over if no winner!',
  },
  {
    name: '4-Match Draw',
    percentage: 35,
    amount: 15750.40,
    icon: Star,
    color: 'gold',
    description: 'Significant winnings for matching 4 performance metrics.',
  },
  {
    name: '3-Match Draw',
    percentage: 25,
    amount: 11250.30,
    icon: ShieldCheck,
    color: 'primary',
    description: 'The foundation of our pool, reward for consistent tracking.',
  },
];

const PrizePool = () => {
  const totalPool = tiers.reduce((acc, tier) => acc + tier.amount, 0);

  return (
    <section id="prizes" className="py-24 relative overflow-hidden bg-navy-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 space-y-8 md:space-y-0">
          <div className="md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6"
            >
              Live Prize <span className="gradient-text">Pool</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 max-w-xl font-medium"
            >
              Our monthly jackpot grows with every subscriber. Real impact, real rewards.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary/10 border border-primary/20 p-10 rounded-[2.5rem] backdrop-blur-xl text-center shadow-[0_0_50px_rgba(59,130,246,0.2)]"
          >
            <span className="block text-primary text-xs font-black uppercase tracking-[0.2em] mb-3">Current Total Pool</span>
            <span className="block text-5xl md:text-7xl font-black text-white tracking-tighter">
              £<Counter value={totalPool} />
            </span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                'relative p-10 glass-card transition-all duration-300 hover:scale-105 active:scale-95 group',
                tier.color === 'primary' ? 'hover:border-primary/40 shadow-primary/5 hover:shadow-2xl' : 'hover:border-gold/40 shadow-gold/5 hover:shadow-2xl'
              )}
            >
              <div className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform duration-300',
                tier.color === 'primary' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-gold text-white shadow-xl shadow-gold/20'
              )}>
                <tier.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">{tier.name}</h3>
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-3xl font-black text-white tracking-tight">£<Counter value={tier.amount} /></span>
                <span className={cn('text-xs font-black uppercase tracking-widest', tier.color === 'primary' ? 'text-primary' : 'text-gold')}>
                   {tier.percentage}%
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-10 font-medium">
                {tier.description}
              </p>
              
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tier.percentage}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: 'easeOut' }}
                  className={cn('h-full', tier.color === 'primary' ? 'bg-primary' : 'bg-gold')}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizePool;
