import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const USERS_STORAGE_KEY = 'aethelgard_portfolio1_users_db';
const CURRENT_USER_KEY = 'aethelgard_portfolio1_current_user';
const SAVED_PROJECTS_KEY = 'aethelgard_portfolio1_saved_projects';
const COMMISSIONS_KEY = 'aethelgard_portfolio1_commissions';

// Secure Web Crypto API SHA-256 hashing with salt
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + 'aethelgard_portfolio1_salt_secret_2026');
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
    id: 'a1010101-1111-2222-3333-444444444444',
    name: 'Elena Rostova',
    email: 'elena.rostova@bauhaus-institute.de',
    salt: 'e1e1e1e1e1e1e1e1',
    passwordHash: '',
    role: 'Lead Urban Planner',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b1010101-2222-3333-4444-555555555555',
    name: 'Marcus Sterling',
    email: 'marcus@sterling-developments.co.uk',
    salt: 'm1m1m1m1m1m1m1m1',
    passwordHash: '',
    role: 'Managing Partner',
    createdAt: new Date().toISOString()
  },
  {
    id: 'c1010101-3333-4444-5555-666666666666',
    name: 'Alistair Thorne',
    email: 'alistair@aethelgard.studio',
    salt: 'p1p1p1p1p1p1p1p1',
    passwordHash: '',
    role: 'Principal Architect',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedProjects, setSavedProjects] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and seed local database
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsersRaw) {
          const initializedSeedUsers = [];
          for (const seed of SEED_USERS) {
            let initialPassword = 'Aethelgard2026!';
            if (seed.email.includes('alistair@aethelgard.studio')) {
              initialPassword = 'AethelgardPrincipal2026!';
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

        // Load saved projects
        const storedSavedRaw = localStorage.getItem(SAVED_PROJECTS_KEY);
        if (storedSavedRaw) {
          setSavedProjects(JSON.parse(storedSavedRaw));
        } else {
          // Pre-seed 2 bookmarks for demo
          const initialSaved = [
            { id: 'res-1', title: 'The Cantilever House', category: 'Residential' },
            { id: 'comm-1', title: 'Aethelgard Highline Tower', category: 'Commercial' }
          ];
          setSavedProjects(initialSaved);
          localStorage.setItem(SAVED_PROJECTS_KEY, JSON.stringify(initialSaved));
        }

        // Load commissions
        const storedCommissionsRaw = localStorage.getItem(COMMISSIONS_KEY);
        if (storedCommissionsRaw) {
          setCommissions(JSON.parse(storedCommissionsRaw));
        }
      } catch (err) {
        console.error('Failed to initialize auth in portfolio-1:', err);
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
        return { success: false, error: 'No client partner found with this email. Please check your credentials or create an account.' };
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
        return { success: false, error: 'Please provide your full name, client email, and password.' };
      }

      const usersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'A client partner account with this email address already exists.' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPassword(password, salt);

      const newUser = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'at_p1_usr_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        salt: salt,
        passwordHash: passwordHash,
        role: 'Client Partner',
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
      return { success: false, error: 'Failed to create your architectural client account.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const toggleSaveProject = (project) => {
    if (!project || !project.id) return;
    const exists = savedProjects.some(p => p.id === project.id);
    let updated;
    if (exists) {
      updated = savedProjects.filter(p => p.id !== project.id);
    } else {
      updated = [...savedProjects, { id: project.id, title: project.title, category: project.category || 'Architecture' }];
    }
    setSavedProjects(updated);
    localStorage.setItem(SAVED_PROJECTS_KEY, JSON.stringify(updated));
  };

  const isProjectSaved = (projectId) => {
    return savedProjects.some(p => p.id === projectId);
  };

  const submitCommission = (commissionData) => {
    const newCommission = {
      id: window.crypto.randomUUID ? window.crypto.randomUUID() : 'comm_' + Date.now(),
      userId: user?.id,
      clientName: user?.name,
      clientEmail: user?.email,
      projectTitle: commissionData.projectTitle,
      projectCategory: commissionData.projectCategory,
      location: commissionData.location,
      estimatedBudget: commissionData.estimatedBudget,
      briefDescription: commissionData.briefDescription,
      status: 'BLUEPRINT_REVIEW',
      createdAt: new Date().toISOString()
    };
    const updated = [newCommission, ...commissions];
    setCommissions(updated);
    localStorage.setItem(COMMISSIONS_KEY, JSON.stringify(updated));
    return newCommission;
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
        savedProjects,
        toggleSaveProject,
        isProjectSaved,
        commissions,
        submitCommission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider in portfolio-1');
  }
  return context;
};
