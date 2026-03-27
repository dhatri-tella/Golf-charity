'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Dices, 
  HeartHandshake, 
  Gavel, 
  PieChart,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Draw Control', href: '/admin/draws', icon: Dices },
    { name: 'Charity Partners', href: '/admin/charities', icon: HeartHandshake },
    { name: 'Winner Verification', href: '/admin/winners', icon: Gavel },
    { name: 'Platform Reports', href: '/admin/reports', icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-forest pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Admin Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-pine border border-signal/20 p-6 sticky top-28 shadow-2xl shadow-signal/5">
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-leaf/30">
              <div className="w-12 h-12 rounded-full bg-signal flex items-center justify-center text-chalk shadow-lg shadow-signal/30">
                <ShieldAlert size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-signal uppercase tracking-widest">Admin Panel</span>
                <span className="text-sm font-bold text-chalk truncate max-w-[160px]">{user?.name || 'Admin'}</span>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between group px-4 py-4 text-[10px] font-bold uppercase tracking-widest transition-all',
                      isActive
                        ? 'bg-signal text-white font-black'
                        : 'text-ash hover:text-chalk hover:bg-signal/5 border-l border-transparent'
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-12 p-4 bg-forest border border-leaf/20 rounded-sm">
              <p className="text-[10px] text-ash font-bold uppercase tracking-tighter leading-relaxed">
                Platform version: 2.1.0-stable<br />
                System status: <span className="text-green-500">OPTIMAL</span>
              </p>
            </div>
          </div>
        </aside>

        {/* Admin Content */}
        <main className="flex-grow">
          <div className="bg-pine/60 border border-leaf/30 p-8 min-h-[700px] relative">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
