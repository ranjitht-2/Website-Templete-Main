import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  User, 
  Lock, 
  Bookmark, 
  FileText, 
  Check, 
  Send, 
  Building2, 
  Sparkles,
  Download
} from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import SectionHeading from './components/SectionHeading';
import ProjectCard from './components/ProjectCard';
import GalleryModal from './components/GalleryModal';
import SignIn from './components/SignIn';
import CommissionModal from './components/CommissionModal';
import { AuthProvider, useAuth } from './context/AuthContext';

function PortfolioOneMain() {
  const { isAuthenticated, user, logout, isProjectSaved, toggleSaveProject, savedProjects } = useAuth();

  const [expandedInfoRow, setExpandedInfoRow] = useState(null);
  
  // Auth Modal state
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [pendingAuthCallback, setPendingAuthCallback] = useState(null);

  // Commission Modal state
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    activeIndex: 0
  });

  const toggleInfoRow = (id) => {
    if (expandedInfoRow === id) {
      setExpandedInfoRow(null);
    } else {
      setExpandedInfoRow(id);
    }
  };

  const openLightbox = (images, index = 0) => {
    setLightbox({
      isOpen: true,
      images: images,
      activeIndex: index
    });
  };

  const closeLightbox = () => {
    setLightbox({
      ...lightbox,
      isOpen: false
    });
  };

  const setLightboxIndex = (index) => {
    setLightbox({
      ...lightbox,
      activeIndex: index
    });
  };

  // Protected Action Interceptor
  const requireAuth = (reason, actionCallback) => {
    if (isAuthenticated) {
      if (actionCallback) actionCallback();
    } else {
      setAuthReason(reason || 'Authentication is required to perform this architectural action.');
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

  const handleOpenCommission = () => {
    requireAuth(
      'Authenticate to submit an architectural project commission and receive custom CAD blueprints.',
      () => {
        setIsCommissionOpen(true);
      }
    );
  };

  const handleSaveCommercialProject = (project) => {
    requireAuth(
      `Authenticate to bookmark ${project.title} to your client architectural moodboard.`,
      () => {
        toggleSaveProject(project);
      }
    );
  };

  const handleDownloadMasterplan = () => {
    requireAuth(
      'Authenticate to download the complete Urban Park landscape masterplan and CAD topographical vector assets.',
      () => {
        alert('Downloading Aethelgard Urban Park Vector Topography & Structural CAD package...');
      }
    );
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#F5F2EB] text-[#1a1a1a]">
      
      {/* 1. HERO / COVER SECTION */}
      <section id="design" className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-12 overflow-hidden">
        {/* Top Header Row with Client Portal Authentication Button */}
        <div className="flex justify-between items-start w-full z-10 border-b border-[#1a2b4a]/10 pb-6 gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-sans tracking-widest text-[#1a2b4a]/50 uppercase font-bold">
              {portfolioData.brand.subtitle}
            </span>
            <h1 className="text-lg sm:text-xl tracking-tight text-[#1a2b4a] font-light mt-1">
              {portfolioData.brand.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <span className="hidden sm:inline text-xs font-sans tracking-widest text-[#1a2b4a]/75 lowercase font-medium">
              {portfolioData.brand.url}
            </span>

            {/* Dedicated Sign In / Client Portal Trigger */}
            <button
              onClick={() => {
                setAuthReason('');
                setPendingAuthCallback(null);
                setIsSignInOpen(true);
              }}
              className="px-3.5 py-1.5 bg-[#1a2b4a] hover:bg-[#132038] text-[#FAF9F6] text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer border-none flex items-center gap-1.5 shadow-sm"
            >
              {isAuthenticated ? (
                <>
                  <User size={11} className="text-[#FAF9F6]" />
                  <span>{user?.name?.split(' ')[0] || 'CLIENT'} // PORTAL</span>
                </>
              ) : (
                <>
                  <Lock size={11} className="text-[#FAF9F6]" />
                  <span>CLIENT SIGN IN</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Big Title Row */}
        <div className="my-8 md:my-12 z-10 w-full max-w-full">
          <span className="text-xs font-sans tracking-[0.25em] text-[#1a2b4a]/60 uppercase font-semibold block mb-2">
            {portfolioData.hero.label}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter text-[#1a2b4a] leading-tight sm:leading-[0.9] uppercase break-words max-w-full">
            {portfolioData.hero.title}
          </h2>
        </div>

        {/* Visual Centerpiece & Nav Menu */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-end w-full z-10">
          {/* Menu */}
          <nav className="col-span-12 lg:col-span-4 w-full flex flex-col gap-4 border-t lg:border-t-0 border-[#1a2b4a]/10 pt-6 lg:pt-0">
            {portfolioData.navigation.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="group flex justify-between items-center py-2 border-b border-[#1a2b4a]/5 hover:border-[#1a2b4a]/20 transition-colors text-xs font-sans tracking-widest uppercase font-bold text-[#1a2b4a]/85"
              >
                <span>{item.label}</span>
                <span className="text-[9px] text-[#1a2b4a]/30 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            ))}

            {/* Protected Commission CTA */}
            <button
              onClick={handleOpenCommission}
              className="mt-2 w-full py-2.5 px-4 bg-white hover:bg-[#FAF9F6] border border-[#1a2b4a]/20 text-[#1a2b4a] text-xs font-mono tracking-widest uppercase font-bold transition-all cursor-pointer flex items-center justify-between group shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={12} className="text-[#1a2b4a]" />
                COMMISSION BLUEPRINT
              </span>
              <span className="text-[10px] text-[#1a2b4a]/40 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </nav>

          {/* Full-bleed centered image container */}
          <div className="col-span-12 lg:col-span-8 w-full relative group overflow-hidden shadow-sm">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                src={portfolioData.hero.image}
                alt="Architecture centerpiece"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[2000ms]"
              />
            </div>
            {/* Expertise overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 border border-[#1a2b4a]/5 rounded-sm">
              <span className="text-[10px] font-sans tracking-widest text-[#1a2b4a] uppercase font-bold">
                {portfolioData.brand.expertiseYears}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABLE OF CONTENTS SECTION */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 border-y border-[#1a2b4a]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] font-sans tracking-widest text-[#1a2b4a]/40 font-bold uppercase mb-8">
            INDEX // ARCHITECTURAL TAXONOMY
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
            {portfolioData.tableOfContents.map((item, idx) => (
              <a 
                key={idx} 
                href={item.href}
                className="group flex flex-col gap-3 p-2.5 sm:p-4 hover:bg-[#faf9f6] border border-transparent hover:border-[#1a2b4a]/5 transition-all duration-300"
              >
                <span className="text-2xl sm:text-3xl font-light text-[#1a2b4a]/20 group-hover:text-[#1a2b4a] transition-colors tracking-tight font-serif">
                  {item.index}
                </span>
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-50 border border-[#1a2b4a]/5">
                  <img 
                    src={item.thumbnail} 
                    alt={item.label} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-sans tracking-widest uppercase font-bold text-[#1a2b4a]/85 group-hover:text-[#1a2b4a] break-words">
                    {item.label}
                  </h4>
                  <span className="text-[9px] font-sans tracking-wider text-[#1a2b4a]/40 uppercase mt-0.5 block">
                    GO TO SECTION
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT / PHILOSOPHY / MANIFESTO SECTION */}
      <section 
        id="philosophy" 
        className="w-full max-w-full overflow-x-hidden py-12 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center"
        style={{ paddingTop: 'max(3rem, env(safe-area-inset-top))' }}
      >
        <SectionHeading number="02 / CONTEXT" title="Philosophy & Statement" subtitle="The Architect" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start w-full max-w-full">
          
          {/* Left Architect Portrait (Perfect Centering on mobile) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col items-center text-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:max-w-none">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-56 sm:w-64 aspect-[3/4] bg-white p-2.5 shadow-md border border-stone-300/60 rounded-sm mx-auto mb-4 flex items-center justify-center"
            >
              <img 
                src={portfolioData.about.portrait} 
                alt={portfolioData.about.architectName || "Alistair Thorne"} 
                className="w-full h-full object-cover block mx-auto filter grayscale hover:grayscale-0 transition-all duration-1000"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </motion.div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-stone-800 font-semibold mb-8 block text-center">
              {portfolioData.about.architectName || "ALISTAIR THORNE"}
            </span>
          </div>

          {/* Right Statement and Expandable info table */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-10 w-full max-w-full items-center lg:items-start">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-500 font-medium mb-3 block text-center lg:text-left">
                THE MANIFESTO
              </span>
              <blockquote className="text-sm sm:text-base lg:text-2xl xl:text-3xl font-serif italic text-stone-900 leading-relaxed text-center lg:text-left px-2 lg:px-0">
                "{portfolioData.about.statement}"
              </blockquote>
            </div>

            {/* Expandable Credentials Table */}
            <div className="flex flex-col border-t border-[#1a2b4a]/10 w-full max-w-full">
              {portfolioData.about.infoTable.map((row) => {
                const isOpen = expandedInfoRow === row.id;
                return (
                  <div key={row.id} className="border-b border-[#1a2b4a]/5">
                    <button
                      onClick={() => toggleInfoRow(row.id)}
                      className="w-full text-left py-5 flex items-center justify-between hover:text-[#1a2b4a]/75 transition-colors group cursor-pointer border-none bg-transparent"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 flex-grow pr-4">
                        <span className="col-span-12 md:col-span-4 text-xs font-sans tracking-widest text-[#1a2b4a] font-bold uppercase">
                          {row.label}
                        </span>
                        <span className="col-span-12 md:col-span-8 text-xs font-sans font-medium text-[#1a2b4a]/70 group-hover:text-[#1a2b4a]">
                          {row.summary}
                        </span>
                      </div>
                      <div>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    
                    {/* Collapsible Row Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-0 md:pl-[33%] text-xs font-sans text-[#1a2b4a]/85 leading-relaxed max-w-2xl">
                            {row.detail}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESIDENTIAL SECTION */}
      <section id="residential" className="py-24 bg-white border-y border-[#1a2b4a]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeading number="03 / DWELLINGS" title="Residential Works" subtitle="Spatials & Blueprints" />
          
          <div className="flex flex-col gap-12">
            {portfolioData.residentialProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onImageClick={openLightbox} 
                onRequireAuth={requireAuth}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMMERCIAL SECTION */}
      <section id="commercial" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <SectionHeading number="04 / ARCHES" title="Commercial Projects" subtitle="Scales & Facades" />
        
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Intro Text Column */}
          <div className="col-span-12 lg:col-span-4 pr-0 lg:pr-12">
            <span className="text-[10px] font-sans tracking-widest text-[#1a2b4a]/40 font-bold uppercase block mb-4">
              METROPOLITAN SYMMETRIES
            </span>
            <p className="text-sm font-sans text-[#1a2b4a]/75 leading-relaxed">
              {portfolioData.commercialProjects.introText}
            </p>

            <button
              onClick={handleOpenCommission}
              className="mt-8 px-4 py-3 bg-[#1a2b4a] hover:bg-[#132038] text-[#FAF9F6] text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer border-none flex items-center gap-2 shadow-sm"
            >
              <Building2 size={13} />
              <span>COMMISSION COMMERCIAL WORK</span>
            </button>
          </div>

          {/* Right Columns Grid - Masonry-like */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.commercialProjects.projects.map((project, idx) => {
              const isSaved = isProjectSaved(project.id);
              return (
                <div 
                  key={project.id}
                  className={`group flex flex-col gap-3 ${
                    idx === 1 ? 'md:mt-12' : ''
                  }`}
                >
                  <div 
                    onClick={() => openLightbox([project.image], 0)}
                    className="relative aspect-[4/5] bg-zinc-100 overflow-hidden border border-[#1a2b4a]/5 shadow-sm cursor-pointer"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#1a2b4a]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white px-4 py-2 text-[10px] font-sans tracking-widest uppercase flex items-center gap-1.5 shadow-md font-bold">
                        <Maximize2 size={10} /> View Facade
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mt-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-light tracking-tight text-[#1a2b4a] group-hover:text-[#1a2b4a]/85 font-serif">
                          {project.title}
                        </h4>
                        <button
                          onClick={() => handleSaveCommercialProject(project)}
                          className={`p-1 text-[10px] font-mono uppercase transition cursor-pointer border ${
                            isSaved 
                              ? 'bg-[#1a2b4a] text-white border-[#1a2b4a]' 
                              : 'bg-white hover:bg-[#FAF9F6] text-[#1a2b4a]/70 border-[#1a2b4a]/15'
                          }`}
                          title={isSaved ? 'Bookmarked' : 'Bookmark Façade'}
                        >
                          {isSaved ? <Check size={10} /> : <Bookmark size={10} />}
                        </button>
                      </div>
                      <span className="text-[9px] font-sans tracking-widest text-[#1a2b4a]/50 uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-sans text-[#1a2b4a]/40 block uppercase">
                        HEIGHT
                      </span>
                      <span className="text-xs font-sans font-medium text-[#1a2b4a]/80">
                        {project.specs.height}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. URBAN PARK INTEGRATION SECTION */}
      <section id="urban-park" className="py-24 bg-white border-t border-[#1a2b4a]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeading number="05 / INTEGRATIONS" title="Urban Park" subtitle="Landscapes & Topologies" />

          <div className="flex flex-col gap-8">
            <div 
              onClick={() => openLightbox([portfolioData.urbanPark.image], 0)}
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-zinc-100 overflow-hidden cursor-pointer group shadow-sm"
            >
              <img 
                src={portfolioData.urbanPark.image} 
                alt={portfolioData.urbanPark.title}
                className="w-full h-full object-cover filter grayscale-30 group-hover:grayscale-0 group-hover:scale-101 transition-all duration-[1200ms]"
              />
              <div className="absolute inset-0 bg-[#1a2b4a]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white px-5 py-2.5 text-xs font-sans tracking-widest uppercase flex items-center gap-2 shadow-lg font-bold">
                  <Maximize2 size={12} /> View Panorama
                </div>
              </div>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-12 gap-8 mt-4">
              <div className="col-span-12 md:col-span-8">
                <h3 className="text-3xl font-light text-[#1a2b4a] tracking-tight mb-3 font-serif">
                  {portfolioData.urbanPark.title}
                </h3>
                <p className="text-sm font-sans text-[#1a2b4a]/75 leading-relaxed text-justify mb-6">
                  {portfolioData.urbanPark.description}
                </p>

                <button
                  onClick={handleDownloadMasterplan}
                  className="px-4 py-2.5 bg-white hover:bg-[#FAF9F6] border border-[#1a2b4a]/20 text-[#1a2b4a] text-xs font-mono tracking-widest uppercase font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <Download size={12} />
                  <span>DOWNLOAD TOPOGRAPHICAL MASTERPLAN (CAD)</span>
                </button>
              </div>

              <div className="col-span-12 md:col-span-4 border-l border-[#1a2b4a]/10 pl-6 flex flex-col gap-4">
                <div>
                  <span className="text-[9px] font-sans tracking-widest text-[#1a2b4a]/40 font-bold uppercase block mb-1">
                    LANDSCAPE TYPE
                  </span>
                  <p className="text-xs font-sans font-medium text-[#1a2b4a]/85 leading-snug">
                    {portfolioData.urbanPark.specs.landscapeType}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-sans tracking-widest text-[#1a2b4a]/40 font-bold uppercase block mb-1">
                    STRUCTURAL ENGINEER
                  </span>
                  <p className="text-xs font-sans font-medium text-[#1a2b4a]/85 leading-snug">
                    {portfolioData.urbanPark.specs.structuralEngineer}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-sans tracking-widest text-[#1a2b4a]/40 font-bold uppercase block mb-1">
                    COMPLETED
                  </span>
                  <p className="text-xs font-sans font-medium text-[#1a2b4a]/85 leading-snug">
                    {portfolioData.urbanPark.specs.completed}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a2b4a] text-white/80 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12">
          <div className="flex flex-col">
            <span className="text-xs font-sans tracking-widest text-white/50 uppercase font-bold mb-1">
              AETHELGARD STUDIO
            </span>
            <span className="text-lg font-light font-serif">
              Bridging Geometric Truths and Organic Landscapes.
            </span>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-8 items-center">
            <button
              onClick={() => {
                setAuthReason('');
                setPendingAuthCallback(null);
                setIsSignInOpen(true);
              }}
              className="text-xs font-sans tracking-widest uppercase font-semibold text-white/70 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
            >
              {isAuthenticated ? `PORTAL (${user?.name?.split(' ')[0]})` : 'CLIENT SIGN IN'}
            </button>
            <button
              onClick={handleOpenCommission}
              className="text-xs font-sans tracking-widest uppercase font-semibold text-white/70 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
            >
              COMMISSION INQUIRY
            </button>
            <a href="#design" className="text-xs font-sans tracking-widest uppercase font-semibold text-white/70 hover:text-white transition-colors">
              BACK TO TOP ▲
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mt-8 text-[10px] font-sans tracking-widest text-white/40 font-bold">
          <span>© {new Date().getFullYear()} AETHELGARD. ALL RIGHTS RESERVED.</span>
          <span>CURATED ARCHITECTURE TEMPLATE</span>
        </div>
      </footer>

      {/* Lightbox / Gallery Modal */}
      <GalleryModal
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        activeIndex={lightbox.activeIndex}
        onClose={closeLightbox}
        onChangeIndex={setLightboxIndex}
      />

      {/* Dedicated Sign In Modal */}
      <SignIn
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        authReason={authReason}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Protected Project Commission Modal */}
      <CommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioOneMain />
    </AuthProvider>
  );
}
