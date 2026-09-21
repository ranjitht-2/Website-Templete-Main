import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Terminal } from 'lucide-react';
import { agencyData } from '../data/agencyData';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      className="sticky top-0 z-40 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-900/80 pt-4 sm:pt-5 pb-3 px-4 sm:px-6 md:px-12 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded bg-[#3ecf6e]/10 border border-[#3ecf6e]/30 flex items-center justify-center font-black text-[#3ecf6e] text-xs tracking-wider group-hover:scale-105 transition-transform">
            {agencyData.brand.logoText}
          </div>
          <span className="text-white font-black text-sm tracking-wider uppercase">
            {agencyData.brand.siteName}
          </span>
        </Link>

        {/* Navigation links (Desktop - Pill shape active style) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 px-2 py-1.5 rounded-full">
          {agencyData.navigation.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide font-medium transition-all ${
                isActiveRoute(item.path)
                  ? 'bg-zinc-800 text-[#3ecf6e]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/signin"
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide font-medium transition-all flex items-center gap-1.5 ${
              isActiveRoute('/signin')
                ? 'bg-zinc-800 text-[#3ecf6e]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User size={13} />
            {isAuthenticated ? (user?.name?.split(' ')[0] || 'Portal') : 'Sign In'}
          </Link>
        </nav>

        {/* CTA (Get in Touch) & Mobile Toggle Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 rounded-full bg-zinc-900 border border-[#3ecf6e]/30 hover:border-[#3ecf6e] text-[#3ecf6e] font-bold text-xs tracking-wide uppercase transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Terminal size={13} />
                <span>{user?.name?.split(' ')[0] || 'Portal'}</span>
              </Link>
              <button
                onClick={logout}
                title="Disconnect Node"
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              to="/contact"
              className="hidden sm:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#3ecf6e] hover:bg-[#34b65f] text-black font-extrabold text-xs tracking-wide uppercase transition-colors shrink-0"
            >
              Get in Touch
            </Link>
          )}

          {/* Hamburger Menu (Mobile/Tablet) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-zinc-400 hover:text-white p-2 focus:outline-none shrink-0 cursor-pointer bg-transparent border-none flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden w-full bg-[#0a0a0a]/98 border-b border-zinc-900 px-6 py-6 flex flex-col gap-4 absolute top-full left-0 z-50 shadow-2xl">
          {agencyData.navigation.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-sans tracking-wide font-bold py-2 block ${
                isActiveRoute(item.path) ? 'text-[#3ecf6e]' : 'text-zinc-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/signin"
            onClick={() => setIsOpen(false)}
            className={`text-sm font-sans tracking-wide font-bold py-2 flex items-center gap-2 ${
              isActiveRoute('/signin') ? 'text-[#3ecf6e]' : 'text-zinc-400'
            }`}
          >
            <User size={15} />
            <span>{isAuthenticated ? `Portal (${user?.name})` : 'Sign In / Register'}</span>
          </Link>

          {isAuthenticated ? (
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full text-center py-3 bg-zinc-900 border border-zinc-700 text-rose-400 font-extrabold text-xs tracking-wide uppercase mt-2 rounded-full cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut size={14} />
              <span>Disconnect Node</span>
            </button>
          ) : (
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 bg-[#3ecf6e] text-black font-extrabold text-xs tracking-wide uppercase mt-2 rounded-full"
            >
              Get in Touch
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
