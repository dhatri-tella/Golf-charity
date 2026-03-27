import React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 
  | 'active' | 'inactive' | 'lapsed' | 'cancelled' 
  | 'pending' | 'paid' | 'approved' | 'rejected' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'active', children, className }) => {
  const variants: Record<BadgeVariant, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    inactive: 'bg-ash/20 text-ash border-ash/30',
    lapsed: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    cancelled: 'bg-red-500/20 text-red-500 border-red-500/30',
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    paid: 'bg-green-500/20 text-green-400 border-green-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-500 border-red-500/30',
    outline: 'border-leaf text-ash bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 rounded-sm border text-[10px] font-bold uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
