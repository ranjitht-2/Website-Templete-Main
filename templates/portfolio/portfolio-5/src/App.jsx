import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Code, 
  Cpu, 
  Send, 
  Briefcase, 
  Calendar,
  CheckCircle,
  Eye,
  MapPin,
  Mail,
  ArrowRight,
  Maximize2,
  X,
  Lock,
  Download,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { portfolioData, projectFilters, filterMapping } from './data/portfolioData';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop, { ScrollToTopButton } from './components/ScrollToTop';
import { useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';

// Auth Modal Context for triggering login/signup from any protected action
export const AuthModalContext = createContext({
  openAuthModal: () => {},
  closeAuthModal: () => {}
});

export const useAuthModal = () => useContext(AuthModalContext);

// Helper for page transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-[75vh]"
    >
      {children}
    </motion.div>
  );
}

// Reusable Section Heading
function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-12 sm:mb-16 text-left max-w-full">
      <span className="text-[10px] font-sans tracking-[0.25em] text-[#e8583f] uppercase font-black block mb-3">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight break-words max-w-full">
        {title}
      </h2>
      <div className="w-12 h-1 bg-[#e8583f] mt-4" />
    </div>
  );
}

const ICON_MAP = {
  Layers: Layers,
  Code: Code,
  Cpu: Cpu
};

// ---------------- PAGES ----------------

