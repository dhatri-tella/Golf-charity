'use client';

import React from 'react';
import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand
      richColors
      theme="dark"
      toastOptions={{
        classNames: {
          toast: 'bg-navy-dark/95 backdrop-blur-xl border border-white/10 shadow-xl',
          title: 'text-white font-bold',
          description: 'text-white/70 text-sm',
          actionButton: 'bg-primary hover:bg-primary/90 text-white',
          cancelButton: 'bg-white/10 hover:bg-white/20 text-white',
          closeButton: 'text-white/50 hover:text-white',
        },
      }}
    />
  );
}
