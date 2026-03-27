import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-widest text-ash">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full bg-pine border border-leaf px-4 py-2.5 text-chalk font-sans placeholder:text-ash/40 outline-none transition-all',
          'focus:border-turf focus:bg-leaf/10 focus:ring-1 focus:ring-turf/20',
          error && 'border-signal focus:border-signal focus:ring-signal/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-[10px] font-bold text-signal uppercase tracking-wider">{error}</p>}
      {!error && helperText && <p className="text-[10px] text-ash tracking-wide">{helperText}</p>}
    </div>
  );
};

export default Input;
