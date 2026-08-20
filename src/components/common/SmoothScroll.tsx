import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useShop } from '../../context/ShopContext';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentPage,
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
    isWelcomePopupOpen,
    quickViewProduct,
  } = useShop();

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Attach to global window for any anchor or programmatic scrolls
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Scroll to top on page transition
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [currentPage]);

  // Pause page smooth scroll when a modal or drawer is active to prevent background scroll jitter
  const isAnyModalOpen =
    isCartOpen ||
    isWishlistOpen ||
    isSearchOpen ||
    isWelcomePopupOpen ||
    Boolean(quickViewProduct);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isAnyModalOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isAnyModalOpen]);

  return <>{children}</>;
};
