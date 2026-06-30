'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, logout as logoutUser, User, AuthState } from '@/lib/auth';

interface AuthContextType extends AuthState {
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshUser = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Fetch from API (cookies sent automatically)
    const user = await getCurrentUser();
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    await logoutUser();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
