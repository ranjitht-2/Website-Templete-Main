import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Download,
  Send,
  MapPin,
  CheckCircle,
  Eye,
  Lock,
  FileText
} from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import NavBar from './components/NavBar';
import GalleryModal from './components/GalleryModal';
import SignIn from './components/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';

// Reusable Section Heading component
function SectionHeading({ eyebrow, title, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center flex flex-col items-center' : 'text-left'}`}
    >
      <span className="text-[10px] font-sans tracking-[0.25em] text-[#262626]/50 uppercase font-bold block mb-3">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-5xl font-serif text-[#262626] tracking-tight leading-tight">
        {title}
      </h2>
      <div className={`w-10 h-[1px] bg-zinc-300 mt-4 ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}

function MainPortfolio() {
  const { isAuthenticated, user, submitInquiry } = useAuth();

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [cvDownloaded, setCvDownloaded] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success

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

  const executeFormSubmission = async () => {
    setFormStatus('loading');
    const result = await submitInquiry({
      name: formData.name,
      email: formData.email,
      message: formData.message
    });

    if (result.success) {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    } else {
      setFormStatus('idle');
      alert(result.error || 'Failed to submit inquiry.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!isAuthenticated) {
      setAuthReason('Sign in with your client account to transmit inquiries directly to Clara Oswald.');
      setPendingAction(() => () => executeFormSubmission());
      setIsAuthOpen(true);
      return;
    }

    executeFormSubmission();
  };

  const handleDownloadCv = () => {
    if (!isAuthenticated) {
      setAuthReason('Please authenticate your studio client credentials to download Clara Oswald\'s curriculum & spec sheet.');
      setPendingAction(() => () => {
        setCvDownloaded(true);
        setTimeout(() => setCvDownloaded(false), 3500);
      });
      setIsAuthOpen(true);
      return;
    }

    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 3500);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleAuthSuccess = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-white text-[#262626] selection:bg-zinc-200 selection:text-zinc-900 font-sans">
      
      {/* NAVBAR */}
      <NavBar onOpenAuth={() => { setAuthReason(''); setPendingAction(null); setIsAuthOpen(true); }} />

      {/* 1. HERO SECTION */}
      <section id="home" className="w-full max-w-full overflow-x-hidden bg-white pt-10 sm:pt-14 pb-12 px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Tagline */}
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-stone-400 uppercase font-semibold mb-3 block">
            {portfolioData.hero.eyebrow || "• DIGITAL ART & PRODUCT DESIGN STUDIO"}
          </span>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight tracking-tight mb-4 max-w-xs sm:max-w-md lg:max-w-2xl mx-auto">
            {portfolioData.hero.headline}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xs sm:max-w-sm md:max-w-lg mx-auto mb-6">
            {portfolioData.hero.subtext}
          </p>

          {/* Centered CTA Buttons (Stack or fit cleanly on mobile) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-md mx-auto mb-6">
            <a
              href={portfolioData.hero.cta.primary.href || "#portfolio"}
              className="w-full sm:w-auto px-5 py-2.5 border border-stone-900 bg-stone-900 text-white font-mono text-xs uppercase tracking-wider rounded-sm text-center hover:bg-stone-800 transition"
            >
              {portfolioData.hero.cta.primary.label || "VIEW SELECTED WORK"} →
            </a>
            <a
              href={portfolioData.hero.cta.secondary.href || "#contact"}
              className="w-full sm:w-auto px-5 py-2.5 border border-stone-300 text-stone-900 font-mono text-xs uppercase tracking-wider rounded-sm text-center hover:bg-stone-100 transition"
            >
              {portfolioData.hero.cta.secondary.label || "GET IN TOUCH"}
            </a>
          </div>

          {/* Status / Location Meta */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-stone-400 mb-8">
            <span>📍 {portfolioData.hero.location || "London, UK"}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              {portfolioData.hero.availability || "Available for select projects"}
            </span>
          </div>

          {/* Centered Portrait Image Card */}
          <div className="w-full max-w-xs sm:max-w-sm mx-auto flex items-center justify-center relative">
            <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100 mx-auto">
              <img
                src={portfolioData.hero.portrait}
                alt={portfolioData.brand.siteName || "Clara Oswald"}
                className="w-full h-full object-cover block mx-auto"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
              {/* Pill Badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-stone-200/80 shadow-md px-3 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-stone-800">
                  {portfolioData.hero.credibilityStat || "10+ YRS BUILDING ELEGANT UI"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT / METHODOLOGY SECTION */}
      <section id="about" className="w-full max-w-full overflow-x-hidden bg-white pt-10 sm:pt-14 pb-12 px-4 sm:px-6 flex flex-col items-center justify-center border-t border-zinc-150">
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
          
          <SectionHeading eyebrow={portfolioData.about.eyebrow} title={portfolioData.about.heading} center={true} />

          {/* Perfectly Centered Image Card */}
          <div className="w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100 mx-auto mb-8 flex items-center justify-center">
            <img
              src={portfolioData.about.portraitSecondary || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"}
              alt="Design Methodology Workspace"
              className="w-full h-full object-cover block mx-auto"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Centered Typography & Methodology Copy */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto flex flex-col items-center text-center">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-stone-400 font-semibold mb-3 block">
              METHODOLOGY
            </span>

            <div className="space-y-4 text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xs sm:max-w-sm md:max-w-lg mx-auto break-words text-center">
              <p>
                {portfolioData.about.storyParagraph1 || "My methodology is centered around subtracting noise until only the vital structures remain. Spacing is treated as a core design element, giving typography the air it needs to be read effortlessly."}
              </p>
              <p>
                {portfolioData.about.storyParagraph2 || "Before establishing my studio, I designed interfaces alongside some of the world's most notable branding houses. Today, I work directly with clients to build clean systems across web, mobile apps, and visual identities."}
              </p>
            </div>

            {/* Stat Counters */}
            <div className="mt-8 pt-6 border-t border-stone-200/60 grid grid-cols-3 gap-4 w-full text-center">
              {portfolioData.about.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-serif text-[#262626] font-light tracking-tight">{stat.value}</div>
                  <div className="text-[9px] font-sans tracking-widest text-zinc-400 uppercase font-bold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Protected CV Download */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <button 
                onClick={handleDownloadCv}
                className="px-6 py-3 bg-[#262626] hover:bg-zinc-800 text-white text-xs font-sans tracking-widest uppercase font-bold transition-colors flex items-center gap-2 rounded-none cursor-pointer border-none"
              >
                <span>Download CV</span>
                <Download size={13} />
              </button>

              {cvDownloaded && (
                <span className="text-[10px] font-mono text-emerald-600 font-semibold animate-pulse">
                  ✓ Studio Spec Sheet & CV Transmitted Successfully
                </span>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 3. PORTFOLIO / WORKS SECTION */}
      <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-150">
        <SectionHeading eyebrow="• SELECTION" title="Selected Work" />

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group cursor-pointer bg-white border border-zinc-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-zinc-50 rounded-lg">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#262626] text-white px-4 py-2 text-[9px] font-sans tracking-widest uppercase flex items-center gap-1.5 font-bold shadow-md">
                    <Eye size={11} /> Project Details
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-1">
                <span className="text-[9px] font-sans tracking-widest text-[#262626]/40 uppercase font-black mb-1">
                  {project.category}
                </span>
                <h4 className="text-xl font-serif text-[#262626] group-hover:opacity-60 transition-opacity">
                  {project.title}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. APPROACH SECTION */}
      <section id="approach" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-150">
        <SectionHeading eyebrow="• PROCESS" title="My Approach" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {portfolioData.approach.map((item, idx) => (
            <div key={idx} className="flex flex-col pt-6 border-t border-zinc-150">
              <span className="text-[10px] font-sans tracking-widest text-[#262626]/40 uppercase font-black mb-4">
                0{idx + 1} // CONCEPT
              </span>
              <h3 className="text-xl font-serif text-[#262626] mb-3">{item.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed text-justify font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CONTACT / PROTECTED INQUIRY SECTION */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[10px] font-sans tracking-[0.25em] text-[#262626]/50 uppercase font-bold mb-4 block">
            • GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#262626] tracking-tight mb-6">
            Let's build together.
          </h2>
          <p className="text-sm text-zinc-500 font-sans leading-relaxed mb-8 max-w-md">
            {portfolioData.contact.tagline}
          </p>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="w-full max-w-lg flex flex-col gap-6 text-left mb-12">
            <div className="flex flex-col">
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-b border-zinc-200 focus:border-[#262626] py-3 text-xs tracking-widest placeholder-zinc-400 outline-none transition-colors font-sans uppercase font-bold"
              />
              {formErrors.name && <span className="text-[9px] font-sans text-rose-500 mt-1 font-bold">{formErrors.name}</span>}
            </div>

            <div className="flex flex-col">
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-zinc-200 focus:border-[#262626] py-3 text-xs tracking-widest placeholder-zinc-400 outline-none transition-colors font-sans uppercase font-bold"
              />
              {formErrors.email && <span className="text-[9px] font-sans text-rose-500 mt-1 font-bold">{formErrors.email}</span>}
            </div>

            <div className="flex flex-col">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="YOUR MESSAGE"
                rows={3}
                className="w-full bg-transparent border-b border-zinc-200 focus:border-[#262626] py-3 text-xs tracking-widest placeholder-zinc-400 outline-none transition-colors resize-none font-sans uppercase font-bold"
              />
              {formErrors.message && <span className="text-[9px] font-sans text-rose-500 mt-1 font-bold">{formErrors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="mt-4 py-3.5 bg-[#262626] hover:bg-zinc-800 disabled:bg-zinc-300 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 rounded-none transition-colors cursor-pointer border-none"
            >
              {formStatus === 'loading' ? (
                <span>Transmitting Inquiry...</span>
              ) : formStatus === 'success' ? (
                <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-emerald-400" /> Inquiry Transmitted Successfully!</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={11} />
                </>
              )}
            </button>
          </form>

          {/* Socials footer displaying text links */}
          <div className="flex gap-8 items-center border-t border-zinc-100 pt-8 w-full justify-center">
            {portfolioData.contact.socials.map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-sans tracking-widest uppercase font-bold text-zinc-400 hover:text-[#262626] transition-colors"
              >
                {soc.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#fafafc] text-zinc-400 py-10 px-6 border-t border-zinc-150">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-sans tracking-widest uppercase font-bold">
          <span>© {new Date().getFullYear()} CLARA OSWALD. ALL RIGHTS RESERVED.</span>
          <span>AIRY MINIMAL EDITORIAL DESIGN</span>
        </div>
      </footer>

      {/* Project Lightbox detail modal */}
      <GalleryModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Dedicated Sign In / Client Auth Portal Modal */}
      <SignIn
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        authReason={authReason}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainPortfolio />
    </AuthProvider>
  );
}
