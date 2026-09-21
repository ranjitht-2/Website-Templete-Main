import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ onNavigateBack, redirectTarget = '', authReason = '' }) {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'register'
  
  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('Gourmet Patron');

  // UI status
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      const user = await login(signInEmail, signInPassword);
      setSuccessMsg(`Welcome back, ${user.name}. Returning to dining room...`);
      setTimeout(() => {
        onNavigateBack(redirectTarget || 'hero');
      }, 700);
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setSubmitting(true);

    try {
      const user = await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        phone: regPhone
      });
      setSuccessMsg(`Patron account created for ${user.name}! Entering Lumière portal...`);
      setTimeout(() => {
        onNavigateBack(redirectTarget || 'hero');
      }, 700);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lumiere-signin-page">
      <div className="lumiere-signin-card">
        {/* Back Link */}
        <button 
          className="lumiere-signin-back-btn" 
          onClick={() => onNavigateBack(redirectTarget || 'hero')}
          data-cursor="BACK"
        >
          ← Return to Lumière Dining Room
        </button>

        {/* Brand Header */}
        <div className="lumiere-signin-header">
          <span className="section-label">
            <span className="accent-line"></span>PATRON REGISTRY
          </span>
          <h1 className="lumiere-signin-title">LUMIÈRE</h1>
          <p className="lumiere-signin-subtitle">
            East Coast Road · Kovalam · Chennai
          </p>
        </div>

        {/* Auth Reason Alert */}
        {authReason && (
          <div className="lumiere-auth-alert reason">
            <span>🛡️ {authReason}</span>
          </div>
        )}

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="lumiere-auth-alert error">
            <span>⚠️ {errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="lumiere-auth-alert success">
            <span>✓ {successMsg}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="lumiere-auth-tabs">
          <button
            type="button"
            className={`lumiere-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signin'); setErrorMsg(''); setSuccessMsg(''); }}
          >
            Sign In to Table Portal
          </button>
          <button
            type="button"
            className={`lumiere-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
          >
            Register Patron
          </button>
        </div>

        {/* Sign In Form */}
        {activeTab === 'signin' && (
          <form className="lumiere-auth-form" onSubmit={handleSignInSubmit}>
            <div className="lumiere-input-group">
              <label htmlFor="signin-email">Patron Email / Account</label>
              <input
                id="signin-email"
                type="email"
                required
                placeholder="patron@lumierechennai.com"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="lumiere-input"
              />
            </div>

            <div className="lumiere-input-group">
              <label htmlFor="signin-password">Secret Passcode</label>
              <input
                id="signin-password"
                type="password"
                required
                placeholder="••••••••••••"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="lumiere-input"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="lumiere-auth-submit-btn"
              data-cursor="SIGN IN"
            >
              {submitting ? 'AUTHENTICATING...' : 'ENTER TABLE PORTAL'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form className="lumiere-auth-form" onSubmit={handleRegisterSubmit}>
            <div className="lumiere-input-group">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                required
                placeholder="Maya Sundaram"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="lumiere-input"
              />
            </div>

            <div className="lumiere-input-group">
              <label htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                type="email"
                required
                placeholder="maya.sundaram@coastalharvest.in"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="lumiere-input"
              />
            </div>

            <div className="lumiere-input-group">
              <label htmlFor="reg-phone">Mobile / Contact</label>
              <input
                id="reg-phone"
                type="tel"
                placeholder="+91 98401 23456"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="lumiere-input"
              />
            </div>

            <div className="lumiere-input-group">
              <label htmlFor="reg-role">Patron Membership Tier</label>
              <select
                id="reg-role"
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="lumiere-input"
              >
                <option value="Gourmet Patron">Gourmet Patron</option>
                <option value="Tasting Flight Member">Tasting Flight Member</option>
                <option value="Private Dining Patron">Private Dining Patron</option>
                <option value="Sommelier Patron">Sommelier Patron</option>
              </select>
            </div>

            <div className="lumiere-input-group">
              <label htmlFor="reg-password">Create Passcode (6+ chars)</label>
              <input
                id="reg-password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••••••"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="lumiere-input"
              />
            </div>

            <div className="lumiere-input-group">
              <label htmlFor="reg-confirm-password">Confirm Passcode</label>
              <input
                id="reg-confirm-password"
                type="password"
                required
                placeholder="••••••••••••"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                className="lumiere-input"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="lumiere-auth-submit-btn"
              data-cursor="REGISTER"
            >
              {submitting ? 'REGISTERING PATRON...' : 'REGISTER PATRON ACCOUNT'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
