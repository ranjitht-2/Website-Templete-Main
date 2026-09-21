import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useAuth } from '../context/AuthContext';

export default function NavBar({ onOpenAuth }) {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      
      const sections = portfolioData.navigation.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="w-full pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 flex flex-col items-center pointer-events-none"
      style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
    >
      <nav className="pointer-events-auto w-full max-w-5xl bg-[#12161f]/90 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl transition-all">
        
        {/* Left Zone: Brand / Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs group-hover:bg-blue-600/30 transition-colors">
            AD
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[11px] font-bold tracking-widest text-white uppercase font-sans">AIDEN</span>
            <span className="text-[11px] font-bold tracking-widest text-white uppercase font-sans">DRAKE</span>
          </div>
        </a>

        {/* Center Zone: Main Menu Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-[11px] font-semibold uppercase tracking-wider text-stone-300">
          {portfolioData.navigation.map((item, idx) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={idx}
                href={item.href}
                className={`transition py-1 ${
                  isActive 
                    ? 'text-blue-400 border-b border-blue-400 font-bold' 
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right Zone: Actions / CTA */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenAuth}
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-300 hover:text-white transition cursor-pointer border-none bg-transparent"
          >
            {isAuthenticated && user ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{user.name.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>SIGN IN</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(59,130,246,0.35)] transition flex items-center gap-1.5"
          >
            <span>LET'S TALK</span>
            <span>→</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-400 hover:text-white focus:outline-none p-1 cursor-pointer border-none bg-transparent flex items-center justify-center"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden w-full max-w-5xl bg-[#12161f]/95 border border-white/10 rounded-2xl p-4 mt-2 flex flex-col gap-3 shadow-2xl backdrop-blur-md pointer-events-auto">
          {portfolioData.navigation.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-sans tracking-widest uppercase font-bold text-slate-300 hover:text-white py-1 block"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { setIsOpen(false); if (onOpenAuth) onOpenAuth(); }}
            className="w-full text-center py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-sans tracking-widest uppercase font-bold flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
          >
            {isAuthenticated ? `Client Portal (${user?.name})` : 'Client Sign In'}
          </button>
        </div>
      )}
    </header>
  );
}

