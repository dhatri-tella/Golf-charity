import React from 'react';
import { cn } from '../../lib/utils';

interface GolfBallCardProps {
  number?: string | number;
  highlighted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'chalk' | 'signal' | 'gold';
  className?: string;
}

const GolfBallCard: React.FC<GolfBallCardProps> = ({
  number,
  highlighted = false,
  size = 'md',
  variant = 'chalk',
  className,
}) => {
  const sizes = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-13 w-13 text-lg',
    lg: 'h-16 w-16 text-2xl',
  };

  const variants = {
    chalk: 'bg-chalk text-forest border-ash/20',
    signal: 'bg-signal text-chalk border-signal/30',
    gold: 'bg-gold text-forest border-goldLight/50 shadow-[0_0_15px_rgba(201,168,76,0.5)]',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full border-2 font-display font-bold transition-all duration-300',
        sizes[size],
        variants[variant],
        highlighted && 'scale-110 rotate-3',
        className
      )}
    >
      {/* Subtle dimple effect */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0.1)_100%)] pointer-events-none" />
      
      {number}

      {highlighted && (
        <div className="absolute -inset-1 rounded-full border border-gold/50 animate-ping opacity-20 pointer-events-none" />
      )}
    </div>
  );
};

export default GolfBallCard;
