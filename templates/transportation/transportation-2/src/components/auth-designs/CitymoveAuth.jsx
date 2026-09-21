import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Bike, QrCode, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple } from 'lucide-react';

export default function CitymoveAuth({ mode, setMode, onClose, onLogin }) {
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
      setSuccess(mode === 'signin' ? 'CityMove Scooter Pass Unlocked!' : 'CityMove Rider Account Ready!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'CITYMOVE' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-neutral-950 border-4 border-lime-400 rounded-3xl shadow-[8px_8px_0px_0px_#a3e635] text-white font-sans">
      {/* Neo Brutalist Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-r from-lime-400 to-emerald-400 text-neutral-950 border-b-4 border-black">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-xl bg-black text-lime-400 hover:bg-neutral-900 border-2 border-black transition-all">
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-black text-lime-400 border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Bike className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-black tracking-tight text-neutral-950">CITYMOVE</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-black text-lime-400 uppercase">
                ⚡ LIVE RIDES
              </span>
            </div>
            <p className="text-xs text-neutral-900 font-bold mt-0.5">Shared E-Scooters, Smart Bikes & Micro-Transit</p>
          </div>
        </div>

        {/* QR Scanner Strip */}
        <div className="mt-4 p-2.5 bg-black text-lime-300 border-2 border-black rounded-xl flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-lime-400" />
            <span>SCAN TO UNLOCK SCOOTER</span>
          </div>
          <span className="text-emerald-400">1,240 BIKES ACTIVE</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-black rounded-2xl border-2 border-black">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-black tracking-wider rounded-xl transition-all ${
              mode === 'signin' ? 'bg-lime-400 text-black shadow-[2px_2px_0px_0px_#000]' : 'text-neutral-300 hover:text-white'
            }`}
          >
            RIDER SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-black tracking-wider rounded-xl transition-all ${
              mode === 'signup' ? 'bg-lime-400 text-black shadow-[2px_2px_0px_0px_#000]' : 'text-neutral-300 hover:text-white'
            }`}
          >
            GET FREE RIDE
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-7 space-y-4 bg-neutral-950">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-lime-950 border-2 border-lime-400 rounded-xl text-lime-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-black text-lime-400 uppercase tracking-wider mb-1">Rider Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Taylor Chen"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border-2 border-neutral-800 focus:border-lime-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-black text-lime-400 uppercase tracking-wider mb-1">Rider Email or Phone</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rider@citymove.io"
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border-2 border-neutral-800 focus:border-lime-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-lime-400 uppercase tracking-wider mb-1">Passcode / PIN</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-neutral-900 border-2 border-neutral-800 focus:border-lime-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-ignore absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-lime-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-ignore w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-black font-black text-xs tracking-widest uppercase rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
              <>
                <Sparkles className="w-4 h-4" />
                {mode === 'signin' ? 'UNLOCK CITY SCOOTER PASS' : 'CREATE RIDER MEMBERSHIP'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border-2 border-neutral-800 hover:border-lime-400 rounded-xl text-xs text-neutral-200 font-bold flex items-center justify-center gap-2">
            <Chrome className="w-4 h-4 text-lime-400" /> Google Ride
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border-2 border-neutral-800 hover:border-lime-400 rounded-xl text-xs text-neutral-200 font-bold flex items-center justify-center gap-2">
            <Apple className="w-4 h-4 text-white" /> Apple Pass
          </button>
        </div>
      </div>
    </div>
  );
}
