import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigateToSignIn }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

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

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <header className={`site-nav ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="site-nav-inner">
        {/* Left: Brand */}
        <a 
          href="#hero" 
          className="nav-brand" 
          data-cursor="LUMIÈRE"
          onClick={(e) => scrollToSection(e, 'hero')}
        >
          LUMIÈRE
        </a>

        {/* Center: Location */}
        <div className="nav-location">
          <span>CHENNAI · INDIA</span>
        </div>

        {/* Right: Actions Cluster */}
        <div className="nav-actions">
          <a 
            href="#menu" 
            className="nav-menu-link" 
            data-cursor="MENU" 
            onClick={(e) => scrollToSection(e, 'menu')}
          >
            MENU
          </a>

          <a 
            href="#reservation" 
            className="nav-reserve-btn" 
            data-cursor="RESERVE" 
            onClick={(e) => scrollToSection(e, 'reservation')}
          >
            RESERVE
          </a>

          {/* Patron Auth Badge / Sign In */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="lumiere-user-badge"
                onClick={() => onNavigateToSignIn && onNavigateToSignIn('hero')}
                title="View Patron Account"
              >
                👑 {user.name.split(' ')[0]} ({user.role})
              </button>
              <button
                type="button"
                className="lumiere-signout-btn"
                onClick={logout}
                title="Sign Out of Table Portal"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="lumiere-signin-nav-btn"
              onClick={() => onNavigateToSignIn && onNavigateToSignIn('hero')}
              data-cursor="SIGN IN"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
