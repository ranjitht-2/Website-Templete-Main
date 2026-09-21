import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { siteConfig } from '../data/config';

export default function Navbar({ onOpenSignIn, onNavClick }) {
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        className={`w-full max-w-full fixed top-0 left-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 pt-4 sm:pt-5 pb-3 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 shadow-lg'
            : 'bg-[#0a0a0a]/80 backdrop-blur-sm'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex flex-col shrink-0 no-underline cursor-pointer group"
        >
          <span className="font-serif text-sm sm:text-base tracking-[0.25em] text-white uppercase font-bold group-hover:text-stone-200 transition-colors">
            _AURA
          </span>
          <span className="font-serif text-[10px] sm:text-xs tracking-[0.3em] text-stone-300 uppercase group-hover:text-white transition-colors">
            STUDIO
          </span>
        </a>

        {/* Center: Desktop Nav Links (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="text-xs uppercase tracking-[0.2em] text-[#f5f4f1]/80 hover:text-white transition-colors duration-300 font-sans cursor-pointer"
            >
              {link.label}
            </a>
          ))}

          {/* Desktop Patron Portal Indicator */}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => onOpenSignIn && onOpenSignIn(null, 'home')}
              className="text-xs uppercase tracking-[0.2em] font-bold text-[#6b1d2f] flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 hover:text-[#f5f4f1] transition-colors"
            >
              <i className="fa-regular fa-circle-user text-xs"></i>
              <span>{user?.name?.split(' ')[0] || 'Patron'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenSignIn && onOpenSignIn('Sign in to access your patron portal and inquiries', 'home')}
              className="text-xs uppercase tracking-[0.2em] text-[#f5f4f1]/80 hover:text-white transition-colors duration-300 font-sans cursor-pointer bg-transparent border-none p-0"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Social / Instagram Link */}
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/80 hover:text-white transition p-1 text-sm flex items-center justify-center cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5"></rect>
              <circle cx="12" cy="12" r="4" strokeWidth="1.5"></circle>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"></line>
            </svg>
          </a>

          {/* Desktop Socials (Twitter & Vimeo) */}
          <a
            href={siteConfig.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hidden sm:inline-flex text-white/80 hover:text-[#6b1d2f] transition p-1 text-sm items-center justify-center cursor-pointer"
          >
            <i className="fa-brands fa-x-twitter text-sm"></i>
          </a>
          <a
            href={siteConfig.socials.vimeo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vimeo"
            className="hidden sm:inline-flex text-white/80 hover:text-[#6b1d2f] transition p-1 text-sm items-center justify-center cursor-pointer"
          >
            <i className="fa-brands fa-vimeo-v text-sm"></i>
          </a>

          {/* Menu / Hamburger Toggle */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/90 hover:text-white transition p-1 text-sm focus:outline-none cursor-pointer bg-transparent border-none flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center space-y-8 px-6 text-center"
          >
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className="text-lg uppercase tracking-[0.25em] text-[#f5f4f1] hover:text-[#6b1d2f] transition-colors duration-300 font-sans"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSignIn && onOpenSignIn(null, 'home');
                }}
                className="text-base uppercase tracking-[0.25em] text-[#6b1d2f] font-bold font-sans bg-transparent border-none cursor-pointer flex items-center gap-2 pt-4 border-t border-white/10"
              >
                <i className="fa-regular fa-circle-user"></i>
                <span>{user?.name || 'Patron Portal'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSignIn && onOpenSignIn('Sign in to access your patron portal', 'home');
                }}
                className="text-base uppercase tracking-[0.25em] text-[#f5f4f1] hover:text-[#6b1d2f] font-sans bg-transparent border-none cursor-pointer pt-4 border-t border-white/10"
              >
                Sign In
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
