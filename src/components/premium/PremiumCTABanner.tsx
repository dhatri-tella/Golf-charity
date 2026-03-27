'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PremiumCTABannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

/**
 * Premium CTA Banner with Apple-quality design
 * Used for highlighting key actions throughout the platform
 */
const PremiumCTABanner: React.FC<PremiumCTABannerProps> = ({
  title,
  subtitle,
  buttonText = 'Get Started',
  buttonHref = '/auth/signup',
  variant = 'primary'
}) => {
  const variantStyles = {
    primary: {
      bg: 'bg-gradient-to-br from-lavender-DEFAULT to-green-pop',
      shadow: 'shadow-xl shadow-lavender-DEFAULT/30',
      buttonBg: 'bg-white/10 border-white/20 text-white hover:bg-white/20'
    },
    secondary: {
      bg: 'bg-white/10 backdrop-blur-xl border border-white/20',
      shadow: 'shadow-lg shadow-black/5',
      buttonBg: 'bg-lavender-DEFAULT text-white hover:bg-lavender-DEFAULT/90'
    },
    accent: {
      bg: 'bg-gradient-to-r from-green-pop/20 to-lavender-DEFAULT/20 border border-green-pop/30',
      shadow: 'shadow-lg shadow-green-pop/10',
      buttonBg: 'bg-green-pop text-white hover:bg-green-pop/90'
    }
  };

  const style = variantStyles[variant];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-3xl px-8 md:px-12 py-12 md:py-16 ${style.bg} ${style.shadow}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black tracking-tight text-navy-dark mb-4"
          >
            {title}
          </motion.h3>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-navy-dark/70 text-lg font-semibold max-w-md"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href={buttonHref}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 ${style.buttonBg} border`}
          >
            <span>{buttonText}</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PremiumCTABanner;
