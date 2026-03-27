'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedCharity = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-navy-light/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30 transform -rotate-12 translate-x-12 translate-y-12" />
            <div className="relative z-10 p-5 bg-white/5 border border-white/10 rounded-[48px] shadow-2xl backdrop-blur-xl transform hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
               <div className="aspect-[4/3] relative bg-navy-dark rounded-[36px] overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                     <div className="text-center group-hover:scale-110 transition-transform duration-700">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-lg border border-primary/30">
                           <Heart className="w-12 h-12 text-primary fill-current" />
                        </div>
                        <h3 className="text-3xl font-black mb-2 tracking-tight">Charity Spotlight</h3>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Helping hands for a better future</p>
                     </div>
                  </div>
                  {/* Overlay texture */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               </div>
            </div>
            
            {/* Stats Badge */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-6 md:-right-10 z-20 bg-white p-6 rounded-[2rem] shadow-2xl flex items-center space-x-5 max-w-xs border border-white/20"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                 <Heart className="w-7 h-7 text-primary" />
              </div>
              <div>
                 <span className="block text-2xl font-black text-white tracking-tighter">£45,230</span>
                 <span className="block text-white/40 text-[10px] font-black uppercase tracking-widest leading-none mt-1">Raised by Golfers</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Monthly Highlight</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white">
              Empowering the Next Generation of <span className="gradient-text">Young Leaders.</span>
            </h2>

            <p className="text-xl text-white/50 leading-relaxed max-w-xl font-medium">
              This month, we're spotlighting <strong>"Youth Sports Foundation"</strong>. 
              They bridge the gap between passion and opportunity, providing underprivileged youth with the 
              resources, mentorship, and equipment they need to excel in sports and beyond.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {['Expert Coaching', '100% Direct Impact', '14 Active Cities', 'Community Driven'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                     <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                     </div>
                     <span className="text-white/80 font-bold text-sm tracking-tight">{item}</span>
                  </motion.li>
               ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <button 
                className="group w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] flex items-center justify-center space-x-3"
              >
                <span>Donate to this Charity</span>
                <Heart className="w-5 h-5 fill-current" />
              </button>
              
              <Link
                href="/charities"
                className="flex items-center space-x-2 text-white/40 hover:text-primary transition-colors font-black text-sm uppercase tracking-widest group py-4"
              >
                <span>View All Charities</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCharity;
