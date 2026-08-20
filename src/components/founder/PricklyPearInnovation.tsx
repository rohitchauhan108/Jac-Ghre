import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, Eye, ShieldCheck, Droplets, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { GoldEmblem } from '../ui/GoldEmblem';

export const PricklyPearInnovation: React.FC = () => {
  const { addToCart, setQuickViewProduct, navigateToPage } = useShop();

  // Find the signature prickly pear oil elixir or top hair care product
  const elixirProduct = PRODUCTS.find((p) => p.id === 'elixir-reparatrice' || p.category === 'haircare' || p.category === 'elixir') || PRODUCTS[0];

  return (
    <section className="relative py-24 bg-[#021116] overflow-hidden border-b border-[#D4AF37]/30">
      {/* Golden Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border-2 border-[#D4AF37] bg-gradient-to-br from-[#04242e]/95 via-[#031d25]/95 to-[#021319]/95 p-8 sm:p-14 shadow-2xl relative">
          {/* Corner Gold Accent Brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Product Flacon Presentation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-sm bg-[#021319] border border-[#D4AF37]/60 p-6 shadow-2xl group overflow-hidden">
                <img
                  src={elixirProduct.image}
                  alt="Jac Ghré Prickly Pear Oil Elixir"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021319]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-3 py-1 bg-[#031d25]/90 border border-[#D4AF37]/60 text-[10px] font-cinzel font-bold text-[#D4AF37] uppercase">
                  SIGNATURE FORMULA
                </div>

                <div className="absolute bottom-4 inset-x-4 flex gap-2">
                  <button
                    onClick={() => setQuickViewProduct(elixirProduct)}
                    className="flex-1 py-2.5 bg-[#031d25]/90 hover:bg-[#073946] border border-[#D4AF37]/70 text-[#F3E5AB] font-cinzel text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                  <button
                    onClick={() => addToCart(elixirProduct)}
                    className="flex-1 py-2.5 bg-[#D4AF37] hover:bg-[#E5C365] text-[#062B35] font-cinzel text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Formulation Details from Client Specification */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#021319] border border-[#D4AF37]/40">
                <Droplets className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] font-cinzel font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                  INNOVATION BY JAC GHRÉ BEAUTY EXPERT
                </span>
              </div>

              <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF9F3] uppercase leading-tight">
                Prickly Pear Oil Elixir <span className="text-[#D4AF37] block text-xl sm:text-2xl mt-1 font-normal">Luxury Hair Care</span>
              </h3>

              <p className="font-outfit text-sm sm:text-base text-[#C2D6DC] font-light leading-relaxed">
                “JAC GHRÉ Beauty Expert creates innovative luxurious prickly pear oil formula with Keratine vitamins and antioxidants for ultimate hair replenishment.”
              </p>

              {/* Formulation Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 bg-[#021319] border border-[#D4AF37]/30 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs font-outfit text-[#E2EDF0]">
                    <strong>Cold-Pressed Prickly Pear:</strong> Rich in precious Vitamin E & botanical sterols.
                  </span>
                </div>

                <div className="p-3.5 bg-[#021319] border border-[#D4AF37]/30 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs font-outfit text-[#E2EDF0]">
                    <strong>Keratin Vitamin Complex:</strong> Rebuilds damaged hair cuticles instantly.
                  </span>
                </div>

                <div className="p-3.5 bg-[#021319] border border-[#D4AF37]/30 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs font-outfit text-[#E2EDF0]">
                    <strong>Solar & Salt Defense:</strong> Shields against harsh coastal UV radiation.
                  </span>
                </div>

                <div className="p-3.5 bg-[#021319] border border-[#D4AF37]/30 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs font-outfit text-[#E2EDF0]">
                    <strong>Weightless Mirror Shine:</strong> Ultra-clean silky texture without build-up.
                  </span>
                </div>
              </div>

              {/* Price & Direct Actions */}
              <div className="pt-4 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-cinzel text-[#8EAAB0] uppercase tracking-wider block">Bespoke Flacon 100ml</span>
                  <span className="font-cinzel text-2xl font-bold text-[#D4AF37]">${elixirProduct.price} USD</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigateToPage('hair-care')}
                    className="px-5 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-colors"
                  >
                    View Hair Ritual
                  </button>
                  <button
                    onClick={() => addToCart(elixirProduct)}
                    className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C365] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.2em] uppercase shadow-xl transition-colors cursor-pointer"
                  >
                    Acquire Elixir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
