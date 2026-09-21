import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';
import './index.css';

function SnapFolioApp() {
  const { isAuthenticated, user } = useAuth();

  const [currentView, setCurrentView] = useState('home'); // 'home' | 'signin'
  const [authReason, setAuthReason] = useState('');
  const [pendingTarget, setPendingTarget] = useState('home');

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('home');
  const [typewriterText, setTypewriterText] = useState('');
  
  // Lightbox State
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Client Saved Favorites State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('snapfolio_photography1_favorites');
      return saved ? JSON.parse(saved) : [0, 4];
    } catch {
      return [0, 4];
    }
  });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'general',
    message: ''
  });

  // Pre-fill form details if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  // Toast State
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastError, setToastError] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const words = ["Landscape Specialist", "Editorial Visionary", "Visual Storyteller"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentWord = words[wordIdx];
      let delay = 120;

      if (isDeleting) {
        charIdx--;
        delay = 60;
      } else {
        charIdx++;
        delay = 120;
      }

      setTypewriterText(currentWord.substring(0, charIdx));

      if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        delay = 2000;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 500;
      }

      timeoutId = setTimeout(type, delay);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  // Active Link on Scroll
  useEffect(() => {
    if (currentView !== 'home') return;
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach(section => {
        const top = section.offsetTop;
        if (window.scrollY >= (top - 200)) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Gallery Data
  const galleryItems = [
    {
      id: 0,
      category: 'portrait',
      title: 'Ethereal Studio Capture',
      imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      alt: 'Ethereal Portraiture'
    },
    {
      id: 1,
      category: 'landscape',
      title: 'Mist on Alpine Waters',
      imgSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      alt: 'Misty Mountains'
    },
    {
      id: 2,
      category: 'street',
      title: 'Tokyo Night Shallows',
      imgSrc: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80',
      alt: 'Neon Alleyways'
    },
    {
      id: 3,
      category: 'editorial',
      title: 'Chic Monocromatic Focus',
      imgSrc: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      alt: 'Chic Geometry'
    },
    {
      id: 4,
      category: 'portrait',
      title: 'Warm Light Silhouette',
      imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      alt: 'Natural Tone Portrait'
    },
    {
      id: 5,
      category: 'landscape',
      title: 'Golden Hour Foothills',
      imgSrc: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      alt: 'Valley Glow'
    },
    {
      id: 6,
      category: 'street',
      title: 'Urban Monolith Reflect',
      imgSrc: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      alt: 'Rainy Crossroad'
    },
    {
      id: 7,
      category: 'editorial',
      title: 'Clean Studio Minimalist',
      imgSrc: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      alt: 'Minimalist Fashion'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' || item.category === activeFilter
  );

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxActive(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxActive(false);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction) => {
    let nextIndex = lightboxIndex + direction;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    setLightboxIndex(nextIndex);
  };

  // Keyboard binds for Lightbox
  useEffect(() => {
    if (!lightboxActive) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') navigateLightbox(-1);
      else if (e.key === 'ArrowRight') navigateLightbox(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxActive, lightboxIndex, filteredItems]);

  // =========================================================================
  // PROTECTED ACTION HANDLERS
  // =========================================================================

  // 1. Protected Hero "Book a Session" Button
  const handleProtectedBookingSession = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthReason('Please sign in to book a session with Alex Rivers.');
      setPendingTarget('contact');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Protected "Select Package" Buttons in Services
  const handleSelectPackage = (packageKey, packageName) => {
    setFormData(prev => ({ ...prev, service: packageKey }));
    if (!isAuthenticated) {
      setAuthReason(`Please sign in to select the ${packageName} package.`);
      setPendingTarget('contact');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    triggerToast(`"${packageName}" selected. Please complete your project details below.`, false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Protected "Save to Favorites" / Bookmark in Lightbox
  const handleToggleFavorite = (item) => {
    if (!isAuthenticated) {
      closeLightbox();
      setAuthReason(`Please sign in to save "${item.title}" to your client collection.`);
      setPendingTarget('gallery');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let updatedFavorites;
    if (favorites.includes(item.id)) {
      updatedFavorites = favorites.filter(id => id !== item.id);
      triggerToast(`Removed "${item.title}" from saved collection.`, false);
    } else {
      updatedFavorites = [...favorites, item.id];
      triggerToast(`Saved "${item.title}" to your private collection!`, false);
    }
    setFavorites(updatedFavorites);
    try {
      localStorage.setItem('snapfolio_photography1_favorites', JSON.stringify(updatedFavorites));
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Protected "Inquire on Archival Print" in Lightbox
  const handleInquirePrint = (item) => {
    if (!isAuthenticated) {
      closeLightbox();
      setAuthReason(`Please sign in to inquire about fine-art prints of "${item.title}".`);
      setPendingTarget('contact');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    closeLightbox();
    setFormData(prev => ({
      ...prev,
      service: 'general',
      message: `I am interested in acquiring an archival museum-grade fine art print of "${item.title}" (${item.category} series). Please share dimensions and framing availability.`
    }));
    triggerToast(`Print inquiry pre-filled for "${item.title}".`, false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 5. Protected Contact Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, message, service } = formData;
    
    // Check Authentication on Submit
    if (!isAuthenticated) {
      setAuthReason('Please sign in with your account to submit a booking inquiry.');
      setPendingTarget('contact');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!name || !email || !message) {
      triggerToast('Please fill out all required fields.', true);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      triggerToast('Please enter a valid email address.', true);
      return;
    }

    triggerToast(`Thank you, ${name}! Your booking inquiry for ${service} package has been recorded.`, false);
    setFormData({ name: user?.name || '', email: user?.email || '', service: 'general', message: '' });
  };

  const triggerToast = (message, isError) => {
    setToastMessage(message);
    setToastError(isError);
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 4000);
  };

  const handleNavigateBack = (target) => {
    setCurrentView('home');
    if (target && target !== 'home') {
      setTimeout(() => {
        const el = document.getElementById(target.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="snap-body select-none">
      
      {/* 1. Floating Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col justify-between fixed left-6 top-6 bottom-6 w-72 rounded-3xl snap-glass-nav p-8 z-40">
        <div className="space-y-8">
          {/* Logo */}
          <button 
            onClick={() => handleNavigateBack('home')}
            className="flex items-center gap-3 text-left w-full group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl tracking-wider group-hover:scale-105 transition-transform">
              SF
            </div>
            <div>
              <h2 className="font-extrabold text-lg tracking-tight text-white">SnapFolio</h2>
              <p className="text-xs text-indigo-400 font-medium">Creative Photography</p>
            </div>
          </button>

          {/* User Badge if signed in */}
          {isAuthenticated && user && (
            <div className="bg-zinc-900/90 border border-indigo-500/30 rounded-2xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-zinc-200 truncate">{user.name}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{user.role || 'Client'}</p>
                </div>
              </div>
              <button
                onClick={() => { setAuthReason(''); setPendingTarget('home'); setCurrentView('signin'); }}
                title="Account Settings"
                className="text-zinc-400 hover:text-indigo-400 p-1.5 transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-gear text-xs"></i>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {[
              { id: 'home', icon: 'fa-house', label: 'Home' },
              { id: 'about', icon: 'fa-user', label: 'About Me' },
              { id: 'gallery', icon: 'fa-images', label: 'Gallery' },
              { id: 'services', icon: 'fa-briefcase', label: 'Services' },
              { id: 'contact', icon: 'fa-paper-plane', label: 'Contact' }
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  if (currentView !== 'home') {
                    e.preventDefault();
                    handleNavigateBack(link.id);
                  }
                }}
                className={`snap-nav-link-item flex items-center gap-4 px-4 py-3 rounded-xl border text-sm font-medium ${
                  currentView === 'home' && activeSection === link.id ? 'active' : ''
                }`}
              >
                <i className={`fa-solid ${link.icon} text-lg`}></i> {link.label}
              </a>
            ))}

            {/* Dedicated Authentication Navigation Link */}
            <button
              onClick={() => {
                setAuthReason('');
                setPendingTarget('home');
                setCurrentView(currentView === 'signin' ? 'home' : 'signin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`snap-nav-link-item flex items-center gap-4 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left w-full mt-2 cursor-pointer ${
                currentView === 'signin'
                  ? 'active text-indigo-400 border-indigo-500/40 bg-indigo-500/10'
                  : 'text-zinc-400 hover:text-white border-zinc-800/80 hover:bg-zinc-850'
              }`}
            >
              <i className={`fa-solid ${isAuthenticated ? 'fa-id-badge text-indigo-400' : 'fa-arrow-right-to-bracket'} text-lg`}></i>
              {isAuthenticated ? 'Client Profile' : 'Sign In'}
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 justify-center">
            {['instagram', 'behance', 'unsplash', 'linkedin-in'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                <i className={`fa-brands fa-${social} text-lg`}></i>
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-600 font-medium">&copy; 2026 SnapFolio. All rights reserved.</p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 h-16 rounded-2xl snap-glass-nav flex items-center justify-around px-4 z-40 shadow-2xl">
        {[
          { id: 'home', icon: 'fa-house' },
          { id: 'about', icon: 'fa-user' },
          { id: 'gallery', icon: 'fa-images' },
          { id: 'services', icon: 'fa-briefcase' },
          { id: 'contact', icon: 'fa-paper-plane' }
        ].map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                handleNavigateBack(link.id);
              }
            }}
            className={`p-3 rounded-xl transition-all ${
              currentView === 'home' && activeSection === link.id ? 'text-indigo-500' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${link.icon} text-xl`}></i>
          </a>
        ))}

        {/* Mobile Sign In / Account Icon */}
        <button
          onClick={() => {
            setAuthReason('');
            setPendingTarget('home');
            setCurrentView(currentView === 'signin' ? 'home' : 'signin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`p-3 rounded-xl transition-all ${
            currentView === 'signin' ? 'text-indigo-400 bg-indigo-500/20' : 'text-zinc-400 hover:text-white'
          }`}
          aria-label="Account"
        >
          <i className={`fa-solid ${isAuthenticated ? 'fa-user-check' : 'fa-arrow-right-to-bracket'} text-xl`}></i>
        </button>
      </nav>

      {/* Main Content Area */}
      {currentView === 'signin' ? (
        <main className="lg:pl-[340px] px-6 md:px-12 py-10 max-w-7xl mx-auto pb-28">
          <SignIn 
            onNavigateBack={handleNavigateBack}
            redirectTarget={pendingTarget}
            authReason={authReason}
          />
        </main>
      ) : (
        <main className="lg:pl-[340px] px-6 md:px-12 py-10 max-w-7xl mx-auto space-y-32 pb-28">
          
          {/* 2. Hero Section */}
          <section id="home" className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-10">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span> Available for Bookings
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                  Hello, I'm <span className="text-indigo-500">Alex Rivers</span>
                </h1>
                <h3 className="text-2xl md:text-3xl font-semibold text-zinc-400 min-h-[40px]">
                  A <span className="text-indigo-400">{typewriterText}</span><span className="snap-typewriter-cursor">|</span>
                </h3>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Capturing stories from around the globe through natural light, clean framing, and a minimalist editorial aesthetic. Dedicated to finding extraordinary moments in daily scenes.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="#gallery" className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:-translate-y-0.5">
                  View Gallery
                </a>
                <button 
                  onClick={handleProtectedBookingSession} 
                  className="px-8 py-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Book a Session
                </button>
              </div>
            </div>
            <div className="flex-1 max-w-md w-full">
              <div className="snap-hero-glow rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80" alt="Alex Rivers Portrait" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          </section>

          {/* 3. About Section */}
          <section id="about" className="scroll-mt-24 space-y-12">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h2 className="text-4xl font-extrabold text-white">About My Craft</h2>
              <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider font-semibold">Behind the lens and vision</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="rounded-3xl overflow-hidden border border-zinc-800 aspect-[3/4]">
                  <img src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=800&q=80" alt="Behind the Scenes" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-6 rounded-2xl shadow-xl hidden sm:block">
                  <span className="block text-3xl font-extrabold">12+</span>
                  <span className="text-xs uppercase tracking-wider font-medium opacity-80">Years in Field</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6 text-zinc-400 leading-relaxed text-base">
                <p>
                  Photography is more than just framing an image; it's about preserving genuine feeling. Over the last decade, I have worked across 18 countries collaborating with magazines, lifestyle agencies, and individual collectors.
                </p>
                <p>
                  My visual style is rooted in natural ambient lighting, rich monochromes, and geometric balances. Whether shooting a bustling street market in Kyoto or an editorial campaign in Soho, my goal is to craft art that endures beyond trends.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-850">
                  <div>
                    <h4 className="text-2xl font-bold text-white">240+</h4>
                    <p className="text-xs text-zinc-500 mt-1 uppercase">Assignments</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">18</h4>
                    <p className="text-xs text-zinc-500 mt-1 uppercase">Countries</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">14</h4>
                    <p className="text-xs text-zinc-500 mt-1 uppercase">Awards Won</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Gallery Section */}
          <section id="gallery" className="scroll-mt-24 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-850 pb-8">
              <div className="border-l-4 border-indigo-600 pl-4">
                <h2 className="text-4xl font-extrabold text-white">Featured Gallery</h2>
                <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider font-semibold">Selected editorial and fine-art captures</p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Works' },
                  { id: 'portrait', label: 'Portraits' },
                  { id: 'landscape', label: 'Landscapes' },
                  { id: 'street', label: 'Street' },
                  { id: 'editorial', label: 'Editorial' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`snap-filter-pill px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeFilter === filter.id ? 'active' : ''
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className="snap-gallery-card group relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/60 cursor-pointer shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  <img 
                    src={item.imgSrc} 
                    alt={item.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  
                  {/* Bookmark badge indicator if favorited */}
                  {favorites.includes(item.id) && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-indigo-600/90 text-white flex items-center justify-center text-xs shadow-lg z-10">
                      <i className="fa-solid fa-bookmark"></i>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-white font-bold text-lg leading-tight mt-1">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Services Section */}
          <section id="services" className="scroll-mt-24 space-y-12">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h2 className="text-4xl font-extrabold text-white">Commissions & Services</h2>
              <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider font-semibold">Bespoke packages tailored to your vision</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  key: "portrait",
                  title: "Editorial & Portraiture",
                  price: "$250",
                  period: "Per Session",
                  desc: "Ideal for creatives, artists, lookbooks, and high-fashion modeling portfolios.",
                  features: ["2-Hour Studio / Location", "25 High-Resolution Retouched Prints", "Commercial Usage Rights", "Online Private Gallery"]
                },
                {
                  key: "event",
                  title: "Event & Storytelling",
                  price: "$650",
                  period: "Half Day",
                  desc: "Comprehensive photojournalistic documentation of corporate events, galas, and intimate celebrations.",
                  features: ["Up to 5 Hours Live Coverage", "150+ Edited Color Grade Images", "Same-Day Teaser Selects", "Full Resolution Cloud Access"]
                },
                {
                  key: "commercial",
                  title: "Commercial & Campaigns",
                  price: "$1,200",
                  period: "Full Project",
                  desc: "Complete visual branding direction, lifestyle product shoots, and billboard-grade licensing.",
                  features: ["Full Day Multi-Location", "Styling & Lighting Assistant", "Master Retouching Package", "Global Advertising Rights"]
                }
              ].map((service) => (
                <div key={service.key} className="bg-[#1e1e1e] border border-zinc-800 hover:border-indigo-500/50 p-8 rounded-3xl space-y-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">{service.price}</span>
                      <span className="text-xs text-zinc-400 font-semibold">{service.period}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
                    <ul className="space-y-3 pt-4 border-t border-zinc-850">
                      {service.features.map((feat, fidx) => (
                        <li key={fidx} className="text-xs text-zinc-300 flex items-center gap-3">
                          <i className="fa-solid fa-check text-indigo-400"></i> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleSelectPackage(service.key, service.title)}
                    className="w-full py-3.5 rounded-xl border border-zinc-700 hover:border-indigo-500 bg-zinc-900 hover:bg-indigo-600 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-indigo-600/20"
                  >
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Contact Section */}
          <section id="contact" className="scroll-mt-24 space-y-12">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h2 className="text-4xl font-extrabold text-white">Let's Connect</h2>
              <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider font-semibold">Start your next creative project</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-8">
                <p className="text-zinc-400 text-base leading-relaxed">
                  Have an editorial project, brand campaign, or portrait session in mind? Fill out the inquiry form or reach out directly to schedule a creative consultation.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center text-indigo-400 border border-zinc-700/50"><i className="fa-solid fa-envelope text-lg"></i></span>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Email Direct</h4>
                      <p className="text-zinc-200 font-semibold">hello@alexrivers.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center text-indigo-400 border border-zinc-700/50"><i className="fa-solid fa-phone text-lg"></i></span>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Phone Direct</h4>
                      <p className="text-zinc-200 font-semibold">+1 (555) 902-1845</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center text-indigo-400 border border-zinc-700/50"><i className="fa-solid fa-location-dot text-lg"></i></span>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Studio Headquarters</h4>
                      <p className="text-zinc-200 font-semibold">SoHo, Manhattan, NY</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="lg:col-span-7 bg-[#1e1e1e] border border-zinc-800 p-8 rounded-3xl space-y-6 shadow-xl">
                {!isAuthenticated && (
                  <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 p-4 rounded-xl text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-lock"></i> Authentication is required to submit a booking inquiry.
                    </span>
                    <button
                      type="button"
                      onClick={() => { setAuthReason('Please sign in to submit your booking inquiry.'); setPendingTarget('contact'); setCurrentView('signin'); }}
                      className="font-bold underline hover:text-white shrink-0 ml-2 cursor-pointer"
                    >
                      Sign In Now
                    </button>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Your Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors" 
                      required 
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com" 
                      className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Package</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors"
                  >
                    <option value="general">General Collaboration / Print Inquiry</option>
                    <option value="portrait">Portrait Shoot Session ($250)</option>
                    <option value="event">Event Coverage Bundle ($650)</option>
                    <option value="commercial">Commercial Project ($1,200)</option>
                  </select>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Scope / Details <span className="text-red-500">*</span></label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="5" 
                    placeholder="Share your visual theme, timing, details..." 
                    className="w-full bg-[#121212] border border-zinc-800 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors resize-none" 
                    required 
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 cursor-pointer">
                  Submit Booking Request
                </button>
              </form>
            </div>
          </section>
        </main>
      )}

      {/* 7. Lightbox Fullscreen Modal */}
      {lightboxActive && filteredItems[lightboxIndex] && (
        <div className="snap-lightbox active fixed inset-0 bg-black/95 flex flex-col justify-between items-center py-6 px-4 z-50">
          {/* Top Bar */}
          <div className="w-full max-w-6xl flex justify-between items-center">
            <div className="text-sm font-medium">
              <span className="text-indigo-400 font-semibold uppercase text-xs">{filteredItems[lightboxIndex].category}</span> — <span className="text-zinc-200">{filteredItems[lightboxIndex].title}</span>
            </div>
            <button onClick={closeLightbox} className="text-zinc-400 hover:text-white p-2 text-2xl transition-colors cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
          </div>

          {/* Image Display */}
          <div className="relative w-full max-w-4xl flex items-center justify-between flex-1 py-4">
            <button onClick={() => navigateLightbox(-1)} className="absolute left-0 bg-zinc-900/40 hover:bg-zinc-800 text-white w-12 h-12 rounded-full border border-zinc-850/50 flex items-center justify-center transition-colors z-10 cursor-pointer"><i className="fa-solid fa-chevron-left"></i></button>
            
            <div className="w-full h-full flex items-center justify-center">
              <img src={filteredItems[lightboxIndex].imgSrc} alt={filteredItems[lightboxIndex].alt} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-zinc-900" />
            </div>

            <button onClick={() => navigateLightbox(1)} className="absolute right-0 bg-zinc-900/40 hover:bg-zinc-800 text-white w-12 h-12 rounded-full border border-zinc-850/50 flex items-center justify-center transition-colors z-10 cursor-pointer"><i className="fa-solid fa-chevron-right"></i></button>
          </div>

          {/* Lightbox Actions (Protected Bookmark & Print Inquiry) */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            <button
              onClick={() => handleToggleFavorite(filteredItems[lightboxIndex])}
              className={`px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                favorites.includes(filteredItems[lightboxIndex].id)
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
              }`}
            >
              <i className={`fa-solid ${favorites.includes(filteredItems[lightboxIndex].id) ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
              {favorites.includes(filteredItems[lightboxIndex].id) ? 'Saved in Collection' : 'Save to Collection'}
            </button>

            <button
              onClick={() => handleInquirePrint(filteredItems[lightboxIndex])}
              className="px-5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-indigo-500/60 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <i className="fa-solid fa-cart-shopping text-indigo-400"></i> Inquire on Archival Print
            </button>
          </div>

          {/* Key Hints */}
          <div className="text-xs text-zinc-500 select-none">
            Use Left & Right Arrows on keyboard to browse pictures. Click Esc to close.
          </div>
        </div>
      )}

      {/* 8. Interactive Toast Alert Notification */}
      <div className={`snap-toast fixed bottom-6 right-6 max-w-sm w-full bg-zinc-900 border p-4 rounded-2xl shadow-2xl flex items-center z-50 ${
        toastShow ? 'show' : ''
      } ${
        toastError ? 'border-red-500/30 bg-red-500/10' : 'border-green-500/30 bg-green-500/10'
      }`}>
        {toastError ? (
          <svg className="w-5 h-5 text-red-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-green-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )}
        <div className="text-sm font-semibold text-zinc-100 flex-1 pr-2">{toastMessage}</div>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SnapFolioApp />
    </AuthProvider>
  );
}
