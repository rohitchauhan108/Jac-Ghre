import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Globe, Clock, Gift } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrency, setIsWelcomePopupOpen, theme } = useShop();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    '✨ OFFICIAL WEBSITE LAUNCH COMING SOON • PRE-ORDER ATELIER ALLOTMENTS NOW OPEN ✨',
    '✨ GHRÉ PARIS INAUGURAL PREVIEW • USE VIP CODE "GHRE15" FOR 15% OFF PRE-ORDERS ✨',
    '✨ COMPLIMENTARY WORLDWIDE EXPRESS COURIER ON ALL INAUGURAL ORDERS ✨',
    '✨ JAC GHRÉ PRIVATE ATELIER CONSULTATIONS • PLACE VENDÔME & SOUTH BEACH ✨',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [messages.length]);

  const isDark = theme === 'dark';

  return (
    <div
      className={`border-b text-[11px] tracking-[0.16em] py-2 px-4 relative z-40 transition-colors duration-300 ${
        isDark
          ? 'bg-[#031920] border-[#D4AF37]/30 text-[#E8DCC4]'
          : 'bg-[#F3EDE2] border-[#D4AF37]/40 text-[#062B35]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Coming Soon Live Badge */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setIsWelcomePopupOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#D4AF37] text-[#062B35] font-cinzel text-[10px] font-bold tracking-widest uppercase hover:brightness-110 shadow-sm transition-all"
          >
            <Clock className="w-3 h-3" />
            <span>LAUNCHING SOON</span>
          </button>
          <span className={`text-[10px] font-cinzel tracking-widest ${isDark ? 'text-[#D4AF37]' : 'text-[#B8860B]'}`}>
            PARIS • ST-TROPEZ • MIAMI
          </span>
        </div>

        {/* Center: Dynamic Announcement */}
        <div className="flex-1 flex items-center justify-center text-center overflow-hidden h-5 px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIsWelcomePopupOpen(true)}
              className={`flex items-center justify-center gap-2 font-cinzel text-[10px] sm:text-[11px] font-bold cursor-pointer hover:underline underline-offset-2 ${
                isDark ? 'text-[#F3E5AB]' : 'text-[#062B35]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span className="truncate">{messages[currentMessageIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: VIP Code & Currency Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWelcomePopupOpen(true)}
            className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-cinzel font-bold tracking-wider px-2 py-0.5 border ${
              isDark
                ? 'border-[#D4AF37]/50 text-[#F3E5AB] bg-[#021319]'
                : 'border-[#D4AF37] text-[#B8860B] bg-[#FAF7F2]'
            }`}
          >
            <Gift className="w-3 h-3 text-[#D4AF37]" />
            <span>VIP: GHRE15</span>
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 text-[10px] font-cinzel tracking-wider">
            <Globe className="w-3 h-3 text-[#D4AF37]" />
            {['USD', 'EUR', 'GBP'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-1 py-0.5 transition-colors ${
                  currency === curr
                    ? isDark
                      ? 'text-[#FFF3C4] font-bold underline underline-offset-2'
                      : 'text-[#062B35] font-bold underline underline-offset-2'
                    : isDark
                    ? 'text-[#8EAAB0] hover:text-[#D4AF37]'
                    : 'text-[#7A98A1] hover:text-[#B8860B]'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
