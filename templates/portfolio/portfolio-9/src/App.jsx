import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowUp, 
  ArrowRight,
  Maximize2,
  X,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Send,
  Lock,
  UserCheck,
  Camera
} from 'lucide-react';
import { photographyData, galleryFilters, galleryFilterMapping } from './data/photographyData';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';

// Auth Modal Context for triggering login/signup from any protected action
export const AuthModalContext = createContext({
  openAuthModal: () => {},
  closeAuthModal: () => {}
});

export const useAuthModal = () => useContext(AuthModalContext);

// Scroll reset logic
function ScrollToTopInside() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Scroll to Top floating action
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
      className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-[#d4af37] hover:bg-[#b8952c] text-black flex items-center justify-center shadow-lg transition-colors border border-black/10 cursor-pointer focus:outline-none"
    >
      <ArrowUp size={16} />
    </button>
  );
}

// Reusable Section Heading
function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="mb-14 text-left font-sans">
      <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-bold block mb-3 font-sans">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-5xl font-serif-heading font-black text-black tracking-tight leading-tight uppercase font-sans">
        {title}
      </h2>
      {desc && <p className="mt-4 text-xs md:text-sm text-zinc-500 leading-relaxed font-sans">{desc}</p>}
    </div>
  );
}

// Animated count-up counter component
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
    <div className="flex flex-col font-sans">
      <span className="text-4xl md:text-6xl font-serif-heading font-black text-black tracking-tight">
        {count}{suffix}
      </span>
      <span className="text-[9px] font-bold tracking-wider uppercase text-zinc-400 mt-2">
        {label}
      </span>
    </div>
  );
}

// Helper for page transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="w-full min-h-[75vh]"
    >
      {children}
    </motion.div>
  );
}

// ---------------- SUBPAGES ----------------

