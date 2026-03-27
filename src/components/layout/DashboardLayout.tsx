'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Trophy, 
  Heart, 
  History, 
  Settings,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3 },
    { name: 'My Scores', href: '/dashboard/scores', icon: Trophy },
    { name: 'Support Charity', href: '/dashboard/charity', icon: Heart },
    { name: 'Draw History', href: '/dashboard/draws', icon: History },
    { name: 'Winnings', href: '/dashboard/winnings', icon: ShieldCheck },
    { name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-forest pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-pine border border-leaf/30 p-6 sticky top-28">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-signal flex items-center justify-center text-chalk text-xl font-bold font-display">
                {user?.name?.charAt(0) || 'G'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-chalk truncate max-w-[140px]">{user?.name || 'Player'}</span>
                <Badge variant={user?.subscription_status || 'inactive'}>
                  {user?.subscription_status || 'Guest'}
                </Badge>
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
                      'flex items-center justify-between group px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all',
                      isActive 
                        ? 'bg-leaf text-chalk border-l-2 border-signal ml-[-2px]' 
                        : 'text-ash hover:text-chalk hover:bg-leaf/10 border-l border-transparent'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={16} className={cn('transition-colors')} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="bg-pine/40 border border-leaf/20 p-8 min-h-[600px] relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-signal/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-pine border-t border-leaf/30 flex justify-around p-2 z-40">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center p-2 rounded-lg transition-colors',
                isActive ? 'text-signal bg-signal/10' : 'text-ash'
              )}
            >
              <item.icon size={20} />
              <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardLayout;
