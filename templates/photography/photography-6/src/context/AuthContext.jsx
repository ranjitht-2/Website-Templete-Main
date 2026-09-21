import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const USERS_STORAGE_KEY = 'kairo_photography6_users_db';
const CURRENT_USER_KEY = 'kairo_photography6_current_user';

// Helper function to securely hash passwords using Web Crypto API SHA-256 with salt
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'kairo_3d_fashion_editorial_secret_2026');
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate random cryptographic salt
function generateSalt() {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial seed users (matching PostgreSQL seed data)
const SEED_USERS = [
  {
    id: 'a6666666-1111-2222-3333-444444444444',
    name: 'Elena Rostova',
    email: 'elena@example.com',
    salt: 'k6k6k6k6k6k6k6k6',
    passwordHash: '',
    role: 'Couture Director',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b6666666-2222-3333-4444-555555555555',
    name: 'Marcus Vance',
    email: 'marcus@example.com',
    salt: 'm6m6m6m6m6m6m6m6',
    passwordHash: '',
    role: 'Agency Curator',
    createdAt: new Date().toISOString()
  },
  {
    id: 'c6666666-3333-4444-5555-666666666666',
    name: 'Studio Lead',
    email: 'director@kairo.studio',
    salt: 'd6d6d6d6d6d6d6d6',
    passwordHash: '',
    role: 'Creative Director',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and seed database in localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsersRaw) {
          const initializedSeedUsers = [];
          for (const seed of SEED_USERS) {
            let initialPassword = 'KairoPass123!';
            if (seed.email.includes('director')) initialPassword = 'MasterStudio2026!';
            const hash = await hashPassword(initialPassword, seed.salt);
            initializedSeedUsers.push({
              ...seed,
              passwordHash: hash
            });
          }
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initializedSeedUsers));
        }

        const currentUserRaw = localStorage.getItem(CURRENT_USER_KEY);
        if (currentUserRaw) {
          const parsedUser = JSON.parse(currentUserRaw);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error('Failed to initialize auth state in photography-6:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const cleanEmail = (email || '').trim().toLowerCase();
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      const userRecord = users.find(u => u.email.toLowerCase() === cleanEmail);
      if (!userRecord) {
        return { success: false, error: 'No client account found with this email. Please register or verify your details.' };
      }

      const inputHash = await hashPassword(password, userRecord.salt);
      if (inputHash !== userRecord.passwordHash) {
        return { success: false, error: 'Incorrect password. Please verify your credentials and try again.' };
      }

      const authenticatedUser = {
        id: userRecord.id,
        name: userRecord.name,
        email: userRecord.email,
        role: userRecord.role,
        createdAt: userRecord.createdAt
      };

      setUser(authenticatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    } catch (err) {
      return { success: false, error: 'An unexpected authentication error occurred.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanName = (name || '').trim();

      if (!cleanEmail || !password || !cleanName) {
        return { success: false, error: 'Please provide all required fields.' };
      }

      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email address already exists.' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPassword(password, salt);

      const newUser = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'usr_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        salt: salt,
        passwordHash: passwordHash,
        role: 'Editorial Client',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      };

      setUser(authenticatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    } catch (err) {
      return { success: false, error: 'Failed to create your Kairo client account.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider in photography-6');
  }
  return context;
};
