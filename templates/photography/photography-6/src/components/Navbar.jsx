import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigateTo, onOpenSignIn, currentView }) {
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Work", target: "work" },
    { label: "Services", target: "services" },
    { label: "Contact", target: "contact" }
  ];

  const handleInquireClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onOpenSignIn('Please sign in or create an account to initiate an assignment inquiry.', 'contact');
    } else {
      onNavigateTo('contact');
    }
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 box-border w-full max-w-full"
        style={{
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          backgroundColor: isScrolled || currentView === 'signin' ? 'rgba(13, 13, 13, 0.95)' : 'transparent',
          borderBottom: isScrolled || currentView === 'signin' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          backdropFilter: isScrolled || currentView === 'signin' ? 'blur(12px)' : 'none'
        }}
      >
        <div className="flex items-center justify-between w-full max-w-sm sm:max-w-md lg:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-2">
          {/* Brand Logo */}
          <button 
            onClick={() => onNavigateTo('home')} 
            className="text-white text-lg md:text-xl font-black tracking-[6px] uppercase transition-opacity hover:opacity-80 bg-transparent border-none cursor-pointer p-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            KAIRO
          </button>

          {/* Desktop Nav Menu & Socials */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex list-none gap-6 m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => onNavigateTo(link.target)} 
                    className="text-white text-xs font-semibold tracking-[2.5px] uppercase opacity-70 hover:opacity-100 hover:text-[#ff4a3b] transition-all bg-transparent border-none cursor-pointer"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="h-5 w-[1px] bg-white/25 ml-2" />

            {/* Inquire Action Button */}
            <button 
              onClick={handleInquireClick}
              className="px-5 py-2 rounded-full border border-white/30 text-white text-xs font-semibold uppercase tracking-widest hover:border-[#ff4a3b] hover:text-[#ff4a3b] transition-colors cursor-pointer bg-transparent"
            >
              Inquire
            </button>

            {/* Auth State Button */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-white/20">
                <button 
                  onClick={() => onOpenSignIn('', 'home')}
                  className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#ff4a3b] transition-colors cursor-pointer bg-transparent border-none"
                >
                  <span className="w-7 h-7 rounded-full bg-[#ff4a3b]/20 border border-[#ff4a3b]/40 flex items-center justify-center text-xs text-[#ff4a3b]">
                    {user.name ? user.name[0].toUpperCase() : 'K'}
                  </span>
                  <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={logout}
                  className="text-[11px] font-bold uppercase tracking-wider text-stone-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                  title="Sign Out"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenSignIn('', 'home')}
                className="text-xs font-bold uppercase tracking-[2px] text-white hover:text-[#ff4a3b] transition-colors px-4 py-1.5 border border-white/30 rounded-full hover:border-[#ff4a3b] cursor-pointer bg-transparent"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile / Tablet Hamburger Toggle Button */}
          <button 
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white focus:outline-none cursor-pointer bg-transparent border-none text-xl"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Slide-out Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-64 max-w-[80vw] bg-[#0f0f0f] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-black text-lg tracking-[4px] uppercase text-white">KAIRO</span>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="text-xl p-1 text-white/70 hover:text-white bg-transparent border-none cursor-pointer"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6 py-6 text-left">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => { setIsMenuOpen(false); onNavigateTo(link.target); }}
                className="text-left text-sm font-semibold tracking-[2px] uppercase text-stone-300 hover:text-[#ff4a3b] transition-colors bg-transparent border-none cursor-pointer p-0"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button 
              onClick={(e) => { setIsMenuOpen(false); handleInquireClick(e); }}
              className="w-full py-3 bg-[#ff4a3b] hover:bg-[#e03a2c] text-white text-center text-xs uppercase font-bold tracking-widest rounded-xl transition cursor-pointer border-none"
            >
              Get in Touch
            </button>

            {/* Mobile Auth Status */}
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button 
                  onClick={() => { setIsMenuOpen(false); onOpenSignIn('', 'home'); }}
                  className="text-xs font-bold text-stone-200 flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
                >
                  <i className="fa-solid fa-user-check text-[#ff4a3b]"></i>
                  <span>{user.name}</span>
                </button>
                <button 
                  onClick={() => { setIsMenuOpen(false); logout(); }}
                  className="text-[10px] text-stone-400 hover:text-white uppercase font-bold bg-transparent border-none cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsMenuOpen(false); onOpenSignIn('', 'home'); }}
                className="w-full py-2.5 rounded-xl border border-white/30 text-white text-xs uppercase font-bold tracking-wider hover:border-[#ff4a3b] cursor-pointer bg-transparent"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
