import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Code, 
  Cpu, 
  Sparkles, 
  Mail, 
  MapPin, 
  Send, 
  ArrowRight,
  Maximize2,
  Lock
} from 'lucide-react';
import { portfolioData, projectFilters, filterMapping } from './data/portfolioData';
import NavBar from './components/NavBar';
import GalleryModal from './components/GalleryModal';
import SignIn from './components/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';

// Reusable Section Heading component
function SectionHeading({ number, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-10 sm:mb-16 w-full max-w-full"
    >
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span className="text-xs font-sans tracking-widest text-[#4da6ff] uppercase font-bold">{number}</span>
        <div className="w-8 h-[1px] bg-[#4da6ff]/30" />
        {subtitle && <span className="text-xs font-sans tracking-wider text-slate-500 uppercase font-medium">{subtitle}</span>}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight break-words">
        {title}
      </h2>
    </motion.div>
  );
}

// Map of icons for dynamic rendering
const ICON_MAP = {
  Layers: Layers,
  Code: Code,
  Cpu: Cpu,
  Sparkles: Sparkles
};

const SOCIAL_FA_MAP = {
  Github: "fa-brands fa-github",
  Linkedin: "fa-brands fa-linkedin-in",
  Twitter: "fa-brands fa-twitter"
};

function PortfolioMain() {
  const { isAuthenticated, user } = useAuth();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Authentication Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

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

  const executeFormSubmit = () => {
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!isAuthenticated) {
      setAuthReason('Client partner authentication required to send direct project inquiries & engineering requests.');
      setPendingAction(() => () => executeFormSubmit());
      setIsAuthModalOpen(true);
      return;
    }

    executeFormSubmit();
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

  // Filter projects list
  const filteredProjects = selectedFilter === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(proj => proj.tag === filterMapping[selectedFilter]);

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#0d0f12] text-white font-sans selection:bg-[#4da6ff] selection:text-slate-950 grid-overlay">
      
      {/* STICKY TOP NAVBAR */}
      <NavBar onOpenAuth={() => { setAuthReason(''); setIsAuthModalOpen(true); }} />

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto relative overflow-hidden" style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}>
        <div className="w-full flex flex-col items-center text-center z-10 max-w-full">
          
          {/* Circular avatar with glowing accent-color ring */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-[#4da6ff] to-transparent glow-ring mb-6 mx-auto flex-shrink-0"
          >
            <img 
              src={portfolioData.hero.profileImage} 
              alt="Profile avatar" 
              className="w-full h-full object-cover rounded-full border border-slate-950"
            />
          </motion.div>

          {/* Status badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4da6ff]/10 border border-[#4da6ff]/20 text-[10px] font-sans tracking-widest text-[#4da6ff] uppercase font-bold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {portfolioData.brand.statusBadge}
          </motion.div>

          {/* Title and Role Highlight */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl break-words"
          >
            I'm <span className="text-[#4da6ff] glow-text">{portfolioData.brand.siteName}</span>, a product designer & developer building delightful digital experiences.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed"
          >
            {portfolioData.hero.subtext}
          </motion.p>

          {/* CTA triggers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a 
              href={portfolioData.hero.cta.primary.href}
              className="glow-btn px-8 py-3 rounded-full bg-[#4da6ff] text-slate-950 font-bold text-xs tracking-widest uppercase flex items-center gap-1.5 hover:bg-[#3393f2]"
            >
              {portfolioData.hero.cta.primary.label} <ArrowRight size={13} />
            </a>
            <a 
              href={portfolioData.hero.cta.secondary.href}
              className="px-8 py-3 rounded-full border border-slate-700 hover:border-slate-500 hover:text-white transition-colors font-bold text-xs tracking-widest uppercase"
            >
              {portfolioData.hero.cta.secondary.label}
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto border-t border-slate-900/50" style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}>
        <SectionHeading number="01 // BACKGROUND" title="About My Studio" subtitle="The Narrative" />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full max-w-full">
          {/* Centered Showcase Image Card */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto pt-4 sm:pt-8 pb-4 sm:pb-6 px-2 sm:px-4 flex items-center justify-center">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900 group">
              <img 
                src={portfolioData.about.image} 
                alt="Design & Development Experience Showcase" 
                className="w-full h-full object-cover block mx-auto filter grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80';
                }}
              />
            </div>
          </div>

          {/* Centered Text & Bio Section */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col items-start sm:items-center text-left sm:text-center">
            {/* Badge */}
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-blue-400 font-bold mb-3">
              CRAFT ETHIC
            </span>

            {/* Paragraph Text with Auto-Wrap */}
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm break-words">
              {portfolioData.about.story}
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-900/60 mt-6 w-full max-w-sm">
              {portfolioData.about.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-sans tracking-widest text-[#4da6ff]/80 uppercase font-bold mt-1 text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-16 sm:py-24 bg-[#080b15]/40 border-y border-slate-900/50 w-full max-w-full overflow-x-hidden">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading number="02 // CAPABILITIES" title="Services & Solutions" subtitle="Core Offerings" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.services.map((service) => {
              const IconComponent = ICON_MAP[service.icon] || Layers;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-[#0d1222]/80 hover:bg-[#0f172a] border border-slate-800/80 hover:border-slate-700/80 p-6 rounded-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#4da6ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-10 h-10 rounded-lg bg-[#4da6ff]/5 border border-[#4da6ff]/10 flex items-center justify-center text-[#4da6ff] mb-5 group-hover:bg-[#4da6ff]/15 group-hover:scale-105 transition-all">
                    <IconComponent size={20} />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-[#4da6ff] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto">
        <SectionHeading number="03 // TOOLKIT" title="Technical & Design Skills" subtitle="Stack Strength" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.skills.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0b0e1a]/80 border border-slate-900/80 p-5 sm:p-6 rounded-xl"
            >
              <h3 className="text-xs sm:text-sm font-sans tracking-widest text-[#4da6ff] uppercase font-bold border-b border-slate-900 pb-3 mb-6">
                {cat.category}
              </h3>
              
              {/* Skill Bars */}
              <div className="flex flex-col gap-5">
                {cat.items.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-xs text-slate-300 font-sans font-medium">{skill.name}</span>
                      <span className="text-[10px] text-slate-500 font-sans">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#4da6ff] to-sky-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION */}
      <section id="experience" className="py-16 sm:py-24 bg-[#080b15]/40 border-y border-slate-900/50 w-full max-w-full overflow-x-hidden">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading number="04 // HISTORY" title="Professional Experience" subtitle="Timeline Journey" />

          {/* Timeline container */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-3xl mx-auto relative border-l border-slate-800/80 pl-6 sm:pl-8 md:pl-10">
            {portfolioData.experience.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#05070f] border-2 border-[#4da6ff] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#4da6ff]" />
                </div>

                <div className="bg-[#0b0e1a]/80 border border-slate-900/60 p-4 sm:p-6 rounded-xl hover:border-slate-800/60 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{exp.role}</h3>
                      <span className="text-xs font-sans text-[#4da6ff]/80 font-medium">{exp.company}</span>
                    </div>
                    <span className="text-[10px] font-sans tracking-wider text-slate-500 font-bold uppercase bg-slate-900 px-3 py-1 rounded-full border border-slate-800 self-start md:self-auto">
                      {exp.dates}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PORTFOLIO / PROJECTS SECTION */}
      <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto">
        <SectionHeading number="05 // SHOWCASE" title="Selected Projects" subtitle="Product Gallery" />

        {/* Filters bar */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-900 justify-center sm:justify-start">
          {projectFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-widest uppercase font-bold border transition-all ${
                selectedFilter === filter
                  ? 'bg-[#4da6ff] text-slate-950 border-[#4da6ff] shadow-sm'
                  : 'bg-transparent text-slate-400 border-slate-850 hover:text-white hover:border-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group cursor-pointer bg-[#0b0e1a]/85 border border-slate-900/60 p-4 rounded-xl hover:border-slate-800/60 transition-all flex flex-col gap-4"
            >
              <div className="relative aspect-[16/10] bg-slate-900 rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-102 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#05070f]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 text-slate-950 px-4 py-2 text-[10px] font-sans tracking-widest uppercase flex items-center gap-1.5 shadow-md font-bold rounded-sm">
                    <Maximize2 size={11} /> View Details
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-baseline px-1">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#4da6ff] transition-colors">
                    {project.title}
                  </h4>
                  <span className="text-[10px] font-sans tracking-widest text-[#4da6ff]/80 uppercase font-bold mt-0.5 block">
                    {project.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-sans text-slate-500 block uppercase">
                    YEAR
                  </span>
                  <span className="text-xs font-sans text-slate-400 font-medium">
                    {project.specs.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section 
        id="contact" 
        className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#0d0f12] py-8 sm:py-12 px-4 flex flex-col items-center justify-center border-t border-white/5 relative"
        style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
      >
        <div className="w-full max-w-sm sm:max-w-md mx-auto text-center mb-6">
          <SectionHeading number="06 // CONNECTION" title="Let's build together" subtitle="Get in Touch" />
        </div>

        {/* Top Safe-Area / Location & Social Header */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center justify-center gap-4 mb-6">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-stone-400">
            {portfolioData.contact.location || "SAN FRANCISCO, CALIFORNIA"}
          </span>
          <div className="flex items-center justify-center gap-3">
            {portfolioData.contact.socials.map((soc, idx) => {
              const faClass = SOCIAL_FA_MAP[soc.icon] || "fa-solid fa-link";
              return (
                <a 
                  key={idx} 
                  href={soc.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition"
                >
                  <i className={faClass}></i>
                </a>
              );
            })}
          </div>
        </div>

        {/* Fluid, Centered Contact Form Card */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 pb-12 flex flex-col items-center justify-center">
          <form onSubmit={handleFormSubmit} className="w-full bg-[#11141a] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
            {/* Blue Top Accent Glow Line */}
            <div className="w-full h-1 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)] mb-2" />

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
                className="w-full box-border rounded-lg bg-[#181d26] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
              />
              {formErrors.name && <span className="text-[10px] font-sans text-rose-400 mt-1 block">{formErrors.name}</span>}
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
                className="w-full box-border rounded-lg bg-[#181d26] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
              />
              {formErrors.email && <span className="text-[10px] font-sans text-rose-400 mt-1 block">{formErrors.email}</span>}
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
                placeholder="Describe your project"
                className="w-full box-border rounded-lg bg-[#181d26] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition resize-none"
              />
              {formErrors.message && <span className="text-[10px] font-sans text-rose-400 mt-1 block">{formErrors.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] transition flex items-center justify-center gap-2 mt-1"
            >
              {formStatus === 'loading' ? (
                <span>Sending Message...</span>
              ) : formStatus === 'success' ? (
                <span>Message Sent Successfully!</span>
              ) : (
                <>
                  <span>SEND MESSAGE</span>
                  <Send size={12} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#05070f] text-slate-500 py-10 px-4 sm:px-6 border-t border-slate-900 w-full max-w-full overflow-x-hidden">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-sans tracking-widest uppercase font-bold text-center md:text-left">
          <span>© {new Date().getFullYear()} AIDEN DRAKE. ALL RIGHTS RESERVED.</span>
          <span>DARK SINGLE PAGE ARCHITECTURE</span>
        </div>
      </footer>

      {/* Project Lightbox Detail Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Dedicated Client Sign In / Account Modal */}
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
