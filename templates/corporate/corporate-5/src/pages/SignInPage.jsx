import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../data/corporateData';

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      alert(`[Demo Mode] Connected via ${provider}. Redirecting to system portal...`);
      navigate('/');
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--c-ivory, #F5F1E8)',
        color: 'var(--c-charcoal, #17221B)',
        padding: '120px 24px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Back to Home Link */}
      <div style={{ width: '100%', maxWidth: '440px', marginBottom: '1.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--c-eucalyptus, #3D4F44)',
            textDecoration: 'none'
          }}
        >
          <span>← Back to {BRAND.name}</span>
        </Link>
      </div>

      {/* Main Authentication Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-light, #D4CEBF)',
          padding: '2.5rem 2rem',
          boxShadow: '0 16px 36px rgba(23, 34, 27, 0.06)'
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '8px' }}>
            <span className="meta-tag-copper">00 / ACCESS GATEWAY</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: '2rem',
              fontWeight: 400,
              color: 'var(--c-charcoal, #17221B)',
              margin: '0.4rem 0 0.5rem 0'
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--c-eucalyptus, #3D4F44)',
              margin: 0,
              lineHeight: 1.5
            }}
          >
            Sign in to continue to your Axiom Systems control panel.
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(184, 92, 56, 0.1)',
                marginBottom: '1rem'
              }}
            >
              <CheckCircle2 size={30} color="var(--c-copper, #B85C38)" />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                color: 'var(--c-charcoal)',
                marginBottom: '0.5rem'
              }}
            >
              Gateway Authenticated
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--c-eucalyptus)' }}>
              Establishing telemetry tunnel for <strong>{email || 'Authorized User'}</strong>...
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="axiom-email"
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--c-charcoal)',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--c-eucalyptus)'
                    }}
                  />
                  <input
                    id="axiom-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sysadmin@organization.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      backgroundColor: 'var(--c-ivory-surface, #FAF8F5)',
                      border: '1px solid var(--border-light, #D4CEBF)',
                      fontSize: '14px',
                      color: 'var(--c-charcoal)',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label
                    htmlFor="axiom-password"
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--c-charcoal)',
                      fontWeight: 600
                    }}
                  >
                    Password
                  </label>
                  <a
                    href="#reset"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Access recovery instructions dispatched to authorized system address.');
                    }}
                    style={{
                      fontSize: '11px',
                      color: 'var(--c-copper, #B85C38)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--c-eucalyptus)'
                    }}
                  />
                  <input
                    id="axiom-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: '100%',
                      padding: '12px 42px 12px 42px',
                      backgroundColor: 'var(--c-ivory-surface, #FAF8F5)',
                      border: '1px solid var(--border-light, #D4CEBF)',
                      fontSize: '14px',
                      color: 'var(--c-charcoal)',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--c-eucalyptus)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--c-eucalyptus)' }}>
                <input
                  type="checkbox"
                  id="axiom-remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--c-copper)', width: '15px', height: '15px' }}
                />
                <label htmlFor="axiom-remember" style={{ cursor: 'pointer' }}>
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-copper-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px 20px',
                  fontSize: '12px',
                  marginTop: '0.5rem'
                }}
              >
                <span>Sign In</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {/* OR Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '1.5rem 0',
                color: 'var(--c-stone, #D0CAC0)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
              <span>OR CONNECT WITH</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleSocial('Google')}
                disabled={socialLoading !== null}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light, #D4CEBF)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  color: 'var(--c-charcoal)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocial('GitHub')}
                disabled={socialLoading !== null}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light, #D4CEBF)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  color: 'var(--c-charcoal)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Create Account link */}
            <div
              style={{
                textAlign: 'center',
                marginTop: '1.75rem',
                fontSize: '12px',
                color: 'var(--c-eucalyptus)'
              }}
            >
              Don't have an account?{' '}
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Enterprise provisioning is managed via SLA contracts. Please contact sales.');
                }}
                style={{
                  color: 'var(--c-copper, #B85C38)',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
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
