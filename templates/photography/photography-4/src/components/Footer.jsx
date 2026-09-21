import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { useAuth } from '../context/AuthContext';
import ScrollReveal from './ScrollReveal';

export default function Footer({ onOpenSignIn }) {
  const { user, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  useEffect(() => {
    if (user) {
      if (!name) setName(user.name || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user]);

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      if (onOpenSignIn) {
        onOpenSignIn('Sign in or register to submit a couture wedding inquiry and receive our destination prospectus', 'contact');
      }
      return;
    }

    if (!name || !email || !msg) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setMsg('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <footer id="contact" className="bg-black text-[#f5f4f1] border-t border-white/5 w-full">
      
      {/* Instagram / Social Strip */}
      <div className="w-full border-b border-white/5 py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-baseline mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-sans">
              INSTAGRAM CHRONICLES
            </span>
            <a 
              href={siteConfig.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[9px] uppercase tracking-widest text-[#c5a880] hover:text-white transition-colors duration-300 font-sans"
            >
              @edenrose.wedding
            </a>
          </div>
          
          {/* Horizontal Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {siteConfig.instagram.map((img, idx) => (
              <div key={idx} className="relative overflow-hidden aspect-square border border-white/5 bg-neutral-900 shadow-lg">
                <div 
                  className="w-full h-full bg-cover bg-center grayscale duration-700 ease-out hover:scale-105 hover:grayscale-0"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Contact Form Section */}
      <div className="py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Heading */}
          <div className="w-full lg:w-1/2 space-y-6">
            <ScrollReveal>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880]">
                BEGIN THE CONVERSATION
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-wide leading-tight max-w-lg text-[#c5a880]">
                Let's Tell Your Story.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed tracking-wide max-w-md">
                Based in Paris & New York, photographing luxury editorials and intimate destination weddings globally. We limit our yearly bookings to focus intensely on each client's unique couture legacy.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Form with state */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 py-16"
                >
                  <div className="w-12 h-12 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] text-xl">
                    &check;
                  </div>
                  <h4 className="text-lg font-serif font-light text-[#c5a880]">Inquiry Received</h4>
                  <p className="text-xs text-neutral-400 max-w-xs font-sans leading-relaxed">
                    Thank you {user?.name || name}. The studio concierge will follow up with our complete destination pricing and calendar prospectus at {user?.email || email} within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name" 
                        className="w-full bg-transparent border-b border-white/10 pb-3 text-sm text-[#f5f4f1] focus:outline-none focus:border-[#c5a880] transition-colors duration-300 font-sans"
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address" 
                        className="w-full bg-transparent border-b border-white/10 pb-3 text-sm text-[#f5f4f1] focus:outline-none focus:border-[#c5a880] transition-colors duration-300 font-sans"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <textarea 
                      required
                      rows="4"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Share your wedding details (Date, Destination, Vision)..." 
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-sm text-[#f5f4f1] focus:outline-none focus:border-[#c5a880] transition-colors duration-300 font-sans resize-none"
                    />
                  </div>

                  <div>
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full py-4 rounded-full bg-[#f5f4f1] hover:bg-white text-black text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-500 cursor-pointer border-none shadow-md"
                    >
                      {status === 'loading' 
                        ? 'Dispatching Inquiry...' 
                        : isAuthenticated 
                          ? 'Send Couture Inquiry' 
                          : 'Sign In & Send Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Under footer details */}
      <div className="border-t border-white/5 py-12 bg-black text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left font-sans">
            <span className="uppercase tracking-[0.2em] text-[#c5a880]">Eden Rose Studio</span>
            <span className="hidden md:inline text-neutral-800">|</span>
            <span className="tracking-wide">&copy; {new Date().getFullYear()} EDEN ROSE. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-8 font-sans">
            <a href="#about" className="hover:text-[#f5f4f1] transition-colors duration-300 tracking-wider">About</a>
            <a href="#portfolio" className="hover:text-[#f5f4f1] transition-colors duration-300 tracking-wider">Portfolio</a>
            <a href={`mailto:${siteConfig.socials.email}`} className="hover:text-[#f5f4f1] transition-colors duration-300 tracking-wider">Inquiries</a>
          </div>

        </div>
      </div>

    </footer>
  );
}