// 1. HOME PAGE
function HomePage() {
  const handleScrollDown = () => {
    const el = document.getElementById('home-about-preview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      {/* Full bleed black hero */}
      <section className="relative h-[90vh] bg-black flex items-center justify-center px-6 text-center overflow-hidden">
        {/* BG Image with low opacity overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 filter grayscale contrast-110"
          style={{ backgroundImage: `url(${photographyData.hero.bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

        <div className="relative z-10 font-sans max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-serif-heading font-black text-white uppercase tracking-tight leading-none">
            {photographyData.hero.title}
          </h1>
          <p className="mt-6 text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-zinc-400 font-bold">
            {photographyData.hero.subheading}
          </p>
        </div>

        {/* Scroll down indicator */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-10 z-10 bounce-slow text-white hover:text-[#d4af37] transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
        >
          <ChevronDown size={30} />
        </button>
      </section>

      {/* Light background About Preview Section with ghost text */}
      <section id="home-about-preview" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        
        {/* Ghost text watermark layered behind */}
        <div className="absolute -left-12 top-10 select-none pointer-events-none z-0">
          <span className="ghost-watermark-text">ABOUT ME</span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          <div className="md:col-span-7 lg:col-span-8 text-left font-sans">
            <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-bold block mb-3">
              THE VISION
            </span>
            <h2 className="text-3xl md:text-5xl font-serif-heading font-black text-black tracking-tight uppercase mb-6 font-sans">
              {photographyData.about.heading}
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 max-w-xl leading-relaxed text-justify mb-8 font-sans">
              {photographyData.about.intro}
            </p>
            <Link 
              to="/about"
              className="text-xs tracking-widest uppercase font-bold text-black hover:text-[#d4af37] transition-colors flex items-center gap-1.5 font-sans"
            >
              View More About Sasha <ArrowRight size={13} />
            </Link>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <div className="w-full aspect-[4/5] max-w-[260px] md:max-w-[280px] lg:max-w-[300px] overflow-hidden border border-zinc-200 shadow-xl bg-zinc-100">
              <img 
                src={photographyData.about.photo} 
                alt="Sasha working" 
                className="w-full h-full object-cover filter grayscale contrast-105"
              />
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// 2. ABOUT PAGE
function AboutPage() {
  return (
    <PageWrapper>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="THE CREATIVE" title="About Sasha" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
          
          <div className="md:col-span-7 lg:col-span-7 text-left font-sans flex flex-col gap-6 text-sm text-zinc-500 leading-relaxed text-justify">
            <p className="text-black text-base font-medium leading-relaxed font-sans">
              {photographyData.about.intro}
            </p>
            <p>
              {photographyData.about.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-zinc-100 pt-8 mt-6">
              {photographyData.about.stats.map((st, idx) => (
                <CounterItem 
                  key={idx}
                  endVal={st.value}
                  suffix={st.suffix}
                  label={st.label}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end">
            <div className="w-full max-w-[320px] md:max-w-[340px] lg:max-w-[380px] aspect-[3/4] overflow-hidden border border-zinc-200 shadow-2xl">
              <img 
                src={photographyData.about.photo} 
                alt="Sasha Grey Profile" 
                className="w-full h-full object-cover filter grayscale contrast-110"
              />
            </div>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}

// 3. RESUME PAGE
function ResumePage() {
  return (
    <PageWrapper>
      <section 
        style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full overflow-x-hidden bg-white pt-8 sm:pt-12 px-4 sm:px-6 pb-16"
      >
        {/* Top Safe-Area Padding & Heading Clearance */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto text-center pt-8 pb-6">
          <h1 className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-widest text-black">
            RESUME &amp; SKILLS
          </h1>
          <div className="w-8 h-0.5 bg-black mx-auto mt-2 rounded-full" />
        </div>

        {/* Fluid, Centered Resume Card Container */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-6 pb-12 flex flex-col gap-8">
          
          {/* Work History */}
          <div className="w-full flex flex-col font-sans">
            <div className="flex items-center gap-2 border-b border-black/10 pb-2 mb-4">
              <span className="text-sm">🏛</span>
              <h2 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-stone-900">
                WORK HISTORY
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {photographyData.resume.work.map((wk, idx) => (
                <div key={idx} className="flex flex-col gap-1 mb-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-stone-900">
                      {wk.role}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-500 shrink-0">
                      {wk.dates}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    {wk.company}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    {wk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="w-full flex flex-col font-sans">
            <div className="flex items-center gap-2 border-b border-black/10 pb-2 mb-4">
              <span className="text-sm">🎓</span>
              <h2 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-stone-900">
                EDUCATION
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {photographyData.resume.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col gap-1 mb-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-stone-900">
                      {edu.degree}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-500 shrink-0">
                      {edu.dates}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    {edu.institution}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Proficiency */}
          <div className="w-full flex flex-col font-sans border-t border-black/10 pt-6">
            <div className="flex items-center gap-2 border-b border-black/10 pb-2 mb-4">
              <span className="text-sm">⚡</span>
              <h2 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-stone-900">
                TECHNICAL PROFICIENCY
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {photographyData.resume.skills.map((skill, idx) => (
                <div key={idx} className="flex flex-col font-sans">
                  <div className="flex justify-between text-xs font-bold text-stone-900 mb-1.5 uppercase tracking-wide">
                    <span>{skill.label}</span>
                    <span className="font-mono text-stone-500">{skill.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black rounded-full"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}

// 4. SERVICES PAGE
function ServicesPage() {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const handleBookSession = (srv) => {
    if (!isAuthenticated) {
      openAuthModal(
        `Sign in or register an editorial client profile to book and schedule the ${srv.name} session.`,
        () => {
          navigate('/contact');
        }
      );
    } else {
      navigate('/contact');
    }
  };

  return (
    <PageWrapper>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading 
          eyebrow="OFFERINGS" 
          title={photographyData.services.heading} 
          desc={photographyData.services.accent} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {photographyData.services.packages.map((srv, idx) => (
            <div key={idx} className="border border-zinc-200 hover:border-black transition-colors bg-white p-6 flex flex-col gap-6 text-left">
              <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                <img 
                  src={srv.image} 
                  alt={srv.name} 
                  className="w-full h-full object-cover filter grayscale contrast-105"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif-heading font-black uppercase text-black mb-3">{srv.name}</h3>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed text-justify">{srv.desc}</p>
              </div>
              <div className="mt-4 border-t border-zinc-100 pt-4">
                <button 
                  onClick={() => handleBookSession(srv)}
                  className="w-full py-2.5 bg-black hover:bg-stone-800 text-white text-[10px] tracking-widest uppercase font-black transition-colors flex items-center justify-center gap-1.5 font-sans cursor-pointer border-none rounded-sm"
                >
                  <span>Book Session</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

// 5. PORTFOLIO PAGE
function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const filteredImages = selectedFilter === 'All'
    ? photographyData.portfolio
    : photographyData.portfolio.filter(item => item.tag === galleryFilterMapping[selectedFilter]);

  const handleInquirePlate = (img) => {
    if (!isAuthenticated) {
      openAuthModal(
        `Sign in to request full-resolution exhibition plates and print rights for ${img.title}.`,
        () => {
          setLightboxIndex(null);
          navigate('/contact');
        }
      );
    } else {
      setLightboxIndex(null);
      navigate('/contact');
    }
  };

  return (
    <PageWrapper>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="GALLERY" title="Selected Portfolios" />

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-zinc-100 font-sans">
          {galleryFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 text-[10px] font-sans tracking-widest uppercase font-black transition-all cursor-pointer border-none ${
                selectedFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-transparent text-zinc-500 hover:text-black'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer bg-white border border-zinc-100 p-3 hover:border-zinc-200 transition-all flex flex-col gap-3"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50">
                <img 
                  src={img.image} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 contrast-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white text-black px-3.5 py-2 text-[9px] font-sans tracking-widest uppercase flex items-center gap-1 font-bold shadow-md">
                    <Maximize2 size={11} /> View Plate
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-baseline px-1 font-sans text-left">
                <div>
                  <h4 className="text-sm text-black font-bold group-hover:text-[#d4af37] transition-colors uppercase leading-none">{img.title}</h4>
                  <span className="text-[9px] font-sans tracking-widest text-[#d4af37] uppercase font-bold mt-1.5 block">{img.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox viewer modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="absolute inset-0" onClick={() => setLightboxIndex(null)} />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] z-10 flex flex-col bg-zinc-950 border border-zinc-900"
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 p-2 bg-[#d4af37] hover:bg-[#b8952c] text-black transition-colors z-20 cursor-pointer border-none"
              >
                <X size={15} />
              </button>

              <div className="overflow-hidden bg-black flex items-center justify-center max-h-[70vh]">
                <img 
                  src={filteredImages[lightboxIndex].image} 
                  alt={filteredImages[lightboxIndex].title} 
                  className="max-w-full max-h-[70vh] object-contain filter grayscale contrast-105"
                />
              </div>

              <div className="p-6 bg-black text-left text-zinc-400 font-sans border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-sm text-white font-bold uppercase">{filteredImages[lightboxIndex].title}</h4>
                  <span className="text-[9px] text-[#d4af37] uppercase font-bold tracking-wider block mt-0.5">{filteredImages[lightboxIndex].category}</span>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-zinc-600 font-bold uppercase">PLATE {lightboxIndex + 1} OF {filteredImages.length}</span>
                  <button
                    onClick={() => handleInquirePlate(filteredImages[lightboxIndex])}
                    className="px-4 py-2 bg-[#d4af37] hover:bg-[#b8952c] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer border-none"
                  >
                    Inquire Plate
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

// 6. PRICING PAGE
function PricingPage() {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const handleSelectTier = (tier) => {
    if (!isAuthenticated) {
      openAuthModal(
        `Sign in or register an editorial client account to reserve the ${tier.tier} photoshoot tier.`,
        () => {
          navigate('/contact');
        }
      );
    } else {
      navigate('/contact');
    }
  };

  return (
    <PageWrapper>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="FINANCIALS" title="Pricing Structure" />

        <div className="max-w-3xl mx-auto flex flex-col gap-6 font-sans">
          {photographyData.pricing.map((pr, idx) => (
            <div key={idx} className="border border-zinc-200 bg-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
              <div>
                <h4 className="text-lg font-serif-heading font-black uppercase text-black">{pr.tier}</h4>
                <p className="text-xs text-zinc-500 font-sans mt-1.5">{pr.scope}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-serif-heading font-black text-[#d4af37]">{pr.price}</span>
                <button
                  onClick={() => handleSelectTier(pr)}
                  className="px-4 py-2 bg-black hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer border-none"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

// 7. TESTIMONIALS PAGE
function TestimonialsPage() {
  return (
    <PageWrapper>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="ENDORSEMENTS" title="Testimonials" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left font-sans">
          {photographyData.testimonials.map((test, idx) => (
            <div key={idx} className="border border-zinc-200 bg-white p-8 md:p-10 flex flex-col justify-between h-64 relative">
              <span className="absolute top-4 left-4 text-6xl text-zinc-100 font-serif-normal font-black select-none pointer-events-none">“</span>
              <p className="text-sm font-serif-italic text-zinc-600 leading-relaxed text-justify relative z-10">
                {test.quote}
              </p>
              <div className="border-t border-zinc-100 pt-4 mt-6">
                <span className="text-[10px] font-sans tracking-widest uppercase font-black text-black">
                  — {test.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

// 8. CONTACT PAGE (Protected Campaign Submission)
function ContactPage() {
  const { isAuthenticated, user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success

  // Auto-fill user credentials when authenticated
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email
      }));
    }
  }, [user]);

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
    if (!formData.message.trim()) errors.message = 'Message is required.';
    return errors;
  };

  const executeDispatch = () => {
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: user?.name || '', email: user?.email || '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3500);
    }, 1200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!isAuthenticated) {
      openAuthModal(
        'Please sign in or register an editorial client account to submit your campaign parameters directly to Sasha Grey.',
        () => {
          executeDispatch();
        }
      );
      return;
    }

    executeDispatch();
  };

  return (
    <PageWrapper>
      <section 
        style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full overflow-x-hidden bg-white pt-10 sm:pt-12 pb-16 px-4 sm:px-6"
      >
        {/* Top Safe-Area Padding & Studio Info Header */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col gap-3 mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black text-amber-400 flex items-center justify-center rounded-sm shrink-0">
              <span className="text-sm">✉</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">
                EMAIL STUDIO
              </span>
              <a href={`mailto:${photographyData.brand.email || 'studio@sashagrey.co'}`} className="text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-600 transition">
                {photographyData.brand.email || 'studio@sashagrey.co'}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-stone-100 text-stone-700 border border-stone-200 flex items-center justify-center rounded-sm shrink-0">
              <span className="text-sm">📍</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">
                STUDIO LOCAL
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900">
                {photographyData.brand.location || 'London, UK'}
              </span>
            </div>
          </div>
        </div>

        {/* Fluid, Centered Contact Form Container */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 pb-14 flex flex-col items-center justify-center box-border">
          <form onSubmit={handleFormSubmit} className="w-full bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 box-border">
            {/* Gold Accent Line */}
            <div className="w-full h-1 bg-amber-500 rounded-full mb-2" />

            {/* Authenticated Client Indicator */}
            {isAuthenticated && user && (
              <div className="w-full bg-stone-50 border border-amber-500/30 px-3.5 py-2.5 rounded-lg text-xs flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <UserCheck size={13} className="text-amber-600" />
                  AUTHENTICATED AS:
                </span>
                <span className="text-stone-900 font-bold text-xs truncate max-w-[140px]">{user.name}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="w-full text-left">
              <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition"
              />
              {formErrors.name && <span className="text-[10px] text-rose-500 mt-1.5 font-bold block">{formErrors.name}</span>}
            </div>

            <div className="w-full text-left">
              <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="studio@enterprise.com"
                className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition"
              />
              {formErrors.email && <span className="text-[10px] text-rose-500 mt-1.5 font-bold block">{formErrors.email}</span>}
            </div>

            <div className="w-full text-left">
              <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-1.5">
                PROJECT PARAMETERS
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="State your shoot goals or lookup timeline limits"
                className="w-full box-border rounded-lg bg-stone-50 border border-stone-200 text-stone-900 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition resize-none"
              />
              {formErrors.message && <span className="text-[10px] text-rose-500 mt-1.5 font-bold block">{formErrors.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="w-full py-3.5 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-stone-800 disabled:bg-stone-300 transition flex items-center justify-center gap-2 mt-1 cursor-pointer border-none"
            >
              {formStatus === 'loading' ? (
                <span>Registering Request...</span>
              ) : formStatus === 'success' ? (
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} /> Message Dispatched!</span>
              ) : (
                <>
                  <span>SEND REQUEST</span>
                  <span>✈</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}

// 9. DEDICATED SIGN IN PAGE
function SignInPage() {
  return (
    <PageWrapper>
      <section 
        style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full overflow-x-hidden bg-white pt-8 sm:pt-12 pb-16 px-4 sm:px-6 flex items-center justify-center"
      >
        <SignIn isStandalonePage={true} />
      </section>
    </PageWrapper>
  );
}

// ---------------- MAIN ROUTER ----------------

export default function App() {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    reason: '',
    onAuthSuccess: null
  });

  const openAuthModal = (reason = '', onSuccess = null) => {
    setAuthModal({
      isOpen: true,
      reason,
      onAuthSuccess: onSuccess
    });
  };

  const closeAuthModal = () => {
    setAuthModal({
      isOpen: false,
      reason: '',
      onAuthSuccess: null
    });
  };

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-white text-[#0d0d0d] flex flex-col justify-between selection:bg-[#d4af37] selection:text-black">
        
        {/* Scroll to Top on route changes */}
        <ScrollToTopInside />

        {/* NAVBAR */}
        <NavBar />

        {/* ROUTING PATHS */}
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/index.html" element={<HomePage />} />
              <Route path="index.html" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signin" element={<SignInPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <Footer />

        {/* Floating circular scroll up button */}
        <ScrollToTopButton />

        {/* Global Auth Modal for protected actions */}
        <SignIn
          isOpen={authModal.isOpen}
          onClose={closeAuthModal}
          authReason={authModal.reason}
          onAuthSuccess={(authenticatedUser) => {
            if (authModal.onAuthSuccess) {
              authModal.onAuthSuccess(authenticatedUser);
            }
            closeAuthModal();
          }}
        />
      </div>
    </AuthModalContext.Provider>
  );
}
