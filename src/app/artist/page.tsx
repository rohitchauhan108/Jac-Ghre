"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { GoldEmblem } from "@/components/ui/GoldEmblem";

interface GalleryItem {
  id: number;
  path: string;
  alt: string;
  title: string;
}

const WORKS: GalleryItem[] = [
  { id: 1, path: "/artist/1.webp", alt: "GHRÉ ELITE MODEL", title: "GHRÉ ELITE MODEL" },
  { id: 2, path: "/artist/3.webp", alt: "GHRÉ VISUALS HAIRSTYLES", title: "GHRÉ VISUALS HAIRSTYLES" },
  { id: 3, path: "/artist/2.webp", alt: "GHRÉ CELEBRITIES", title: "GHRÉ CELEBRITIES" },
  { id: 4, path: "/artist/4.webp", alt: "GHRÉ PHOTO SHOOTS", title: "GHRÉ PHOTO SHOOTS" },
  { id: 5, path: "/artist/5.webp", alt: "GHRÉ FASHION SHOWS", title: "GHRÉ FASHION SHOWS" },
];

export default function ArchiveGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  const itemsRef = useRef<GalleryItem[]>(WORKS);
  const scrollStateRef = useRef<{
    bodyOverflow: string;
    htmlOverflow: string;
  } | null>(null);
  itemsRef.current = WORKS;

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % itemsRef.current.length);
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + itemsRef.current.length) % itemsRef.current.length);
  }, []);

  // 8-Second Auto-play Timer
  useEffect(() => {
    if (isPaused || selectedIndex !== null) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % itemsRef.current.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isPaused, selectedIndex]);

  const handleLightboxNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % itemsRef.current.length : 0
    );
  };

  const handleLightboxPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + itemsRef.current.length) % itemsRef.current.length
        : 0
    );
  };

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;

    if (selectedIndex !== null) {
      if (!scrollStateRef.current) {
        scrollStateRef.current = {
          bodyOverflow: document.body.style.overflow,
          htmlOverflow: document.documentElement.style.overflow,
        };
      }
      try {
        lenis?.stop();
      } catch {
        /* ignore */
      }
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      try {
        lenis?.start();
      } catch {
        /* ignore */
      }
      if (scrollStateRef.current) {
        document.body.style.overflow = scrollStateRef.current.bodyOverflow;
        document.documentElement.style.overflow = scrollStateRef.current.htmlOverflow;
        scrollStateRef.current = null;
      }
    }

    return () => {
      if (scrollStateRef.current) {
        try {
          lenis?.start();
        } catch {
          /* ignore */
        }
        document.body.style.overflow = scrollStateRef.current.bodyOverflow;
        document.documentElement.style.overflow = scrollStateRef.current.htmlOverflow;
        scrollStateRef.current = null;
      }
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") handleLightboxNext();
        if (e.key === "ArrowLeft") handleLightboxPrev();
        if (e.key === "Escape") setSelectedIndex(null);
      } else {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <section className="min-h-screen bg-[#006073] text-[#FBF9F3] selection:bg-[#D4AF37] selection:text-[#006073] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#007288] via-[#006073] to-[#004a59]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14)_0%,transparent_65%)]" />
      </div>

      {/* ================= SECTION 1: MASTHEAD ================ */}
      <header className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
            <GoldEmblem size={22} withGlow />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
          </div>

          <div className="text-center max-w-5xl mx-auto">
            <p className="text-[10px] sm:text-xs font-cinzel tracking-[0.55em] text-[#D4AF37] uppercase font-bold mb-4">
              Visual Archive
            </p>
            <h1 className="font-cinzel font-bold text-[#FBF9F3] uppercase tracking-[0.08em] leading-[0.92] text-5xl sm:text-7xl lg:text-[100px]">
              Visual
              <br className="hidden sm:block" />
              <span className="inline-block mt-2">Work</span>
            </h1>
            <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[11px] sm:text-xs font-cinzel tracking-[0.3em] text-[#C5D9DE] uppercase font-semibold">
                  {WORKS.length} Editorials
                </span>
              </div>
              <div className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
              <span className="text-[11px] sm:text-xs font-cinzel tracking-[0.3em] text-[#C5D9DE] uppercase font-semibold">
                Beauty · Runway · Campaign
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SECTION 2: CINEMATIC CAROUSEL ================ */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Main Container - Replaced bright blue background with a deep dark background (#021318) */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-[#006073] shadow-lg">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 cursor-pointer bg-[#006073] flex items-center justify-center"
                  onClick={() => setSelectedIndex(currentSlide)}
                >
                  <img
                    src={WORKS[currentSlide].path}
                    alt={WORKS[currentSlide].alt}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 lg:w-11 lg:h-11 w-6 h-8 flex items-center justify-center bg-[#006073]/80 backdrop-blur-sm border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-20 opacity-80 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 lg:w-11 lg:h-11 w-6 h-8 flex items-center justify-center bg-[#006073]/80 backdrop-blur-sm border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-20 opacity-80 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Pause / Play State Indicator */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#006073]/80 backdrop-blur-sm px-3 py-1.5 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-cinzel tracking-widest">
                {isPaused ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPaused ? "PAUSED" : "8s AUTO"}</span>
              </div>
            </div>

            {/* Pagination Indicators / Dots */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {WORKS.map((work, index) => (
                <button
                  key={work.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 transition-all duration-300 ${
                    currentSlide === index
                      ? "w-10 bg-[#D4AF37]"
                      : "w-3 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: FOOTER CAPSULE ================ */}
      <section className="relative py-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#007288] via-[#006073] to-[#007288] p-6 sm:p-8 shadow-2xl">
            <div className="sm:col-span-7 space-y-2">
              <p className="text-[10px] font-cinzel tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
                Private Atelier &amp; Booking
              </p>
              <h3 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-bold uppercase text-[#FBF9F3] tracking-wide leading-tight">
                Request a private consultation with Jac Ghré
              </h3>
            </div>
            <div className="sm:col-span-5 flex flex-col sm:flex-row sm:justify-end gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#E5C365] transition-colors shadow-xl"
              >
                Book Now
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#D4AF37]/70 text-[#F3E5AB] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#D4AF37]/10 transition-colors"
              >
                Full Archive
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIGHTBOX ================ */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#006073]/97 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedIndex(null)}
            data-lenis-prevent
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center bg-[#006073] border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {WORKS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handleLightboxPrev}
                  className="absolute left-3 sm:left-8 w-11 h-11 flex items-center justify-center bg-[#006073] border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleLightboxNext}
                  className="absolute right-3 sm:right-8 w-11 h-11 flex items-center justify-center bg-[#006073] border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <div
                className="flex-1 min-h-0 flex items-center justify-center p-3 sm:p-5 overflow-y-auto w-full"
                data-lenis-prevent
              >
                <img
                  src={itemsRef.current[selectedIndex].path}
                  alt={itemsRef.current[selectedIndex].alt}
                  className="max-w-full max-h-[70vh] w-auto h-auto object-contain border border-[#D4AF37]/30 shadow-[0_30px_90px_rgba(0,0,0,0.75)]"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-cinzel text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">
                  {itemsRef.current[selectedIndex].title}
                </p>
                <p className="text-[10px] font-cinzel tracking-[0.2em] text-[#8EAAB0] mt-1">
                  N°{String(selectedIndex + 1).padStart(2, "0")} / {String(itemsRef.current.length).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}