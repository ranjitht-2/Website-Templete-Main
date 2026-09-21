import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';

function MainContent() {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [redirectTarget, setRedirectTarget] = useState('home');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    location: '',
    details: ''
  });

  useEffect(() => {
    if (user) {
      if (!formData.name) setFormData(prev => ({ ...prev, name: user.name || '' }));
      if (!formData.email) setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  // Filter functionality
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleOpenSignIn = (reason = '', target = 'home') => {
    setAuthReason(reason || '');
    setRedirectTarget(target || 'home');
    setIsAuthOpen(true);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId) => {
    setIsAuthOpen(false);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleNavigateBack = (target) => {
    setIsAuthOpen(false);
    if (target && target !== 'home') {
      setTimeout(() => {
        const el = document.getElementById(target.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      handleOpenSignIn('Sign in or register to submit your wedding booking inquiry', 'contact');
      return;
    }

    const { name, email, location, details } = formData;
    if (!name || !email || !location || !details) {
      alert('Please fill out all required fields.');
      return;
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setFormData(prev => ({ ...prev, date: '', location: '', details: '' }));
    }, 5000);
  };

  // Gallery items data
  const galleryItems = [
    {
      id: 1,
      category: 'Weddings',
      tag: 'FINE ART PORTRAITURE',
      title: 'Amara & David',
      location: 'SOHO MANOR, NY',
      imgSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      alt: 'Serene Garden Wedding Portrait'
    },
    {
      id: 2,
      category: 'Weddings',
      tag: 'EDITORIAL WEDDING',
      title: 'Clara & Jonathan',
      location: 'VILLA D\'ESTE, LAKE COMO',
      imgSrc: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      alt: 'Elegant Couple Under Arch'
    },
    {
      id: 3,
      category: 'Cinematography',
      tag: 'CINEMATIC SEQUENCE',
      title: 'Champagne Toast',
      location: 'THE GRAND RECEPTION',
      imgSrc: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      alt: 'Champagne Toast Reception'
    },
    {
      id: 4,
      category: 'Cinematography',
      tag: 'CINEMATIC SEQUENCE',
      title: 'Elena & Gabriel',
      location: 'SUNSET RIDGE RESERVE',
      imgSrc: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
      alt: 'Couple Walking At Golden Hour'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'All' || item.category === activeFilter
  );

  return (
    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', backgroundColor: '#FFFFFF', color: '#1F1F1F', minHeight: '100vh' }}>
      
      {/* Navigation */}
      <header className="bg-white sticky top-0 z-40 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex items-center justify-between">
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="md:hidden text-[#1F1F1F] focus:outline-none p-1 text-xl order-1 cursor-pointer bg-transparent border-none"
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </button>

          {/* Centered Split Navbar Layout */}
          {/* Left Items (hidden on mobile, visible md+) */}
          <nav className="hidden md:flex items-center gap-10 w-1/3 order-1 justify-start">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1F1F] hover:text-[#666666] transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} 
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1F1F] hover:text-[#666666] transition-colors"
            >
              About
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} 
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1F1F] hover:text-[#666666] transition-colors"
            >
              Portfolio
            </a>
          </nav>

          {/* Center Logo */}
          <div className="flex flex-col items-center text-center w-auto md:w-1/3 order-2">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
              className="flex flex-col items-center gap-1 cursor-pointer no-underline"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#1F1F1F] mb-1">
                <span style={{ fontFamily: '"Cormorant Garamond", serif' }} className="font-light text-base tracking-widest text-[#1F1F1F] mt-0.5">L</span>
              </div>
              <span style={{ fontFamily: '"Cormorant Garamond", serif' }} className="font-normal text-2xl tracking-[0.25em] text-[#1F1F1F]">LUMIÈRE</span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-[#666666] font-semibold mt-0.5">STUDIOS</span>
            </a>
          </div>

          {/* Right Items */}
          <nav className="hidden md:flex items-center gap-8 w-1/3 order-3 justify-end">
            <a 
              href="#films" 
              onClick={(e) => { e.preventDefault(); handleNavClick('films'); }} 
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1F1F] hover:text-[#666666] transition-colors"
            >
              Wedding Films
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} 
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1F1F] hover:text-[#666666] transition-colors"
            >
              Contact
            </a>

            {/* Client Portal Button / Sign In */}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => handleOpenSignIn(null, 'home')}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800 hover:text-[#1F1F1F] flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
              >
                <span>&bull;</span>
                <span>{user?.name?.split(' ')[0] || 'Client'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleOpenSignIn('Sign in to access your wedding concierge portal', 'home')}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] hover:text-[#1F1F1F] cursor-pointer bg-transparent border-none p-0 transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Empty spacing for mobile layout alignment */}
          <div className="w-8 md:hidden order-3"></div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-8 space-y-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#1F1F1F]">
                  <span style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-xs">L</span>
                </div>
                <span style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-lg tracking-widest">LUMIÈRE</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-2xl text-[#1F1F1F] focus:outline-none p-1 cursor-pointer bg-transparent border-none"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <nav className="flex flex-col space-y-5 text-left">
              <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="text-lg font-medium uppercase tracking-[0.25em] text-[#1F1F1F] border-b border-zinc-100 pb-2">Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="text-lg font-medium uppercase tracking-[0.25em] text-[#1F1F1F] border-b border-zinc-100 pb-2">About</a>
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} className="text-lg font-medium uppercase tracking-[0.25em] text-[#1F1F1F] border-b border-zinc-100 pb-2">Portfolio</a>
              <a href="#films" onClick={(e) => { e.preventDefault(); handleNavClick('films'); }} className="text-lg font-medium uppercase tracking-[0.25em] text-[#1F1F1F] border-b border-zinc-100 pb-2">Wedding Films</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-lg font-medium uppercase tracking-[0.25em] text-[#1F1F1F] border-b border-zinc-100 pb-2">Contact</a>

              {/* Mobile Auth Button */}
              <div className="pt-2">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => handleOpenSignIn(null, 'home')}
                    className="text-base font-medium uppercase tracking-[0.2em] text-emerald-800 cursor-pointer bg-transparent border-none p-0 flex items-center gap-2"
                  >
                    <span>&bull;</span>
                    <span>Client Portal ({user?.name || 'Account'})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenSignIn('Sign in to access your wedding concierge portal', 'home')}
                    className="text-base font-medium uppercase tracking-[0.2em] text-[#666666] hover:text-[#1F1F1F] cursor-pointer bg-transparent border-none p-0"
                  >
                    Client Sign In
                  </button>
                )}
              </div>
            </nav>

            <div className="pt-8 text-center text-xs text-[#666666] tracking-wider uppercase space-y-3">
              <p>Bookings & Inquiries</p>
              <p className="font-bold text-[#1F1F1F]">+1 (555) 304-9844</p>
              <p className="font-bold text-[#1F1F1F]">hello@lumierestudios.com</p>
            </div>
          </div>
        )}
      </header>

      {/* Conditional Auth Modal Overlay */}
      {isAuthOpen ? (
        <div className="w-full min-h-[85vh] bg-white relative z-30 pt-10">
          <SignIn
            onNavigateBack={handleNavigateBack}
            redirectTarget={redirectTarget}
            authReason={authReason}
          />
        </div>
      ) : (
        /* Main Wrap */
        <main className="space-y-24 md:space-y-36 pb-24">

          {/* Hero / Portfolio Banner Section */}
          <section id="home" className="max-w-7xl mx-auto px-4 md:px-6 pt-10">
            <div className="bg-[#ECEBE6] rounded-2xl py-20 px-6 md:py-32 md:px-16 text-center space-y-8 shadow-sm">
              <div className="space-y-4">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#666666] block">
                  WHERE EVERY FRAME TELLS A STORY
                </span>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-5xl md:text-8xl font-light text-[#1F1F1F] tracking-wide leading-tight">
                  Our Gallery
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-[#1F1F1F] mx-auto my-6"></div>
              <p className="text-[#666666] text-base md:text-lg leading-relaxed max-w-[720px] mx-auto font-light">
                We craft timeless visual narratives of love, legacy, and heritage. Specializing in high-end wedding documentation, fine art editorial styling, and rich cultural wedding experiences. Through authentic captures and cinematic films, we preserve the organic poetry of your most precious days.
              </p>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="portfolio" className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
            {/* Section Title Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-100 pb-6 gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#666666] font-bold">LUMIÈRE ARCHIVES</span>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-3xl md:text-4xl font-light text-[#1F1F1F] mt-1">Featured Celebrations</h3>
              </div>
              <div className="flex gap-3">
                {['All', 'Weddings', 'Cinematography'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterClick(category)}
                    className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 border-b-2 transition-colors cursor-pointer bg-transparent ${
                      activeFilter === category 
                        ? 'border-[#1F1F1F] text-[#1F1F1F]' 
                        : 'border-transparent text-[#666666] hover:text-[#1F1F1F]'
                    }`}
                  >
                    {category === 'All' ? 'All Works' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* 2-Column Responsive Grid */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden relative shadow-lg bg-stone-100 group cursor-pointer"
                >
                  <img 
                    src={item.imgSrc} 
                    alt={item.alt} 
                    className="w-full h-full object-cover rounded-2xl block transition duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 z-10 text-white">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-300 block mb-1">
                      {item.tag}
                    </span>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-xl md:text-2xl font-serif font-medium">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-stone-400 mt-0.5 font-sans">
                      {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Statement / Quote */}
          <section id="about" className="max-w-5xl mx-auto px-6 py-12 md:py-20 text-center space-y-6">
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#666666] font-bold block">OUR PHILOSOPHY</span>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-3xl md:text-5xl font-light text-[#1F1F1F] leading-tight italic max-w-4xl mx-auto">
              "Simplicity is the ultimate sophistication. We seek to highlight raw emotions, elegant styling, and natural illumination."
            </h3>
            <div className="w-10 h-[1px] bg-zinc-300 mx-auto my-4"></div>
            <p className="text-xs uppercase tracking-widest text-[#666666]">LUMIÈRE CREATIVE DIRECTORY</p>
          </section>

          {/* Services Section */}
          <section id="films" className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#666666] font-bold">COMMISSIONS & SERVICES</span>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-4xl md:text-5xl font-light text-[#1F1F1F]">Cinematic Wedding Film Captures</h3>
              <p className="text-[#666666] leading-relaxed font-light text-base">
                Alongside static imagery, we craft motion pictures captured on 4K digital cinema formats and vintage 16mm reels. Our documentaries merge high-end editorial styling with acoustic soundtracks to build a timeless film you will cherish forever.
              </p>
              <div className="pt-4 flex flex-col space-y-4">
                <div className="flex gap-4 items-start border-l border-zinc-200 pl-4">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1F1F]">Premium Feature Films</h4>
                    <p className="text-xs text-[#666666] mt-1 font-light">Full-day coverage, cinematic styling, 15-minute highlight movie + separate ceremony capture.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start border-l border-zinc-200 pl-4">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1F1F]">Fine Art Photography Package</h4>
                    <p className="text-xs text-[#666666] mt-1 font-light">Full custom digital gallery, customized prints box, professional edit, pre-wedding consultation.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right image */}
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm">
              <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80" alt="Beautiful Table Arrangement" className="w-full h-full object-cover" />
            </div>
          </section>

          {/* Booking Form Section */}
          <section id="contact" className="max-w-3xl mx-auto px-6 py-12 bg-[#ECEBE6] rounded-2xl text-center space-y-8">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#666666] font-bold block">INQUIRE</span>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-3xl md:text-4xl font-light text-[#1F1F1F]">Reserve Your Date</h3>
              <p className="text-[#666666] text-xs uppercase tracking-wider">Now booking wedding commissions globally</p>
            </div>

            {bookingSuccess ? (
              <div className="bg-white border border-zinc-200 p-8 rounded-2xl text-center space-y-3 max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl mx-auto font-bold">
                  &check;
                </div>
                <h4 className="text-xl font-light text-[#1F1F1F]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Inquiry Dispatched</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Thank you {user?.name || formData.name}. Our studio concierge will review calendar availability and respond to {user?.email || formData.email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left max-w-xl mx-auto pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[#666666]">Full Name *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Amara Johnson" 
                      className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 rounded-lg outline-none text-[#1F1F1F] focus:border-[#1F1F1F] transition-colors" 
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[#666666]">Email Address *</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="amara@example.com" 
                      className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 rounded-lg outline-none text-[#1F1F1F] focus:border-[#1F1F1F] transition-colors" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[#666666]">Wedding Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 rounded-lg outline-none text-[#666666] focus:border-[#1F1F1F] transition-colors" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[#666666]">Event Location *</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Lake Como, Italy" 
                      className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 rounded-lg outline-none text-[#1F1F1F] focus:border-[#1F1F1F] transition-colors" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-[#666666]">Tell us about your celebration *</label>
                  <textarea 
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows="4" 
                    placeholder="Share your theme, timing, photography preferences..." 
                    className="w-full px-4 py-3 text-xs bg-white border border-zinc-200 rounded-lg outline-none text-[#1F1F1F] focus:border-[#1F1F1F] transition-colors resize-none" 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-[#1F1F1F] hover:bg-zinc-800 rounded-lg transition-colors mt-2 cursor-pointer border-none shadow-sm"
                >
                  {isAuthenticated ? 'Submit Booking Inquiry' : 'Sign In & Submit Booking Inquiry'}
                </button>
              </form>
            )}
          </section>

        </main>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-100 py-12 text-center space-y-6">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-[#1F1F1F]">
            <span style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-xs">L</span>
          </div>
          <span style={{ fontFamily: '"Cormorant Garamond", serif' }} className="text-lg tracking-[0.2em] text-[#1F1F1F]">LUMIÈRE STUDIOS</span>
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#666666]">Timeless Fine Art Photography</span>
        </div>
        <div className="flex items-center justify-center gap-6 text-xs text-[#666666]">
          <a href="#" className="hover:text-[#1F1F1F] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#1F1F1F] transition-colors">Vimeo</a>
          <a href="#" className="hover:text-[#1F1F1F] transition-colors">Pinterest</a>
        </div>
        <p className="text-[10px] text-zinc-400 font-medium">&copy; 2026 Lumière Studios. All rights reserved. Created in partnership with WebTemplates.</p>
      </footer>

      {/* Floating Sticky Contact Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp Chat Icon */}
        <a href="https://wa.me/15553049844" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer relative group">
          <i className="fa-brands fa-whatsapp text-2xl"></i>
          <span className="absolute right-14 bg-zinc-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none whitespace-nowrap">WhatsApp Chat</span>
        </a>
        
        {/* Phone Call Icon */}
        <a href="tel:+15553049844" aria-label="Make a phone call" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer relative group">
          <i className="fa-solid fa-phone text-lg"></i>
          <span className="absolute right-14 bg-zinc-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none whitespace-nowrap">Call Studios</span>
        </a>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
