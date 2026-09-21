import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Sparkles, 
  Cpu, 
  Send, 
  Download, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Maximize2,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { portfolioData, projectFilters, filterMapping, SOCIAL_FA_MAP } from './data/portfolioData';
import NavBar from './components/NavBar';
import GalleryModal from './components/GalleryModal';
import ArticleModal from './components/ArticleModal';
import SignIn from './components/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';

// Reusable Section Heading component
function SectionHeading({ eyebrow, title, lightBg = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <span className={`text-xs font-sans tracking-widest uppercase font-black block mb-2 ${
        lightBg ? 'text-[#E6392F]' : 'text-white/80'
      }`}>
        {eyebrow}
      </span>
      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight break-words ${
        lightBg ? 'text-[#2b2b2b]' : 'text-white'
      }`}>
        {title}
      </h2>
      <div className="w-16 h-1.5 bg-[#E6392F] mt-4" />
    </motion.div>
  );
}

const ICON_MAP = {
  Layers: Layers,
  Sparkles: Sparkles,
  Cpu: Cpu
};

function PortfolioMain() {
  const { isAuthenticated, user } = useAuth();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Authentication Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  // Testimonial Carousel Index state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // CV Download Notification state
  const [cvDownloadStatus, setCvDownloadStatus] = useState('idle'); // idle | success

  // Contact Form states
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

  const executeFormSubmit = () => {
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
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
      setAuthReason('Client authentication required to submit project brief & design parameters.');
      setPendingAction(() => () => executeFormSubmit());
      setIsAuthModalOpen(true);
      return;
    }

    executeFormSubmit();
  };

  const executeDownloadCV = () => {
    setCvDownloadStatus('success');
    setTimeout(() => setCvDownloadStatus('idle'), 4000);
  };

  const handleDownloadCV = () => {
    if (!isAuthenticated) {
      setAuthReason('Sign in to Sasha Grey client portal is required to access confidential CV & rate card.');
      setPendingAction(() => () => executeDownloadCV());
      setIsAuthModalOpen(true);
      return;
    }

    executeDownloadCV();
  };

  const handleAuthSuccess = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((activeTestimonial + 1) % portfolioData.testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((activeTestimonial - 1 + portfolioData.testimonials.length) % portfolioData.testimonials.length);
  };

  const filteredProjects = selectedFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(proj => proj.tag === filterMapping[selectedFilter]);

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#111111] text-white selection:bg-[#E6392F] selection:text-white">
      
      {/* STICKY TOP NAVBAR */}
      <NavBar onOpenAuth={() => { setAuthReason(''); setIsAuthModalOpen(true); }} />

      {/* 1. HERO SECTION (Dark Charcoal Background) */}
      <section id="home" className="w-full max-w-full bg-[#111111] text-white min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden grid-overlay">
        
        {/* Left Side stacked social icons */}
        <div className="hidden md:flex flex-col gap-6 absolute left-10 top-1/2 -translate-y-1/2 z-10">
          {portfolioData.socialLinks.map((soc, idx) => {
            const faClass = SOCIAL_FA_MAP[soc.name] || "fa-solid fa-link";
            return (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-red-500 text-lg hover:scale-110 transition-all py-1"
              >
                <i className={faClass}></i>
              </a>
            );
          })}
        </div>

        {/* Faint watermark background behind content */}
        <div className="absolute right-0 top-1/4 select-none opacity-[0.02] text-8xl md:text-[14rem] font-black tracking-tighter text-white uppercase pointer-events-none overflow-hidden max-w-full">
          {portfolioData.brand.watermark}
        </div>

        {/* Hero Content Column */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 py-8 flex flex-col items-center text-center relative z-10">
          {/* Small Tagline */}
          <span className="text-[11px] font-mono tracking-[0.3em] text-red-500 uppercase font-semibold mb-3">
            {portfolioData.hero.greeting}
          </span>

          {/* Hero Headings */}
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none">
            {portfolioData.hero.name}
          </h1>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-red-500 mt-1 mb-4">
            {portfolioData.hero.rolePrefix} {portfolioData.hero.roleSuffix}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-400 max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-6">
            {portfolioData.hero.subtext}
          </p>

          {/* CTA Button Group */}
          <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
            <a
              href="#contact"
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-md text-center transition flex items-center justify-center gap-1.5"
            >
              <span>{portfolioData.hero.cta.primary.label}</span>
              <span>↗</span>
            </a>
            <a
              href="#about"
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-md text-center transition border border-white/10"
            >
              {portfolioData.hero.cta.secondary.label}
            </a>
          </div>

          {/* Email Direct */}
          <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase mt-6 block">
            EMAIL DIRECT // {portfolioData.brand.email}
          </span>
        </div>

        {/* Center Showcase Image */}
        <div className="w-full max-w-xs sm:max-w-sm mx-auto px-4 mt-6 flex justify-center items-center relative z-10">
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-white/10 mx-auto">
            <img
              src={portfolioData.hero.portrait}
              alt="Sasha Grey Showcase"
              className="w-full h-full object-cover block mx-auto"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 text-white/30 text-xs font-sans tracking-widest uppercase font-black animate-bounce flex items-center gap-1">
          SCROLL DOWN <ArrowRight size={10} className="rotate-90" />
        </div>
      </section>

      {/* 2. ABOUT SECTION (Light Background) */}
      <section id="about" className="w-full max-w-full overflow-x-hidden bg-white text-[#2b2b2b] flex flex-col items-center justify-center py-12">
        
        {/* Photo Stack Container */}
        <div className="w-full flex items-center justify-center pt-8 pb-6 px-4">
          <div className="relative w-60 h-72 sm:w-68 sm:h-80 mx-auto flex items-center justify-center">
            {/* Main Polaroid Card */}
            <div className="relative z-10 w-48 sm:w-56 aspect-[3/4] bg-white p-2.5 shadow-xl rounded-sm -rotate-2 transform hover:rotate-0 transition duration-300 border border-stone-200">
              <img
                src={portfolioData.about.photoSmall}
                alt="Creative Director Portrait"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Secondary Accent Card */}
            <div className="absolute -right-2 top-3 z-0 w-36 sm:w-40 aspect-[3/4] bg-stone-200 p-2 shadow-md rounded-sm rotate-3 transform opacity-80">
              <img
                src={portfolioData.about.photoLarge}
                alt="Design Studio Showcase"
                className="w-full h-full object-cover grayscale block"
              />
            </div>
          </div>
        </div>

        {/* Centered Text & Bio Section */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-6 pb-12 flex flex-col items-center text-center">
          {/* Badge / Subtitle */}
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-red-600 font-semibold mb-2">
            CURRENT FOCUS
          </span>

          {/* Location / Status */}
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 mb-4">
            <span className="text-red-500 text-sm">📍</span>
            <span>{portfolioData.about.location || "Based in London, UK — Working Worldwide"}</span>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs sm:max-w-sm mx-auto">
            <p>
              {portfolioData.about.storyParagraph1}
            </p>
            <p>
              {portfolioData.about.storyParagraph2}
            </p>
          </div>

          {/* Protected Action: Download CV */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <button 
              onClick={handleDownloadCV}
              className="px-8 py-3.5 bg-[#2b2b2b] hover:bg-red-600 text-white font-black text-xs tracking-widest uppercase transition-all flex items-center gap-2 rounded-md cursor-pointer border-none"
            >
              Download CV <Download size={13} />
            </button>

            {cvDownloadStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 mt-2"
              >
                <CheckCircle2 size={14} />
                <span>Executive CV & Rate Card unlocked for {user?.name || 'Verified Client'}</span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION (Vibrant Red Accent Background) */}
      <section 
        id="skills" 
        style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full bg-[#E6392F] text-white overflow-hidden py-10 px-5 sm:px-8 box-border relative"
      >
        {/* Geometric outline overlay pattern */}
        <div className="absolute inset-0 select-none opacity-5 geometric-pattern pointer-events-none" />

        <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-start justify-center relative z-10">
          <span className="text-[11px] font-mono tracking-[0.25em] text-white/80 uppercase font-semibold block mb-2">
            {portfolioData.skills.eyebrow || 'MY SKILLS'}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight break-words">
            VISUAL APTITUDE
            <br />
            DESIGN SYSTEMS
          </h2>
          <div className="w-12 h-1 bg-white mt-3 mb-4 rounded-full" />
          <p className="text-xs sm:text-sm text-white/90 max-w-sm leading-relaxed mb-8">
            {portfolioData.skills.desc || "A breakdown of my technical capabilities and creative direction disciplines."}
          </p>

          {/* Skill Bars List */}
          <div className="w-full flex flex-col gap-5">
            {portfolioData.skills.items.map((skill, index) => (
              <div key={index} className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-white/90">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="Capabilities" title="My Specialties" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.services.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Layers;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white hover:bg-[#2b2b2b] border border-zinc-200 hover:border-[#2b2b2b] p-8 transition-all duration-300 relative border-offset hover:shadow-2xl"
              >
                <div className="w-12 h-12 bg-[#E6392F] text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <IconComponent size={20} />
                </div>

                <h3 className="text-xl font-black uppercase text-[#2b2b2b] group-hover:text-white mb-3 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-xs text-[#2b2b2b]/70 group-hover:text-white/75 font-sans leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 bg-[#2b2b2b] text-white border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeading eyebrow="Selected Works" title="Check my portfolio" lightBg={false} />

          {/* Filter triggers */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/5">
            {projectFilters.map((filter, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2 text-[10px] font-sans tracking-widest uppercase font-black transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#E6392F] text-white'
                    : 'bg-transparent text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects masonry/grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer bg-zinc-850 p-4 border border-white/5 hover:border-[#E6392F] transition-all flex flex-col gap-4 relative overflow-hidden"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-800">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter brightness-85 group-hover:scale-101 group-hover:brightness-100 transition-all duration-[800ms]"
                  />
                  <div className="absolute inset-0 bg-[#E6392F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-[#2b2b2b] px-4 py-2 text-[10px] font-sans tracking-widest uppercase flex items-center gap-1.5 font-black rounded-none shadow-md">
                      <Maximize2 size={11} /> Project Details
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mt-1 px-1">
                  <div>
                    <h4 className="text-xl font-black uppercase text-white group-hover:text-[#E6392F] transition-colors leading-tight">
                      {project.title}
                    </h4>
                    <span className="text-[10px] font-sans tracking-widest text-[#E6392F] uppercase font-black mt-1 block">
                      {project.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-sans text-white/40 block uppercase">
                      YEAR
                    </span>
                    <span className="text-xs font-sans text-white/80 font-semibold">
                      {project.specs.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="Guest Quotes" title="Client Testimonials" />

        <div className="max-w-3xl mx-auto relative bg-white border border-zinc-200 p-8 md:p-12 border-offset">
          
          <div className="text-5xl font-serif text-[#E6392F] font-black absolute top-4 left-6 select-none opacity-20 pointer-events-none">
            “
          </div>

          <div className="relative min-h-[160px] md:min-h-[140px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-6"
              >
                <p className="text-sm md:text-base text-[#2b2b2b]/80 leading-relaxed font-sans italic text-justify">
                  {portfolioData.testimonials[activeTestimonial].quote}
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={portfolioData.testimonials[activeTestimonial].photo} 
                    alt={portfolioData.testimonials[activeTestimonial].name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#E6392F] flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-black uppercase text-[#2b2b2b]">
                      {portfolioData.testimonials[activeTestimonial].name}
                    </h4>
                    <span className="text-[10px] font-sans tracking-widest text-[#E6392F] uppercase font-black mt-0.5 block">
                      {portfolioData.testimonials[activeTestimonial].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial slider buttons */}
          <div className="flex justify-end gap-3 mt-8 border-t border-zinc-100 pt-6">
            <button 
              onClick={handlePrevTestimonial}
              className="p-2 border border-zinc-200 hover:bg-[#E6392F] hover:border-[#E6392F] hover:text-white transition-colors text-[#2b2b2b] focus:outline-none"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextTestimonial}
              className="p-2 border border-zinc-200 hover:bg-[#E6392F] hover:border-[#E6392F] hover:text-white transition-colors text-[#2b2b2b] focus:outline-none"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. BLOG SECTION */}
      <section id="blog" className="py-24 bg-[#080b15]/5 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeading eyebrow="Visual Insights" title="Creative Blog" />

          {/* Articles list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.blogPosts.map((post) => (
              <article 
                key={post.id}
                onClick={() => setSelectedArticle(post)}
                className="group cursor-pointer bg-white border border-zinc-200 overflow-hidden flex flex-col md:grid md:grid-cols-12 hover:shadow-xl transition-all border-offset-dark"
              >
                {/* Image */}
                <div className="col-span-12 md:col-span-5 h-[180px] sm:h-[200px] md:h-full relative overflow-hidden bg-zinc-200">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-101 transition-all duration-700"
                  />
                </div>

                {/* Content */}
                <div className="col-span-12 md:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-sans tracking-widest text-[#E6392F] uppercase font-black block mb-2">
                      {post.date}
                    </span>
                    <h3 className="text-lg font-black uppercase text-[#2b2b2b] group-hover:text-[#E6392F] transition-colors leading-tight mb-3">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#2b2b2b]/70 font-sans leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(post);
                    }}
                    className="text-[10px] font-sans tracking-widest uppercase font-black text-[#2b2b2b] group-hover:text-[#E6392F] transition-colors flex items-center gap-1.5 mt-6 border-b border-transparent hover:border-[#E6392F] w-fit pb-0.5"
                  >
                    Read Article <ArrowRight size={10} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section 
        id="contact" 
        style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full overflow-x-hidden bg-[#111111] text-white flex flex-col items-center justify-center py-12 px-4 box-border"
      >
        {/* Contact Intro Header */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto text-center mb-6 px-2">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#E6392F] uppercase font-semibold block mb-2">
            DIRECT CONNECTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
            LET'S BUILD TOGETHER
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 leading-relaxed">
            Have a campaign, brand blueprint, or visual catalog that needs structural creative strategy? Drop me a line.
          </p>
        </div>

        {/* Centered Form Card Container */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 pb-8 flex flex-col items-center justify-center box-border">
          <div className="w-full bg-[#1c1c1e] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-xl box-border">
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-4 box-border">
              {/* Top Red Accent Line */}
              <div className="w-full h-1 bg-[#E6392F] rounded-full mb-2" />

              {/* Form Fields */}
              <div className="w-full text-left">
                <label className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1.5">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full box-border rounded-lg bg-[#2c2c2e] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E6392F] transition"
                />
                {formErrors.name && <span className="text-[10px] font-sans text-rose-400 mt-1.5 font-semibold block">{formErrors.name}</span>}
              </div>

              <div className="w-full text-left">
                <label className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full box-border rounded-lg bg-[#2c2c2e] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E6392F] transition"
                />
                {formErrors.email && <span className="text-[10px] font-sans text-rose-400 mt-1.5 font-semibold block">{formErrors.email}</span>}
              </div>

              <div className="w-full text-left">
                <label className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1.5">
                  YOUR MESSAGE
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your design parameters"
                  className="w-full box-border rounded-lg bg-[#2c2c2e] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E6392F] transition resize-none"
                />
                {formErrors.message && <span className="text-[10px] font-sans text-rose-400 mt-1.5 font-semibold block">{formErrors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full py-3.5 bg-[#E6392F] hover:bg-red-700 disabled:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition flex items-center justify-center gap-2 mt-1 cursor-pointer border-none"
              >
                {formStatus === 'loading' ? (
                  <span>SENDING BRIEF...</span>
                ) : formStatus === 'success' ? (
                  <span>BRIEF SUBMITTED SUCCESSFULLY!</span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <span>✈</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full max-w-full bg-[#111111] text-white/40 py-8 px-4 border-t border-white/5 flex flex-col items-center justify-center text-center box-border">
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col gap-2 text-[10px] font-mono tracking-widest uppercase">
          <span>© {new Date().getFullYear()} SASHA GREY. ALL RIGHTS RESERVED.</span>
          <span className="text-stone-600">HIGH-CONTRAST GEOMETRIC TEMPLATE</span>
        </div>
      </footer>

      {/* Project Lightbox detail modal */}
      <GalleryModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Article Detail modal */}
      <ArticleModal
        isOpen={!!selectedArticle}
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Dedicated Sign In & Client Portal Modal */}
      <SignIn
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authReason={authReason}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioMain />
    </AuthProvider>
  );
}
