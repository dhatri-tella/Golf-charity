'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      {/* Decorative Side */}
      <div className="hidden lg:flex flex-col items-center justify-center relative p-12 bg-contrast-light border-r border-white/5">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"
        />
        
        <div className="z-10 text-center max-w-sm space-y-8">
          <Link href="/" className="inline-flex items-center space-x-2 group mb-12 transform hover:scale-105 transition-all">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
              <Trophy className="text-white w-8 h-8" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
              GOLF<span className="text-primary">CHARITY</span>
            </span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
            Your Game. <br />
            <span className="gradient-text">Their Future.</span>
          </h1>
          <p className="text-white/40 text-lg font-medium leading-relaxed">
            Join thousands of golfers worldwide contributing to significant social change while tracking their peak performance.
          </p>
        </div>
      </div>

      {/* Auth Content */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 relative">
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center md:text-left space-y-4">
            <Link href="/" className="lg:hidden inline-flex items-center space-x-2 mb-8 group">
               <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                  <Trophy className="w-6 h-6 text-primary" />
               </div>
               <span className="font-black text-xl tracking-tighter text-white group-hover:text-primary transition-colors">Golf Charity</span>
            </Link>
            <h2 className="text-4xl font-black text-white tracking-tight">{title}</h2>
            <p className="text-white/40 font-medium text-lg leading-snug">{subtitle}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-10 border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-colors duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-50" />
            {children}
          </motion.div>
          
          <p className="text-center text-white/20 text-xs font-black uppercase tracking-[0.25em]">Secure & Encrypted</p>
        </div>
        
        {/* Subtle Background Mobile Orb */}
        <div className="lg:hidden absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
};

export default AuthLayout;
