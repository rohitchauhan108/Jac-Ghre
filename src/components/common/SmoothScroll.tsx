'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useShop } from '../../context/ShopContext';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const {
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
    isWelcomePopupOpen,
    quickViewProduct,
  } = useShop();

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId = 0;
    let running = true;
    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      try {
        lenis.destroy();
      } catch {
        // ignore
      }
      lenisRef.current = null;
      if ((window as unknown as { lenis?: Lenis }).lenis === lenis) {
        delete (window as unknown as { lenis?: Lenis }).lenis;
      }
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  const isAnyModalOpen =
    isCartOpen ||
    isWishlistOpen ||
    isSearchOpen ||
    isWelcomePopupOpen ||
    Boolean(quickViewProduct);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    try {
      if (isAnyModalOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    } catch {
      // ignore start/stop errors
    }
  }, [isAnyModalOpen]);

  return <>{children}</>;
};
