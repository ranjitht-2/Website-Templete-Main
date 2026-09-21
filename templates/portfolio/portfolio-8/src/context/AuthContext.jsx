import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const USERS_STORAGE_KEY = 'evelynoswald_portfolio8_users_db';
const CURRENT_USER_KEY = 'evelynoswald_portfolio8_current_user';
const SAVED_PACKAGES_KEY = 'evelynoswald_portfolio8_saved_packages';
const BOOKINGS_KEY = 'evelynoswald_portfolio8_bookings';

// Web Crypto API SHA-256 password hashing with salt
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'evelyn_oswald_portfolio8_secret_2026');
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt() {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial seed users matching PostgreSQL seed data
const SEED_USERS = [
  {
    id: 'a8080808-1111-2222-3333-444444444444',
    name: 'Sophia Vance',
    email: 'sophia@vesperlabs.com',
    salt: 's8s8s8s8s8s8s8s8',
    passwordHash: '',
    role: 'VP of Operations',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b8080808-2222-3333-4444-555555555555',
    name: 'Harrison Sterling',
    email: 'harrison@sterlingcap.com',
    salt: 'h8h8h8h8h8h8h8h8',
    passwordHash: '',
    role: 'Managing Director',
    createdAt: new Date().toISOString()
  },
  {
    id: 'c8080808-3333-4444-5555-666666666666',
    name: 'Evelyn Oswald',
    email: 'evelyn@oswald.support',
    salt: 'e8e8e8e8e8e8e8e8',
    passwordHash: '',
    role: 'Executive Operations Lead',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedPackages, setSavedPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and seed local database
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsersRaw) {
          const initializedSeedUsers = [];
          for (const seed of SEED_USERS) {
            let initialPassword = 'EvelynOswald2026!';
            if (seed.email.includes('evelyn@oswald.support')) {
              initialPassword = 'EvelynExecutive2026!';
            }
            const hash = await hashPassword(initialPassword, seed.salt);
            initializedSeedUsers.push({
              ...seed,
              passwordHash: hash
            });
          }
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initializedSeedUsers));
        }

        // Load active user
        const currentUserRaw = localStorage.getItem(CURRENT_USER_KEY);
        if (currentUserRaw) {
          const parsedUser = JSON.parse(currentUserRaw);
          setUser(parsedUser);
        }

        // Load saved packages
        const storedSavedRaw = localStorage.getItem(SAVED_PACKAGES_KEY);
        if (storedSavedRaw) {
          setSavedPackages(JSON.parse(storedSavedRaw));
        } else {
          // Pre-seed demo bookmarks
          const initialSaved = ['Executive Partner', 'Corporate Anchor'];
          setSavedPackages(initialSaved);
          localStorage.setItem(SAVED_PACKAGES_KEY, JSON.stringify(initialSaved));
        }

        // Load bookings
        const storedBookingsRaw = localStorage.getItem(BOOKINGS_KEY);
        if (storedBookingsRaw) {
          setBookings(JSON.parse(storedBookingsRaw));
        }
      } catch (err) {
        console.error('Failed to initialize auth in portfolio-8:', err);
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
        return { success: false, error: 'No corporate client found with this email. Please check your credentials or create an account.' };
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
        return { success: false, error: 'Please provide your full name, business email, and password.' };
      }

      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'A client account with this email address already exists.' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPassword(password, salt);

      const newUser = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'eo_p8_usr_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        salt: salt,
        passwordHash: passwordHash,
        role: 'Corporate Client',
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
      return { success: false, error: 'Failed to create your corporate client account.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const toggleSavePackage = (packageName) => {
    if (!packageName) return;
    const exists = savedPackages.includes(packageName);
    let updated;
    if (exists) {
      updated = savedPackages.filter(p => p !== packageName);
    } else {
      updated = [...savedPackages, packageName];
    }
    setSavedPackages(updated);
    localStorage.setItem(SAVED_PACKAGES_KEY, JSON.stringify(updated));
  };

  const isPackageSaved = (packageName) => {
    return savedPackages.includes(packageName);
  };

  const createBooking = (bookingData) => {
    const newBooking = {
      id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'book_' + Date.now(),
      userId: user?.id,
      clientName: user?.name,
      clientEmail: user?.email,
      selectedTier: bookingData.selectedTier || 'Executive Partner ($2,800/mo)',
      systemRequirements: bookingData.systemRequirements,
      status: 'ONBOARDING_SCHEDULED',
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
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
        savedPackages,
        toggleSavePackage,
        isPackageSaved,
        bookings,
        createBooking
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider in portfolio-8');
  }
  return context;
};
