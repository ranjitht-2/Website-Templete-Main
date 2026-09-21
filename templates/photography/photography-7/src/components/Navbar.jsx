import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenSignIn, onNavClick }) {
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" }
  ];

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (onNavClick) {
      onNavClick(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className="lume-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled || menuOpen ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
        borderBottom: isScrolled || menuOpen ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid transparent',
        backdropFilter: isScrolled || menuOpen ? 'blur(16px)' : 'none',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .lume-navbar {
            padding: 0 20px !important;
          }
          .hamburger-btn {
            display: block !important;
          }
          .nav-menu {
            position: fixed;
            top: 90px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ffffff;
            flex-direction: column;
            justify-content: center;
            gap: 30px !important;
            padding: 40px 20px;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 999;
            overflow-y: auto;
          }
          .nav-menu.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .nav-links-list {
            flex-direction: column;
            align-items: center;
            gap: 24px !important;
          }
        }
      `}</style>

      {/* Brand logo */}
      <a 
        href="#home" 
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('home');
        }}
        style={{
          textDecoration: 'none',
          color: '#111827',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '800',
          fontSize: '1.4rem',
          letterSpacing: '3px'
        }}
      >
        LUME STUDIO
      </a>

      {/* Hamburger menu icon for mobile */}
      <button 
        type="button"
        aria-label="Toggle Navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#111827',
          fontSize: '1.5rem',
          cursor: 'pointer',
          outline: 'none',
          padding: '8px'
        }}
        className="hamburger-btn"
      >
        <span style={{
          display: 'block',
          width: '24px',
          height: '2px',
          backgroundColor: '#111827',
          marginBottom: '5px',
          transition: '0.3s',
          transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
        }} />
        <span style={{
          display: 'block',
          width: '24px',
          height: '2px',
          backgroundColor: '#111827',
          marginBottom: '5px',
          opacity: menuOpen ? 0 : 1,
          transition: '0.3s'
        }} />
        <span style={{
          display: 'block',
          width: '24px',
          height: '2px',
          backgroundColor: '#111827',
          transition: '0.3s',
          transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
        }} />
      </button>

      {/* Nav Menu */}
      <div 
        className={`nav-menu ${menuOpen ? 'open' : ''}`}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '30px' 
        }}
      >
        <ul className="nav-links-list" style={{
          display: 'flex',
          listStyle: 'none',
          gap: '26px',
          margin: 0,
          padding: 0
        }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={`#${link.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                style={{
                  color: '#111827',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif",
                  opacity: 0.8,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.color = '#ff7a52';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = 0.8;
                  e.currentTarget.style.color = '#111827';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Client Authentication Link */}
          <li>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  if (onOpenSignIn) onOpenSignIn(null, 'home');
                }}
                className="cursor-pointer bg-transparent border-none p-0 flex items-center gap-1.5"
                style={{
                  color: '#ff7a52',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <i className="fa-regular fa-circle-user text-sm"></i>
                <span>{user?.name?.split(' ')[0] || 'Portal'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  if (onOpenSignIn) onOpenSignIn('Sign in to access your client portal and shoot bookings', 'home');
                }}
                className="cursor-pointer bg-transparent border-none p-0 text-neutral-800 hover:text-[#ff7a52] transition-colors"
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>

        {/* Action Button */}
        <button 
          type="button"
          onClick={() => handleNavClick('contact')}
          style={{
            background: 'linear-gradient(135deg, #ff7a52 0%, #ff5e3a 100%)',
            color: '#ffffff',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: '800',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '12px 24px',
            borderRadius: '99px',
            boxShadow: '0 4px 15px rgba(255, 122, 82, 0.25)',
            fontFamily: "'Poppins', sans-serif",
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Book a Shoot
        </button>
      </div>
    </nav>
  );
}
