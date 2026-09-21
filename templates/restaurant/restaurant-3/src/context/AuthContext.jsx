import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DB_KEY = 'lumiere_restaurant3_users_db';
const USER_KEY = 'lumiere_restaurant3_current_user';
const SALT_PEPPER = 'lumiere_coastal_salt_v3_2026';

// Cryptographic hash using Web Crypto API SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT_PEPPER);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial pre-seeded demo patrons for Lumière Coastal Dining
const SEED_USERS = [
  {
    id: 'lumiere_usr_001',
    name: 'Antoine Dupont',
    email: 'antoine@lumierechennai.com',
    passwordHash: '8b8f2d5e9c1a3b7f4e6d8a0c2b4e6f8a0c2b4e6f8a0c2b4e6f8a0c2b4e6f8a0c', // SlowSummers#2026
    rawSeedPass: 'SlowSummers#2026',
    role: 'Chef & Founder',
    phone: '+91 44 8765 4321',
    createdAt: '2026-01-15T12:00:00.000Z'
  },
  {
    id: 'lumiere_usr_002',
    name: 'Maya Sundaram',
    email: 'maya.sundaram@coastalharvest.in',
    passwordHash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0', // SeabassTasting#2026
    rawSeedPass: 'SeabassTasting#2026',
    role: 'Gourmet Patron',
    phone: '+91 98401 23456',
    createdAt: '2026-02-10T14:30:00.000Z'
  },
  {
    id: 'lumiere_usr_003',
    name: 'Julian Vance',
    email: 'julian.vance@sommelierguild.org',
    passwordHash: 'f0e1d2c3b4a5968778695a4b3c2d1e0ff0e1d2c3b4a5968778695a4b3c2d1e0f', // CellarVintage#2026
    rawSeedPass: 'CellarVintage#2026',
    role: 'Sommelier Patron',
    phone: '+91 97910 87654',
    createdAt: '2026-03-01T18:45:00.000Z'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize DB and compute hashes for seeds if not existing
  useEffect(() => {
    async function initDB() {
      try {
        const storedUsers = localStorage.getItem(DB_KEY);
        if (!storedUsers) {
          const seededWithHashes = await Promise.all(
            SEED_USERS.map(async (u) => ({
              id: u.id,
              name: u.name,
              email: u.email.toLowerCase(),
              passwordHash: await hashPassword(u.rawSeedPass),
              role: u.role,
              phone: u.phone,
              createdAt: u.createdAt,
              updatedAt: u.createdAt
            }))
          );
          localStorage.setItem(DB_KEY, JSON.stringify(seededWithHashes));
        }

        const storedCurrentUser = localStorage.getItem(USER_KEY);
        if (storedCurrentUser) {
          setUser(JSON.parse(storedCurrentUser));
        }
      } catch (err) {
        console.error('Error initializing Lumière auth DB:', err);
      } finally {
        setLoading(false);
      }
    }

    initDB();
  }, []);

  const getUsersFromStorage = () => {
    try {
      const data = localStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }

    const users = getUsersFromStorage();
    const cleanEmail = email.trim().toLowerCase();
    const hashToMatch = await hashPassword(password);

    const found = users.find(
      u => u.email.toLowerCase() === cleanEmail && u.passwordHash === hashToMatch
    );

    if (!found) {
      throw new Error('Invalid email or password. Please verify your credentials.');
    }

    const userSession = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role || 'Patron',
      phone: found.phone || ''
    };

    setUser(userSession);
    localStorage.setItem(USER_KEY, JSON.stringify(userSession));
    return userSession;
  };

  const register = async ({ name, email, password, role = 'Patron', phone = '' }) => {
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const users = getUsersFromStorage();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email already exists in Lumière registry.');
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    const newUser = {
      id: `lumiere_usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role,
      phone: phone.trim(),
      createdAt: now,
      updatedAt: now
    };

    users.push(newUser);
    localStorage.setItem(DB_KEY, JSON.stringify(users));

    const userSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone
    };

    setUser(userSession);
    localStorage.setItem(USER_KEY, JSON.stringify(userSession));
    return userSession;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        demoPatrons: [
          {
            name: 'Antoine Dupont',
            role: 'Chef & Founder',
            email: 'antoine@lumierechennai.com',
            pass: 'SlowSummers#2026'
          },
          {
            name: 'Maya Sundaram',
            role: 'Gourmet Patron',
            email: 'maya.sundaram@coastalharvest.in',
            pass: 'SeabassTasting#2026'
          },
          {
            name: 'Julian Vance',
            role: 'Sommelier Patron',
            email: 'julian.vance@sommelierguild.org',
            pass: 'CellarVintage#2026'
          }
        ]
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider for Lumière restaurant-3.');
  }
  return context;
}
