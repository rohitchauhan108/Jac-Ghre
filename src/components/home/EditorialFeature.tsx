import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Droplets, Shield } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { CAMPAIGN_IMAGES } from '../../data/products';

export const EditorialFeature: React.FC = () => {
  return (
    <section id="hair-care" className="relative py-24 sm:py-32 bg-[#052932] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#052932] via-[#042028] to-[#041a22]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Asymmetrical Image Composition with Golden Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Outer offset gold border frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#D4AF37]/40 pointer-events-none hidden sm:block" />

            {/* Main Campaign Image */}
            <div className="relative z-10 overflow-hidden bg-[#041e25] border-2 border-[#D4AF37]/50 shadow-2xl">
              <img
                src={CAMPAIGN_IMAGES.heroModel}
                alt="The Art of Luxury Hair Care — GHRÉ Campaign"
                className="w-full aspect-[4/5] object-cover object-top filter brightness-100 hover:scale-105 transition-transform duration-700"
              />

              {/* Gold Crest in Bottom Corner */}
              <div className="absolute bottom-6 right-6 p-4 bg-[#041d24]/90 border border-[#D4AF37]/60 backdrop-blur-md">
                <GoldEmblem size={32} withGlow />
                <span className="block text-[9px] font-cinzel tracking-[0.25em] text-[#F3E5AB] uppercase mt-1 text-center font-bold">
                  GHRÉ PARIS
                </span>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-[#041d24]/90 border border-[#D4AF37]/40 backdrop-blur-md">
                <span className="text-[10px] font-cinzel font-semibold tracking-[0.25em] text-[#D4AF37] uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  Haute Trichology
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Typography & Formula Architecture */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            <div>
              <span className="text-xs font-cinzel font-semibold tracking-[0.35em] text-[#D4AF37] uppercase block mb-3">
                Parisian Hair Architecture
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.12em] text-[#F7F4EB] leading-tight uppercase">
                The Art of Luxury Hair Care
              </h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-[#D4AF37] to-transparent my-5" />
            </div>

            <p className="text-lg sm:text-xl font-editorial italic text-[#F3E5AB]">
              “Discover formulas inspired by nature and crafted for extraordinary beauty.”
            </p>

            <p className="text-sm text-[#B7CBD0] font-sans font-light leading-relaxed">
              Every GHRÉ creation is conceived at the nexus of clinical trichology and sensorial indulgence. By marrying cold-pressed Mediterranean botanical extracts with hydrolyzed silk micro-proteins and bamboo marrow, we restore inner cellular tensile strength while wrapping each fiber in weightless, mirror-like reflectivity.
            </p>

            {/* 3 Formula Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 bg-[#031d25]/80 border border-[#D4AF37]/20">
                <Droplets className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-[#F7F4EB] uppercase tracking-wider">
                    Cold-Pressed Botanical Potency
                  </h4>
                  <p className="text-[11px] text-[#8EAAB0] mt-0.5 font-light">
                    Unheated extraction preserves 100% of organic vitamins, polyphenols, and essential omegas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#031d25]/80 border border-[#D4AF37]/20">
                <Shield className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-[#F7F4EB] uppercase tracking-wider">
                    Anti-Humidity & Coastal UV Shield
                  </h4>
                  <p className="text-[11px] text-[#8EAAB0] mt-0.5 font-light">
                    Engineered to protect hair through the intense sun and humidity of Miami and Saint-Tropez.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#collection"
                className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:brightness-110 shadow-lg flex items-center gap-2 group transition-all"
              >
                <span>Explore Hair Care</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
