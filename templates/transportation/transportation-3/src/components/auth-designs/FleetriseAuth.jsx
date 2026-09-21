import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Activity, Radio, Cpu, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple } from 'lucide-react';

export default function FleetriseAuth({ mode, setMode, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [fleetRole, setFleetRole] = useState('Logistics Dispatcher');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(mode === 'signin' ? 'FleetRise Telemetry Uplink Established!' : 'Fleet Operator Registered to Network!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'FLEETRISE' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.15)] text-white font-mono">
      {/* Telemetry HUD Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-b from-cyan-950/70 via-slate-900 to-slate-950 border-b border-cyan-500/20">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-900/40 transition-all">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Truck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-widest text-cyan-400">FLEETRISE</h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                TELEMETRY OPS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Central Fleet Diagnostics & GPS Fleet Command</p>
          </div>
        </div>

        {/* Telemetry Coordinates Pill */}
        <div className="mt-4 p-2.5 bg-slate-900/90 border border-cyan-500/20 rounded-xl flex items-center justify-between text-[11px] text-cyan-300">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-ping text-cyan-400" />
            <span>GPS Ping: 12.9716° N, 77.5946° E</span>
          </div>
          <span className="text-slate-400">Status: 42 Active Fleets</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
              mode === 'signin' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            DISPATCH SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
              mode === 'signup' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            REGISTER FLEET
          </button>
        </div>
      </div>

      {/* Form Area */}
      <div className="p-7 space-y-4 font-sans">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-cyan-950 border border-cyan-500 rounded-xl text-cyan-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono font-medium text-cyan-400 mb-1">OPERATOR NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Officer J. Reynolds"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono font-medium text-cyan-400 mb-1">COMMAND DISPATCH EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dispatch@fleetrise.io"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-medium text-cyan-400 mb-1">TELEMETRY ACCESS CIPHER</label>
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
            className="auth-ignore w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
              <>
                <Cpu className="w-4 h-4" />
                {mode === 'signin' ? 'AUTHENTICATE DISPATCH TERMINAL' : 'INITIALIZE FLEET REGISTRATION'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2">
            <Chrome className="w-4 h-4 text-cyan-400" /> Google SSO
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2">
            <Apple className="w-4 h-4 text-slate-200" /> Apple FleetPass
          </button>
        </div>
      </div>
    </div>
  );
}
