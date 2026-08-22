import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Play,
  Pause,
} from 'lucide-react';
import { CAMPAIGN_SLIDES } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const HeroCarousel: React.FC = () => {
  const { navigateToPage } = useShop();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = CAMPAIGN_SLIDES;
  const currentSlide = slides[currentIndex];

  /* =========================================================
     AUTO PLAY
  ========================================================= */
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  /* =========================================================
     NEXT SLIDE
  ========================================================= */
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================= */
  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  /* =========================================================
     SLIDE NAVIGATION
  ========================================================= */
  const handleSlideClick = (slide: typeof currentSlide) => {
    if (
      slide.ctaLink === 'hair-care' ||
      slide.id.includes('hair') ||
      slide.id.includes('orange')
    ) {
      navigateToPage('hair-care');
    } else if (
      slide.ctaLink === 'sun-body' ||
      slide.id.includes('sun')
    ) {
      navigateToPage('sun-body');
    } else {
      navigateToPage('shop', 'all');
    }
  };

  return (
    <section
      id="hero-banner"
      className="
        relative
        w-full
        bg-[#007288]
        overflow-hidden
        select-none
        border-b
        border-[#D4AF37]/30
      "
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* =========================================================
          HERO BANNER
      ========================================================= */}
      <div
        className="
          relative
          w-full
          aspect-[4/3]
          sm:aspect-[16/9]
          md:aspect-[3.6/1]
          overflow-hidden
          bg-[#006073]
        "
      >
        {/* =====================================================
            SUBTLE GOLD AURA
        ===================================================== */}
        <div
          className="
            absolute
            inset-0
            z-[1]
            pointer-events-none
            bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_65%)]
          "
        />

        {/* =====================================================
            SLIDE IMAGE
        ===================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{
              opacity: 0,
              scale: 1.015,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.995,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => handleSlideClick(currentSlide)}
            className="
              absolute
              inset-0
              w-full
              h-full
              cursor-pointer
              group
            "
          >
            {/* =================================================
                RESPONSIVE BANNER IMAGE (PICTURE ELEMENT)
            ================================================= */}
            <picture className="w-full h-full block">
              {currentSlide.mobileImage && (
                <source
                  media="(max-width: 767px)"
                  srcSet={currentSlide.mobileImage}
                />
              )}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                loading={currentIndex === 0 ? 'eager' : 'lazy'}
                draggable={false}
                className="
                  block
                  w-full
                  h-full
                  object-cover
                  object-center
                  transition-transform
                  duration-1000
                  ease-out
                  group-hover:scale-[1.012]
                "
              />
            </picture>

            {/* =================================================
                LUXURY OVERLAY
            ================================================= */}
            <div
              className="
                absolute
                inset-0
                pointer-events-none
                bg-gradient-to-t
                from-[#006073]/25
                via-transparent
                to-[#006073]/10
              "
            />

            {/* =================================================
                GOLD INNER BORDER
            ================================================= */}
            <div
              className="
                absolute
                inset-2
                sm:inset-3
                lg:inset-4
                hidden
                sm:block
                border
                border-[#D4AF37]/20
                pointer-events-none
                group-hover:border-[#D4AF37]/40
                transition-colors
                duration-500
              "
            />
          </motion.div>
        </AnimatePresence>

        {/* =========================================================
            MOBILE ARROWS
        ========================================================= */}
        <div
          className="
            absolute
            inset-y-0
            left-2
            right-2
            z-30
            flex
            items-center
            justify-between
            pointer-events-none
            md:hidden
          "
        >
          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="
              pointer-events-auto
              w-8
              h-8
              sm:w-9
              sm:h-9
              flex
              items-center
              justify-center
              rounded-full
              bg-[#006073]/75
              hover:bg-[#007288]
              text-[#D4AF37]
              hover:text-[#FFF3C4]
              border
              border-[#D4AF37]/50
              backdrop-blur-md
              shadow-lg
              transition-all
              duration-300
              active:scale-90
            "
            aria-label="Previous campaign banner"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="
              pointer-events-auto
              w-8
              h-8
              sm:w-9
              sm:h-9
              flex
              items-center
              justify-center
              rounded-full
              bg-[#006073]/75
              hover:bg-[#007288]
              text-[#D4AF37]
              hover:text-[#FFF3C4]
              border
              border-[#D4AF37]/50
              backdrop-blur-md
              shadow-lg
              transition-all
              duration-300
              active:scale-90
            "
            aria-label="Next campaign banner"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* =========================================================
            DESKTOP ARROWS
        ========================================================= */}
        <div
          className="
            absolute
            inset-y-0
            left-4
            right-4
            lg:left-6
            lg:right-6
            z-30
            hidden
            md:flex
            items-center
            justify-between
            pointer-events-none
          "
        >
          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="
              pointer-events-auto
              w-10
              h-10
              lg:w-12
              lg:h-12
              flex
              items-center
              justify-center
              bg-[#006073]/80
              hover:bg-[#007288]
              text-[#D4AF37]
              hover:text-[#FFF3C4]
              border
              border-[#D4AF37]/50
              backdrop-blur-md
              transition-all
              duration-300
              shadow-xl
              group
              cursor-pointer
            "
            aria-label="Previous campaign banner"
          >
            <ChevronLeft
              className="
                w-5
                h-5
                lg:w-6
                lg:h-6
                transition-transform
                group-hover:-translate-x-0.5
              "
            />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="
              pointer-events-auto
              w-10
              h-10
              lg:w-12
              lg:h-12
              flex
              items-center
              justify-center
              bg-[#006073]/80
              hover:bg-[#007288]
              text-[#D4AF37]
              hover:text-[#FFF3C4]
              border
              border-[#D4AF37]/50
              backdrop-blur-md
              transition-all
              duration-300
              shadow-xl
              group
              cursor-pointer
            "
            aria-label="Next campaign banner"
          >
            <ChevronRight
              className="
                w-5
                h-5
                lg:w-6
                lg:h-6
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>

        {/* =========================================================
            DESKTOP CTA
        ========================================================= */}
        <div
          className="
            absolute
            bottom-5
            sm:bottom-6
            lg:bottom-8
            right-5
            sm:right-6
            lg:right-10
            z-30
            hidden
            md:block
          "
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSlideClick(currentSlide);
            }}
            className="
              px-4
              lg:px-6
              py-2.5
              bg-[#006073]/90
              hover:bg-[#D4AF37]
              text-[#F3E5AB]
              hover:text-[#062B35]
              border
              border-[#D4AF37]/70
              backdrop-blur-md
              font-cinzel
              text-[10px]
              lg:text-xs
              font-bold
              tracking-[0.2em]
              uppercase
              shadow-[0_8px_25px_rgba(0,96,115,0.6)]
              transition-all
              duration-300
              flex
              items-center
              gap-2
              group
              cursor-pointer
            "
          >
            <span>
              {currentSlide.ctaText || 'EXPLORE COLLECTION'}
            </span>

            <ArrowRight
              className="
                w-3.5
                h-3.5
                text-[#D4AF37]
                group-hover:text-[#062B35]
                transition-transform
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        {/* =========================================================
            MOBILE CTA
        ========================================================= */}
        <div
          className="
            absolute
            bottom-2
            sm:bottom-3
            left-1/2
            -translate-x-1/2
            z-30
            md:hidden
          "
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSlideClick(currentSlide);
            }}
            className="
              px-3
              sm:px-4
              py-1.5
              sm:py-2
              bg-[#006073]/90
              text-[#F3E5AB]
              border
              border-[#D4AF37]/70
              backdrop-blur-md
              font-cinzel
              text-[8px]
              sm:text-[9px]
              font-bold
              tracking-[0.14em]
              sm:tracking-[0.16em]
              uppercase
              shadow-lg
              flex
              items-center
              gap-1.5
              sm:gap-2
              whitespace-nowrap
              active:scale-95
              transition-transform
            "
          >
            <span>
              {currentSlide.ctaText || 'EXPLORE COLLECTION'}
            </span>

            <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      {/* =========================================================
          MOBILE SLIDE INDICATORS
      ========================================================= */}
      <div
        className="
          md:hidden
          w-full
          bg-[#006073]
          border-t
          border-[#D4AF37]/20
          px-4
          py-2.5
        "
      >
        <div className="flex items-center justify-between gap-4">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((slide, idx) => {
              const isActive = currentIndex === idx;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? 'w-7 bg-[#D4AF37]'
                        : 'w-1.5 bg-[#8EAAB0]/50'
                    }
                  `}
                />
              );
            })}
          </div>

          {/* Counter */}
          <div
            className="
              flex
              items-center
              gap-1
              font-cinzel
              text-[9px]
              sm:text-[10px]
              tracking-widest
              text-[#8EAAB0]
            "
          >
            <span className="text-[#D4AF37] font-bold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>

            <span>/</span>

            <span>
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="
              flex
              items-center
              justify-center
              w-7
              h-7
              border
              border-[#D4AF37]/30
              bg-[#006073]
              text-[#D4AF37]
              transition-colors
              active:bg-[#007288]
            "
            aria-label={
              isPlaying
                ? 'Pause slideshow'
                : 'Play slideshow'
            }
          >
            {isPlaying ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3 ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================
          DESKTOP LUXURY NAVIGATION DOCK
      ========================================================= */}
      <div
        className="
          hidden
          md:block
          w-full
          bg-[#006073]
          border-t
          border-[#D4AF37]/30
          py-3
          lg:py-4
          px-4
          lg:px-8
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-3
            lg:gap-4
          "
        >
          {/* BANNERS TAB SELECTOR */}
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-2
              w-full
              lg:w-auto
            "
          >
            {slides.map((slide, idx) => {
              const isActive = currentIndex === idx;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    text-left
                    px-3
                    py-2
                    border
                    transition-all
                    duration-300
                    cursor-pointer
                    flex
                    items-center
                    gap-2.5
                    min-w-0
                    ${
                      isActive
                        ? 'bg-[#007288] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-[#006073] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#007288]'
                    }
                  `}
                >
                  <span
                    className={`
                      font-cinzel
                      text-[10px]
                      font-bold
                      shrink-0
                      ${
                        isActive
                          ? 'text-[#D4AF37]'
                          : 'text-[#8EAAB0]'
                      }
                    `}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <span
                      className={`
                        block
                        font-cinzel
                        text-[10px]
                        sm:text-[11px]
                        tracking-wider
                        truncate
                        font-semibold
                        ${
                          isActive
                            ? 'text-[#FFF3C4]'
                            : 'text-[#A5BEC3]'
                        }
                      `}
                    >
                      {slide.title
                        .replace('GHRÉ ', '')
                        .replace(' — MONOÏ VANILLA', '')}
                    </span>

                    <span
                      className="
                        hidden
                        xl:block
                        text-[9px]
                        font-poppins
                        text-[#8EAAB0]
                        truncate
                      "
                    >
                      {slide.locationBadge || slide.eyebrow}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CONTROLS */}
          <div
            className="
              flex
              items-center
              justify-end
              gap-4
              shrink-0
            "
          >
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="
                flex
                items-center
                gap-1.5
                px-2.5
                py-1
                text-[#D4AF37]
                hover:text-[#FFF3C4]
                border
                border-[#D4AF37]/30
                bg-[#006073]
                font-cinzel
                text-[10px]
                tracking-wider
                transition-colors
                cursor-pointer
              "
              aria-label={
                isPlaying
                  ? 'Pause slideshow'
                  : 'Play slideshow'
              }
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}

              <span>
                {isPlaying ? 'AUTO' : 'PAUSED'}
              </span>
            </button>

            <div
              className="
                text-[11px]
                font-cinzel
                text-[#8EAAB0]
                tracking-widest
                uppercase
              "
            >
              <span className="text-[#D4AF37] font-bold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>

              <span className="mx-1">/</span>

              <span>
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};