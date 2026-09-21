import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { ArrowRight, Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onGetStarted?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Resources', href: '#how-it-works' },
    { label: 'Company', href: '#company' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white/95 backdrop-blur-md ${
        scrolled ? 'border-b border-gray-100 shadow-xs' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Logo />

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-[#191919]/80 hover:text-[#191919] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT CTA BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/signin"
            className="text-xs sm:text-sm font-medium text-[#191919]/70 hover:text-[#191919] transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Client Login</span>
          </Link>
          <Link
            to="/signin"
            className="inline-flex items-center gap-2 bg-[#191919] hover:bg-black text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-xs hover:shadow hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/signin"
            className="bg-[#191919] text-white text-xs font-medium px-3.5 py-2 rounded-full flex items-center gap-1.5"
          >
            <span>Start</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-black rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-[#191919] py-1 border-b border-gray-50"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#191919] py-1 border-b border-gray-50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#191919]/60" />
                <span>Client Portal</span>
              </span>
              <span className="text-xs font-mono text-[#191919]/50">Sign In →</span>
            </Link>
          </div>
          <div className="pt-2">
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#191919] text-white py-3 rounded-full text-sm font-medium"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
