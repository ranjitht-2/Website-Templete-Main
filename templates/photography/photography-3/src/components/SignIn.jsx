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
      setRegError('Please provide your full name or couple names.');
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

  // If already authenticated, show Client Portal Card
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-white text-[#1F1F1F] font-sans">
        <div className="bg-[#ECEBE6] border border-zinc-200 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center space-y-6 shadow-sm relative">
          
          <button 
            type="button"
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-[#666666] hover:text-[#1F1F1F] flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            &larr; Return to Gallery
          </button>

          <div className="w-16 h-16 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-[#1F1F1F] text-2xl mx-auto mt-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            L
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-[#666666] block">
              CLIENT CONCIERGE & COMMISSIONS
            </span>
            <h2 className="text-3xl md:text-4xl text-[#1F1F1F] font-light tracking-wide" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              {user.name}
            </h2>
            <p className="text-[#666666] text-xs tracking-wider">{user.email}</p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-5 text-left text-xs space-y-3 font-sans">
            <div className="flex justify-between items-center text-[#666666]">
              <span className="uppercase tracking-wider">Account Standing</span>
              <span className="font-bold text-[#1F1F1F] tracking-wider">{user.role || 'Fine Art Wedding Client'}</span>
            </div>
            <div className="flex justify-between items-center text-[#666666]">
              <span className="uppercase tracking-wider">Archive & Commission Status</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1.5 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span> Active Client
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center font-sans">
            <button
              type="button"
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#1F1F1F] hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-sm cursor-pointer border-none"
            >
              Explore Works
            </button>
            <button
              type="button"
              onClick={logout}
              className="py-3.5 px-6 rounded-full border border-zinc-300 hover:border-[#1F1F1F] bg-white text-[#666666] hover:text-[#1F1F1F] font-bold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20 bg-white text-[#1F1F1F] font-sans">
      <div className="bg-[#ECEBE6] border border-zinc-200 rounded-3xl max-w-md w-full overflow-hidden shadow-sm">
        
        {/* Top Header */}
        <div className="bg-white p-8 text-center text-[#1F1F1F] relative border-b border-zinc-200">
          <button 
            type="button"
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-[#666666] hover:text-[#1F1F1F] flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            &larr; Back
          </button>

          <div className="w-12 h-12 rounded-full bg-[#ECEBE6] border border-zinc-300 flex items-center justify-center text-[#1F1F1F] text-xl mx-auto mb-3" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            L
          </div>
          <h2 className="text-2xl font-light tracking-[0.25em] text-[#1F1F1F]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            LUMIÈRE STUDIOS
          </h2>
          <p className="text-[9px] text-[#666666] font-bold uppercase tracking-[0.35em] mt-1">
            Client Authentication
          </p>

          {authReason && (
            <div className="mt-4 bg-white border border-zinc-200 text-[#1F1F1F] px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-left font-sans">
              <span className="text-[#1F1F1F] font-serif text-sm">&bull;</span>
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-200 bg-white/60">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer font-sans ${
              activeTab === 'signin'
                ? 'border-[#1F1F1F] text-[#1F1F1F] bg-[#ECEBE6]'
                : 'border-transparent text-[#666666] hover:text-[#1F1F1F]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer font-sans ${
              activeTab === 'register'
                ? 'border-[#1F1F1F] text-[#1F1F1F] bg-[#ECEBE6]'
                : 'border-transparent text-[#666666] hover:text-[#1F1F1F]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 bg-[#ECEBE6]">
          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2 font-sans">
                  <span className="mt-0.5 shrink-0">&bull;</span>
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#666666] uppercase tracking-wider font-sans">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="amara@lumierestudios.com" 
                  className="w-full bg-white border border-zinc-200 focus:border-[#1F1F1F] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#666666] uppercase tracking-wider font-sans">Passphrase</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white border border-zinc-200 focus:border-[#1F1F1F] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#1F1F1F] hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-sm disabled:opacity-50 cursor-pointer border-none mt-2 font-sans"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Lumière'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {regError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2 font-sans">
                  <span className="mt-0.5 shrink-0">&bull;</span>
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-start gap-2 font-sans">
                  <span className="mt-0.5 shrink-0">&bull;</span>
                  <span>{regSuccess}</span>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#666666] uppercase tracking-wider font-sans">Full Name / Names</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Amara & David Johnson" 
                  className="w-full bg-white border border-zinc-200 focus:border-[#1F1F1F] rounded-xl px-4 py-2.5 text-sm text-[#1F1F1F] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#666666] uppercase tracking-wider font-sans">Email Address</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="amara@lumierestudios.com" 
                  className="w-full bg-white border border-zinc-200 focus:border-[#1F1F1F] rounded-xl px-4 py-2.5 text-sm text-[#1F1F1F] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#666666] uppercase tracking-wider font-sans">Passphrase</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  className="w-full bg-white border border-zinc-200 focus:border-[#1F1F1F] rounded-xl px-4 py-2.5 text-sm text-[#1F1F1F] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-[#666666] uppercase tracking-wider font-sans">Confirm Passphrase</label>
                <input 
                  type="password" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat passphrase" 
                  className="w-full bg-white border border-zinc-200 focus:border-[#1F1F1F] rounded-xl px-4 py-2.5 text-sm text-[#1F1F1F] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={regLoading}
                className="w-full py-3.5 mt-2 bg-[#1F1F1F] hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-sm disabled:opacity-50 cursor-pointer border-none font-sans"
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
