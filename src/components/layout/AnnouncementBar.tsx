import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

// Static messages
const MESSAGES = [
  '✨ OFFICIAL WEBSITE LAUNCH COMING SOON • PRE-ORDER ATELIER ALLOTMENTS NOW OPEN ✨',
  '✨ GHRÉ PARIS INAUGURAL PREVIEW • USE VIP CODE "GHRE15" FOR 15% OFF PRE-ORDERS ✨',
  '✨ COMPLIMENTARY WORLDWIDE EXPRESS COURIER ON ALL INAUGURAL ORDERS ✨',
  '✨ JAC GHRÉ PRIVATE ATELIER CONSULTATIONS • PLACE VENDÔME & SOUTH BEACH ✨',
];

export const AnnouncementBar: React.FC = () => {
  const { setIsWelcomePopupOpen, theme } = useShop();

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Boolean state because it represents paused / not paused
  const [isPaused, setIsPaused] = useState(false);

  const nextMessage = useCallback(() => {
    setCurrentMessageIndex((prev) => (prev + 1) % MESSAGES.length);
  }, []);

  useEffect(() => {
    // Don't change messages while paused
    if (isPaused) return;

    const timer = setInterval(nextMessage, 4000);

    return () => clearInterval(timer);
  }, [isPaused, nextMessage]);

  const isDark = theme === 'dark';

  return (
    <div
      className={`border-b text-[11px] tracking-[0.16em] py-2 px-4 relative z-40 transition-colors duration-300 bg-white lg:bg-[#005F73] border-none lg:border-[#005F73]/30 text-white`}
    >
      <div className="max-w-7xl mx-auto hidden lg:flex items-center justify-between gap-4">
        {/* Left: Coming Soon Live Badge */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setIsWelcomePopupOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#031920] text-[#d4af37] font-cinzel text-[10px] font-bold tracking-widest uppercase hover:brightness-110 shadow-sm transition-all"
          >
            <Clock className="w-3 h-3" />
            <span>LAUNCHING SOON</span>
          </button>

          <span className="text-[10px] font-cinzel font-semibold tracking-widest text-[#E8DCC4]">
            PARIS • ST-TROPEZ • MIAMI
          </span>
        </div>

        {/* Center: Dynamic Announcement */}
        <div
          className="flex-1 flex items-center justify-center text-center overflow-hidden h-5 px-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIsWelcomePopupOpen(true)}
              className={`flex items-center justify-center gap-2 font-cinzel text-[10px] sm:text-[11px] font-bold cursor-pointer hover:underline underline-offset-2 text-white`}
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />

              <span className="truncate">
                {MESSAGES[currentMessageIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};