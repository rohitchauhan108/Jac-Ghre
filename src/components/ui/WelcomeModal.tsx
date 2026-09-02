'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useShop } from '../../context/ShopContext';

export const WelcomeModal: React.FC = () => {
  const {
    isWelcomePopupOpen,
    setIsWelcomePopupOpen,
  } = useShop();

  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Control popup based on current page
  useEffect(() => {
    if (!mounted) return;

    const isHomePage = pathname === '/';

    if (isHomePage) {
      setIsWelcomePopupOpen(true);
    } else {
      setIsWelcomePopupOpen(false);
    }
  }, [pathname, mounted, setIsWelcomePopupOpen]);

  const handleClose = () => {
    setIsWelcomePopupOpen(false);
  };

  // Don't render anything before client hydration is complete
  if (!mounted) {
    return null;
  }

  // IMPORTANT:
  // The popup can ONLY render on the homepage
  const isHomePage = pathname === '/';

  return (
    <AnimatePresence>
      {isHomePage && isWelcomePopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          data-lenis-prevent
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 lg:bg-[#088395]/80 bg-[#088395]/0 transition-opacity"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative lg:top-0 top-10 w-full max-w-md max-h-[90vh] rounded-xl shadow-2xl z-10 overflow-hidden bg-transparent flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-30 p-2 rounded-full text-[#d4af37] hover:scale-105 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Popup Image */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src="/home/welcome.webp"
                alt="Welcome Preview"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl block"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};