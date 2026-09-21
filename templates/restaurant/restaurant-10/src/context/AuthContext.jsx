import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const USERS_STORAGE_KEY = 'southern_ember_restaurant10_users_db';
const CURRENT_USER_KEY = 'southern_ember_restaurant10_current_user';

// Helper function to securely hash passwords using Web Crypto API SHA-256
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'southern_ember_secret_pepper_2026');
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

// Initial seed users (PostgreSQL matching demo users)
const SEED_USERS = [
  {
    id: 'a0123456-789a-bcde-f012-3456789abcde',
    name: 'Priya Nair',
    email: 'priya@example.com',
    salt: '7a91b2c3d4e5f601',
    passwordHash: '',
    role: 'VIP Member',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b9876543-21ba-dcfe-0987-654321fedcba',
    name: 'Ananya Iyer',
    email: 'ananya@example.com',
    salt: '1f2e3d4c5b6a7089',
    passwordHash: '',
    role: 'Foodie Club',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and seed simulated database in localStorage if not present
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsersRaw) {
          const initializedSeedUsers = [];
          for (const seed of SEED_USERS) {
            const hash = await hashPassword('EmberPass123!', seed.salt);
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
        console.error('Failed to initialize auth state in restaurant-10:', err);
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
        return { success: false, error: 'No account found with this email address. Please register.' };
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
      return { success: true };
    } catch (err) {
      console.error('Login error in restaurant-10:', err);
      return { success: false, error: 'An unexpected authentication error occurred. Please try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanName = (name || '').trim();

      if (!cleanName || cleanName.length < 2) {
        return { success: false, error: 'Please enter your full name (at least 2 characters).' };
      }

      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        return { success: false, error: 'Please enter a valid email address.' };
      }

      if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email address already exists. Please sign in.' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPassword(password, salt);
      const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : 'usr_' + Date.now();

      const newRecord = {
        id,
        name: cleanName,
        email: cleanEmail,
        salt,
        passwordHash,
        role: 'Guest Member',
        createdAt: new Date().toISOString()
      };

      users.push(newRecord);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const authenticatedUser = {
        id: newRecord.id,
        name: newRecord.name,
        email: newRecord.email,
        role: newRecord.role,
        createdAt: newRecord.createdAt
      };

      setUser(authenticatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authenticatedUser));
      return { success: true };
    } catch (err) {
      console.error('Registration error in restaurant-10:', err);
      return { success: false, error: 'Failed to create account. Please try again.' };
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
