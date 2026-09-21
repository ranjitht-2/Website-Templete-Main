import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Lock, Mail, Eye, EyeOff, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import './SignIn.css';

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

  const handleSocialSignIn = (provider) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 800);
  };

  return (
    <div className="nexora-signin-page">
      {/* Background Lighting matching Nexora */}
      <div className="signin-bg-canvas">
        <div className="signin-radial-glow glow-1" />
        <div className="signin-radial-glow glow-2" />
        <div className="signin-fine-grid" />
      </div>

      <div className="container signin-container">
        {/* Back navigation */}
        <div className="signin-back-nav">
          <Link to="/" className="signin-back-link">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="signin-card-wrapper">
          <div className="signin-card">
            {/* Header / Brand */}
            <div className="signin-header">
              <div className="signin-brand-symbol">
                <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
                  <path d="M14 2L26 8.5V21.5L14 28L2 21.5V8.5L14 2Z" stroke="#C8A96B" strokeWidth="1.75" />
                  <path d="M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z" fill="#C8A96B" fillOpacity="0.18" stroke="#E2C98D" strokeWidth="1.2" />
                  <circle cx="14" cy="15" r="2.5" fill="#E2C98D" />
                </svg>
              </div>
              <h1 className="signin-title">Welcome Back</h1>
              <p className="signin-subtitle">Sign in to continue to your NEXORA enterprise environment</p>
            </div>

            {submitted ? (
              <div className="signin-success-state">
                <div className="signin-success-icon">
                  <CheckCircle2 size={40} color="#C8A96B" />
                </div>
                <h3>Authentication Verified</h3>
                <p>Welcome, <strong style={{ color: '#E2C98D' }}>{email || 'Executive Member'}</strong>. Redirecting to your workspace...</p>
              </div>
            ) : (
              <>
                <form className="signin-form" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="signin-field-group">
                    <label htmlFor="nexora-email" className="signin-label">
                      Email Address
                    </label>
                    <div className="signin-input-wrapper">
                      <Mail size={18} className="signin-field-icon" />
                      <input
                        id="nexora-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="executive@nexora.com"
                        className="signin-input"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="signin-field-group">
                    <div className="signin-password-header">
                      <label htmlFor="nexora-password" className="signin-label">
                        Password
                      </label>
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Reset instructions have been dispatched to your corporate security administrator.');
                        }}
                        className="signin-forgot-link"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="signin-input-wrapper">
                      <Lock size={18} className="signin-field-icon" />
                      <input
                        id="nexora-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="signin-input signin-input-pw"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="signin-pw-toggle"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="signin-options-row">
                    <label className="signin-checkbox-label">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="signin-checkbox"
                      />
                      <span>Remember me</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary btn-lg signin-submit-btn">
                    <span>Sign In</span>
                    <ArrowUpRight size={18} className="btn-arrow" />
                  </button>
                </form>

                {/* Social Auth Separator */}
                <div className="signin-divider">
                  <span>OR</span>
                </div>

                {/* Social Login Buttons (Clean Frontend Placeholders) */}
                <div className="signin-social-stack">
                  <button
                    type="button"
                    className="signin-social-btn"
                    onClick={() => handleSocialSignIn('Google')}
                    disabled={socialLoading !== null}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z" />
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                      <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 11.5 0 14s.6 4.8 1.6 6.8l3.7-3.1z" />
                      <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.2-6.7-5.3L1.6 16.1C3.5 19.9 7.4 23 12 23z" />
                    </svg>
                    <span>{socialLoading === 'Google' ? 'Connecting...' : 'Continue with Google'}</span>
                  </button>

                  <button
                    type="button"
                    className="signin-social-btn"
                    onClick={() => handleSocialSignIn('GitHub')}
                    disabled={socialLoading !== null}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>{socialLoading === 'GitHub' ? 'Connecting...' : 'Continue with GitHub'}</span>
                  </button>
                </div>

                {/* Footer Switch */}
                <div className="signin-footer-text">
                  <span>Don't have an account? </span>
                  <Link to="/contact" className="signin-create-link">
                    Create Account
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Enterprise Trust Note */}
          <div className="signin-trust-note">
            <ShieldCheck size={16} color="#C8A96B" />
            <span>Protected by NEXORA Enterprise Zero-Trust Security Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
