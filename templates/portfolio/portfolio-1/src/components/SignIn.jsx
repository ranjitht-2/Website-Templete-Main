import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  LogOut, 
  ShieldAlert, 
  X, 
  Compass, 
  User, 
  Mail, 
  Key, 
  Bookmark, 
  FileText,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ isOpen = true, onClose, onNavigateBack, authReason, onAuthSuccess }) {
  const { login, register, isAuthenticated, user, logout, savedProjects, commissions } = useAuth();

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
      setRegError('Please enter your full name or architectural studio name.');
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
      setRegSuccess('Client partner profile created successfully! Logging you in...');
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(result.user);
        handleReturn();
      }, 800);
    } else {
      setRegError(result.error || 'Registration failed. Please try again.');
    }
  };

  // Quick Demo Login helper
  const handleQuickDemo = (email, password) => {
    setLoginEmail(email);
    setLoginPassword(password);
    setLoginError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1a2b4a]/75 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-lg bg-[#FAF9F6] border border-[#1a2b4a]/15 shadow-2xl overflow-hidden relative box-border my-auto"
        >
          {/* Top Navy Border Line */}
          <div className="w-full h-1 bg-[#1a2b4a]" />

          {/* Header Bar */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#1a2b4a]/10 relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#1a2b4a] text-white flex items-center justify-center font-serif text-base font-bold shadow-sm">
                AT
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a2b4a]">
                  AETHELGARD STUDIO
                </h3>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#1a2b4a]/60 uppercase font-medium block">
                  {isAuthenticated ? 'CLIENT PORTAL // VERIFIED' : 'AUTHENTICATION & BLUEPRINT ACCESS'}
                </span>
              </div>
            </div>

            <button
              onClick={handleReturn}
              className="p-1.5 text-[#1a2b4a]/50 hover:text-[#1a2b4a] hover:bg-[#1a2b4a]/5 transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Protected Action Reason Notice */}
          {authReason && !isAuthenticated && (
            <div className="mx-6 mt-6 bg-[#1a2b4a]/5 border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-3 text-xs flex items-start gap-2.5 font-sans">
              <Lock size={15} className="shrink-0 mt-0.5 text-[#1a2b4a]" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-[#1a2b4a] uppercase text-[10px] tracking-wider">
                  PROTECTED ARCHITECTURAL ACTION
                </span>
                <span className="text-[#1a2b4a]/80 mt-0.5">{authReason}</span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              AUTHENTICATED STATE: Client Account Details & Bookmarks Card
          ------------------------------------------------------------- */}
          {isAuthenticated && user ? (
            <div className="p-6 sm:p-8 space-y-6 text-left">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 bg-[#1a2b4a] text-white flex items-center justify-center font-serif text-2xl uppercase shadow-md">
                  {user.name ? user.name.charAt(0) : 'A'}
                </div>
                <h4 className="text-lg font-light tracking-tight text-[#1a2b4a] font-serif mt-2">
                  {user.name}
                </h4>
                <p className="text-xs text-[#1a2b4a]/60 font-sans">{user.email}</p>
              </div>

              {/* Client Specs Grid */}
              <div className="bg-white border border-[#1a2b4a]/10 p-4 space-y-3 text-xs shadow-sm">
                <div className="flex justify-between items-center text-[#1a2b4a]/70">
                  <span className="text-[10px] font-mono tracking-wider text-[#1a2b4a]/50 uppercase font-semibold">ROLE</span>
                  <span className="text-[#1a2b4a] font-bold">{user.role || 'Client Partner'}</span>
                </div>
                <div className="flex justify-between items-center text-[#1a2b4a]/70">
                  <span className="text-[10px] font-mono tracking-wider text-[#1a2b4a]/50 uppercase font-semibold">ACCOUNT ID</span>
                  <span className="text-[#1a2b4a]/70 font-mono text-[10px] truncate max-w-[180px]">{user.id}</span>
                </div>
                <div className="flex justify-between items-center text-[#1a2b4a]/70">
                  <span className="text-[10px] font-mono tracking-wider text-[#1a2b4a]/50 uppercase font-semibold">SAVED BLUEPRINTS</span>
                  <span className="text-[#1a2b4a] font-bold flex items-center gap-1">
                    <Bookmark size={12} className="text-[#1a2b4a]" />
                    {savedProjects.length} Projects Bookmarked
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#1a2b4a]/70">
                  <span className="text-[10px] font-mono tracking-wider text-[#1a2b4a]/50 uppercase font-semibold">ACTIVE COMMISSIONS</span>
                  <span className="text-[#1a2b4a] font-bold flex items-center gap-1">
                    <FileText size={12} className="text-[#1a2b4a]" />
                    {commissions.length} Requests Submitted
                  </span>
                </div>
              </div>

              {/* Saved Blueprints List */}
              {savedProjects.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#1a2b4a]/60 font-bold block">
                    SAVED ARCHITECTURAL SPECIFICATIONS:
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {savedProjects.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-white border border-[#1a2b4a]/5 text-xs">
                        <span className="font-medium text-[#1a2b4a]">{p.title}</span>
                        <span className="text-[9px] font-mono uppercase text-[#1a2b4a]/50">{p.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleReturn}
                  className="w-full py-3.5 bg-[#1a2b4a] hover:bg-[#132038] text-[#faf9f6] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>RETURN TO ARCHITECTURE PORTFOLIO</span>
                  <Compass size={13} />
                </button>
                <button
                  onClick={logout}
                  className="w-full py-3 bg-white hover:bg-[#1a2b4a]/5 text-[#1a2b4a]/70 hover:text-[#1a2b4a] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border border-[#1a2b4a]/15 flex items-center justify-center gap-2"
                >
                  <LogOut size={13} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            </div>
          ) : (
            /* -------------------------------------------------------------
                UNAUTHENTICATED STATE: Sign In & Registration Tabs
            ------------------------------------------------------------- */
            <div>
              {/* Tab Selector */}
              <div className="flex border-b border-[#1a2b4a]/10 bg-white">
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setLoginError(''); }}
                  className={`flex-1 py-3 text-xs font-sans uppercase tracking-widest font-bold transition-colors cursor-pointer border-none ${
                    activeTab === 'signin'
                      ? 'bg-[#FAF9F6] text-[#1a2b4a] border-b-2 border-[#1a2b4a]'
                      : 'bg-transparent text-[#1a2b4a]/40 hover:text-[#1a2b4a]'
                  }`}
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
                  className={`flex-1 py-3 text-xs font-sans uppercase tracking-widest font-bold transition-colors cursor-pointer border-none ${
                    activeTab === 'register'
                      ? 'bg-[#FAF9F6] text-[#1a2b4a] border-b-2 border-[#1a2b4a]'
                      : 'bg-transparent text-[#1a2b4a]/40 hover:text-[#1a2b4a]'
                  }`}
                >
                  REGISTER CLIENT
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
                      <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                        CLIENT EMAIL <span className="text-[#1a2b4a]">*</span>
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="elena.rostova@bauhaus-institute.de"
                        className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a2b4a] transition placeholder:text-[#1a2b4a]/30"
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                        PASSWORD <span className="text-[#1a2b4a]">*</span>
                      </label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a2b4a] transition placeholder:text-[#1a2b4a]/30"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-3.5 bg-[#1a2b4a] hover:bg-[#132038] text-[#FAF9F6] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2 mt-6 shadow-sm disabled:opacity-50"
                    >
                      {loginLoading ? (
                        <span>AUTHENTICATING CLIENT...</span>
                      ) : (
                        <>
                          <Lock size={12} />
                          <span>SIGN IN TO CLIENT PORTAL</span>
                        </>
                      )}
                    </button>

                    {/* Pre-Seeded Quick Login helper for testing */}
                    <div className="pt-4 border-t border-[#1a2b4a]/10 text-left">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#1a2b4a]/50 block mb-2 font-bold">
                        QUICK DEMO ACCOUNTS (POSTGRESQL SEED):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickDemo('elena.rostova@bauhaus-institute.de', 'Aethelgard2026!')}
                          className="text-left p-2 bg-white border border-[#1a2b4a]/10 hover:border-[#1a2b4a] text-[10px] text-[#1a2b4a]/80 transition cursor-pointer"
                        >
                          <span className="font-bold block text-[#1a2b4a]">Elena Rostova</span>
                          <span className="text-[9px] text-[#1a2b4a]/50">Lead Urban Planner</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickDemo('marcus@sterling-developments.co.uk', 'Aethelgard2026!')}
                          className="text-left p-2 bg-white border border-[#1a2b4a]/10 hover:border-[#1a2b4a] text-[10px] text-[#1a2b4a]/80 transition cursor-pointer"
                        >
                          <span className="font-bold block text-[#1a2b4a]">Marcus Sterling</span>
                          <span className="text-[9px] text-[#1a2b4a]/50">Managing Partner</span>
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
                      <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                        FULL NAME / CLIENT ORGANIZATION <span className="text-[#1a2b4a]">*</span>
                      </label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Dr. Julian Vance"
                        className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a2b4a] transition placeholder:text-[#1a2b4a]/30"
                      />
                    </div>

                    <div className="text-left">
                      <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                        CLIENT EMAIL <span className="text-[#1a2b4a]">*</span>
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="julian@vance-holdings.ch"
                        className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a2b4a] transition placeholder:text-[#1a2b4a]/30"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <div>
                        <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                          PASSWORD <span className="text-[#1a2b4a]">*</span>
                        </label>
                        <input
                          type="password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a2b4a] transition placeholder:text-[#1a2b4a]/30"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                          CONFIRM <span className="text-[#1a2b4a]">*</span>
                        </label>
                        <input
                          type="password"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a2b4a] transition placeholder:text-[#1a2b4a]/30"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={regLoading}
                      className="w-full py-3.5 bg-[#1a2b4a] hover:bg-[#132038] text-[#FAF9F6] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2 mt-6 shadow-sm disabled:opacity-50"
                    >
                      {regLoading ? (
                        <span>INITIALIZING ACCOUNT...</span>
                      ) : (
                        <>
                          <CheckCircle2 size={12} />
                          <span>CREATE CLIENT PARTNER PROFILE</span>
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
