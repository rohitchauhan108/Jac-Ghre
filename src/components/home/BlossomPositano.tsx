import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, Eye, Heart, Compass, Check } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CAMPAIGN_IMAGES } from '../../data/products';

export const BlossomPositano: React.FC = () => {
  const { addToCart, setQuickViewProduct, isInWishlist, toggleWishlist, currencySymbol, currencyRate } = useShop();
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');

  const perfume = PRODUCTS.find((p) => p.id === 'blossom-positano-edp') || PRODUCTS[6];
  const priceMultiplier = selectedSize === '50ml' ? 0.65 : 1.0;
  const currentPrice = `${currencySymbol}${(perfume.price * currencyRate * priceMultiplier).toFixed(0)}`;
  const isFavorited = isInWishlist(perfume.id);

  return (
    <section id="fragrance" className="relative py-24 sm:py-32 bg-[#05262e] overflow-hidden">
      {/* Background warm solar radiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041d24] via-[#062f3a] to-[#041d24]" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(247,208,70,0.12)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Fragrance Art Direction matching Reference 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Visual Frame */}
            <div className="relative z-10 overflow-hidden bg-gradient-to-b from-[#093d4a] to-[#031c22] border-2 border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-6 sm:p-10 flex flex-col items-center justify-center">
              {/* Top Eau de Parfum Badge */}
              <div className="relative z-20 flex items-center justify-between w-full mb-6">
                <span className="px-3 py-1 bg-[#041e25]/90 border border-[#D4AF37]/40 text-[10px] font-cinzel tracking-[0.25em] text-[#F3E5AB] uppercase">
                  Haute Parfumerie
                </span>
                <span className="text-[11px] font-cinzel tracking-widest text-[#D4AF37] font-semibold">
                  AMALFI COAST • GRASSE
                </span>
              </div>

              {/* Fragrance Bottle Showcase */}
              <div className="relative z-20 my-4 flex items-center justify-center aspect-square w-full max-w-sm">
                {/* Glow ring */}
                <div className="absolute w-64 h-64 rounded-full bg-[#D4AF37]/20 blur-2xl pointer-events-none" />
                <img
                  src={CAMPAIGN_IMAGES.blossom}
                  alt="Blossom Positano Eau de Parfum"
                  className="max-h-[360px] w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Quote Banner */}
              <div className="relative z-20 mt-4 text-center">
                <span className="text-xs font-editorial italic text-[#F3E5AB] block">
                  “A liquid ray of Italian sunshine captured in hand-cut French glass.”
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Fragrance Profile & Olfactory Notes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GoldEmblem size={20} />
                <span className="text-xs font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">
                  BLOSSOM GHRÉ
                </span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
                Blossom Positano
              </h2>

              <p className="text-lg sm:text-2xl font-editorial italic text-[#D4AF37] mt-1">
                NEW Citrus Zest — The Essence of Sunshine
              </p>

              <div className="h-0.5 w-20 bg-[#D4AF37] my-4" />
            </div>

            <p className="text-sm text-[#B7CBD0] font-sans font-light leading-relaxed">
              Inspired by the sunlit lemon terraces perched above the shimmering Tyrrhenian Sea. Blossom Positano opens with an invigorating burst of sparkling Amalfi lemon primofiore and Calabrian bergamot, dissolving gracefully into a lush heart of white orange blossom and solar jasmine before drying down into warm golden amber driftwood.
            </p>

            {/* Olfactory Pyramid Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#041e25] border border-[#D4AF37]/20 text-center">
                <span className="text-[10px] font-cinzel text-[#D4AF37] block uppercase tracking-wider mb-1">
                  Top Notes
                </span>
                <p className="text-xs text-[#F7F4EB] font-sans font-medium">
                  Amalfi Lemon, Bergamot
                </p>
              </div>

              <div className="p-3 bg-[#041e25] border border-[#D4AF37]/20 text-center">
                <span className="text-[10px] font-cinzel text-[#D4AF37] block uppercase tracking-wider mb-1">
                  Heart Notes
                </span>
                <p className="text-xs text-[#F7F4EB] font-sans font-medium">
                  Orange Blossom, Jasmine
                </p>
              </div>

              <div className="p-3 bg-[#041e25] border border-[#D4AF37]/20 text-center">
                <span className="text-[10px] font-cinzel text-[#D4AF37] block uppercase tracking-wider mb-1">
                  Base Notes
                </span>
                <p className="text-xs text-[#F7F4EB] font-sans font-medium">
                  Golden Amber, Cedar
                </p>
              </div>
            </div>

            {/* Flacon Size Selection */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-cinzel tracking-wider text-[#D4AF37] uppercase block">
                Select Flacon Size:
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedSize('50ml')}
                  className={`px-4 py-2 text-xs font-cinzel uppercase border transition-all ${
                    selectedSize === '50ml'
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#062B35] font-bold'
                      : 'border-[#D4AF37]/30 bg-[#041e25] text-[#E8DCC4] hover:border-[#D4AF37]'
                  }`}
                >
                  50ml / 1.7 fl.oz • {currencySymbol}{(perfume.price * currencyRate * 0.65).toFixed(0)}
                </button>
                <button
                  onClick={() => setSelectedSize('100ml')}
                  className={`px-4 py-2 text-xs font-cinzel uppercase border transition-all ${
                    selectedSize === '100ml'
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#062B35] font-bold'
                      : 'border-[#D4AF37]/30 bg-[#041e25] text-[#E8DCC4] hover:border-[#D4AF37]'
                  }`}
                >
                  100ml / 3.4 fl.oz • {currencySymbol}{(perfume.price * currencyRate).toFixed(0)} (Iconic)
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => addToCart(perfume)}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Flacon • {currentPrice}</span>
              </button>

              <button
                onClick={() => setQuickViewProduct(perfume)}
                className="p-3.5 border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#041e25] text-[#D4AF37] hover:bg-[#062c37] transition-all"
                title="Full Fragrance Notes"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleWishlist(perfume.id)}
                className="p-3.5 border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#041e25] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] transition-all"
                title="Add to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#D4AF37]' : ''}`} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
