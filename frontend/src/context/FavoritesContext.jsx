import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'liked_templates';

export function FavoritesProvider({ children }) {
  const [likedTemplates, setLikedTemplates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to parse liked_templates from localStorage:', error);
      return [];
    }
  });

  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);

  // Sync to localStorage whenever likedTemplates changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedTemplates));
    } catch (error) {
      console.error('Failed to save liked_templates to localStorage:', error);
    }
  }, [likedTemplates]);

  // Sync cross-tab localStorage updates
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          setLikedTemplates(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error('Failed to sync cross-tab storage:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Derived set of IDs for O(1) lookup, memoized
  const likedTemplateIds = useMemo(() => {
    return new Set(
      likedTemplates.map((item) => String(item.id || item.slug || ''))
    );
  }, [likedTemplates]);

  const isLiked = useCallback(
    (templateIdOrSlug) => {
      if (!templateIdOrSlug) return false;
      return likedTemplateIds.has(String(templateIdOrSlug));
    },
    [likedTemplateIds]
  );

  const toggleLike = useCallback((template, e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!template) return;

    const idKey = String(template.id || template.slug || '');
    if (!idKey) return;

    setLikedTemplates((prev) => {
      const exists = prev.some((item) => String(item.id || item.slug || '') === idKey);
      if (exists) {
        return prev.filter((item) => String(item.id || item.slug || '') !== idKey);
      } else {
        const normalizedTemplate = {
          id: template.id || template.slug || idKey,
          name: template.name || template.title || 'Untitled Template',
          title: template.name || template.title || 'Untitled Template',
          slug: template.slug || '',
          previewImage: template.previewImage || template.thumbnail || '',
          category: template.category || { name: 'Template', slug: 'template' },
          price: template.price !== undefined ? template.price : 0,
          demoUrl: template.demoUrl || '',
          description: template.description || ''
        };
        return [normalizedTemplate, ...prev];
      }
    });
  }, []);

  const removeLike = useCallback((templateIdOrSlug) => {
    if (!templateIdOrSlug) return;
    const idKey = String(templateIdOrSlug);
    setLikedTemplates((prev) =>
      prev.filter((item) => String(item.id || item.slug || '') !== idKey)
    );
  }, []);

  const clearFavorites = useCallback(() => {
    setLikedTemplates([]);
  }, []);

  const toggleFavoritesDrawer = useCallback(() => {
    setIsFavoritesDrawerOpen((prev) => !prev);
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      likedTemplates,
      likedTemplateIds,
      likedCount: likedTemplates.length,
      isLiked,
      toggleLike,
      removeLike,
      clearFavorites,
      isFavoritesDrawerOpen,
      setIsFavoritesDrawerOpen,
      toggleFavoritesDrawer
    }),
    [
      likedTemplates,
      likedTemplateIds,
      isLiked,
      toggleLike,
      removeLike,
      clearFavorites,
      isFavoritesDrawerOpen,
      toggleFavoritesDrawer
    ]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
