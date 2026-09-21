import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const USERS_STORAGE_KEY = 'clara_portfolio4_users_db';
const CURRENT_USER_KEY = 'clara_portfolio4_current_user';
const INQUIRIES_STORAGE_KEY = 'clara_portfolio4_inquiries_db';

// Securely hash password using Web Crypto SHA-256 with salt and pepper
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'clara_oswald_portfolio4_pepper_2026');
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

// Pre-seeded users matching portfolio_4_auth.sql
const SEED_USERS = [
  {
    id: 'a4040404-1111-2222-3333-444444444444',
    name: 'Sophia Laurent',
    email: 'sophia@atelierdesign.com',
    salt: 'c4c4c4c4c4c4c4c4',
    passwordHash: '',
    role: 'Executive Producer',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b4040404-2222-3333-4444-555555555555',
    name: 'Marcus Vance',
    email: 'marcus.vance@nordicminimal.com',
    salt: 'm4m4m4m4m4m4m4m4',
    passwordHash: '',
    role: 'Head of Product',
    createdAt: new Date().toISOString()
  },
  {
    id: 'c4040404-3333-4444-5555-666666666666',
    name: 'Clara Oswald',
    email: 'clara@oswald.design',
    salt: 'p4p4p4p4p4p4p4p4',
    passwordHash: '',
    role: 'Studio Principal & Lead Designer',
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
            let initialPassword = 'ClaraOswald2026!';
            if (seed.email.includes('clara@oswald.design')) initialPassword = 'ClaraStudioPrincipal2026!';
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
        console.error('Failed to initialize auth state in portfolio-4:', err);
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
        return { success: false, error: 'No client account registered with this email. Please check your credentials or create an account.' };
      }

      const inputHash = await hashPassword(password, userRecord.salt);
      if (inputHash !== userRecord.passwordHash) {
        return { success: false, error: 'Invalid password. Authentication rejected.' };
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
        return { success: false, error: 'Please provide your full name, email, and password.' };
      }

      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email address already exists.' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPassword(password, salt);

      const newUser = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'co_p4_usr_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        salt: salt,
        passwordHash: passwordHash,
        role: 'Design Client',
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
      return { success: false, error: 'Failed to create your design client account.' };
    }
  };

  const submitInquiry = async (inquiryData) => {
    try {
      if (!user) {
        return { success: false, error: 'Authentication required to submit studio inquiries.' };
      }

      const existingRaw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      const inquiries = existingRaw ? JSON.parse(existingRaw) : [];

      const newInquiry = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'inq_' + Date.now(),
        userId: user.id,
        clientName: inquiryData.name || user.name,
        clientEmail: inquiryData.email || user.email,
        subject: inquiryData.subject || 'Design Project Inquiry',
        message: inquiryData.message,
        status: 'SUBMITTED',
        createdAt: new Date().toISOString()
      };

      inquiries.push(newInquiry);
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
      return { success: true, inquiry: newInquiry };
    } catch (err) {
      return { success: false, error: 'Failed to record inquiry.' };
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
        logout,
        submitInquiry
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider in portfolio-4');
  }
  return context;
};
