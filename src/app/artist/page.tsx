"use client";

import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { GoldEmblem } from "@/components/ui/GoldEmblem";

interface GalleryItem {
  id: number;
  path: string;
  alt: string;
  title: string;
}

const WORKS: GalleryItem[] = [
  { id: 1, path: "/artist/1.jpeg", alt: "Riviera Golden Hour", title: "Golden Hour" },
  { id: 2, path: "/artist/2.jpeg", alt: "Haute Couture Backstage", title: "Backstage" },
  { id: 3, path: "/artist/3.jpeg", alt: "Bridal Atelier", title: "The Atelier" },
  { id: 4, path: "/artist/4.jpeg", alt: "Miami Beach Campaign", title: "Miami Heat" },
  { id: 5, path: "/artist/5.jpeg", alt: "Noir Editorial", title: "Noir" },
  { id: 6, path: "/artist/6.jpeg", alt: "Runway Finale — Thierry Mugler Legacy", title: "The Finale" },
];

const FASHION_CAPITALS = [
  "PARIS",
  "MILAN",
  "LONDON",
  "NEW YORK",
  "MIAMI",
  "LOS ANGELES",
  "SHANGHAI",
  "HONG KONG",
  "SAINT-TROPEZ",
];

export default function ArchiveGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const itemsRef = useRef<GalleryItem[]>(WORKS);
  const scrollStateRef = useRef<{
    bodyOverflow: string;
    htmlOverflow: string;
  } | null>(null);
  itemsRef.current = WORKS;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % itemsRef.current.length : 0
    );
  };

  const handlePrev = (e?: React.MouseEvent) => {
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
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const openAt = (index: number) => () => setSelectedIndex(index);

  return (
    <section className="min-h-screen bg-[#006073] text-[#FBF9F3] selection:bg-[#D4AF37] selection:text-[#006073] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#007288] via-[#006073] to-[#004a59]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14)_0%,transparent_65%)]" />
      </div>

      {/* ================= SECTION 1: MASTHEAD ================ */}
      <header className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#006073] border border-[#D4AF37]/50 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold tracking-[0.35em] text-[#F3E5AB] uppercase">
                Vol. I — Visual Archive
              </span>
            </div>
            <div className="inline-flex items-center gap-3">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">
                Paris · Saint-Tropez · Miami
              </span>
            </div>
          </div>

          {/* Brand Lockup */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
            <GoldEmblem size={22} withGlow />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
          </div>

          {/* Masthead Title */}
          <div className="text-center max-w-5xl mx-auto">
            <p className="text-[10px] sm:text-xs font-cinzel tracking-[0.55em] text-[#D4AF37] uppercase font-bold mb-4">
              Visual Archive
            </p>
            <h1 className="font-cinzel font-bold text-[#FBF9F3] uppercase tracking-[0.08em] leading-[0.92] text-5xl sm:text-7xl lg:text-[120px] xl:text-[140px]">
              Visual
              <br className="hidden sm:block" />
              <span className="inline-block mt-2">Works</span>
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

        {/* Capitals Marquee */}
        <div className="relative mt-12 sm:mt-18 border-y border-[#D4AF37]/30 bg-[#004a59]/60 overflow-hidden">
          <div className="flex items-center gap-10 sm:gap-16 py-3.5 animate-[marquee_48s_linear_infinite] whitespace-nowrap">
            {[...Array(3)].flatMap((_, loop) =>
              FASHION_CAPITALS.map((city, idx) => (
                <React.Fragment key={`${loop}-${idx}`}>
                  <span className="flex items-center gap-10 sm:gap-16">
                    <span className="font-cinzel text-[11px] sm:text-sm tracking-[0.5em] text-[#D4AF37] font-bold uppercase">
                      {city}
                    </span>
                    <GoldEmblem size={12} />
                  </span>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.3333%); } }`}</style>
      </header>

      {/* ================= SECTION 2: CLIENT WORKS — MAGAZINE GRID ================ */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
            {WORKS.map((work, index) => (
              <motion.button
                key={work.id}
                type="button"
                onClick={openAt(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="block w-full p-0 text-left leading-none"
              >
                <img
                  src={work.path}
                  alt={work.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="block w-full h-auto object-contain"
                />
              </motion.button>
            ))}
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
                href="/jac-ghre"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#E5C365] transition-colors shadow-xl"
              >
                Book Atelier
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
            className="fixed inset-0 z-50 bg-[#021318]/97 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev(e);
                  }}
                  className="absolute left-3 sm:left-8 w-11 h-11 flex items-center justify-center bg-[#006073] border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext(e);
                  }}
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
              className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center"
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
                  className="max-w-full max-h-[68vh] sm:max-h-[74vh] w-auto h-auto object-contain border border-[#D4AF37]/30 shadow-[0_30px_90px_rgba(0,0,0,0.75)]"
                />
              </div>
              <div className="mt-4 sm:mt-6 flex items-center gap-4 flex-wrap justify-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#006073] border border-[#D4AF37]/60">
                  <GoldEmblem size={14} />
                  <span className="font-cinzel text-[10px] tracking-[0.3em] text-[#F3E5AB] uppercase font-bold">
                    N°{String(selectedIndex + 1).padStart(2, "0")} / {String(itemsRef.current.length).padStart(2, "0")}
                  </span>
                </span>
                <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#8EAAB0] uppercase">
                  Jac Ghré · Visual Archive
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
