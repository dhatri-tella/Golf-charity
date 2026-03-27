'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, Heart, LayoutDashboard, LogOut, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@/lib/supabase';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!supabase) return;

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });
    
    return () => subscription.unsubscribe();
  }, [supabase]);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Jackpots', href: '/home#prizes' },
    { name: 'Charity', href: '/charities' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const handleSignOut = async () => {
    if (supabase) {
        await supabase.auth.signOut();
    }
    window.location.href = '/';
  };

  return (
    <motion.nav
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-6',
        isScrolled ? 'bg-[#0a0f1e]/80 backdrop-blur-2xl border-b border-[#ff2d70]/20 shadow-lg shadow-[#ff2d70]/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/home" className="flex items-center space-x-3 group relative cursor-hover">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="w-12 h-12 bg-[#ff2d70] rounded-2xl flex items-center justify-center shadow-xl shadow-[#ff2d70]/40 border border-white/20 transition-all duration-300"
          >
            <Trophy className="text-white w-7 h-7" />
          </motion.div>
          <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none group-hover:text-[#ff487f] transition-colors">
               GOLF<span className="text-[#ff2d70]">LEGACY</span>
             </span>
             <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#ffd7e6]/50 ml-1 mt-1 leading-none">Impact First. Game Second.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link
                href={link.href}
                className={cn(
                  'text-[10px] font-black uppercase tracking-[0.3em] transition-all relative py-2 group cursor-hover',
                  pathname === link.href ? 'text-[#ff2d70]' : 'text-[#ffd7e6] hover:text-[#ff487f]'
                )}
              >
                {link.name}
                <motion.div 
                  className={cn(
                    'absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff2d70] scale-x-0 group-hover:scale-x-100 transition-transform duration-500',
                    pathname === link.href ? 'scale-x-100' : ''
                  )} 
                />
              </Link>
            </motion.div>
          ))}
          
          <div className="h-6 w-px bg-[#ff2d70]/30 mx-4" />
          
          {user ? (
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#ffd7e6] hover:text-[#ff487f] transition-all group cursor-hover">
                <LayoutDashboard className="w-4 h-4 text-[#ff2d70] group-hover:scale-110 transition-transform duration-300" />
                <span>My Dashboard</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="p-3 bg-[#ffffff16] hover:bg-[#ff2d70]/10 rounded-xl transition-all group cursor-hover"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5 text-[#ffd7e6]/50 group-hover:text-[#ff2d70]" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-[#ff2d70] to-[#f59e0b] text-white hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-5px_rgba(255,45,112,0.5)] border border-white/10 hover:shadow-[#ff2d70]/40 cursor-hover"
            >
               Join Now
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[#ffd7e6]/60 hover:text-[#ff2d70] p-2 transition-colors relative cursor-hover"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -40 }}
            transition={{ type: 'spring', damping: 20 }}
            className="lg:hidden fixed inset-x-0 top-[100px] mx-6 p-12 bg-[#0a0f1e]/90 backdrop-blur-3xl border border-[#ff2d70]/20 rounded-[3rem] shadow-lg z-50 flex flex-col items-center space-y-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#ffd7e6] hover:text-[#ff487f] text-sm font-black uppercase tracking-[0.4em] transition-all cursor-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-full h-px bg-[#ff2d70]/20 my-4" />
            {user ? (
               <Link
                href="/dashboard"
                className="w-full py-5 rounded-2xl font-black text-center text-sm uppercase tracking-[0.2em] bg-[#ffffff16] border border-[#ff2d70]/20 hover:border-[#ff2d70] transition-all text-[#ffd7e6] cursor-hover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Launch Dashboard
              </Link>
            ) : (
              <div className="w-full space-y-4">
                <Link
                  href="/auth/signup"
                  className="w-full bg-gradient-to-r from-[#ff2d70] to-[#f59e0b] text-white py-6 rounded-2xl font-black text-center text-sm uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 cursor-hover"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
                <Link
                  href="/auth/login"
                  className="w-full py-5 rounded-2xl font-black text-center text-sm uppercase tracking-[0.2em] text-[#ffd7e6]/60 border border-[#ff2d70]/20 block cursor-hover"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
