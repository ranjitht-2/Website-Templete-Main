import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthModal from './AuthModal';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('transport_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const openAuth = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const loginUser = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('transport_user', JSON.stringify(userData));
    } catch (e) {}
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem('transport_user');
    } catch (e) {}
  };

  // Intercept ANY button or link click across all transport templates
  useEffect(() => {
    const handleGlobalButtonClick = (e) => {
      const target = e.target.closest('button, a, input[type="submit"], input[type="button"], [role="button"], .btn');
      if (!target) return;

      // Ignore buttons inside the auth modal container/overlay or explicit auth-ignore elements
      if (
        target.closest('.auth-modal-overlay') || 
        target.closest('.auth-modal-container') || 
        target.classList.contains('auth-ignore')
      ) {
        return;
      }

      const text = (target.innerText || target.getAttribute('aria-label') || target.value || '').toLowerCase();
      
      // Stop standard navigation or form submission so Login & Sign In pops up!
      e.preventDefault();
      e.stopPropagation();

      if (text.includes('sign in') || text.includes('log in') || text.includes('login')) {
        openAuth('signin');
      } else if (text.includes('sign up') || text.includes('register') || text.includes('join') || text.includes('create account')) {
        openAuth('signup');
      } else {
        openAuth('signin');
      }
    };

    document.addEventListener('click', handleGlobalButtonClick, true);
    return () => document.removeEventListener('click', handleGlobalButtonClick, true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthOpen, authMode, setAuthMode, openAuth, closeAuth, user, loginUser, logoutUser }}>
      {children}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        mode={authMode}
        setMode={setAuthMode}
        user={user}
        onLogin={loginUser}
        onLogout={logoutUser}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      isAuthOpen: false,
      authMode: 'signin',
      openAuth: () => {},
      closeAuth: () => {},
      user: null,
      loginUser: () => {},
      logoutUser: () => {}
    };
  }
  return context;
}
