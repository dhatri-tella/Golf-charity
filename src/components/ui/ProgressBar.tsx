import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  color?: 'signal' | 'gold' | 'leaf';
  showLabel?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'signal',
  showLabel = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    signal: 'bg-signal shadow-[0_0_10px_rgba(232,56,26,0.4)]',
    gold: 'bg-gold shadow-[0_0_10px_rgba(201,168,76,0.4)]',
    leaf: 'bg-leaf shadow-[0_0_10px_rgba(28,66,40,0.4)]',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ash">Progress</span>
          <span className="text-xs font-bold font-sans text-chalk">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-1.5 w-full bg-forest border border-leaf/30 rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all duration-700 ease-out', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
