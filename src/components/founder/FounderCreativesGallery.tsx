'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

const FOUNDER_CREATIVES = [
  {
    src: '/gallery/founder/founder1.jpeg',
    alt: 'Jac Ghré Creative 1',
    label: 'Backstage Fashion Week',
    caption: 'Paris Haute Couture Week',
  },
  {
    src: '/gallery/founder/founder2.jpeg',
    alt: 'Jac Ghré Creative 2',
    label: 'Runway Hair Direction',
    caption: 'Milan Fashion Week — Thierry Mugler',
  },
  {
    src: '/gallery/founder/founder3.jpeg',
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
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
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
              className="group relative bg-[#006073] border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 transition-all duration-300 shadow-xl shadow-[#004B5C]/50"
            >
              {/* Gold Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#D4AF37]/70 z-10 pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#D4AF37]/70 z-10 pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#D4AF37]/70 z-10 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#D4AF37]/70 z-10 pointer-events-none" />

              {/* Image Wrapper */}
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="relative block w-full aspect-[3/4] overflow-hidden bg-[#021318] text-left focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <img
                  src={creative.src}
                  alt={creative.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter contrast-100 saturate-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021318]/92 via-[#021318]/10 to-transparent" />

                {/* Numbered Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#006073]/90 border border-[#D4AF37]/50 text-[10px] font-cinzel tracking-[0.22em] uppercase text-[#F3E5AB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Hover Zoom Badge */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#D4AF37] text-[10px] font-cinzel tracking-[0.2em] uppercase text-[#021318] font-bold">
                    <ZoomIn className="w-3 h-3" />
                    View
                  </span>
                </div>
              </button>

              {/* Caption Footer */}
              <figcaption className="p-4 sm:p-5 border-t border-[#D4AF37]/25 bg-gradient-to-b from-[#006073] to-[#005566]">
                <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-[0.14em] text-[#FBF9F3] uppercase">
                  {creative.label}
                </h3>
                <p className="mt-1 font-editorial italic text-[#D4AF37] text-xs sm:text-sm">
                  {creative.caption}
                </p>
              </figcaption>
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
              className="relative w-full max-w-5xl max-h-[88vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full-size Image */}
              <div className="flex-1 min-h-0 flex items-center justify-center bg-[#001a20]/80 border border-[#D4AF37]/30 p-3 sm:p-5">
                <img
                  src={itemsRef.current[lightboxIndex].src}
                  alt={itemsRef.current[lightboxIndex].alt}
                  className="max-w-full max-h-[62vh] sm:max-h-[68vh] w-auto h-auto object-contain shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                />
              </div>

              {/* Caption / Text Panel */}
              <div className="mt-4 p-4 sm:p-5 border border-[#D4AF37]/40 bg-gradient-to-br from-[#006073] via-[#007288] to-[#005566]">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 border border-[#D4AF37]/60 bg-[#021318] flex items-center justify-center">
                      <GoldEmblem size={18} />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.18em] text-[#FBF9F3] uppercase">
                        {itemsRef.current[lightboxIndex].label}
                      </h4>
                      <p className="mt-1 font-editorial italic text-[#D4AF37] text-sm sm:text-base">
                        {itemsRef.current[lightboxIndex].caption}
                      </p>
                      <p className="mt-2 font-poppins text-xs sm:text-sm text-[#B5CAD0] leading-relaxed max-w-2xl">
                        {itemsRef.current[lightboxIndex].alt}. Click the arrows or use
                        your keyboard &larr; / &rarr; to browse the full archive. Press Esc to close.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="inline-flex items-center justify-center px-3 py-1.5 bg-[#021318] border border-[#D4AF37]/50 text-[10px] font-cinzel tracking-[0.24em] uppercase text-[#D4AF37] font-bold">
                      Founder Archive
                    </span>
                    <span className="font-cinzel text-xs tracking-widest text-[#F3E5AB]">
                      {lightboxIndex + 1} / {itemsRef.current.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
