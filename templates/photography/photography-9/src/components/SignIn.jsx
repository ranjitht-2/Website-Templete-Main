import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ onNavigateBack, redirectTarget, authReason }) {
  const { login, register, isAuthenticated, user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  
  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register State
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
      setLoginError('Please enter both your email address and password.');
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
      setLoginError(result.error || 'Authentication failed. Please verify your credentials.');
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
      setRegError('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters in length.');
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
      setRegSuccess('Client account created successfully! Redirecting...');
      setTimeout(() => {
        if (onNavigateBack) {
          onNavigateBack(redirectTarget || 'home');
        }
      }, 900);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  // If already authenticated, show Client Portal Profile Card
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-[#FAFAFA]">
        <div className="bg-white border border-neutral-200/80 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center space-y-6 shadow-xl relative">
          
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-neutral-500 hover:text-[#1A1A1A] flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            <i className="fa-solid fa-arrow-left"></i> Return to Site
          </button>

          <div className="w-16 h-16 rounded-full bg-[#F4B8C8]/20 border border-[#F4B8C8]/40 flex items-center justify-center text-[#F4B8C8] text-2xl mx-auto mt-4 shadow-sm">
            <i className="fa-solid fa-camera"></i>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#F4B8C8] block">
              AUTHENTICATED CLIENT
            </span>
            <h2 className="text-3xl md:text-4xl text-[#1A1A1A] font-extrabold tracking-tight">
              {user.name}
            </h2>
            <p className="text-neutral-500 text-sm">{user.email}</p>
          </div>

          <div className="bg-[#FAFAFA] border border-neutral-100 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="flex justify-between items-center text-neutral-500">
              <span>Account Status</span>
              <span className="font-bold text-[#1A1A1A]">{user.role || 'Boutique Client'}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-500">
              <span>Client Session Portal</span>
              <span className="text-[#F4B8C8] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F4B8C8] animate-pulse"></span> Active
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#1A1A1A] hover:bg-[#F4B8C8] hover:text-[#1A1A1A] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer border-none"
            >
              Continue to Site
            </button>
            <button
              onClick={logout}
              className="py-3.5 px-6 rounded-full border border-neutral-300 hover:border-neutral-900 bg-transparent text-neutral-700 hover:text-neutral-900 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-24 bg-[#FAFAFA]">
      <div className="bg-white border border-neutral-200/80 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="bg-[#1A1A1A] p-8 text-center text-white relative">
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div className="w-12 h-12 rounded-full bg-[#F4B8C8] flex items-center justify-center text-white text-lg mx-auto mb-3 shadow-md">
            <i className="fa-solid fa-camera"></i>
          </div>
          <h2 className="text-2xl font-extrabold tracking-wider uppercase">Blush Lens</h2>
          <p className="text-[10px] text-[#F4B8C8] font-bold uppercase tracking-[0.25em] mt-1">Client Authentication</p>

          {authReason && (
            <div className="mt-4 bg-[#F4B8C8]/20 border border-[#F4B8C8]/40 text-white px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-left">
              <i className="fa-solid fa-lock text-[#F4B8C8] shrink-0"></i>
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-100 bg-neutral-50">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'signin'
                ? 'border-[#F4B8C8] text-[#1A1A1A] bg-white font-extrabold'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'border-[#F4B8C8] text-[#1A1A1A] bg-white font-extrabold'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="sarah@example.com" 
                  className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-[#F4B8C8] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-[#F4B8C8] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#F4B8C8] hover:text-[#1A1A1A] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none mt-2"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Blush Lens'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {regError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-check mt-0.5 shrink-0"></i>
                  <span>{regSuccess}</span>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Sarah Jenkins" 
                  className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-[#F4B8C8] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="sarah@example.com" 
                  className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-[#F4B8C8] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-[#F4B8C8] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Confirm Password</label>
                <input 
                  type="password" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat password" 
                  className="w-full bg-[#FAFAFA] border border-neutral-200 focus:border-[#F4B8C8] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={regLoading}
                className="w-full py-3.5 mt-2 bg-[#1A1A1A] hover:bg-[#F4B8C8] hover:text-[#1A1A1A] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none"
              >
                {regLoading ? 'Registering...' : 'Create Client Account'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
