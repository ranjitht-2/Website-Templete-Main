import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

interface StoredUserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'ember_house_restaurant1_users_db';
const CURRENT_USER_KEY = 'ember_house_restaurant1_current_user';

// Helper function to securely hash passwords using Web Crypto API SHA-256
async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'ember_house_secret_pepper_2026');
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate random cryptographic salt
function generateSalt(): string {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial seed users (PostgreSQL matching demo users)
const SEED_USERS = [
  {
    id: 'd0123456-789a-bcde-f012-3456789abcde',
    name: 'Kavita Swaminathan',
    email: 'kavita@example.com',
    salt: '5e6f7a8b9c0d1e2f',
    passwordHash: '',
    role: 'Editorial VIP',
    createdAt: new Date().toISOString()
  },
  {
    id: 'c9876543-21ba-dcfe-0987-654321fedcba',
    name: 'Rohan Roy',
    email: 'rohan@example.com',
    salt: '2a3b4c5d6e7f8a9b',
    passwordHash: '',
    role: 'Patron Member',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and seed simulated database in localStorage if not present
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsersRaw) {
          const initializedSeedUsers: StoredUserRecord[] = [];
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
        console.error('Failed to initialize auth state in restaurant-1:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users: StoredUserRecord[] = usersRaw ? JSON.parse(usersRaw) : [];

      const userRecord = users.find(u => u.email.toLowerCase() === cleanEmail);
      if (!userRecord) {
        return { success: false, error: 'No member account found with this email address. Please register.' };
      }

      const inputHash = await hashPassword(password, userRecord.salt);
      if (inputHash !== userRecord.passwordHash) {
        return { success: false, error: 'Incorrect password. Please verify your credentials and try again.' };
      }

      const authenticatedUser: User = {
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
      console.error('Login error in restaurant-1:', err);
      return { success: false, error: 'An unexpected authentication error occurred. Please try again.' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim();

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
      const users: StoredUserRecord[] = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email address already exists. Please sign in.' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPassword(password, salt);
      const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : 'usr_' + Date.now();

      const newRecord: StoredUserRecord = {
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

      const authenticatedUser: User = {
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
      console.error('Registration error in restaurant-1:', err);
      return { success: false, error: 'Failed to create member account. Please try again.' };
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
