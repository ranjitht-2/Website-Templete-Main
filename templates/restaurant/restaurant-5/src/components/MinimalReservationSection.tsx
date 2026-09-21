import React, { useState, useEffect } from 'react';
import { NoireReservationState } from '../types';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

interface MinimalReservationSectionProps {
  onReservationSubmitted: (res: NoireReservationState) => void;
  onRequireAuth?: (reason: string, target: string) => void;
}

export const MinimalReservationSection: React.FC<MinimalReservationSectionProps> = ({
  onReservationSubmitted,
  onRequireAuth
}) => {
  const { user, isAuthenticated } = useAuth();
  const todayStr = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<NoireReservationState>({
    date: todayStr,
    time: '20:00',
    guests: '2',
    name: '',
    phone: '',
    email: '',
    specialNote: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Restore saved reservation parameters if present and auto-populate user details
  useEffect(() => {
    const saved = sessionStorage.getItem('restaurant_5_pending_reservation');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({
          ...prev,
          date: parsed.date || prev.date,
          time: parsed.time || prev.time,
          guests: parsed.guests || prev.guests,
          name: parsed.name || (user ? user.name : prev.name),
          phone: parsed.phone || prev.phone,
          email: parsed.email || (user ? user.email : prev.email),
          specialNote: parsed.specialNote || prev.specialNote,
        }));
        if (isAuthenticated && user) {
          setSubmitted(true);
          sessionStorage.removeItem('restaurant_5_pending_reservation');
        }
      } catch (e) {
        console.error('Error restoring pending reservation:', e);
      }
    } else if (isAuthenticated && user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: prev.phone || '+91 98401 23456'
      }));
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      sessionStorage.setItem('restaurant_5_pending_reservation', JSON.stringify(form));
      if (onRequireAuth) {
        onRequireAuth(
          'Please sign in or apply for a NOIRÉ Black Card membership to confirm your table reservation.',
          'reservation'
        );
      }
      return;
    }

    setSubmitted(true);
    sessionStorage.removeItem('restaurant_5_pending_reservation');
    onReservationSubmitted(form);
  };

  return (
    <section id="reservation" className="relative w-full bg-[#171512] text-[#F3EBDD] py-24 md:py-36 px-6 md:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs text-[#B87552] tracking-widest uppercase block mb-4 font-bold">
          10 // RESERVATION
        </span>

        <h2 className="font-display font-black tracking-tighter text-5xl sm:text-7xl lg:text-8xl uppercase text-[#F3EBDD] leading-[0.88] mb-12">
          YOUR TABLE <br />
          <span className="text-[#B87552]">AWAITS.</span>
        </h2>

        {submitted ? (
          <div className="p-8 bg-[#211D18] border border-[#B87552] rounded-sm text-center shadow-md">
            <span className="font-mono text-xs text-[#B87552] tracking-widest uppercase block mb-2 font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> [ RESERVATION CONFIRMED &amp; LINKED TO PATRON ACCOUNT ]
            </span>
            <h3 className="font-display font-bold text-2xl text-[#F3EBDD] mb-4">
              WE HAVE RESERVED YOUR TABLE AT NOIRÉ
            </h3>
            <p className="font-mono text-xs text-[#B8AA98] max-w-md mx-auto mb-2 font-bold">
              PATRON: <span className="text-[#F3EBDD]">{user?.name} ({user?.role})</span>
            </p>
            <p className="font-mono text-xs text-[#B8AA98] max-w-md mx-auto mb-6 font-bold">
              DATE: {form.date} &nbsp;|&nbsp; TIME: {form.time} &nbsp;|&nbsp; GUESTS: {form.guests}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="font-mono text-xs text-[#B87552] underline hover:text-[#F3EBDD]"
            >
              MAKE ANOTHER RESERVATION
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* DATE */}
              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold">
                  DATE
                </label>
                <input
                  type="date"
                  value={form.date}
                  min={todayStr}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                  className="bg-transparent border-b border-[rgba(243,235,221,0.14)] py-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
                />
              </div>

              {/* TIME */}
              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold">
                  TIME
                </label>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="bg-[#171512] border-b border-[rgba(243,235,221,0.14)] py-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
                >
                  <option value="19:00">19:00 PM</option>
                  <option value="19:30">19:30 PM</option>
                  <option value="20:00">20:00 PM</option>
                  <option value="20:30">20:30 PM</option>
                  <option value="21:00">21:00 PM</option>
                  <option value="21:30">21:30 PM</option>
                  <option value="22:00">22:00 PM</option>
                </select>
              </div>

              {/* GUESTS */}
              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold">
                  GUESTS
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="bg-[#171512] border-b border-[rgba(243,235,221,0.14)] py-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
                >
                  <option value="1">1 GUEST</option>
                  <option value="2">2 GUESTS</option>
                  <option value="4">4 GUESTS</option>
                  <option value="6">6 GUESTS</option>
                  <option value="8">8+ PRIVATE DINING</option>
                </select>
              </div>
            </div>

            {/* Name & Phone Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="VIKRAM RAJ"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-transparent border-b border-[rgba(243,235,221,0.14)] py-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs text-[#B8AA98] tracking-widest uppercase font-bold">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="bg-transparent border-b border-[rgba(243,235,221,0.14)] py-3 font-mono text-sm text-[#F3EBDD] focus:border-[#B87552] outline-none transition-colors"
                />
              </div>
            </div>

            {/* CTA Button using Copper Accent with Hover Lift and Expansion */}
            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                className="btn-copper group relative overflow-hidden text-sm px-10 py-5 w-64 text-center transition-all duration-500 ease-out hover:w-full"
              >
                <span className="relative z-10 group-hover:tracking-[0.3em] transition-all duration-300">
                  {isAuthenticated ? 'CONFIRM RESERVATION →' : 'SIGN IN & RESERVE →'}
                </span>
              </button>
              {!isAuthenticated && (
                <span className="font-mono text-[11px] text-[#B8AA98]">
                  * Requires NOIRÉ Member authentication
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
