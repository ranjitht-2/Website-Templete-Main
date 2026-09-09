import React from 'react';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function CollectionModal({ collection, onClose }) {
  if (!collection) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={28} />
        </button>

        <div className="section-label">
          <span>COLLECTION SPECIFICATION — {collection.number}</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', marginBottom: '0.5rem', lineHeight: '1' }}>
          {collection.name}
        </h2>

        <span className="collection-season" style={{ display: 'block', marginBottom: '2rem' }}>
          {collection.season} ({collection.year}) — {collection.type}
        </span>

        <div className="collection-modal-grid">
          <div>
            <span className="meta-label">CREATIVE CONCEPT</span>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '0.4rem', lineHeight: '1.7' }}>
              {collection.concept}
            </p>
          </div>

          <div>
            <span className="meta-label">MATERIALS & FABRIC DEVELOPMENT</span>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '0.4rem', lineHeight: '1.7' }}>
              {collection.materials}
            </p>
          </div>
        </div>

        <div className="collection-modal-notes">
          <span className="meta-label">ATELIER DESIGN NOTES</span>
          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            "{collection.notes}"
          </p>
        </div>

        <span className="meta-label" style={{ marginBottom: '1rem', display: 'block' }}>GALLERY LOOKS ({collection.lookCount} TOTAL LOOKS)</span>
        <div className="collection-modal-gallery">
          {collection.gallery.map((img, idx) => (
            <div key={idx} className="collection-modal-gallery-item">
              <img src={img} alt={`${collection.name} look ${idx+1}`} className="collection-modal-gallery-img" />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-editorial-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <span>Close Specification</span>
          </button>
        </div>
      </div>
    </div>
  );
}
