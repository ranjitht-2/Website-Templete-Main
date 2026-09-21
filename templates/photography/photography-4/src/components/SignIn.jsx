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
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-black text-[#f5f4f1] font-sans">
        <div className="bg-[#0c0c0c] border border-white/10 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center space-y-6 shadow-2xl relative">
          
          <button 
            type="button"
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            &larr; Return to Studio
          </button>

          <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] text-xl mx-auto mt-4 font-serif">
            ER
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-[#c5a880] block">
              CLIENT PORTAL & REGISTRY
            </span>
            <h2 className="text-3xl md:text-4xl text-[#f5f4f1] font-serif font-light tracking-wide">
              {user.name}
            </h2>
            <p className="text-neutral-400 text-xs tracking-wider font-sans">{user.email}</p>
          </div>

          <div className="bg-black border border-white/5 rounded-2xl p-5 text-left text-xs space-y-3 font-sans">
            <div className="flex justify-between items-center text-neutral-400">
              <span className="uppercase tracking-wider">Account Standing</span>
              <span className="font-bold text-white tracking-wider">{user.role || 'Couture Wedding Client'}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span className="uppercase tracking-wider">Editorial Calendar Status</span>
              <span className="text-[#c5a880] font-bold flex items-center gap-1.5 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse"></span> Concierge Active
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#f5f4f1] hover:bg-white text-black font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md cursor-pointer border-none font-sans"
            >
              Explore Portfolio
            </button>
            <button
              type="button"
              onClick={logout}
              className="py-3.5 px-6 rounded-full border border-white/20 hover:border-white bg-transparent text-neutral-300 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer font-sans"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-24 bg-black text-[#f5f4f1] font-sans">
      <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="bg-black p-8 text-center text-[#f5f4f1] relative border-b border-white/10">
          <button 
            type="button"
            onClick={() => onNavigateBack && onNavigateBack(redirectTarget || 'home')}
            className="absolute top-6 left-6 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
          >
            &larr; Back
          </button>

          <div className="w-12 h-12 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] text-sm mx-auto mb-3 font-serif">
            ER
          </div>
          <h2 className="text-2xl font-serif font-light tracking-[0.25em] text-[#f5f4f1]">
            EDEN ROSE
          </h2>
          <p className="text-[9px] text-[#c5a880] font-bold uppercase tracking-[0.35em] mt-1">
            Client Authentication
          </p>

          {authReason && (
            <div className="mt-4 bg-[#c5a880]/10 border border-[#c5a880]/30 text-stone-200 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-left font-sans">
              <span className="text-[#c5a880] font-serif text-sm">&bull;</span>
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-[#080808]">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer font-sans ${
              activeTab === 'signin'
                ? 'border-[#c5a880] text-white bg-[#0c0c0c]'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer font-sans ${
              activeTab === 'register'
                ? 'border-[#c5a880] text-white bg-[#0c0c0c]'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
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
                  <span className="mt-0.5 shrink-0">&bull;</span>
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="clara@edenrose.com" 
                  className="w-full bg-black border border-white/10 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-[#f5f4f1] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Passphrase</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-black border border-white/10 focus:border-[#c5a880] rounded-xl px-4 py-3 text-sm text-[#f5f4f1] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#f5f4f1] hover:bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none mt-2 font-sans"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Eden Rose'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {regError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">&bull;</span>
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">&bull;</span>
                  <span>{regSuccess}</span>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Full Name / Names</label>
                <input 
                  type="text" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Clara & Julian Vane" 
                  className="w-full bg-black border border-white/10 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-sm text-[#f5f4f1] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Email Address</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="clara@edenrose.com" 
                  className="w-full bg-black border border-white/10 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-sm text-[#f5f4f1] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Passphrase</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  className="w-full bg-black border border-white/10 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-sm text-[#f5f4f1] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-sans">Confirm Passphrase</label>
                <input 
                  type="password" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat passphrase" 
                  className="w-full bg-black border border-white/10 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-sm text-[#f5f4f1] outline-none transition-colors box-border font-sans" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={regLoading}
                className="w-full py-3.5 mt-2 bg-[#f5f4f1] hover:bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer border-none font-sans"
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
