'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  login as loginAPI,
  register as registerAPI,
  verifyRegistration as verifyRegistrationAPI,
  resendRegistrationCode as resendRegistrationCodeAPI,
  requestPasswordReset as requestPasswordResetAPI,
  resetPassword as resetPasswordAPI,
  getMe as getMeAPI,
  updateProfile as updateProfileAPI,
  getMyOrders as getMyOrdersAPI,
  setToken as setTokenStorage,
  clearToken,
  getToken,
  PublicUser,
  Order,
  RegisterPayload,
} from '../services/authAPI';
import { resetUserId } from '../services/cartAPI';

interface AuthContextType {
  user: PublicUser | null;
  orders: Order[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isOrdersLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<{ email: string }>;
  verifyRegistration: (email: string, otp: string) => Promise<void>;
  resendRegistrationCode: (email: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  loadOrders: () => Promise<void>;
  updateUserProfile: (payload: Partial<Omit<PublicUser, 'id' | 'email' | 'joinedDate'>>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  const loadUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await getMeAPI();
      setUser(res.user);
    } catch (error) {
      clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    const res = await loginAPI(email, password);
    setTokenStorage(res.token);
    setUser(res.user);
  };

  const register = async (payload: RegisterPayload) => {
    const res = await registerAPI(payload);
    return { email: res.email };
  };

  const verifyRegistration = async (email: string, otp: string) => {
    const res = await verifyRegistrationAPI(email, otp);
    setTokenStorage(res.token);
    setUser(res.user);
  };

  const resendRegistrationCode = async (email: string) => {
    await resendRegistrationCodeAPI(email);
  };

  const requestPasswordReset = async (email: string) => {
    await requestPasswordResetAPI(email);
  };

  const resetPassword = async (email: string, otp: string, password: string) => {
    await resetPasswordAPI(email, otp, password);
  };

  const logout = useCallback(() => {
    clearToken();
    resetUserId();
    setUser(null);
    setOrders([]);
  }, []);

  const loadOrders = async () => {
    try {
      setIsOrdersLoading(true);
      const res = await getMyOrdersAPI();
      setOrders(res.orders || []);
    } catch (error) {
      setOrders([]);
    } finally {
      setIsOrdersLoading(false);
    }
  };

  const updateUserProfile = async (payload: Partial<Omit<PublicUser, 'id' | 'email' | 'joinedDate'>>) => {
    const res = await updateProfileAPI(payload);
    setUser(res.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isAuthenticated: Boolean(user),
        isLoading,
        isOrdersLoading,
        login,
        register,
        verifyRegistration,
        resendRegistrationCode,
        requestPasswordReset,
        resetPassword,
        logout,
        loadUser,
        loadOrders,
        updateUserProfile,
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
