'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Trophy, 
  Heart, 
  ChevronRight, 
  Menu, 
  X, 
  LogOut,
  ShieldCheck,
  Search,
  Bell,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const menuItems = [
  { name: 'Analytics', href: '/admin', icon: BarChart3 },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Draw Management', href: '/admin/draws', icon: Trophy },
  { name: 'Charity Management', href: '/admin/charities', icon: Heart },
  { name: 'Winner Verification', href: '/admin/winners', icon: ShieldCheck },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
         router.push('/auth/login');
         return;
      }
      setUser(user);

      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
        
      if (profile?.role !== 'admin') {
         router.push('/dashboard');
         return;
      }
      setIsAdmin(true);
    };
    checkAdmin();
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center"><BarChart3 className="w-10 h-10 text-primary animate-spin" /></div>;

  return (
    <div className="min-h-screen text-white flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-charcoal-dark border-r border-white/5 relative z-40"
      >
        <div className="p-6 flex items-center justify-between overflow-hidden whitespace-nowrap">
           <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <AnimatePresence>
                {isSidebarOpen && (
                   <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-xl font-bold tracking-tight"
                   >
                     ADMIN<span className="text-gold">PANEL</span>
                   </motion.span>
                )}
              </AnimatePresence>
           </Link>
        </div>

        <nav className="flex-grow px-4 py-8 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center p-4 rounded-xl transition-all duration-300 group',
                pathname === item.href 
                  ? 'bg-gold text-white shadow-2xl' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className={cn('w-6 h-6 flex-shrink-0', pathname === item.href ? 'text-white' : 'text-white/40 group-hover:text-gold')} />
              <AnimatePresence>
                {isSidebarOpen && (
                   <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-4 font-bold text-sm">
                     {item.name}
                   </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <Link href="/dashboard" className="w-full flex items-center p-4 rounded-xl text-white/40 hover:text-white transition-all">
              <LayoutDashboard className="w-6 h-6 mr-4" />
              {isSidebarOpen && <span className="font-bold text-sm">User Dashboard</span>}
           </Link>
           <button
             onClick={handleSignOut}
             className="w-full flex items-center p-4 rounded-xl text-white/40 hover:text-red-400"
           >
              <LogOut className="w-6 h-6 mr-4" />
              {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
           </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-charcoal/50 backdrop-blur-md z-30">
          <div className="flex items-center space-x-4">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden lg:flex p-2 text-white/40"><Menu className="w-6 h-6" /></button>
             <h2 className="text-xl font-black">{menuItems.find(i => pathname === i.href)?.name || 'Admin Insights'}</h2>
          </div>

          <div className="flex items-center space-x-6">
             <div className="relative group hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input placeholder="Search platform data..." className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm w-64 outline-none focus:border-gold/40 transition-all font-medium" />
             </div>
             <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                   <div className="text-sm font-bold">{user?.email}</div>
                   <div className="text-[10px] font-black text-gold uppercase tracking-widest">Platform Admin</div>
                </div>
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center"><Bell className="w-5 h-5 text-gold" /></div>
             </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-10 custom-scrollbar">
           <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {children}
              </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
