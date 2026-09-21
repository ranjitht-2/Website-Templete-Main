import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ContactSection({ onOpenSignIn }) {
  const { user, isAuthenticated } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      if (onOpenSignIn) {
        onOpenSignIn('Please sign in or create an account to submit your project inquiry and receive custom rates', 'contact');
      }
      return;
    }

    // Authenticated user submission
    setSubmitted(true);
    setTimeout(() => {
      // Keep name/email, reset details
      setDetails('');
    }, 3000);
  };

  return (
    <section 
      id="contact" 
      className="w-full max-w-full overflow-x-hidden bg-white py-20 sm:py-28 px-4 sm:px-8 text-neutral-900 font-['Poppins',sans-serif]"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
        {/* Left Column info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto"
        >
          <span className="text-[#ff7a52] text-xs font-bold tracking-[3px] uppercase block mb-3">
            Pre-Booking & Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6 tracking-tight text-neutral-900 font-['Playfair_Display',serif]">
            Let's create something beautiful together.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-700 mb-8 font-light">
            Looking to book an editorial campaign, private headshots, or a creative brand partnership? Leave a brief message and we'll reply with a custom proposal and availability rates.
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs uppercase text-neutral-500 tracking-wider">Studio Email</span>
              <p className="mt-1 text-base sm:text-lg font-medium text-neutral-900">hello@lume-studio.com</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-5 mt-2">
              <a href="#" className="text-neutral-900 text-xl hover:text-[#ff7a52] transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-900 text-xl hover:text-[#ff7a52] transition-colors">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="text-neutral-900 text-xl hover:text-[#ff7a52] transition-colors">
                <i className="fa-brands fa-pinterest"></i>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto"
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-[#f9f9fb] p-6 sm:p-10 rounded-2xl border border-black/5 shadow-sm"
          >
            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                <i className="fa-solid fa-circle-check mt-0.5 text-emerald-600 text-sm"></i>
                <div>
                  <strong className="block font-semibold">Inquiry Dispatched Successfully!</strong>
                  <span>Thank you {user?.name || fullName}. Our production studio will review your project and contact you at {user?.email || email} within 24 hours.</span>
                </div>
              </div>
            )}

            {!isAuthenticated && (
              <div className="mb-5 p-3.5 rounded-xl bg-[#ff7a52]/10 border border-[#ff7a52]/20 text-neutral-800 text-xs flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-lock text-[#ff7a52]"></i>
                  <span>Authentication required to submit</span>
                </span>
                <button
                  type="button"
                  onClick={() => onOpenSignIn && onOpenSignIn('Sign in to submit your photoshoot inquiry', 'contact')}
                  className="text-xs font-bold text-[#ff7a52] underline cursor-pointer bg-transparent border-none"
                >
                  Sign In
                </button>
              </div>
            )}

            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-semibold tracking-wider uppercase text-[#ff7a52]">Full Name</label>
              <input 
                type="text" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sarah Jenkins" 
                className="bg-white border border-black/10 p-3.5 rounded-lg text-neutral-900 text-sm outline-none focus:border-[#ff7a52] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-semibold tracking-wider uppercase text-[#ff7a52]">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@velour.com" 
                className="bg-white border border-black/10 p-3.5 rounded-lg text-neutral-900 text-sm outline-none focus:border-[#ff7a52] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-xs font-semibold tracking-wider uppercase text-[#ff7a52]">Project Details</label>
              <textarea 
                required 
                rows="3" 
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us about the dates, editorial style, and scope of work..." 
                className="bg-white border border-black/10 p-3.5 rounded-lg text-neutral-900 text-sm outline-none resize-none focus:border-[#ff7a52] transition-colors"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#ff7a52] to-[#ff5e3a] text-white py-3.5 px-6 rounded-full text-sm font-bold tracking-wider uppercase cursor-pointer shadow-md shadow-[#ff7a52]/20 hover:-translate-y-0.5 transition-transform"
            >
              {isAuthenticated ? 'Submit Project Inquiry' : 'Sign In & Submit Inquiry'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
