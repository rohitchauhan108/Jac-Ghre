/**
 * Auth API Service
 * Handles all backend API calls for authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const TOKEN_KEY = 'ghre_auth_token';

export const getToken = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(TOKEN_KEY) || '';
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
};

const authFetch = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Request failed: ${response.status}`);
    (error as any).status = response.status;
    (error as any).data = data;
    throw error;
  }
  return data;
};

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  joinedDate: string;
}

export interface LoginResponse {
  token: string;
  user: PublicUser;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return authFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface RegisterResponse {
  verificationRequired: boolean;
  email: string;
  message: string;
}

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  return authFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const verifyRegistration = async (email: string, otp: string): Promise<LoginResponse> => {
  return authFetch('/auth/register/verify', {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  });
};

export const resendRegistrationCode = async (email: string): Promise<{ message: string }> => {
  return authFetch('/auth/register/resend', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
  return authFetch('/auth/password-reset/request', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (email: string, otp: string, password: string): Promise<{ message: string }> => {
  return authFetch('/auth/password-reset/confirm', {
    method: 'POST',
    body: JSON.stringify({ email, otp, password }),
  });
};

export const getMe = async (): Promise<{ user: PublicUser }> => {
  return authFetch('/auth/me', {
    method: 'GET',
  });
};

export const updateProfile = async (payload: Partial<Omit<PublicUser, 'id' | 'email' | 'joinedDate'>>): Promise<{ user: PublicUser }> => {
  return authFetch('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export interface OrderItem {
  productId: string;
  name: string;
  weight: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  customer: {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

export const getMyOrders = async (): Promise<{ orders: Order[] }> => {
  return authFetch('/orders/mine', {
    method: 'GET',
  });
};

export const logout = (): void => {
  clearToken();
};
