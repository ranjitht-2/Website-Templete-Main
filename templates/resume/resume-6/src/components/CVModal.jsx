import React from 'react';
import { profile, experience, expertise, education, recognition, talks } from '../data.js';
import './CVModal.css';

export default function CVModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="em-modal-overlay" onClick={onClose}>
      <div className="em-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Action Bar */}
        <div className="em-modal-header">
          <div className="em-modal-header-info">
            <span className="section-label">CURRICULUM VITAE PREVIEW</span>
            <h2 className="em-modal-title">Executive Creative Portfolio & CV</h2>
          </div>
          <div className="em-modal-actions">
            <button className="btn-primary em-modal-print-btn" onClick={handlePrint}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print / Save as PDF
            </button>
            <button className="em-modal-close-btn" onClick={onClose} aria-label="Close CV modal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="em-cv-sheet">
          
          {/* Header Block */}
          <div className="em-cv-header">
            <div>
              <h1 className="em-cv-name">{profile.name.toUpperCase()}</h1>
              <div className="em-cv-role">
                {profile.title} &bull; {profile.titleTwo}
              </div>
            </div>
            <div className="em-cv-contact-block">
              <div><span>Location:</span> {profile.location}</div>
              <div><span>Email:</span> {profile.email}</div>
              <div><span>Leadership:</span> 12+ Years Executive Practice</div>
            </div>
          </div>

          <div className="divider" style={{ margin: '1.5rem 0' }}></div>

          {/* Professional Narrative */}
          <div className="em-cv-section">
            <h3 className="em-cv-section-title">EXECUTIVE PROFILE</h3>
            <p className="em-cv-text">
              "{profile.philosophy.statement}" {profile.intro}
            </p>
          </div>

          {/* Career Experience */}
          <div className="em-cv-section">
            <h3 className="em-cv-section-title">CAREER LEADERSHIP & EXPERIENCE</h3>
            <div className="em-cv-timeline">
              {experience.map((exp) => (
                <div key={exp.id} className="em-cv-exp-item">
                  <div className="em-cv-exp-period">{exp.period}</div>
                  <div className="em-cv-exp-main">
                    <h4 className="em-cv-exp-role">
                      {exp.role} &mdash; <span className="em-cv-exp-company">{exp.company}</span>
                    </h4>
                    <p className="em-cv-exp-desc">{exp.description}</p>
                    <ul className="em-cv-exp-bullets">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies Grid */}
          <div className="em-cv-section">
            <h3 className="em-cv-section-title">STRATEGIC & CREATIVE COMPETENCIES</h3>
            <div className="em-cv-skills-grid">
              {expertise.map((item, idx) => (
                <div key={idx} className="em-cv-skill-card">
                  <strong>{item.title}</strong>
                  <div className="em-cv-skill-tags">{item.tags.join(' • ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Recognition 2-Col */}
          <div className="em-cv-grid-duo">
            <div>
              <h3 className="em-cv-section-title">EDUCATION & ACADEMICS</h3>
              {education.map((edu, idx) => (
                <div key={idx} className="em-cv-duo-item">
                  <strong>{edu.degree}</strong>
                  <div className="em-cv-subtext">{edu.institution} ({edu.period})</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="em-cv-section-title">INDUSTRY RECOGNITION</h3>
              {recognition.map((rec, idx) => (
                <div key={idx} className="em-cv-duo-item">
                  <strong>{rec.award}</strong>
                  <div className="em-cv-subtext">{rec.org} &bull; {rec.year}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="em-cv-footer">
            Official Curriculum Vitae &bull; Elena Marlowe &bull; Creative Director & Brand Strategist
          </div>

        </div>

      </div>
    </div>
  );
}
