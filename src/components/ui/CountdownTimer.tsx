import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface CountdownTimerProps {
  targetDate: string | Date;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  className,
  size = 'md',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'font-display font-bold text-chalk leading-none',
          size === 'sm' ? 'text-xl' : size === 'md' ? 'text-4xl' : 'text-7xl'
        )}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className={cn('text-[10px] font-bold uppercase tracking-widest text-ash mt-1')}>
        {label}
      </div>
    </div>
  );

  return (
    <div className={cn('flex items-center space-x-4 md:space-x-8', className)}>
      <TimeBlock value={timeLeft.days} label="Days" />
      <div className={cn('font-display font-bold text-ash/30 self-start', size === 'sm' ? 'text-xl' : size === 'md' ? 'text-4xl' : 'text-7xl')}>:</div>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <div className={cn('font-display font-bold text-ash/30 self-start', size === 'sm' ? 'text-xl' : size === 'md' ? 'text-4xl' : 'text-7xl')}>:</div>
      <TimeBlock value={timeLeft.minutes} label="Mins" />
      <div className={cn('font-display font-bold text-ash/30 self-start', size === 'sm' ? 'text-xl' : size === 'md' ? 'text-4xl' : 'text-7xl')}>:</div>
      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default CountdownTimer;
