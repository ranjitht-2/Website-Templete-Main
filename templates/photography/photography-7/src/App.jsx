import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import PortfolioGrid from './components/PortfolioGrid';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SignIn from './components/SignIn';

function MainContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [redirectTarget, setRedirectTarget] = useState('home');

  // Update document title for SEO
  useEffect(() => {
    document.title = "Lume Studio — Fashion & Editorial Photography";
  }, []);

  const handleOpenSignIn = (reason, target = 'home') => {
    setAuthReason(reason || '');
    setRedirectTarget(target || 'home');
    setIsAuthOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId) => {
    setIsAuthOpen(false); // Close auth modal/card automatically so page content is revealed
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
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
        const element = document.getElementById(target.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="w-full max-w-full overflow-x-hidden relative"
      style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* 1. Fixed header Navbar */}
      <Navbar onOpenSignIn={handleOpenSignIn} onNavClick={handleNavClick} />

      {/* Auth Modal / Card */}
      {isAuthOpen ? (
        <div 
          className="w-full min-h-screen bg-[#faf9f6] relative z-40"
          style={{ paddingTop: '90px' }}
        >
          <SignIn 
            onNavigateBack={handleNavigateBack}
            redirectTarget={redirectTarget}
            authReason={authReason}
          />
        </div>
      ) : (
        <>
          {/* 2. Repurposed full-bleed Hero Section */}
          <Scene3D />

          {/* 3. Portfolio Gallery Grid */}
          <PortfolioGrid onOpenSignIn={handleOpenSignIn} />

          {/* 4. Two-column About Section */}
          <AboutSection />

          {/* 5. Services and Expertise Section */}
          <ServicesSection onOpenSignIn={handleOpenSignIn} />

          {/* 6. Testimonials client feedback */}
          <Testimonials />

          {/* 7. Contact / CTA Form Section */}
          <ContactSection onOpenSignIn={handleOpenSignIn} />
        </>
      )}

      {/* 8. Footer Section */}
      <Footer onNavClick={handleNavClick} />
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
