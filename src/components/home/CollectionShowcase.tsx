import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { GoldEmblem } from '../ui/GoldEmblem';
import { useShop } from '../../context/ShopContext';

export const CollectionShowcase: React.FC = () => {
  const { navigateToPage } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'haircare', label: 'Haute Hair Care' },
    { id: 'elixir', label: 'Precious Elixirs' },
    { id: 'fragrance', label: 'Haute Parfumerie' },
    { id: 'bodycare', label: 'Sun & Body Rituals' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="collection"
      className="relative py-24 sm:py-32 lg:py-36 overflow-hidden bg-[#007288] border-b border-[#D4AF37]/30"
    >
      {/* =========================================================
          BACKGROUND
          Main Teal: #007288
      ========================================================= */}

      {/* Soft Teal Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#007288] via-[#007288]/95 to-[#007288] pointer-events-none" />

      {/* Subtle Luxury Pattern */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              135deg,
              transparent 0%,
              transparent 47%,
              rgba(255,255,255,0.045) 47%,
              rgba(255,255,255,0.045) 48%,
              transparent 48%,
              transparent 100%
            ),
            linear-gradient(
              45deg,
              transparent 0%,
              transparent 47%,
              rgba(255,255,255,0.035) 47%,
              rgba(255,255,255,0.035) 48%,
              transparent 48%,
              transparent 100%
            )
          `,
          backgroundSize: '110px 110px',
        }}
      />

      {/* Golden Atmospheric Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.10)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,transparent_65%)] pointer-events-none" />

      {/* Top Gold Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      {/* Bottom Gold Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =======================================================
            SECTION HEADER
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          {/* Emblem */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />

            <GoldEmblem
              size={28}
              withGlow
            />

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>

          {/* Eyebrow */}
          <span className="text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.35em] uppercase block mb-3 text-[#D4AF37]">
            Pure, Excellence
          </span>

          {/* Heading */}
          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.14em] uppercase text-[#F7F4EB]">
            GHRÉ Collection
          </h2>

          {/* Description */}
          <p className="mt-5 text-base sm:text-xl font-editorial italic text-[#F3E5AB] leading-relaxed">
            Bespoke formulations crafted with pure prickly pear seed oil,
            silk peptides, and solar botanicals.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* =======================================================
            CATEGORY FILTERS
        ======================================================= */}

        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-14">

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative
                  py-2.5 px-4 sm:px-6
                  text-[10px] sm:text-xs
                  font-cinzel
                  tracking-[0.18em]
                  uppercase
                  border
                  transition-all
                  duration-300
                  cursor-pointer
                  overflow-hidden
                  ${
                    isActive
                      ? `
                        bg-[#D4AF37]
                        border-[#D4AF37]
                        text-[#062B35]
                        font-bold
                        shadow-[0_8px_25px_rgba(212,175,55,0.25)]
                      `
                      : `
                        bg-[#007288]/70
                        border-[#D4AF37]/35
                        text-[#F3E5AB]
                        hover:bg-[#007288]
                        hover:border-[#D4AF37]
                        hover:text-[#FFF3C4]
                      `
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}

        </div>

        {/* =======================================================
            PRODUCTS GRID
        ======================================================= */}

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* =======================================================
            BOTTOM VIP CONSULTATION PANEL
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            relative
            mt-16
            p-7 sm:p-8 lg:p-10
            bg-[#007288]
            border
            border-[#D4AF37]/40
            shadow-[0_20px_60px_rgba(0,60,72,0.35)]
            overflow-hidden
          "
        >

          {/* Panel Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(212,175,55,0.07)_0%,transparent_45%)] pointer-events-none" />

          {/* Subtle Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  transparent 0%,
                  transparent 48%,
                  rgba(255,255,255,0.05) 48%,
                  rgba(255,255,255,0.05) 49%,
                  transparent 49%
                )
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Corner Accents */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-[#D4AF37]/70" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-[#D4AF37]/70" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[#D4AF37]/70" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[#D4AF37]/70" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-7 text-center md:text-left">

            {/* Left Content */}
            <div className="flex items-center gap-5">

              <GoldEmblem
                size={42}
                withGlow
                className="shrink-0 hidden sm:inline-flex"
              />

              <div>

                <span className="text-[9px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase">
                  PRIVATE BEAUTY CONCIERGE
                </span>

                <h3 className="font-cinzel text-lg sm:text-xl tracking-wide text-[#F7F4EB] mt-1">
                  Need a Personalized Hair & Fragrance Consultation?
                </h3>

                <p className="text-xs sm:text-sm font-poppins font-light mt-2 text-[#C5D9DD] max-w-2xl">
                  Speak directly with a GHRÉ beauty concierge for tailor-made
                  hair rituals and scent profiling.
                </p>

              </div>

            </div>

            {/* CTA */}
            <button
              onClick={() => navigateToPage('contact')}
              className="
                px-6 py-3.5
                border border-[#D4AF37]
                text-[#D4AF37]
                hover:bg-[#D4AF37]
                hover:text-[#062B35]
                font-cinzel
                text-xs
                font-semibold
                tracking-[0.2em]
                uppercase
                transition-all
                duration-300
                shrink-0
                cursor-pointer
              "
            >
              Request VIP Consultation
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
};