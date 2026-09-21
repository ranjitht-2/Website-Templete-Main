import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  X, 
  Send, 
  User, 
  Mail, 
  Key, 
  ShieldAlert, 
  LogOut,
  ArrowRight,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ isOpen = true, onClose, onNavigateBack, redirectTarget = '/', authReason, onAuthSuccess, isStandalonePage = false }) {
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
      if (!isStandalonePage) {
        handleReturn();
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
      setRegError('Please enter your full name or brand organization.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please provide a valid company email address.');
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
      setRegSuccess('Editorial client account created! Logging in...');
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(result.user);
        if (!isStandalonePage) {
          handleReturn();
        }
      }, 800);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  const cardContent = (
    <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xl relative box-border mx-auto font-sans text-left">
      {/* Top Gold Accent Divider */}
      <div className="w-full h-1 bg-[#d4af37]" />

      {/* Header Bar */}
      <div className="p-6 bg-[#0d0d0d] text-white relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#d4af37] text-black flex items-center justify-center font-black text-sm rounded-sm shrink-0">
            SG
          </div>
          <div>
            <h3 className="text-sm font-serif-heading font-black uppercase tracking-wider text-white">
              SASHA GREY PORTAL
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block">
              {isAuthenticated ? 'CLIENT DOSSIER' : 'EDITORIAL GATEWAY'}
            </span>
          </div>
        </div>

        {!isStandalonePage && (
          <button
            onClick={handleReturn}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Protected Action Reason Notice */}
      {authReason && !isAuthenticated && (
        <div className="mx-6 mt-6 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-lg text-xs flex items-start gap-2.5 font-sans">
          <Lock size={15} className="shrink-0 mt-0.5 text-amber-700" />
          <div className="flex flex-col text-left">
            <span className="font-bold uppercase text-[10px] tracking-wider text-amber-950">PROTECTED CLIENT ACTION</span>
            <span className="text-amber-900/90 mt-0.5">{authReason}</span>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          AUTHENTICATED STATE: Client Account Details Card
      ------------------------------------------------------------- */}
      {isAuthenticated && user ? (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-stone-100 border-2 border-[#d4af37] text-black flex items-center justify-center font-bold text-xl uppercase shadow-md">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <h4 className="text-xl font-serif-heading font-black uppercase tracking-tight text-black mt-2">
              {user.name}
            </h4>
            <p className="text-xs text-stone-500 font-mono">{user.email}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-2.5 text-xs text-left">
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">ROLE</span>
              <span className="text-black font-bold">{user.role || 'Editorial Client'}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">CLIENT ID</span>
              <span className="text-stone-500 font-mono text-[10px] truncate max-w-[180px]">{user.id}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">STATUS</span>
              <span className="text-black font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                VERIFIED EDITORIAL CLIENT
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {isStandalonePage ? (
              <a
                href="#/contact"
                className="w-full py-3.5 bg-black hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <span>COMMISSION EDITORIAL CAMPAIGN</span>
                <ArrowRight size={14} />
              </a>
            ) : (
              <button
                onClick={handleReturn}
                className="w-full py-3.5 bg-black hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <span>CONTINUE TO STUDIO PORTFOLIO</span>
                <Send size={14} />
              </button>
            )}
            <button
              onClick={logout}
              className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-black font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer border border-stone-200 flex items-center justify-center gap-2"
            >
              <LogOut size={14} />
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
          <div className="flex border-b border-stone-200 bg-stone-50">
            <button
              type="button"
              onClick={() => { setActiveTab('signin'); setLoginError(''); }}
              className={`flex-1 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer border-none ${
                activeTab === 'signin'
                  ? 'bg-white text-black border-b-2 border-[#d4af37]'
                  : 'bg-transparent text-stone-400 hover:text-black'
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
              className={`flex-1 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer border-none ${
                activeTab === 'register'
                  ? 'bg-white text-black border-b-2 border-[#d4af37]'
                  : 'bg-transparent text-stone-400 hover:text-black'
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'signin' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2 text-left">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-500" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                    EMAIL ADDRESS <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="elena@monochromemag.com"
                    className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition"
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                    PASSWORD <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3.5 bg-black text-white hover:bg-stone-800 disabled:bg-stone-300 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    {loginLoading ? (
                      <span>AUTHENTICATING...</span>
                    ) : (
                      <>
                        <span>ENTER CLIENT PORTAL</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-3 text-center border-t border-stone-100">
                  <span className="text-[10px] font-mono text-stone-400 uppercase block">
                    TEST CLIENT: elena@monochromemag.com / SashaGrey2026!
                  </span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {regError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2 text-left">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-500" />
                    <span>{regError}</span>
                  </div>
                )}

                {regSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2 text-left">
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-500" />
                    <span>{regSuccess}</span>
                  </div>
                )}

                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                    FULL NAME / AGENCY <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-black px-4 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] transition"
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                    EMAIL ADDRESS <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="elena@monochromemag.com"
                    className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-black px-4 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] transition"
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                    PASSWORD <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-black px-4 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] transition"
                    required
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                    CONFIRM PASSWORD <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-black px-4 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] transition"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full py-3.5 bg-black text-white hover:bg-stone-800 disabled:bg-stone-300 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    {regLoading ? (
                      <span>INITIALIZING ACCOUNT...</span>
                    ) : (
                      <>
                        <span>CREATE CLIENT ACCOUNT</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isStandalonePage) {
    return (
      <div className="w-full max-w-full overflow-x-hidden min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
        {cardContent}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md my-auto"
        >
          {cardContent}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
