import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function PillNav({ onOpenNav, onNavigateToAuth }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="pill-nav-wrapper">
      <div className="pill-nav-container flex items-center justify-between w-full px-6 py-3">
        <a href="#hero" className="pill-logo-mark shrink-0" data-cursor="EXPLORE">C</a>
        <div className="pill-center-location text-xs tracking-widest text-center truncate px-2">
          RESTAURANT &bull; CHENNAI
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="shrink-0">
          {isAuthenticated ? (
            <button
              onClick={onNavigateToAuth}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-forest)',
                color: 'var(--color-forest)',
                borderRadius: '100px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              title="View Patron Profile"
            >
              👤 {user.name.split(' ')[0]}
            </button>
          ) : (
            <button
              onClick={onNavigateToAuth}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-forest)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '0.4rem 0.6rem',
                whiteSpace: 'nowrap'
              }}
            >
              SIGN IN
            </button>
          )}
          <button className="btn-pill-menu shrink-0" id="menu-trigger" data-cursor="OPEN" onClick={onOpenNav}>
            MENU
          </button>
        </div>
      </div>
    </div>
  );
}
