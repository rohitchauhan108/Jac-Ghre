'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import Lenis from 'lenis';

const FOUNDER_CREATIVES = [
  {
    src: '/gallery/founder/founder1.jpeg',
    alt: 'Jac Ghré Creative 1',
    label: 'Backstage Fashion Week',
    caption: 'Paris Haute Couture Week',
  },
  {
    src: '/gallery/founder/founder3.jpeg',
    alt: 'Jac Ghré Creative 2',
    label: 'Runway Hair Direction',
    caption: 'Milan Fashion Week — Thierry Mugler',
  },
  {
    src: '/gallery/founder/founder31.jpeg',
    alt: 'Jac Ghré Creative 3',
    label: 'Brand Creative Shoot',
    caption: 'Côte d\'Azur — Saint-Tropez Salon',
  },
];

export const FounderCreativesGallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const itemsRef = useRef(FOUNDER_CREATIVES);
  itemsRef.current = FOUNDER_CREATIVES;

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : prev > 0 ? prev - 1 : FOUNDER_CREATIVES.length - 1
    );
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : prev < FOUNDER_CREATIVES.length - 1 ? prev + 1 : 0
    );
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    },
    [lightboxIndex, closeLightbox, prevImage, nextImage]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    window.addEventListener('keydown', onKeyDown);
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    try { lenis?.stop(); } catch { /* ignore */ }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      try { lenis?.start(); } catch { /* ignore */ }
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [lightboxIndex, onKeyDown]);

  return (
    <section className="relative py-20 sm:py-24 border-b border-[#D4AF37]/25 bg-gradient-to-b from-[#006073] via-[#0C8A9B] to-[#006073] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#006073] border border-[#D4AF37]/50 mb-4 shadow-md">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#F3E5AB] uppercase">
              The Founder Archives
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <GoldEmblem size={22} withGlow />
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.12em] text-[#FBF9F3] uppercase">
              Founder Creatives
            </h2>
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>

          <p className="font-editorial text-xl sm:text-2xl italic text-[#D4AF37] mt-2">
            &ldquo;Rare glimpses behind the artistry of Jac Ghré.&rdquo;
          </p>

          <p className="mt-3 font-poppins text-sm sm:text-base text-[#B5CAD0] leading-relaxed max-w-2xl mx-auto">
            A curated selection of moments captured backstage at international fashion weeks, private atelier sessions, and masterclass appointments across Paris, Milan, and the French Riviera. Click any image to view in full detail.
          </p>
        </div>

        {/* Creatives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOUNDER_CREATIVES.map((creative, index) => (
            <motion.figure
              key={creative.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Image Wrapper */}
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="relative block w-full aspect-[3/4] overflow-hidden bg-transparent text-left focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <img
                  src={creative.src}
                  alt={creative.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter contrast-100 saturate-105 transition-transform duration-700"
                />
              </button>
            </motion.figure>
          ))}
        </div>

        {/* Signature Strip */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <p className="font-script text-3xl sm:text-4xl text-[#D4AF37] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Jac Ghré
          </p>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#021318]/97 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
            data-lenis-prevent
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center bg-[#006073] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {FOUNDER_CREATIVES.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-3 sm:left-8 w-11 h-11 flex items-center justify-center bg-[#006073] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-3 sm:right-8 w-11 h-11 flex items-center justify-center bg-[#006073] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[88vh] flex flex-col overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              {/* Full-size Image */}
              <div className="flex-1 min-h-0 flex items-center justify-center bg-transparent p-3 sm:p-5">
                <img
                  src={itemsRef.current[lightboxIndex].src}
                  alt={itemsRef.current[lightboxIndex].alt}
                  className="max-w-full max-h-[62vh] sm:max-h-[68vh] w-auto h-auto object-contain shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};