import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export type PageType = 'home' | 'shop' | 'about-founder' | 'about-company' | 'contact' | 'jac-ghre' | 'hair-care' | 'sun-body' | 'fragrance' | 'journal';
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
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsWelcomePopupOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart with sample items for instant rich preview
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Repair Shampoo
      quantity: 1,
      selectedSize: PRODUCTS[0].size,
    },
    {
      product: PRODUCTS[2], // Prickly Pear Gold Oil
      quantity: 1,
      selectedSize: PRODUCTS[2].size,
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>([
    PRODUCTS[0].id,
    PRODUCTS[6].id, // Blossom Positano EDP
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currency, setCurrencyState] = useState('USD');
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('all');

  // Theme Management (Dark by default, persisted in localStorage)
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ghre_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

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

  // First time popup trigger
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenPopup = sessionStorage.getItem('ghre_welcome_seen');
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsWelcomePopupOpen(true);
        }, 900);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const navigateToPage = (page: PageType, categoryFilter?: string) => {
    setCurrentPage(page);
    if (categoryFilter !== undefined) {
      setShopCategoryFilter(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: product.size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

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
