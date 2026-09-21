import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldAlert, Building, MapPin, DollarSign, FileCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CommissionModal({ isOpen = false, onClose }) {
  const { user, submitCommission } = useAuth();

  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('Residential');
  const [location, setLocation] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('$2,000,000 - $4,000,000');
  const [briefDescription, setBriefDescription] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!projectTitle.trim()) {
      setError('Please provide a project name or working title.');
      return;
    }
    if (!location.trim()) {
      setError('Please provide the intended geographic location/site.');
      return;
    }
    if (!briefDescription.trim()) {
      setError('Please provide a brief architectural brief or design vision.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      submitCommission({
        projectTitle: projectTitle.trim(),
        projectCategory,
        location: location.trim(),
        estimatedBudget,
        briefDescription: briefDescription.trim()
      });
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setProjectTitle('');
    setLocation('');
    setBriefDescription('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1a2b4a]/75 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-lg bg-[#FAF9F6] border border-[#1a2b4a]/15 shadow-2xl overflow-hidden relative box-border my-auto"
        >
          {/* Top Navy Border */}
          <div className="w-full h-1 bg-[#1a2b4a]" />

          {/* Header Bar */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#1a2b4a]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#1a2b4a] text-white flex items-center justify-center font-serif text-base font-bold">
                AT
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a2b4a]">
                  PROJECT COMMISSION
                </h3>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#1a2b4a]/60 uppercase font-medium block">
                  AETHELGARD ARCHITECTURAL RESEARCH
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 text-[#1a2b4a]/50 hover:text-[#1a2b4a] hover:bg-[#1a2b4a]/5 transition-colors cursor-pointer border-none bg-transparent"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 mx-auto bg-[#1a2b4a] text-white flex items-center justify-center rounded-full">
                  <CheckCircle2 size={30} />
                </div>
                <h4 className="text-xl font-light font-serif text-[#1a2b4a]">
                  Commission Specification Received
                </h4>
                <p className="text-xs text-[#1a2b4a]/75 leading-relaxed max-w-sm mx-auto font-sans">
                  Your project brief has been logged under client profile <strong className="text-[#1a2b4a]">{user?.email}</strong>. Principal Alistair Thorne will review structural feasibility within 48 hours.
                </p>
                <button
                  onClick={handleResetAndClose}
                  className="mt-6 px-6 py-3 bg-[#1a2b4a] hover:bg-[#132038] text-[#FAF9F6] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border-none shadow-sm"
                >
                  CLOSE & RETURN TO PORTFOLIO
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 text-xs flex items-start gap-2">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="text-left">
                  <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                    PROJECT TITLE / WORKING CODENAME *
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g., The Valais Monolith Sanctuary"
                    className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a2b4a] transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                      CATEGORY *
                    </label>
                    <select
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-3 py-2.5 text-xs focus:outline-none focus:border-[#1a2b4a] transition"
                    >
                      <option value="Residential">Residential Villa</option>
                      <option value="Commercial">Commercial Façade</option>
                      <option value="Urban Park">Urban Park & Landscape</option>
                      <option value="Cultural">Cultural Pavilion</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                      ESTIMATED BUDGET *
                    </label>
                    <select
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(e.target.value)}
                      className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-3 py-2.5 text-xs focus:outline-none focus:border-[#1a2b4a] transition"
                    >
                      <option value="$1,000,000 - $2,500,000">$1,000,000 - $2,500,000</option>
                      <option value="$2,500,000 - $5,000,000">$2,500,000 - $5,000,000</option>
                      <option value="$5,000,000 - $10,000,000">$5,000,000 - $10,000,000</option>
                      <option value="$10,000,000+">$10,000,000+</option>
                    </select>
                  </div>
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                    SITE LOCATION & TOPOGRAPHY *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Lucerne, Switzerland (Cliffside Lakefront)"
                    className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a2b4a] transition"
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/60 uppercase font-bold block mb-1.5">
                    ARCHITECTURAL BRIEF & MATERIAL REQUIREMENTS *
                  </label>
                  <textarea
                    rows={3}
                    value={briefDescription}
                    onChange={(e) => setBriefDescription(e.target.value)}
                    placeholder="Describe spatial requirements, passive solar orientation, materials (e.g. exposed reinforced concrete, timber, curved glass)..."
                    className="w-full box-border bg-white border border-[#1a2b4a]/15 text-[#1a2b4a] px-4 py-2.5 text-xs focus:outline-none focus:border-[#1a2b4a] transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#1a2b4a] hover:bg-[#132038] text-[#FAF9F6] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer border-none flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <span>TRANSMITTING COMMISSION BRIEF...</span>
                  ) : (
                    <>
                      <Send size={12} />
                      <span>SUBMIT COMMISSION FOR ARCHITECTURAL REVIEW</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
