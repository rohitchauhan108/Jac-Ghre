import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BrandLogo } from './BrandLogo';

export const WelcomeModal: React.FC = () => {
  const { isWelcomePopupOpen, setIsWelcomePopupOpen } = useShop();

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ghre_welcome_seen', 'true');
    }
    setIsWelcomePopupOpen(false);
  };

  return (
    <AnimatePresence>
      {isWelcomePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#021317]/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg border-2 p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,96,115,0.85)] z-10 overflow-hidden text-center bg-[#0a8697] border-[#D4AF37]/70 text-[#F7F4EB]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 transition-all border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#FFF3C4] hover:bg-[#0C8A9B] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Royal Corner Highlights */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Logo from user image */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              {/* <div className="py-2">
                <BrandLogo variant="stacked" size="lg" withScriptTagline withGlow />
              </div> */}
              <div>
                <img src="/images/logo-light.png" alt="" 
                width={300}/>
              </div>

              {/* Decorative Gold Divider */}
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />

              {/* Main Messages */}
              <div className="space-y-3">
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#FFF2B2]">
                  Welcome to GHRÉ Paris
                </h3>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#D4AF37]/60 bg-[#D4AF37]/10 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
                    Website is launching soon
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E2C365] to-[#B8860B] text-[#0E4C5A] font-cinzel text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 shadow-[0_8px_25px_rgba(212,175,55,0.35)] transition-all cursor-pointer"
                >
                  Explore Preview
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
