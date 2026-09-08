'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Lenis from 'lenis';

type Category = 'all' | 'banner' | 'catalogues' | 'founder' | 'product';

const GALLERY_IMAGES: { category: Exclude<Category, 'all'>; src: string; alt: string }[] = [
  { category: 'banner', src: '/gallery/banner/1.webp', alt: 'Brand Banner 1' },
  { category: 'banner', src: '/gallery/banner/products.webp', alt: 'Brand Banner 2' },
  { category: 'catalogues', src: '/gallery/catalogues/0.webp', alt: 'Catalogue 0' },
  { category: 'catalogues', src: '/gallery/catalogues/1.webp', alt: 'Catalogue 1' },
  { category: 'catalogues', src: '/gallery/catalogues/2.webp', alt: 'Catalogue 2' },
  { category: 'catalogues', src: '/gallery/catalogues/3.webp', alt: 'Catalogue 3' },
  { category: 'catalogues', src: '/gallery/catalogues/4.webp', alt: 'Catalogue 4' },
  { category: 'catalogues', src: '/gallery/catalogues/6.webp', alt: 'Catalogue 6' },
  { category: 'catalogues', src: '/gallery/catalogues/7.webp', alt: 'Catalogue 7' },
  { category: 'catalogues', src: '/gallery/catalogues/8.webp', alt: 'Catalogue 8' },
  { category: 'catalogues', src: '/gallery/catalogues/9.webp', alt: 'Catalogue 9' },
  { category: 'catalogues', src: '/gallery/catalogues/10.webp', alt: 'Catalogue 10' },
  { category: 'catalogues', src: '/gallery/catalogues/newabout.webp', alt: 'About Catalogue' },
  // { category: 'catalogues', src: '/gallery/catalogues/about1.webp', alt: 'About Catalogue 1' },
  // { category: 'founder', src: '/gallery/founder/founder.webp', alt: 'Founder Portrait' },
  { category: 'product', src: '/gallery/product/product1.webp', alt: 'Product 1' },
  { category: 'product', src: '/gallery/product/product2.webp', alt: 'Product 2' },
  { category: 'founder', src: '/gallery/founder/founder1.webp', alt: 'Founder 1' },
  { category: 'founder', src: '/gallery/founder/founder2.webp', alt: 'Founder 2' },
  { category: 'founder', src: '/gallery/founder/founder3.webp', alt: 'Founder 3' },
  { category: 'product', src: '/gallery/product/product3.webp', alt: 'Product 3' },
  { category: 'product', src: '/gallery/product/product4.webp', alt: 'Product 4' },
];

const TABS: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'banner', label: 'Banners' },
  { key: 'catalogues', label: 'Catalogues' },
  { key: 'founder', label: 'Founder' },
  { key: 'product', label: 'Products' },
];

const COUNTS: Record<Category, number> = {
  all: GALLERY_IMAGES.length,
  banner: GALLERY_IMAGES.filter((i) => i.category === 'banner').length,
  catalogues: GALLERY_IMAGES.filter((i) => i.category === 'catalogues').length,
  founder: GALLERY_IMAGES.filter((i) => i.category === 'founder').length,
  product: GALLERY_IMAGES.filter((i) => i.category === 'product').length,
};

export const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeTab === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : prev > 0 ? prev - 1 : filteredImages.length - 1
    );
  }, [filteredImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : prev < filteredImages.length - 1 ? prev + 1 : 0
    );
  }, [filteredImages.length]);

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

  const filteredImagesRef = useRef(filteredImages);
  filteredImagesRef.current = filteredImages;

  return (
    <div className="pb-28 bg-[#0C8A9B] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#097B8A] via-[#0C8A9B] to-[#097B8A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#097B8A] border border-[#D4AF37]/50 mb-4 shadow-md">
            <Images className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              Visual Archive
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            The Gallery
          </h1>

          <p className="mt-4 max-w-2xl mx-auto font-editorial text-2xl sm:text-3xl italic text-[#D4AF37]">
            &ldquo;Moments captured in the world of GHR&Eacute;.&rdquo;
          </p>

          <p className="mt-3 max-w-2xl mx-auto font-poppins text-sm sm:text-base text-[#B5CAD0] font-normal leading-relaxed">
            Browse curated visuals from our campaigns, catalogues, founder journey, and signature product collections.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`group relative px-5 py-2.5 font-cinzel text-xs sm:text-sm font-semibold uppercase tracking-widest border transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#021318] border-[#D4AF37] shadow-lg'
                    : 'bg-transparent text-[#F3E5AB] border-[#D4AF37]/40 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-[#021318]/20 text-[#021318]' : 'bg-[#097B8A] text-[#D4AF37]'
                  }`}
                >
                  {COUNTS[tab.key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative block aspect-[4/5] w-full overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] will-change-transform bg-[#097B8A]/30"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                priority={index < 8}
                loading={index < 8 ? 'eager' : 'lazy'}
                decoding="async"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </button>
          ))}
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-24 font-editorial text-xl italic text-[#B5CAD0]">
            No images in this category yet.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#021318]/96 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            data-lenis-prevent
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center bg-[#097B8A] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {filteredImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 sm:left-8 w-11 h-11 flex items-center justify-center bg-[#097B8A] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
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
                  className="absolute right-4 sm:right-8 w-11 h-11 flex items-center justify-center bg-[#097B8A] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#021318] transition-colors z-10"
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
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <div className="relative w-full max-h-[85vh] aspect-auto overflow-hidden border border-[#D4AF37]/30 bg-[#021318]">
                <Image
                  src={filteredImagesRef.current[lightboxIndex].src}
                  alt={filteredImagesRef.current[lightboxIndex].alt}
                  width={2400}
                  height={1600}
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  priority
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 gradient-to-t from-[#021318] via-[#021318]/70 to-transparent p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#097B8A] text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/40">
                      {filteredImagesRef.current[lightboxIndex].category}
                    </span>
                    <p className="mt-2 font-poppins text-sm sm:text-base text-[#F7F4EB]">
                      {filteredImagesRef.current[lightboxIndex].alt}
                    </p>
                  </div>
                  <span className="font-cinzel text-xs text-[#D4AF37] tracking-widest">
                    {lightboxIndex + 1} / {filteredImagesRef.current.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};