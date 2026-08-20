import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, ShieldCheck, Heart, Droplets, Wind, Sun, Check, ArrowRight } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const ProductSpotlight: React.FC = () => {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct, currencySymbol, currencyRate } = useShop();
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'composition' | 'notes' | 'benefits'>('composition');

  const spotlightProducts = [PRODUCTS[0], PRODUCTS[1]]; // 1. Repair Shampoo and 9. Oil Hair & Body
  const product = spotlightProducts[selectedProductIndex];
  const isFavorited = isInWishlist(product.id);

  return (
    <section id="spotlight" className="relative py-24 sm:py-32 bg-[#041a22] overflow-hidden">
      {/* Background multi-layer radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#052932] via-[#031c24] to-[#041a22]" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(6,75,90,0.25)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative Gold Geometric Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#D4AF37]/10 rounded-full pointer-events-none animate-[spin_180s_linear_infinite]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GoldEmblem size={24} withGlow />
          </div>
          <span className="text-xs font-cinzel font-semibold tracking-[0.35em] text-[#D4AF37] uppercase block mb-2">
            Signature Creation Spotlight
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.14em] text-[#F7F4EB] uppercase">
            Pure, Excellence
          </h2>
          <p className="mt-3 text-base sm:text-xl font-editorial italic text-[#F3E5AB]">
            Explore the precise formulations of our flagship Parisian master creations.
          </p>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />

          {/* Product Switcher Pills */}
          <div className="mt-8 inline-flex p-1.5 bg-[#03151b]/90 border border-[#D4AF37]/40 shadow-xl backdrop-blur-md">
            {spotlightProducts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProductIndex(idx);
                  setActiveTab('composition');
                }}
                className={`px-5 py-2.5 text-xs font-cinzel tracking-[0.2em] uppercase transition-all duration-300 ${
                  selectedProductIndex === idx
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#062B35] font-bold shadow-md'
                    : 'text-[#C5D8DC] hover:text-[#F3E5AB]'
                }`}
              >
                {idx === 0 ? '1. GHRÉ Repair Shampoo' : '9. GHRÉ Oil Hair & Body'}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Layout Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left: Luxury Product Display Box */}
            <div className="lg:col-span-5 relative">
              <div className="p-8 sm:p-10 bg-gradient-to-b from-[#06333f] via-[#04242d] to-[#02181e] border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col items-center group">
                {/* Corner Accent Ornaments */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

                {/* Top Badge & Price */}
                <div className="w-full flex items-center justify-between border-b border-[#D4AF37]/25 pb-3.5 mb-6">
                  <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#F3E5AB] uppercase font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {product.badge}
                  </span>
                  <span className="text-sm font-cinzel text-[#F3E5AB] font-bold tracking-wider">
                    {currencySymbol}{(product.price * currencyRate).toFixed(0)}
                  </span>
                </div>

                {/* Product Image Stage */}
                <div className="relative my-2 flex items-center justify-center h-84 w-full overflow-hidden">
                  <div className="absolute w-60 h-60 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Product Name & Tagline */}
                <h3 className="font-cinzel text-2xl font-bold text-[#F7F4EB] text-center tracking-wide mt-4 uppercase">
                  {product.name}
                </h3>
                <p className="text-xs font-editorial italic text-[#D4AF37] text-center block mt-1 tracking-wider">
                  {product.tagline}
                </p>
                <span className="text-[11px] font-sans text-[#8EAAB0] mt-1 tracking-widest uppercase">
                  {product.size}
                </span>

                {/* Action Buttons */}
                <div className="w-full mt-6 flex items-center gap-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acquire Creation</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                    className="p-3.5 border border-[#D4AF37]/40 bg-[#031a22] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#D4AF37]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Technical Poster Specification Matrix */}
            <div className="lg:col-span-7 space-y-6">
              {/* Feature Header Banner */}
              <div className="p-6 bg-[#031d25]/90 border border-[#D4AF37]/40 backdrop-blur-md relative">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                    {selectedProductIndex === 0 ? 'HAUTE PURIFYING TRICHOLOGY' : 'COLD-PRESSED PHYTO-ELIXIR'}
                  </span>
                  <span className="text-[11px] font-editorial italic text-[#F3E5AB]">
                    GHRÉ COLLECTION • PURE, EXCELLENCE
                  </span>
                </div>
                <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F7F4EB] tracking-wide">
                  {product.tagline}
                </h4>
                <p className="text-xs sm:text-sm text-[#B5CAD0] font-sans font-light mt-2 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Tabs Navigation */}
              <div className="flex items-center gap-2 border-b border-[#D4AF37]/30 pb-3">
                <button
                  onClick={() => setActiveTab('composition')}
                  className={`px-5 py-2 text-xs font-cinzel tracking-[0.2em] uppercase transition-all ${
                    activeTab === 'composition'
                      ? 'text-[#F3E5AB] font-bold border-b-2 border-[#D4AF37]'
                      : 'text-[#8EAAB0] hover:text-[#D4AF37]'
                  }`}
                >
                  Composition
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-5 py-2 text-xs font-cinzel tracking-[0.2em] uppercase transition-all ${
                    activeTab === 'notes'
                      ? 'text-[#F3E5AB] font-bold border-b-2 border-[#D4AF37]'
                      : 'text-[#8EAAB0] hover:text-[#D4AF37]'
                  }`}
                >
                  Scent Notes
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`px-5 py-2 text-xs font-cinzel tracking-[0.2em] uppercase transition-all ${
                    activeTab === 'benefits'
                      ? 'text-[#F3E5AB] font-bold border-b-2 border-[#D4AF37]'
                      : 'text-[#8EAAB0] hover:text-[#D4AF37]'
                  }`}
                >
                  Key Benefits
                </button>
              </div>

              {/* Tab 1: Composition */}
              {activeTab === 'composition' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {product.composition?.map((item, i) => (
                      <div key={i} className="p-4 bg-[#031d25] border border-[#D4AF37]/25 flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                        <div>
                          <h5 className="font-cinzel text-xs font-bold text-[#F7F4EB] tracking-wider uppercase">
                            {item}
                          </h5>
                          <p className="text-[11px] text-[#8EAAB0] font-sans mt-0.5">
                            Active high-purity botanical grade
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#052b36] border border-[#D4AF37]/35 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-xs font-cinzel tracking-wider text-[#F3E5AB] uppercase">
                        Sulfate-Free • Paraben-Free • UV Protection Shield
                      </span>
                    </div>
                    <span className="text-[11px] font-editorial italic text-[#D4AF37]">Paris Tested</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Scent Notes */}
              {activeTab === 'notes' && (
                <div className="p-6 bg-[#031d25] border border-[#D4AF37]/30 space-y-5">
                  <div className="text-center pb-4 border-b border-[#D4AF37]/20">
                    <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">
                      Olfactory Signature
                    </span>
                    <h5 className="font-editorial text-2xl italic text-[#F3E5AB]">
                      {product.scentNotes?.displaySummary}
                    </h5>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-[#04242e] border border-[#D4AF37]/20">
                      <span className="text-[10px] font-cinzel tracking-widest text-[#D4AF37] uppercase block">Top</span>
                      <p className="text-xs text-[#F7F4EB] font-sans mt-1">Calabrian Bergamot & Lemon Zest</p>
                    </div>
                    <div className="p-3 bg-[#04242e] border border-[#D4AF37]/20">
                      <span className="text-[10px] font-cinzel tracking-widest text-[#D4AF37] uppercase block">Heart</span>
                      <p className="text-xs text-[#F7F4EB] font-sans mt-1">Orange Blossom & Bamboo</p>
                    </div>
                    <div className="p-3 bg-[#04242e] border border-[#D4AF37]/20">
                      <span className="text-[10px] font-cinzel tracking-widest text-[#D4AF37] uppercase block">Base</span>
                      <p className="text-xs text-[#F7F4EB] font-sans mt-1">Warm Golden Amber</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Benefits */}
              {activeTab === 'benefits' && (
                <div className="space-y-3">
                  {product.benefits?.map((benefit, i) => (
                    <div key={i} className="p-4 bg-[#031d25] border border-[#D4AF37]/20 flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#D5E5E8] font-sans font-light">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick View Full Dossier */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="inline-flex items-center gap-2 text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF37] hover:text-[#FFF3C4] transition-colors uppercase group"
                >
                  <span>Examine Full Clinical Dossier</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
