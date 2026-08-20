import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from '../ui/BrandLogo';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#03181f] overflow-hidden text-center">
      {/* Background Ambience with Subtle Sun Glint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041920] via-[#052932] to-[#03181f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border border-[#D4AF37]/35 p-8 sm:p-16 bg-[#042028]/80 backdrop-blur-md shadow-2xl relative"
        >
          {/* Subtle Decorative Gold Border Corner Squares */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#D4AF37]" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#D4AF37]" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#D4AF37]" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#D4AF37]" />

          {/* User's Exact Brand Logo Identity */}
          <div className="py-2 mb-6">
            <BrandLogo variant="stacked" size="xl" withScriptTagline withGlow />
          </div>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-6" />

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#C5D5D8] font-sans font-light leading-relaxed">
            From the golden light of the Mediterranean to the tropical warmth of Miami, GHRÉ was created to celebrate beauty, elegance, and the art of self-care. Every formula, every fragrance, and every detail is designed to bring a touch of Parisian luxury into your daily hair ritual.
          </p>

          {/* Founder Signature */}
          <div className="mt-8 flex flex-col items-center">
            <span className="font-script text-4xl sm:text-5xl text-[#D4AF37] tracking-wider mb-1">
              Jac Ghré
            </span>
            <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#8EAAB0] uppercase font-bold">
              PARIS • SAINT-TROPEZ • MIAMI
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
