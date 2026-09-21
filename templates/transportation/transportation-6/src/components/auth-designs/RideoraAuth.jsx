import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Navigation, Smartphone, KeyRound, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple } from 'lucide-react';

export default function RideoraAuth({ mode, setMode, onClose, onLogin }) {
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
      setSuccess(mode === 'signin' ? 'Rideora Passenger Authenticated!' : 'Rideora Account Activated!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'RIDEORA' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-neutral-950 border border-yellow-500/40 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.2)] text-white font-sans">
      {/* Smartphone Cab App Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-b from-yellow-950/70 via-neutral-900 to-neutral-950 border-b border-yellow-500/20">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-yellow-500/30 text-yellow-400 hover:text-white hover:bg-yellow-900/40 transition-all">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-yellow-500/20 border border-yellow-400/40 rounded-2xl text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <Car className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-widest text-yellow-400">RIDEORA</h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 uppercase">
                CAB ENGINE
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">Instant Cab Hailing & Airport Ride Booking</p>
          </div>
        </div>

        {/* Live Driver Nearby Pill */}
        <div className="mt-4 p-2.5 bg-neutral-900 border border-yellow-500/20 rounded-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-yellow-300">
            <Navigation className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>Driver Nearby: 3 mins away</span>
          </div>
          <span className="text-emerald-400 font-bold">OTP READY: #4921</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-black tracking-wider rounded-lg transition-all ${
              mode === 'signin' ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            RIDER SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-black tracking-wider rounded-lg transition-all ${
              mode === 'signup' ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            CREATE PASSENGER ID
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-7 space-y-4">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-yellow-950 border border-yellow-500 rounded-xl text-yellow-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-yellow-400/90 mb-1">Rider Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Karan Sharma"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-yellow-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-yellow-400/90 mb-1">Registered Phone or Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rider@rideora.cab"
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-yellow-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-yellow-400/90 mb-1">Ride Security PIN</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-yellow-400 rounded-xl text-xs text-white placeholder:text-neutral-600 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-ignore absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-yellow-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-ignore w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-black text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-yellow-400/25 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
              <>
                <Car className="w-4 h-4 fill-current" />
                {mode === 'signin' ? 'LOG IN & HAIL CAB' : 'REGISTER FOR RIDEORA PASS'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 rounded-xl text-xs text-neutral-300 flex items-center justify-center gap-2">
            <Chrome className="w-4 h-4 text-yellow-400" /> Google CabPass
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 rounded-xl text-xs text-neutral-300 flex items-center justify-center gap-2">
            <Apple className="w-4 h-4 text-slate-200" /> Apple Pay Ride
          </button>
        </div>
      </div>
    </div>
  );
}
