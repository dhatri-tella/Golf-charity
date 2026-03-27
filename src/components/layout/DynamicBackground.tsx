'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DynamicBackgroundProps {
  variant?: 'animated-gradient' | 'gradient-mesh' | 'plasma' | 'aurora' | 'orbs';
  children: React.ReactNode;
  className?: string;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  variant = 'gradient-mesh',
  children,
  className = '',
}) => {
  const baseClasses = "relative min-h-screen overflow-hidden";

  const renderBackground = () => {
    switch (variant) {
      case 'animated-gradient':
        return <div className="absolute inset-0 bg-animated-gradient pointer-events-none" />;
      
      case 'plasma':
        return <div className="absolute inset-0 bg-plasma pointer-events-none" />;
      
      case 'aurora':
        return <div className="absolute inset-0 bg-aurora pointer-events-none" />;
      
      case 'orbs':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -50, 50, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full"
            />
            <motion.div
              animate={{
                x: [0, -100, 100, 0],
                y: [0, 50, -50, 0],
                scale: [1, 0.8, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 2 }}
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                x: [0, 50, -50, 0],
                y: [0, 100, -100, 0],
                scale: [1, 0.9, 1.1, 1],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 4 }}
              className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-accent/15 blur-[100px] rounded-full"
            />
          </div>
        );
      
      case 'gradient-mesh':
      default:
        return (
          <div className="absolute inset-0 bg-gradient-mesh-animated pointer-events-none" />
        );
    }
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      {renderBackground()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
