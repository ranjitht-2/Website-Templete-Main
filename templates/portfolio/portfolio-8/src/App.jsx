import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Send, 
  CheckCircle2, 
  X, 
  Briefcase, 
  GraduationCap, 
  ArrowUp,
  Bookmark,
  Calendar,
  Lock,
  User,
  ShieldCheck
} from 'lucide-react';
import { editorialData } from './data/editorialData';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';

// Reusable Scroll to Top floating action
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-10 h-10 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center shadow-2xl transition-colors border border-white/10 cursor-pointer focus:outline-none"
      aria-label="Scroll to Top"
    >
      <ArrowUp size={16} />
    </button>
  );
}

// Reusable Section Heading
function SectionHeading({ eyebrow, title, accent }) {
  return (
    <div className="mb-16 text-left font-sans">
      <span className="text-[10px] tracking-[0.25em] text-[#1a1a1a]/55 uppercase font-bold block mb-3">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif-normal font-black text-black tracking-tight leading-tight uppercase break-words">
        {title}
      </h2>
      {accent && <p className="mt-4 text-xs md:text-sm text-zinc-500 leading-relaxed max-w-xl">{accent}</p>}
      <div className="w-12 h-[1px] bg-black mt-4" />
    </div>
  );
}

// Reusable count-up counter component
function CounterItem({ endVal, label, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(endVal);
    if (isNaN(end)) return;
    
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endVal]);

  return (
    <div className="flex flex-col text-left font-sans min-w-0">
      <span className="text-3xl sm:text-4xl md:text-5xl font-serif-normal font-black text-black tracking-tight break-words">
        {count}{suffix}
      </span>
      <span className="text-[9px] font-bold tracking-wider uppercase text-zinc-400 mt-1 break-words">
        {label}
      </span>
    </div>
  );
}

