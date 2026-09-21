import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Story from './components/Story';
import Signature from './components/Signature';
import Menu from './components/Menu';
import Chef from './components/Chef';
import Experience from './components/Experience';
import Kitchen from './components/Kitchen';
import Gallery from './components/Gallery';
import Journal from './components/Journal';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingDishPreview from './components/FloatingDishPreview';
import FullscreenNav from './components/FullscreenNav';
import ReservationModal from './components/ReservationModal';
import InfoModal from './components/InfoModal';
import ScrollReveal from './components/ScrollReveal';
import SignIn from './components/SignIn';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'signin'
  const [authReason, setAuthReason] = useState('');
  const [authRedirectTarget, setAuthRedirectTarget] = useState('');

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [resDetails, setResDetails] = useState(null);
  const [hoveredDishImg, setHoveredDishImg] = useState(null);

  const navigateToSignIn = (target = 'hero', reason = '') => {
    setAuthRedirectTarget(target);
    setAuthReason(reason);
    setCurrentView('signin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (targetSection = '') => {
    setCurrentView('home');
    setAuthReason('');
    setAuthRedirectTarget('');
    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleDishHover = (imgUrl) => {
    setHoveredDishImg(imgUrl);
  };

  const handleDishLeave = () => {
    setHoveredDishImg(null);
  };

  // Check if returning from signin with pending reservation
  React.useEffect(() => {
    const saved = sessionStorage.getItem('restaurant_3_pending_reservation');
    if (saved && isAuthenticated) {
      try {
        const details = JSON.parse(saved);
        setResDetails(details);
        setIsReserveModalOpen(true);
        sessionStorage.removeItem('restaurant_3_pending_reservation');
      } catch (err) {
        console.error('Error parsing pending reservation:', err);
      }
    }
  }, [isAuthenticated]);

  // Protected Action: Table Reservation Submission
  const handleReserve = (details) => {
    if (!isAuthenticated) {
      sessionStorage.setItem('restaurant_3_pending_reservation', JSON.stringify(details));
      navigateToSignIn(
        'reservation',
        'Please sign in with your registered Lumière patron account to complete your table reservation.'
      );
      return;
    }

    setResDetails(details);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="lumiere-app-container">
      <CustomCursor />
      
      <Navbar 
        onNavigateToSignIn={(target) => navigateToSignIn(target)}
      />

      {currentView === 'signin' ? (
        <SignIn
          onNavigateBack={(target) => navigateToHome(target)}
          redirectTarget={authRedirectTarget}
          authReason={authReason}
        />
      ) : (
        <>
          <main>
            <Hero />
            <Intro />
            <Story />
            <Signature />
            <Menu onDishHover={handleDishHover} onDishLeave={handleDishLeave} />
            <Chef />
            <Experience />
            <Kitchen />
            <Gallery />
            <Journal />
            <Reservation onReserve={handleReserve} />
            <Contact />
          </main>

          <Footer />

          <FloatingDishPreview activeImg={hoveredDishImg} />

          {isNavOpen && <FullscreenNav onClose={() => setIsNavOpen(false)} />}
          {isReserveModalOpen && (
            <ReservationModal 
              isOpen={isReserveModalOpen} 
              onClose={() => setIsReserveModalOpen(false)} 
              resDetails={resDetails} 
            />
          )}
          {isInfoModalOpen && <InfoModal onClose={() => setIsInfoModalOpen(false)} />}

          <ScrollReveal />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
