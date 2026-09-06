import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenQuote, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Portal Quick Link & Theme Switcher Bar */}
      <div className="buildhub-top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-nav-link" style={{ cursor: 'pointer' }}>‹ TEMPLATES CATALOG</span>
            <span className="sep">|</span>
            <a href="#home" className="top-nav-link">MAIN PORTAL</a>
          </div>
          <div className="top-bar-right">
            <button 
              className="theme-toggle-pill" 
              onClick={onToggleTheme} 
              title="Toggle Light / Dark Mode"
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span>{theme === 'light' ? 'DARK MODE' : 'LIGHT MODE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <a href="#home" className="brand-logo">
              <div className="logo-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-main">BUILDHUB</span>
                <span className="logo-sub">CONSTRUCTIONS</span>
              </div>
            </a>

            {/* Desktop Navigation Menu */}
            <ul className="nav-menu">
              <li><a href="#home" className="nav-link active">HOME</a></li>
              <li><a href="#bim3d" className="nav-link">3D DIGITAL TWIN</a></li>
              <li><a href="#services" className="nav-link">SERVICES</a></li>
              <li><a href="#projects" className="nav-link">PROJECTS</a></li>
              <li className="nav-dropdown">
                <a href="#calculator" className="nav-link nav-dropdown-toggle">
                  PAGES <span className="dropdown-arrow">▼</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#bim3d"><span>3D BIM Model</span> <span>›</span></a></li>
                  <li className="dropdown-item"><a href="#calculator"><span>Cost Calculator</span> <span>›</span></a></li>
                  <li className="dropdown-item"><a href="#about"><span>Why Choose Us</span> <span>›</span></a></li>
                </ul>
              </li>
              <li><a href="#calculator" className="nav-link">ESTIMATOR</a></li>
            </ul>

            {/* Right Contact Hotline & CTA Button */}
            <div className="nav-actions">
              <div 
                className="contact-pill trigger-callback-modal" 
                onClick={onOpenQuote}
                title="Click to schedule instant callback"
                style={{ cursor: 'pointer' }}
              >
                <div className="contact-icon-circle">
                  <Phone size={16} />
                </div>
                <div className="contact-text">
                  <span className="phone-number">+1 (234) 567-8900</span>
                  <span className="phone-sub">Call Us Anytime</span>
                </div>
              </div>

              <button className="btn btn-primary" onClick={onOpenQuote}>
                GET A QUOTE
                <ArrowRight size={16} />
              </button>

              <button
                className="mobile-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-main, #ffffff)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="buildhub-mobile-drawer"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-card, #0a0f1d)',
              borderBottom: '2px solid var(--gold-primary, #e5a93c)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              zIndex: 9999
            }}
          >
            <a href="#home" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>HOME</a>
            <a href="#bim3d" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>3D DIGITAL TWIN</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-white, #fff)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>SERVICES</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-white, #fff)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>PROJECTS</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-white, #fff)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>ESTIMATOR</a>
            
            <button 
              className="theme-toggle-pill" 
              onClick={() => {
                onToggleTheme();
              }}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px 16px',
                marginTop: '4px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'SWITCH TO DARK MODE' : 'SWITCH TO LIGHT MODE'}</span>
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
            >
              GET A QUOTE →
            </button>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 1024px) {
          .nav-menu { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
          .contact-pill { display: none !important; }
        }
        @media (max-width: 768px) {
          .buildhub-top-bar { display: none !important; }
          .site-header {
            padding-top: max(1.25rem, env(safe-area-inset-top, 16px)) !important;
            padding-bottom: 0.85rem !important;
            padding-inline: 1.25rem !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .site-header .container {
            padding-left: 0 !important;
            padding-right: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .nav-inner {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            width: 100% !important;
            height: auto !important;
            min-height: 48px !important;
            padding: 0 !important;
          }
          .brand-logo {
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
            text-decoration: none !important;
            flex-shrink: 0 !important;
          }
          .logo-icon {
            width: 36px !important;
            height: 36px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
          }
          .logo-icon svg {
            width: 30px !important;
            height: 30px !important;
          }
          .logo-text {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            line-height: 1 !important;
          }
          .logo-main {
            font-size: 1.3rem !important;
            line-height: 1.1 !important;
            letter-spacing: 0.04em !important;
          }
          .logo-sub {
            font-size: 0.6rem !important;
            letter-spacing: 0.18em !important;
          }
          .nav-actions {
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
          }
          .nav-actions .btn { display: none !important; }
          .mobile-toggle-btn {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 42px !important;
            height: 42px !important;
            border-radius: 8px !important;
            background: rgba(255, 255, 255, 0.07) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            color: var(--text-white, #ffffff) !important;
            cursor: pointer !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </>
  );
}

