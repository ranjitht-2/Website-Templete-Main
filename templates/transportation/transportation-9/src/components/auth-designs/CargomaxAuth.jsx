import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Box, Barcode, Container, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple } from 'lucide-react';

export default function CargomaxAuth({ mode, setMode, onClose, onLogin }) {
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
      setSuccess(mode === 'signin' ? 'CargoMax Logistics Clearance Verified!' : 'Shipper Manifest Account Created!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'CARGOMAX' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-neutral-950 border-2 border-amber-500/40 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.15)] text-white font-sans">
      {/* Industrial Heavy Duty Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-b from-amber-950/80 via-neutral-900 to-neutral-950 border-b border-amber-500/20">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 hover:text-white hover:bg-amber-900/40 transition-all">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-amber-500/20 border border-amber-400/40 rounded-2xl text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-widest text-amber-400 font-mono">CARGOMAX</h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                FREIGHT HQ
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">Heavy Logistics & Customs Manifest Portal</p>
          </div>
        </div>

        {/* Barcode Strip */}
        <div className="mt-4 p-2.5 bg-neutral-900 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-amber-300">
            <Barcode className="w-4 h-4 text-amber-400" />
            <span>MANIFEST: CGX-9920-IN</span>
          </div>
          <span className="text-neutral-400">18.5 TONS RATED</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold font-mono tracking-wider rounded-lg transition-all ${
              mode === 'signin' ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            SHIPPER SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold font-mono tracking-wider rounded-lg transition-all ${
              mode === 'signup' ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            CREATE FREIGHT ID
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-7 space-y-4">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-amber-950 border border-amber-500 rounded-xl text-amber-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono font-medium text-amber-400/90 mb-1">CARGO OFFICER / COMPANY NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Vanguard Freight Ltd."
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono font-medium text-amber-400/90 mb-1">FREIGHT OPERATOR EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="logistics@cargomax.com"
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-medium text-amber-400/90 mb-1">CUSTOMS ACCESS PIN</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-ignore absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-ignore w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-neutral-950 font-black font-mono text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
              <>
                <ShieldCheck className="w-4 h-4" />
                {mode === 'signin' ? 'VERIFY FREIGHT MANIFEST' : 'REGISTER LOGISTICS ACCOUNT'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 rounded-xl text-xs text-neutral-300 flex items-center justify-center gap-2 font-mono">
            <Chrome className="w-4 h-4 text-amber-400" /> Google CargoID
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 rounded-xl text-xs text-neutral-300 flex items-center justify-center gap-2 font-mono">
            <Apple className="w-4 h-4 text-slate-200" /> Apple Cargo
          </button>
        </div>
      </div>
    </div>
  );
}
