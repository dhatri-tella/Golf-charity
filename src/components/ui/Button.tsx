import React from 'react';
import { cn } from '../../lib/utils'; // Assuming I'll create a small util for classes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading,
  fullWidth,
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-signal text-chalk hover:bg-signal/90 active:scale-95 shadow-lg shadow-signal/20',
    secondary: 'border border-leaf text-leaf hover:bg-leaf/10 active:scale-95',
    ghost: 'text-ash hover:text-chalk hover:bg-white/5',
    gold: 'bg-gold text-forest font-bold hover:bg-goldLight active:scale-95',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-10 py-4 text-base uppercase tracking-wider',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex items-center justify-center font-sans font-bold transition-all duration-200 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
      <span className={cn(loading && 'opacity-0')}>{children}</span>
    </button>
  );
};

export default Button;
