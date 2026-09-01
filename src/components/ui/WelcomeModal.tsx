import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const WelcomeModal: React.FC = () => {
  const { isWelcomePopupOpen, setIsWelcomePopupOpen } = useShop();

  // Automatically open the modal every time the component mounts (on page load or refresh)
  useEffect(() => {
    setIsWelcomePopupOpen(true);
  }, [setIsWelcomePopupOpen]);

  const handleClose = () => {
    // sessionStorage logic removed so closing it won't prevent it from showing on refresh
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
            className="fixed inset-0 lg:bg-[#088395]/80 bg-[#088395]/0 transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:top-0 top-12 w-full max-w-md max-h-[90vh] rounded-xl shadow-2xl z-10 overflow-hidden bg-transparent flex flex-col items-center justify-center"
          >
            {/* Highly Visible Floating Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-30 p-2 rounded-full border border-white/20 bg-black/60 text-white hover:bg-black/80 hover:scale-105 transition-all cursor-pointer shadow-md backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Popup Image */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
              <img 
                src="/images/welcome.webp" 
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