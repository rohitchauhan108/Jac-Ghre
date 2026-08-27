import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

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
            className="fixed inset-0 bg-[#088395]/90 transition-opacity"
          />

          {/* Modal Container holding only the image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg border-2 shadow-[0_25px_70px_rgba(0,0,0,0.5)] z-10 overflow-hidden bg-[#1f727e] border-[#D4AF37]/70"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 transition-all border border-[#D4AF37]/40 bg-[#1f727e]/80 text-[#D4AF37] hover:text-[#FFF3C4] hover:bg-[#287f98] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Popup Image Only */}
            <div className="relative w-full flex items-center justify-center">
              <img 
                src="/images/popup.jpg" 
                alt="Welcome Preview" 
                className="w-full h-auto object-cover block" 
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};