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
      setRegSuccess('Patron account created successfully! Redirecting...');
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
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#faf9f6' }}>
        <div style={{ background: '#ffffff', border: '1px solid #d45b27', borderRadius: '8px', padding: '45px 35px', maxWidth: '540px', width: '100%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#faf9f6', color: '#d45b27', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '2rem', border: '1px solid #d45b27' }}>
            ✨
          </div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d45b27', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
            AUTHENTICATED ATELIER PATRON
          </span>
          <h2 className="fine-font-serif" style={{ fontSize: '2rem', color: '#1c1c1c', margin: '0 0 10px 0' }}>
            {user.name}
          </h2>
          <p style={{ color: '#666', fontSize: '0.95rem', margin: '0 0 25px 0' }}>
            {user.email} • <strong style={{ color: '#d45b27' }}>{user.role}</strong>
          </p>

          <div style={{ background: '#faf9f6', border: '1px solid rgba(212, 91, 39, 0.2)', padding: '18px', borderRadius: '6px', marginBottom: '30px', textAlign: 'left', fontSize: '0.85rem' }}>
            <div style={{ color: '#d45b27', fontWeight: 800, marginBottom: '8px' }}>✨ Patron Privileges Active:</div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#555', lineHeight: 1.8 }}>
              <li>Direct Gastronomy Counter & Chef Table Reservation</li>
              <li>Priority Online Takeaway Order Dispatch & Processing</li>
              <li>Exclusive Fusion Catering & Diwali Private Dinner Bookings</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="fine-btn-gold"
              style={{ padding: '12px 28px', fontSize: '0.85rem' }}
            >
              Continue to Dining
            </button>
            <button
              onClick={logout}
              className="fine-btn-outline"
              style={{ padding: '12px 24px', fontSize: '0.85rem' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#faf9f6' }}>
      <div style={{ maxWidth: '520px', width: '100%', background: '#ffffff', border: '1px solid #e5e5e0', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)' }}>
        
        {/* Header Banner */}
        <div style={{ background: '#1c1c1c', padding: '30px', textAlign: 'center', borderBottom: '2px solid #d45b27' }}>
          <span style={{ color: '#d45b27', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 800 }}>
            Masala Atelier Dining
          </span>
          <h1 className="fine-font-serif" style={{ color: '#ffffff', fontSize: '1.9rem', margin: 0 }}>
            Patron Authentication
          </h1>
          {authReason && (
            <div style={{ background: 'rgba(212, 91, 39, 0.15)', border: '1px solid #d45b27', color: '#ffedd5', padding: '8px 12px', fontSize: '0.82rem', marginTop: '15px', borderRadius: '4px' }}>
              🔒 {authReason}
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e0', background: '#faf9f6' }}>
          <button
            onClick={() => { setActiveTab('signin'); setLoginError(''); setRegError(''); }}
            style={{
              flex: 1,
              padding: '14px',
              background: activeTab === 'signin' ? '#ffffff' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'signin' ? '2px solid #d45b27' : 'none',
              color: activeTab === 'signin' ? '#d45b27' : '#666',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('register'); setLoginError(''); setRegError(''); }}
            style={{
              flex: 1,
              padding: '14px',
              background: activeTab === 'register' ? '#ffffff' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'register' ? '2px solid #d45b27' : 'none',
              color: activeTab === 'register' ? '#d45b27' : '#666',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '35px 30px' }}>
          
          {/* SIGN IN TAB */}
          {activeTab === 'signin' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {loginError && (
                <div style={{ background: '#fee2e2', border: '1px solid #ef4444', color: '#b91c1c', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ⚠️ {loginError}
                </div>
              )}

              <div className="fine-form-group">
                <span className="fine-form-label">Patron Email Address</span>
                <input
                  type="email"
                  required
                  placeholder="patron@example.com"
                  className="fine-form-control"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="fine-form-group">
                <span className="fine-form-label">Account Password</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="fine-form-control"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="fine-btn-gold"
                style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '0.9rem' }}
              >
                {loginLoading ? 'Authenticating...' : 'Sign In as Atelier Patron'}
              </button>
            </form>
          )}

          {/* REGISTER TAB */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {regError && (
                <div style={{ background: '#fee2e2', border: '1px solid #ef4444', color: '#b91c1c', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ⚠️ {regError}
                </div>
              )}

              {regSuccess && (
                <div style={{ background: '#dcfce7', border: '1px solid #22c55e', color: '#15803d', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✅ {regSuccess}
                </div>
              )}

              <div className="fine-form-group">
                <span className="fine-form-label">Full Name</span>
                <input
                  type="text"
                  required
                  placeholder="Vikram Sethi"
                  className="fine-form-control"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div className="fine-form-group">
                <span className="fine-form-label">Email Address</span>
                <input
                  type="email"
                  required
                  placeholder="vikram@example.com"
                  className="fine-form-control"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="fine-form-group">
                <span className="fine-form-label">Password (Min 6 Characters)</span>
                <input
                  type="password"
                  required
                  placeholder="Create secure password"
                  className="fine-form-control"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <div className="fine-form-group">
                <span className="fine-form-label">Confirm Password</span>
                <input
                  type="password"
                  required
                  placeholder="Repeat secure password"
                  className="fine-form-control"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="fine-btn-gold"
                style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '0.9rem' }}
              >
                {regLoading ? 'Creating Account...' : 'Register Atelier Account'}
              </button>
            </form>
          )}

          {/* Back to Home Button */}
          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              style={{ background: 'transparent', border: 'none', color: '#666', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              ← Back to Masala Atelier Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
