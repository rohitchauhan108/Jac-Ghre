import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun, ShoppingBag, Eye, Heart, Droplets, Flame, Wind } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CAMPAIGN_IMAGES } from '../../data/products';

export const GoodHairDaySection: React.FC = () => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist, currencySymbol, currencyRate } = useShop();

  const sunProducts = PRODUCTS.filter((p) =>
    ['summer-glow-oil', 'body-watch-monoi', 'monoi-body-mist', 'orange-blossom-body-mist', 'citrus-body-mist'].includes(p.id)
  );

  const [activeTab, setActiveTab] = useState<'all' | 'oils' | 'mists'>('all');

  const filteredProducts = sunProducts.filter((p) => {
    if (activeTab === 'oils') return p.id.includes('oil') || p.id.includes('watch');
    if (activeTab === 'mists') return p.id.includes('mist');
    return true;
  });

  return (
    <section id="sun-body" className="relative py-24 sm:py-32 bg-[#006073] overflow-hidden">
      {/* Background with warm golden sun rays & deep ocean teal */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#007288] via-[#006073] to-[#006073]" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(6,60,72,0.25)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#006073] border border-[#D4AF37]/40 mb-3 shadow-md">
            <Sun className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] font-cinzel font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              SAINT-TROPEZ • MIAMI RIVIERA
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            GHRÉ SUN
          </h2>

          <p className="mt-3 text-lg sm:text-2xl font-editorial italic text-[#D4AF37]">
            “The Art of Sun-Kissed Beauty — Capturing the essence of the sun”
          </p>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />

          {/* Filter Pills */}
          <div className="mt-8 inline-flex p-1 bg-[#006073] border border-[#D4AF37]/30 shadow-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs font-cinzel tracking-[0.2em] uppercase transition-all ${
                activeTab === 'all'
                  ? 'bg-[#D4AF37] text-[#0E4C5A] font-bold'
                  : 'text-[#B0C5CA] hover:text-[#F3E5AB]'
              }`}
            >
              All Sun Creations (5)
            </button>
            <button
              onClick={() => setActiveTab('oils')}
              className={`px-5 py-2 text-xs font-cinzel tracking-[0.2em] uppercase transition-all ${
                activeTab === 'oils'
                  ? 'bg-[#D4AF37] text-[#0E4C5A] font-bold'
                  : 'text-[#B0C5CA] hover:text-[#F3E5AB]'
              }`}
            >
              Golden Oils & Cleansers
            </button>
            <button
              onClick={() => setActiveTab('mists')}
              className={`px-5 py-2 text-xs font-cinzel tracking-[0.2em] uppercase transition-all ${
                activeTab === 'mists'
                  ? 'bg-[#D4AF37] text-[#0E4C5A] font-bold'
                  : 'text-[#B0C5CA] hover:text-[#F3E5AB]'
              }`}
            >
              Body & Hair Mists
            </button>
          </div>
        </div>

        {/* Feature Hero Banner with Artwork Stage */}
        <div className="relative mb-14 border-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#006073] via-[#007288] to-[#006073] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,96,115,0.8)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual */}
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
              <img
                src={CAMPAIGN_IMAGES.sunArt}
                alt="GHRÉ SUN The Art of Sun-Kissed Beauty"
                className="w-full h-full object-cover object-center filter brightness-105 contrast-105 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#006073]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#006073]/90 border border-[#D4AF37]/40 text-[10px] font-cinzel tracking-[0.2em] text-[#D4AF37] uppercase">
                MEDITERRANEAN BOTANICAL HARVEST
              </div>
            </div>

            {/* Content Story */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <GoldEmblem size={22} />
                <span className="text-xs font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  HAUTE COUTURE RITUAL
                </span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F7F4EB] tracking-wide uppercase">
                Luminous Golden Glow From Head To Toe
              </h3>
              <p className="text-xs sm:text-sm text-[#B5CAD0] font-sans font-light leading-relaxed">
                Formulated under the radiant Mediterranean sun, the GHRÉ SUN collection combines pure Tahitian Monoï, golden micro-pearls, and delicate floral hydrosols. Each formulation is designed to protect, nourish, and impart an irresistible satin sheen to hair and skin.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => addToCart(sunProducts[0])}
                  className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#0E4C5A] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-lg transition-all"
                >
                  Acquire Summer Glow Oil ($78)
                </button>
                <button
                  onClick={() => setQuickViewProduct(sunProducts[0])}
                  className="px-5 py-3 bg-[#006073] border border-[#D4AF37]/50 text-[#F3E5AB] font-cinzel text-xs tracking-[0.15em] uppercase hover:bg-[#007288] transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((p, index) => {
            const isFavorited = isInWishlist(p.id);
            const formattedPrice = `${currencySymbol}${(p.price * currencyRate).toFixed(0)}`;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#006073] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500 shadow-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Top Badge & Heart */}
                <div className="p-4 pb-0 flex items-center justify-between">
                  <span className="text-[10px] font-cinzel tracking-[0.2em] text-[#D4AF37] uppercase font-semibold">
                    {p.badge}
                  </span>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Add to wishlist"
                    className="p-1.5 text-[#D4AF37] hover:text-[#FFF3C4]"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#D4AF37]' : ''}`} />
                  </button>
                </div>

                {/* Product Visual Container */}
                <div className="relative aspect-[4/3] w-full p-4 flex items-center justify-center overflow-hidden">
                  <div className="absolute w-36 h-36 rounded-full bg-[#D4AF37]/10 blur-xl pointer-events-none" />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,96,115,0.8)] group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 pt-2 flex-1 flex flex-col justify-between border-t border-[#D4AF37]/15 bg-[#006073]">
                  <div>
                    <h4
                      onClick={() => setQuickViewProduct(p)}
                      className="font-cinzel text-base font-bold text-[#F7F4EB] hover:text-[#F3E5AB] cursor-pointer transition-colors"
                    >
                      {p.name}
                    </h4>
                    <p className="text-xs font-editorial italic text-[#D4AF37] mt-0.5">
                      {p.tagline}
                    </p>
                    <p className="text-xs text-[#8EAAB0] font-sans font-light line-clamp-2 mt-2 leading-relaxed">
                      {p.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                    <div>
                      <span className="text-base font-cinzel font-bold text-[#F7F4EB]">
                        {formattedPrice}
                      </span>
                      <span className="block text-[10px] text-[#8EAAB0]">{p.size}</span>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="px-4 py-2 bg-[#D4AF37] text-[#0E4C5A] hover:brightness-110 font-cinzel text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
