'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';

type Category = 'all' | 'banner' | 'catalogues' | 'founder' | 'product';

const GALLERY_IMAGES: { category: Exclude<Category, 'all'>; src: string; alt: string }[] = [
  { category: 'banner', src: '/gallery/banner/banner.jpeg', alt: 'Brand Banner 1' },
  { category: 'banner', src: '/gallery/banner/banner2.jpeg', alt: 'Brand Banner 2' },
  { category: 'catalogues', src: '/gallery/catalogues/0.jpeg', alt: 'Catalogue 0' },
  { category: 'catalogues', src: '/gallery/catalogues/1.jpeg', alt: 'Catalogue 1' },
  { category: 'catalogues', src: '/gallery/catalogues/2.jpeg', alt: 'Catalogue 2' },
  { category: 'catalogues', src: '/gallery/catalogues/3.jpeg', alt: 'Catalogue 3' },
  { category: 'catalogues', src: '/gallery/catalogues/4.jpeg', alt: 'Catalogue 4' },
  { category: 'catalogues', src: '/gallery/catalogues/6.jpeg', alt: 'Catalogue 6' },
  { category: 'catalogues', src: '/gallery/catalogues/7.jpeg', alt: 'Catalogue 7' },
  { category: 'catalogues', src: '/gallery/catalogues/8.jpeg', alt: 'Catalogue 8' },
  { category: 'catalogues', src: '/gallery/catalogues/9.jpeg', alt: 'Catalogue 9' },
  { category: 'catalogues', src: '/gallery/catalogues/10.jpeg', alt: 'Catalogue 10' },
  { category: 'catalogues', src: '/gallery/catalogues/about.jpeg', alt: 'About Catalogue' },
  { category: 'catalogues', src: '/gallery/catalogues/about1.jpeg', alt: 'About Catalogue 1' },
  { category: 'catalogues', src: '/gallery/catalogues/product-details.jpeg', alt: 'Product Details Catalogue' },
  { category: 'founder', src: '/gallery/founder/founder.jpeg', alt: 'Founder Portrait' },
  { category: 'founder', src: '/gallery/founder/founder1.jpeg', alt: 'Founder 1' },
  { category: 'founder', src: '/gallery/founder/founder2.jpeg', alt: 'Founder 2' },
  { category: 'founder', src: '/gallery/founder/founder3.jpeg', alt: 'Founder 3' },
  { category: 'product', src: '/gallery/product/product1.jpeg', alt: 'Product 1' },
  { category: 'product', src: '/gallery/product/product2.jpeg', alt: 'Product 2' },
  { category: 'product', src: '/gallery/product/product3.jpeg', alt: 'Product 3' },
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
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, onKeyDown]);

  const filteredImagesRef = useRef(filteredImages);
  filteredImagesRef.current = filteredImages;

  return (
    <div className="pt-8 pb-28 bg-[#0C8A9B] min-h-screen">
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
              className="group relative aspect-[4/5] overflow-hidden bg-[#097B8A] border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 transition-all duration-300 text-left shadow-md hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] will-change-transform"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021318]/85 via-[#021318]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-2.5 py-1 bg-[#097B8A]/95 text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/40">
                  {image.category}
                </span>
                <p className="mt-2 font-poppins text-sm text-[#F7F4EB] leading-snug">
                  {image.alt}
                </p>
              </div>
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
              className="relative max-w-6xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImagesRef.current[lightboxIndex].src}
                alt={filteredImagesRef.current[lightboxIndex].alt}
                className="w-full h-auto max-h-[85vh] object-contain border border-[#D4AF37]/30"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#021318] via-[#021318]/70 to-transparent p-5 sm:p-6">
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
