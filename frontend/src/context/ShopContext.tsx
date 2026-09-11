'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  updateQuantityAPI,
  clearCartAPI,
  getUserId,
} from '../services/cartAPI';

export interface CartItem {
  _id?: string; // MongoDB ID from backend
  product: Product;
  quantity: number;
  selectedSize: string;
  ProductId?: string; // Backend product ID
}

export type PageType =
  | 'home'
  | 'shop'
  | 'about-founder'
  | 'about-company'
  | 'artist'
  | 'contact'
  | 'jac-ghre'
  | 'hair-care'
  | 'sun-body'
  | 'fragrance'
  | 'journal'
  | 'gallery';
export type ThemeMode = 'dark' | 'light';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isWelcomePopupOpen: boolean;
  quickViewProduct: Product | null;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  navigateToPage: (page: PageType, categoryFilter?: string) => void;
  shopCategoryFilter: string;
  setShopCategoryFilter: (category: string) => void;
  currency: string;
  currencySymbol: string;
  currencyRate: number;
  setCurrency: (c: string) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsWelcomePopupOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
  syncCart: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const pathnameToPageType = (pathname: string): PageType => {
  switch (pathname) {
    case '/shop':
      return 'shop';
    case '/hair-care':
      return 'hair-care';
    case '/sun-body':
      return 'sun-body';
    case '/fragrance':
      return 'fragrance';
    case '/jac-ghre':
    case '/about-founder':
      return 'jac-ghre';
    case '/about-company':
      return 'about-company';
    case '/artist':
      return 'artist';
    case '/contact':
      return 'contact';
    case '/journal':
      return 'journal';
    case '/gallery':
      return 'gallery';
    case '/':
    default:
      return 'home';
  }
};

const pageTypeToPath = (page: PageType): string => {
  switch (page) {
    case 'home':
      return '/';
    case 'shop':
      return '/shop';
    case 'hair-care':
      return '/hair-care';
    case 'sun-body':
      return '/sun-body';
    case 'fragrance':
      return '/fragrance';
    case 'jac-ghre':
    case 'about-founder':
      return '/jac-ghre';
    case 'about-company':
      return '/about-company';
    case 'artist':
      return '/artist';
    case 'contact':
      return '/contact';
    case 'journal':
      return '/journal';
    case 'gallery':
      return '/gallery';
    default:
      return '/';
  }
};

