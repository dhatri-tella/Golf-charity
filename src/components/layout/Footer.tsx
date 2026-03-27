import React from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Mail,
  Send,
  Camera,
  Video,
  Layout,
  Play,
  Heart,
  Share2
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest border-t border-leaf/30 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-signal flex items-center justify-center">
                <svg className="w-5 h-5 text-chalk" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8/3.59 8 8-3.59 8-8 8zm-1-13h2v10h-2zm0 12h2v2h-2z" />
                </svg>
              </div>
              <span className="font-display text-2xl font-bold text-chalk uppercase tracking-tighter">
                Green<span className="text-signal">Draw</span>
              </span>
            </Link>
            <p className="text-ash text-xs leading-relaxed max-w-xs font-sans">
              The premier golf charity platform. Change a life, win the draw, play more golf. Join thousands supporting causes worldwide.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-ash hover:text-signal transition-colors"><Share2 size={18} /></a>
              <a href="#" className="text-ash hover:text-signal transition-colors"><Heart size={18} /></a>
              <a href="#" className="text-ash hover:text-signal transition-colors"><Layout size={18} /></a>
              <a href="#" className="text-ash hover:text-signal transition-colors"><Play size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-chalk font-bold text-xs uppercase tracking-widest mb-6 border-l-2 border-signal pl-3">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/how-it-works" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">How It Works</Link></li>
              <li><Link href="/charities" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">Charities</Link></li>
              <li><Link href="/pricing" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">Pricing</Link></li>
              <li><Link href="/auth/signup" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">Become a Member</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-chalk font-bold text-xs uppercase tracking-widest mb-6 border-l-2 border-gold pl-3">Community</h4>
            <ul className="space-y-4">
              <li><Link href="/leaderboard" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">Charity Leaderboard</Link></li>
              <li><Link href="/winners" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">Draw Winners</Link></li>
              <li><Link href="/faq" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">FAQ</Link></li>
              <li><Link href="/support" className="text-ash text-xs hover:text-chalk transition-colors uppercase font-bold tracking-wider">Support Center</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-chalk font-bold text-xs uppercase tracking-widest border-l-2 border-leaf pl-3">The Green Sheet</h4>
            <p className="text-ash text-xs font-sans">Get the latest draw results and charity impact reports twice a month.</p>
            <div className="flex border border-leaf/40 bg-pine p-1">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none text-chalk placeholder:text-ash/40 text-[10px] font-bold tracking-widest outline-none px-3 flex-grow"
              />
              <button className="bg-leaf p-2 text-chalk hover:bg-turf transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-leaf/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] text-ash font-bold uppercase tracking-widest">
            © {currentYear} GreenDraw Platform. All rights reserved.
          </p>
          <div className="flex items-center space-x-8">
            <Link href="/privacy" className="text-[10px] text-ash hover:text-chalk transition-colors uppercase tracking-widest font-bold">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] text-ash hover:text-chalk transition-colors uppercase tracking-widest font-bold">Terms of Use</Link>
            <Link href="/cookies" className="text-[10px] text-ash hover:text-chalk transition-colors uppercase tracking-widest font-bold">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
