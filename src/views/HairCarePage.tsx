import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Droplets, Shield, Flame, Check, ShoppingBag, Eye, Heart, HelpCircle, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CAMPAIGN_IMAGES } from '../data/products';
import { GoldEmblem } from '../components/ui/GoldEmblem';

export const HairCarePage: React.FC = () => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist, currencySymbol, currencyRate } = useShop();

  const [hairType, setHairType] = useState('dry-damaged');
  const [concern, setConcern] = useState('repair');

  const hairProducts = PRODUCTS.filter(
    (p) => p.category === 'haircare' || p.category === 'elixir'
  );

  const getRecommendedRoutine = () => {
    return [
      PRODUCTS.find((p) => p.id === 'repair-shampoo') || PRODUCTS[0],
      PRODUCTS.find((p) => p.id === 'regenerating-mask') || PRODUCTS[2],
      PRODUCTS.find((p) => p.id === 'prickly-pear-gold-oil') || PRODUCTS[4],
    ];
  };

  const recommendedProducts = getRecommendedRoutine();

  return (
    <div className="pt-8 pb-28 bg-[#0C8A9B] min-h-screen">
      {/* Header Banner */}
      <section className="relative py-20 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#097B8A] via-[#0C8A9B] to-[#097B8A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#097B8A] border border-[#D4AF37]/50 mb-4 shadow-md">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              HAUTE COIFFURE RITUALS
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            Haute Hair Care Formulations
          </h1>

          <p className="mt-4 max-w-2xl mx-auto font-editorial text-2xl sm:text-3xl italic text-[#D4AF37]">
            “Transformative Moroccan Prickly Pear, Bamboo Marrow & Hydrolyzed Silk.”
          </p>

          <p className="mt-3 max-w-2xl mx-auto font-poppins text-sm sm:text-base text-[#B5CAD0] font-normal leading-relaxed">
            Every formula is engineered to cellularly reconstruct damaged keratin bonds, seal the hair cuticle with mirror shine, and provide humidity-proof resilience.
          </p>
        </div>
      </section>

      {/* Routine Diagnostic Builder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#0C8A9B] via-[#097B8A] to-[#097B8A] border-2 border-[#D4AF37]/60 shadow-2xl mb-24 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <GoldEmblem size={26} withGlow className="mb-2" />
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F7F4EB] uppercase">
              Atelier Hair Diagnostic & Prescription
            </h2>
            <p className="font-poppins text-sm text-[#B5CAD0] mt-2">
              Select your hair profile for a personalized 3-step master routine formulated by Jac Ghré.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Hair Type Selector */}
            <div className="bg-[#097B8A] p-6 border border-[#D4AF37]/30">
              <label className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-3">
                1. Select Hair Texture & State
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'dry-damaged', label: 'Dry & Bleached / Chemically Treated' },
                  { id: 'fine-fragile', label: 'Fine, Limp & Fragile' },
                  { id: 'frizzy-curly', label: 'Curly, Coarse & Humidity-Sensitive' },
                  { id: 'sun-exposed', label: 'Sun, Salt & Beach Damaged' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHairType(item.id)}
                    className={`p-3 text-left border text-xs font-poppins transition-all ${
                      hairType === item.id
                        ? 'border-[#D4AF37] bg-[#097B8A] text-[#F7F4EB] font-medium shadow-md'
                        : 'border-[#D4AF37]/20 bg-[#097B8A] text-[#8EAAB0] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Concern */}
            <div className="bg-[#097B8A] p-6 border border-[#D4AF37]/30">
              <label className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-3">
                2. Primary Transformation Goal
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'repair', label: 'Intensive Keratin & Cortex Repair' },
                  { id: 'shine', label: 'Ultra High-Gloss & Glass Silk Shine' },
                  { id: 'anti-frizz', label: 'All-Day Humidity & Heat Resistance' },
                  { id: 'color-protect', label: 'Balayage Vibrancy & Color Lock' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setConcern(item.id)}
                    className={`p-3 text-left border text-xs font-poppins transition-all ${
                      concern === item.id
                        ? 'border-[#D4AF37] bg-[#097B8A] text-[#F7F4EB] font-medium shadow-md'
                        : 'border-[#D4AF37]/20 bg-[#097B8A] text-[#8EAAB0] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Recommendation Results */}
          <div className="border-t border-[#D4AF37]/30 pt-8">
            <span className="text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4AF37] uppercase block text-center mb-6">
              Your Prescribed 3-Step Atelier Hair Ritual
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedProducts.map((p, idx) => {
                const formattedPrice = `${currencySymbol}${(p.price * currencyRate).toFixed(0)}`;
                return (
                  <div
                    key={p.id}
                    className="p-5 bg-[#097B8A] border border-[#D4AF37]/40 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-widest">
                          STEP 0{idx + 1}
                        </span>
                        <span className="text-xs text-[#8EAAB0] font-poppins">{p.size}</span>
                      </div>
                      <div className="aspect-square flex items-center justify-center p-3 bg-[#097B8A] border border-[#D4AF37]/20 mb-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,96,115,0.85)]"
                        />
                      </div>
                      <h4 className="font-cinzel text-sm font-bold text-[#F7F4EB] line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#8EAAB0] font-poppins mt-1 line-clamp-2">
                        {p.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                      <span className="text-sm font-cinzel font-bold text-[#F7F4EB]">
                        {formattedPrice}
                      </span>
                      <button
                        onClick={() => addToCart(p)}
                        className="px-3.5 py-1.5 bg-[#D4AF37] text-[#0E4C5A] font-cinzel text-[11px] font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Complete Hair Care Catalog Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-cinzel text-3xl font-bold uppercase text-[#F7F4EB]">
              The Full Hair Care Collection
            </h3>
            <p className="font-editorial text-xl italic text-[#D4AF37] mt-1">
              “Crafted with artisanal care in Paris and Saint-Tropez.”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hairProducts.map((p) => {
              const formattedPrice = `${currencySymbol}${(p.price * currencyRate).toFixed(0)}`;
              return (
                <div
                  key={p.id}
                  className="bg-[#097B8A] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all p-6 flex flex-col justify-between shadow-xl group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-cinzel font-semibold tracking-widest text-[#D4AF37] uppercase">
                        {p.badge || 'Haute Coiffure'}
                      </span>
                      <span className="text-xs text-[#8EAAB0] font-poppins">{p.size}</span>
                    </div>

                    <div className="aspect-square flex items-center justify-center p-4 bg-[#097B8A] border border-[#D4AF37]/20 my-3 relative overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,96,115,0.85)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <h4
                      onClick={() => setQuickViewProduct(p)}
                      className="font-cinzel text-base sm:text-lg font-bold text-[#F7F4EB] hover:text-[#D4AF37] cursor-pointer transition-colors"
                    >
                      {p.name}
                    </h4>
                    <p className="text-xs font-editorial italic text-[#D4AF37] mt-1">
                      {p.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#8EAAB0] font-poppins mt-2 leading-relaxed line-clamp-3">
                      {p.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <span className="text-xl font-cinzel font-bold text-[#F7F4EB]">
                      {formattedPrice}
                    </span>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-4 py-2 bg-[#D4AF37] text-[#0E4C5A] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Acquire</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
