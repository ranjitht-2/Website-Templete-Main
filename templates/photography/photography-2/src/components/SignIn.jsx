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
      setRegSuccess('Patron account created successfully! Redirecting...');
      setTimeout(() => {
        if (onNavigateBack) {
          onNavigateBack(redirectTarget || 'home');
        }
      }, 900);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  // If already authenticated, show Patron Profile Card
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20">
        <div className="bg-[#0d0d0d] border border-stone-800 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center space-y-6 shadow-2xl relative">
          
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-stone-400 hover:text-[#F4F0E8] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Gallery
          </button>

          <div className="w-20 h-20 rounded-2xl bg-[#7A9A8B]/15 border border-[#7A9A8B]/30 flex items-center justify-center text-[#7A9A8B] text-3xl mx-auto mt-4">
            <i className="fa-solid fa-camera"></i>
          </div>

          <div className="space-y-2">
            <span className="photo-card-glass-label mx-auto">
              AUTHENTICATED PATRON
            </span>
            <h2 className="photo-serif text-3xl md:text-4xl text-[#F4F0E8] tracking-tight">
              {user.name}
            </h2>
            <p className="text-stone-400 text-sm font-sans">{user.email}</p>
          </div>

          <div className="bg-[#141414] border border-stone-800 rounded-2xl p-5 text-left text-xs space-y-3 font-sans">
            <div className="flex justify-between items-center text-stone-400">
              <span>Client Privileges</span>
              <span className="font-semibold text-stone-200">{user.role || 'Editorial Patron'}</span>
            </div>
            <div className="flex justify-between items-center text-stone-400">
              <span>Account Status</span>
              <span className="text-[#7A9A8B] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7A9A8B] animate-pulse"></span> Active
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#7A9A8B] hover:bg-[#638273] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Continue to Portfolios
            </button>
            <button
              onClick={logout}
              className="py-3.5 px-6 rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-900 text-stone-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-24">
      <div className="bg-[#0d0d0d] border border-stone-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="bg-[#141414] p-8 border-b border-stone-800 text-center relative">
          <button 
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-stone-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div className="w-12 h-12 rounded-xl bg-[#7A9A8B]/20 border border-[#7A9A8B]/30 flex items-center justify-center text-[#7A9A8B] font-serif text-2xl mx-auto mb-3 shadow-lg">
            P
          </div>
          <h2 className="photo-serif text-3xl text-[#F4F0E8] tracking-tight">Photo Studio</h2>
          <p className="text-[11px] text-[#7A9A8B] font-bold uppercase tracking-widest mt-1">Patron Authentication</p>

          {authReason && (
            <div className="mt-4 bg-[#7A9A8B]/10 border border-[#7A9A8B]/30 text-[#F4F0E8] px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-left">
              <i className="fa-solid fa-lock text-[#7A9A8B] shrink-0"></i>
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-800 bg-[#101010]">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'signin'
                ? 'border-[#7A9A8B] text-[#7A9A8B] bg-[#0d0d0d]'
                : 'border-transparent text-stone-500 hover:text-stone-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'border-[#7A9A8B] text-[#7A9A8B] bg-[#0d0d0d]'
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
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <i className="fa-solid fa-circle-exclamation mt-0.5 shrink-0"></i>
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="patron@example.com" 
                  className="w-full bg-[#141414] border border-stone-800 focus:border-[#7A9A8B] rounded-xl px-4 py-3 text-sm text-stone-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#141414] border border-stone-800 focus:border-[#7A9A8B] rounded-xl px-4 py-3 text-sm text-stone-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#7A9A8B] hover:bg-[#638273] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Studio'}
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
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Clara Delacroix" 
                  className="w-full bg-[#141414] border border-stone-800 focus:border-[#7A9A8B] rounded-xl px-4 py-2.5 text-sm text-stone-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="clara@example.com" 
                  className="w-full bg-[#141414] border border-stone-800 focus:border-[#7A9A8B] rounded-xl px-4 py-2.5 text-sm text-stone-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  className="w-full bg-[#141414] border border-stone-800 focus:border-[#7A9A8B] rounded-xl px-4 py-2.5 text-sm text-stone-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Confirm Password</label>
                <input 
                  type="password" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat password" 
                  className="w-full bg-[#141414] border border-stone-800 focus:border-[#7A9A8B] rounded-xl px-4 py-2.5 text-sm text-stone-200 outline-none transition-colors" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={regLoading}
                className="w-full py-3.5 mt-2 bg-[#7A9A8B] hover:bg-[#638273] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {regLoading ? 'Registering...' : 'Create Patron Account'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
