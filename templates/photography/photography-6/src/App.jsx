import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import HeroGrid from './components/HeroGrid';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SignIn from './components/SignIn';

function KairoApp() {
  const { isAuthenticated } = useAuth();

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

  const handleGetInTouchAction = (e) => {
    e?.preventDefault();
    if (!isAuthenticated) {
      handleOpenSignIn('Please sign in or create an account to initiate an assignment inquiry.', 'contact');
    } else {
      navigateToSection('contact');
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100%',
      overflowX: 'hidden',
      margin: 0,
      padding: 0,
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Editorial Font Links */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Components */}
      <Navbar 
        onNavigateTo={navigateToSection}
        onOpenSignIn={handleOpenSignIn}
        currentView={currentView}
      />

      {currentView === 'signin' ? (
        <main className="w-full max-w-full overflow-x-hidden pt-16">
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
          <Scene3D />
          <HeroGrid />
          <AboutSection onGetInTouch={handleGetInTouchAction} />
          <ServicesSection />
          <ContactSection onOpenSignIn={handleOpenSignIn} />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <KairoApp />
    </AuthProvider>
  );
}
