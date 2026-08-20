import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { GoldEmblem } from '../ui/GoldEmblem';
import { useShop } from '../../context/ShopContext';

export const CollectionShowcase: React.FC = () => {
  const { theme, navigateToPage } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isDark = theme === 'dark';

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
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#041e26]' : 'bg-[#FFFFFF]'
      }`}
    >
      {/* Background radial teal & subtle gold aura */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(circle_at_50%_20%,rgba(6,43,53,0.9)_0%,rgba(3,25,32,1)_100%)]'
            : 'bg-[radial-gradient(circle_at_50%_20%,rgba(250,247,242,0.8)_0%,rgba(243,237,226,0.5)_100%)]'
        }`}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GoldEmblem size={24} />
          </div>
          <span
            className={`text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.35em] uppercase block mb-2 ${
              isDark ? 'text-[#D4AF37]' : 'text-[#B8860B]'
            }`}
          >
            Pure, Excellence
          </span>
          <h2
            className={`font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase ${
              isDark ? 'text-[#F7F4EB]' : 'text-[#062B35]'
            }`}
          >
            GHRÉ Collection
          </h2>
          <p
            className={`mt-4 text-base sm:text-xl font-editorial italic ${
              isDark ? 'text-[#F3E5AB]' : 'text-[#B8860B]'
            }`}
          >
            Bespoke formulations crafted with pure prickly pear seed oil, silk peptides, and solar botanicals.
          </p>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2 px-4 sm:px-6 text-xs font-cinzel tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89028] text-[#062B35] font-bold shadow-md'
                  : isDark
                  ? 'bg-[#062c37] border border-[#D4AF37]/20 text-[#E8DCC4] hover:text-[#F3E5AB] hover:border-[#D4AF37]/50'
                  : 'bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#062B35] hover:text-[#B8860B] hover:border-[#D4AF37]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div
          className={`mt-16 p-8 border flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-[#062c37] via-[#083846] to-[#062c37] border-[#D4AF37]/30'
              : 'bg-gradient-to-r from-[#FAF7F2] via-[#F3EDE2] to-[#FAF7F2] border-[#D4AF37]/50 shadow-md'
          }`}
        >
          <div className="flex items-center gap-4">
            <GoldEmblem size={36} withGlow className="shrink-0 hidden sm:inline-flex" />
            <div>
              <h3
                className={`font-cinzel text-lg tracking-wide ${
                  isDark ? 'text-[#F7F4EB]' : 'text-[#062B35]'
                }`}
              >
                Need a Personalized Hair & Fragrance Consultation?
              </h3>
              <p
                className={`text-xs font-poppins font-light mt-1 ${
                  isDark ? 'text-[#B7CBD0]' : 'text-[#556E77]'
                }`}
              >
                Speak directly with a GHRÉ beauty concierge for tailor-made hair rituals and scent profiling.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateToPage('contact')}
            className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] font-cinzel text-xs font-semibold tracking-[0.2em] uppercase transition-all shrink-0 cursor-pointer"
          >
            Request VIP Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
