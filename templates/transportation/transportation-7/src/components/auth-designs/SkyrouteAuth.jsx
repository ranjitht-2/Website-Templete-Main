import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Globe, Shield, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple, Award } from 'lucide-react';

export default function SkyrouteAuth({ mode, setMode, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [frequentFlyerTier, setFrequentFlyerTier] = useState('Platinum Executive');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(mode === 'signin' ? 'Welcome aboard SkyRoute Airlines!' : 'SkyRoute Mileage Account Created!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'SKYROUTE' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-slate-950 border border-sky-500/30 rounded-3xl shadow-[0_0_50px_rgba(14,165,233,0.15)] text-white font-sans">
      {/* Luxury First Class Flight Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-br from-sky-950/80 via-slate-900 to-indigo-950/60 border-b border-sky-500/20">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 border border-sky-500/20 text-sky-300 hover:text-white hover:bg-sky-900/40 transition-all">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-sky-500/20 border border-sky-400/30 rounded-2xl text-sky-400">
            <Plane className="w-7 h-7 -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-widest text-white">SKYROUTE</h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
                Airlines Club
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Global Passenger Check-In & Flight Miles Club</p>
          </div>
        </div>

        {/* Boarding Pass Flight Strip */}
        <div className="mt-4 p-2.5 bg-slate-900/90 border border-sky-500/20 rounded-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-300">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>FLIGHT SR-702 • DXB ✈️ LHR</span>
          </div>
          <span className="text-emerald-400 font-bold">CABIN: FIRST CLASS</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-slate-950 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
              mode === 'signin' ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            PASSENGER CHECK-IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
              mode === 'signup' ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            JOIN SKYCLUB
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-7 space-y-4">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-sky-950 border border-sky-500 rounded-xl text-sky-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-sky-300 mb-1">Passenger Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Lord Julian Hastings"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-sky-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-sky-300 mb-1">SkyClub Passenger Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="passenger@skyroute.aero"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-sky-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-sky-300 mb-1">Frequent Flyer Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-slate-900 border border-slate-800 focus:border-sky-400 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-ignore absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-ignore w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
              <>
                <Plane className="w-4 h-4 -rotate-45" />
                {mode === 'signin' ? 'ENTER PASSENGER LOUNGE' : 'ACTIVATE SKYROUTE MILES'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2">
            <Chrome className="w-4 h-4 text-sky-400" /> Google SkyPass
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2">
            <Apple className="w-4 h-4 text-slate-200" /> Apple Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
