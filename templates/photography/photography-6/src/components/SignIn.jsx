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
      setRegError('Please provide your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please provide a valid email address.');
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
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-[#0a0a0a]">
        <div className="bg-[#121212] border border-white/10 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center space-y-6 shadow-2xl relative">
          
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-stone-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            <i className="fa-solid fa-arrow-left"></i> Return to Site
          </button>

          <div className="w-16 h-16 rounded-full bg-[#ff4a3b]/20 border border-[#ff4a3b]/40 flex items-center justify-center text-[#ff4a3b] text-2xl mx-auto mt-4 shadow-sm font-black tracking-widest font-sans">
            K
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[3px] font-bold text-[#ff4a3b] block font-sans">
              AUTHENTICATED CLIENT
            </span>
            <h2 
              className="text-3xl md:text-4xl text-white font-normal tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {user.name}
            </h2>
            <p className="text-stone-400 text-sm font-sans">{user.email}</p>
          </div>

          <div className="bg-[#18181b] border border-stone-800 rounded-2xl p-5 text-left text-xs space-y-3 font-sans">
            <div className="flex justify-between items-center text-stone-400">
              <span>Account Status</span>
              <span className="font-bold text-white">{user.role || 'Editorial Client'}</span>
            </div>
            <div className="flex justify-between items-center text-stone-400">
              <span>Client Assignment Ledger</span>
              <span className="text-[#ff4a3b] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff4a3b] animate-pulse"></span> Active
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-stone-200 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer border-none"
            >
              Continue to Site
            </button>
            <button
              onClick={logout}
              className="py-3.5 px-6 rounded-full border border-stone-700 hover:border-white bg-transparent text-stone-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-24 bg-[#0a0a0a]">
      <div className="bg-[#121212] border border-white/10 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="bg-[#18181b] p-8 text-center text-white relative border-b border-white/10">
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-stone-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div className="w-12 h-12 rounded-full bg-[#ff4a3b]/20 border border-[#ff4a3b]/40 flex items-center justify-center text-[#ff4a3b] text-xl mx-auto mb-3 font-black tracking-widest font-sans">
            K
          </div>
          <h2 
            className="text-3xl font-normal tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            KAIRO
          </h2>
          <p className="text-[10px] text-[#ff4a3b] font-bold uppercase tracking-[3px] mt-1 font-sans">Client Authentication</p>

          {authReason && (
            <div className="mt-4 bg-[#ff4a3b]/10 border border-[#ff4a3b]/30 text-stone-200 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-left font-sans">
              <i className="fa-solid fa-lock text-[#ff4a3b] shrink-0"></i>
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-[#0f0f0f]">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer font-sans ${
              activeTab === 'signin'
                ? 'border-[#ff4a3b] text-[#ff4a3b] bg-[#121212]'
                : 'border-transparent text-stone-500 hover:text-stone-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer font-sans ${
              activeTab === 'register'
                ? 'border-[#ff4a3b] text-[#ff4a3b] bg-[#121212]'
                : 'border-transparent text-stone-500 hover:text-stone-300'
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
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2 font-sans">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5 text-left font-sans">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="client@example.com" 
                  className="w-full bg-[#18181b] border border-stone-800 focus:border-[#ff4a3b] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1.5 text-left font-sans">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#18181b] border border-stone-800 focus:border-[#ff4a3b] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-3.5 bg-white hover:bg-stone-200 text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none mt-2 font-sans"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Kairo'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {regError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2 font-sans">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2 font-sans">
                  <i className="fa-solid fa-circle-check mt-0.5 shrink-0"></i>
                  <span>{regSuccess}</span>
                </div>
              )}

              <div className="space-y-1 text-left font-sans">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Elena Rostova" 
                  className="w-full bg-[#18181b] border border-stone-800 focus:border-[#ff4a3b] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left font-sans">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="elena@example.com" 
                  className="w-full bg-[#18181b] border border-stone-800 focus:border-[#ff4a3b] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left font-sans">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  className="w-full bg-[#18181b] border border-stone-800 focus:border-[#ff4a3b] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left font-sans">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Confirm Password</label>
                <input 
                  type="password" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat password" 
                  className="w-full bg-[#18181b] border border-stone-800 focus:border-[#ff4a3b] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={regLoading}
                className="w-full py-3.5 mt-2 bg-white hover:bg-stone-200 text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none font-sans"
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
