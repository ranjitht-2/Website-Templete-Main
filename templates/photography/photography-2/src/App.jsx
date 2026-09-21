import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';
import './index.css';

// Curated atmospheric photography frames for smooth canvas crossfading
const CURATED_FRAMES = [
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80'
];

function LOmbreApp() {
  const { isAuthenticated, user, logout } = useAuth();

  const [currentView, setCurrentView] = useState('home'); // 'home' | 'signin'
  const [redirectTarget, setRedirectTarget] = useState('home');
  const [authReason, setAuthReason] = useState('');

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs for animation loop
  const canvasRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const preloadedImages = useRef([]);
  
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const requestRef = useRef(null);

  // Preload curated high-resolution photography frames
  useEffect(() => {
    let loaded = 0;
    const imagesArray = [];
    const totalFrames = CURATED_FRAMES.length;

    CURATED_FRAMES.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        imagesArray[idx] = img;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          preloadedImages.current = imagesArray;
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          preloadedImages.current = imagesArray;
          setIsLoaded(true);
        }
      };
    });
  }, []);

  // Handle scroll to calculate progress
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      if (!scrollTrackRef.current) return;
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const trackHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      const relativeScroll = -rect.top;
      const maxScroll = trackHeight - viewportHeight;
      
      if (maxScroll > 0) {
        targetProgress.current = Math.max(0, Math.min(1, relativeScroll / maxScroll));
      } else {
        targetProgress.current = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Resize canvas helper
  const resizeCanvas = (canvas) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
  };

  // Draw image cover helper with alpha
  const drawImageCover = (img, ctx, w, h, alpha = 1.0) => {
    if (!img || !img.width || !img.height) return;
    const imgW = img.width;
    const imgH = img.height;
    const imgRatio = imgW / imgH;
    const screenRatio = w / h;
    
    let sourceX = 0;
    let sourceY = 0;
    let sourceW = imgW;
    let sourceH = imgH;
    
    if (imgRatio > screenRatio) {
      sourceW = imgH * screenRatio;
      sourceX = (imgW - sourceW) / 2;
    } else {
      sourceH = imgW / screenRatio;
      sourceY = (imgH - sourceH) / 2;
    }
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, 0, 0, w, h);
    ctx.restore();
  };

  // Draw procedural fallback
  const drawProceduralFallback = (ctx, w, h, progress) => {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) * 0.8);
    bgGrad.addColorStop(0, '#0a0a0a');
    bgGrad.addColorStop(1, '#050505');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
    
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(progress * Math.PI * 4);
    ctx.strokeStyle = 'rgba(122, 154, 139, 0.15)';
    ctx.lineWidth = 1.5;
    
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.arc(50 * Math.sin(progress * Math.PI), 0, 120 + 30 * Math.cos(progress * Math.PI), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  };

  // Viewfinder HUD Drawing
  const drawViewfinder = (ctx, w, h, progress) => {
    ctx.strokeStyle = 'rgba(244, 240, 232, 0.15)';
    ctx.fillStyle = 'rgba(244, 240, 232, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.font = '500 10px "Plus Jakarta Sans"';
    
    const padding = Math.min(40, w * 0.05);
    const len = 15;
    
    // Corners
    ctx.beginPath();
    ctx.moveTo(padding, padding + len);
    ctx.lineTo(padding, padding);
    ctx.lineTo(padding + len, padding);
    ctx.moveTo(w - padding, padding + len);
    ctx.lineTo(w - padding, padding);
    ctx.lineTo(w - padding - len, padding);
    ctx.moveTo(padding, h - padding - len);
    ctx.lineTo(padding, h - padding);
    ctx.lineTo(padding + len, h - padding);
    ctx.moveTo(w - padding, h - padding - len);
    ctx.lineTo(w - padding, h - padding);
    ctx.lineTo(w - padding - len, h - padding);
    ctx.stroke();
    
    // Crosshair Center
    const cx = w / 2;
    const cy = h / 2;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy);
    ctx.lineTo(cx + 10, cy);
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx, cy + 10);
    ctx.stroke();
    
    // Exposure metadata info
    const iso = Math.round(100 + progress * 700);
    ctx.fillText(`ISO ${iso}`, padding + 5, h - padding - 8);
    ctx.fillText('AF-C [3D FOCUS]', w - padding - 95, h - padding - 8);
    
    const shutterSpeed = Math.round(125 + progress * 875);
    ctx.fillText(`1/${shutterSpeed}s`, cx - 18, padding + 20);
  };

  // Update Foreground Slides opacity & translate
  const updateSlidesDom = (progress) => {
    updateSingleSlideDom('photo-slide-0', 0.0, 0.05, 0.18, 0.23, progress);
    updateSingleSlideDom('photo-slide-1', 0.25, 0.30, 0.43, 0.48, progress);
    updateSingleSlideDom('photo-slide-2', 0.50, 0.55, 0.68, 0.73, progress);
    updateSingleSlideDom('photo-slide-3', 0.75, 0.80, 0.95, 1.00, progress);
  };

  const updateSingleSlideDom = (id, start, peakStart, peakEnd, end, progress) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    let opacity = 0;
    let translateY = 40;
    
    if (progress >= start && progress <= end) {
      if (progress < peakStart) {
        const factor = (progress - start) / (peakStart - start);
        opacity = factor;
        translateY = 40 - (40 * factor);
      } else if (progress > peakEnd) {
        const factor = (progress - peakEnd) / (end - peakEnd);
        opacity = 1 - factor;
        translateY = -40 * factor;
      } else {
        opacity = 1;
        translateY = 0;
      }
    } else {
      opacity = 0;
      translateY = progress < start ? 40 : -40;
    }
    
    el.style.opacity = opacity;
    el.style.transform = `translateY(${translateY}px)`;
    el.style.pointerEvents = opacity > 0.1 ? 'all' : 'none';
    el.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
  };

  // Continuous Canvas Draw Loop with Smooth Cross-fading
  useEffect(() => {
    if (!isLoaded || currentView !== 'home') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas);

    const animationLoop = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.05;
      } else {
        currentProgress.current = targetProgress.current;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const total = preloadedImages.current.length;
      if (total > 0) {
        const scaled = currentProgress.current * (total - 1);
        const indexA = Math.floor(scaled);
        const indexB = Math.min(total - 1, indexA + 1);
        const blend = scaled - indexA;

        const imgA = preloadedImages.current[indexA];
        const imgB = preloadedImages.current[indexB];

        if (imgA) drawImageCover(imgA, ctx, canvas.width, canvas.height, 1.0);
        if (imgB && blend > 0.001) drawImageCover(imgB, ctx, canvas.width, canvas.height, blend);
      } else {
        drawProceduralFallback(ctx, canvas.width, canvas.height, currentProgress.current);
      }

      // Viewfinder Overlay
      ctx.save();
      const dpr = window.devicePixelRatio || 1;
      ctx.scale(dpr, dpr);
      drawViewfinder(ctx, window.innerWidth, window.innerHeight, currentProgress.current);
      ctx.restore();

      // Timeline Fill
      const fill = document.getElementById('photo-indicator-fill');
      if (fill) {
        fill.style.width = `${currentProgress.current * 100}%`;
      }

      // Update slide transparency
      updateSlidesDom(currentProgress.current);

      requestRef.current = requestAnimationFrame(animationLoop);
    };

    animationLoop();

    const handleResize = () => {
      resizeCanvas(canvas);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, currentView]);

  // Protected Action Handlers
  const handleBuyNow = (e) => {
    e?.preventDefault();
    if (!isAuthenticated) {
      setAuthReason('Please sign in with your patron account to purchase high-resolution prints and commercial licenses.');
      setRedirectTarget('albums');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('albums');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          alert(`Welcome back, ${user.name}! Your fine-art patron licensing portal is ready.`);
        }
      }, 50);
    }
  };

  const handleBookConsultation = (e) => {
    e?.preventDefault();
    if (!isAuthenticated) {
      setAuthReason('Please sign in to book a private creative consultation and studio brief.');
      setRedirectTarget('contact');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthReason('Authentication required: Please sign in or register to submit a project inquiry.');
      setRedirectTarget('contact');
      setCurrentView('signin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Save inquiry to localStorage mock ledger
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('lombre_photography2_inquiries') || '[]');
      const newInquiry = {
        id: 'inq_' + Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        timestamp: new Date().toISOString()
      };
      existingInquiries.push(newInquiry);
      localStorage.setItem('lombre_photography2_inquiries', JSON.stringify(existingInquiries));
    } catch (err) {
      console.error('Failed to save inquiry ledger:', err);
    }

    alert(`Thank you, ${user.name}! Your project inquiry has been securely recorded with our concierge team.`);
  };

  const navigateToView = (view, target) => {
    setCurrentView(view);
    if (view === 'home' && target) {
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const loadPercent = Math.round((loadedCount / Math.max(1, CURATED_FRAMES.length)) * 100);

  return (
    <div className="photo-body w-full max-w-full overflow-x-hidden bg-black text-[#f3f4f6]">
      
      {/* Preloader Overlay */}
      {!isLoaded && (
        <div className="photo-canvas-loader">
          <div className="photo-loader-content">
            <h2 className="photo-serif photo-loader-brand">PHOTO STUDIO</h2>
            <p className="photo-loader-status">Preloading Creative Frames... <span style={{ color: '#7A9A8B', fontWeight: 700 }}>{loadPercent}%</span></p>
          </div>
        </div>
      )}

      {/* Canvas Container (Visible on Home view) */}
      {currentView === 'home' && (
        <div className="photo-canvas-container">
          <canvas ref={canvasRef} id="photo-scroll-canvas"></canvas>
          <div className="photo-canvas-overlay"></div>
        </div>
      )}

      {/* Mobile-Friendly Header Container */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 w-full pt-4 px-4 pb-2 sm:px-6 md:px-12 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        {/* Brand Logo */}
        <div className="photo-header-logo">
          <button 
            onClick={() => navigateToView('home')} 
            className="photo-serif text-2xl md:text-3xl font-semibold text-[#F4F0E8] tracking-tight hover:opacity-90 transition-opacity bg-transparent border-none cursor-pointer"
          >
            Photo
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button 
            onClick={() => navigateToView('home')} 
            className={`photo-nav-link bg-transparent border-none cursor-pointer ${currentView === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateToView('home', 'about')} 
            className="photo-nav-link bg-transparent border-none cursor-pointer"
          >
            Pages
          </button>
          <button 
            onClick={() => navigateToView('home', 'albums')} 
            className="photo-nav-link bg-transparent border-none cursor-pointer"
          >
            Albums
          </button>
          <button 
            onClick={() => navigateToView('home', 'galleries')} 
            className="photo-nav-link bg-transparent border-none cursor-pointer"
          >
            Galleries
          </button>
          <button 
            onClick={() => navigateToView('home', 'blog')} 
            className="photo-nav-link bg-transparent border-none cursor-pointer"
          >
            Blog
          </button>
          <button 
            onClick={() => navigateToView('home', 'contact')} 
            className="photo-nav-link bg-transparent border-none cursor-pointer"
          >
            Contact
          </button>

          {/* Protected Buy Now Action */}
          <button 
            onClick={handleBuyNow} 
            className="photo-nav-btn-buy bg-transparent border-none cursor-pointer"
          >
            Buy Now
          </button>

          {/* Auth Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-white/10">
              <button 
                onClick={() => { setAuthReason(''); setCurrentView('signin'); }}
                className="flex items-center gap-2 text-xs font-semibold text-[#7A9A8B] hover:text-[#99bcad] transition-colors cursor-pointer bg-transparent border-none"
              >
                <span className="w-7 h-7 rounded-full bg-[#7A9A8B]/20 border border-[#7A9A8B]/40 flex items-center justify-center text-xs text-[#7A9A8B]">
                  {user.name ? user.name[0].toUpperCase() : 'P'}
                </span>
                <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={logout}
                className="text-[11px] font-bold uppercase tracking-wider text-stone-500 hover:text-stone-300 transition-colors bg-transparent border-none cursor-pointer"
                title="Sign Out"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setAuthReason(''); setRedirectTarget('home'); setCurrentView('signin'); }}
              className="text-xs font-bold uppercase tracking-widest text-[#F4F0E8] hover:text-[#7A9A8B] transition-colors px-3 py-1.5 border border-white/20 rounded-full hover:border-[#7A9A8B] cursor-pointer bg-transparent"
            >
              Sign In
            </button>
          )}
        </nav>

        {/* Desktop Socials */}
        <div className="hidden lg:flex items-center gap-5 text-[#9ca3af]">
          {['facebook-f', 'twitter', 'instagram', 'envelope'].map((icon, i) => (
            <a key={i} href="#" aria-label={icon} className="hover:text-[#F4F0E8] transition-colors">
              <i className={`fa-brands fa-${icon === 'envelope' ? 'envelope' : icon} text-base`}></i>
            </a>
          ))}
        </div>

        {/* Mobile / Tablet Hamburger Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl text-[#f3f4f6] focus:outline-none p-2 cursor-pointer transition-transform hover:scale-105"
          aria-label="Toggle Navigation Menu"
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        {/* Mobile / Tablet Slide-out Drawer */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 px-8 py-8 flex flex-col space-y-6 shadow-2xl z-50">
            <nav className="flex flex-col space-y-4 text-left">
              {[
                { label: 'Home', action: () => navigateToView('home') },
                { label: 'Pages', action: () => navigateToView('home', 'about') },
                { label: 'Albums', action: () => navigateToView('home', 'albums') },
                { label: 'Galleries', action: () => navigateToView('home', 'galleries') },
                { label: 'Blog', action: () => navigateToView('home', 'blog') },
                { label: 'Contact', action: () => navigateToView('home', 'contact') }
              ].map(link => (
                <button
                  key={link.label}
                  onClick={() => { link.action(); setMenuOpen(false); }}
                  className="text-base font-semibold uppercase tracking-widest text-[#9ca3af] hover:text-[#F4F0E8] border-b border-white/5 pb-2 transition-colors bg-transparent border-none text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => { setMenuOpen(false); handleBuyNow(e); }}
                  className="photo-nav-btn-buy text-center inline-block cursor-pointer bg-transparent"
                >
                  Buy Now
                </button>

                <div className="flex items-center gap-4 text-[#9ca3af]">
                  {['facebook-f', 'twitter', 'instagram', 'envelope'].map((icon, i) => (
                    <a key={i} href="#" aria-label={icon} className="hover:text-[#F4F0E8] text-lg transition-colors">
                      <i className={`fa-brands fa-${icon === 'envelope' ? 'envelope' : icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Status */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                {isAuthenticated && user ? (
                  <>
                    <button 
                      onClick={() => { setMenuOpen(false); setAuthReason(''); setCurrentView('signin'); }}
                      className="flex items-center gap-2 text-sm text-[#7A9A8B] font-semibold bg-transparent border-none cursor-pointer"
                    >
                      <i className="fa-solid fa-user-check"></i>
                      <span>{user.name}</span>
                    </button>
                    <button 
                      onClick={() => { setMenuOpen(false); logout(); }}
                      className="text-xs text-stone-400 hover:text-white uppercase font-bold bg-transparent border-none cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setMenuOpen(false); setAuthReason(''); setRedirectTarget('home'); setCurrentView('signin'); }}
                    className="w-full py-2.5 rounded-xl border border-[#7A9A8B] text-[#7A9A8B] hover:bg-[#7A9A8B] hover:text-black text-xs font-bold uppercase tracking-widest transition-all text-center cursor-pointer bg-transparent"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main View Router */}
      {currentView === 'signin' ? (
        <main className="w-full max-w-full overflow-x-hidden pt-16">
          <SignIn 
            onNavigateBack={(target) => navigateToView('home', target)}
            redirectTarget={redirectTarget}
            authReason={authReason}
          />
        </main>
      ) : (
        <main className="photo-scroll-wrapper w-full max-w-full overflow-x-hidden">
          
          {/* Scroll Track */}
          <section ref={scrollTrackRef} className="photo-hero-scroll-track w-full max-w-full overflow-x-hidden" id="hero-track">
            <div className="photo-hero-sticky-container">
              <div className="photo-editorial-slides-container">
                
                {/* Slide 01 */}
                <div className="photo-editorial-slide" id="photo-slide-0">
                  <div className="photo-hero-split-layout">
                    <div className="hero-left photo-glass-column">
                      <span className="photo-card-glass-label">01 / FOCUS</span>
                      <h1 className="photo-slide-title">The Essence of <em>Light</em></h1>
                      <p className="photo-slide-desc">
                        Capturing organic forms and golden shadows with visual minimalism, creating high-contrast imagery with authentic emotional weight.
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        <a href="#about" className="photo-nav-btn-buy">Explore Studio</a>
                        <a href="#albums" className="photo-btn-arrow">Portfolios →</a>
                      </div>
                    </div>
                    <div className="hero-right flex justify-center">
                      <div className="photo-glass-section rounded-3xl overflow-hidden aspect-[4/5] max-w-sm w-full">
                        <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80" alt="Focus Portrait" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 02 */}
                <div className="photo-editorial-slide" id="photo-slide-1">
                  <div className="photo-hero-split-layout">
                    <div className="hero-left photo-glass-column">
                      <span className="photo-card-glass-label">02 / MOVEMENT</span>
                      <h1 className="photo-slide-title">Cinematic <em>Stillness</em></h1>
                      <p className="photo-slide-desc">
                        Freezing motions and natural interactions to tell detailed stories that resonate far beyond the boundary of a single frame.
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        <a href="#about" className="photo-nav-btn-buy">Read Narrative</a>
                        <a href="#albums" className="photo-btn-arrow">View Showcase →</a>
                      </div>
                    </div>
                    <div className="hero-right flex justify-center">
                      <div className="photo-glass-section rounded-3xl overflow-hidden aspect-[4/5] max-w-sm w-full">
                        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" alt="Cinematic Motion" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 03 */}
                <div className="photo-editorial-slide" id="photo-slide-2">
                  <div className="photo-hero-split-layout">
                    <div className="hero-left photo-glass-column">
                      <span className="photo-card-glass-label">03 / HARMONY</span>
                      <h1 className="photo-slide-title">Tonal <em>Elegance</em></h1>
                      <p className="photo-slide-desc">
                        Carefully balancing contrast, depth, and shadow values to showcase the natural beauty of silhouettes and environments.
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        <a href="#about" className="photo-nav-btn-buy">Our Process</a>
                        <a href="#albums" className="photo-btn-arrow">Gallery Albums →</a>
                      </div>
                    </div>
                    <div className="hero-right flex justify-center">
                      <div className="photo-glass-section rounded-3xl overflow-hidden aspect-[4/5] max-w-sm w-full">
                        <img src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80" alt="Tonal Silhouette" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 04 */}
                <div className="photo-editorial-slide" id="photo-slide-3">
                  <div className="photo-hero-split-layout">
                    <div className="hero-left photo-glass-column">
                      <span className="photo-card-glass-label">04 / CREATION</span>
                      <h1 className="photo-slide-title">Art & <em>Collaboration</em></h1>
                      <p className="photo-slide-desc">
                        Co-creating with global agencies, designers, and visual stylists to construct custom, premium visual campaigns.
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        <button onClick={handleBookConsultation} className="photo-nav-btn-buy cursor-pointer border-none bg-transparent">
                          Book Consultation
                        </button>
                        <a href="#galleries" className="photo-btn-arrow">View Albums →</a>
                      </div>
                    </div>
                    <div className="hero-right flex justify-center">
                      <div className="photo-glass-section rounded-3xl overflow-hidden aspect-[4/5] max-w-sm w-full">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" alt="Aesthetic Capture" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Timeline Progress Bar */}
              <div className="photo-timeline-indicator">
                <div className="photo-indicator-fill" id="photo-indicator-fill"></div>
              </div>

            </div>
          </section>

          {/* Static Content wrapper */}
          <div className="photo-content-wrapper w-full max-w-full overflow-x-hidden">
            
            {/* About */}
            <section className="photo-section" id="about">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="photo-glass-column">
                  <span className="photo-card-glass-label">About Photo</span>
                  <h2 className="photo-heading">Capturing the Essence of <em>Light & Movement</em></h2>
                  <p className="photo-slide-desc">
                    We believe photography is more than capturing a frame—it is an elegant preservation of space, feeling, and time. Photo was founded on the philosophy of visual minimalism, using natural shadows and golden hour tones to highlight authentic emotions.
                  </p>
                  <div className="flex flex-col gap-6 pt-4">
                    <div className="flex gap-4 border-l border-zinc-700 pl-4">
                      <span className="font-extrabold text-[#7A9A8B]">01 /</span>
                      <div>
                        <h4 className="font-semibold text-[#f3f4f6]">Artistic Portraits</h4>
                        <p className="text-zinc-500 text-xs mt-1">High-end creative photography with custom light sculpture setup.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 border-l border-zinc-700 pl-4">
                      <span className="font-extrabold text-[#7A9A8B]">02 /</span>
                      <div>
                        <h4 className="font-semibold text-[#f3f4f6]">Cinematic Weddings</h4>
                        <p className="text-zinc-500 text-xs mt-1">Discreet documentary-style romantic captures across the globe.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
                  <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" alt="Behind the Lens" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>

            {/* Master Collection */}
            <section className="photo-section" id="albums">
              <div className="text-center space-y-4 mb-16">
                <span className="photo-card-glass-label mx-auto">Featured Work</span>
                <h2 className="photo-heading mx-auto text-center">The <em>Master Collection</em></h2>
                <p className="text-zinc-500 text-sm max-w-lg mx-auto">A handpicked collection of editorial portfolios, highlighting visual narrative and tonal harmony.</p>
              </div>
              
              <div className="photo-services-grid">
                {[
                  { img: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80', num: '01.', title: 'Monochrome Silhouette', cat: 'Portraits / Fine Art' },
                  { img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80', num: '02.', title: 'Ethereal Concert Tones', cat: 'Cinematic / Editorial' },
                  { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', num: '03.', title: 'Timeless Vows', cat: 'Weddings / Lifestyle' }
                ].map((album, i) => (
                  <div key={i} className="photo-glass-section-small p-6 rounded-3xl flex flex-col gap-4">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <img src={album.img} alt={album.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-xl font-bold text-[#7A9A8B]">{album.num}</span>
                      <div>
                        <h3 className="photo-serif text-lg text-white font-semibold">{album.title}</h3>
                        <p className="text-zinc-500 text-xs mt-0.5">{album.cat}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Galleries Grid */}
            <section className="photo-section" id="galleries">
              <div className="text-center space-y-4 mb-16">
                <span className="photo-card-glass-label mx-auto">Visual Galleries</span>
                <h2 className="photo-heading mx-auto text-center">Curated <em>Visual Narratives</em></h2>
                <p className="text-zinc-500 text-sm max-w-lg mx-auto">Explore detailed albums categorized by visual emotion, style, and art direction.</p>
              </div>
              
              <div className="photo-showcase-grid">
                {[
                  { 
                    img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', 
                    title: 'Fine Art Shadows', 
                    count: '24 Photos', 
                    cls: 'photo-s1' 
                  },
                  { 
                    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80', 
                    title: 'Whispering Forests', 
                    count: '18 Photos', 
                    cls: 'photo-s2' 
                  },
                  { 
                    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 
                    title: 'Vogue Editorial', 
                    count: '32 Photos', 
                    cls: 'photo-s3' 
                  },
                  { 
                    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', 
                    title: 'Architectural Lines', 
                    count: '15 Photos', 
                    cls: 'photo-s4' 
                  }
                ].map((grid, i) => (
                  <div key={i} className={`photo-showcase-item ${grid.cls}`}>
                    <img 
                      src={grid.img} 
                      alt={grid.title} 
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="photo-showcase-info">
                      <span>{grid.count}</span>
                      <h4>{grid.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Journal */}
            <section className="photo-section" id="blog">
              <div className="space-y-4 mb-16">
                <span className="photo-card-glass-label">Editorial Journal</span>
                <h2 className="photo-heading">Insights & <em>Photographic Journeys</em></h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', date: 'August 12, 2026', title: 'Chasing Light in the Scottish Highlands', desc: 'An exploration of patience, shifting weather conditions, and capturing dynamic shadows across the dramatic peaks of Glen Coe.' },
                  { img: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80', date: 'July 28, 2026', title: 'The Art of Subtle Shadows in Studio Portraits', desc: 'How utilizing a single light source and black reflector boards creates dramatic, emotional depth in minimalist studio layouts.' }
                ].map((post, i) => (
                  <div key={i} className="photo-glass-section-small rounded-3xl p-6 flex flex-col gap-4">
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover hover:scale-102 transition-all duration-300" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">{post.date} — Journal</span>
                      <h3 className="photo-serif text-xl text-white hover:text-[#7A9A8B] cursor-pointer font-semibold leading-snug">{post.title}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed">{post.desc}</p>
                      <a href="#" className="text-xs font-semibold text-[#7A9A8B] hover:text-white transition-colors inline-block mt-2">Read Journal →</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section className="photo-section pb-24" id="contact">
              <div className="photo-contact-grid">
                
                {/* Left Column: Details */}
                <div className="photo-glass-column">
                  <span className="photo-card-glass-label">Get in Touch</span>
                  <h2 className="photo-heading">Let's Frame Your <em>Story</em></h2>
                  <p className="photo-slide-desc">
                    Whether you are planning a high-end editorial showcase, a commercial launch, or looking to preserve cinematic personal milestones, we would love to collaborate.
                  </p>
                  <div className="photo-contact-details">
                    <div className="photo-contact-method">
                      <span className="photo-method-icon"><i className="fa-solid fa-map-pin"></i></span>
                      <div>
                        <h4>Studio Address</h4>
                        <p>244 Golden Hour Boulevard, Suite 100, Los Angeles, CA</p>
                      </div>
                    </div>
                    <div className="photo-contact-method">
                      <span className="photo-method-icon"><i className="fa-solid fa-envelope"></i></span>
                      <div>
                        <h4>Electronic Mail</h4>
                        <p>concierge@photostudio.luxury</p>
                      </div>
                    </div>
                    <div className="photo-contact-method">
                      <span className="photo-method-icon"><i className="fa-solid fa-phone"></i></span>
                      <div>
                        <h4>Direct Line</h4>
                        <p>+1 (555) 390-4821</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Fluid Centered Responsive Form */}
                <div className="w-full max-w-full">
                  <form 
                    onSubmit={handleInquirySubmit} 
                    className="w-full max-w-xl mx-auto p-6 sm:p-10 rounded-3xl photo-glass-form flex flex-col gap-5 border border-stone-800 bg-[#0d0d0d]/90 shadow-2xl backdrop-blur-xl"
                  >
                    {isAuthenticated && user && (
                      <div className="bg-[#7A9A8B]/10 border border-[#7A9A8B]/30 rounded-xl px-4 py-2.5 text-xs text-[#7A9A8B] flex items-center justify-between">
                        <span>Submitting as: <strong>{user.name}</strong> ({user.email})</span>
                        <span className="font-mono text-[10px] uppercase bg-[#7A9A8B]/20 px-2 py-0.5 rounded">Verified</span>
                      </div>
                    )}
                    
                    {/* First Name & Last Name Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <div className="flex flex-col gap-2 w-full text-left">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400">First Name <span className="text-red-400">*</span></label>
                        <input 
                          type="text" 
                          placeholder="John" 
                          defaultValue={user ? user.name.split(' ')[0] : ''}
                          required 
                          className="w-full box-border rounded-lg bg-[#141414] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition"
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full text-left">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Last Name <span className="text-red-400">*</span></label>
                        <input 
                          type="text" 
                          placeholder="Doe" 
                          defaultValue={user && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : ''}
                          required 
                          className="w-full box-border rounded-lg bg-[#141414] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2 w-full text-left">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Email Address <span className="text-red-400">*</span></label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        defaultValue={user ? user.email : ''}
                        required 
                        className="w-full box-border rounded-lg bg-[#141414] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition"
                      />
                    </div>

                    {/* Genre Select */}
                    <div className="flex flex-col gap-2 w-full text-left">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Project Genre</label>
                      <select 
                        defaultValue="editorial"
                        className="w-full box-border rounded-lg bg-[#141414] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition cursor-pointer"
                      >
                        <option value="editorial">Editorial Campaign</option>
                        <option value="portrait">Studio Portrait Session</option>
                        <option value="wedding">Cinematic Wedding Coverage</option>
                        <option value="commercial">Commercial Visual Direction</option>
                      </select>
                    </div>

                    {/* Concept Details Textarea */}
                    <div className="flex flex-col gap-2 w-full text-left">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Project Scope / Concept <span className="text-red-400">*</span></label>
                      <textarea 
                        rows="4" 
                        placeholder="Describe your creative vision, preferred dates, location..." 
                        required 
                        className="w-full box-border rounded-lg bg-[#141414] border border-stone-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition resize-none"
                      ></textarea>
                    </div>

                    {/* Centered Full-Width Submit CTA */}
                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-[#7A9A8B] text-black font-bold text-xs tracking-wider uppercase rounded-lg hover:bg-[#638273] transition mt-2 text-center cursor-pointer shadow-lg"
                    >
                      Send Project Inquiry
                    </button>
                  </form>
                </div>

              </div>
            </section>

          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="photo-editorial-footer w-full max-w-full overflow-x-hidden">
        <div className="photo-footer-grid">
          <div className="photo-footer-logo">Photo</div>
          <div className="photo-footer-links">
            <a href="#">Privacy Protocol</a>
            <a href="#">Licensing Terms</a>
            <a href="#">Press Kit</a>
            <a href="#contact">Contact Concierge</a>
          </div>
          <p>&copy; 2026 Photo Studio Luxury. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LOmbreApp />
    </AuthProvider>
  );
}