// 1. HOME PAGE
function HomePage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section 
        style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
        className="w-full max-w-sm sm:max-w-md lg:max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-12 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-zinc-900"
      >
        {/* Responsive Portrait Image (Centered on mobile, separated from text) */}
        <div className="w-36 h-44 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border border-white/10 shadow-xl mx-auto lg:mx-0 shrink-0 bg-stone-900">
          <img
            src={portfolioData.hero.backgroundPortrait}
            alt="Evelyn Vance"
            className="w-full h-full object-cover block"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Headline, Bio, and Action Button */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-xs sm:max-w-sm lg:max-w-xl">
          <span className="text-[10px] font-sans tracking-[0.25em] text-[#e8583f] uppercase font-black block">
            • MULTIPAGE ROUTED SYSTEM
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-white leading-tight tracking-tight text-center lg:text-left">
            Cohesive visual ecosystems and full-stack software products.
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
            Hello, I'm Evelyn Vance, a Visual Architect based in London. I design beautiful grid systems, outline components, and write structural full-stack React code.
          </p>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-3 bg-[#E6392F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition text-center"
            >
              VIEW WORK
            </Link>
            <Link 
              to="/contact"
              className="text-xs font-sans tracking-widest uppercase font-bold text-white hover:text-[#e8583f] transition-colors border-b border-white/20 hover:border-[#e8583f] pb-0.5"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Teaser section: Services */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <SectionHeading eyebrow="CAPABILITIES" title="Core Solutions" />
          <Link to="/services" className="text-xs font-sans tracking-widest uppercase font-bold text-[#e8583f] hover:text-white transition-colors flex items-center gap-1">
            View All Services <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.services.slice(0, 3).map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || Layers;
            return (
              <div key={idx} className="bg-[#141414] border border-zinc-900 p-8">
                <div className="w-10 h-10 bg-[#e8583f]/10 border border-[#e8583f]/25 text-[#e8583f] flex items-center justify-center mb-6">
                  <IconComponent size={18} />
                </div>
                <h3 className="text-xl text-white font-serif mb-3 uppercase">{item.title}</h3>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}

// 2. ABOUT PAGE
function AboutPage() {
  return (
    <PageWrapper>
      <section 
        style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full overflow-x-hidden bg-[#0e0e0e] py-10 sm:py-16 px-4 sm:px-6"
      >
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center justify-center text-center">
          {/* Centered Circular Portrait Image Container */}
          <div className="relative mx-auto mb-8 pt-4 flex items-center justify-center">
            {/* Outer Accent Ring */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-[#c85a32] p-1.5 flex items-center justify-center bg-[#181818] shadow-2xl">
              {/* Inner Image */}
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={portfolioData.hero.avatar}
                  alt="Evelyn Vance"
                  className="w-full h-full object-cover rounded-full block"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Centered Headline, Badge, and Bio Text */}
          <div className="w-full flex flex-col items-center text-center">
            {/* Role Badge */}
            <div className="inline-block px-3 py-1 bg-red-950/40 border border-red-800/40 rounded-sm mb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-red-400 font-semibold">
                VISUAL DESIGNER &amp; SOFTWARE ENGINEER
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-serif text-white tracking-tight leading-snug mb-4 max-w-xs sm:max-w-sm">
              Transforming Ideas into Digital Reality
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-400 leading-relaxed max-w-xs sm:max-w-sm px-2">
              <p>
                I establish unified design systems that ease handoff from concept to finished product. My design methodology emphasizes high contrast structures, custom outline cards, and elegant serif typography.
              </p>
              <p>
                With a dual degree in fine arts and computer science, I balance visual craft with robust, maintainable architecture, helping fast-growing companies define their UI frameworks from the ground up.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-zinc-900 mt-10 w-full max-w-xs sm:max-w-sm">
              {portfolioData.about.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-serif font-black text-white">{stat.value}</span>
                  <span className="text-[9px] font-sans tracking-widest uppercase font-bold text-zinc-600 mt-1.5 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// 3. RESUME PAGE
function ResumePage() {
  const { isAuthenticated, user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCV = () => {
    if (!isAuthenticated) {
      openAuthModal(
        'Client authentication required to download confidential resume credentials & technical architecture dossier.',
        () => {
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 4000);
        }
      );
      return;
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <PageWrapper>
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <SectionHeading eyebrow="MY TIMELINE" title="Resume & Experience" />
          
          {/* Protected Action: Download Dossier */}
          <button
            onClick={handleDownloadCV}
            className="px-6 py-3 bg-[#161616] hover:bg-[#E6392F] text-white border border-white/10 hover:border-[#E6392F] rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle size={14} className="text-emerald-400" />
                <span>DOSSIER DOWNLOADED (PDF)</span>
              </>
            ) : isAuthenticated ? (
              <>
                <Download size={14} className="text-[#E6392F]" />
                <span>DOWNLOAD FULL CV (PDF)</span>
              </>
            ) : (
              <>
                <Lock size={14} className="text-[#E6392F]" />
                <span>UNLOCK CONFIDENTIAL CV</span>
              </>
            )}
          </button>
        </div>

        {downloadSuccess && (
          <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center gap-3">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Verified Client Access Granted: Evelyn Vance 2026 Full Architecture Dossier & References unlocked for {user?.email}.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Work experience timeline */}
          <div>
            <h3 className="text-xl text-white font-serif uppercase mb-10 pb-2 border-b border-zinc-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e8583f] rounded-full" /> Professional Journey
            </h3>
            
            <div className="relative border-l border-zinc-800 pl-6 ml-2 flex flex-col gap-10">
              {portfolioData.resume.experience.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#0d0d0d] border-2 border-[#e8583f]" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-base text-white font-serif font-semibold">{item.role}</h4>
                    <span className="text-[9px] font-sans tracking-widest text-[#e8583f] font-bold uppercase bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800">{item.dates}</span>
                  </div>
                  <div className="text-xs text-zinc-500 font-sans mb-3">{item.company}</div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education timeline + Skills */}
          <div className="flex flex-col gap-16">
            <div>
              <h3 className="text-xl text-white font-serif uppercase mb-10 pb-2 border-b border-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#e8583f] rounded-full" /> Academic Studies
              </h3>

              <div className="relative border-l border-zinc-800 pl-6 ml-2 flex flex-col gap-10">
                {portfolioData.resume.education.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#0d0d0d] border-2 border-[#e8583f]" />
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-base text-white font-serif font-semibold">{item.degree}</h4>
                      <span className="text-[9px] font-sans tracking-widest text-[#e8583f] font-bold uppercase bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800">{item.dates}</span>
                    </div>
                    <div className="text-xs text-zinc-500 font-sans mb-3">{item.institution}</div>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Bars */}
            <div>
              <h3 className="text-xl text-white font-serif uppercase mb-8 pb-2 border-b border-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#e8583f] rounded-full" /> Technical Aptitudes
              </h3>

              <div className="flex flex-col gap-5">
                {portfolioData.resume.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-300">
                        {skill.name}
                      </span>
                      <span className="text-xs font-sans font-bold text-[#e8583f]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-zinc-900 overflow-hidden rounded-none">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#e8583f] to-rose-400 rounded-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// 4. SERVICES PAGE
function ServicesPage() {
  return (
    <PageWrapper>
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="WHAT I OFFER" title="Services & Solutions" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.services.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || Layers;
            return (
              <div key={idx} className="bg-[#141414] border border-zinc-900 p-10 hover:border-zinc-800 transition-colors">
                <div className="w-12 h-12 bg-[#e8583f]/10 border border-[#e8583f]/25 text-[#e8583f] flex items-center justify-center mb-8">
                  <IconComponent size={20} />
                </div>
                <h3 className="text-2xl text-white font-serif mb-4 uppercase">{item.title}</h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed text-justify">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}

// 5. PORTFOLIO PAGE
function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxProject, setLightboxProject] = useState(null);
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const filteredProjects = selectedFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(proj => proj.tag === filterMapping[selectedFilter]);

  const handleInquireProject = (project) => {
    if (!isAuthenticated) {
      openAuthModal(
        `Sign in or create a client profile to request full repository specs and architecture schematics for ${project.title}.`,
        () => {
          setLightboxProject(null);
          navigate('/contact');
        }
      );
    } else {
      setLightboxProject(null);
      navigate('/contact');
    }
  };

  return (
    <PageWrapper>
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="CREATIVE WORK" title="Selected Projects" />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-zinc-900">
          {projectFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 text-[10px] font-sans tracking-widest uppercase font-black transition-all cursor-pointer border-none ${
                selectedFilter === filter
                  ? 'bg-[#e8583f] text-white'
                  : 'bg-transparent text-zinc-500 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setLightboxProject(project)}
              className="group cursor-pointer bg-[#141414] border border-zinc-900 p-4 hover:border-zinc-800 transition-all flex flex-col gap-4"
            >
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-zinc-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90 group-hover:opacity-100 filter brightness-95"
                />
                <div className="absolute inset-0 bg-[#e8583f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#e8583f] text-white px-4 py-2 text-[9px] font-sans tracking-widest uppercase flex items-center gap-1.5 font-bold shadow-md">
                    <Maximize2 size={11} /> Project Details
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-baseline px-1 font-sans">
                <div>
                  <h4 className="text-lg text-white font-serif group-hover:text-[#e8583f] transition-colors">
                    {project.title}
                  </h4>
                  <span className="text-[10px] font-sans tracking-widest text-[#e8583f] uppercase font-bold mt-0.5 block">
                    {project.category}
                  </span>
                </div>
                <span className="text-xs text-zinc-500 font-semibold">{project.specs.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reusable inline Lightbox modal */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0" onClick={() => setLightboxProject(null)} />
            
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 25, opacity: 0 }}
              className="relative bg-[#141414] border border-zinc-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 flex flex-col md:grid md:grid-cols-12 overflow-hidden text-zinc-300 font-sans"
            >
              <button
                onClick={() => setLightboxProject(null)}
                className="absolute top-4 right-4 p-2 bg-[#e8583f] hover:bg-[#cf472f] text-white transition-colors z-20 cursor-pointer border-none"
              >
                <X size={16} />
              </button>

              <div className="col-span-12 md:col-span-7 h-[220px] sm:h-[280px] md:h-full min-h-[220px] relative overflow-hidden bg-zinc-900">
                <img src={lightboxProject.image} alt={lightboxProject.title} className="w-full h-full object-cover object-center" />
              </div>

              <div className="col-span-12 md:col-span-5 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-sans tracking-widest text-[#e8583f] uppercase font-bold mb-2 block">{lightboxProject.category}</span>
                  <h3 className="text-3xl font-serif text-white tracking-tight leading-none uppercase mb-4">{lightboxProject.title}</h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed text-justify mt-4">{lightboxProject.description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Briefcase size={14} className="text-[#e8583f]" />
                    <div>
                      <div className="text-[9px] text-zinc-500 uppercase font-black">ROLE</div>
                      <div className="text-xs text-white font-sans">{lightboxProject.specs.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-[#e8583f]" />
                    <div>
                      <div className="text-[9px] text-zinc-500 uppercase font-black">YEAR</div>
                      <div className="text-xs text-white font-sans">{lightboxProject.specs.year}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInquireProject(lightboxProject)}
                    className="w-full mt-2 py-3 bg-[#E6392F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    <span>INQUIRE ON ARCHITECTURE</span>
                    <ArrowRight size={13} />
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

// 6. PRICING SUBPAGE
function PricingPage() {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const handleChoosePackage = (packageName) => {
    if (!isAuthenticated) {
      openAuthModal(
        `Sign in or register a client account to initialize and book the ${packageName} consultation tier.`,
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
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="PLAN PRICING" title="Consultation Packages" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {portfolioData.pricing.map((plan, idx) => (
            <div key={idx} className="bg-[#141414] border border-zinc-900 p-8 flex flex-col justify-between relative">
              {idx === 1 && (
                <span className="absolute top-4 right-4 bg-[#e8583f] text-white text-[9px] font-sans tracking-widest uppercase font-black px-2.5 py-1">
                  POPULAR
                </span>
              )}
              
              <div>
                <h3 className="text-xl text-white font-serif uppercase mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-serif text-white">{plan.price}</span>
                  <span className="text-xs text-zinc-500 font-sans">/ {plan.period}</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6 pb-6 border-b border-zinc-900">{plan.desc}</p>
                
                <ul className="flex flex-col gap-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-zinc-300 font-sans flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#e8583f] rounded-full" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleChoosePackage(plan.name)}
                className="w-full text-center py-3 bg-zinc-900 hover:bg-[#e8583f] hover:text-white text-zinc-300 font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer border-none"
              >
                Choose Package
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

// 7. TEAM SUBPAGE
function TeamPage() {
  return (
    <PageWrapper>
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading eyebrow="PARTNERS" title="Creative Team" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {portfolioData.team.map((member, idx) => (
            <div key={idx} className="bg-[#141414] border border-zinc-900 p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
              <img 
                src={member.photo} 
                alt={member.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover filter grayscale border-2 border-zinc-800 flex-shrink-0"
              />
              <div className="font-sans">
                <h4 className="text-lg text-white font-serif uppercase">{member.name}</h4>
                <span className="text-[10px] font-sans tracking-widest text-[#e8583f] uppercase font-bold block mt-1">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}

// 8. CONTACT PAGE (Protected Brief Submission)
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

  const executeSubmission = () => {
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
        'Please sign in or create a client account to submit your engineering brief directly to Evelyn Vance.',
        () => {
          executeSubmission();
        }
      );
      return;
    }

    executeSubmission();
  };

  return (
    <PageWrapper>
      <section 
        style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full overflow-x-hidden bg-[#0e0e0e] pt-8 sm:pt-12 pb-16 px-4 sm:px-6"
      >
        {/* Top Safe-Area Padding & Contact Header Centering */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">LOCATION</span>
              <span className="text-xs sm:text-sm font-medium text-white">{portfolioData.brand.location || 'London, UK'}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">EMAIL</span>
            <a href={`mailto:${portfolioData.brand.email || 'evelyn@vance.design'}`} className="text-xs sm:text-sm font-medium text-white hover:text-orange-400 transition">
              {portfolioData.brand.email || 'evelyn@vance.design'}
            </a>
          </div>
        </div>

        {/* Fluid, Centered Form Card */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 pb-12 flex flex-col items-center justify-center box-border">
          <form onSubmit={handleFormSubmit} className="w-full bg-[#161616] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 box-border">
            {/* Top Orange Accent Divider */}
            <div className="w-full h-1 bg-[#E6392F] rounded-full mb-2" />

            {/* Authenticated Client Status Indicator */}
            {isAuthenticated && user && (
              <div className="w-full bg-[#222222] border border-[#E6392F]/30 px-3.5 py-2.5 rounded-lg text-xs flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <UserCheck size={13} className="text-[#E6392F]" />
                  AUTHENTICATED AS:
                </span>
                <span className="text-white font-bold text-xs truncate max-w-[140px]">{user.name}</span>
              </div>
            )}

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
                className="w-full box-border rounded-lg bg-[#222222] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E6392F] transition"
              />
              {formErrors.name && <span className="text-[10px] font-sans text-rose-400 mt-1.5 font-bold block">{formErrors.name}</span>}
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
                className="w-full box-border rounded-lg bg-[#222222] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E6392F] transition"
              />
              {formErrors.email && <span className="text-[10px] font-sans text-rose-400 mt-1.5 font-bold block">{formErrors.email}</span>}
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
                className="w-full box-border rounded-lg bg-[#222222] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#E6392F] transition resize-none"
              />
              {formErrors.message && <span className="text-[10px] font-sans text-rose-400 mt-1.5 font-bold block">{formErrors.message}</span>}
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
                <span className="flex items-center gap-1"><CheckCircle size={14} /> BRIEF SUBMITTED TO EVELYN!</span>
              ) : (
                <>
                  <span>SEND MESSAGE</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}

// 9. DEDICATED SIGN IN / REGISTRATION PAGE
function SignInPage() {
  return (
    <PageWrapper>
      <section 
        style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
        className="w-full max-w-full overflow-x-hidden bg-[#0e0e0e] pt-6 sm:pt-10 pb-16 px-4 sm:px-6 flex items-center justify-center"
      >
        <SignIn isStandalonePage={true} />
      </section>
    </PageWrapper>
  );
}

// ---------------- MAIN CONTAINER ----------------

export default function App() {
  const location = useLocation();
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
      <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#0e0e0e] text-zinc-300 flex flex-col justify-between selection:bg-[#e8583f] selection:text-white">
        
        {/* Reset Scroll position on route changes */}
        <ScrollToTop />

        {/* NAVBAR */}
        <NavBar />

        {/* ROUTE DEFINITIONS */}
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/index.html" element={<HomePage />} />
              <Route path="index.html" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signin" element={<SignInPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <Footer />

        {/* Scroll to Top floating action */}
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
