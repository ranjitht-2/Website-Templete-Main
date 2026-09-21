import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  LogOut, 
  ShieldAlert, 
  X, 
  Calendar, 
  Briefcase, 
  Bookmark, 
  Check,
  User,
  Mail,
  Key,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ isOpen = true, onClose, onNavigateBack, authReason, onAuthSuccess }) {
  const { login, register, isAuthenticated, user, logout, savedPackages, bookings } = useAuth();

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
      setLoginError('Please provide both your registered business email and password.');
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
      setRegError('Please enter your full name or company name.');
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
      setRegSuccess('Corporate client profile initialized successfully! Logging you in...');
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(result.user);
        handleReturn();
      }, 800);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  const handleQuickDemo = (email, password) => {
    setLoginEmail(email);
    setLoginPassword(password);
    setLoginError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md bg-white border border-zinc-200 shadow-2xl overflow-hidden relative box-border my-auto"
        >
          {/* Top Black Accent Line */}
          <div className="w-full h-1 bg-black" />

          {/* Header Bar */}
          <div className="p-5 sm:p-6 bg-[#fbfbfb] border-b border-zinc-200 relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black text-white flex items-center justify-center font-serif-normal text-sm font-bold">
                EO
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-black font-sans">
                  EVELYN OSWALD
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block">
                  {isAuthenticated ? 'EXECUTIVE CLIENT PORTAL' : 'OPERATIONS AUTHENTICATION'}
                </span>
              </div>
            </div>

            <button
              onClick={handleReturn}
              className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Protected Action Reason Notice */}
          {authReason && !isAuthenticated && (
            <div className="mx-6 mt-6 bg-zinc-50 border border-zinc-300 text-zinc-800 px-4 py-3 text-xs flex items-start gap-2.5 font-sans">
              <Lock size={15} className="shrink-0 mt-0.5 text-black" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-black uppercase text-[10px] tracking-wider">
                  PROTECTED OPERATIONS ACTION
                </span>
                <span className="text-zinc-600 mt-0.5">{authReason}</span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              AUTHENTICATED STATE: Client Account Details Card
          ------------------------------------------------------------- */}
          {isAuthenticated && user ? (
            <div className="p-6 sm:p-8 space-y-6 text-left">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-serif text-2xl uppercase">
                  {user.name ? user.name.charAt(0) : 'E'}
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-black mt-2 font-serif-normal">
                  {user.name}
                </h4>
                <p className="text-xs text-zinc-500 font-sans">{user.email}</p>
              </div>

              {/* Specs Grid */}
              <div className="bg-[#fbfbfb] border border-zinc-200 p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase font-bold">CLIENT ROLE</span>
                  <span className="text-black font-bold">{user.role || 'Corporate Client'}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase font-bold">ACCOUNT ID</span>
                  <span className="text-zinc-500 font-mono text-[10px] truncate max-w-[180px]">{user.id}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase font-bold">SAVED PACKAGES</span>
                  <span className="text-black font-bold flex items-center gap-1">
                    <Bookmark size={12} /> {savedPackages.length} Packages Saved
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase font-bold">SCHEDULED SYNCS</span>
                  <span className="text-black font-bold flex items-center gap-1">
                    <Calendar size={12} /> {bookings.length} Sessions Logged
                  </span>
                </div>
              </div>

              {/* Saved Packages List */}
              {savedPackages.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 font-bold block">
                    SAVED SERVICE PACKAGES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {savedPackages.map((pkg, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                        {pkg}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleReturn}
                  className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  <span>RETURN TO PORTFOLIO</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  onClick={logout}
                  className="w-full py-3 bg-white hover:bg-zinc-100 text-zinc-600 hover:text-black font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border border-zinc-300 flex items-center justify-center gap-2"
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
              <div className="flex border-b border-zinc-200 bg-[#fbfbfb]">
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setLoginError(''); }}
                  className={`flex-1 py-3 text-xs font-sans uppercase tracking-widest font-black transition-colors cursor-pointer border-none ${
                    activeTab === 'signin'
                      ? 'bg-white text-black border-b-2 border-black'
                      : 'bg-transparent text-zinc-400 hover:text-black'
                  }`}
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
                  className={`flex-1 py-3 text-xs font-sans uppercase tracking-widest font-black transition-colors cursor-pointer border-none ${
                    activeTab === 'register'
                      ? 'bg-white text-black border-b-2 border-black'
                      : 'bg-transparent text-zinc-400 hover:text-black'
                  }`}
                >
                  REGISTER
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'signin' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                    {loginError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-600" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        BUSINESS EMAIL <span className="text-black">*</span>
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="sophia@vesperlabs.com"
                        className="w-full box-border bg-[#fbfbfb] border border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        PASSWORD <span className="text-black">*</span>
                      </label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full box-border bg-[#fbfbfb] border border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
                    >
                      {loginLoading ? (
                        <span>AUTHENTICATING...</span>
                      ) : (
                        <>
                          <Lock size={12} />
                          <span>SIGN IN TO EXECUTIVE PORTAL</span>
                        </>
                      )}
                    </button>

                    {/* Pre-seeded demo accounts */}
                    <div className="pt-4 border-t border-zinc-100 text-left">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block mb-2 font-bold">
                        QUICK DEMO ACCOUNTS (POSTGRESQL SEED):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickDemo('sophia@vesperlabs.com', 'EvelynOswald2026!')}
                          className="text-left p-2 bg-[#fbfbfb] border border-zinc-200 hover:border-black text-[10px] text-zinc-700 transition cursor-pointer"
                        >
                          <span className="font-bold block text-black">Sophia Vance</span>
                          <span className="text-[9px] text-zinc-400">VP of Operations</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickDemo('harrison@sterlingcap.com', 'EvelynOswald2026!')}
                          className="text-left p-2 bg-[#fbfbfb] border border-zinc-200 hover:border-black text-[10px] text-zinc-700 transition cursor-pointer"
                        >
                          <span className="font-bold block text-black">Harrison Sterling</span>
                          <span className="text-[9px] text-zinc-400">Managing Director</span>
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                    {regError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-600" />
                        <span>{regError}</span>
                      </div>
                    )}

                    {regSuccess && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 text-xs flex items-start gap-2">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-600" />
                        <span>{regSuccess}</span>
                      </div>
                    )}

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        FULL NAME / ENTERPRISE <span className="text-black">*</span>
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Elena Sterling"
                        className="w-full box-border bg-[#fbfbfb] border border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                        BUSINESS EMAIL <span className="text-black">*</span>
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="elena@apexholdings.com"
                        className="w-full box-border bg-[#fbfbfb] border border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <div>
                        <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                          PASSWORD <span className="text-black">*</span>
                        </label>
                        <input
                          type="password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full box-border bg-[#fbfbfb] border border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-1.5">
                          CONFIRM <span className="text-black">*</span>
                        </label>
                        <input
                          type="password"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full box-border bg-[#fbfbfb] border border-zinc-200 text-black px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={regLoading}
                      className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
                    >
                      {regLoading ? (
                        <span>INITIALIZING PROFILE...</span>
                      ) : (
                        <>
                          <CheckCircle2 size={12} />
                          <span>CREATE CLIENT ACCOUNT</span>
                        </>
                      )}
                    </button>
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
