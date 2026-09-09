import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfessionalOverview from "./components/ProfessionalOverview";
import Expertise from "./components/Expertise";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Education from "./components/Education";
import Research from "./components/Research";
import Contributions from "./components/Contributions";
import Recognition from "./components/Recognition";
import Philosophy from "./components/Philosophy";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CVModal from "./components/CVModal";

export default function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCV={() => setIsCVOpen(true)} />
      <main>
        <Hero onOpenCV={() => setIsCVOpen(true)} />
        <ProfessionalOverview />
        <Expertise />
        <ExperienceTimeline />
        <Research />
        <Education />
        <Contributions />
        <Recognition />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </>
  );
}
