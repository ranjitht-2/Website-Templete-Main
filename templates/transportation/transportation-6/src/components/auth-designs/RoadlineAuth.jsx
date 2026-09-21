import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Ticket, MapPin, Calendar, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, X, Chrome, Apple } from 'lucide-react';

export default function RoadlineAuth({ mode, setMode, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [preferredSeat, setPreferredSeat] = useState('Window Seat A4');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(mode === 'signin' ? 'Roadline Passenger Pass Verified!' : 'Roadline Traveler Profile Registered!');
      setTimeout(() => {
        if (onLogin) onLogin({ name: fullName || email.split('@')[0], email, template: 'ROADLINE' });
        if (onClose) onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden bg-slate-900 border border-rose-500/30 rounded-3xl shadow-2xl shadow-rose-950/50 text-white font-sans">
      {/* Ticket Header */}
      <div className="relative p-7 pb-5 bg-gradient-to-br from-rose-900/60 via-slate-900 to-amber-950/40 border-b border-rose-500/20">
        {onClose && (
          <button onClick={onClose} className="auth-ignore absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-rose-500/20 text-rose-300 hover:text-white hover:bg-rose-900/40 transition-all">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-rose-600/20 border border-rose-500/30 rounded-2xl text-rose-400">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold tracking-wide text-rose-400">ROADLINE</h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                Coach Express
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Intercity Bus Reservation & Passenger Check-In</p>
          </div>
        </div>

        {/* Boarding Badge */}
        <div className="mt-4 p-3 bg-slate-950/70 border border-rose-500/20 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-400">
            <Ticket className="w-4 h-4" />
            <span className="font-semibold">Terminal Gate #03</span>
          </div>
          <span className="text-slate-400 font-mono">Express Coach 902</span>
        </div>

        {/* Tab switchers */}
        <div className="flex p-1 mt-4 bg-slate-950/80 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
              mode === 'signin' ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            PASSENGER SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`auth-ignore flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
              mode === 'signup' ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            BOOKING SIGN UP
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-7 space-y-4">
        {success && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-rose-950 border border-rose-500 rounded-xl text-rose-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-rose-300 mb-1">Passenger Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Marcus Vance"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-rose-500 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-rose-300 mb-1">Passenger Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="passenger@roadline.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-rose-500 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-rose-300 mb-1">Ticket Passcode</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-rose-500 rounded-xl text-xs text-white placeholder:text-slate-600 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-ignore absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-rose-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-ignore w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
              <>
                <Ticket className="w-4 h-4" />
                {mode === 'signin' ? 'VERIFY BOARDING PASS' : 'CONFIRM ROADLINE ACCOUNT'}
              </>
            )}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-950 border border-slate-800 hover:border-rose-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2">
            <Chrome className="w-4 h-4 text-rose-400" /> Google Sign-In
          </button>
          <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} })} className="auth-ignore flex-1 py-2 bg-slate-950 border border-slate-800 hover:border-rose-500/50 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2">
            <Apple className="w-4 h-4 text-slate-200" /> Apple Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
