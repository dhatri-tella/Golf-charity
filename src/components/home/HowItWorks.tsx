'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Heart, Play, ArrowRight, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: Target,
    title: 'Play',
    description: 'Enter your latest golf scores in Stableford format to track performance and participate in the monthly draw.',
    color: '#ff2d70',
  },
  {
    icon: Trophy,
    title: 'Win',
    description: 'Match your scores in our monthly draw to win substantial cash prizes from three different prize tiers.',
    color: '#f59e0b',
  },
  {
    icon: Heart,
    title: 'Give',
    description: 'A dedicated percentage of every subscription goes directly to your chosen charity. Your game supports their future.',
    color: '#ff487f',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#0a0f1e]/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-[#ffffff18] border border-[#ff2d70]/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-xl"
          >
             <Zap className="w-4 h-4 text-[#ff2d70]" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ffd7e6]/60">Our Platform Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-8 text-white"
          >
            How It <span className="text-[#ff2d70]">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-[#ffd7e6]/70 max-w-2xl mx-auto font-medium"
          >
            Three simple steps to impact lives while improving your game.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[40%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff2d70]/20 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2, type: 'spring', damping: 20 }}
              viewport={{ once: true }}
              className="relative group flex flex-col items-center text-center p-12 bg-[#ffffff12] border border-[#ff2d70]/20 hover:border-[#ff2d70]/40 rounded-3xl backdrop-blur-xl overflow-hidden cursor-hover"
            >
              {/* Number Background */}
              <div className="absolute top-10 right-10 text-[120px] font-black text-[#ff2d70]/[0.03] leading-none select-none group-hover:text-[#ff2d70]/10 transition-colors duration-500">
                {index + 1}
              </div>

              <div
                className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10 shadow-[0_20px_40px_rgba(255,45,112,0.4)]"
                style={{ backgroundColor: step.color }}
              >
                <step.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-black mb-6 text-white tracking-tight">{step.title}</h3>
              <p className="text-[#ffd7e6]/60 text-sm leading-relaxed font-medium relative z-10">
                {step.description}
              </p>

              {/* Hover Glow */}
              <div
                className="absolute -bottom-20 -left-20 w-40 h-40 blur-[80px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000"
                style={{ backgroundColor: step.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
