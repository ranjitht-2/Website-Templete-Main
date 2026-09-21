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
      setRegSuccess('Royal Patron account created successfully! Redirecting...');
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
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#fcfaf2' }}>
        <div style={{ background: '#ffffff', border: '1.5px solid #d4af37', borderRadius: '6px', padding: '45px 35px', maxWidth: '540px', width: '100%', textAlign: 'center', boxShadow: '0 15px 45px rgba(34, 21, 17, 0.12)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#6b1124', color: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '2rem', border: '1.5px solid #d4af37' }}>
            👑
          </div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d4af37', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            AUTHENTICATED ROYAL PATRON
          </span>
          <h2 className="fastfood-font-impact" style={{ fontSize: '2rem', color: '#221511', margin: '0 0 10px 0' }}>
            {user.name}
          </h2>
          <p style={{ color: '#5c4e48', fontSize: '0.95rem', margin: '0 0 25px 0' }}>
            {user.email} • <strong style={{ color: '#6b1124' }}>{user.role}</strong>
          </p>

          <div style={{ background: '#fdfbf7', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '16px', borderRadius: '4px', marginBottom: '30px', textAlign: 'left', fontSize: '0.85rem' }}>
            <div style={{ color: '#221511', fontWeight: 700, marginBottom: '6px' }}>✨ Patron Privileges Active:</div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#5c4e48', lineHeight: 1.7 }}>
              <li>Instant Table Reservation without security deposits</li>
              <li>Direct Kitchen Online Ordering & Live Dispatch</li>
              <li>Priority Diwali Banquets & Royal Corporate Concierge</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="fastfood-btn-red"
              style={{ padding: '12px 28px', fontSize: '0.85rem' }}
            >
              Continue to Dining
            </button>
            <button
              onClick={logout}
              style={{ background: 'transparent', border: '1px solid #6b1124', color: '#6b1124', padding: '12px 24px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '1px' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#fcfaf2' }}>
      <div style={{ maxWidth: '540px', width: '100%', background: '#ffffff', border: '1.5px solid #d4af37', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(34, 21, 17, 0.12)' }}>
        
        {/* Header Banner */}
        <div style={{ background: '#221511', padding: '30px', textAlign: 'center', borderBottom: '2px solid #d4af37' }}>
          <span style={{ color: '#d4af37', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
            The Royal Tandoor
          </span>
          <h1 className="fastfood-font-impact" style={{ color: '#ffffff', fontSize: '1.9rem', margin: 0 }}>
            Patron Authentication
          </h1>
          {authReason && (
            <div style={{ background: 'rgba(212, 175, 55, 0.15)', border: '1px solid #d4af37', color: '#f5e6be', padding: '8px 12px', fontSize: '0.8rem', marginTop: '15px', borderRadius: '2px' }}>
              🔒 {authReason}
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(212, 175, 55, 0.25)', background: '#fdfbf7' }}>
          <button
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            style={{
              flex: 1,
              padding: '16px',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '1px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'signin' ? '#ffffff' : 'transparent',
              color: activeTab === 'signin' ? '#6b1124' : '#78716c',
              borderBottom: activeTab === 'signin' ? '2.5px solid #d4af37' : 'none'
            }}
          >
            ROYAL SIGN IN
          </button>
          <button
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            style={{
              flex: 1,
              padding: '16px',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '1px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'register' ? '#ffffff' : 'transparent',
              color: activeTab === 'register' ? '#6b1124' : '#78716c',
              borderBottom: activeTab === 'register' ? '2.5px solid #d4af37' : 'none'
            }}
          >
            NEW REGISTRATION
          </button>
        </div>

        {/* Form Container */}
        <div style={{ padding: '35px 30px' }}>
          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px', fontSize: '0.85rem', marginBottom: '20px', borderRadius: '4px' }}>
                  ⚠️ {loginError}
                </div>
              )}

              <div className="fastfood-form-group">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b1124' }}>Registered Email Address</span>
                <input
                  type="email"
                  required
                  className="fastfood-form-control"
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="fastfood-form-group">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b1124' }}>Secure Password</span>
                <input
                  type="password"
                  required
                  className="fastfood-form-control"
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="fastfood-btn-red"
                style={{ width: '100%', marginTop: '10px', padding: '14px', opacity: loginLoading ? 0.7 : 1 }}
              >
                {loginLoading ? 'VERIFYING CREDENTIALS...' : 'SIGN IN TO ROYAL COURT'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              {regError && (
                <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px', fontSize: '0.85rem', marginBottom: '20px', borderRadius: '4px' }}>
                  ⚠️ {regError}
                </div>
              )}
              {regSuccess && (
                <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#166534', padding: '12px', fontSize: '0.85rem', marginBottom: '20px', borderRadius: '4px' }}>
                  ✓ {regSuccess}
                </div>
              )}

              <div className="fastfood-form-group">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b1124' }}>Full Patron Name</span>
                <input
                  type="text"
                  required
                  className="fastfood-form-control"
                  placeholder="e.g. Vikramaditya Rao"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div className="fastfood-form-group">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b1124' }}>Email Address</span>
                <input
                  type="email"
                  required
                  className="fastfood-form-control"
                  placeholder="vikram@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="fastfood-form-group">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b1124' }}>Password (min 6 chars)</span>
                <input
                  type="password"
                  required
                  className="fastfood-form-control"
                  placeholder="Create a strong password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div className="fastfood-form-group">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b1124' }}>Confirm Password</span>
                <input
                  type="password"
                  required
                  className="fastfood-form-control"
                  placeholder="Re-enter password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="fastfood-btn-red"
                style={{ width: '100%', marginTop: '10px', padding: '14px', opacity: regLoading ? 0.7 : 1 }}
              >
                {regLoading ? 'REGISTERING PATRON...' : 'CREATE ROYAL PATRON ACCOUNT'}
              </button>
            </form>
          )}

          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              style={{ background: 'transparent', border: 'none', color: '#78716c', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}
            >
              ← Return to Restaurant Sanctuary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