function PortfolioEightMain() {
  const { isAuthenticated, user, isPackageSaved, toggleSavePackage, createBooking } = useAuth();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Executive Partner ($2,800/mo)');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success

  // Auth Modal State
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [pendingAuthCallback, setPendingAuthCallback] = useState(null);

  // Protected Action Interceptor
  const requireAuth = (reason, actionCallback) => {
    if (isAuthenticated) {
      if (actionCallback) actionCallback();
    } else {
      setAuthReason(reason || 'Authentication is required to perform this operations action.');
      setPendingAuthCallback(() => actionCallback || null);
      setIsSignInOpen(true);
    }
  };

  const handleAuthSuccess = (authUser) => {
    if (pendingAuthCallback) {
      pendingAuthCallback();
      setPendingAuthCallback(null);
    }
    setAuthReason('');
  };

  const handleOpenBooking = (tierName) => {
    requireAuth(
      'Authenticate to initialize onboarding and schedule your executive operations alignment sync.',
      () => {
        if (tierName) setSelectedTier(tierName);
        if (user) {
          setFormData(prev => ({
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email
          }));
        }
        setShowBookingModal(true);
      }
    );
  };

  const handleToggleSavePackage = (packageName) => {
    requireAuth(
      `Authenticate to save ${packageName} to your corporate operations plan.`,
      () => {
        toggleSavePackage(packageName);
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errors.message = 'System requirements description is required.';
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus('loading');
    setTimeout(() => {
      createBooking({
        selectedTier: selectedTier,
        systemRequirements: formData.message.trim()
      });
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setFormStatus('idle');
        setShowBookingModal(false);
      }, 2000);
    }, 1000);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-white text-[#1a1a1a] flex flex-col selection:bg-black selection:text-white">
      
      {/* NAVBAR */}
      <NavBar onOpenAuth={() => { setAuthReason(''); setPendingAuthCallback(null); setIsSignInOpen(true); }} />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex items-center px-5 sm:px-8 md:px-12 py-12 sm:py-16 border-b border-zinc-200/50">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="font-serif italic text-2xl sm:text-3xl md:text-5xl text-zinc-500 block mb-4">
              {editorialData.hero.scriptTitle}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-black text-black tracking-tight leading-[1.05] uppercase">
              {editorialData.hero.mainSubtitle}
            </h1>
            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-zinc-500 max-w-xl leading-relaxed text-center lg:text-justify font-sans">
              {editorialData.hero.supportingParagraph}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 font-sans w-full sm:w-auto justify-center lg:justify-start">
              <button
                onClick={() => handleOpenBooking('Executive Partner ($2,800/mo)')}
                className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer border-none text-center"
              >
                {editorialData.hero.ctaPrimary}
              </button>
              <button
                onClick={() => handleScrollTo('services')}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-zinc-100 text-black border border-black font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer text-center"
              >
                {editorialData.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Portrait rounded card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-56 sm:w-64 md:max-w-[340px] aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/80 bg-stone-100 mx-auto">
              <img 
                src={editorialData.hero.photo} 
                alt="Evelyn support photo" 
                className="w-full h-full object-cover block mx-auto filter grayscale contrast-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES OFFERED SECTION */}
      <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-zinc-200/40">
        <SectionHeading 
          eyebrow="Tiers" 
          title={editorialData.services.heading} 
          accent={editorialData.services.accent} 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {editorialData.services.packages.map((pkg, idx) => {
            const isSaved = isPackageSaved(pkg.name);
            return (
              <div
                key={idx}
                className={`border p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-all relative ${
                  pkg.featured
                    ? 'bg-black text-white border-black md:scale-102 shadow-2xl z-10'
                    : 'bg-white text-black border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  {pkg.featured ? (
                    <span className="bg-zinc-800 text-white text-[8px] font-sans tracking-widest font-black uppercase px-2.5 py-1">
                      POPULAR
                    </span>
                  ) : <div />}

                  <button
                    onClick={() => handleToggleSavePackage(pkg.name)}
                    className={`p-1.5 transition cursor-pointer border flex items-center gap-1 text-[10px] font-mono uppercase ${
                      isSaved
                        ? pkg.featured ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                        : pkg.featured ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white' : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:text-black'
                    }`}
                    title={isSaved ? 'Saved to Plan' : 'Save Package'}
                  >
                    {isSaved ? <Check size={11} /> : <Bookmark size={11} />}
                    <span className="hidden sm:inline">{isSaved ? 'SAVED' : 'SAVE'}</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-serif-normal font-black uppercase tracking-tight mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl md:text-4xl font-serif-normal font-black">{pkg.price}</span>
                    <span className={`text-[10px] font-sans tracking-wider uppercase ${pkg.featured ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      / {pkg.period}
                    </span>
                  </div>

                  <div className={`w-8 h-[1px] mb-8 ${pkg.featured ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

                  <ul className="flex flex-col gap-4 font-sans text-xs mb-10 text-left">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5">
                        <Check size={14} className={pkg.featured ? 'text-white' : 'text-black'} />
                        <span className={pkg.featured ? 'text-zinc-300' : 'text-zinc-600'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenBooking(`${pkg.name} (${pkg.price}/${pkg.period})`)}
                  className={`w-full py-3.5 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer border-none ${
                    pkg.featured
                      ? 'bg-white hover:bg-zinc-100 text-black'
                      : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                >
                  {pkg.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT / INTRO SECTION */}
      <section 
        id="about" 
        className="w-full max-w-full overflow-x-hidden bg-white pt-12 pb-14 px-4 sm:px-6 flex flex-col items-center justify-center border-b border-zinc-200/40"
        style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
      >
        <div className="w-full max-w-xs sm:max-w-md mx-auto flex flex-col items-center justify-center text-center">
          
          {/* Safe-Area Notch Clearance & Centered Image Card */}
          <div className="w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100 mx-auto mb-8 flex items-center justify-center">
            <img 
              src={editorialData.about.photo} 
              alt="Evelyn Oswald" 
              className="w-full h-full object-cover block mx-auto filter grayscale brightness-95"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Centered Typography Block (No Clipping) */}
          <div className="w-full max-w-xs sm:max-w-sm mx-auto flex flex-col items-center text-center">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-stone-400 font-semibold mb-2 block">
              ABOUT
            </span>

            <h1 className="text-xl sm:text-2xl font-serif uppercase tracking-tight text-stone-900 mb-3 leading-snug break-words">
              YOUR EXECUTIVE PARTNER
            </h1>

            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xs sm:max-w-sm mx-auto break-words">
              For over ten years, I have configured administrative workflows for high-growth startup teams. I believe that operations systems shouldn't complicate growth, creating structural frameworks that allow founders to focus entirely on their core mission.
            </p>

            {/* Stat row counters */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full border-t border-zinc-100 pt-6 mt-8 mb-8 text-center">
              {editorialData.about.stats.map((stat, idx) => (
                <CounterItem 
                  key={idx}
                  endVal={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>

            <button
              onClick={() => handleOpenBooking('Executive Partner ($2,800/mo)')}
              className="px-8 py-3.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer border-none"
            >
              {editorialData.about.ctaText}
            </button>
          </div>

        </div>
      </section>

      {/* WORK EXPERIENCE & EDUCATION SECTION */}
      <section 
        id="experience" 
        className="w-full max-w-full overflow-x-hidden bg-white py-12 px-5 sm:px-8 flex flex-col items-center border-b border-zinc-200/40"
        style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
      >
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col gap-8">
          {/* Work Experience Entries */}
          <div className="flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-tight">
                  SENIOR EXECUTIVE ASSISTANT
                </h3>
                <span className="text-[10px] font-mono text-stone-400 shrink-0">
                  2022 — PRESENT
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                VESPER SYSTEMS INC.
              </span>
              <p className="text-xs text-stone-600 leading-relaxed mt-1 break-words">
                Coordinating calendar schedules, travel itineraries, and operations for the CEO and board stakeholders.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-tight">
                  OPERATIONS COORDINATOR
                </h3>
                <span className="text-[10px] font-mono text-stone-400 shrink-0">
                  2020 — 2022
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                APEX DESIGN STUDIO
              </span>
              <p className="text-xs text-stone-600 leading-relaxed mt-1 break-words">
                Re-structured file directories, project databases, and managed contractor invoicing pipelines.
              </p>
            </div>
          </div>

          {/* Education & Studies Header */}
          <div className="flex items-center justify-center gap-2 border-b border-stone-200 pb-3 text-center mt-2">
            <span className="text-sm">🎓</span>
            <h2 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-stone-900">
              EDUCATION &amp; STUDIES
            </h2>
          </div>

          {/* Education Entries */}
          <div className="flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-tight">
                  B.S. IN BUSINESS ADMINISTRATION
                </h3>
                <span className="text-[10px] font-mono text-stone-400 shrink-0">
                  2016 — 2020
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                UNIVERSITY OF CHICAGO
              </span>
              <p className="text-xs text-stone-600 leading-relaxed mt-1 break-words">
                Specialized in operational management and organizational structures.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-tight">
                  EXECUTIVE ASSISTANT CERTIFICATION
                </h3>
                <span className="text-[10px] font-mono text-stone-400 shrink-0">
                  2020
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                IAAP ORG
              </span>
              <p className="text-xs text-stone-600 leading-relaxed mt-1 break-words">
                Advanced certification covering modern database management.
              </p>
            </div>
          </div>

          {/* Centered Circular Portrait Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-stone-200 mx-auto mt-6 shadow-md flex items-center justify-center">
            <img 
              src={editorialData.experience.circularPhoto} 
              alt="Evelyn Oswald" 
              className="w-full h-full object-cover filter grayscale"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
              }}
            />
          </div>

        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="Expertise" title={editorialData.skills.heading} />

        <div className="flex flex-wrap gap-3 font-sans">
          {editorialData.skills.list.map((skill, idx) => (
            <div 
              key={idx} 
              className="border border-zinc-200 hover:border-black bg-white hover:bg-black text-zinc-700 hover:text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
            >
              {skill.label}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL BAND & CLOSING CTA */}
      <section id="contact" className="relative py-32 px-6 md:px-12 bg-black text-white text-center overflow-hidden">
        
        {/* Silhouette bg overlay */}
        <div className="absolute inset-0 z-0 bg-black/60" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <span className="font-serif-italic text-2xl md:text-3xl text-zinc-400 mb-6 font-sans">
            " {editorialData.testimonials.quote} "
          </span>
          <span className="text-[9px] font-sans tracking-widest text-[#fbfbfb]/40 uppercase font-black mb-12">
            — {editorialData.testimonials.author}
          </span>

          <div className="w-12 h-[1px] bg-zinc-800 mb-12" />

          <h3 className="text-3xl md:text-5xl font-serif-normal font-black uppercase mb-6 leading-tight max-w-xl">
            Sustaining Administrative Clarity
          </h3>
          <p className="text-xs text-zinc-500 font-sans leading-relaxed max-w-md mb-8">
            Partner with us to create operational workflows, audit databases, and organize corporate logistics.
          </p>

          <button
            onClick={() => handleOpenBooking('Executive Partner ($2,800/mo)')}
            className="px-8 py-3.5 bg-white hover:bg-zinc-100 text-black font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer border-none"
          >
            Start Operations Sync
          </button>
        </div>

        {/* Footer brand lines */}
        <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center text-[8px] tracking-widest text-zinc-600 uppercase font-bold relative z-10 font-sans gap-4">
          <span>© {new Date().getFullYear()} EVELYN OSWALD OPERATIONS. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => { setAuthReason(''); setPendingAuthCallback(null); setIsSignInOpen(true); }}
              className="text-[8px] tracking-widest text-zinc-400 hover:text-white uppercase font-bold cursor-pointer bg-transparent border-none"
            >
              {isAuthenticated ? `PORTAL (${user?.name?.split(' ')[0]})` : 'CLIENT SIGN IN'}
            </button>
            <span>HIGH-CONTRAST EDITORIAL</span>
          </div>
        </div>
      </section>

      {/* Floating scroll to top button */}
      <ScrollToTopButton />

      {/* Booking Form Lightbox modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="absolute inset-0" onClick={() => setShowBookingModal(false)} />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative bg-white border border-zinc-200 w-full max-w-md z-10 p-5 sm:p-8 flex flex-col text-black font-sans shadow-2xl"
            >
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 p-2 bg-black hover:bg-zinc-800 text-white transition-colors z-20 cursor-pointer border-none"
              >
                <X size={15} />
              </button>

              <h3 className="text-2xl font-serif-normal font-black uppercase mb-2 text-left">Book Consultation</h3>
              <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider text-left mb-6">
                Operations Alignment Sync // {selectedTier}
              </p>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left font-sans">
                <div className="flex flex-col">
                  <label className="text-[8px] tracking-widest text-zinc-500 uppercase font-black mb-1">YOUR NAME *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full bg-[#fbfbfb] border border-zinc-200 focus:border-black px-4 py-2.5 text-xs text-black outline-none transition-colors"
                  />
                  {formErrors.name && <span className="text-[9px] text-rose-500 mt-1 font-bold">{formErrors.name}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[8px] tracking-widest text-zinc-500 uppercase font-black mb-1">BUSINESS EMAIL *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="growth@enterprise.com"
                    className="w-full bg-[#fbfbfb] border border-zinc-200 focus:border-black px-4 py-2.5 text-xs text-black outline-none transition-colors"
                  />
                  {formErrors.email && <span className="text-[9px] text-rose-500 mt-1 font-bold">{formErrors.email}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[8px] tracking-widest text-zinc-500 uppercase font-black mb-1">SELECTED OPERATIONS TIER</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full bg-[#fbfbfb] border border-zinc-200 focus:border-black px-4 py-2.5 text-xs text-black outline-none transition-colors"
                  >
                    <option value="Operations Suite ($1,200/mo)">Operations Suite ($1,200/mo)</option>
                    <option value="Executive Partner ($2,800/mo)">Executive Partner ($2,800/mo)</option>
                    <option value="Corporate Anchor ($4,500/mo)">Corporate Anchor ($4,500/mo)</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[8px] tracking-widest text-zinc-500 uppercase font-black mb-1">SYSTEM REQUIREMENTS *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly state your calendar, operations, or inbox goals..."
                    rows={3}
                    className="w-full bg-[#fbfbfb] border border-zinc-200 focus:border-black px-4 py-2.5 text-xs text-black outline-none transition-colors resize-none"
                  />
                  {formErrors.message && <span className="text-[9px] text-rose-500 mt-1 font-bold">{formErrors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-3.5 bg-black hover:bg-zinc-800 disabled:bg-zinc-200 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all border-none cursor-pointer mt-4"
                >
                  {formStatus === 'loading' ? (
                    <span>Scheduling Alignment Slot...</span>
                  ) : formStatus === 'success' ? (
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={13} /> Alignment Slot Scheduled!</span>
                  ) : (
                    <span>Schedule Operations Session</span>
                  )}
                </button>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dedicated Sign In Modal */}
      <SignIn
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        authReason={authReason}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioEightMain />
    </AuthProvider>
  );
}
