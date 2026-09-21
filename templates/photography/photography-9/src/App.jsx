import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';

// Google Fonts and FontAwesome
const FontLinks = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  </>
);

// Earthy, romantic, and moody black-and-white wedding photos
const IMAGES = {
  coupleRomantic: "/wedding_cover.png",
  coupleBW: "/cinematic_cover.png",
  venueChurch: "/lume_hero.png",
  portraitLarge: "/photo_cover.png",
  thumbnail1: "/wedding_cover.png",
  thumbnail2: "/snapfolio_cover.png",
  thumbnail3: "/fineart_cover.png",
  demo1Preview: "/wedding_cover.png",
  demo2Preview: "/cinematic_cover.png",
  demo3Preview: "/lume_hero.png"
};

// 1. NAVBAR COMPONENT
function Navbar({ onNavigateTo, onOpenSignIn, currentView }) {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInquireClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onOpenSignIn('Please sign in or create an account to start your wedding photography inquiry.', 'contact');
    } else {
      onNavigateTo('contact');
    }
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-neutral-100 px-6 md:px-12 py-4 flex items-center justify-between"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <button 
          onClick={() => onNavigateTo('home')} 
          className="flex items-center gap-2 group bg-transparent border-none cursor-pointer p-0 text-inherit"
        >
          <div className="w-8 h-8 rounded-full bg-[#F4B8C8] flex items-center justify-center text-white">
            <i className="fa-solid fa-camera text-xs"></i>
          </div>
          <span className="font-sans font-extrabold text-sm tracking-[0.2em] text-[#1A1A1A] uppercase">
            BLUSH LENS
          </span>
        </button>

        {/* Desktop Links (Visible on lg and above) */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={() => onNavigateTo('home')} className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#1A1A1A] hover:text-[#F4B8C8] transition-colors bg-transparent border-none cursor-pointer">Home</button>
          <button onClick={() => onNavigateTo('demos')} className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#1A1A1A] hover:text-[#F4B8C8] transition-colors bg-transparent border-none cursor-pointer">Demos</button>
          <button onClick={() => onNavigateTo('portfolio')} className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#1A1A1A] hover:text-[#F4B8C8] transition-colors bg-transparent border-none cursor-pointer">Gallery</button>
          <button onClick={() => onNavigateTo('features')} className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#1A1A1A] hover:text-[#F4B8C8] transition-colors bg-transparent border-none cursor-pointer">Services</button>
          
          {/* Protected Inquire Action */}
          <button 
            onClick={handleInquireClick} 
            className="px-6 py-2 rounded-full bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#F4B8C8] hover:text-[#1A1A1A] transition-colors cursor-pointer border-none"
          >
            Inquire
          </button>

          {/* Auth State Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-neutral-200">
              <button 
                onClick={() => onOpenSignIn('', 'home')}
                className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A] hover:text-[#F4B8C8] transition-colors cursor-pointer bg-transparent border-none"
              >
                <span className="w-7 h-7 rounded-full bg-[#F4B8C8]/20 border border-[#F4B8C8]/40 flex items-center justify-center text-xs text-[#1A1A1A]">
                  {user.name ? user.name[0].toUpperCase() : 'B'}
                </span>
                <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={logout}
                className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 hover:text-[#1A1A1A] transition-colors bg-transparent border-none cursor-pointer"
                title="Sign Out"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenSignIn('', 'home')}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#F4B8C8] transition-colors px-4 py-1.5 border border-neutral-300 rounded-full hover:border-[#F4B8C8] cursor-pointer bg-transparent"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile / Tablet Hamburger Toggle Button */}
        <button 
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 text-stone-900 focus:outline-none cursor-pointer bg-transparent border-none text-xl"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile/Tablet Menu Drawer or Dropdown */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-64 max-w-[80vw] bg-white shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-6 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#F4B8C8] flex items-center justify-center text-white text-xs">
                <i className="fa-solid fa-camera"></i>
              </div>
              <span className="font-bold text-base tracking-wide text-stone-900">BLUSH LENS</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="text-xl p-1 bg-transparent border-none cursor-pointer text-stone-700 hover:text-stone-900"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-6 font-medium text-stone-800 text-sm tracking-widest uppercase text-left">
            <button onClick={() => { setIsMenuOpen(false); onNavigateTo('home'); }} className="text-left bg-transparent border-none uppercase tracking-widest text-sm font-medium hover:text-pink-600 transition cursor-pointer">Home</button>
            <button onClick={() => { setIsMenuOpen(false); onNavigateTo('demos'); }} className="text-left bg-transparent border-none uppercase tracking-widest text-sm font-medium hover:text-pink-600 transition cursor-pointer">Demos</button>
            <button onClick={() => { setIsMenuOpen(false); onNavigateTo('portfolio'); }} className="text-left bg-transparent border-none uppercase tracking-widest text-sm font-medium hover:text-pink-600 transition cursor-pointer">Gallery</button>
            <button onClick={() => { setIsMenuOpen(false); onNavigateTo('features'); }} className="text-left bg-transparent border-none uppercase tracking-widest text-sm font-medium hover:text-pink-600 transition cursor-pointer">Services</button>
            <button onClick={() => { setIsMenuOpen(false); onNavigateTo('contact'); }} className="text-left bg-transparent border-none uppercase tracking-widest text-sm font-medium hover:text-pink-600 transition cursor-pointer">Contact</button>
          </nav>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
            <button
              onClick={(e) => { setIsMenuOpen(false); handleInquireClick(e); }}
              className="block w-full py-2.5 bg-stone-900 text-white text-center text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#F4B8C8] hover:text-stone-900 transition cursor-pointer border-none"
            >
              Book Session
            </button>

            {/* Mobile Auth Status */}
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <button 
                  onClick={() => { setIsMenuOpen(false); onOpenSignIn('', 'home'); }}
                  className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
                >
                  <i className="fa-solid fa-user-check text-[#F4B8C8]"></i>
                  <span>{user.name}</span>
                </button>
                <button 
                  onClick={() => { setIsMenuOpen(false); logout(); }}
                  className="text-[10px] text-neutral-400 hover:text-neutral-900 uppercase font-bold bg-transparent border-none cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsMenuOpen(false); onOpenSignIn('', 'home'); }}
                className="w-full py-2 rounded-full border border-neutral-300 text-neutral-700 text-xs uppercase font-bold tracking-wider hover:border-[#F4B8C8] cursor-pointer bg-transparent"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// 2. HERO SECTION
function Hero({ activeDemo, onExploreDemos }) {
  const demoTitles = {
    1: "CLASSIC ROMANCE — EDITORIAL GALLERY",
    2: "MOODY MONOCHROME — SILENT EMOTIONS",
    3: "MODERN MINIMALIST — REVEAL DETAIL"
  };

  return (
    <section id="home" className="pt-32 pb-24 px-6 md:px-12 bg-[#FAFAFA] overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          {/* Stat counter block */}
          <div className="space-y-1">
            <div className="font-sans font-black text-6xl md:text-8xl tracking-tight text-[#1A1A1A]">
              0{activeDemo}
            </div>
            <div className="font-sans text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase">
              / ACTIVE DEMO LAYOUT
            </div>
          </div>

          {/* Blush camera badge */}
          <div className="inline-flex items-center gap-3 bg-[#F4B8C8]/10 border border-[#F4B8C8]/25 rounded-full pl-2 pr-5 py-2">
            <div className="w-8 h-8 rounded-full bg-[#F4B8C8] text-white flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-camera text-xs"></i>
            </div>
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#1A1A1A] uppercase">
              Boutique Wedding Series
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold tracking-wider leading-tight text-[#1A1A1A]">
              WEDDING PHOTOGRAPHER —
              <br />
              <span className="text-neutral-400 font-light">PHOTOGRAPHY THEME</span>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.35em] font-bold text-[#F4B8C8]">
              {demoTitles[activeDemo]}
            </p>
          </div>

          <p className="text-sm text-neutral-500 font-sans tracking-wide leading-relaxed max-w-md">
            An elegant showcase layout styled with soft blush pink highlights, structured grids, and fluid scroll motion. Clean typography tailored for premium wedding photo editors.
          </p>

          <div>
            <button 
              onClick={onExploreDemos}
              className="inline-block px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#F4B8C8] hover:text-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.25em] font-bold shadow-md transition-all cursor-pointer border-none"
            >
              Explore Demos
            </button>
          </div>
        </div>

        {/* Right Layout Visuals (Stacked Mockups) */}
        <div className="lg:col-span-7 relative h-[500px] md:h-[600px] flex items-center justify-center">
          
          {/* Mockup Card 1 */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            className="absolute left-4 top-12 w-64 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 shadow-2xl z-10 border border-white/60"
          >
            <img 
              src={IMAGES.coupleRomantic} 
              alt="Romantic Couple Mockup" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-left">
              <span className="font-sans text-[9px] tracking-widest text-[#F4B8C8] uppercase font-bold">Editorial Portrait</span>
              <h4 className="font-serif italic text-white text-lg mt-1">Whispers in the Sun</h4>
            </div>
          </motion.div>

          {/* Mockup Card 2 */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            className="absolute right-4 bottom-8 w-56 md:w-72 aspect-square rounded-2xl overflow-hidden bg-neutral-300 shadow-2xl z-20 border border-white/60"
          >
            <img 
              src={IMAGES.venueChurch} 
              alt="Venue Mockup" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-5 text-left">
              <span className="font-sans text-[8px] tracking-widest text-neutral-200 uppercase font-bold">Atmosphere</span>
              <h4 className="font-serif italic text-white text-base mt-1">Catedral de la Luz</h4>
            </div>
          </motion.div>

          {/* Mockup Card 3 */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="absolute left-[20%] right-[10%] top-[30%] bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-neutral-100 overflow-hidden z-30 flex flex-col"
          >
            <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              </div>
              <div className="bg-white rounded px-12 py-0.5 text-[8px] text-neutral-400 border border-neutral-100">
                localhost:3000/demo-{activeDemo}
              </div>
              <div className="w-4"></div>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-[#1A1A1A]">BLUSH PRESET</span>
                <div className="flex gap-2 text-[6px] text-neutral-400 uppercase font-bold">
                  <span>Works</span>
                  <span>Contact</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 aspect-video bg-neutral-100 rounded overflow-hidden">
                  <img 
                    src={activeDemo === 1 ? IMAGES.coupleRomantic : activeDemo === 2 ? IMAGES.coupleBW : IMAGES.portraitLarge} 
                    alt="Demo display" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="aspect-video bg-[#F4B8C8]/10 rounded flex flex-col justify-center items-center p-2 text-center">
                  <span className="font-serif italic text-[#F4B8C8] text-[9px]">Lumière</span>
                  <span className="text-[5px] text-[#1A1A1A] font-bold tracking-widest uppercase">Est. 2026</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="w-6 h-6 rounded bg-neutral-100 overflow-hidden flex-shrink-0">
                  <img src={IMAGES.thumbnail1} alt="thumb" className="w-full h-full object-cover" />
                </span>
                <span className="w-6 h-6 rounded bg-neutral-100 overflow-hidden flex-shrink-0">
                  <img src={IMAGES.thumbnail2} alt="thumb" className="w-full h-full object-cover" />
                </span>
                <span className="w-6 h-6 rounded bg-neutral-100 overflow-hidden flex-shrink-0">
                  <img src={IMAGES.thumbnail3} alt="thumb" className="w-full h-full object-cover" />
                </span>
                <div className="h-6 flex-grow bg-neutral-50 rounded flex items-center px-2">
                  <span className="w-full h-1 bg-neutral-200 rounded"></span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

// 3. DEMO SWITCHER SECTION
function DemoSwitcher({ activeDemo, setActiveDemo }) {
  const demos = [
    { id: 1, title: "01 / Editorial Classic", preview: IMAGES.demo1Preview, tag: "Clean & Bright" },
    { id: 2, title: "02 / Moody Romance", preview: IMAGES.demo2Preview, tag: "Warm sepia & B&W" },
    { id: 3, title: "03 / Modern Minimalist", preview: IMAGES.demo3Preview, tag: "Offset grids" }
  ];

  return (
    <section id="demos" className="py-24 bg-white text-[#1A1A1A] border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-16">
        
        {/* Title */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4B8C8] font-bold block">
            DEMO PRESET SWITCHER
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-wider uppercase">
            3 Homepage Layout Styles
          </h2>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">
            Click on any layout thumbnail card to toggle the layout preview style inside the interactive hero section.
          </p>
        </div>

        {/* Clickable horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demos.map(demo => (
            <motion.div
              key={demo.id}
              whileHover={{ y: -6 }}
              onClick={() => setActiveDemo(demo.id)}
              className={`cursor-pointer rounded-2xl border text-left overflow-hidden bg-[#FAFAFA] transition-all duration-300 relative group ${
                activeDemo === demo.id 
                  ? 'border-[#F4B8C8] shadow-[0_10px_30px_rgba(244,184,200,0.2)]' 
                  : 'border-neutral-200/80 shadow-sm hover:border-[#F4B8C8]/45'
              }`}
            >
              <div className="bg-white border-b border-neutral-200/60 px-4 py-2.5 flex items-center justify-between">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                </div>
                <span className="text-[8px] font-bold text-neutral-400">demo_{demo.id}.html</span>
                <div className="w-3"></div>
              </div>

              <div className="aspect-[4/3] relative overflow-hidden bg-neutral-200">
                <img 
                  src={demo.preview} 
                  alt={demo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-2.5 rounded-full bg-white text-neutral-900 text-[10px] uppercase tracking-wider font-bold shadow-lg border-none cursor-pointer">
                    Select Layout
                  </button>
                </div>
              </div>

              <div className="p-5 flex justify-between items-center bg-white">
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">{demo.title}</h4>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{demo.tag}</span>
                </div>
                {activeDemo === demo.id && (
                  <span className="w-5 h-5 rounded-full bg-[#F4B8C8] text-white flex items-center justify-center text-[10px]">
                    <i className="fa-solid fa-check"></i>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// 4. PORTFOLIO GRID SECTION
function PortfolioGrid({ onReserveDate }) {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/60 pb-8">
          <div className="space-y-3 text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4B8C8] font-bold block">
              PORTFOLIO GALLERIES
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-wider uppercase text-[#1A1A1A]">
              CAPTURED SECONDS
            </h2>
          </div>
          <div className="text-left md:text-right">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-1">Your Style of Wedding</h4>
            <p className="text-neutral-500 text-xs max-w-xs leading-relaxed">
              We focus on warm editorial palettes and authentic candid moments.
            </p>
          </div>
        </div>

        {/* Masonry-Style Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-neutral-100 flex flex-col justify-between aspect-square text-left shadow-sm">
              <div className="space-y-4">
                <span className="w-8 h-8 rounded-full bg-[#F4B8C8]/10 text-[#F4B8C8] flex items-center justify-center">
                  <i className="fa-solid fa-quote-left text-xs"></i>
                </span>
                <p className="font-serif italic text-base md:text-lg text-neutral-800 leading-relaxed">
                  "Photography is the beautiful art of alignment. We trace the soft outlines of touch, raw laughter, and the glowing tears of your love story."
                </p>
              </div>
              <div className="space-y-2 pt-6">
                <span className="text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">Creative Philosophy</span>
                <p className="text-xs text-neutral-400">Warm editorial romantic highlights</p>
              </div>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-100 shadow-sm">
              <img src={IMAGES.thumbnail1} alt="Gallery detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-100 shadow-sm">
              <img src={IMAGES.thumbnail2} alt="Gallery detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-100 shadow-sm">
              <img src={IMAGES.thumbnail3} alt="Gallery detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-300 border border-neutral-100 shadow-sm">
              <img src={IMAGES.portraitLarge} alt="Large romantic portrait" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl text-left space-y-3 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Curated Commissions</h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                We accept only a limited number of destination and boutique weddings annually to keep our styling custom and highly personal.
              </p>
              
              {/* Protected Reserve Date Action */}
              <button 
                onClick={onReserveDate} 
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#F4B8C8] hover:text-[#1A1A1A] transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                Reserve Date <i className="fa-solid fa-arrow-right text-[8px]"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// 5. FEATURES STRIP
function Features() {
  const steps = [
    { icon: "fa-camera", title: "FINE ART SENSORS", desc: "Digital medium format" },
    { icon: "fa-heart", title: "EMOTION DRIVEN", desc: "Warm & romantic candids" },
    { icon: "fa-calendar-days", title: "FLEXIBLE RESERVATION", desc: "Global destination planning" }
  ];

  return (
    <section id="features" className="py-16 bg-white text-[#1A1A1A] border-t border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center justify-items-center">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-3 max-w-[280px] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F4B8C8]/10 text-[#F4B8C8] flex items-center justify-center text-lg">
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">{step.title}</h4>
              <p className="text-[11px] text-neutral-400 font-sans tracking-wide">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. CONTACT FORM (Protected Submission)
function ContactForm({ onOpenSignIn }) {
  const { isAuthenticated, user } = useAuth();

  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      if (!names) setNames(user.name || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onOpenSignIn('Authentication required: Please sign in or create an account to send your inquiry.', 'contact');
      return;
    }

    if (!names || !email || !details) return;

    // Save inquiry to localStorage mock ledger
    try {
      const existing = JSON.parse(localStorage.getItem('blush_photography9_inquiries') || '[]');
      const newInquiry = {
        id: 'inq_' + Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        coupleNames: names,
        details: details,
        createdAt: new Date().toISOString()
      };
      existing.push(newInquiry);
      localStorage.setItem('blush_photography9_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to log inquiry in photography-9:', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDetails('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="max-w-xl mx-auto px-6 text-center space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4B8C8] font-bold block">
            GET IN TOUCH
          </span>
          <h2 className="text-2xl md:text-4xl font-sans font-black tracking-wider uppercase">
            Let's Build Memories
          </h2>
          <div className="w-8 h-[2px] bg-[#F4B8C8] mx-auto mt-2"></div>
        </div>

        {isAuthenticated && user && (
          <div className="bg-white border border-[#F4B8C8]/40 p-3 rounded-2xl text-xs flex items-center justify-between text-neutral-800 shadow-sm">
            <span>Client Verified: <strong>{user.name}</strong> ({user.email})</span>
            <span className="font-mono text-[9px] uppercase bg-[#F4B8C8]/20 px-2 py-0.5 rounded text-[#1A1A1A] font-bold">Portal Active</span>
          </div>
        )}

        {submitted ? (
          <div className="p-8 rounded-2xl bg-white border border-neutral-100 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F4B8C8]/20 text-[#1A1A1A] flex items-center justify-center text-xl mx-auto">
              <i className="fa-solid fa-circle-check text-[#F4B8C8]"></i>
            </div>
            <h4 className="text-sm font-bold uppercase tracking-wider">Inquiry Sent</h4>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
              Thank you, {user ? user.name : names}! We appreciate you sharing your vision. We will follow up with custom boutique pricing within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]">Name *</label>
              <input 
                type="text" 
                required 
                value={names}
                onChange={(e) => setNames(e.target.value)}
                placeholder="Sarah & David"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl outline-none text-xs text-[#1A1A1A] focus:border-[#F4B8C8] transition-colors box-border"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]">Email *</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl outline-none text-xs text-[#1A1A1A] focus:border-[#F4B8C8] transition-colors box-border"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]">Celebration details *</label>
              <textarea 
                rows="3" 
                required 
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Share your wedding location, style, and timeline..."
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl outline-none text-xs text-[#1A1A1A] focus:border-[#F4B8C8] transition-colors resize-none box-border"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#F4B8C8] hover:text-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-bold rounded-xl transition-colors shadow-md mt-2 cursor-pointer border-none"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// 7. FOOTER
function Footer({ onNavigateTo }) {
  return (
    <footer className="bg-white text-[#1A1A1A] border-t border-neutral-100 py-16 px-6 md:px-12 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Camera mark logo */}
        <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-neutral-200/60 flex items-center justify-center text-[#F4B8C8]">
          <i className="fa-solid fa-camera text-sm"></i>
        </div>

        <div>
          <h4 className="font-sans font-extrabold text-sm tracking-[0.25em] uppercase text-[#1A1A1A]">BLUSH LENS</h4>
          <p className="text-[10px] text-neutral-400 tracking-wider uppercase mt-1">Boutique Fine Art Wedding Photography</p>
        </div>

        {/* Minimal Nav */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
          <button onClick={() => onNavigateTo('home')} className="hover:text-[#F4B8C8] bg-transparent border-none cursor-pointer uppercase font-bold text-inherit">Home</button>
          <button onClick={() => onNavigateTo('demos')} className="hover:text-[#F4B8C8] bg-transparent border-none cursor-pointer uppercase font-bold text-inherit">Demos</button>
          <button onClick={() => onNavigateTo('portfolio')} className="hover:text-[#F4B8C8] bg-transparent border-none cursor-pointer uppercase font-bold text-inherit">Portfolio</button>
          <button onClick={() => onNavigateTo('contact')} className="hover:text-[#F4B8C8] bg-transparent border-none cursor-pointer uppercase font-bold text-inherit">Inquire</button>
        </div>

        <div className="w-12 h-[1px] bg-neutral-200 my-4"></div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-[#F4B8C8]"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="hover:text-[#F4B8C8]"><i className="fa-brands fa-pinterest-p"></i></a>
          <a href="#" className="hover:text-[#F4B8C8]"><i className="fa-brands fa-vimeo-v"></i></a>
        </div>

        <p className="text-[9px] uppercase tracking-widest text-neutral-400 pt-4">
          &copy; {new Date().getFullYear()} Blush Lens. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

// 8. INNER TEMPLATE CONTAINER
function BlushTemplateApp() {
  const { isAuthenticated } = useAuth();

  const [activeDemo, setActiveDemo] = useState(1);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'signin'
  const [redirectTarget, setRedirectTarget] = useState('home');
  const [authReason, setAuthReason] = useState('');

  const navigateToSection = (sectionId) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSignIn = (reason = '', target = 'home') => {
    setAuthReason(reason);
    setRedirectTarget(target);
    setCurrentView('signin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserveDateAction = (e) => {
    e?.preventDefault();
    if (!isAuthenticated) {
      handleOpenSignIn('Please sign in or create an account to reserve your boutique wedding date.', 'contact');
    } else {
      navigateToSection('contact');
    }
  };

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen overflow-x-hidden relative select-none font-sans animate-fadeIn">
      <FontLinks />
      <Navbar 
        onNavigateTo={navigateToSection}
        onOpenSignIn={handleOpenSignIn}
        currentView={currentView}
      />

      {currentView === 'signin' ? (
        <main className="w-full max-w-full overflow-x-hidden pt-12">
          <SignIn 
            onNavigateBack={(target) => {
              setCurrentView('home');
              if (target && target !== 'home') {
                setTimeout(() => {
                  const el = document.getElementById(target);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            redirectTarget={redirectTarget}
            authReason={authReason}
          />
        </main>
      ) : (
        <main>
          <Hero 
            activeDemo={activeDemo} 
            onExploreDemos={() => navigateToSection('demos')} 
          />
          <DemoSwitcher 
            activeDemo={activeDemo} 
            setActiveDemo={setActiveDemo} 
          />
          <PortfolioGrid onReserveDate={handleReserveDateAction} />
          <Features />
          <ContactForm onOpenSignIn={handleOpenSignIn} />
        </main>
      )}

      <Footer onNavigateTo={navigateToSection} />
    </div>
  );
}

// 9. ROOT EXPORT
export default function App() {
  return (
    <AuthProvider>
      <BlushTemplateApp />
    </AuthProvider>
  );
}
