import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../lib/api';
import { IUser, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      restoreSession(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const restoreSession = async (token: string) => {
    try {
      const response = await authApi.getMe();
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<string> => {
    const response = await authApi.login({ email, password });
    if (response.data.success) {
      const { user: userData, token: userToken } = response.data.data;
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('token', userToken);
      return userData.subscription_status || 'inactive';
    }
    throw new Error(response.data.message || 'Login failed');
  };

  const register = async (data: any) => {
    const response = await authApi.register(data);
    if (response.data.success) {
      const { user: userData, token: userToken } = response.data.data;
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('token', userToken);
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
