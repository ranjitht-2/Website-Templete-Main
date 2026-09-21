import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { photographyData } from '../data/photographyData';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <header 
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      className="sticky top-0 z-40 w-full max-w-full bg-[#0d0d0d] border-b border-zinc-900 py-4 px-6 md:px-12 font-sans"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="font-serif-heading text-xl md:text-2xl font-black text-white hover:text-zinc-300 transition-colors uppercase tracking-wider">
          {photographyData.brand.logoText}
        </Link>

        {/* Navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {photographyData.navigation.map((item, idx) => {
            if (item.submenu) {
              return (
                <div 
                  key={idx} 
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-[11px] font-sans tracking-widest uppercase font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none focus:outline-none">
                    {item.label} <ChevronDown size={12} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 bg-[#0d0d0d] border border-zinc-900 shadow-2xl py-3 w-40 flex flex-col mt-2 z-50">
                      {item.submenu.map((sub, sIdx) => (
                        <NavLink
                          key={sIdx}
                          to={sub.path}
                          className={({ isActive }) => 
                            `px-4 py-2 text-[10px] font-sans tracking-widest uppercase font-bold transition-all ${
                              isActive ? 'text-[#d4af37]' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) => 
                  `text-[11px] font-sans tracking-widest uppercase font-bold transition-all ${
                    isActive ? 'text-[#d4af37]' : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Client Portal & Social Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-zinc-500">
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-sm border text-[10px] font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                isActive || isAuthenticated
                  ? 'bg-zinc-900 text-[#d4af37] border-[#d4af37]/40'
                  : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`
            }
          >
            <User size={12} className={isAuthenticated ? 'text-[#d4af37]' : ''} />
            <span>{isAuthenticated ? (user?.name?.split(' ')[0] || 'Client') : 'Client Portal'}</span>
          </NavLink>

          {photographyData.socials.map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-xs"
            >
              <i className={soc.icon}></i>
            </a>
          ))}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-zinc-400 hover:text-white p-1.5 focus:outline-none bg-transparent border-none cursor-pointer"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden w-full bg-[#0d0d0d] border-b border-zinc-900 px-6 py-6 flex flex-col gap-4 absolute top-full left-0 z-50">
          {photographyData.navigation.map((item, idx) => {
            if (item.submenu) {
              return (
                <div key={idx} className="flex flex-col gap-2 pl-2">
                  <span className="text-[11px] font-sans tracking-widest uppercase font-bold text-zinc-600">
                    {item.label}
                  </span>
                  {item.submenu.map((sub, sIdx) => (
                    <NavLink
                      key={sIdx}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => 
                        `text-[10px] font-sans tracking-widest uppercase font-bold py-1.5 block ${
                          isActive ? 'text-[#d4af37]' : 'text-zinc-400'
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              );
            }

            return (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `text-xs font-sans tracking-widest uppercase font-bold py-2 block ${
                    isActive ? 'text-[#d4af37]' : 'text-zinc-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}

          <NavLink
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 bg-zinc-900 border border-zinc-800 text-[#d4af37] font-bold text-xs uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 mt-2 font-mono"
          >
            <User size={13} />
            <span>{isAuthenticated ? `Client Portal (${user?.name?.split(' ')[0] || 'Active'})` : 'Client Sign In / Register'}</span>
          </NavLink>
        </div>
      )}
    </header>
  );
}
