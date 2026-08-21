import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun, Droplets, ShoppingBag, Eye, Heart, Flame, Shield, Palmtree } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CAMPAIGN_IMAGES } from '../data/products';
import { GoldEmblem } from '../components/ui/GoldEmblem';

export const SunBodyPage: React.FC = () => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist, currencySymbol, currencyRate } = useShop();

  const sunProducts = PRODUCTS.filter((p) => p.category === 'bodycare');

  return (
    <div className="pt-8 pb-28 bg-[#007288] min-h-screen">
      {/* Sun Header Banner */}
      <section className="relative py-20 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#006073] via-[#007288] to-[#006073] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#006073] border border-[#D4AF37]/50 mb-4 shadow-md">
            <Sun className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              GHRÉ SUN • ST-TROPEZ ✕ MIAMI
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            Sun, Shimmer & Botanical Body
          </h1>

          <p className="mt-4 max-w-2xl mx-auto font-editorial text-2xl sm:text-3xl italic text-[#D4AF37]">
            “The golden alchemy of Tahitian Monoï, golden micro-pearls, and Mediterranean citrus.”
          </p>

          <p className="mt-3 max-w-2xl mx-auto font-poppins text-sm sm:text-base text-[#B5CAD0] font-normal leading-relaxed">
            Crafted for sun-worshippers who demand pure botanical protection, irresistible shimmer reflectivity, and all-day hydration under the Caribbean and French Riviera sun.
          </p>
        </div>
      </section>

      {/* Sun Collection Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Featured Editorial Split: Summer Glow Oil vs Body Watch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Summer Glow Card */}
          <div className="bg-gradient-to-br from-[#007288] to-[#006073] border-2 border-[#D4AF37]/60 p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold uppercase tracking-wider">
                  Hero Sun Creation
                </span>
                <span className="font-cinzel text-sm text-[#F3E5AB]">100 ML / 3.4 FL OZ</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F7F4EB] uppercase">
                GHRÉ Summer Glow Oil
              </h2>
              <p className="font-editorial text-lg italic text-[#D4AF37] mt-1">
                Huile Solaire Pailletée • 24K Golden Refraction
              </p>
              <p className="font-poppins text-sm sm:text-base text-[#B5CAD0] mt-3 leading-relaxed">
                Suspends multi-tonal gold micro-pearls in a dry-touch botanical oil matrix. Enhances your natural tan, hydrates dry skin, and leaves hair glistening without greasiness.
              </p>
              <div className="my-6 aspect-video bg-[#006073] border border-[#D4AF37]/30 flex items-center justify-center p-4">
                <img
                  src={PRODUCTS.find((p) => p.id === 'summer-glow-oil')?.image || CAMPAIGN_IMAGES.sunArt}
                  alt="Summer Glow Oil"
                  className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <span className="text-2xl font-cinzel font-bold text-[#F7F4EB]">
                  {currencySymbol}{(PRODUCTS.find((p) => p.id === 'summer-glow-oil')?.price || 78) * currencyRate}
                </span>
              </div>
              <button
                onClick={() => {
                  const p = PRODUCTS.find((item) => item.id === 'summer-glow-oil');
                  if (p) addToCart(p);
                }}
                className="px-6 py-3 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Summer Glow</span>
              </button>
            </div>
          </div>

          {/* Body Watch Cleanser */}
          <div className="bg-gradient-to-br from-[#007288] to-[#006073] border-2 border-[#D4AF37]/60 p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[#006073] border border-[#D4AF37]/50 text-[#D4AF37] font-cinzel text-xs font-bold uppercase tracking-wider">
                  Post-Sun Cleanser
                </span>
                <span className="font-cinzel text-sm text-[#F3E5AB]">250 ML / 8.4 FL OZ</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F7F4EB] uppercase">
                GHRÉ Body Watch Monoï
              </h2>
              <p className="font-editorial text-lg italic text-[#D4AF37] mt-1">
                Gel Douche Haute Hydratation • Tahitian Flower Essence
              </p>
              <p className="font-poppins text-sm sm:text-base text-[#B5CAD0] mt-3 leading-relaxed">
                A gentle foaming botanical bath elixir that dissolves sea salt, sunscreen residues, and environmental impurities while soothing sun-heated skin with aloe and coconut monoï.
              </p>
              <div className="my-6 aspect-video bg-[#006073] border border-[#D4AF37]/30 flex items-center justify-center p-4">
                <img
                  src={PRODUCTS.find((p) => p.id === 'body-watch-monoi')?.image || CAMPAIGN_IMAGES.sunArt}
                  alt="Body Watch Monoï"
                  className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <span className="text-2xl font-cinzel font-bold text-[#F7F4EB]">
                  {currencySymbol}{(PRODUCTS.find((p) => p.id === 'body-watch-monoi')?.price || 56) * currencyRate}
                </span>
              </div>
              <button
                onClick={() => {
                  const p = PRODUCTS.find((item) => item.id === 'body-watch-monoi');
                  if (p) addToCart(p);
                }}
                className="px-6 py-3 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Body Watch</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Scented Botanical Body Mists Showcase */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <GoldEmblem size={24} withGlow className="mb-2" />
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase text-[#F7F4EB]">
              The Scented Riviera Mists & Oils
            </h2>
            <p className="font-editorial text-xl italic text-[#D4AF37] mt-1">
              “Weightless hydration veil for hair, body, and beachside indulgence.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sunProducts.map((mist) => {
              const formattedPrice = `${currencySymbol}${(mist.price * currencyRate).toFixed(0)}`;
              return (
                <div
                  key={mist.id}
                  className="bg-[#006073] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all p-6 flex flex-col justify-between shadow-xl group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-cinzel font-semibold tracking-widest text-[#D4AF37] uppercase">
                        {mist.badge || 'Body & Sun'}
                      </span>
                      <span className="text-xs text-[#8EAAB0] font-poppins">{mist.size}</span>
                    </div>

                    <div className="aspect-square flex items-center justify-center p-4 bg-[#006073] border border-[#D4AF37]/20 my-3">
                      <img
                        src={mist.image}
                        alt={mist.name}
                        className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <h3
                      onClick={() => setQuickViewProduct(mist)}
                      className="font-cinzel text-lg font-bold text-[#F7F4EB] hover:text-[#D4AF37] cursor-pointer"
                    >
                      {mist.name}
                    </h3>
                    <p className="text-xs font-editorial italic text-[#D4AF37] mt-1">
                      {mist.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#8EAAB0] font-poppins mt-2 leading-relaxed">
                      {mist.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <span className="text-xl font-cinzel font-bold text-[#F7F4EB]">
                      {formattedPrice}
                    </span>
                    <button
                      onClick={() => addToCart(mist)}
                      className="px-4 py-2 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resort Ritual Guide */}
        <div className="p-8 sm:p-12 bg-[#006073] border-2 border-[#D4AF37]/50 shadow-2xl">
          <h3 className="font-cinzel text-2xl font-bold text-[#F7F4EB] uppercase text-center mb-8">
            The Saint-Tropez to Miami Beach Ritual
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#006073] border border-[#D4AF37]/25">
              <span className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">
                01. Morning Preparation
              </span>
              <p className="font-poppins text-xs sm:text-sm text-[#B5CAD0] leading-relaxed">
                Spritz Orange Blossom or Citrus Energy Mist over hair and shoulders to create an antioxidant barrier and invigorating sensory aura before sun exposure.
              </p>
            </div>

            <div className="p-5 bg-[#006073] border border-[#D4AF37]/25">
              <span className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">
                02. Afternoon Beachside
              </span>
              <p className="font-poppins text-xs sm:text-sm text-[#B5CAD0] leading-relaxed">
                Smooth 2-3 drops of Summer Glow Oil across collarbones, legs, and hair ends to capture sun rays with golden micro-pearl luminescence.
              </p>
            </div>

            <div className="p-5 bg-[#006073] border border-[#D4AF37]/25">
              <span className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">
                03. Sunset Soirée
              </span>
              <p className="font-poppins text-xs sm:text-sm text-[#B5CAD0] leading-relaxed">
                Cleanse with Body Watch Monoï to cool down skin, then mist generously with Monoï Tahitian Gardenia Mist for unforgettable evening sillage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
