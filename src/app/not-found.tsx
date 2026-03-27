'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[140px] rounded-full" 
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 404 Icon */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full border border-primary/30"
          >
            <AlertTriangle className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Page Not Found
            </h2>
            <p className="text-xl text-white/50 font-medium max-w-lg mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 border border-white/10 group"
            >
              <Home className="w-5 h-5" />
              Back Home
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-white/10 hover:border-primary/40 group"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Footer Message */}
          <p className="text-white/30 text-sm font-medium pt-8">
            If you believe this is an error, please{' '}
            <a href="mailto:support@golflegacy.com" className="text-primary hover:underline font-bold">
              contact support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
