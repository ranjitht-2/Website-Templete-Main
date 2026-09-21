import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Layout Components
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';

// Main Finora Page
import { HomePage } from './pages/HomePage';
import { ClientPortalPage } from './pages/ClientPortalPage';

function AppContent() {
  const navigate = useNavigate();

  const handleOpenGetStarted = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-white text-[#191919] flex flex-col font-sans selection:bg-[#191919] selection:text-white">
      {/* Navigation Bar matching Screenshot */}
      <Navbar onGetStarted={handleOpenGetStarted} />

      {/* Dynamic Route Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onGetStarted={handleOpenGetStarted} />} />
          <Route path="/signin" element={<ClientPortalPage />} />
          <Route path="/portal" element={<ClientPortalPage />} />
          <Route path="/login" element={<ClientPortalPage />} />
          <Route path="/contact" element={<Navigate to="/signin" replace />} />
          {/* Catch-all fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Finora Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router basename={window.location.pathname.endsWith('/index.html') ? window.location.pathname.slice(0, -11) : (window.location.pathname.endsWith('/') ? window.location.pathname.slice(0, -1) : window.location.pathname)}>
      <AppContent />
    </Router>
  );
}

