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
      setLoginError(result.error || 'Authentication failed. Please check your credentials.');
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
      setRegError('Passwords do not match. Please re-enter your password.');
      return;
    }

    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setRegSuccess('SnapFolio client account created successfully! Redirecting...');
      setTimeout(() => {
        if (onNavigateBack) {
          onNavigateBack(redirectTarget || 'home');
        }
      }, 1000);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  // If already authenticated, show Profile / Account Management View
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
        <div className="bg-[#1e1e1e] border border-zinc-800 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center space-y-6 shadow-2xl relative">
          
          {/* Back button */}
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Gallery
          </button>

          <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-3xl mx-auto mt-4">
            <i className="fa-solid fa-user-check"></i>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              AUTHENTICATED CLIENT
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {user.name}
            </h2>
            <p className="text-zinc-400 text-sm">{user.email}</p>
          </div>

          <div className="bg-[#121212] border border-zinc-800/80 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Membership Role</span>
              <span className="font-semibold text-zinc-200">{user.role || 'Client Member'}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Account Status</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="flex-1 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/20"
            >
              Continue to Portfolio
            </button>
            <button
              onClick={logout}
              className="py-3.5 px-6 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="bg-[#1e1e1e] border border-zinc-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="bg-[#181818] p-8 border-b border-zinc-800/80 text-center relative">
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-3 shadow-lg shadow-indigo-600/20">
            SF
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">SnapFolio</h2>
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mt-1">Client Authentication</p>

          {authReason && (
            <div className="mt-4 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-left">
              <i className="fa-solid fa-lock shrink-0"></i>
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-800 bg-[#141414]">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'signin'
                ? 'border-indigo-500 text-indigo-400 bg-[#1e1e1e]'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'register'
                ? 'border-indigo-500 text-indigo-400 bg-[#1e1e1e]'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
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
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="client@example.com" 
                  className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 disabled:opacity-50"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to SnapFolio'}
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
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Elena Rostova" 
                  className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-2.5 text-sm text-zinc-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="elena@example.com" 
                  className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-2.5 text-sm text-zinc-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-2.5 text-sm text-zinc-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Confirm Password</label>
                <input 
                  type="password" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat password" 
                  className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-2.5 text-sm text-zinc-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={regLoading}
                className="w-full py-3.5 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 disabled:opacity-50"
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
