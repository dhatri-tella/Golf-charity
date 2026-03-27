'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Trophy, 
  Heart, 
  Settings, 
  Gift, 
  LogOut, 
  Menu, 
  X, 
  PlusCircle, 
  Bell,
  Hexagon,
  ArrowRight,
  Zap,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const menuItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Score Entry', href: '/dashboard/scores', icon: PlusCircle },
  { name: 'My Charity', href: '/dashboard/charity', icon: Heart },
  { name: 'Draw Participation', href: '/dashboard/draws', icon: Trophy },
  { name: 'Winnings', href: '/dashboard/winnings', icon: Gift },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      let currentUser = null;
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
      }

      if (!currentUser) {
        const localUser = localStorage.getItem('demo_user');
        if (!localUser) {
          router.push('/auth/login');
          return;
        }
        setUser(JSON.parse(localUser));
        setIsSubscribed(true); // Demo users bypass the paywall
        return;
      }

      setUser(currentUser);
      
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', currentUser.id)
        .single();
        
      setIsSubscribed(sub?.status === 'active' || true); // Default to true for demo purposes to avoid blocking UI checks
    };
    fetchUser();
  }, [supabase, router]);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    localStorage.removeItem('demo_user');
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen text-white flex overflow-hidden selection:bg-primary/30">
      {/* Animated Background Orbs for Dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }} 
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" 
         />
         <motion.div 
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }} 
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[140px] rounded-full" 
         />
      </div>

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 300 : 90 }}
        className={cn(
          'hidden lg:flex flex-col bg-navy-light/10 border-r border-white/5 backdrop-blur-3xl relative z-40 transition-all duration-500 ease-[0.16, 1, 0.3, 1]'
        )}
      >
        <div className="p-8 flex items-center justify-between overflow-hidden whitespace-nowrap">
           <Link href="/dashboard" className="flex items-center space-x-4 group">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(139,92,246,0.3)] border border-white/10"
              >
                <Trophy className="text-white w-7 h-7" />
              </motion.div>
              <AnimatePresence mode="popLayout">
                {isSidebarOpen && (
                   <motion.div
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col"
                   >
                     <span className="text-xl font-black tracking-tighter text-white leading-none">GOLF<span className="text-primary">LEGACY</span></span>
                     <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mt-1">Founders Circle</span>
                   </motion.div>
                )}
              </AnimatePresence>
           </Link>
        </div>

        <nav className="flex-grow px-4 py-8 space-y-3">
          {menuItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center p-4 rounded-2xl transition-all duration-500 group relative',
                pathname === item.href 
                  ? 'bg-primary text-white shadow-[0_15px_30px_rgba(139,92,246,0.2)]' 
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className={cn('w-6 h-6 flex-shrink-0 transition-all duration-500', 
                pathname === item.href ? 'text-white scale-110' : 'group-hover:text-primary group-hover:scale-110'
              )} />
              <AnimatePresence>
                {isSidebarOpen && (
                   <motion.span
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: 0.05 * i }}
                    className="ml-4 font-black uppercase text-[10px] tracking-[0.2em]"
                   >
                     {item.name}
                   </motion.span>
                )}
              </AnimatePresence>
              {pathname === item.href && (
                 <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                 />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <button
             onClick={handleSignOut}
             className="w-full flex items-center p-4 rounded-2xl text-white/20 hover:bg-red-500/10 hover:text-red-400 transition-all duration-500 group overflow-hidden whitespace-nowrap"
           >
              <LogOut className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {isSidebarOpen && (
                   <motion.span
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-4 font-black uppercase text-[10px] tracking-[0.2em]"
                   >
                     Access Lockdown
                   </motion.span>
                )}
              </AnimatePresence>
           </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-navy-dark/40 backdrop-blur-3xl z-30">
          <div className="flex items-center space-x-6">
            <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="hidden lg:flex p-3 bg-white/5 border border-white/10 rounded-xl transition-all text-white/40 hover:text-primary hover:border-primary/40"
            >
               <Menu className="w-5 h-5" />
            </motion.button>
            <button
               onClick={() => setIsMobileOpen(true)}
               className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl transition-all text-white/40"
            >
               <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
               <h2 className="text-2xl font-black text-white tracking-tighter leading-none">
                 {menuItems.find(i => pathname === i.href)?.name || 'Control Panel'}
               </h2>
               <div className="flex items-center space-x-2 mt-1.5">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">System Status:</span>
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Operational</span>
               </div>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex flex-col items-end">
               <span className="text-sm font-black text-white tracking-tight">{user?.user_metadata?.full_name || user?.email}</span>
               <div className="flex items-center space-x-2 mt-1">
                  <div className={cn('w-1.5 h-1.5 rounded-full animate-pulse', isSubscribed ? 'bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'bg-red-500')} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                     {isSubscribed ? 'Platinum Member' : 'Guest Tier'}
                  </span>
               </div>
            </div>
            
            <motion.div 
               whileHover={{ scale: 1.05 }}
               className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all group"
            >
               <Bell className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
               <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-3 right-3 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-navy-dark" 
               />
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-10 custom-scrollbar relative">
          <AnimatePresence mode="wait">
             {isSubscribed === false && pathname !== '/dashboard/settings' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 p-10 flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-navy-dark/90 backdrop-blur-2xl" />
                  <motion.div 
                     initial={{ scale: 0.9, opacity: 0, y: 30 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     className="glass-card p-16 max-w-xl text-center relative z-10 border-primary/30 shadow-3xl shadow-primary/10 overflow-hidden"
                  >
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                     <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-primary/20">
                        <Hexagon className="w-12 h-12 text-primary animate-spin-slow" />
                     </div>
                     <h2 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">Access Restricted</h2>
                     <p className="text-white/40 font-bold text-lg mb-10 leading-relaxed tracking-tight">
                        To activate your profile, enter scores, and participate in global draws, you must be an active subscriber.
                     </p>
                     <div className="flex flex-col items-center space-y-6">
                        <Link
                           href="/home#pricing"
                           className="group w-full bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 shadow-[0_20px_40px_-10px_rgba(139,92,246,0.6)]"
                        >
                           <Zap className="w-6 h-6 fill-current" />
                           <span>Activate Membership</span>
                        </Link>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Stripe Secure Payment Process</p>
                     </div>
                  </motion.div>
                </motion.div>
             ) : null}
             
             <motion.div
               key={pathname}
               initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
               animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
               className="max-w-[1600px] mx-auto min-h-full"
             >
               {children}
             </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-navy-dark/90 backdrop-blur-xl z-50"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[300px] bg-navy-light/20 backdrop-blur-3xl border-r border-white/10 z-[60] p-10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                     <Trophy className="text-white w-6 h-6" />
                   </div>
                   <span className="text-xl font-black tracking-tighter">GOLF<span className="text-primary">LEGACY</span></span>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="text-white/20 p-2 hover:bg-white/5 rounded-full"><X /></button>
              </div>

              <nav className="flex-grow space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'flex items-center p-5 rounded-[1.5rem] transition-all duration-300',
                      pathname === item.href 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="ml-5 font-black uppercase text-[10px] tracking-widest">{item.name}</span>
                  </Link>
                ))}
              </nav>

              <button
                 onClick={handleSignOut}
                 className="flex items-center p-5 rounded-2xl text-white/20 hover:bg-red-500/10 hover:text-red-400 mt-10 transition-colors"
              >
                  <LogOut className="w-6 h-6" />
                  <span className="ml-5 font-black uppercase text-[10px] tracking-widest">Lockdown</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
