import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_USERS_KEY = 'lumiere_photography3_users_db';
const STORAGE_SESSION_KEY = 'lumiere_photography3_current_user';

// Helper: Web Crypto API SHA-256 password hashing with salt
async function hashPassword(password, salt = 'lumiere_fineart_salt_2026') {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        const storedUsers = localStorage.getItem(STORAGE_USERS_KEY);
        if (!storedUsers) {
          // Pre-seed demo client account with hashed password (password: "lumiere123")
          const defaultHashedPassword = await hashPassword('lumiere123');
          const initialUsers = [
            {
              id: 'lumiere-usr-01',
              name: 'Amara & David Johnson',
              email: 'amara@lumierestudios.com',
              passwordHash: defaultHashedPassword,
              role: 'Fine Art Wedding Client',
              createdAt: new Date().toISOString()
            },
            {
              id: 'lumiere-usr-02',
              name: 'Jonathan & Clara Bell',
              email: 'clara@lumierestudios.com',
              passwordHash: defaultHashedPassword,
              role: 'Cinematography Client',
              createdAt: new Date().toISOString()
            }
          ];
          localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initialUsers));
        }

        const currentSession = localStorage.getItem(STORAGE_SESSION_KEY);
        if (currentSession) {
          setUser(JSON.parse(currentSession));
        }
      } catch (err) {
        console.error('Error initializing photography-3 auth context:', err);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const usersJson = localStorage.getItem(STORAGE_USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];
      const inputHash = await hashPassword(password);

      const foundUser = users.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase() && u.passwordHash === inputHash
      );

      if (!foundUser) {
        return { success: false, error: 'Invalid email address or passphrase.' };
      }

      const sessionUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role || 'Fine Art Wedding Client'
      };

      setUser(sessionUser);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Authentication service encountered an error.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const usersJson = localStorage.getItem(STORAGE_USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      const exists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (exists) {
        return { success: false, error: 'A client profile with this email address already exists.' };
      }

      const passwordHash = await hashPassword(password);
      const newUser = {
        id: `lumiere-usr-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash: passwordHash,
        role: 'Fine Art Wedding Client',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };

      setUser(sessionUser);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'Account registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider for photography-3');
  }
  return context;
}
