import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ship, Anchor, Compass, Navigation, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple } from 'lucide-react';

export default function OceanlinkAuth({ mode, setMode, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(mode === 'signin' ? 'OceanLink Vessel Clearance Authorized!' : 'Maritime Port Account Registered!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'OCEANLINK' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] text-white font-sans">
      {/* Maritime Vessel Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-b from-cyan-950/80 via-slate-900 to-slate-950 border-b border-cyan-500/20">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-900/40 transition-all">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Ship className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-widest text-cyan-400 font-mono">OCEANLINK</h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                MARITIME PORT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Ocean Container Shipping & Harbor Berth Manifest</p>
          </div>
        </div>

        {/* Vessel Berth Strip */}
        <div className="mt-4 p-2.5 bg-slate-900 border border-cyan-500/20 rounded-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300">
            <Anchor className="w-4 h-4 text-cyan-400" />
            <span>VESSEL: MV-ATLANTIS V</span>
          </div>
          <span className="text-cyan-400 font-bold">PORT BERTH #04A</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold font-mono tracking-wider rounded-lg transition-all ${
              mode === 'signin' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            MARITIME SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold font-mono tracking-wider rounded-lg transition-all ${
              mode === 'signup' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            CREATE HARBOR PASS
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-7 space-y-4">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-cyan-950 border border-cyan-500 rounded-xl text-cyan-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono font-medium text-cyan-400/90 mb-1">CAPTAIN / AGENT NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Capt. Soren Hansen"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono font-medium text-cyan-400/90 mb-1">MARITIME PORT EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vessel@oceanlink.marine"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-medium text-cyan-400/90 mb-1">NAUTICAL ACCESS PIN</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-ignore absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-ignore w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black font-mono text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
              <>
                <Ship className="w-4 h-4" />
                {mode === 'signin' ? 'CLEAR VESSEL ENTRY' : 'REGISTER MARITIME PASS'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2 font-mono">
            <Chrome className="w-4 h-4 text-cyan-400" /> Google PortPass
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2 font-mono">
            <Apple className="w-4 h-4 text-slate-200" /> Apple OceanID
          </button>
        </div>
      </div>
    </div>
  );
}
