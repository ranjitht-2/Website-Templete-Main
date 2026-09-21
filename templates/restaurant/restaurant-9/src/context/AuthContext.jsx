import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const USERS_STORAGE_KEY = 'royal_tandoor_restaurant9_users_db';
const CURRENT_USER_KEY = 'royal_tandoor_restaurant9_current_user';

// Helper function to securely hash passwords using Web Crypto API SHA-256
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'royal_tandoor_mughlai_secret_pepper_2026');
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
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@example.com',
    salt: '9a8b7c6d5e4f3a21',
    passwordHash: '',
    role: 'VIP Royal Patron',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    name: 'Ananya Kapoor',
    email: 'ananya.kapoor@example.com',
    salt: '1a2b3c4d5e6f7a8b',
    passwordHash: '',
    role: 'Royal Club Member',
    createdAt: new Date().toISOString()
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    name: 'Chef Arjun Mehta',
    email: 'arjun@royaltandoor.example',
    salt: '4f5e6d7c8b9a0f1e',
    passwordHash: '',
    role: 'Executive Chef & Tandoor Master',
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
            const hash = await hashPassword('RoyalPass123!', seed.salt);
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
        console.error('Failed to initialize auth state in restaurant-9:', err);
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
        return { success: false, error: 'No royal patron account found with this email address. Please register.' };
      }

      const inputHash = await hashPassword(password, userRecord.salt);
      if (inputHash !== userRecord.passwordHash) {
        return { success: false, error: 'Incorrect password. Please verify your royal credentials and try again.' };
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
        return { success: false, error: 'All fields are required.' };
      }

      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account is already registered with this email address.' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPassword(password, salt);

      const newUser = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'usr_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        salt: salt,
        passwordHash: passwordHash,
        role: 'Royal Patron',
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
      return { success: false, error: 'Failed to create your Royal Tandoor account.' };
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
    throw new Error('useAuth must be used within an AuthProvider in restaurant-9');
  }
  return context;
};
