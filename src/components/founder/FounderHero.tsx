import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Scissors, MapPin, Award, Globe, ShieldCheck } from 'lucide-react';
import { CAMPAIGN_IMAGES } from '../../data/products';
import { GoldEmblem } from '../ui/GoldEmblem';
import { BrandLogo } from '../ui/BrandLogo';

export const FounderHero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 bg-gradient-to-b from-[#006073] via-[#007288] to-[#006073] overflow-hidden border-b border-[#D4AF37]/30">
      {/* Subtle Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(212,175,55,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow & Brand Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#006073] border border-[#D4AF37]/50 mb-4 shadow-lg">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#F3E5AB] uppercase">
              BEAUTY EXPERT & VISIONARY
            </span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.1em] text-[#FBF9F3] uppercase">
            JAC GHRÉ
          </h1>
          <p className="font-cinzel text-sm sm:text-lg tracking-[0.35em] text-[#D4AF37] uppercase font-semibold mt-1">
            THE MAN. THE NAME.
          </p>

          <p className="mt-5 font-playfair text-xl sm:text-2xl lg:text-3xl italic text-[#F3E5AB]">
            “Making women beautiful is my passion.”
          </p>
          <span className="text-xs font-cinzel tracking-[0.3em] text-[#8EAAB0] uppercase block mt-1">
            — JAC GHRÉ
          </span>
        </div>

        {/* Hero Grid with High-Res Portrait and Executive Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Framed High-Fashion Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative aspect-[3/4] w-full max-w-md bg-gradient-to-b from-[#007288] to-[#006073] border-2 border-[#D4AF37] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,96,115,0.85)]">
              {/* Corner Gold Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

              <div className="relative w-full h-full overflow-hidden bg-[#006073]">
                <img
                  src={CAMPAIGN_IMAGES.jacGhre}
                  alt="Jac GHRÉ — Beauty Expert"
                  className="w-full h-full object-cover object-top filter brightness-102 contrast-105"
                />

                {/* Gradient and Badge on Image Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#006073]/95 via-[#006073]/70 to-transparent flex items-end justify-between">
                  <div>
                    <span className="font-cinzel text-sm font-bold text-[#FBF9F3] block">
                      JAC GHRÉ
                    </span>
                    <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase">
                      HAIR DIRECTOR & BEAUTY EXPERT
                    </span>
                  </div>
                  <div className="p-1.5 border border-[#D4AF37]/50 bg-[#007288]">
                    <GoldEmblem size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Master Career Credentials & Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="border-l-2 border-[#D4AF37] pl-4 sm:pl-6 space-y-2">
              <span className="text-xs font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
                HAUTE COIFFURE & GLOBAL RUNWAY MASTER
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#FBF9F3] uppercase leading-tight">
                Crafting Iconic Beauty for Over Two Decades
              </h2>
            </div>

            <p className="font-outfit text-sm sm:text-base text-[#C5D9DE] font-light leading-relaxed">
              <strong>JAC Ghré</strong> is an international hair, beauty, and fashion expert, widely recognized for his visionary work in the global runway and fashion industry.
            </p>

            <p className="font-outfit text-sm sm:text-base text-[#C5D9DE] font-light leading-relaxed">
              He notably collaborated with legendary designer <strong className="text-[#F3E5AB]">Thierry Mugler</strong>, serving as <strong>Hair Director</strong> for major international fashion shows and top fashion capitals.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-4">
              <div className="p-4 bg-[#006073] border border-[#D4AF37]/30 text-center">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D4AF37] block">
                  GLOBAL
                </span>
                <span className="text-[10px] font-cinzel tracking-wider text-[#8EAAB0] mt-1 block">
                  THIERRY MUGLER HAIR DIRECTOR
                </span>
              </div>
              <div className="p-4 bg-[#006073] border border-[#D4AF37]/30 text-center">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D4AF37] block">
                  ELITE
                </span>
                <span className="text-[10px] font-cinzel tracking-wider text-[#8EAAB0] mt-1 block">
                  MODEL WORLD ARTISTIC DIRECTOR
                </span>
              </div>
              <div className="p-4 bg-[#006073] border border-[#D4AF37]/30 text-center col-span-2 sm:col-span-1">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D4AF37] block">
                  ELITE
                </span>
                <span className="text-[10px] font-cinzel tracking-wider text-[#8EAAB0] mt-1 block">
                  PRIVATE ATELIER
                </span>
              </div>
            </div>

            {/* Location & Official Web Identity Footer */}
            <div className="pt-4 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-4 text-xs font-cinzel text-[#8EAAB0]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="tracking-wider text-[#F3E5AB]">PRIVATE CLIENT ATELIER</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span className="tracking-wider text-[#D4AF37] font-bold">JACGHRE.COM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
