import React, { useState } from 'react';
import { Menu, X, User, Lock } from 'lucide-react';
import { editorialData } from '../data/editorialData';
import { useAuth } from '../context/AuthContext';

export default function NavBar({ onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleScrollTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthClick = () => {
    setIsOpen(false);
    if (onOpenAuth) onOpenAuth();
  };

  return (
    <header 
      className="w-full bg-[#fbfbfb]/90 backdrop-blur-md border-b border-zinc-200/50 sticky top-0 z-50 px-5 pt-5 pb-3 sm:px-8 md:px-12 font-sans"
      style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-7xl mx-auto flex items-center justify-between relative z-50">
        {/* Brand Name / Logo */}
        <span 
          onClick={() => handleScrollTo('home')}
          className="text-lg sm:text-2xl font-serif italic text-stone-900 cursor-pointer"
        >
          {editorialData.brand.logoText || "Evelyn Oswald"}
        </span>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {editorialData.navigation.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollTo(item.target)}
              className="text-xs font-sans tracking-widest uppercase font-bold text-zinc-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              {item.label}
            </button>
          ))}

          {/* Client Portal Button (Desktop) */}
          <button
            onClick={handleAuthClick}
            className="px-3.5 py-1.5 bg-black hover:bg-zinc-800 text-white text-[10px] font-mono tracking-widest uppercase font-bold transition-all cursor-pointer border-none flex items-center gap-1.5"
          >
            {isAuthenticated ? (
              <>
                <User size={11} />
                <span>{user?.name?.split(' ')[0] || 'CLIENT'} // PORTAL</span>
              </>
            ) : (
              <>
                <Lock size={11} />
                <span>CLIENT PORTAL</span>
              </>
            )}
          </button>
        </nav>

        {/* Hamburger Menu (Mobile) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleAuthClick}
            className="p-1.5 bg-black text-white text-[10px] font-mono uppercase font-bold cursor-pointer border-none flex items-center gap-1"
          >
            {isAuthenticated ? <User size={11} /> : <Lock size={11} />}
            <span>{isAuthenticated ? 'PORTAL' : 'SIGN IN'}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-stone-800 p-1 focus:outline-none bg-transparent border-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden w-full bg-[#fbfbfb] border-b border-zinc-200 px-6 py-6 flex flex-col gap-4 absolute top-full left-0 z-50 shadow-lg">
          {editorialData.navigation.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollTo(item.target)}
              className="text-left text-sm font-sans tracking-wide font-bold py-2 block text-zinc-600 hover:text-black cursor-pointer bg-transparent border-none focus:outline-none"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleAuthClick}
            className="text-left text-sm font-sans tracking-wide font-bold py-2 block text-black cursor-pointer bg-transparent border-t border-zinc-200 pt-3 flex items-center gap-2"
          >
            {isAuthenticated ? <User size={14} /> : <Lock size={14} />}
            <span>{isAuthenticated ? `Client Portal (${user?.name})` : 'Client Sign In / Register'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
