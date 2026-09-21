import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, User, LogOut } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useAuth } from '../context/AuthContext';

export default function NavBar({ onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, isAuthenticated, logout } = useAuth();

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
      style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
      className="sticky top-0 z-50 w-full max-w-full bg-[#111111]/95 backdrop-blur-sm border-b border-white/10 pt-4 sm:pt-5 pb-2 px-4 transition-all duration-300 relative box-border"
    >
      <div className="flex items-center justify-between w-full max-w-sm sm:max-w-md lg:max-w-7xl mx-auto relative z-50">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center font-black text-sm tracking-tight rounded-md">
            S
          </div>
          <span className="text-white font-black text-sm tracking-widest uppercase font-sans">
            {portfolioData.brand.siteName}
          </span>
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {portfolioData.navigation.map((item, idx) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={idx}
                href={item.href}
                className={`text-[10px] font-sans tracking-widest uppercase font-black transition-colors ${
                  isActive ? 'text-red-500' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* Client Portal Button (Desktop) */}
          <button
            onClick={() => onOpenAuth && onOpenAuth()}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-mono tracking-widest uppercase font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {isAuthenticated ? (
              <>
                <User size={12} className="text-red-500" />
                <span className="max-w-[100px] truncate">{user?.name || 'Client Portal'}</span>
              </>
            ) : (
              <>
                <Lock size={12} className="text-red-500" />
                <span>Client Portal</span>
              </>
            )}
          </button>
        </nav>

        {/* Hamburger Menu (Mobile) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => onOpenAuth && onOpenAuth()}
            className="p-1.5 text-white/70 hover:text-white bg-white/5 border border-white/10 rounded-md focus:outline-none"
            aria-label="Client Portal"
          >
            {isAuthenticated ? <User size={18} className="text-red-500" /> : <Lock size={18} className="text-red-500" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1.5 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden w-full bg-[#111111] border-b border-white/10 px-6 py-6 flex flex-col gap-4 absolute top-full left-0 z-50">
          {portfolioData.navigation.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-sans tracking-widest uppercase font-black text-white/70 hover:text-red-500 py-1"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { setIsOpen(false); onOpenAuth && onOpenAuth(); }}
                  className="w-full py-2.5 bg-white/5 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-md flex items-center justify-center gap-2 border border-white/10"
                >
                  <User size={13} className="text-red-500" />
                  <span>Profile: {user?.name}</span>
                </button>
                <button
                  onClick={() => { setIsOpen(false); logout(); }}
                  className="w-full py-2 bg-transparent text-stone-400 hover:text-red-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 border-none cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => { setIsOpen(false); onOpenAuth && onOpenAuth(); }}
                className="w-full py-2.5 bg-[#E6392F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-md flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                <Lock size={13} />
                <span>Client Portal / Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

