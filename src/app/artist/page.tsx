"use client";

import React, { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  path: string;
  category: string;
}

export default function ArchiveGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Combined and structured datasets to prevent index mismatch bugs
  const ivanaData: GalleryItem[] = Array.from({ length: 21 }, (_, index) => ({
    id: index + 1,
    path: `/IVANA TRUMP/${index + 1}.jpeg`,
    category: "Ivana Trump Archive",
  }));

  const kateData: GalleryItem[] = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    path: `/KATE MOSS/${index + 1}.jpeg`,
    category: "Kate Moss Archive",
  }));

  const allItems = [...ivanaData, ...kateData];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % allItems.length : 0,
    );
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + allItems.length) % allItems.length : 0,
    );
  };

  // Keyboard navigation support
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

  return (
    <main className="min-h-screen bg-[#005F73] text-[#f5f5f7] px-4 py-16 md:px-16 selection:bg-[#d4af37] selection:text-[#005F73]">
      {/* Editorial Header Section */}
      <header className="text-center mb-20 space-y-4">
        <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase block text-[#d4af37]">
          Exclusive Portfolio
        </span>
        <div className="w-16 h-[1px] bg-[#d4af37] mx-auto" />
        <p className="text-xs md:text-sm text-neutral-400 tracking-[0.3em] uppercase font-light">
          Visual Archive & Gallery
        </p>
      </header>

      {/* Ivana Trump Section */}
      <section className="mb-16">
        <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mb-8" />
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance]">
          {ivanaData.map((item, index) => (
            <div
              key={`ivana-${item.id}`}
              onClick={() => setSelectedIndex(index)} // index matches allItems slice
              className="mb-6 break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl bg-transparent transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={item.path}
                alt={`Ivana Trump archive image ${item.id}`}
                className="w-full h-auto object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-95"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Kate Moss Section */}
      <section className="mb-16">
        <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mb-8" />
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance]">
          {kateData.map((item, index) => {
            const globalIndex = ivanaData.length + index;
            return (
              <div
                key={`kate-${item.id}`}
                onClick={() => setSelectedIndex(globalIndex)}
                className="mb-6 break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl bg-transparent transition-transform duration-500 hover:scale-[1.02]"
              >
                <img
                  src={item.path}
                  alt={`Kate Moss archive image ${item.id}`}
                  className="w-full h-auto object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-95"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Fullscreen Cinematic Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/15 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all"
            aria-label="Close modal"
          >
            &times;
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-50 text-white bg-white/5 hover:bg-white/15 backdrop-blur-md w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl transition-all shadow-2xl hover:scale-110"
            aria-label="Previous image"
          >
            &#10094;
          </button>

          {/* Modal Content Box */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allItems[selectedIndex].path}
              alt={`${allItems[selectedIndex].category} Fullscreen ${allItems[selectedIndex].id}`}
              className="max-w-[85vw] max-h-[78vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
            {/* Live Counter & Category Badge */}
            <div className="mt-6 text-neutral-400 text-xs md:text-sm tracking-[0.25em] font-light bg-neutral-900/60 px-5 py-2 rounded-full border border-neutral-800/80 backdrop-blur-md flex items-center gap-3">
              <span>{allItems[selectedIndex].category}</span>
              <span className="text-neutral-600">|</span>
              <span>
                {selectedIndex + 1}{" "}
                <span className="text-neutral-600 mx-1">/</span>{" "}
                {allItems.length}
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-50 text-white bg-white/5 hover:bg-white/15 backdrop-blur-md w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl transition-all shadow-2xl hover:scale-110"
            aria-label="Next image"
          >
            &#10095;
          </button>
        </div>
      )}
    </main>
  );
}
