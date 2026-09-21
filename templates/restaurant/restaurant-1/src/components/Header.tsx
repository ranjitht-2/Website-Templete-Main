import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenMenu: () => void;
  variant?: 'floating' | 'standard';
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, variant = 'floating' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (variant === 'standard') {
    return (
      <div className="w-full bg-[#F3EEE5]/95 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/60">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          {/* Top Info Bar */}
          <aside className="hidden lg:flex items-center justify-between py-2 px-2 text-xs text-stone-600 border-b border-stone-200/60">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2">
                <i className="bi bi-geo-alt text-[#A75E4D]"></i>
                <span>27 Garden Street, Chennai, Tamil Nadu</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="bi bi-clock text-[#A75E4D]"></i>
                <span>Mon–Thu: 11am–10pm | Fri–Sun: 11am–11:30pm</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-decoration-none">
                <i className="bi bi-telephone text-[#A75E4D]"></i>
                <span>+91 98765 43210</span>
              </a>
            </div>
          </aside>

          {/* Main Navbar Row */}
          <header className="flex items-center justify-between py-3.5 px-2">
            {/* Brand Logo & Tagline */}
            <Link to="/" className="text-decoration-none group">
              <span className="font-serif text-xl tracking-widest font-semibold text-stone-900 block">
                EMBER<span className="text-[#641F25]">.</span>HOUSE
              </span>
              <span className="text-[10px] tracking-wider uppercase text-stone-500 block mt-0.5">
                Gather. Taste. Stay Awhile.
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/">Home</Link>
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/about">Our Story</Link>
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/menu">Menu</Link>
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/chefs">Chefs</Link>
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/events">Events</Link>
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/gallery">Gallery</Link>
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/blog">Journal</Link>
              <Link className="hover:text-stone-900 transition-colors text-decoration-none" to="/contact">Contact</Link>
            </nav>

            {/* Right Action Group */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <Link to="/signin" className="px-3 py-1.5 text-xs tracking-wider uppercase font-semibold bg-[#641F25] text-white rounded-sm text-decoration-none flex items-center gap-1.5" title="View Member Profile">
                    <i className="bi bi-person-fill"></i>
                    <span>{user.name.split(' ')[0]}</span>
                  </Link>
                  <button onClick={logout} className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors border border-stone-300 rounded-sm" title="Sign Out">
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </div>
              ) : (
                <Link to="/signin" className="px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-stone-700 hover:text-stone-900 border border-stone-300 hover:border-stone-500 rounded-sm transition text-decoration-none">
                  Sign In
                </Link>
              )}

              <Link to="/contact#reservation" className="px-4 py-2 text-xs uppercase tracking-wider font-medium border border-stone-800 rounded-sm hover:bg-stone-900 hover:text-white transition text-decoration-none text-stone-900 hidden sm:inline-flex">
                Reserve Table
              </Link>
              
              <button className="flex items-center justify-center p-2 text-stone-800 hover:text-stone-950 transition-colors text-xl bg-transparent border-0 cursor-pointer" type="button" onClick={onOpenMenu} aria-label="Open Menu">
                <i className="bi bi-grid-fill"></i>
              </button>
            </div>
          </header>
        </div>
      </div>
    );
  }

  return (
    <header className={`floating-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
      <Link to="/" className="brand-minimal text-decoration-none">
        <span className="font-serif text-lg tracking-widest font-semibold text-stone-900 block">
          EMBER<span className="text-[#641F25]">.</span>HOUSE
        </span>
        <span className="text-[9px] tracking-wider uppercase text-stone-500 block">
          Chennai &bull; Est. 2012
        </span>
      </Link>
      
      <div className="flex items-center gap-3">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <Link to="/signin" className="px-2.5 py-1 text-xs tracking-wider uppercase font-semibold bg-[#641F25] text-white rounded-sm text-decoration-none flex items-center gap-1" title="View Profile">
              <i className="bi bi-person-fill"></i>
              <span>{user.name.split(' ')[0]}</span>
            </Link>
            <button onClick={logout} className="p-1 text-xs text-stone-600 hover:text-stone-900 border border-stone-300 rounded-sm" title="Sign Out">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        ) : (
          <Link to="/signin" className="px-3 py-1 text-xs uppercase tracking-wider font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded-sm transition text-decoration-none">
            Sign In
          </Link>
        )}

        <button type="button" className="btn-menu-trigger" id="btnMenuOpen" onClick={onOpenMenu} aria-label="Open Fullscreen Menu">
          MENU <i className="bi bi-grid-fill ms-1"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
