import React, { useEffect } from 'react';
import { X, Heart, Trash2, ExternalLink, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesDrawer() {
  const {
    likedTemplates,
    likedCount,
    removeLike,
    clearFavorites,
    isFavoritesDrawerOpen,
    setIsFavoritesDrawerOpen
  } = useFavorites();

  // Disable background scrolling and listen for Escape key when drawer is open
  useEffect(() => {
    if (isFavoritesDrawerOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsFavoritesDrawerOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen]);

  if (!isFavoritesDrawerOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(4px)',
        transition: 'opacity 0.25s ease'
      }}
      onClick={() => setIsFavoritesDrawerOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Keyframe animation inline style */}
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                backgroundColor: '#fff1f2',
                color: '#e11d48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Heart size={20} fill="#e11d48" />
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Saved Favorites
                <span
                  style={{
                    backgroundColor: '#e11d48',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '99px'
                  }}
                >
                  {likedCount}
                </span>
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                Quick access to your bookmarked templates
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFavoritesDrawerOpen(false)}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
            title="Close Drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* List Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {likedCount === 0 ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 20px',
                color: '#64748b'
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#f8fafc',
                  border: '2px dashed #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: '#94a3b8'
                }}
              >
                <Heart size={30} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                No Favorites Yet
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '280px', lineHeight: '1.5', marginBottom: '24px' }}>
                Click the heart icon on any template card to save it here for quick comparison and preview.
              </p>
              <button
                onClick={() => setIsFavoritesDrawerOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#0066ff',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  padding: '10px 20px',
                  borderRadius: '99px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 102, 255, 0.25)'
                }}
              >
                Explore Templates <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            likedTemplates.map((template) => {
              const catSlug = (template.category?.slug || 'agency').toLowerCase();
              let demoUrl = template.demoUrl || `/templates/${catSlug}/${template.slug}/index.html`;
              if (!demoUrl.endsWith('/index.html') && !demoUrl.includes('.html')) {
                demoUrl = demoUrl.endsWith('/') ? `${demoUrl}index.html` : `${demoUrl}/index.html`;
              }

              const templateIdKey = template.id || template.slug;

              return (
                <div
                  key={`fav-${templateIdKey}`}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '100px',
                      height: '70px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#0f172a',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={template.previewImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'}
                      alt={template.name || template.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                        <h4
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {template.name || template.title}
                        </h4>
                        <button
                          onClick={() => removeLike(templateIdKey)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.15s'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                          title="Remove from favorites"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#64748b',
                          fontWeight: 500,
                          display: 'inline-block',
                          marginTop: '2px'
                        }}
                      >
                        {template.category?.name || 'Website Template'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>
                        {template.price === 0 || !template.price ? 'Free' : `$${template.price}`}
                      </span>

                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsFavoritesDrawerOpen(false)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: '#0066ff',
                          textDecoration: 'none',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#eff6ff',
                          transition: 'background 0.15s'
                        }}
                      >
                        Live Demo <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {likedCount > 0 && (
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <button
              onClick={clearFavorites}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              <Trash2 size={14} /> Clear All
            </button>

            <button
              onClick={() => setIsFavoritesDrawerOpen(false)}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
