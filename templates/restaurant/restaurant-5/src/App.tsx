import React, { useState, useEffect } from 'react';
import { NoireMenuItem } from './types';
import { AuthProvider } from './context/AuthContext';

import { CornerNav } from './components/CornerNav';
import { NoireHero } from './components/NoireHero';
import { TheRoomSection } from './components/TheRoomSection';
import { InteractiveMenuSection } from './components/InteractiveMenuSection';
import { FireSection } from './components/FireSection';
import { NightHorizontalSection } from './components/NightHorizontalSection';
import { SignatureDishSection } from './components/SignatureDishSection';
import { EditorialChefSection } from './components/EditorialChefSection';
import { EventsCalendarSection } from './components/EventsCalendarSection';
import { UnconventionalGallerySection } from './components/UnconventionalGallerySection';
import { TestimonialSection } from './components/TestimonialSection';
import { MinimalReservationSection } from './components/MinimalReservationSection';
import { UrbanLocationSection } from './components/UrbanLocationSection';
import { NoireFooter } from './components/NoireFooter';
import { DishDetailModal } from './components/DishDetailModal';
import { SignIn } from './components/SignIn';

function NoireAppContent() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedDish, setSelectedDish] = useState<NoireMenuItem | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'signin'>('home');
  const [redirectTarget, setRedirectTarget] = useState<string>('hero');
  const [authReason, setAuthReason] = useState<string>('');

  // Scroll spy to monitor current active section
  useEffect(() => {
    if (currentView !== 'home') return;

    const sections = ['hero', 'room', 'menu', 'night', 'events', 'gallery', 'reservation', 'location'];

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveSection('location');
        return;
      }

      const scrollPosition = window.scrollY + 300;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (reason: string = '', target: string = 'hero') => {
    setAuthReason(reason);
    setRedirectTarget(target);
    setCurrentView('signin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAuth = (target: string = 'hero') => {
    setCurrentView('home');
    setAuthReason('');
    if (target && target !== 'hero') {
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleReserveForDish = () => {
    setSelectedDish(null);
    scrollToSection('reservation');
  };

  return (
    <div className="min-h-screen bg-[#171512] text-[#F3EBDD] font-body selection:bg-[#B87552] selection:text-[#F3EBDD]">
      {/* Viewport Frame */}
      <div className="w-full bg-[#171512]">
        {/* Fixed 4-Corner Navigation */}
        <CornerNav
          currentSection={currentView === 'signin' ? 'auth' : activeSection}
          onNavigate={scrollToSection}
          onOpenReservation={() => scrollToSection('reservation')}
          onNavigateToAuth={() => handleOpenAuth('Manage your NOIRÉ patron membership & privileges.', 'hero')}
        />

        {currentView === 'signin' ? (
          <SignIn
            onNavigateBack={handleCloseAuth}
            redirectTarget={redirectTarget}
            authReason={authReason}
          />
        ) : (
          <>
            {/* Hero Section */}
            <NoireHero
              onExploreMenu={() => scrollToSection('menu')}
              onOpenReservation={() => scrollToSection('reservation')}
            />

            {/* 01. The Room Architecture */}
            <TheRoomSection />

            {/* 02. Interactive Menu */}
            <InteractiveMenuSection onSelectDish={(dish) => setSelectedDish(dish)} />

            {/* 03. Fire is Flavor */}
            <FireSection />

            {/* 04. Nocturnal Horizontal Experience */}
            <NightHorizontalSection />

            {/* 05. Signature Dish Showcase */}
            <SignatureDishSection />

            {/* 06. Chef Arjun Rao Profile */}
            <EditorialChefSection />

            {/* 07. Events Schedule */}
            <EventsCalendarSection
              onOpenReservation={() => scrollToSection('reservation')}
              onRequireAuth={(reason, target) => handleOpenAuth(reason, target)}
            />

            {/* 08. Unconventional Gallery */}
            <UnconventionalGallerySection />

            {/* 09. Giant Testimonial Statement */}
            <TestimonialSection />

            {/* 10. Minimal Reservation */}
            <MinimalReservationSection
              onReservationSubmitted={() => {}}
              onRequireAuth={(reason, target) => handleOpenAuth(reason, target)}
            />

            {/* 11. Urban Location & Vector Map */}
            <UrbanLocationSection />
          </>
        )}

        {/* Black Footer */}
        <NoireFooter
          onNavigate={scrollToSection}
          onOpenReservation={() => scrollToSection('reservation')}
          onNavigateToAuth={() => handleOpenAuth('Manage your NOIRÉ patron membership & privileges.', 'hero')}
        />
      </div>

      {/* Dish Quick View Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onReserveForDish={handleReserveForDish}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NoireAppContent />
    </AuthProvider>
  );
}

