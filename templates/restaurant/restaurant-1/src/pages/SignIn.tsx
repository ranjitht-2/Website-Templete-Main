import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const SignIn: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user, logout } = useAuth();

  const redirectPath = searchParams.get('redirect') || '/';
  const reason = searchParams.get('reason');

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Please provide your email and password.');
      return;
    }

    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (result.success) {
      navigate(redirectPath.startsWith('/') ? redirectPath : '/' + redirectPath);
    } else {
      setLoginError(result.error || 'Authentication failed.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
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
      setRegSuccess('Member account created successfully! Redirecting...');
      setTimeout(() => {
        navigate(redirectPath.startsWith('/') ? redirectPath : '/' + redirectPath);
      }, 1000);
    } else {
      setRegError(result.error || 'Registration failed.');
    }
  };

  if (isAuthenticated && user) {
    return (
      <section className="section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '10rem' }}>
        <div className="container">
          <div className="card shadow-lg p-5 mx-auto text-center" style={{ maxWidth: '580px', backgroundColor: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '16px' }}>
            <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--burgundy)', color: 'white', fontSize: '1.5rem' }}>
              <i className="bi bi-person-check-fill"></i>
            </div>
            <span className="eyebrow text-accent mb-2">EMBER HOUSE MEMBER</span>
            <h2 className="font-heading display-4 mb-2">Welcome, {user.name}</h2>
            <p className="text-muted-custom mb-2">{user.email}</p>
            <span className="badge mx-auto px-3 py-2 mb-4" style={{ backgroundColor: 'var(--clay)', color: 'white', letterSpacing: '1px', fontSize: '0.75rem' }}>
              {user.role || 'Patron Member'}
            </span>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-3">
              <Link to={redirectPath} className="btn-ember-primary py-3 px-4">
                <span>Continue to {redirectPath === '/' ? 'Home' : 'Requested Chapter'}</span>
              </Link>
              <button onClick={logout} className="btn-ember-outline py-3 px-4">
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Editorial Header */}
      <section className="intro-section" style={{ paddingTop: '12rem', paddingBottom: '3rem' }}>
        <div className="container text-center">
          <span className="eyebrow-chapter">GUEST ACCESS &bull; SIGN IN</span>
          <h1 className="font-heading display-2 mb-3">The Hearth Journal</h1>
          <p className="intro-paragraph mx-auto" style={{ maxWidth: '600px' }}>
            Access exclusive chef table reservations, private mezzanine buyout bookings, and personalized dining experiences.
          </p>
        </div>
      </section>

      {/* Main Authentication Card */}
      <section className="section-py pt-2" style={{ minHeight: '60vh' }}>
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: '540px' }}>
            
            {reason && (
              <div className="p-3 mb-4 rounded-3 d-flex align-items-center gap-3" style={{ background: '#FAF0E8', border: '1px solid var(--clay)', color: 'var(--burgundy)' }}>
                <i className="bi bi-shield-lock-fill fs-3 text-clay"></i>
                <div className="small">
                  <strong>Authentication Required:</strong> {reason}
                </div>
              </div>
            )}

            <div className="card shadow-lg p-4 p-md-5" style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '16px' }}>
              
              {/* Tab Selector */}
              <div className="d-flex rounded-3 p-1 mb-4" style={{ backgroundColor: 'var(--ivory)', border: '1px solid var(--border)' }}>
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setLoginError(''); setRegError(''); }}
                  className="btn w-50 py-2 fw-semibold"
                  style={{
                    borderRadius: '6px',
                    backgroundColor: activeTab === 'signin' ? 'var(--burgundy)' : 'transparent',
                    color: activeTab === 'signin' ? 'white' : 'var(--ink)',
                    transition: 'all 0.3s ease',
                    border: 'none'
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setLoginError(''); setRegError(''); }}
                  className="btn w-50 py-2 fw-semibold"
                  style={{
                    borderRadius: '6px',
                    backgroundColor: activeTab === 'register' ? 'var(--burgundy)' : 'transparent',
                    color: activeTab === 'register' ? 'white' : 'var(--ink)',
                    transition: 'all 0.3s ease',
                    border: 'none'
                  }}
                >
                  <i className="bi bi-person-plus me-1"></i> Create Account
                </button>
              </div>

              {/* SIGN IN FORM */}
              {activeTab === 'signin' && (
                <form onSubmit={handleLogin}>
                  {loginError && (
                    <div className="alert alert-danger p-3 mb-4 rounded-3 small d-flex align-items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label text-uppercase fw-bold text-muted-custom" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Email Address *</label>
                    <input
                      type="email"
                      className="form-control py-3 px-3"
                      style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}
                      placeholder="kavita@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-uppercase fw-bold text-muted-custom mb-1" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Password *</label>
                    <input
                      type="password"
                      className="form-control py-3 px-3"
                      style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-ember-primary w-100 py-3 fs-6"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span> Authenticating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i> Sign In to Member Hearth
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* REGISTER FORM */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegister}>
                  {regError && (
                    <div className="alert alert-danger p-3 mb-4 rounded-3 small d-flex align-items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                      <span>{regError}</span>
                    </div>
                  )}
                  {regSuccess && (
                    <div className="alert alert-success p-3 mb-4 rounded-3 small d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill fs-5"></i>
                      <span>{regSuccess}</span>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label text-uppercase fw-bold text-muted-custom" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Full Name *</label>
                    <input
                      type="text"
                      className="form-control py-3 px-3"
                      style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}
                      placeholder="Devika Sundaram"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-uppercase fw-bold text-muted-custom" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Email Address *</label>
                    <input
                      type="email"
                      className="form-control py-3 px-3"
                      style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}
                      placeholder="devika@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-uppercase fw-bold text-muted-custom" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Password *</label>
                    <input
                      type="password"
                      className="form-control py-3 px-3"
                      style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}
                      placeholder="At least 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-uppercase fw-bold text-muted-custom" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Confirm Password *</label>
                    <input
                      type="password"
                      className="form-control py-3 px-3"
                      style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '8px' }}
                      placeholder="Re-type password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-ember-primary w-100 py-3 fs-6 mb-3"
                    disabled={regLoading}
                  >
                    {regLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span> Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-check-fill me-2"></i> Register as Ember House Member
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>

            <div className="text-center mt-4">
              <Link to="/" className="text-muted-custom small text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i> Return to Ember House Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
