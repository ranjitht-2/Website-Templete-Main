import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  LogOut, 
  ShieldAlert, 
  X, 
  Send, 
  User, 
  Mail, 
  Key,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ isOpen = true, onClose, onNavigateBack, authReason, onAuthSuccess }) {
  const { login, register, isAuthenticated, user, logout } = useAuth();

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

  const handleReturn = () => {
    if (onClose) onClose();
    if (onNavigateBack) onNavigateBack();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Please provide both your registered email and password.');
      return;
    }

    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (result.success) {
      if (onAuthSuccess) onAuthSuccess(result.user);
      handleReturn();
    } else {
      setLoginError(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim()) {
      setRegError('Please enter your full name or company name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please enter a valid email address.');
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
      setRegSuccess('Client account created successfully! Signing you in...');
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(result.user);
        handleReturn();
      }, 800);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22 }}
          className="w-full max-w-md bg-white border border-stone-200/80 shadow-2xl relative box-border my-auto overflow-hidden rounded-none"
        >
          {/* Top Subtle Border Bar */}
          <div className="w-full h-1 bg-[#262626]" />

          {/* Header Bar */}
          <div className="p-5 sm:p-6 bg-[#fafafc] border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#262626] text-white flex items-center justify-center font-mono font-bold text-xs">
                CO
              </div>
              <div className="text-left">
                <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-stone-900">
                  CLARA OSWALD
                </h3>
                <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase block">
                  {isAuthenticated ? 'CLIENT PORTAL' : 'STUDIO ACCESS'}
                </span>
              </div>
            </div>

            <button
              onClick={handleReturn}
              className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Protected Action Notice */}
          {authReason && !isAuthenticated && (
            <div className="mx-6 mt-6 bg-stone-100 border border-stone-200 text-stone-800 px-4 py-3 text-xs flex items-start gap-2.5 font-sans">
              <Lock size={15} className="shrink-0 mt-0.5 text-stone-700" />
              <div className="flex flex-col text-left">
                <span className="font-mono font-bold text-[10px] tracking-wider uppercase text-stone-900">
                  AUTHENTICATION REQUIRED
                </span>
                <span className="text-stone-600 mt-0.5 text-xs">{authReason}</span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              AUTHENTICATED STATE: Client Account Details
          ------------------------------------------------------------- */}
          {isAuthenticated && user ? (
            <div className="p-6 sm:p-8 space-y-6 text-left">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 bg-stone-100 border border-stone-300 text-stone-900 flex items-center justify-center font-serif text-2xl">
                  {user.name ? user.name.charAt(0) : 'C'}
                </div>
                <h4 className="text-lg font-serif text-stone-900 mt-2 font-medium">
                  {user.name}
                </h4>
                <p className="text-xs font-mono text-stone-500">{user.email}</p>
              </div>

              <div className="bg-[#fafafc] border border-stone-200 p-4 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center text-stone-600">
                  <span className="text-[10px] tracking-wider uppercase text-stone-400 font-bold">CLIENT ROLE</span>
                  <span className="text-stone-900 font-semibold">{user.role || 'Design Client'}</span>
                </div>
                <div className="flex justify-between items-center text-stone-600">
                  <span className="text-[10px] tracking-wider uppercase text-stone-400 font-bold">CLIENT ID</span>
                  <span className="text-stone-500 text-[10px] truncate max-w-[170px]">{user.id}</span>
                </div>
                <div className="flex justify-between items-center text-stone-600">
                  <span className="text-[10px] tracking-wider uppercase text-stone-400 font-bold">STATUS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    VERIFIED CLIENT
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 font-mono">
                <button
                  onClick={handleReturn}
                  className="w-full py-3.5 bg-[#262626] hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  <span>RETURN TO STUDIO</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  onClick={logout}
                  className="w-full py-3 bg-transparent hover:bg-stone-100 text-stone-700 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border border-stone-300 flex items-center justify-center gap-2"
                >
                  <LogOut size={13} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            </div>
          ) : (
            /* -------------------------------------------------------------
                UNAUTHENTICATED STATE: Tabbed Sign In / Register Forms
            ------------------------------------------------------------- */
            <div>
              {/* Tab Selector */}
              <div className="flex border-b border-stone-200 bg-[#fafafc]">
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setLoginError(''); }}
                  className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest font-bold transition-colors cursor-pointer border-none ${
                    activeTab === 'signin'
                      ? 'bg-white text-stone-900 border-b-2 border-[#262626]'
                      : 'bg-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
                  className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest font-bold transition-colors cursor-pointer border-none ${
                    activeTab === 'register'
                      ? 'bg-white text-stone-900 border-b-2 border-[#262626]'
                      : 'bg-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'signin' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                    {loginError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-500" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold block mb-1.5">
                        EMAIL ADDRESS <span className="text-stone-900">*</span>
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="sophia@atelierdesign.com"
                        className="w-full box-border bg-white border border-stone-300 text-stone-900 px-4 py-3 text-sm focus:outline-none focus:border-[#262626] transition font-sans"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold block mb-1.5">
                        PASSWORD <span className="text-stone-900">*</span>
                      </label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full box-border bg-white border border-stone-300 text-stone-900 px-4 py-3 text-sm focus:outline-none focus:border-[#262626] transition font-sans"
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full py-3.5 bg-[#262626] hover:bg-black disabled:bg-stone-400 text-white font-mono font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        {loginLoading ? (
                          <span>VERIFYING...</span>
                        ) : (
                          <>
                            <span>SIGN IN</span>
                            <ArrowRight size={13} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-3 text-center border-t border-stone-200">
                      <span className="text-[10px] font-mono text-stone-400 uppercase block">
                        DEMO: sophia@atelierdesign.com / ClaraOswald2026!
                      </span>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-left">
                    {regError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-500" />
                        <span>{regError}</span>
                      </div>
                    )}

                    {regSuccess && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-500" />
                        <span>{regSuccess}</span>
                      </div>
                    )}

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold block mb-1.5">
                        FULL NAME / COMPANY <span className="text-stone-900">*</span>
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Sophia Laurent"
                        className="w-full box-border bg-white border border-stone-300 text-stone-900 px-4 py-2.5 text-sm focus:outline-none focus:border-[#262626] transition font-sans"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold block mb-1.5">
                        EMAIL ADDRESS <span className="text-stone-900">*</span>
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="sophia@atelierdesign.com"
                        className="w-full box-border bg-white border border-stone-300 text-stone-900 px-4 py-2.5 text-sm focus:outline-none focus:border-[#262626] transition font-sans"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold block mb-1.5">
                        PASSWORD <span className="text-stone-900">*</span>
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full box-border bg-white border border-stone-300 text-stone-900 px-4 py-2.5 text-sm focus:outline-none focus:border-[#262626] transition font-sans"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold block mb-1.5">
                        CONFIRM PASSWORD <span className="text-stone-900">*</span>
                      </label>
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full box-border bg-white border border-stone-300 text-stone-900 px-4 py-2.5 text-sm focus:outline-none focus:border-[#262626] transition font-sans"
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={regLoading}
                        className="w-full py-3.5 bg-[#262626] hover:bg-black disabled:bg-stone-400 text-white font-mono font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        {regLoading ? (
                          <span>CREATING ACCOUNT...</span>
                        ) : (
                          <>
                            <span>CREATE ACCOUNT</span>
                            <ArrowRight size={13} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
