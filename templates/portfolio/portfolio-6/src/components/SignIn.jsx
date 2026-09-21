import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Lock, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  ArrowLeft, 
  User, 
  Mail, 
  Key, 
  LogOut, 
  Layers
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
      setLoginError('Please provide both engineering email and access token / password.');
      return;
    }

    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (result.success) {
      handleReturn(redirectTarget);
    } else {
      setLoginError(result.error || 'Authentication handshake failed.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim()) {
      setRegError('Please provide your full engineer or enterprise name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please provide a valid business/engineering email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password parameter must contain at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Security passwords do not match. Please re-confirm.');
      return;
    }

    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setRegSuccess('Engineering node account provisioned successfully! Connecting...');
      setTimeout(() => {
        handleReturn(redirectTarget);
      }, 900);
    } else {
      setRegError(result.error || 'Provisioning failed. Please re-try.');
    }
  };

  // -------------------------------------------------------------
  // If Already Authenticated: Show Authenticated Engineer Node Card
  // -------------------------------------------------------------
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#0a0a0a] text-zinc-300">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-[#111111]/90 border border-white/10 rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-2xl box-border"
        >
          {/* Top Emerald Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#3ecf6e] to-emerald-400" />
          
          <button
            onClick={() => handleReturn('/')}
            className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-[#3ecf6e] flex items-center gap-2 mb-6 cursor-pointer bg-transparent border-none p-0 transition-colors"
          >
            <ArrowLeft size={14} /> Return to Architecture View
          </button>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-[#3ecf6e]/40 flex items-center justify-center text-[#3ecf6e] text-2xl font-mono shadow-[0_0_25px_rgba(62,207,110,0.15)]">
              <Terminal size={36} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#3ecf6e] font-bold block">
                AUTHENTICATED NODE ACTIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {user.name}
              </h2>
              <p className="text-xs font-mono text-zinc-400">{user.email}</p>
            </div>
          </div>

          <div className="mt-8 bg-black/60 border border-white/5 rounded-xl p-5 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Security Clearance</span>
              <span className="text-white font-bold">{user.role || 'Client Engineer'}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Node Identifier</span>
              <span className="text-zinc-500 text-[11px] truncate max-w-[200px]">{user.id}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Node Session State</span>
              <span className="text-[#3ecf6e] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3ecf6e] animate-pulse"></span>
                ONLINE / OPERATIONAL
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleReturn(redirectTarget)}
              className="flex-1 py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-extrabold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
            >
              <span>Continue to Node</span>
              <ArrowLeft className="rotate-180" size={14} />
            </button>
            <button
              onClick={logout}
              className="py-3.5 px-6 bg-transparent border border-zinc-700 hover:border-rose-500/60 text-zinc-400 hover:text-rose-400 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut size={14} />
              <span>Disconnect</span>
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#0a0a0a] text-zinc-300 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-[#111111]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl box-border relative"
      >
        {/* Top Glowing Header Accent */}
        <div className="bg-gradient-to-r from-emerald-600 via-[#3ecf6e] to-emerald-500 p-6 sm:p-8 text-black relative">
          <button
            onClick={() => handleReturn('/')}
            className="absolute top-5 left-5 text-xs font-mono uppercase tracking-wider text-black/80 hover:text-black flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 transition-colors font-bold"
          >
            <ArrowLeft size={13} /> Return
          </button>

          <div className="text-center pt-3">
            <div className="w-12 h-12 rounded-xl bg-black text-[#3ecf6e] border border-black/30 flex items-center justify-center font-mono font-black text-lg mx-auto mb-3 shadow-md">
              <Cpu size={22} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">
              Synthetix Portal
            </h2>
            <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-black/80 mt-1">
              Enterprise Access Management
            </p>
          </div>

          {authReason && (
            <div className="mt-4 bg-black/85 text-emerald-300 border border-black/40 px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-start gap-2 text-left">
              <Lock size={14} className="shrink-0 mt-0.5 text-emerald-400" />
              <span>{authReason}</span>
            </div>
          )}
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-zinc-800/80 bg-black/40">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setLoginError(''); }}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer border-none ${
              activeTab === 'signin'
                ? 'bg-[#111111] text-[#3ecf6e] border-b-2 border-[#3ecf6e]'
                : 'bg-transparent text-zinc-500 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer border-none ${
              activeTab === 'register'
                ? 'bg-[#111111] text-[#3ecf6e] border-b-2 border-[#3ecf6e]'
                : 'bg-transparent text-zinc-500 hover:text-white'
            }`}
          >
            Provision Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {activeTab === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-start gap-2">
                  <ShieldAlert size={14} className="shrink-0 mt-0.5 text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block mb-1.5">
                  BUSINESS EMAIL
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full box-border rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition placeholder-zinc-700 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block mb-1.5">
                  ACCESS TOKEN / PASSWORD
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full box-border rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition placeholder-zinc-700 font-mono"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-none"
                >
                  {loginLoading ? (
                    <span>Authenticating Node...</span>
                  ) : (
                    <>
                      <span>SIGN IN TO PORTAL</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 text-center border-t border-zinc-900">
                <span className="text-[10px] font-mono text-zinc-600 block">
                  DEMO ACCESS: alex@example.com (Synthetix2026!)
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {regError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-start gap-2">
                  <ShieldAlert size={14} className="shrink-0 mt-0.5 text-rose-400" />
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-start gap-2">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-400" />
                  <span>{regSuccess}</span>
                </div>
              )}

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block mb-1.5">
                  ENGINEER / FULL NAME
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Morgan Reed"
                  className="w-full box-border rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition placeholder-zinc-700"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block mb-1.5">
                  BUSINESS EMAIL
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="m.reed@cloudmesh.io"
                  className="w-full box-border rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition placeholder-zinc-700 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block mb-1.5">
                  SECURITY KEY / PASSWORD
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full box-border rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition placeholder-zinc-700 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block mb-1.5">
                  CONFIRM SECURITY KEY
                </label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat security key"
                  className="w-full box-border rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition placeholder-zinc-700 font-mono"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-none"
                >
                  {regLoading ? (
                    <span>Provisioning Node Account...</span>
                  ) : (
                    <>
                      <span>CREATE CLIENT ACCOUNT</span>
                      <span>→</span>
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
