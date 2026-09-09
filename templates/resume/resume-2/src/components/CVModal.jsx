import React, { useEffect } from "react";
import {
  profile,
  experience,
  education,
  expertise,
  research,
  publications,
  recognition
} from "../data/data";
import "./CVModal.css";

export default function CVModal({ isOpen, onClose }) {
  // Prevent background scrolling and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Curriculum Vitae Modal">
      <div className="cv-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Floating Action Bar (Hidden during Print) */}
        <div className="cv-modal-actionbar no-print">
          <div className="cv-modal-title-wrap">
            <div className="cv-modal-monogram">ME</div>
            <div>
              <h3 className="cv-modal-header-name">Dr. Maya Ellison</h3>
              <p className="cv-modal-header-sub">Curriculum Vitae Preview • Clinical & Academic Profile</p>
            </div>
          </div>

          <div className="cv-modal-controls">
            <button
              onClick={handlePrint}
              className="cv-btn cv-btn--print"
              title="Print CV or Save as PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="cv-btn cv-btn--close"
              aria-label="Close Curriculum Vitae"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Paper / Sheet Document */}
        <div className="cv-document-sheet">
          
          {/* Header */}
          <header className="cv-doc-header">
            <div className="cv-doc-header-main">
              <div className="cv-doc-title-box">
                <h1 className="cv-doc-name">{profile.name}, <span className="cv-doc-degrees">MD, FRACP</span></h1>
                <p className="cv-doc-role">{profile.title} &bull; {profile.specialty}</p>
              </div>
              <div className="cv-doc-seal">
                <div className="cv-seal-badge">
                  <span className="cv-seal-exp">14+</span>
                  <span className="cv-seal-txt">Years Clinical Excellence</span>
                </div>
              </div>
            </div>

            <div className="cv-doc-contact-bar">
              <div className="cv-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{profile.location}</span>
              </div>
              <div className="cv-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>{profile.email}</span>
              </div>
              <div className="cv-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span>Languages: {profile.languages}</span>
              </div>
              <div className="cv-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>Medical Registration: Specialist Cardiologist</span>
              </div>
            </div>
          </header>

          {/* Section: Executive Summary */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <span className="cv-section-num">01</span>
              <span>Executive Profile &amp; Clinical Focus</span>
            </h2>
            <div className="cv-section-body">
              <p className="cv-summary-lead">
                {profile.bio[0]}
              </p>
              <p className="cv-summary-text">
                {profile.bio[1]}
              </p>
            </div>
          </section>

          {/* Section: Clinical & Diagnostic Competencies */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <span className="cv-section-num">02</span>
              <span>Clinical Competencies &amp; Areas of Practice</span>
            </h2>
            <div className="cv-expertise-grid">
              {expertise.map((item) => (
                <div key={item.id} className="cv-expertise-card">
                  <div className="cv-expertise-head">
                    <span className="cv-expertise-icon">{item.icon}</span>
                    <h3 className="cv-expertise-title">{item.title}</h3>
                  </div>
                  <p className="cv-expertise-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Clinical Appointments */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <span className="cv-section-num">03</span>
              <span>Clinical Experience &amp; Hospital Appointments</span>
            </h2>
            <div className="cv-timeline">
              {experience.map((exp) => (
                <div key={exp.id} className="cv-timeline-item">
                  <div className="cv-timeline-header">
                    <div>
                      <h3 className="cv-item-role">{exp.role}</h3>
                      <p className="cv-item-org">{exp.organisation} &bull; <span className="cv-item-loc">{exp.location}</span></p>
                    </div>
                    <div className="cv-item-badge-wrap">
                      <span className="cv-item-period">{exp.period}</span>
                      {exp.badge && <span className="cv-badge-current">{exp.badge}</span>}
                    </div>
                  </div>
                  <p className="cv-item-desc">{exp.description}</p>
                  <div className="cv-item-resps">
                    <strong className="cv-resps-title">Key Responsibilities:</strong>
                    <ul className="cv-resps-list">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Education & Postgraduate Training */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <span className="cv-section-num">04</span>
              <span>Education, Fellowships &amp; Board Certifications</span>
            </h2>
            <div className="cv-edu-list">
              {education.map((edu) => (
                <div key={edu.id} className="cv-edu-card">
                  <div className="cv-edu-head">
                    <div>
                      <h3 className="cv-edu-degree">{edu.degree}</h3>
                      <p className="cv-edu-inst">{edu.institution}</p>
                    </div>
                    <span className="cv-edu-period">{edu.period}</span>
                  </div>
                  <p className="cv-edu-desc">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Research Initiatives */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <span className="cv-section-num">05</span>
              <span>Cardiovascular Research &amp; Clinical Trials</span>
            </h2>
            <div className="cv-research-list">
              {research.map((res) => (
                <div key={res.id} className="cv-research-card">
                  <div className="cv-research-head">
                    <h3 className="cv-research-title">{res.title}</h3>
                    <div className="cv-research-meta">
                      <span className="cv-research-year">{res.year}</span>
                      <span className={`cv-research-status ${res.status === 'Active' ? 'cv-research-status--active' : ''}`}>{res.status}</span>
                    </div>
                  </div>
                  <p className="cv-research-desc">{res.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Publications & Academic Contributions */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <span className="cv-section-num">06</span>
              <span>Selected Peer-Reviewed Publications</span>
            </h2>
            <div className="cv-pub-list">
              {publications.map((pub, idx) => (
                <div key={pub.id} className="cv-pub-item">
                  <span className="cv-pub-num">[{idx + 1}]</span>
                  <div className="cv-pub-content">
                    <h3 className="cv-pub-title">"{pub.title}"</h3>
                    <p className="cv-pub-meta">
                      <span className="cv-pub-journal">{pub.journal}</span> ({pub.year}) &bull; <span className="cv-pub-cat">{pub.category}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Honors, Awards & Recognition */}
          <section className="cv-section">
            <h2 className="cv-section-title">
              <span className="cv-section-num">07</span>
              <span>Honours, Awards &amp; Professional Recognition</span>
            </h2>
            <div className="cv-rec-grid">
              {recognition.map((rec) => (
                <div key={rec.id} className="cv-rec-card">
                  <div className="cv-rec-year">{rec.year}</div>
                  <div>
                    <h3 className="cv-rec-award">{rec.award}</h3>
                    <p className="cv-rec-org">{rec.organisation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer / Fictional notice */}
          <footer className="cv-doc-footer">
            <div className="cv-footer-divider"></div>
            <p className="cv-footer-disclaimer">
              This Curriculum Vitae is a demonstration portfolio for Dr. Maya Ellison. All information, medical institutions, and achievements are fictional.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}
