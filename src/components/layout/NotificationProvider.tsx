'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
}

interface NotificationContextValue {
  notify: (type: NotificationType, title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (type: NotificationType, title: string, message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const item: Notification = { id, type, title, message };
    setNotifications((prev) => [...prev, item]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const value = useMemo(() => ({ notify }), []);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 w-[280px] pointer-events-none">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className={`pointer-events-auto rounded-2xl px-4 py-3 border shadow-lg bg-[#0f172a] backdrop-blur-xl text-white border-white/10 ${
                notification.type === 'success'
                  ? 'ring-1 ring-emerald-400/30'
                  : notification.type === 'error'
                  ? 'ring-1 ring-rose-500/30'
                  : 'ring-1 ring-sky-500/30'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm font-black uppercase tracking-wide">{notification.title}</span>
                <span className="text-xs text-white/60 flex-1">{notification.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}
