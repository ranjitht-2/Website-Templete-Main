import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const USERS_STORAGE_KEY = 'ember_house_restaurant4_users_db';
const CURRENT_USER_KEY = 'ember_house_restaurant4_current_user';

// Helper function to securely hash passwords using Web Crypto API SHA-256 with salt and pepper
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'ember_house_restaurant4_botanical_pepper_2026');
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
    id: 'e4a1b2c3-d4e5-6789-0123-abcdef456789',
    name: 'Maya Krishnan',
    email: 'maya.krishnan@emberhouse.example',
    salt: '9a8b7c6d5e4f3a2b',
    passwordHash: '',
    role: 'Executive Chef & Founder',
    createdAt: new Date().toISOString()
  },
  {
    id: 'e4b2c3d4-e5f6-7890-1234-bcdefa567890',
    name: 'Arjun Raghavan',
    email: 'arjun.raghavan@example.com',
    salt: '4e5f6a7b8c9d0e1f',
    passwordHash: '',
    role: 'Botanical Club Patron',
    createdAt: new Date().toISOString()
  },
  {
    id: 'e4c3d4e5-f6a7-8901-2345-cdefab678901',
    name: 'Divya Balaji',
    email: 'divya.balaji@example.com',
    salt: '7b8c9d0e1f2a3b4c',
    passwordHash: '',
    role: 'Conservatory Table Member',
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
            let initialPassword = 'Garden@123';
            if (seed.email.includes('maya')) initialPassword = 'Ember@123';
            if (seed.email.includes('divya')) initialPassword = 'Botanical@123';
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
        console.error('Failed to initialize auth state in restaurant-4:', err);
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
        return { success: false, error: 'No patron account found with this email. Please register or use a demo account.' };
      }

      const inputHash = await hashPassword(password, userRecord.salt);
      if (inputHash !== userRecord.passwordHash) {
        return { success: false, error: 'Incorrect password. Please verify your credentials.' };
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
        role: 'Botanical Table Member',
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
      return { success: false, error: 'An unexpected error occurred during registration.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const getDemoUsers = () => [
    { name: 'Maya Krishnan', email: 'maya.krishnan@emberhouse.example', role: 'Executive Chef', pass: 'Ember@123' },
    { name: 'Arjun Raghavan', email: 'arjun.raghavan@example.com', role: 'Club Patron', pass: 'Garden@123' },
    { name: 'Divya Balaji', email: 'divya.balaji@example.com', role: 'Conservatory VIP', pass: 'Botanical@123' }
  ];

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        getDemoUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider for Ember House restaurant-4.');
  }
  return context;
};
