import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function generateDrawNumbers(count: number = 6): number[] {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const n = Math.floor(Math.random() * 59) + 1;
    if (!numbers.includes(n)) {
      numbers.push(n);
    }
  }
  return numbers.sort((a, b) => a - b);
}
