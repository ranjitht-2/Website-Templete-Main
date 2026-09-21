import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, BatteryCharging, Shield, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple, Sparkles } from 'lucide-react';

export default function VoltwayAuth({ mode, setMode, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [evModel, setEvModel] = useState('Voltway Ion EV');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(mode === 'signin' ? 'Voltway EV Link Authenticated!' : 'Voltway EV Driver Account Created!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'VOLTWAY' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-neutral-950 border-2 border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] text-white font-sans">
      {/* Top Cyber Grid Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-b from-emerald-950/80 via-neutral-900 to-neutral-950 border-b border-emerald-500/20">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-500/20 transition-all">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-widest text-emerald-400 font-mono">VOLTWAY</h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                EV Supercharger Hub
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">Electric Mobility & Battery Telemetry Portal</p>
          </div>
        </div>

        {/* Live Battery / EV status bar */}
        <div className="mt-4 p-2.5 bg-neutral-900/90 border border-emerald-500/20 rounded-xl flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span>Grid Node: VLT-Online</span>
          </div>
          <span className="text-neutral-400">150kW DC Fast Ready</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold font-mono tracking-wider rounded-lg transition-all ${
              mode === 'signin' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            DRIVER SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold font-mono tracking-wider rounded-lg transition-all ${
              mode === 'signup' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            CREATE EV PASS
          </button>
        </div>
      </div>

      {/* Form Body */}
      <div className="p-7 space-y-4">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono font-medium text-emerald-400/90 mb-1">EV OPERATOR NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-emerald-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono font-medium text-emerald-400/90 mb-1">EV ACCOUNT EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver@voltway.eco"
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-emerald-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none transition-colors"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono font-medium text-emerald-400/90 mb-1">PRIMARY EV MODEL</label>
              <select
                value={evModel}
                onChange={(e) => setEvModel(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-emerald-400 rounded-xl text-xs text-white outline-none"
              >
                <option value="Voltway Ion EV">Voltway Ion EV (480 km Range)</option>
                <option value="Voltway Nexus Truck">Voltway Nexus Commercial (650 km Range)</option>
                <option value="Voltway Aero Shuttle">Voltway Aero Urban Shuttle</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono font-medium text-emerald-400/90 mb-1">SECURITY ACCESS KEY</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-emerald-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none transition-colors"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-ignore absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-emerald-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-ignore w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black font-mono text-xs tracking-wider uppercase rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                {mode === 'signin' ? 'CONNECT TO VOLTWAY GRID' : 'GENERATE EV CHARGE ID'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 rounded-xl text-xs text-neutral-300 flex items-center justify-center gap-2">
            <Chrome className="w-4 h-4 text-emerald-400" /> Google FastPass
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 rounded-xl text-xs text-neutral-300 flex items-center justify-center gap-2">
            <Apple className="w-4 h-4 text-neutral-200" /> Apple ChargeID
          </button>
        </div>
      </div>
    </div>
  );
}
