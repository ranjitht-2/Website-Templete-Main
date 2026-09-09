import React from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="em-modal-overlay" onClick={onClose}>
      <div className="em-modal-container em-project-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="em-modal-header">
          <div>
            <span className="section-label">CASE STUDY &bull; PROJECT {project.id}</span>
            <h2 className="em-modal-title">{project.name}</h2>
            <div className="em-project-modal-sub">
              <span>{project.category}</span> &bull; <span>{project.year}</span>
            </div>
          </div>
          <button className="em-modal-close-btn" onClick={onClose} aria-label="Close project modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Main Visual */}
        <div className="em-project-modal-visual-frame">
          <img
            src={project.image}
            alt={project.name}
            className="em-project-modal-img"
          />
        </div>

        {/* Case Study Content */}
        <div className="em-project-modal-body">
          <div className="em-project-modal-overview">
            <h3 className="section-label">PROJECT OVERVIEW</h3>
            <p className="body-lg" style={{ color: 'var(--em-charcoal)', marginTop: '0.5rem' }}>
              {project.description}
            </p>
          </div>

          <div className="em-project-modal-grid">
            <div className="em-project-modal-card">
              <span className="section-label" style={{ color: 'var(--em-burgundy)' }}>01 &mdash; STRATEGIC CHALLENGE</span>
              <p className="body-md" style={{ marginTop: '0.5rem' }}>
                {project.challenge}
              </p>
            </div>

            <div className="em-project-modal-card">
              <span className="section-label" style={{ color: 'var(--em-burgundy)' }}>02 &mdash; CREATIVE SOLUTION</span>
              <p className="body-md" style={{ marginTop: '0.5rem' }}>
                {project.solution}
              </p>
            </div>
          </div>

          <div className="em-project-modal-deliverables">
            <span className="section-label">KEY DELIVERABLES</span>
            <div className="em-project-modal-tags">
              {project.deliverables?.map((item, i) => (
                <span key={i} className="em-project-modal-tag">{item}</span>
              ))}
            </div>
          </div>

          <div className="em-project-modal-impact">
            <span className="section-label" style={{ color: 'var(--em-gold)' }}>MEASURABLE IMPACT & RECOGNITION</span>
            <p className="body-md" style={{ marginTop: '0.35rem', fontStyle: 'italic', color: 'var(--em-charcoal)' }}>
              "{project.impact}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
