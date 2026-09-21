import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, User } from 'lucide-react';
import { gradientData } from '../data/gradientData';
import { useAuth } from '../context/AuthContext';

export default function NavBar({ onOpenAuth }) {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent py-5 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => handleScrollTo('home')}
          className="flex items-center gap-2 text-white font-extrabold text-lg tracking-wider uppercase bg-transparent border-none cursor-pointer focus:outline-none"
        >
          {gradientData.brand.logoText}
        </button>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {gradientData.navigation.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollTo(item.target)}
              className="text-xs font-sans tracking-widest uppercase font-bold text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Auth & CTA (Get in Touch) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenAuth}
            className="px-4 py-2 text-xs font-sans tracking-widest uppercase font-bold text-white/80 hover:text-white border border-white/20 hover:border-[#ff5722] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent focus:outline-none"
          >
            {isAuthenticated && user ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{user.name.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <User size={13} className="text-[#ff5722]" />
                <span>SIGN IN</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-black font-extrabold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            Get in Touch
            <div className="w-5 h-5 rounded-full bg-[#ff5722] flex items-center justify-center text-white">
              <ArrowUpRight size={12} />
            </div>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onOpenAuth}
            className="p-1.5 text-white/80 hover:text-white border border-white/20 rounded-lg cursor-pointer bg-transparent"
            aria-label="Account"
          >
            {isAuthenticated ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse block m-1" />
            ) : (
              <User size={18} className="text-[#ff5722]" />
            )}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1.5 focus:outline-none bg-transparent border-none cursor-pointer"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden w-full bg-[#141414]/98 border-b border-zinc-900 px-6 py-6 flex flex-col gap-4 absolute top-full left-0 z-50">
          {gradientData.navigation.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollTo(item.target)}
              className="text-left text-sm font-sans tracking-wide font-bold py-2 block text-zinc-300 hover:text-white cursor-pointer bg-transparent border-none focus:outline-none"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => { setIsOpen(false); if (onOpenAuth) onOpenAuth(); }}
            className="w-full text-center py-2.5 bg-zinc-900 text-white font-bold text-xs tracking-wide uppercase mt-2 border border-zinc-800 cursor-pointer focus:outline-none"
          >
            {isAuthenticated ? `Brand Portal (${user?.name})` : 'Brand Partner Sign In'}
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full text-center py-3 bg-[#ff5722] text-white font-extrabold text-xs tracking-wide uppercase rounded-none cursor-pointer focus:outline-none"
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
}
