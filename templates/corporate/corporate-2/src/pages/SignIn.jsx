import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from '../components/Icons';
import { BRAND } from '../data/content';

function MailIcon({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );
}

function LockIcon({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

function CheckCircleIcon({ size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function EyeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function EyeOffIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
      <line x1="2" x2="22" y1="2" y2="22"></line>
    </svg>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const userName = email.split('@')[0];
    localStorage.setItem('corporate_user', JSON.stringify({ email, name: userName }));
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  const handleSocial = (provider) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 700);
  };

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height, 80px) + 3rem)', paddingBottom: '5rem', minHeight: '100vh', backgroundColor: 'var(--bg-sand, #F7F5F0)' }}>
      <div className="container" style={{ maxWidth: '480px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Back Link */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted, #71717A)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
            <ArrowLeft size={16} />
            <span>Back to {BRAND.name || 'Home'}</span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-subtle, rgba(18, 19, 22, 0.12))',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted, #71717A)', marginBottom: '0.5rem' }}>
              ADVISORY CLIENT ACCESS
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif, "Playfair Display", serif)', fontSize: '2rem', fontWeight: 400, color: 'var(--text-charcoal, #121316)', margin: '0 0 0.5rem 0' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-muted, #71717A)', fontSize: '0.88rem', margin: 0 }}>
              Sign in to continue to your advisory workspace
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(18, 19, 22, 0.06)', marginBottom: '1rem' }}>
                <CheckCircleIcon size={32} color="var(--text-charcoal, #121316)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-charcoal)', marginBottom: '0.5rem' }}>
                Access Verified
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Connecting <strong>{email || 'Executive Member'}</strong> to your advisory workspace...
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Email */}
                <div>
                  <label htmlFor="strata-email" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MailIcon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      id="strata-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="advisory@strata-partners.com"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.6rem',
                        border: '1px solid #E4E4E7',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        outline: 'none',
                        color: '#121316',
                        backgroundColor: '#FAFAFA'
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label htmlFor="strata-password" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-charcoal)' }}>
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Password reset instructions have been forwarded to your registered email.');
                      }}
                      style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <LockIcon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      id="strata-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{
                        width: '100%',
                        padding: '0.85rem 2.6rem 0.85rem 2.6rem',
                        border: '1px solid #E4E4E7',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        outline: 'none',
                        color: '#121316',
                        backgroundColor: '#FAFAFA'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <input
                    type="checkbox"
                    id="strata-remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#121316', width: '15px', height: '15px' }}
                  />
                  <label htmlFor="strata-remember" style={{ cursor: 'pointer' }}>
                    Remember this device for 30 days
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-editorial-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.9rem 1rem', fontSize: '0.88rem', marginTop: '0.5rem' }}
                >
                  <span>Sign In</span>
                  <ArrowUpRight size={14} />
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: '#A1A1AA', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E4E4E7' }} />
                <span>OR</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E4E4E7' }} />
              </div>

              {/* Social Login Placeholders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={() => handleSocial('Google')}
                  disabled={socialLoading !== null}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E4E4E7',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#121316',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                    <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 11.5 0 14s.6 4.8 1.6 6.8l3.7-3.1z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.2-6.7-5.3L1.6 16.1C3.5 19.9 7.4 23 12 23z" />
                  </svg>
                  <span>{socialLoading === 'Google' ? 'Authenticating...' : 'Continue with Google'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocial('GitHub')}
                  disabled={socialLoading !== null}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E4E4E7',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#121316',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>{socialLoading === 'GitHub' ? 'Authenticating...' : 'Continue with GitHub'}</span>
                </button>
              </div>

              {/* Create Account Link */}
              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>Don't have an advisory account? </span>
                <Link to="/contact" style={{ color: 'var(--text-charcoal)', fontWeight: 600, textDecoration: 'none' }}>
                  Create Account
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
