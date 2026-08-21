import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BOTANICAL_INGREDIENTS } from '../../data/products';
import { GoldEmblem } from '../ui/GoldEmblem';
import { Sparkles, MapPin, Droplet, ArrowUpRight } from 'lucide-react';

export const IngredientStory: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(BOTANICAL_INGREDIENTS[0]);

  return (
    <section id="ingredients" className="relative py-24 sm:py-32 bg-[#006073] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#006073] via-[#007288] to-[#006073]" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GoldEmblem size={22} />
          </div>
          <span className="text-xs font-cinzel font-semibold tracking-[0.35em] text-[#D4AF37] uppercase block mb-2">
            Haute Phyto-Cosmetics
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.14em] text-[#F7F4EB] uppercase">
            Inspired By Nature
          </h2>
          <p className="mt-3 text-lg sm:text-2xl font-editorial italic text-[#F3E5AB]">
            “Botanical inspiration meets refined beauty rituals.”
          </p>
          <div className="h-0.5 w-20 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Interactive Botanical Grid / Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Ingredients Selector List */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
            {BOTANICAL_INGREDIENTS.map((item) => {
              const isSelected = selectedIngredient.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIngredient(item)}
                  className={`p-4 cursor-pointer transition-all duration-300 border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#007288] border-[#D4AF37] shadow-lg translate-x-1.5'
                      : 'bg-[#006073]/80 border-[#D4AF37]/15 hover:border-[#D4AF37]/50 hover:bg-[#007288]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#062B35] border-[#D4AF37]'
                          : 'bg-[#006073] text-[#D4AF37] border-[#D4AF37]/30 group-hover:border-[#D4AF37]'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm text-[#F7F4EB] tracking-wide group-hover:text-[#F3E5AB]">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-editorial italic text-[#D4AF37]/80 block">
                        {item.frenchName}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-cinzel text-[#8EAAB0] uppercase tracking-wider hidden sm:inline-block">
                    {item.accentNote}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Focused Botanical Spotlight Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedIngredient.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="h-full bg-gradient-to-b from-[#007288] to-[#006073] border border-[#D4AF37]/50 p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Background ambient plant photo subtle overlay */}
              <div className="absolute top-0 right-0 w-80 h-80 opacity-15 pointer-events-none">
                <img
                  src={selectedIngredient.image}
                  alt={selectedIngredient.name}
                  className="w-full h-full object-cover rounded-full filter blur-xl"
                />
              </div>

              <div>
                {/* Origin tag */}
                <div className="flex items-center justify-between mb-4 border-b border-[#D4AF37]/20 pb-3">
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#F3E5AB]">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Origin: {selectedIngredient.origin}</span>
                  </div>
                  <span className="px-3 py-1 bg-[#006073] border border-[#D4AF37]/30 text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-widest">
                    Pure Extraction
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F7F4EB] tracking-wide">
                  {selectedIngredient.name}
                </h3>
                <span className="text-sm font-editorial italic text-[#D4AF37] block mt-1 mb-4">
                  {selectedIngredient.frenchName}
                </span>

                <p className="text-xs sm:text-sm text-[#C5D5D8] font-sans font-light leading-relaxed mb-6">
                  {selectedIngredient.description}
                </p>

                {/* Key Benefits Pills */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase block">
                    Observed Clinical Benefits:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedIngredient.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-[#006073] border border-[#D4AF37]/20 text-[11px] text-[#F7F4EB] font-sans flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom discovery strip */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs">
                <span className="font-cinzel text-[#8EAAB0] uppercase tracking-wider text-[11px]">
                  Featured in GHRÉ Haute Haircare & Scent de Fleur Mists
                </span>
                <a
                  href="#collection"
                  className="font-cinzel text-[#D4AF37] hover:text-[#FFF3C4] uppercase tracking-[0.2em] font-semibold flex items-center gap-1"
                >
                  <span>Shop Rituals</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
