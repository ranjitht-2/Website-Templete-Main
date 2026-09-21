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
  Key
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
      setLoginError(result.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim()) {
      setRegError('Please enter your full name or company organization.');
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
      setRegSuccess('Brand partner account initialized successfully! Logging you in...');
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md bg-[#1c1c1c] border border-zinc-800 overflow-hidden shadow-2xl relative box-border my-auto"
        >
          {/* Top Orange Accent Line */}
          <div className="w-full h-1 bg-[#ff5722]" />

          {/* Header Bar */}
          <div className="p-5 sm:p-6 bg-[#141414] border-b border-zinc-800 relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#ff5722] text-white flex items-center justify-center font-black text-sm rounded-none shadow-sm">
                JV
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  JARED VANCE STUDIO
                </h3>
                <span className="text-[10px] font-sans tracking-widest text-[#ff5722] uppercase font-bold block">
                  {isAuthenticated ? 'PARTNER PROFILE' : 'AUTHENTICATION GATEWAY'}
                </span>
              </div>
            </div>

            <button
              onClick={handleReturn}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Protected Action Reason Notice */}
          {authReason && !isAuthenticated && (
            <div className="mx-6 mt-6 bg-[#ff5722]/10 border border-[#ff5722]/30 text-orange-200 px-4 py-3 text-xs flex items-start gap-2.5 font-sans">
              <Lock size={15} className="shrink-0 mt-0.5 text-[#ff5722]" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-white uppercase text-[10px] tracking-wider">PROTECTED PARTNER ACTION</span>
                <span className="text-white/80 mt-0.5">{authReason}</span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              AUTHENTICATED STATE: Client Account Details Card
          ------------------------------------------------------------- */}
          {isAuthenticated && user ? (
            <div className="p-6 sm:p-8 space-y-6 text-left">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 bg-[#141414] border-2 border-[#ff5722] text-white flex items-center justify-center font-black text-xl uppercase">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-white mt-2">
                  {user.name}
                </h4>
                <p className="text-xs text-zinc-400 font-sans">{user.email}</p>
              </div>

              <div className="bg-[#141414] border border-zinc-800 p-4 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">ROLE</span>
                  <span className="text-white font-bold">{user.role || 'Brand Partner'}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">USER ID</span>
                  <span className="text-zinc-400 font-mono text-[10px] truncate max-w-[180px]">{user.id}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">ACCESS STATUS</span>
                  <span className="text-[#ff5722] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
                    VERIFIED PARTNER
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleReturn}
                  className="w-full py-3.5 bg-[#ff5722] hover:bg-[#e64a19] text-white font-extrabold text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  <span>RETURN TO PORTFOLIO</span>
                  <Send size={12} />
                </button>
                <button
                  onClick={logout}
                  className="w-full py-3 bg-[#141414] hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border border-zinc-800 flex items-center justify-center gap-2"
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
              <div className="flex border-b border-zinc-800 bg-[#141414]">
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setLoginError(''); }}
                  className={`flex-1 py-3 text-xs font-sans uppercase tracking-widest font-black transition-colors cursor-pointer border-none ${
                    activeTab === 'signin'
                      ? 'bg-[#1c1c1c] text-white border-b-2 border-[#ff5722]'
                      : 'bg-transparent text-zinc-500 hover:text-white'
                  }`}
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
                  className={`flex-1 py-3 text-xs font-sans uppercase tracking-widest font-black transition-colors cursor-pointer border-none ${
                    activeTab === 'register'
                      ? 'bg-[#1c1c1c] text-white border-b-2 border-[#ff5722]'
                      : 'bg-transparent text-zinc-500 hover:text-white'
                  }`}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'signin' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                    {loginError && (
                      <div className="bg-red-950/50 border border-red-500/40 text-red-200 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-400" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="text-left">
                      <label className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        EMAIL ADDRESS <span className="text-[#ff5722]">*</span>
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="charlotte@apexcreative.com"
                        className="w-full box-border bg-[#141414] border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#ff5722] transition"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        PASSWORD <span className="text-[#ff5722]">*</span>
                      </label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full box-border bg-[#141414] border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#ff5722] transition"
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full py-3.5 bg-[#ff5722] hover:bg-[#e64a19] disabled:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        {loginLoading ? (
                          <span>AUTHENTICATING...</span>
                        ) : (
                          <>
                            <span>SIGN IN TO PORTAL</span>
                            <span>✈</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-3 text-center border-t border-zinc-800">
                      <span className="text-[10px] font-sans text-zinc-500 uppercase block">
                        TEST CREDENTIALS: charlotte@apexcreative.com / JaredVance2026!
                      </span>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-left">
                    {regError && (
                      <div className="bg-red-950/50 border border-red-500/40 text-red-200 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-400" />
                        <span>{regError}</span>
                      </div>
                    )}

                    {regSuccess && (
                      <div className="bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-400" />
                        <span>{regSuccess}</span>
                      </div>
                    )}

                    <div className="text-left">
                      <label className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        FULL NAME / BRAND <span className="text-[#ff5722]">*</span>
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Charlotte Sterling"
                        className="w-full box-border bg-[#141414] border border-zinc-800 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff5722] transition"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        EMAIL ADDRESS <span className="text-[#ff5722]">*</span>
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="charlotte@apexcreative.com"
                        className="w-full box-border bg-[#141414] border border-zinc-800 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff5722] transition"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        PASSWORD <span className="text-[#ff5722]">*</span>
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full box-border bg-[#141414] border border-zinc-800 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff5722] transition"
                        required
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        CONFIRM PASSWORD <span className="text-[#ff5722]">*</span>
                      </label>
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full box-border bg-[#141414] border border-zinc-800 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff5722] transition"
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={regLoading}
                        className="w-full py-3.5 bg-[#ff5722] hover:bg-[#e64a19] disabled:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        {regLoading ? (
                          <span>INITIALIZING ACCOUNT...</span>
                        ) : (
                          <>
                            <span>CREATE BRAND ACCOUNT</span>
                            <span>✈</span>
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
