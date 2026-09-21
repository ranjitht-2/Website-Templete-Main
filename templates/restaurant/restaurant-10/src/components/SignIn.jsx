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
      setRegError('Please provide your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must contain at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setRegSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        if (onNavigateBack) {
          onNavigateBack(redirectTarget || 'home');
        }
      }, 1000);
    } else {
      setRegError(result.error || 'Registration failed.');
    }
  };

  if (isAuthenticated && user) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#fdfbf7' }}>
        <div style={{ background: 'white', border: '1px solid rgba(194, 65, 12, 0.15)', borderRadius: '16px', padding: '40px', maxWidth: '540px', width: '100%', textAlign: 'center', boxShadow: '0 8px 30px rgba(62, 39, 35, 0.08)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff7ed', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '1.8rem' }}>
            ✓
          </div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#c2410c', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            AUTHENTICATED MEMBER
          </span>
          <h2 className="casual-font-serif" style={{ fontSize: '2rem', color: '#3e2723', marginBottom: '8px' }}>
            Welcome, {user.name}
          </h2>
          <p style={{ color: '#78716c', fontSize: '0.95rem', marginBottom: '6px' }}>{user.email}</p>
          <span style={{ display: 'inline-block', background: '#15803d', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '3px 12px', borderRadius: '20px', marginBottom: '25px' }}>
            {user.role || 'Guest Member'}
          </span>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="casual-btn-primary"
              onClick={() => onNavigateBack(redirectTarget || 'home')}
            >
              Continue to {redirectTarget === 'ordering' ? 'Your Order' : redirectTarget === 'reservations' ? 'Table Reservation' : redirectTarget === 'catering' ? 'Catering Request' : 'Southern Ember'}
            </button>
            <button
              className="casual-btn-outline"
              style={{ color: '#c2410c', borderColor: '#c2410c' }}
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '85vh', padding: '60px 20px', background: '#fdfbf7' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        
        {/* Top Back Link */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => onNavigateBack('home')}
            style={{ background: 'transparent', border: 'none', color: '#c2410c', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}
          >
            ← Back to Southern Ember
          </button>
        </div>

        {/* Auth Required Notice if redirected */}
        {authReason && (
          <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', color: '#c2410c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🔒</span>
            <div><strong>Notice:</strong> {authReason}</div>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '16px', padding: '35px 30px', boxShadow: '0 8px 30px rgba(62, 39, 35, 0.08)', border: '1px solid rgba(194, 65, 12, 0.1)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#c2410c', fontWeight: 700 }}>
              MEMBER ACCESS
            </span>
            <h2 className="casual-font-serif" style={{ fontSize: '2.2rem', color: '#3e2723', marginTop: '6px', marginBottom: '8px' }}>
              Southern Ember
            </h2>
            <p style={{ color: '#78716c', fontSize: '0.9rem', margin: 0 }}>
              Sign in to place food orders, reserve private dining tables, and manage event catering.
            </p>
          </div>

          {/* Tab Selector */}
          <div style={{ display: 'flex', background: '#fdfbf7', borderRadius: '8px', padding: '4px', marginBottom: '25px', border: '1px solid #e7e5e4' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('signin'); setLoginError(''); setRegError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: activeTab === 'signin' ? '#c2410c' : 'transparent',
                color: activeTab === 'signin' ? 'white' : '#78716c',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setLoginError(''); setRegError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: activeTab === 'register' ? '#c2410c' : 'transparent',
                color: activeTab === 'register' ? 'white' : '#78716c',
                transition: 'all 0.2s ease'
              }}
            >
              Create Account
            </button>
          </div>

          {/* SIGN IN FORM */}
          {activeTab === 'signin' && (
            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', marginBottom: '18px', fontSize: '0.85rem' }}>
                  ⚠ {loginError}
                </div>
              )}

              <div className="casual-form-group" style={{ marginBottom: '16px' }}>
                <span className="casual-form-label">Email Address</span>
                <input
                  type="email"
                  required
                  className="casual-form-control"
                  placeholder="priya@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="casual-form-group" style={{ marginBottom: '20px' }}>
                <span className="casual-form-label" style={{ display: 'block', marginBottom: '6px' }}>Password</span>
                <input
                  type="password"
                  required
                  className="casual-form-control"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="casual-btn-primary"
                style={{ width: '100%' }}
                disabled={loginLoading}
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Southern Ember'}
              </button>
            </form>
          )}

          {/* CREATE ACCOUNT FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              {regError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', marginBottom: '18px', fontSize: '0.85rem' }}>
                  ⚠ {regError}
                </div>
              )}
              {regSuccess && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '10px 14px', borderRadius: '6px', marginBottom: '18px', fontSize: '0.85rem' }}>
                  ✓ {regSuccess}
                </div>
              )}

              <div className="casual-form-group" style={{ marginBottom: '16px' }}>
                <span className="casual-form-label">Full Name</span>
                <input
                  type="text"
                  required
                  className="casual-form-control"
                  placeholder="Karthik Sundaram"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div className="casual-form-group" style={{ marginBottom: '16px' }}>
                <span className="casual-form-label">Email Address</span>
                <input
                  type="email"
                  required
                  className="casual-form-control"
                  placeholder="karthik@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="casual-form-group" style={{ marginBottom: '16px' }}>
                <span className="casual-form-label">Password</span>
                <input
                  type="password"
                  required
                  className="casual-form-control"
                  placeholder="At least 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div className="casual-form-group" style={{ marginBottom: '20px' }}>
                <span className="casual-form-label">Confirm Password</span>
                <input
                  type="password"
                  required
                  className="casual-form-control"
                  placeholder="Re-enter password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="casual-btn-primary"
                style={{ width: '100%' }}
                disabled={regLoading}
              >
                {regLoading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
