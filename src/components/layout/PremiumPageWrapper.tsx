'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PremiumPageWrapperProps {
  children: ReactNode;
  className?: string;
  showGradient?: boolean;
}

/**
 * Premium page wrapper that provides smooth animations and polished transitions
 * for every page - Apple-quality presentation
 */
const PremiumPageWrapper: React.FC<PremiumPageWrapperProps> = ({ 
  children, 
  className = '',
  showGradient = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={`min-h-screen transition-all duration-500 ${
        showGradient ? 'bg-gradient-to-b from-navy-light/5 via-transparent to-navy-light/5' : 'bg-white'
      } ${className}`}
    >
      {/* Premium Background Enhancement */}
      {showGradient && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/3 -left-96 w-96 h-96 bg-lavender-DEFAULT/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-96 right-1/4 w-96 h-96 bg-green-pop/10 rounded-full blur-3xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default PremiumPageWrapper;
