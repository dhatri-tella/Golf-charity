'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Heart, Target, Zap, TrendingUp, Award } from 'lucide-react';

interface PremiumGolfCharityHeroProps {
  title?: string;
  subtitle?: string;
  showAnimations?: boolean;
}

export const PremiumGolfCharityHero: React.FC<PremiumGolfCharityHeroProps> = ({
  title = 'Golf For Good',
  subtitle = 'Where Every Shot Makes a Difference',
  showAnimations = true,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Animated Background Orbs */}
      {showAnimations && (
        <>
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-pop/10 blur-3xl rounded-full pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lavender/10 blur-3xl rounded-full pointer-events-none"
          />
        </>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Premium Charity Badge - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <div className="charity-badge">
            <Heart className="w-5 h-5 text-rose-DEFAULT" />
            <span className="text-sm font-semibold text-gray-700">Charity Golf Movement</span>
          </div>
        </motion.div>

        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center space-y-8 mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-black tracking-tight">
            <span className="block text-gray-900 mb-2">{title}</span>
            <span className="block bg-gradient-to-r from-green-pop via-lavender to-green-pop bg-clip-text text-transparent">
              Impact Through Sport
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Premium Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { icon: Trophy, label: 'Tournaments', value: '500+', color: 'from-gold' },
            { icon: Heart, label: 'Impact Donations', value: '$2.5M', color: 'from-rose' },
            { icon: TrendingUp, label: 'Active Players', value: '25K+', color: 'from-green-pop' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ translateY: -8 }}
              transition={{ duration: 0.4 }}
              className="stat-card-premium"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="golf-club-badge">
                  <stat.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className={`text-4xl font-black bg-gradient-to-r ${stat.color}-pop text-transparent bg-clip-text`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Achievement Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <div className="trophy-card">
            <div className="flex items-center space-x-3">
              <div className="pin-achievement" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Hole-in-One Club</p>
                <p className="text-xs text-gray-500">Premium Achievement</p>
              </div>
            </div>
          </div>

          <div className="impact-badge">
            <div className="space-y-1">
              <p className="text-3xl font-black text-green-pop">1:1</p>
              <p className="text-xs font-semibold text-gray-600">Score to Donation Ratio</p>
            </div>
          </div>

          <div className="trophy-card">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-gold-DEFAULT" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Championship Ready</p>
                <p className="text-xs text-gray-500">Elite Tournament</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card px-10 py-4 font-bold text-lg bg-gradient-to-r from-green-pop to-lavender text-white hover:shadow-2xl transition-all"
          >
            Join Tournament
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="stat-card-premium px-10 py-4 font-bold text-lg text-gray-800"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Prize Ribbon */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="prize-ribbon mt-16"
        >
          <p className="text-sm font-black uppercase tracking-widest text-gray-700">
            ✨ Every Score Contributes to Real Change ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumGolfCharityHero;
