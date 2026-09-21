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
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setRegSuccess('Royal Patron account created successfully! Redirecting...');
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
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#faf6f0' }}>
        <div style={{ background: '#ffffff', border: '1.5px solid #d4af37', borderRadius: '8px', padding: '45px 35px', maxWidth: '540px', width: '100%', textAlign: 'center', boxShadow: '0 15px 45px rgba(45, 27, 17, 0.12)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#7c1524', color: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '2rem', border: '1.5px solid #d4af37' }}>
            👑
          </div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d4af37', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
            AUTHENTICATED ROYAL PATRON
          </span>
          <h2 className="seafood-font-accent" style={{ fontSize: '2rem', color: '#7c1524', margin: '0 0 10px 0' }}>
            {user.name}
          </h2>
          <p style={{ color: '#6c5445', fontSize: '0.95rem', margin: '0 0 25px 0' }}>
            {user.email} • <strong style={{ color: '#7c1524' }}>{user.role}</strong>
          </p>

          <div style={{ background: '#faf6f0', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '18px', borderRadius: '6px', marginBottom: '30px', textAlign: 'left', fontSize: '0.85rem' }}>
            <div style={{ color: '#7c1524', fontWeight: 800, marginBottom: '8px' }}>✨ Patron Privileges Active:</div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c5445', lineHeight: 1.8 }}>
              <li>Direct Heritage Courtyard Seating Reservation</li>
              <li>Instant Palace Delivery & Takeaway Order Confirmation</li>
              <li>Priority Teej & Wedding Catering Consultation Access</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="seafood-btn-accent"
              style={{ padding: '12px 28px', fontSize: '0.85rem' }}
            >
              Continue to Dining
            </button>
            <button
              onClick={logout}
              style={{ background: 'transparent', border: '1.5px solid #7c1524', color: '#7c1524', padding: '12px 24px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '1px', borderRadius: '2px' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#faf6f0' }}>
      <div style={{ maxWidth: '520px', width: '100%', background: '#ffffff', border: '1.5px solid #d4af37', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(45, 27, 17, 0.12)' }}>
        
        {/* Header Banner */}
        <div style={{ background: '#7c1524', padding: '30px', textAlign: 'center', borderBottom: '2px solid #d4af37' }}>
          <span style={{ color: '#d4af37', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 800 }}>
            Rang Mahal Heritage Dining
          </span>
          <h1 className="seafood-font-accent" style={{ color: '#ffffff', fontSize: '1.9rem', margin: 0 }}>
            Patron Authentication
          </h1>
          {authReason && (
            <div style={{ background: 'rgba(212, 175, 55, 0.2)', border: '1px solid #d4af37', color: '#fef3c7', padding: '8px 12px', fontSize: '0.82rem', marginTop: '15px', borderRadius: '4px' }}>
              🔒 {authReason}
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(212, 175, 55, 0.25)', background: '#fdfbf7' }}>
          <button
            onClick={() => setActiveTab('signin')}
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              background: activeTab === 'signin' ? '#ffffff' : 'transparent',
              borderBottom: activeTab === 'signin' ? '3px solid #7c1524' : '3px solid transparent',
              color: activeTab === 'signin' ? '#7c1524' : '#8c766b',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '1px'
            }}
          >
            SIGN IN
          </button>
          <button
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              background: activeTab === 'register' ? '#ffffff' : 'transparent',
              borderBottom: activeTab === 'register' ? '3px solid #7c1524' : '3px solid transparent',
              color: activeTab === 'register' ? '#7c1524' : '#8c766b',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '1px'
            }}
          >
            REGISTER PATRON
          </button>
        </div>

        {/* Body Container */}
        <div style={{ padding: '32px' }}>
          
          {/* Sign In Tab */}
          {activeTab === 'signin' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {loginError && (
                <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#991b1b', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ⚠️ {loginError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#7c1524', letterSpacing: '1px' }}>
                  Patron Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="arjun.sharma@example.com"
                  className="seafood-form-control"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#7c1524', letterSpacing: '1px' }}>
                  Security Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="seafood-form-control"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="seafood-btn-accent"
                style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '0.9rem' }}
              >
                {loginLoading ? 'Authenticating Palace Credentials...' : 'SIGN IN AS PATRON'}
              </button>
            </form>
          )}

          {/* Register Tab */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {regError && (
                <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#991b1b', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ⚠️ {regError}
                </div>
              )}
              {regSuccess && (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✅ {regSuccess}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#7c1524', letterSpacing: '1px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rajesh Varma"
                  className="seafood-form-control"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#7c1524', letterSpacing: '1px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="rajesh.varma@example.com"
                  className="seafood-form-control"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#7c1524', letterSpacing: '1px' }}>
                  Create Security Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  className="seafood-form-control"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#7c1524', letterSpacing: '1px' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat your password"
                  className="seafood-form-control"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="seafood-btn-accent"
                style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '0.9rem' }}
              >
                {regLoading ? 'Registering Patron...' : 'CREATE PALACE ACCOUNT'}
              </button>
            </form>
          )}

          {/* Back to Home Link */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => onNavigateBack && onNavigateBack('home')}
              style={{ background: 'transparent', border: 'none', color: '#7c1524', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'underline' }}
            >
              ← Back to Rang Mahal Dining
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
