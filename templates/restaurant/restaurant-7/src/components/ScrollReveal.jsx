import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, animation = 'fade-in-up', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once animated, stop observing
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px' // Trigger slightly before element reaches viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <>
      {/* Self-contained style block for animation rules */}
      <style>{`
        .reveal-element {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, opacity;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        
        .reveal-element.revealed {
          opacity: 1;
          transform: translate(0, 0) scale(1) !important;
        }

        .reveal-element.fade-in-up {
          transform: translateY(40px);
        }

        .reveal-element.fade-in-down {
          transform: translateY(-40px);
        }

        .reveal-element.fade-in-left {
          transform: translateX(-30px);
        }

        .reveal-element.fade-in-right {
          transform: translateX(30px);
        }

        .reveal-element.zoom-in {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .reveal-element.fade-in-left,
          .reveal-element.fade-in-right {
            transform: translateY(25px);
          }
        }
      `}</style>
      <div
        ref={ref}
        className={`reveal-element ${animation} ${isVisible ? 'revealed' : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </>
  );
}
