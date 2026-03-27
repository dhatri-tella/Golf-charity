'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GolfBackgroundProps {
  children: React.ReactNode;
  showGolfBalls?: boolean;
  showFairwayLines?: boolean;
  className?: string;
}

export const GolfBackground: React.FC<GolfBackgroundProps> = ({
  children,
  showGolfBalls = true,
  showFairwayLines = true,
  className = '',
}) => {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-[#0A0F1E] text-white ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/80 via-[#0A0F1E]/40 to-[#0A0F1E]/80 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_70%_65%,rgba(16,185,129,0.16),transparent_45%)]" />
      {/* Golf Ball Decorations */}
      {showGolfBalls && (
        <>
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-10 w-9 h-9 golf-ball opacity-30"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, -15, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/4 right-20 w-8 h-8 golf-ball opacity-25"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 left-1/4 w-10 h-10 golf-ball opacity-20"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-1/4 right-1/3 w-8 h-8 golf-ball opacity-22"
          />
        </>
      )}

      {/* Fairway Lines Pattern */}
      {showFairwayLines && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-pop/10 via-transparent to-green-pop/5" />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Decorative Golf Fairway Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-t from-green-pop/10 to-transparent pointer-events-none blur-3xl"
      />
    </div>
  );
};

export default GolfBackground;
