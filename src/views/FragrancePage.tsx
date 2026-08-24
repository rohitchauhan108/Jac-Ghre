import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, Eye, Heart, Check, Flower2, Droplet, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CAMPAIGN_IMAGES } from '../data/products';
import { GoldEmblem } from '../components/ui/GoldEmblem';

export const FragrancePage: React.FC = () => {
  const { addToCart, setQuickViewProduct, currencySymbol, currencyRate } = useShop();

  const edpProduct = PRODUCTS.find((p) => p.id === 'blossom-positano-edp') || PRODUCTS[6];
  const formattedPrice = `${currencySymbol}${(edpProduct.price * currencyRate).toFixed(0)}`;

  const [selectedSize, setSelectedSize] = useState('100 ML');

  return (
    <div className="pt-8 pb-28 bg-[#0C8A9B] min-h-screen">
      {/* Fragrance Header Banner */}
      <section className="relative py-20 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#097B8A] via-[#0C8A9B] to-[#097B8A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#097B8A] border border-[#D4AF37]/50 mb-4 shadow-md">
            <Flower2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              HAUTE PARFUMERIE • GRASSE ✕ POSITANO
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            Blossom Positano Eau de Parfum
          </h1>

          <p className="mt-4 max-w-2xl mx-auto font-editorial text-2xl sm:text-3xl italic text-[#D4AF37]">
            “The golden zest of Amalfi lemons dancing over sun-drenched orange blossoms.”
          </p>

          <p className="mt-3 max-w-2xl mx-auto font-poppins text-sm sm:text-base text-[#B5CAD0] font-normal leading-relaxed">
            Conceived during Jac Ghré's summer travels across the cliffside villas of Positano and distilled by fifth-generation master noses in Grasse, France.
          </p>
        </div>
      </section>

      {/* Main Fragrance Spotlight Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left: Product Artwork Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-lg bg-gradient-to-b from-[#0C8A9B] to-[#097B8A] border-2 border-[#D4AF37]/70 p-8 shadow-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
              <img
                src={CAMPAIGN_IMAGES.sunArt || edpProduct.image}
                alt="Blossom Positano Eau de Parfum"
                className="max-h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#097B8A]/90 border border-[#D4AF37]/40 text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-widest">
                Millésime Signature
              </div>
            </div>
          </div>

          {/* Right: Technical Fragrance Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
                EXTRAIT & EAU DE PARFUM
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#F7F4EB] uppercase mt-1">
                Blossom Positano
              </h2>
              <p className="font-editorial text-xl italic text-[#D4AF37] mt-1">
                The Essence of Mediterranean Sunshine
              </p>
            </div>

            <p className="font-poppins text-sm sm:text-base text-[#B5CAD0] leading-relaxed">
              Blossom Positano captures the intoxicating freshness of cliffside Italian citrus groves warmed by afternoon sea breezes. An elevated botanical bouquet that lingers delicately in hair and skin for over 16 hours.
            </p>

            {/* Olfactory Pyramid Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#097B8A] border border-[#D4AF37]/30">
                <span className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  Top Notes • Initial Burst
                </span>
                <p className="font-poppins text-xs sm:text-sm text-[#F7F4EB]">
                  Amalfi Primofiore Lemon, Italian Mandarin, Crisp Sunlit Bergamot
                </p>
              </div>

              <div className="p-4 bg-[#097B8A] border border-[#D4AF37]/30">
                <span className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  Heart Notes • Floral Radiance
                </span>
                <p className="font-poppins text-xs sm:text-sm text-[#F7F4EB]">
                  Grasse Orange Blossom (Neroli), Jasmine Grandiflorum, Coastal Sea Salt
                </p>
              </div>

              <div className="p-4 bg-[#097B8A] border border-[#D4AF37]/30">
                <span className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  Base Notes • Sensual Anchor
                </span>
                <p className="font-poppins text-xs sm:text-sm text-[#F7F4EB]">
                  Sun-Warmed Golden Amber, Mediterranean Cedarwood, White Silk Musk
                </p>
              </div>
            </div>

            {/* Purchase Box */}
            <div className="p-6 bg-[#097B8A] border-2 border-[#D4AF37]/50 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-cinzel font-bold text-[#F7F4EB]">
                    {formattedPrice}
                  </span>
                  <span className="block text-[11px] text-[#8EAAB0] font-poppins">
                    Complimentary luxury gold gift coffret included
                  </span>
                </div>
                <div className="flex gap-2">
                  {['50 ML', '100 ML'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-cinzel tracking-wider uppercase border transition-all ${
                        selectedSize === size
                          ? 'bg-[#D4AF37] text-[#0E4C5A] font-bold border-[#D4AF37]'
                          : 'bg-[#097B8A] text-[#B7CBD0] border-[#D4AF37]/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => addToCart(edpProduct)}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#0E4C5A] font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Blossom Positano ({selectedSize})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Discovery Scent Experience Coffret */}
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#097B8A] via-[#0C8A9B] to-[#097B8A] border-2 border-[#D4AF37]/50 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <span className="text-xs font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                THE DISCOVERY COFFRET
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F7F4EB] uppercase">
                Experience All GHRÉ Fragrances at Home
              </h3>
              <p className="font-poppins text-sm sm:text-base text-[#B5CAD0] max-w-xl">
                Receive 4 x 5ml luxury glass flacons of our iconic fragrances: Blossom Positano, Monoï Gardenia, Orange Blossom Riviera, and Mediterranean Citrus. Includes a $45 voucher redeemable on any full-size bottle.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={() => addToCart(edpProduct)}
                className="px-8 py-4 bg-[#097B8A] border-2 border-[#D4AF37] text-[#F3E5AB] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-[#0E4C5A] shadow-lg transition-all"
              >
                Order Discovery Coffret ($45)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
