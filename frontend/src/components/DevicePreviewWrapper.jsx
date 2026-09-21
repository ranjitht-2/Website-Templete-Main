import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, RotateCcw, RotateCw, ArrowLeft, Download } from 'lucide-react';

export default function DevicePreviewWrapper({ children }) {
  const location = useLocation();
  const isIframe = window.self !== window.top;
  const [viewMode, setViewMode] = useState('desktop'); // desktop (laptop), tablet, mobile
  const [orientation, setOrientation] = useState('portrait'); // portrait or landscape

  const handleRefresh = () => {
    window.location.reload();
  };

  // If loaded inside an iframe, render template directly without duplicate toolbar
  if (isIframe) {
    return <>{children}</>;
  }

  // Determine template slug and category slug for builder / download / back link
  const pathParts = location.pathname.split('/').filter(Boolean);
  let templateSlug = 'template';
  let categorySlug = 'admin';
  if (pathParts.length > 0) {
    if (pathParts[0] === 'templates' && pathParts.length >= 3) {
      categorySlug = pathParts[1];
      templateSlug = pathParts[2];
    } else {
      const lastPart = pathParts[pathParts.length - 1];
      if (lastPart === 'index.html' && pathParts.length > 1) {
        templateSlug = pathParts[pathParts.length - 2];
        categorySlug = pathParts.length > 2 ? pathParts[pathParts.length - 3] : 'admin';
      } else {
        templateSlug = lastPart;
      }
    }
  }

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: '#f8fafc',
      backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
      backgroundSize: '20px 20px',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* 1. Device Preview Header Toolbar */}
      <header style={{
        height: '64px',
        minHeight: '64px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        zIndex: 99999,
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* Left: Brand Logo & Back to Templates link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/templates" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} title="Back to Templates">
            <img src="/logo.jpg" alt="TechnoSprint Logo" style={{ height: '32px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
          </a>
          <a
            href="/templates"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
          >
            <ArrowLeft size={14} /> Back
          </a>
        </div>

        {/* Center: Segmented Device Switcher (Desktop / Tablet / Mobile) */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '4px',
          gap: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          {/* Desktop Button */}
          <button
            onClick={() => setViewMode('desktop')}
            style={{
              background: viewMode === 'desktop' ? '#eff6ff' : 'transparent',
              color: viewMode === 'desktop' ? '#2563eb' : '#64748b',
              border: viewMode === 'desktop' ? '1px solid #bfdbfe' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: viewMode === 'desktop' ? 600 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease-in-out',
              outline: 'none',
              boxShadow: viewMode === 'desktop' ? '0 1px 2px rgba(37,99,235,0.08)' : 'none'
            }}
          >
            <Monitor size={15} />
            Desktop
          </button>

          {/* Tablet Button */}
          <button
            onClick={() => setViewMode('tablet')}
            style={{
              background: viewMode === 'tablet' ? '#eff6ff' : 'transparent',
              color: viewMode === 'tablet' ? '#2563eb' : '#64748b',
              border: viewMode === 'tablet' ? '1px solid #bfdbfe' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: viewMode === 'tablet' ? 600 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease-in-out',
              outline: 'none',
              boxShadow: viewMode === 'tablet' ? '0 1px 2px rgba(37,99,235,0.08)' : 'none'
            }}
          >
            <Tablet size={15} />
            Tablet
          </button>

          {/* Mobile Button */}
          <button
            onClick={() => setViewMode('mobile')}
            style={{
              background: viewMode === 'mobile' ? '#eff6ff' : 'transparent',
              color: viewMode === 'mobile' ? '#2563eb' : '#64748b',
              border: viewMode === 'mobile' ? '1px solid #bfdbfe' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: viewMode === 'mobile' ? 600 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease-in-out',
              outline: 'none',
              boxShadow: viewMode === 'mobile' ? '0 1px 2px rgba(37,99,235,0.08)' : 'none'
            }}
          >
            <Smartphone size={15} />
            Mobile
          </button>
        </div>

        {/* Right: Orientation Toggle & Download */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {(viewMode === 'mobile' || viewMode === 'tablet') && (
            <button
              onClick={toggleOrientation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                color: '#475569',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
              title="Toggle Portrait / Landscape"
            >
              <RotateCw size={14} />
              {orientation === 'portrait' ? 'Portrait' : 'Landscape'}
            </button>
          )}

          {/* Refresh Iframe */}
          <button
            onClick={handleRefresh}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              width: '34px',
              height: '34px',
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.15s',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
            title="Reload Preview"
          >
            <RotateCcw size={14} />
          </button>

          {/* Download Action */}
          <a
            href={`/templates/${templateSlug}?action=download`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#2563eb',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              padding: '7px 16px',
              borderRadius: '99px',
              boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
              transition: 'all 0.2s',
              marginLeft: '2px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            <Download size={14} />
            Download
          </a>
        </div>
      </header>

      {/* 2. Dynamic Resizable Device Canvas */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: viewMode === 'desktop' ? '0' : '24px',
        overflow: 'auto',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        {/* DESKTOP VIEW */}
        {viewMode === 'desktop' && (
          <div style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            transition: 'width 300ms ease-in-out, height 300ms ease-in-out'
          }}>
            {children}
          </div>
        )}

        {/* TABLET VIEW */}
        {viewMode === 'tablet' && (
          <div style={{
            width: orientation === 'portrait' ? '768px' : '1024px',
            height: orientation === 'portrait' ? '1024px' : '768px',
            maxHeight: 'calc(100vh - 100px)',
            maxWidth: 'calc(100vw - 32px)',
            flexShrink: 0,
            backgroundColor: '#0f172a',
            border: '12px solid #1e293b',
            borderRadius: '32px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
            transition: 'width 300ms ease-in-out, height 300ms ease-in-out'
          }}>
            <div style={{ width: '100%', height: '100%', overflow: 'auto', borderRadius: '20px', background: '#ffffff' }}>
              {children}
            </div>
          </div>
        )}

        {/* MOBILE VIEW */}
        {viewMode === 'mobile' && (
          <div style={{
            width: orientation === 'portrait' ? '375px' : '812px',
            height: orientation === 'portrait' ? '812px' : '375px',
            maxHeight: 'calc(100vh - 90px)',
            maxWidth: 'calc(100vw - 24px)',
            flexShrink: 0,
            backgroundColor: '#0f172a',
            border: '12px solid #1e293b',
            borderRadius: '44px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12) inset',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
            transition: 'width 300ms ease-in-out, height 300ms ease-in-out'
          }}>
            <div className="phone-screen-wrapper" style={{ width: '100%', height: '100%', maxWidth: '100%', overflow: 'auto', overflowX: 'hidden', borderRadius: '32px', background: '#ffffff', boxSizing: 'border-box' }}>
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
