import React from 'react';
import { X, Printer, Download, MapPin, Mail, Award, GraduationCap } from 'lucide-react';
import { CHEF_PROFILE, CAREER_TIMELINE, EDUCATION, RECOGNITION, EXPERTISE_CATEGORIES } from '../data/culinaryData';

export default function CVModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close CV preview">
          <X size={20} />
        </button>

        <div className="cv-modal-top-bar">
          <div>
            <span className="section-label">CURRICULUM VITAE PREVIEW</span>
            <h2 className="cv-modal-title">
              Executive Culinary Resume
            </h2>
          </div>
          
          <button className="btn-primary cv-print-btn" onClick={handlePrint}>
            <Printer size={15} /> Print / Save as PDF
          </button>
        </div>

        {/* Printable CV Content Container */}
        <div className="cv-sheet-container">
          
          {/* Header */}
          <div className="cv-sheet-header">
            <div>
              <h1 className="cv-sheet-name">
                {CHEF_PROFILE.name.toUpperCase()}
              </h1>
              <div className="cv-sheet-subtitle">
                {CHEF_PROFILE.title} &bull; {CHEF_PROFILE.specialization}
              </div>
            </div>

            <div className="cv-sheet-contact">
              <div><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} /> {CHEF_PROFILE.location}</div>
              <div><Mail size={12} style={{ display: 'inline', marginRight: '4px' }} /> {CHEF_PROFILE.email}</div>
              <div>{CHEF_PROFILE.experienceYears} Years Fine Dining Leadership</div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="cv-sheet-section">
            <h3 className="cv-sheet-section-title">
              PROFESSIONAL PROFILE
            </h3>
            <p className="cv-sheet-desc">
              "{CHEF_PROFILE.tagline}" {CHEF_PROFILE.intro}
            </p>
          </div>

          {/* Experience */}
          <div className="cv-sheet-section">
            <h3 className="cv-sheet-section-title cv-sheet-section-title-bordered">
              CAREER TIMELINE & KITCHEN LEADERSHIP
            </h3>
            
            <div className="cv-timeline-list">
              {CAREER_TIMELINE.map((item, idx) => (
                <div key={idx} className="cv-timeline-row">
                  <div className="cv-timeline-period">
                    {item.period}
                  </div>
                  <div className="cv-timeline-info">
                    <h4 className="cv-timeline-role">
                      {item.role} &mdash; <span className="cv-timeline-org">{item.organization}</span>
                    </h4>
                    <div className="cv-timeline-loc">
                      {item.location} ({item.note})
                    </div>
                    <p className="cv-timeline-text">
                      {item.responsibilities}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise & Skills */}
          <div className="cv-sheet-section">
            <h3 className="cv-sheet-section-title cv-sheet-section-title-bordered">
              SPECIALIZED CULINARY COMPETENCIES
            </h3>
            <div className="cv-skills-grid">
              {EXPERTISE_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="cv-skill-card">
                  <div className="cv-skill-title">
                    {cat.title} ({cat.percentage}%)
                  </div>
                  <div className="cv-skill-items">
                    {cat.items.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Recognition */}
          <div className="cv-duo-grid">
            <div>
              <h3 className="cv-sheet-section-title">
                EDUCATION & ACADEMICS
              </h3>
              {EDUCATION.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                  <strong style={{ color: '#2B2927' }}>{edu.degree}</strong> ({edu.year})
                  <div style={{ color: '#524F4B' }}>{edu.institution}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="cv-sheet-section-title">
                HONORS & RECOGNITION
              </h3>
              {RECOGNITION.map((rec, idx) => (
                <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                  <strong style={{ color: '#2B2927' }}>{rec.title}</strong> ({rec.year})
                  <div style={{ color: '#524F4B' }}>{rec.organization}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-disclaimer">
            Official Executive Curriculum Vitae &bull; Fictional Demonstration Record &bull; Lucien Moreau
          </div>

        </div>
      </div>
    </div>
  );
}
