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
      setLoginError('Please enter both email and password.');
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
      setRegSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate(redirectPath.startsWith('/') ? redirectPath : '/' + redirectPath);
      }, 1000);
    } else {
      setRegError(result.error || 'Registration failed.');
    }
  };

  if (isAuthenticated && user) {
    return (
      <section className="section-spacing bg-surface min-vh-100 d-flex align-items-center">
        <div className="container-xl py-5">
          <div className="max-w-600 mx-auto text-center p-5 bg-surface-subtle rounded-4 border border-dark-subtle shadow-lg">
            <div className="contact-info-icon mx-auto mb-3" style={{ width: 64, height: 64, fontSize: '1.75rem' }}>
              <i className="bi bi-person-check-fill text-accent"></i>
            </div>
            <div className="eyebrow center-eyebrow text-accent">AUTHENTICATED</div>
            <h2 className="font-heading text-primary fs-2 mb-2">Welcome, {user.name}</h2>
            <p className="text-muted-custom mb-1">{user.email}</p>
            <span className="badge bg-accent text-white px-3 py-1 mb-4">{user.role || 'Guest Member'}</span>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4">
              <Link to={redirectPath} className="btn-custom btn-primary-accent">
                <i className="bi bi-arrow-right-circle me-2"></i>
                <span>Continue to {redirectPath === '/' ? 'Home' : 'Requested Page'}</span>
              </Link>
              <button onClick={logout} className="btn-custom btn-outline-dark-custom">
                <i className="bi bi-box-arrow-right me-2"></i>
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
      {/* Page Hero Header */}
      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero-overlay"></div>
        <div className="container-xl page-hero-content text-center">
          <div className="eyebrow center-eyebrow text-accent">GUEST HOSPITALITY</div>
          <h1 className="page-hero-title">Member Sign In</h1>
          <p className="page-hero-subtitle max-w-600 mx-auto">
            Access protected table reservations, chef tasting bookings, and personalized dining experiences.
          </p>
        </div>
      </section>

      {/* Main Authentication Card */}
      <section className="section-spacing bg-surface pt-4">
        <div className="container-xl">
          <div className="max-w-600 mx-auto">
            
            {reason && (
              <div className="alert alert-dark border border-accent-subtle bg-surface-subtle text-bone p-3 mb-4 rounded-3 d-flex align-items-center gap-3">
                <i className="bi bi-shield-lock-fill text-accent fs-3"></i>
                <div className="small">
                  <strong>Authentication Required:</strong> {reason}
                </div>
              </div>
            )}

            <div className="p-4 p-md-5 bg-surface-subtle rounded-4 border border-dark-subtle shadow-lg">
              
              {/* Tab Navigation */}
              <div className="d-flex rounded-3 bg-dark-surface p-1 mb-4 border border-dark-subtle">
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setLoginError(''); setRegError(''); }}
                  className={`btn w-50 py-2 fw-medium transition-smooth ${
                    activeTab === 'signin' 
                      ? 'btn-primary-accent text-white shadow-sm' 
                      : 'text-muted-custom bg-transparent border-0'
                  }`}
                  style={{ borderRadius: '6px' }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setLoginError(''); setRegError(''); }}
                  className={`btn w-50 py-2 fw-medium transition-smooth ${
                    activeTab === 'register' 
                      ? 'btn-primary-accent text-white shadow-sm' 
                      : 'text-muted-custom bg-transparent border-0'
                  }`}
                  style={{ borderRadius: '6px' }}
                >
                  <i className="bi bi-person-plus me-2"></i> Create Account
                </button>
              </div>

              {/* SIGN IN FORM */}
              {activeTab === 'signin' && (
                <form onSubmit={handleLogin} className="form-light">
                  {loginError && (
                    <div className="alert alert-danger bg-danger-subtle text-danger border-0 p-3 mb-4 rounded-3 small d-flex align-items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label-custom">Email Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark-surface border-dark-subtle text-accent">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-custom border-start-0"
                        placeholder="yourname@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label-custom mb-1">Password *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark-surface border-dark-subtle text-accent">
                        <i className="bi bi-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-custom border-start-0"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-custom btn-primary-accent w-100 py-3 fs-6"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span> Authenticating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i> Sign In to Account
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* REGISTER FORM */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegister} className="form-light">
                  {regError && (
                    <div className="alert alert-danger bg-danger-subtle text-danger border-0 p-3 mb-4 rounded-3 small d-flex align-items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                      <span>{regError}</span>
                    </div>
                  )}

                  {regSuccess && (
                    <div className="alert alert-success bg-success-subtle text-success border-0 p-3 mb-4 rounded-3 small d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill fs-5"></i>
                      <span>{regSuccess}</span>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label-custom">Full Name *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark-surface border-dark-subtle text-accent">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-custom border-start-0"
                        placeholder="Rohan Varma"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label-custom">Email Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark-surface border-dark-subtle text-accent">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-custom border-start-0"
                        placeholder="rohan@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label-custom">Password *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark-surface border-dark-subtle text-accent">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-custom border-start-0"
                        placeholder="At least 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label-custom">Confirm Password *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark-surface border-dark-subtle text-accent">
                        <i className="bi bi-shield-check"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-custom border-start-0"
                        placeholder="Re-type your password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-custom btn-primary-accent w-100 py-3 fs-6 mb-3"
                    disabled={regLoading}
                  >
                    {regLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span> Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-check-fill me-2"></i> Complete Registration
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>

            {/* Back link */}
            <div className="text-center mt-4">
              <Link to="/" className="text-muted-custom small hover-accent text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i> Return to Ember & Olive Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
