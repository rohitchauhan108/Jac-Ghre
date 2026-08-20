import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause, Sparkles, ShoppingBag } from 'lucide-react';
import { CAMPAIGN_SLIDES } from '../../data/products';
import { useShop, PageType } from '../../context/ShopContext';

export const HeroCarousel: React.FC = () => {
  const { navigateToPage } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = CAMPAIGN_SLIDES;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  const handleSlideClick = (slide: typeof currentSlide) => {
    if (slide.ctaLink === 'hair-care' || slide.id.includes('hair') || slide.id.includes('orange')) {
      navigateToPage('hair-care');
    } else if (slide.ctaLink === 'sun-body' || slide.id.includes('sun')) {
      navigateToPage('sun-body');
    } else {
      navigateToPage('shop', 'all');
    }
  };

  return (
    <section
      id="hero-banner"
      className="relative w-full bg-[#03151b] overflow-hidden select-none border-b border-[#D4AF37]/30"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Banner Stage Container with Optimal Aspect Ratio for Wide Campaign Art */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] md:aspect-[16/8] lg:aspect-[16/7.2] xl:aspect-[16/6.8] min-h-[420px] max-h-[820px] flex items-center justify-center bg-[#021116]">
        {/* Animated Banner Image Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => handleSlideClick(currentSlide)}
            className="absolute inset-0 w-full h-full cursor-pointer group"
          >
            {/* Banner Image - Crystal Clear Presentation */}
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
            />

            {/* Ultra-subtle luxury corner lighting without obstructing artwork */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#021319]/50 via-transparent to-[#021319]/30 pointer-events-none" />

            {/* Subtle Gold Outer Border Inset */}
            <div className="absolute inset-2 sm:inset-4 border border-[#D4AF37]/20 pointer-events-none group-hover:border-[#D4AF37]/40 transition-colors duration-500" />
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Floating Quick-Action Pill (Bottom Right Corner - Kept clear from center artwork) */}
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 z-30 pointer-events-auto">
          <button
            onClick={() => handleSlideClick(currentSlide)}
            className="px-4 sm:px-6 py-2.5 bg-[#031d25]/90 hover:bg-[#D4AF37] text-[#F3E5AB] hover:text-[#062B35] border border-[#D4AF37]/70 backdrop-blur-md font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
          >
            <span>{currentSlide.ctaText || 'EXPLORE COLLECTION'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#062B35] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Manual Slide Navigation Arrows */}
        <div className="absolute inset-y-0 inset-x-2 sm:inset-x-6 z-30 flex items-center justify-between pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#021319]/80 hover:bg-[#073946] text-[#D4AF37] hover:text-[#FFF3C4] border border-[#D4AF37]/50 backdrop-blur-md transition-all shadow-xl group cursor-pointer"
            aria-label="Previous campaign banner"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#021319]/80 hover:bg-[#073946] text-[#D4AF37] hover:text-[#FFF3C4] border border-[#D4AF37]/50 backdrop-blur-md transition-all shadow-xl group cursor-pointer"
            aria-label="Next campaign banner"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Luxury Bottom Banner Navigation Dock */}
      <div className="w-full bg-[#02141a] border-t border-[#D4AF37]/30 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Banner Selector Tabs with Live Active Glow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
            {slides.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`text-left px-3 py-2 border transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#07333e] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-[#031920]/60 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#04222b]'
                  }`}
                >
                  <span
                    className={`font-cinzel text-[10px] font-bold ${
                      isActive ? 'text-[#D4AF37]' : 'text-[#8EAAB0]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span
                      className={`block font-cinzel text-[10px] sm:text-[11px] tracking-wider truncate font-semibold ${
                        isActive ? 'text-[#FFF3C4]' : 'text-[#A5BEC3]'
                      }`}
                    >
                      {slide.title.replace('GHRÉ ', '').replace(' — MONOÏ VANILLA', '')}
                    </span>
                    <span className="hidden lg:block text-[9px] font-poppins text-[#729299] truncate">
                      {slide.locationBadge || slide.eyebrow}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls & Progress Indicator */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[#D4AF37] hover:text-[#FFF3C4] border border-[#D4AF37]/30 bg-[#031a22] font-cinzel text-[10px] tracking-wider transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'AUTO' : 'PAUSED'}</span>
            </button>

            {/* Campaign Counter */}
            <div className="text-[11px] font-cinzel text-[#8EAAB0] tracking-widest uppercase">
              <span className="text-[#D4AF37] font-bold">0{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>0{slides.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
