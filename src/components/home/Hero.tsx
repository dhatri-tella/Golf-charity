'use client';

import React from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Star, Sparkles, Target } from 'lucide-react';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as any;

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } },
  } as any;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#ff0044_0%,#78002a_40%,#0a0f1e_100%)] text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          animate={{
            y: [0, -30, 30, 0],
            x: [0, 40, -40, 0],
            opacity: [0.35, 0.65, 0.35, 0.55],
            scale: [1, 1.18, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-[#ff1f66]/20 blur-[110px] rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 25, -25, 0],
            x: [0, -40, 40, 0],
            opacity: [0.45, 0.7, 0.45, 0.55],
            scale: [1, 1.14, 1, 1.08],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-[420px] h-[420px] bg-[#f59e0b]/15 blur-[120px] rounded-full"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000000_0%,#00000080_70%,#000000de_100%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center justify-center rounded-full border border-[#ff1f66]/30 bg-[#ffffff18] px-6 py-2 text-sm font-bold text-[#ffb3c8] tracking-wider backdrop-blur-xl"
          >
            Impact-first. Charity-forward. Game-changing.
          </motion.p>

          <motion.h1
            variants={item}
            className="font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]"
            style={{ fontSize: 'calc(3.5rem + 2vw)' }}
          >
            Your game elevates lives.
            <br />
            <span className="text-[#ff4d82]">They win together.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto max-w-3xl text-lg md:text-2xl font-bold text-[#f8f8ffcc] leading-relaxed"
            style={{ letterSpacing: '0.03em' }}
          >
            A bold, modern charity platform where every score contributes to real impact and monthly prizes.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              href="/auth/signup"
              className="relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#ff2d70] to-[#ff6a15] px-10 py-4 text-xl font-extrabold uppercase tracking-wide text-white shadow-[0_20px_40px_rgba(255,45,112,0.46)] transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Join Impact Circle
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ff2d70]/60 bg-[#ffffff16] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#ffd6e8] transition-all duration-300 hover:border-[#ff2d70] hover:text-white hover:shadow-[0_0_18px_rgba(255,45,112,0.6)]"
            >
              Discover how
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Prize Pool', value: '£45,230', icon: Star },
              { label: 'Subscribers', value: '12.4k', icon: Heart },
              { label: 'Donated', value: '£250k', icon: Sparkles },
              { label: 'Draws', value: '100+', icon: Target },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-[#0b1221]/70 p-4 backdrop-blur-xl">
                <div className="text-[#ff487f] mb-2">
                  <stat.icon className="inline-block align-middle w-5 h-5" />
                </div>
                <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm font-bold uppercase tracking-wider text-[#ffd7e6]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
