import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      className="sticky top-0 z-40 w-full max-w-full bg-[#0e0e0e]/95 backdrop-blur-md border-b border-zinc-900 pt-4 sm:pt-5 pb-4 px-4 sm:px-6 md:px-12 box-border transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#e8583f]/10 border border-[#e8583f]/20 flex items-center justify-center font-bold text-[#e8583f] text-sm group-hover:bg-[#e8583f]/20 transition-all">
            {portfolioData.brand.logoText}
          </div>
          <span className="text-white font-black text-sm tracking-widest uppercase font-sans">
            {portfolioData.brand.siteName}
          </span>
        </Link>

        {/* Navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {portfolioData.navigation.map((item, idx) => {
            if (item.dropdown) {
              return (
                <div 
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className="text-[10px] font-sans tracking-widest uppercase font-bold text-zinc-400 hover:text-white flex items-center gap-1 py-1.5 focus:outline-none cursor-pointer border-none bg-transparent"
                  >
                    {item.label} <ChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Nested Submenu Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 w-44 bg-[#141414] border border-zinc-800 py-2 shadow-2xl flex flex-col z-50">
                      {item.dropdown.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          onClick={() => setDropdownOpen(false)}
                          className={`px-4 py-2.5 text-[10px] font-sans tracking-widest uppercase font-bold text-left transition-colors ${
                            isActiveRoute(sub.path) ? 'text-[#e8583f] bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                to={item.path}
                className={`text-[10px] font-sans tracking-widest uppercase font-bold transition-colors py-1.5 relative ${
                  isActiveRoute(item.path) ? 'text-[#e8583f]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActiveRoute(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e8583f] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Sign In (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/signin"
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 border ${
              isActiveRoute('/signin') || isAuthenticated
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-transparent text-stone-400 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            <User size={13} className={isAuthenticated ? 'text-[#E6392F]' : ''} />
            <span>{isAuthenticated ? (user?.name?.split(' ')[0] || 'Client') : 'Sign In'}</span>
          </Link>

          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-[#e8583f] hover:bg-[#cf472f] text-white font-bold text-xs tracking-widest uppercase transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-zinc-400 hover:text-white p-1.5 focus:outline-none cursor-pointer border-none bg-transparent"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden w-full bg-[#0d0d0d]/95 border-b border-zinc-900 px-6 py-6 flex flex-col gap-4 absolute top-full left-0 z-50">
          {portfolioData.navigation.map((item, idx) => {
            if (item.dropdown) {
              return (
                <div key={idx} className="flex flex-col gap-2.5 pl-2 border-l border-zinc-800">
                  <span className="text-[10px] font-sans tracking-widest uppercase font-bold text-zinc-600">
                    {item.label}
                  </span>
                  {item.dropdown.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-xs font-sans tracking-widest uppercase font-bold py-1 block ${
                        isActiveRoute(sub.path) ? 'text-[#e8583f]' : 'text-zinc-400'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-xs font-sans tracking-widest uppercase font-bold py-1 block ${
                  isActiveRoute(item.path) ? 'text-[#e8583f]' : 'text-zinc-400'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 bg-[#1c1c1e] hover:bg-zinc-800 text-white font-bold text-xs font-mono uppercase tracking-widest rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-2"
          >
            <User size={13} className="text-[#E6392F]" />
            <span>{isAuthenticated ? `Client Portal (${user?.name?.split(' ')[0] || 'Active'})` : 'Client Sign In'}</span>
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3.5 bg-[#e8583f] text-white font-bold text-xs tracking-widest uppercase rounded-lg"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
