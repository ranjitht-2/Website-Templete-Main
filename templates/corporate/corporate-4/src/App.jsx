import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { WarmNavbar } from "./components/WarmNavbar";
import { WarmFooter } from "./components/WarmFooter";
import { WarmConsultationModal } from "./components/WarmConsultationModal";
import { ScrollToTop } from "./components/ScrollToTop";

// Pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { WorkPage } from "./pages/WorkPage";
import { InsightsPage } from "./pages/InsightsPage";
import { ContactPage } from "./pages/ContactPage";
import { SignInPage } from "./pages/SignInPage";

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load user from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("kinesis_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem("kinesis_auth_user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save auth state:", e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("kinesis_auth_user");
    } catch (e) {
      console.error("Failed to clear auth state:", e);
    }
  };

  // If redirected with openProject=true, automatically trigger project modal
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("openProject") === "true") {
      setIsModalOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Auth-gated "Start a Project" handler
  const handleStartProject = () => {
    if (!currentUser) {
      navigate("/signin?redirect=project");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-sand)" }}>
      <WarmNavbar 
        onOpenProjectModal={handleStartProject}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage onOpenProjectModal={handleStartProject} />} />
          <Route path="/about" element={<AboutPage onOpenContact={handleStartProject} />} />
          <Route path="/services" element={<ServicesPage onOpenContact={handleStartProject} />} />
          <Route path="/solutions" element={<SolutionsPage onOpenContact={handleStartProject} />} />
          <Route path="/industries" element={<IndustriesPage onOpenContact={handleStartProject} />} />
          <Route path="/work" element={<WorkPage onOpenContact={handleStartProject} />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<Navigate to="/signin" replace />} />
          <Route 
            path="/signin" 
            element={
              <SignInPage 
                currentUser={currentUser} 
                onLogin={handleLogin} 
                onLogout={handleLogout} 
              />
            } 
          />
        </Routes>
      </div>

      <WarmFooter 
        onOpenProjectModal={handleStartProject} 
        currentUser={currentUser} 
      />

      <WarmConsultationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        currentUser={currentUser}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router basename={window.location.pathname.endsWith('/index.html') ? window.location.pathname.slice(0, -11) : (window.location.pathname.endsWith('/') ? window.location.pathname.slice(0, -1) : window.location.pathname)}>
      <ScrollToTop />
      <AppShell />
    </Router>
  );
}
