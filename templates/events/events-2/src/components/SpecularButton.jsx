import React, { useRef, useState } from 'react';
import './SpecularButton.css';

export const SpecularButton = ({
  children = 'Get Started',
  size = 'lg',
  radius = 16,
  tint = '#7c3aed',
  tintOpacity = 0.25,
  blur = 0,
  textColor = '#ffffff',
  lineColor = '#00f2fe',
  baseColor = '#7c3aed',
  intensity = 1,
  autoAnimate = true,
  disabled = false,
  onClick,
  className = '',
  style = {},
  type = 'button'
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`specular-button specular-button--${size} ${className}`}
      style={{
        '--sb-radius': `${radius}px`,
        '--sb-tint': tint,
        '--sb-tint-opacity': tintOpacity,
        '--sb-text-color': textColor,
        background: `linear-gradient(135deg, ${baseColor} 0%, #4f46e5 100%)`,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        ...style
      }}
    >
      {/* Dynamic Specular Sheen Glow */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: isHovered
            ? `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, ${lineColor}40, transparent 80%)`
            : autoAnimate
            ? `linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.3) 50%, transparent 80%)`
            : 'transparent',
          backgroundSize: autoAnimate && !isHovered ? '200% 100%' : '100% 100%',
          animation: autoAnimate && !isHovered ? 'specularShine 3s infinite linear' : 'none',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <span className="specular-button__label" style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
      <style>{`
        @keyframes specularShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </button>
  );
};

export default SpecularButton;
