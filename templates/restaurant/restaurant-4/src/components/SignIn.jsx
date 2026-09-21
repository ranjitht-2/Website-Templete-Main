import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ onNavigateBack, redirectTarget, authReason }) {
  const { login, register, isAuthenticated, user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('signin');
  
  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (result.success) {
      if (onNavigateBack) {
        onNavigateBack(redirectTarget || 'home');
      }
    } else {
      setLoginError(result.error || 'Authentication failed.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please verify.');
      return;
    }

    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setRegSuccess('Patron membership created successfully! Redirecting...');
      setTimeout(() => {
        if (onNavigateBack) {
          onNavigateBack(redirectTarget || 'home');
        }
      }, 900);
    } else {
      setRegError(result.error || 'Registration failed.');
    }
  };

  if (isAuthenticated && user) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 60px 20px', background: 'var(--bg-cream)' }}>
        <div style={{ background: 'var(--bg-cream-surface)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '48px 36px', maxWidth: '520px', width: '100%', textAlign: 'center', boxShadow: '0 20px 50px rgba(38, 53, 43, 0.08)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-forest)', color: 'var(--bg-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>
            C
          </div>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            EMBER HOUSE PATRON
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-forest)', margin: '0 0 10px 0' }}>
            Welcome, {user.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Logged in as <strong style={{ color: 'var(--color-forest)' }}>{user.email}</strong> • Status: <strong style={{ color: 'var(--color-forest)' }}>{user.role}</strong>
          </p>

          <div style={{ background: 'rgba(251, 249, 243, 0.8)', border: '1px dashed rgba(38, 53, 43, 0.2)', borderRadius: '12px', padding: '16px', marginBottom: '28px', textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-forest)', lineHeight: 1.6 }}>
              ✓ Priority Table Reservations at The Garden & Conservatory<br />
              ✓ Exclusive Seasonal Tasting Flights & Sommelier Pairings<br />
              ✓ Direct Concierge Booking for Private Dinners
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="btn-pill-menu"
              style={{ minWidth: '170px', padding: '0.75rem 1.6rem', fontSize: '0.82rem' }}
            >
              Continue to Table &rarr;
            </button>
            <button
              onClick={logout}
              style={{
                background: 'transparent',
                color: 'var(--color-forest)',
                border: '1px solid var(--color-forest)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                padding: '0.75rem 1.4rem',
                borderRadius: '100px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px 16px 60px 16px', background: 'var(--bg-cream)' }}>
      <div style={{ background: 'var(--bg-cream-surface)', border: '1px solid var(--border-color)', borderRadius: '20px', maxWidth: '500px', width: '100%', overflow: 'hidden', boxShadow: '0 25px 60px rgba(38, 53, 43, 0.08)', position: 'relative' }}>
        
        {/* Back Button */}
        <div style={{ padding: '24px 28px 0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => onNavigateBack && onNavigateBack('home')}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-forest)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            &larr; Back to Restaurant
          </button>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-sage)', fontWeight: 700 }}>
            Patron Access
          </span>
        </div>

        {/* Header Branding */}
        <div style={{ padding: '24px 28px 10px 28px', textAlign: 'center' }}>
          <span className="house-meta-tag" style={{ marginBottom: '8px' }}>
            BOTANICAL &amp; WOOD-FIRED DINING
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-forest)', margin: '0 0 6px 0' }}>
            Ember House
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, fontStyle: 'italic', fontFamily: 'var(--font-accent)' }}>
            Sign in to confirm table reservations and access tasting flights.
          </p>

          {/* Contextual Auth Reason Prompt */}
          {authReason && (
            <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(184, 93, 56, 0.1)', border: '1px solid var(--color-clay)', borderRadius: '10px', color: 'var(--color-clay)', fontSize: '0.85rem', textAlign: 'left' }}>
              <strong>Table Reservation:</strong> {authReason}
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', margin: '15px 28px 20px 28px' }}>
          <button
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            style={{
              flex: 1,
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'signin' ? '2.5px solid var(--color-forest)' : '2.5px solid transparent',
              color: activeTab === 'signin' ? 'var(--color-forest)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            style={{
              flex: 1,
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'register' ? '2.5px solid var(--color-forest)' : '2.5px solid transparent',
              color: activeTab === 'register' ? 'var(--color-forest)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Join Patrons
          </button>
        </div>

        {/* Form Container */}
        <div style={{ padding: '0 28px 28px 28px' }}>
          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {loginError && (
                <div style={{ padding: '10px 14px', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '8px', color: '#b91c1c', fontSize: '0.85rem' }}>
                  {loginError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-forest)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-cream)', color: 'var(--color-forest)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
                  placeholder="maya.krishnan@emberhouse.example"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-forest)' }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-cream)', color: 'var(--color-forest)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="btn-pill-menu"
                style={{ width: '100%', padding: '12px', marginTop: '6px', fontSize: '0.85rem' }}
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Table'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {regError && (
                <div style={{ padding: '10px 14px', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '8px', color: '#b91c1c', fontSize: '0.85rem' }}>
                  {regError}
                </div>
              )}
              {regSuccess && (
                <div style={{ padding: '10px 14px', background: '#dcfce7', border: '1px solid #22c55e', borderRadius: '8px', color: '#15803d', fontSize: '0.85rem' }}>
                  {regSuccess}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-forest)' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-cream)', color: 'var(--color-forest)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
                  placeholder="Karan Mehra"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-forest)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-cream)', color: 'var(--color-forest)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
                  placeholder="karan@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-forest)' }}>
                  Create Password (min. 6 chars)
                </label>
                <input
                  type="password"
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-cream)', color: 'var(--color-forest)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-forest)' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-cream)', color: 'var(--color-forest)', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
                  placeholder="••••••••"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="btn-pill-menu"
                style={{ width: '100%', padding: '12px', marginTop: '6px', fontSize: '0.85rem' }}
              >
                {regLoading ? 'Creating Membership...' : 'Register as Patron'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
