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
      setLoginError('Please enter both your email address and passphrase.');
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
      setRegError('Passphrase must be at least 6 characters in length.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passphrases do not match. Please re-enter.');
      return;
    }

    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setRegSuccess('Client archive created successfully! Redirecting...');
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
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-[#141414] text-white font-sans">
        <div className="bg-[#1C1C1C] border border-white/10 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center space-y-6 shadow-2xl relative">
          
          <button 
            type="button"
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-[#A3A3A3] hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            <i className="fa-solid fa-arrow-left"></i> Return to Showcase
          </button>

          <div className="w-16 h-16 rounded-full bg-[#F3C1C1]/10 border border-[#F3C1C1]/30 flex items-center justify-center text-[#F3C1C1] text-2xl mx-auto mt-4 font-serif">
            Æ
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-[#F3C1C1] block">
              AUTHENTICATED CLIENT PORTAL
            </span>
            <h2 
              className="text-3xl md:text-4xl text-white font-light tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {user.name}
            </h2>
            <p className="text-[#A3A3A3] text-xs tracking-wider">{user.email}</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="flex justify-between items-center text-[#A3A3A3]">
              <span className="uppercase tracking-wider">Patron Status</span>
              <span className="font-bold text-white tracking-wider">{user.role || 'Editorial Patron'}</span>
            </div>
            <div className="flex justify-between items-center text-[#A3A3A3]">
              <span className="uppercase tracking-wider">Commission Archive</span>
              <span className="text-[#F3C1C1] font-bold flex items-center gap-1.5 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#F3C1C1] animate-pulse"></span> Active Portfolio
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-stone-200 text-[#141414] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md cursor-pointer border-none"
            >
              Explore Studio
            </button>
            <button
              type="button"
              onClick={logout}
              className="py-3.5 px-6 rounded-full border border-white/20 hover:border-white bg-transparent text-[#A3A3A3] hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-24 bg-[#141414] text-white font-sans">
      <div className="bg-[#1C1C1C] border border-white/10 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="bg-[#141414] p-8 text-center text-white relative border-b border-white/10">
          <button 
            type="button"
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-[#A3A3A3] hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div className="w-12 h-12 rounded-full bg-[#F3C1C1]/10 border border-[#F3C1C1]/30 flex items-center justify-center text-[#F3C1C1] text-xl mx-auto mb-3 font-serif">
            Æ
          </div>
          <h2 
            className="text-2xl font-light tracking-[0.2em] text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            AETHER STUDIO
          </h2>
          <p className="text-[9px] text-[#F3C1C1] font-bold uppercase tracking-[0.35em] mt-1">Client Archive Access</p>

          {authReason && (
            <div className="mt-4 bg-[#F3C1C1]/10 border border-[#F3C1C1]/30 text-stone-200 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-left">
              <i className="fa-solid fa-lock text-[#F3C1C1] shrink-0"></i>
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-[#0F0F0F]">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'signin'
                ? 'border-[#F3C1C1] text-[#F3C1C1] bg-[#1C1C1C]'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'border-[#F3C1C1] text-[#F3C1C1] bg-[#1C1C1C]'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Create Archive
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="adeline@laurent-estate.com" 
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#F3C1C1] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">Passphrase</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#F3C1C1] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-3.5 bg-white hover:bg-stone-200 text-[#141414] font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none mt-2"
              >
                {loginLoading ? 'Accessing Archive...' : 'Sign In to Aether'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {regError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-check mt-0.5 shrink-0"></i>
                  <span>{regSuccess}</span>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Adeline Laurent" 
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#F3C1C1] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="adeline@laurent-estate.com" 
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#F3C1C1] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">Passphrase</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#F3C1C1] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">Confirm Passphrase</label>
                <input 
                  type="password" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat passphrase" 
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#F3C1C1] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors box-border" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={regLoading}
                className="w-full py-3.5 mt-2 bg-white hover:bg-stone-200 text-[#141414] font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none"
              >
                {regLoading ? 'Creating Archive...' : 'Create Patron Archive'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
