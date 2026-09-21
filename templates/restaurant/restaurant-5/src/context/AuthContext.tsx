import React, { createContext, useContext, useState, useEffect } from 'react';

export interface NoireUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  token?: string;
}

interface StoredNoireUser extends NoireUser {
  passwordHash: string;
  salt: string;
}

interface AuthContextType {
  user: NoireUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getDemoUsers: () => Array<{ name: string; email: string; pass: string; role: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USERS_KEY = 'noire_restaurant5_users_db';
const LOCAL_STORAGE_SESSION_KEY = 'noire_restaurant5_current_user';
const SECURITY_PEPPER = 'noire_restaurant5_nocturnal_pepper_2026';

// Client-side SHA-256 password hashing with salt and pepper
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${password}:${salt}:${SECURITY_PEPPER}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

const DEMO_ACCOUNTS = [
  {
    id: 'n5a1b2c3-d4e5-6789-0123-abcdef456789',
    name: 'Chef Arjun Rao',
    email: 'arjun.rao@noire.example',
    pass: 'Noire@123',
    role: 'Founder & Head Chef',
    createdAt: '2026-01-01T00:00:00Z',
    salt: '8f9e0a1b2c3d4e5f'
  },
  {
    id: 'n5b2c3d4-e5f6-7890-1234-bcdefa567890',
    name: 'Maya Krishnan',
    email: 'maya.patron@example.com',
    pass: 'Supper@123',
    role: 'Black Card Patron',
    createdAt: '2026-02-15T00:00:00Z',
    salt: '3b4c5d6e7f8a9b0c'
  },
  {
    id: 'n5c3d4e5-f6a7-8901-2345-cdefab678901',
    name: 'Kabir Mehta',
    email: 'kabir.blackcard@example.com',
    pass: 'Charcoal@123',
    role: 'VIP Nocturnal Member',
    createdAt: '2026-03-10T00:00:00Z',
    salt: '1a2b3c4d5e6f7a8b'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<NoireUser | null>(null);

  // Initialize DB and current session on mount
  useEffect(() => {
    const initializeDb = async () => {
      const storedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      let usersDb: StoredNoireUser[] = [];

      if (storedUsersRaw) {
        try {
          usersDb = JSON.parse(storedUsersRaw);
        } catch {
          usersDb = [];
        }
      }

      // Seed demo accounts if empty or missing
      let hasChanges = false;
      for (const demo of DEMO_ACCOUNTS) {
        if (!usersDb.some((u) => u.email.toLowerCase() === demo.email.toLowerCase())) {
          const passHash = await hashPassword(demo.pass, demo.salt);
          usersDb.push({
            id: demo.id,
            name: demo.name,
            email: demo.email,
            role: demo.role,
            createdAt: demo.createdAt,
            passwordHash: passHash,
            salt: demo.salt
          });
          hasChanges = true;
        }
      }

      if (hasChanges || !storedUsersRaw) {
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(usersDb));
      }

      // Check current session
      const currentSessionRaw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
      if (currentSessionRaw) {
        try {
          const parsedSession = JSON.parse(currentSessionRaw);
          setUser(parsedSession);
        } catch {
          localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
        }
      }
    };

    initializeDb();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const storedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    const users: StoredNoireUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

    const foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!foundUser) {
      return { success: false, error: 'No NOIRÉ member account found with this email address.' };
    }

    const calculatedHash = await hashPassword(pass, foundUser.salt);
    if (calculatedHash !== foundUser.passwordHash) {
      return { success: false, error: 'Invalid password. Please check your credentials and try again.' };
    }

    const activeUser: NoireUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      createdAt: foundUser.createdAt,
      token: `noire_session_${Date.now()}`
    };

    setUser(activeUser);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(activeUser));
    return { success: true };
  };

  const register = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !pass) {
      return { success: false, error: 'All fields are required.' };
    }

    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const storedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    const users: StoredNoireUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'A NOIRÉ member account already exists with this email address.' };
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(pass, salt);

    const newUser: StoredNoireUser = {
      id: `n5_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: cleanName,
      email: cleanEmail,
      role: 'Black Card Patron',
      createdAt: new Date().toISOString(),
      passwordHash,
      salt
    };

    users.push(newUser);
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));

    const activeUser: NoireUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      token: `noire_session_${Date.now()}`
    };

    setUser(activeUser);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(activeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
  };

  const getDemoUsers = () => {
    return DEMO_ACCOUNTS.map((d) => ({
      name: d.name,
      email: d.email,
      pass: d.pass,
      role: d.role
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
