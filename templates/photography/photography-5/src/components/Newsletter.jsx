import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { siteConfig } from '../data/config';

export default function Newsletter({ onOpenSignIn }) {
  const { user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      if (onOpenSignIn) {
        onOpenSignIn('Sign in or register to acquire archival prints and receive studio dispatches', 'artist');
      }
      return;
    }

    if (!email || !agreed) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setAgreed(false);
    }, 1200);
  };

  return (
    <section id="artist" className="py-24 md:py-32 bg-[#0a0a0a] text-[#f5f4f1] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide leading-tight max-w-lg">
              {siteConfig.newsletter.heading}
            </h2>
            <div className="w-12 h-[1px] bg-[#6b1d2f] mt-8" />
          </div>

          {/* Right Column: Input & Actions */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {!isAuthenticated && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-lock text-[#6b1d2f]"></i>
                    <span>Patron authentication required</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenSignIn && onOpenSignIn('Sign in to acquire prints', 'artist')}
                    className="text-xs font-bold text-[#f5f4f1] underline cursor-pointer bg-transparent border-none"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Input wrapper with bottom border focus animation */}
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={siteConfig.newsletter.placeholder}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-[#f5f4f1] text-sm tracking-widest placeholder-neutral-500 focus:outline-none focus:border-white transition-colors duration-500 font-sans"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#6b1d2f] group-focus-within:w-full transition-all duration-500" />
              </div>

              {/* Consent checkbox */}
              <label className="flex items-center space-x-3 cursor-pointer select-none">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-sm border transition-all duration-300 flex items-center justify-center ${
                    agreed ? 'border-[#6b1d2f] bg-[#6b1d2f]' : 'border-white/30 bg-transparent'
                  }`}>
                    {agreed && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-neutral-400 font-sans tracking-wide">
                  {siteConfig.newsletter.consentText}
                </span>
              </label>

              {/* Submit Button & Microinteraction */}
              <div className="flex items-center space-x-6 pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`px-8 py-3 rounded-full border text-xs uppercase tracking-[0.2em] font-sans transition-all duration-500 cursor-pointer ${
                    status === 'loading'
                      ? 'border-neutral-700 text-neutral-500 bg-neutral-900 cursor-not-allowed'
                      : 'border-[#f5f4f1] text-[#0a0a0a] bg-[#f5f4f1] hover:bg-transparent hover:text-[#f5f4f1]'
                  }`}
                >
                  {status === 'loading' ? 'Sending...' : (isAuthenticated ? siteConfig.newsletter.buttonText : 'Sign In & Subscribe')}
                </button>

                {/* Status Micro-feedback */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-xs text-green-400 font-sans tracking-wide"
                    >
                      <i className="fa-solid fa-circle-check mr-2"></i> Archival dispatch subscribed
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-xs text-[#6b1d2f] font-sans tracking-wide"
                    >
                      <i className="fa-solid fa-circle-xmark mr-2"></i> Please provide email & agreement
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
