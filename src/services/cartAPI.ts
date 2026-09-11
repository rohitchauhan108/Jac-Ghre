/**
 * Cart API Service
 * Handles all backend API calls for cart operations
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Global userId variable to ensure consistency
let globalUserId: string = '';

// Get or create a unique userId for this user
export const getUserId = (): string => {
  if (typeof window === 'undefined') return '';

  // Return global if already set in this session
  if (globalUserId) {
    return globalUserId;
  }

  // Try to get from localStorage
  const existingUserId = localStorage.getItem('ghre_user_id');
  if (existingUserId) {
    globalUserId = existingUserId;
    console.log('[CartAPI] Using existing userId from localStorage:', globalUserId);
    return globalUserId;
  }

  // Create new userId
  const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('ghre_user_id', newUserId);
  globalUserId = newUserId;
  console.log('[CartAPI] Created new userId:', newUserId);
  return newUserId;
};

// Function to reset global userId (useful for logout)
export const resetUserId = (): void => {
  globalUserId = '';
  localStorage.removeItem('ghre_user_id');
  console.log('[CartAPI] UserId reset');
};

// Add product to cart
export const addToCartAPI = async (productData: {
  ProductId: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
  product_image?: string;
}) => {
  try {
    const userId = getUserId();
    console.log('[CartAPI] addToCartAPI called with userId:', userId, 'ProductId:', productData.ProductId);
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId,
      },
      body: JSON.stringify({
        userId,  // Important: include userId in body
        ...productData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add to cart: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Product added to cart:', data);
    return data;
  } catch (error) {
    console.error('[API] Error adding to cart:', error);
    throw error;
  }
};

// Get all cart items
export const getCartAPI = async () => {
  try {
    const userId = getUserId();
    console.log('[CartAPI] getCartAPI called with userId:', userId);
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Cart retrieved:', data);
    return data;
  } catch (error) {
    console.error('[API] Error fetching cart:', error);
    throw error;
  }
};

// Get cart summary
export const getCartSummaryAPI = async () => {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/cart/summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cart summary: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Cart summary retrieved:', data);
    return data;
  } catch (error) {
    console.error('[API] Error fetching cart summary:', error);
    throw error;
  }
};

// Update product quantity
export const updateQuantityAPI = async (cartItemId: string, quantity: number) => {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update quantity: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Quantity updated:', data);
    return data;
  } catch (error) {
    console.error('[API] Error updating quantity:', error);
    throw error;
  }
};

// Remove product from cart
export const removeFromCartAPI = async (cartItemId: string) => {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to remove from cart: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Item removed from cart:', data);
    return data;
  } catch (error) {
    console.error('[API] Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCartAPI = async () => {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to clear cart: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[API] Cart cleared:', data);
    return data;
  } catch (error) {
    console.error('[API] Error clearing cart:', error);
    throw error;
  }
};
