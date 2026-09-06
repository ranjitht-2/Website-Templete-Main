import React from 'react';

export default function Hero({ onOpenVideo }) {
  return (
    <section className="hero" id="home">
      {/* Left & Right Vertical Ticking Scroll Indicators (Desktop Only) */}
      <div className="scroll-indicator left desktop-only">
        <div className="tick"></div>SCROLL DOWN
      </div>
      <div className="scroll-indicator right desktop-only">
        <div className="tick"></div>SCROLL DOWN
      </div>

      {/* Desktop 3-Column Split Hero (>= 768px) */}
      <div className="hero-grid desktop-only">
        {/* Left Column */}
        <div className="hero-text left">
          <span className="eyebrow">Since 2008</span>
          <h2>We Build<br />Every Structure</h2>
        </div>

        {/* Center Floating Visual with Amber Glow Ring */}
        <div className="hero-image-wrap">
          <div className="glow-ring"></div>
          <img 
            src="./assets/images/hero-villa.jpg" 
            alt="BuildHub Landmark Villa" 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </div>

        {/* Right Column */}
        <div className="hero-text right">
          <span className="eyebrow">Precision Engineering</span>
          <h2>To Stand The<br />Test Of Time</h2>
        </div>
      </div>

      {/* Mobile Single-Column Flow (< 768px) */}
      <div className="hero-mobile-flow mobile-only">
        {/* Full-width Responsive Hero Card Image */}
        <div className="hero-card-image-wrap">
          <div className="glow-ring"></div>
          <img 
            src="./assets/images/hero-villa.jpg" 
            alt="BuildHub Landmark Villa" 
            className="hero-mobile-img"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </div>

        {/* Unified Tagline Badge & Main Headline Flow */}
        <div className="hero-mobile-content">
          <span className="hero-mobile-badge">SINCE 2008</span>
          <h1 className="hero-mobile-headline">
            We Build Every Structure To Stand The Test Of Time
          </h1>
          <p className="hero-mobile-sub">
            Precision engineering and landmark architecture crafted to endure.
          </p>

          {/* Inline CTA placed directly below primary headline block */}
          <div className="hero-mobile-cta">
            <a href="#bim3d" className="btn btn-primary hero-inline-cta-btn">
              VIEW OUR WORK & 3D BIM →
            </a>
          </div>

          {/* Side Info Card relocated & stacked below main content on mobile */}
          <div className="hero-side-card">
            <span>© BuildHub Constructions • Premier Architecture</span>
          </div>
        </div>
      </div>

      {/* Bottom Left Tag & Bottom Right CTA (Desktop Only) */}
      <div className="bottom-tag desktop-only">© BuildHub Constructions • Premier Architecture</div>
      <div className="bottom-cta desktop-only">
        <a href="#bim3d">View Our Work & 3D BIM →</a>
      </div>
    </section>
  );
}

