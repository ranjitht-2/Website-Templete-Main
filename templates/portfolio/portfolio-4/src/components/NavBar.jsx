import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Lock } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useAuth } from '../context/AuthContext';

export default function NavBar({ onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isAuthenticated, user } = useAuth();

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
    <>
      <header 
        className="w-full bg-[#fafafc]/90 backdrop-blur-md border-b border-stone-200/60 sticky top-0 z-50 px-5 pt-5 pb-3 sm:px-8 md:px-12 transition-all font-sans"
        style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
      >
        <div className="w-full max-w-sm sm:max-w-md md:max-w-7xl mx-auto flex items-center justify-between relative z-50">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-stone-900">
              {portfolioData.brand.siteName || "CLARA OSWALD"}
            </span>
          </a>

          {/* Navigation Links for Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {portfolioData.navigation.map((item, idx) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className={`text-xs font-sans tracking-widest uppercase font-bold transition-colors ${
                    isActive ? 'text-[#262626]' : 'text-[#262626]/50 hover:text-[#262626]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Auth Gateway Button */}
            <button
              onClick={() => onOpenAuth && onOpenAuth()}
              className="px-3.5 py-1.5 border border-stone-300 hover:border-stone-900 text-stone-800 text-[11px] font-mono tracking-wider uppercase font-semibold transition-all flex items-center gap-1.5 bg-white cursor-pointer"
            >
              {isAuthenticated ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{user?.name?.split(' ')[0] || 'PORTAL'}</span>
                </>
              ) : (
                <>
                  <Lock size={11} className="text-stone-500" />
                  <span>SIGN IN</span>
                </>
              )}
            </button>
          </nav>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => onOpenAuth && onOpenAuth()}
              className="text-stone-800 p-1.5 hover:bg-stone-100 text-[11px] font-mono font-semibold flex items-center gap-1 border border-stone-200 bg-white"
              aria-label="Client Sign In"
            >
              {isAuthenticated ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ) : (
                <Lock size={12} className="text-stone-600" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="text-stone-800 p-1 focus:outline-none bg-transparent border-none cursor-pointer"
              aria-label="Open Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full Nav Overlay Drawer with slide-in/fade animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#fafafc] flex flex-col justify-between p-6 sm:p-8 md:p-16"
          >
            {/* Header in Overlay */}
            <div className="flex justify-between items-center w-full max-w-sm sm:max-w-md md:max-w-7xl mx-auto">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-stone-900">
                {portfolioData.brand.siteName || "CLARA OSWALD"}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-800 hover:text-zinc-600 transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
                aria-label="Close Menu"
              >
                <X size={20} className="stroke-[1.5]" />
              </button>
            </div>

            {/* Middle Nav Links */}
            <nav className="flex flex-col gap-6 md:gap-8 my-auto pl-2 sm:pl-4 md:pl-10">
              {portfolioData.navigation.map((item, idx) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="text-2xl sm:text-4xl md:text-6xl font-serif tracking-tight text-left block text-[#262626] hover:opacity-60 transition-opacity"
                  >
                    {item.label}
                    {isActive && <span className="inline-block w-2.5 h-2.5 bg-[#262626] rounded-full ml-4" />}
                  </motion.a>
                );
              })}

              {/* Mobile Auth Drawer Link */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenAuth) onOpenAuth();
                }}
                className="text-left text-xl sm:text-2xl font-mono text-stone-800 flex items-center gap-2 pt-4 border-t border-stone-200 bg-transparent border-none cursor-pointer"
              >
                <Lock size={16} className="text-stone-500" />
                <span>{isAuthenticated ? 'CLIENT PORTAL' : 'SIGN IN / REGISTER'}</span>
              </button>
            </nav>

            {/* Bottom Footer Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-zinc-150 pt-8 text-[9px] font-sans tracking-widest uppercase font-bold text-zinc-400">
              <span>© {new Date().getFullYear()} CLARA OSWALD. ALL RIGHTS RESERVED.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
