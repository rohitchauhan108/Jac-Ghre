import React from 'react';
import { motion } from 'motion/react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { Sparkles, Heart } from 'lucide-react';

export const FounderVisionQuote: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#006073] via-[#007288] to-[#006073] overflow-hidden border-b border-[#D4AF37]/30">
      {/* Background Floral/Sun Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-2 border-[#D4AF37] bg-[#006073]/90 p-8 sm:p-14 shadow-[0_20px_50px_rgba(0,96,115,0.7)] relative"
        >
          {/* Top Gold Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

          <GoldEmblem size={36} withGlow className="mx-auto mb-4" />

          <span className="text-[11px] font-cinzel font-bold tracking-[0.35em] text-[#D4AF37] uppercase block mb-3">
            THE VISION
          </span>

          <blockquote className="font-playfair text-2xl sm:text-4xl lg:text-5xl italic font-normal text-[#FBF9F3] leading-snug">
            “Making women beautiful is my passion.”
          </blockquote>

          {/* Authentic Calligraphy Signature Lockup */}
          <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 flex flex-col items-center">
            <span className="font-script text-4xl sm:text-5xl text-[#D4AF37] select-none">
              Jac Ghré
            </span>
            <span className="text-xs font-cinzel font-bold tracking-[0.3em] text-[#F3E5AB] uppercase mt-1">
              JAC GHRÉ — BEAUTY EXPERT
            </span>
            <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#8EAAB0] uppercase mt-0.5">
              FISHER ISLAND, MIAMI • PARIS • SAINT-TROPEZ
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
