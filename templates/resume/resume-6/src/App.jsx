import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Profile from './components/Profile.jsx';
import ExperienceTimeline from './components/ExperienceTimeline.jsx';
import SelectedWork from './components/SelectedWork.jsx';
import Expertise from './components/Expertise.jsx';
import Education from './components/Education.jsx';
import Recognition from './components/Recognition.jsx';
import Philosophy from './components/Philosophy.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CVModal from './components/CVModal.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import './index.css';

/**
 * Template 2 — Elena Marlowe: Creative Director & Brand Strategist
 */
function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    /* em-portfolio: unique root scope class for this template */
    <div className="em-portfolio">
      <Navbar onOpenCV={() => setCvModalOpen(true)} />
      <main>
        <Hero onOpenCV={() => setCvModalOpen(true)} />
        <Profile />
        <ExperienceTimeline />
        <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />
        <Expertise />
        <Education />
        <Recognition />
        <Philosophy />
        <Contact />
      </main>
      <Footer />

      {/* Interactive CV Modal */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      {/* Interactive Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;

