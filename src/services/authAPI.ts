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

type RateLimitedError = Error & {
  status: number;
  data?: any;
  retryAfter?: number;
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

  const rawText = await response.text().catch(() => '{}');
  let data: any;
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    const status = response.status;
    const retryAfterRaw = response.headers.get('Retry-After');
    const retryAfter = retryAfterRaw ? Number(retryAfterRaw) : undefined;
    let message = data?.message || `Request failed: ${status}`;
    if (status === 429 && retryAfter && !/seconds/i.test(message)) {
      message = `${message.replace(/\.$/, '')}. Please try again in ${retryAfter} seconds.`;
    }
    const error = new Error(message) as RateLimitedError;
    error.status = status;
    error.data = data;
    if (retryAfter && Number.isFinite(retryAfter)) error.retryAfter = retryAfter;
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
  const data = await authFetch('/orders/mine', {
    method: 'GET',
  });
  if (Array.isArray(data)) return { orders: data };
  if (data && Array.isArray(data.orders)) return { orders: data.orders };
  return { orders: [] };
};

export const logout = (): void => {
  clearToken();
};
