import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    }, 1500);
  };

  const handleSocial = (provider) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      alert(`[Demo Mode] ${provider} connection verified. Redirecting...`);
      navigate('/');
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#111111',
        color: '#FFFFFF',
        fontFamily: 'var(--font-mono, monospace)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem 1.5rem',
        position: 'relative'
      }}
    >
      {/* Top back link */}
      <div style={{ width: '100%', maxWidth: '460px', marginBottom: '1.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#9B9B9B',
            textDecoration: 'none',
            fontSize: '0.8rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#C8F169')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9B9B9B')}
        >
          <span>←</span>
          <span>Back to Vantage Home</span>
        </Link>
      </div>

      {/* Main Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#191919',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#C8F169', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            00 // CLIENT PORTAL
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '0.04em', margin: '0 0 0.5rem 0' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#9B9B9B', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
            Sign in to continue to your executive advisory workspace
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', border: '1px solid #C8F169', backgroundColor: 'rgba(200, 241, 105, 0.05)' }}>
            <div style={{ color: '#C8F169', fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#C8F169', marginBottom: '0.5rem' }}>
              ACCESS GRANTED
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#9B9B9B', margin: 0 }}>
              Connecting <strong>{email || 'Executive Member'}</strong> to secure advisory feed...
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Email */}
              <div>
                <label
                  htmlFor="vantage-email"
                  style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B', marginBottom: '0.4rem' }}
                >
                  Email Address
                </label>
                <input
                  id="vantage-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@vantage.com"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#FFFFFF',
                    fontFamily: 'inherit',
                    fontSize: '0.88rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#C8F169')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
                />
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label
                    htmlFor="vantage-password"
                    style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9B9B' }}
                  >
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset link sent to registered email.');
                    }}
                    style={{ fontSize: '0.72rem', color: '#9B9B9B', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C8F169')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9B9B9B')}
                  >
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    id="vantage-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: '100%',
                      padding: '0.85rem 2.8rem 0.85rem 1rem',
                      backgroundColor: '#111111',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      color: '#FFFFFF',
                      fontFamily: 'inherit',
                      fontSize: '0.88rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#C8F169')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.8rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#9B9B9B',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      letterSpacing: '0.05em'
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#9B9B9B' }}>
                <input
                  type="checkbox"
                  id="vantage-remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#C8F169', width: '14px', height: '14px' }}
                />
                <label htmlFor="vantage-remember" style={{ cursor: 'pointer' }}>
                  Remember session credentials
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#C8F169',
                  color: '#111111',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.2s ease',
                  marginTop: '0.5rem'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D8F78B')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C8F169')}
              >
                <span>Sign In</span>
                <span>↗</span>
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: '#666666', fontSize: '0.7rem' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <span>OR CONNECT WITH</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => handleSocial('Google')}
                disabled={socialLoading !== null}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  backgroundColor: '#111111',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222222')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111111')}
              >
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocial('GitHub')}
                disabled={socialLoading !== null}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  backgroundColor: '#111111',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222222')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111111')}
              >
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Register link */}
            <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.78rem', color: '#9B9B9B' }}>
              Don't have an account?{' '}
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Enterprise onboarding is invitation-only. Please contact Vantage advisory.');
                }}
                style={{ color: '#C8F169', textDecoration: 'none', fontWeight: 700 }}
              >
                Create Account
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
