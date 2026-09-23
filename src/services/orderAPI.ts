const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const TOKEN_KEY = 'ghre_auth_token';

const getAuthToken = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(TOKEN_KEY) || '';
};

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export interface OrderItemPayload {
  productId: string;
  weight: string;
  quantity: number;
}

export interface CustomerPayload {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

export interface CreateOrderPayload {
  items: OrderItemPayload[];
  customer: CustomerPayload;
  paymentMethod: PaymentMethod;
}

export interface OrderSummary {
  orderId: string;
  _id: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentStatus: string;
  estimatedDelivery: string;
  [key: string]: any;
}

export interface CreateOrderResponse {
  order: OrderSummary;
  payment: { redirectUrl: string } | null;
}

export const createOrder = async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Order failed: ${response.status}`);
    (error as any).status = response.status;
    (error as any).data = data;
    throw error;
  }
  return data;
};

export const getOrder = async (orderId: string): Promise<{ order: OrderSummary }> => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Failed to fetch order: ${response.status}`);
    throw error;
  }
  return data;
};
