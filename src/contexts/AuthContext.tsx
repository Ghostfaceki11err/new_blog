'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'zemenay_auth';

const getAuthFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading auth from localStorage:', error);
    return null;
  }
};

const saveAuthToStorage = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  try {
    if (user) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error saving auth to localStorage:', error);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getAuthFromStorage();
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (email === 'admin@zemenay.com' && password === 'admin123') {
        const user: User = { id: '1', email, name: 'Admin User' };
        setUser(user);
        saveAuthToStorage(user);
        return { success: true };
      }
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'An error occurred during sign in' };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const user: User = { id: Date.now().toString(), email, name: name || 'User' };
      setUser(user);
      saveAuthToStorage(user);
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'An error occurred during sign up' };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      saveAuthToStorage(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value: AuthContextType = { user, loading, signIn, signOut, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}


