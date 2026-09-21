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
      setRegSuccess('Deck Patron account registered successfully! Redirecting...');
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
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#faf7f2' }}>
        <div style={{ background: '#ffffff', border: '1px solid rgba(17,94,89,0.25)', borderRadius: '12px', padding: '45px 35px', maxWidth: '540px', width: '100%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#f0fdfa', color: '#115e59', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '2rem', border: '1.5px solid #115e59' }}>
            ⚓
          </div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#115e59', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
            Konkan Coast Patron
          </span>
          <h2 className="cafe-font-fancy" style={{ fontSize: '2rem', color: '#115e59', margin: '0 0 10px 0' }}>
            Welcome, {user.name}
          </h2>
          <p style={{ color: '#5c6c60', fontSize: '0.92rem', marginBottom: '24px' }}>
            Logged in as <strong style={{ color: '#115e59' }}>{user.email}</strong> • Role: <strong style={{ color: '#115e59' }}>{user.role}</strong>
          </p>

          <div style={{ background: '#f0fdfa', border: '1px dashed #115e59', borderRadius: '8px', padding: '16px', marginBottom: '25px', textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#115e59', lineHeight: 1.6 }}>
              ✓ Full access to Pier-Side Harbour Deck Reservations<br />
              ✓ Fast-Track Net-to-Plate Seafood Ordering & Checkout<br />
              ✓ Direct Beach & Pier Catering Event Inquiries
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="cafe-btn-teal"
              style={{ minWidth: '170px' }}
            >
              Continue to Deck →
            </button>
            <button
              onClick={logout}
              className="cafe-btn-orange"
              style={{ minWidth: '130px' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', background: '#faf7f2' }}>
      <div style={{ background: '#ffffff', border: '1px solid rgba(17,94,89,0.25)', borderRadius: '16px', maxWidth: '520px', width: '100%', overflow: 'hidden', boxShadow: '0 25px 60px rgba(17,94,89,0.08)', position: 'relative' }}>
        
        {/* Back Link */}
        <div style={{ padding: '20px 24px 0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => onNavigateBack && onNavigateBack('home')}
            style={{ background: 'transparent', border: 'none', color: '#115e59', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            ← Back to Harbour
          </button>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0f766e', fontWeight: 800 }}>
            Patron Gateway
          </span>
        </div>

        {/* Header Branding */}
        <div style={{ padding: '20px 28px 10px 28px', textAlign: 'center' }}>
          <span className="cafe-hero-tagline" style={{ marginBottom: '10px' }}>
            Coastal Dining Heritage
          </span>
          <h2 className="cafe-font-fancy" style={{ fontSize: '2rem', color: '#115e59', margin: '0 0 6px 0' }}>
            Konkan Coast
          </h2>
          <p style={{ color: '#5c6c60', fontSize: '0.88rem', margin: 0 }}>
            Sign in to book pier deck tables, place fresh seafood orders, and submit catering requests.
          </p>

          {/* Contextual Auth Reason Prompt */}
          {authReason && (
            <div style={{ marginTop: '16px', padding: '12px 16px', background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', color: '#92400e', fontSize: '0.82rem', textAlign: 'left' }}>
              <strong>Authentication Required:</strong> {authReason}
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', margin: '15px 28px 20px 28px' }}>
          <button
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            style={{
              flex: 1,
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'signin' ? '2.5px solid #115e59' : '2.5px solid transparent',
              color: activeTab === 'signin' ? '#115e59' : '#6b7280',
              fontWeight: 700,
              fontSize: '0.9rem',
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
              borderBottom: activeTab === 'register' ? '2.5px solid #115e59' : '2.5px solid transparent',
              color: activeTab === 'register' ? '#115e59' : '#6b7280',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form Container */}
        <div style={{ padding: '0 28px 28px 28px' }}>
          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {loginError && (
                <div style={{ padding: '10px 14px', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '6px', color: '#b91c1c', fontSize: '0.85rem' }}>
                  {loginError}
                </div>
              )}

              <div className="casual-form-group">
                <label className="casual-form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="casual-form-control"
                  placeholder="ananya.iyer@konkancoast.example"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="casual-form-group">
                <label className="casual-form-label">Password</label>
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
                disabled={loginLoading}
                className="casual-reservation-btn"
                style={{ marginTop: '6px' }}
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Patron Account'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {regError && (
                <div style={{ padding: '10px 14px', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '6px', color: '#b91c1c', fontSize: '0.85rem' }}>
                  {regError}
                </div>
              )}
              {regSuccess && (
                <div style={{ padding: '10px 14px', background: '#dcfce7', border: '1px solid #22c55e', borderRadius: '6px', color: '#15803d', fontSize: '0.85rem' }}>
                  {regSuccess}
                </div>
              )}

              <div className="casual-form-group">
                <label className="casual-form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="casual-form-control"
                  placeholder="Ravi Varma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div className="casual-form-group">
                <label className="casual-form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="casual-form-control"
                  placeholder="ravi@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="casual-form-group">
                <label className="casual-form-label">Create Password (min. 6 characters)</label>
                <input
                  type="password"
                  required
                  className="casual-form-control"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div className="casual-form-group">
                <label className="casual-form-label">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="casual-form-control"
                  placeholder="••••••••"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="casual-reservation-btn"
                style={{ marginTop: '8px' }}
              >
                {regLoading ? 'Registering Patron...' : 'Join Konkan Coast Patrons'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
