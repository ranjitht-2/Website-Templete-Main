import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenSignIn, onNavClick }) {
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuNavigation = (targetId) => {
    setIsMenuOpen(false); // Close the fullscreen overlay

    if (onNavClick) {
      onNavClick(targetId);
    } else {
      setTimeout(() => {
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 font-sans ${
          scrolled 
            ? 'bg-black/95 border-b border-white/5 py-4 shadow-lg backdrop-blur-md' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand Name (Left) */}
          <button 
            type="button"
            onClick={() => handleMenuNavigation('home')} 
            className="flex items-center space-x-3 group bg-transparent border-none cursor-pointer p-0 text-left"
          >
            <span className="text-xl md:text-2xl font-serif tracking-widest text-[#f5f4f1] transition-transform duration-500 group-hover:scale-105">
              {siteConfig.studioName}
            </span>
          </button>

          {/* Links (Center - Desktop) */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              type="button"
              onClick={() => handleMenuNavigation('home')}
              className="text-[10px] uppercase tracking-[0.35em] transition-colors duration-300 text-neutral-400 hover:text-white bg-transparent border-none cursor-pointer p-0"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleMenuNavigation('about')}
              className="text-[10px] uppercase tracking-[0.35em] transition-colors duration-300 text-neutral-400 hover:text-white bg-transparent border-none cursor-pointer p-0"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleMenuNavigation('portfolio')}
              className="text-[10px] uppercase tracking-[0.35em] transition-colors duration-300 text-neutral-400 hover:text-white bg-transparent border-none cursor-pointer p-0"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => handleMenuNavigation('contact')}
              className="text-[10px] uppercase tracking-[0.35em] transition-colors duration-300 text-neutral-400 hover:text-white bg-transparent border-none cursor-pointer p-0"
            >
              Contact
            </button>

            {/* Client Portal Indicator on Desktop */}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => onOpenSignIn && onOpenSignIn(null, 'home')}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a880] flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 hover:text-white transition-colors"
              >
                <span>&bull;</span>
                <span>{user?.name?.split(' ')[0] || 'Client'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenSignIn && onOpenSignIn('Sign in to access your wedding registry & concierge portal', 'home')}
                className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Contact Inquire (Right - Desktop) */}
          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => handleMenuNavigation('contact')}
              className="px-6 py-2.5 rounded-full border border-white/20 text-[10px] uppercase tracking-[0.2em] text-[#f5f4f1] hover:bg-[#f5f4f1] hover:text-black hover:border-[#f5f4f1] transition-all duration-500 bg-transparent cursor-pointer"
            >
              Inquire
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden flex-col items-end space-y-1.5 z-50 relative group bg-transparent border-none p-0 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`h-[1px] w-6 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`h-[1px] w-4 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[1px] w-5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>

        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full fixed inset-0 z-50 bg-black p-8 sm:p-12 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center w-full">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-sans">
                {siteConfig.monogram} — {siteConfig.studioName}
              </span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="text-white/80 hover:text-white transition p-2 focus:outline-none cursor-pointer bg-transparent border-none"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6 text-left">
              <button
                type="button"
                onClick={() => handleMenuNavigation('home')}
                className="text-3xl md:text-4xl font-serif text-white hover:text-stone-400 transition text-left cursor-pointer bg-transparent border-none p-0"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleMenuNavigation('portfolio')}
                className="text-3xl md:text-4xl font-serif text-white hover:text-stone-400 transition text-left cursor-pointer bg-transparent border-none p-0"
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => handleMenuNavigation('about')}
                className="text-3xl md:text-4xl font-serif text-white hover:text-stone-400 transition text-left cursor-pointer bg-transparent border-none p-0"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => handleMenuNavigation('contact')}
                className="text-3xl md:text-4xl font-serif text-white hover:text-stone-400 transition text-left cursor-pointer bg-transparent border-none p-0"
              >
                Contact
              </button>

              {/* Mobile Auth Button */}
              <div className="pt-2">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenSignIn && onOpenSignIn(null, 'home');
                    }}
                    className="text-xl md:text-2xl font-serif text-[#c5a880] hover:text-white transition text-left cursor-pointer bg-transparent border-none p-0 flex items-center gap-2"
                  >
                    <span>&bull;</span>
                    <span>Client Portal ({user?.name || 'Account'})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenSignIn && onOpenSignIn('Sign in to access your wedding registry & client portal', 'home');
                    }}
                    className="text-xl md:text-2xl font-serif text-neutral-400 hover:text-white transition text-left cursor-pointer bg-transparent border-none p-0"
                  >
                    Client Sign In
                  </button>
                )}
              </div>
            </nav>

            {/* Footer / Connect Info inside Overlay */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans mb-1">Inquiries & Bookings</p>
                <a href={`mailto:${siteConfig.socials.email}`} className="text-sm font-sans tracking-wide text-neutral-300 hover:text-[#c5a880] transition-colors">
                  {siteConfig.socials.email}
                </a>
              </div>
              <div className="flex items-center space-x-6 text-xs text-neutral-400 font-sans">
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href={siteConfig.socials.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Pinterest
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
