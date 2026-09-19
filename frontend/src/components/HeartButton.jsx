import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function HeartButton({
  template,
  size = 18,
  variant = 'overlay', // 'overlay' | 'inline'
  className = '',
  style = {}
}) {
  const { isLiked, toggleLike } = useFavorites();
  const [isPopAnim, setIsPopAnim] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!template) return null;

  const templateIdKey = template.id || template.slug;
  const liked = isLiked(templateIdKey);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsPopAnim(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsPopAnim(false), 300);

    toggleLike(template, e);
  };

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={liked ? 'Remove from Favorites' : 'Add to Favorites'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          borderRadius: '99px',
          border: liked ? '1px solid #fecdd3' : '1px solid #e2e8f0',
          backgroundColor: liked ? '#fff1f2' : '#ffffff',
          color: liked ? '#e11d48' : '#64748b',
          fontSize: '0.82rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isPopAnim ? 'scale(1.12)' : 'scale(1)',
          boxShadow: liked
            ? '0 2px 8px rgba(225, 29, 72, 0.15)'
            : '0 1px 3px rgba(0, 0, 0, 0.05)',
          ...style
        }}
        className={className}
      >
        <Heart
          size={size}
          fill={liked ? '#e11d48' : 'none'}
          color={liked ? '#e11d48' : '#64748b'}
          style={{
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isPopAnim ? 'scale(1.25)' : 'scale(1)'
          }}
        />
        <span>{liked ? 'Liked' : 'Favorite'}</span>
      </button>
    );
  }

  // Default 'overlay' or floating button
  return (
    <button
      type="button"
      onClick={handleClick}
      title={liked ? 'Remove from Favorites' : 'Save to Favorites'}
      style={{
        position: 'relative',
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: liked ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
        color: liked ? '#e11d48' : '#64748b',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: liked
          ? '0 4px 12px rgba(225, 29, 72, 0.25), 0 0 0 1px rgba(225, 29, 72, 0.15)'
          : '0 2px 8px rgba(0, 0, 0, 0.12)',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isPopAnim ? 'scale(1.25)' : 'scale(1)',
        zIndex: 5,
        ...style
      }}
      className={className}
      onMouseEnter={(e) => {
        if (!isPopAnim) e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        if (!isPopAnim) e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <Heart
        size={size}
        fill={liked ? '#e11d48' : 'none'}
        color={liked ? '#e11d48' : '#64748b'}
        style={{
          transition: 'all 0.2s ease',
          filter: liked ? 'drop-shadow(0 1px 2px rgba(225, 29, 72, 0.3))' : 'none'
        }}
      />
    </button>
  );
}
