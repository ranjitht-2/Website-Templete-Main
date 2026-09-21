import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import IntroCurtain from './components/IntroCurtain';
import CustomCursor from './components/CustomCursor';
import PillNav from './components/PillNav';
import FixedFrame from './components/FixedFrame';
import FullscreenNav from './components/FullscreenNav';
import HeroSection from './components/HeroSection';
import HouseSection from './components/HouseSection';
import IngredientsSection from './components/IngredientsSection';
import EditorialMenuSection from './components/EditorialMenuSection';
import SignatureSection from './components/SignatureSection';
import GardenSection from './components/GardenSection';
import ChefSection from './components/ChefSection';
import ExperienceSection from './components/ExperienceSection';
import JournalSection from './components/JournalSection';
import TestimonialSection from './components/TestimonialSection';
import ReservationSection from './components/ReservationSection';
import LocationSection from './components/LocationSection';
import FooterSection from './components/FooterSection';
import SignIn from './components/SignIn';

function MainLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'signin'
  const [redirectTarget, setRedirectTarget] = useState('home');
  const [authReason, setAuthReason] = useState('');

  const handleOpenAuth = (reason = '', target = 'home') => {
    setAuthReason(reason);
    setRedirectTarget(target);
    setCurrentView('signin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAuth = (target = 'home') => {
    setCurrentView('home');
    setAuthReason('');
    if (target && target !== 'home') {
      setTimeout(() => {
        const el = document.getElementById(target) || document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* 00. INTRO CURTAIN LOADER */}
      <IntroCurtain />

      {/* 00. CUSTOM SPRING CURSOR */}
      <CustomCursor />

      {/* 00. FLOATING PILL NAVIGATION */}
      <PillNav
        onOpenNav={() => setIsNavOpen(true)}
        onNavigateToAuth={() => handleOpenAuth('Manage your Patron account & dining access.', 'home')}
      />

      {/* 00. LEGACY FIXED FRAME */}
      <FixedFrame />

      {/* 00. ORGANIC FULLSCREEN MENU OVERLAY */}
      <FullscreenNav
        isOpen={isNavOpen}
        onCloseNav={() => setIsNavOpen(false)}
        onNavigateToAuth={() => handleOpenAuth('Manage your Patron account & dining access.', 'home')}
      />

      {currentView === 'signin' ? (
        <main>
          <SignIn
            onNavigateBack={handleCloseAuth}
            redirectTarget={redirectTarget}
            authReason={authReason}
          />
        </main>
      ) : (
        /* MAIN SECTIONS */
        <main>
          <HeroSection />
          <HouseSection />
          <IngredientsSection />
          <EditorialMenuSection />
          <SignatureSection />
          <GardenSection />
          <ChefSection />
          <ExperienceSection />
          <JournalSection />
          <TestimonialSection />
          <ReservationSection
            onRequireAuth={(target, reason) => handleOpenAuth(reason, target)}
          />
          <LocationSection />
        </main>
      )}

      {/* FOOTER */}
      <FooterSection />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

