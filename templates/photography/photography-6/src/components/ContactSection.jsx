import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ContactSection({ onOpenSignIn }) {
  const { isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onOpenSignIn('Authentication required: Please sign in or register to submit an assignment inquiry.', 'contact');
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    // Save inquiry to localStorage mock ledger
    try {
      const existing = JSON.parse(localStorage.getItem('kairo_photography6_inquiries') || '[]');
      const newInquiry = {
        id: 'inq_' + Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        contactName: formData.name,
        message: formData.message,
        createdAt: new Date().toISOString()
      };
      existing.push(newInquiry);
      localStorage.setItem('kairo_photography6_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to log inquiry in photography-6:', err);
    }

    setStatus('success');
    setFormData(prev => ({ ...prev, message: '' }));
  };

  return (
    <section 
      id="contact" 
      className="w-full max-w-full box-border px-4 sm:px-6 lg:px-12 py-20 lg:py-28 bg-[#121212] text-white flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-left space-y-6"
        >
          <span className="text-[#ff4a3b] text-xs font-bold tracking-[3px] uppercase block font-sans">
            Contact
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Initiate a Creative Project
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-stone-400 font-sans font-light">
            For assignments, representation, image licensing, or general inquiries, please fill out the form or reach out directly via email.
          </p>

          <div className="flex flex-col gap-5 pt-2 font-sans">
            <div>
              <span className="text-[10px] uppercase opacity-40 tracking-wider block">Studio Email</span>
              <p className="m-0 text-base font-medium text-stone-200 mt-1">inquiries@tomkeene.com</p>
            </div>
            <div>
              <span className="text-[10px] uppercase opacity-40 tracking-wider block">Representation</span>
              <p className="m-0 text-base font-medium text-stone-200 mt-1">represent@keene-agency.com</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side Fluid Centered Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto flex flex-col items-center justify-center"
        >
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 text-left">
            
            {isAuthenticated && user && (
              <div className="bg-[#ff4a3b]/10 border border-[#ff4a3b]/30 p-3 rounded-2xl text-xs flex items-center justify-between text-stone-200 font-sans">
                <span>Client Verified: <strong>{user.name}</strong></span>
                <span className="font-mono text-[9px] uppercase bg-[#ff4a3b]/20 px-2 py-0.5 rounded text-[#ff4a3b] font-bold">Ledger Active</span>
              </div>
            )}

            {/* Input Name */}
            <div className="flex flex-col gap-2 w-full text-left">
              <label className="text-xs font-semibold tracking-wider uppercase text-stone-300">Name *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
                className="w-full box-border rounded-xl bg-[#18181b] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#ff4a3b] transition-colors placeholder-stone-500"
              />
            </div>

            {/* Input Email */}
            <div className="flex flex-col gap-2 w-full text-left">
              <label className="text-xs font-semibold tracking-wider uppercase text-stone-300">Email Address *</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                required
                className="w-full box-border rounded-xl bg-[#18181b] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#ff4a3b] transition-colors placeholder-stone-500"
              />
            </div>

            {/* Input Message */}
            <div className="flex flex-col gap-2 w-full text-left">
              <label className="text-xs font-semibold tracking-wider uppercase text-stone-300">Project Details *</label>
              <textarea 
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, dates, and concepts..."
                required
                className="w-full box-border rounded-xl bg-[#18181b] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#ff4a3b] transition-colors resize-none placeholder-stone-500"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-stone-200 transition text-center cursor-pointer border-none shadow-md mt-1"
            >
              Submit Inquiry
            </button>

            {/* Status alerts */}
            {status === 'success' && (
              <p className="text-center w-full mt-3 text-emerald-400 text-xs px-2 break-words leading-normal font-sans">
                Thank you, {user ? user.name : formData.name}! Your inquiry was sent and recorded in our client ledger.
              </p>
            )}
            {status === 'error' && (
              <p className="text-center w-full mt-3 text-rose-400 text-xs px-2 break-words leading-normal font-sans">
                Please fill out all required fields.
              </p>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}
