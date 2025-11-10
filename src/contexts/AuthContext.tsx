import React, { createContext, useContext, useState, useEffect } from 'react';
import { validatePassword } from '../utils/validation';

type UserType = 'farmer' | 'broker' | null;

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: UserType;
  location?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  login: (email: string, password: string, type: UserType) => Promise<boolean>;
  register: (userData: Partial<User>, password: string, type: UserType) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  
  // On initial load, check for stored user info
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setUserType(parsedUser.type);
    }
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Skip password validation for Google auth
      const isGoogleAuth = password === 'google-auth-token';
      
      if (!isGoogleAuth) {
        // Validate password strength for regular login
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          return false;
        }
      }
      
      // Mock validation - in a real app this would be handled by a server
      if (email && password) {
        // For Google auth, check if Firebase user info exists and use it
        let userName = email.split('@')[0];
        if (isGoogleAuth) {
          const firebaseUser = localStorage.getItem('firebaseUser');
          if (firebaseUser) {
            const parsedFirebaseUser = JSON.parse(firebaseUser);
            userName = parsedFirebaseUser.displayName || userName;
          }
        }
        
        const user: User = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          name: userName,
          email,
          type,
          location: type === 'farmer' ? 'Punjab, India' : 'Mumbai, India'
        };
        
        setCurrentUser(user);
        setUserType(type);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Mock register function
  const register = async (userData: Partial<User>, password: string, type: UserType): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Skip password validation for Google auth
      const isGoogleAuth = password === 'google-auth-token';
      
      if (!isGoogleAuth) {
        // Validate password strength for regular registration
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          return false;
        }
      }
      
      if (userData.email && password) {
        // For Google auth, get display name from Firebase user info
        let userName = userData.name || userData.email.split('@')[0];
        if (isGoogleAuth) {
          const firebaseUser = localStorage.getItem('firebaseUser');
          if (firebaseUser) {
            const parsedFirebaseUser = JSON.parse(firebaseUser);
            userName = parsedFirebaseUser.displayName || userName;
          }
        }
        
        const user: User = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          name: userName,
          email: userData.email,
          phone: userData.phone,
          type,
          location: userData.location || (type === 'farmer' ? 'Punjab, India' : 'Mumbai, India')
        };
        
        setCurrentUser(user);
        setUserType(type);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userType,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};