const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const cartSyncTimeoutRef = useRef<NodeJS.Timeout>();

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghre_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return ['repair-shampoo', 'blossom-positano-edp'];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Settings state
  const [currency, setCurrencyState] = useState('USD');
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('all');

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghre_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Update current page based on pathname
  useEffect(() => {
    setCurrentPage(pathnameToPageType(pathname ?? '/'));
  }, [pathname]);

  // Initialize userId and sync cart from backend on mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        setIsLoading(true);
        // Get userId (creates one if doesn't exist)
        const userId = getUserId();
        console.log('[ShopContext] User ID:', userId);

        // Try to sync with backend
        try {
          const backendCart = await getCartAPI();
          if (backendCart.data && backendCart.data.length > 0) {
            // Convert backend cart to frontend format
            const convertedCart: CartItem[] = backendCart.data.map((item: any) => {
              const product = findProduct(item.ProductId);
              return {
                _id: item._id,
                ProductId: item.ProductId,
                product,
                quantity: item.product_quantity,
                selectedSize: product.size,
              };
            });
            setCart(convertedCart);
            console.log('[ShopContext] Synced cart from backend:', convertedCart);
          } else {
            // Load from localStorage if backend is empty
            const saved = localStorage.getItem('ghre_cart');
            if (saved) {
              try {
                setCart(JSON.parse(saved));
              } catch {
                setCart([]);
              }
            }
          }
        } catch (error) {
          console.warn('[ShopContext] Failed to sync with backend, using localStorage:', error);
          // Fallback to localStorage
          const saved = localStorage.getItem('ghre_cart');
          if (saved) {
            try {
              setCart(JSON.parse(saved));
            } catch {
              setCart([]);
            }
          }
        }
      } finally {
        setIsLoading(false);
        setCartHydrated(true);
      }
    };

    initializeCart();
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (cartHydrated) {
      localStorage.setItem('ghre_cart', JSON.stringify(cart));
    }
  }, [cart, cartHydrated]);

  // Persist wishlist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghre_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Handle theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ghre_theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      } else {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      }
    }
  }, [theme]);

  // Sync cart function
  const syncCart = useCallback(async () => {
    try {
      const backendCart = await getCartAPI();
      if (backendCart.data) {
        const convertedCart: CartItem[] = backendCart.data.map((item: any) => {
          const product = findProduct(item.ProductId);
          return {
            _id: item._id,
            ProductId: item.ProductId,
            product,
            quantity: item.product_quantity,
            selectedSize: product.size,
          };
        });
        setCart(convertedCart);
        console.log('[ShopContext] Cart synced:', convertedCart);
      }
    } catch (error) {
      console.error('[ShopContext] Failed to sync cart:', error);
    }
  }, []);

  // Theme functions
  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  // Navigation function
  const navigateToPage = useCallback(
    (page: PageType, categoryFilter?: string) => {
      const path = pageTypeToPath(page);
      setCurrentPage(page);
      if (categoryFilter !== undefined) {
        setShopCategoryFilter(categoryFilter);
      }
      router.push(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router]
  );

  // Currency functions
  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      default:
        return '$';
    }
  };

  const getCurrencyRate = (curr: string) => {
    switch (curr) {
      case 'EUR':
        return 0.92;
      case 'GBP':
        return 0.79;
      default:
        return 1.0;
    }
  };

  const setCurrency = (c: string) => {
    setCurrencyState(c);
  };

  // Cart operations
  const addToCart = useCallback(async (product: Product, quantity = 1) => {
    try {
      setIsLoading(true);

      console.log('[ShopContext] addToCart called for:', product.id);

      // Optimistically update local state
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          console.log('[ShopContext] Product already in cart, incrementing quantity');
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        console.log('[ShopContext] Adding new product to cart');
        return [
          ...prev,
          { product, quantity, selectedSize: product.size },
        ];
      });

      setIsCartOpen(true);

      // Send to backend
      const response = await addToCartAPI({
        ProductId: product.id,
        product_name: product.name,
        product_price: product.price,
        product_quantity: quantity,
        product_image: product.image,
      });

      console.log('[ShopContext] Backend response:', response);

      // Sync entire cart from backend to ensure consistency
      if (response.success) {
        await syncCart();
      }

      console.log('[ShopContext] Product added to cart:', product.id);
    } catch (error) {
      console.error('[ShopContext] Error adding to cart:', error);
      // Rollback optimistic update on error
      await syncCart();
    } finally {
      setIsLoading(false);
    }
  }, [syncCart]);

  const removeFromCart = useCallback(
    async (productId: string) => {
      try {
        setIsLoading(true);

        // Find the backend item ID
        const cartItem = cart.find((item) => item.product.id === productId);
        if (!cartItem?._id) {
          // If no backend ID, just remove from local state
          setCart((prev) => prev.filter((item) => item.product.id !== productId));
          return;
        }

        // Optimistically update local state
        setCart((prev) => prev.filter((item) => item.product.id !== productId));

        // Remove from backend
        await removeFromCartAPI(cartItem._id);

        console.log('[ShopContext] Product removed from cart:', productId);
      } catch (error) {
        console.error('[ShopContext] Error removing from cart:', error);
        // Rollback optimistic update on error
        await syncCart();
      } finally {
        setIsLoading(false);
      }
    },
    [cart, syncCart]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      try {
        if (quantity <= 0) {
          await removeFromCart(productId);
          return;
        }

        setIsLoading(true);

        // Find the backend item ID
        const cartItem = cart.find((item) => item.product.id === productId);
        if (!cartItem?._id) {
          // If no backend ID, just update local state
          setCart((prev) =>
            prev.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            )
          );
          return;
        }

        // Optimistically update local state
        setCart((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );

        // Update backend
        await updateQuantityAPI(cartItem._id, quantity);

        console.log('[ShopContext] Quantity updated:', productId, quantity);
      } catch (error) {
        console.error('[ShopContext] Error updating quantity:', error);
        // Rollback optimistic update on error
        await syncCart();
      } finally {
        setIsLoading(false);
      }
    },
    [cart, removeFromCart, syncCart]
  );

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Calculations
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isWelcomePopupOpen,
        quickViewProduct,
        currentPage,
        setCurrentPage,
        navigateToPage,
        shopCategoryFilter,
        setShopCategoryFilter,
        currency,
        currencySymbol: getCurrencySymbol(currency),
        currencyRate: getCurrencyRate(currency),
        setCurrency,
        theme,
        toggleTheme,
        setTheme,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsWelcomePopupOpen,
        setQuickViewProduct,
        cartTotal,
        cartCount,
        isLoading,
        syncCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
