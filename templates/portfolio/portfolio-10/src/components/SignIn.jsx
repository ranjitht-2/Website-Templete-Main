import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  User, 
  Mail, 
  Key, 
  LogOut, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ onNavigateBack, redirectTarget: propRedirectTarget, authReason: propAuthReason }) {
  const { login, register, isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Support both props and router location state
  const stateRedirectTarget = location?.state?.from || location?.state?.redirectTarget;
  const stateAuthReason = location?.state?.reason || location?.state?.authReason;
  const redirectTarget = propRedirectTarget || stateRedirectTarget || '/';
  const authReason = propAuthReason || stateAuthReason;

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const handleReturn = (target) => {
    const destination = target || redirectTarget || '/';
    if (onNavigateBack) {
      onNavigateBack(destination);
    } else {
      navigate(destination);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Please provide both your registered email address and password.');
      return;
    }

    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (result.success) {
      handleReturn(redirectTarget);
    } else {
      setLoginError(result.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim()) {
      setRegError('Please enter your full name or creative studio name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must contain at least 6 characters.');
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
      setRegSuccess('Client account created successfully! Accessing portal...');
      setTimeout(() => {
        handleReturn(redirectTarget);
      }, 900);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  // -------------------------------------------------------------
  // If Already Authenticated: Show Sasha Grey Client Portal Card
  // -------------------------------------------------------------
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-stone-50 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl box-border text-center space-y-6"
        >
          {/* Top Pink Accent Rule */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-pink-500" />
          
          <button
            onClick={() => handleReturn('/')}
            className="text-xs font-sans uppercase tracking-widest text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 transition-colors font-bold"
          >
            <ArrowLeft size={13} /> Return to Studio
          </button>

          <div className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-stone-900 text-white flex items-center justify-center font-serif-heading text-2xl font-black uppercase tracking-wider shadow-md">
              SG
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-sans tracking-widest uppercase text-pink-500 font-bold block">
                AUTHENTICATED CLIENT PORTAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-heading font-black text-zinc-900 uppercase tracking-tight">
                {user.name}
              </h2>
              <p className="text-xs text-zinc-500 font-sans">{user.email}</p>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3 font-sans text-xs text-left">
            <div className="flex justify-between items-center text-zinc-600">
              <span className="font-medium">Client Role</span>
              <span className="text-zinc-900 font-bold">{user.role || 'Editorial Client'}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-600">
              <span className="font-medium">Account ID</span>
              <span className="text-zinc-400 font-mono text-[11px] truncate max-w-[200px]">{user.id}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-600">
              <span className="font-medium">Campaign Status</span>
              <span className="text-pink-600 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                ACTIVE CLIENT ACCESS
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleReturn(redirectTarget)}
              className="flex-1 py-3.5 bg-[#111111] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer border-none flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Continue to Studio</span>
              <ArrowLeft className="rotate-180" size={14} />
            </button>
            <button
              onClick={logout}
              className="py-3.5 px-6 bg-transparent border border-stone-300 hover:border-rose-400 text-stone-600 hover:text-rose-600 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Unauthenticated: Sign In & Registration Form
  // -------------------------------------------------------------
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-stone-50 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xl box-border relative"
      >
        {/* Top Header */}
        <div className="bg-[#111111] p-6 sm:p-8 text-white relative text-center">
          <button
            onClick={() => handleReturn('/')}
            className="absolute top-5 left-5 text-xs font-sans uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 transition-colors font-bold"
          >
            <ArrowLeft size={13} /> Studio
          </button>

          <div className="pt-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-zinc-900 border border-white/20 flex items-center justify-center font-serif-heading font-black text-lg mx-auto mb-3 shadow-sm">
              SG
            </div>
            <h2 className="text-2xl font-serif-heading font-black uppercase tracking-wider text-white">
              Sasha Grey
            </h2>
            <p className="text-[10px] font-sans font-bold tracking-widest uppercase text-pink-400 mt-1">
              Creative Client Portal
            </p>
          </div>

          {authReason && (
            <div className="mt-4 bg-white/10 border border-pink-500/30 text-pink-200 px-3.5 py-2.5 rounded-xl text-xs flex items-start gap-2 text-left font-sans">
              <Lock size={14} className="shrink-0 mt-0.5 text-pink-400" />
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-stone-200 bg-stone-100/70">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3.5 text-xs font-sans uppercase tracking-wider font-bold transition-colors cursor-pointer border-none ${
              activeTab === 'signin'
                ? 'bg-white text-zinc-900 border-b-2 border-pink-500'
                : 'bg-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3.5 text-xs font-sans uppercase tracking-wider font-bold transition-colors cursor-pointer border-none ${
              activeTab === 'register'
                ? 'bg-white text-zinc-900 border-b-2 border-pink-500'
                : 'bg-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {/* Pink Accent Line */}
          <div className="w-full h-1 bg-pink-500 rounded-full mb-5" />

          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2">
                  <ShieldAlert size={14} className="shrink-0 mt-0.5 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  EMAIL ADDRESS <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-3.5 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>

              <div className="text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  PASSWORD <span className="text-pink-500">*</span>
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-3.5 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-[#111111] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-none"
                >
                  {loginLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>SIGN IN TO PORTAL</span>
                      <span>✈</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 text-center border-t border-stone-100">
                <span className="text-[10px] text-zinc-500 font-sans block">
                  DEMO ACCESS: elena@example.com (SashaGrey2026!)
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {regError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2">
                  <ShieldAlert size={14} className="shrink-0 mt-0.5 text-rose-500" />
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-600" />
                  <span>{regSuccess}</span>
                </div>
              )}

              <div className="text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  FULL NAME / BRAND <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-3.5 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>

              <div className="text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  EMAIL ADDRESS <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-3.5 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>

              <div className="text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  PASSWORD <span className="text-pink-500">*</span>
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-3.5 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>

              <div className="text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  CONFIRM PASSWORD <span className="text-pink-500">*</span>
                </label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-3.5 py-2.5 text-sm focus:outline-none focus:border-pink-500 transition"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-3 bg-[#111111] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-none"
                >
                  {regLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>CREATE CLIENT ACCOUNT</span>
                      <span>✈</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
