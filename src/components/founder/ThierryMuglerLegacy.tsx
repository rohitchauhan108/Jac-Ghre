import React from 'react';
import { motion } from 'motion/react';
import { Scissors, CheckCircle2 } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

export const ThierryMuglerLegacy: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#006073] overflow-hidden border-b border-[#D4AF37]/30">

      {/* Golden Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#006073] border border-[#D4AF37]/50">
              <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />

              <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                HAUTE COUTURE DIRECTION
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF9F3] uppercase leading-tight">
              Hair Director for{' '}
              <span className="text-[#D4AF37]">Thierry Mugler</span>{' '}
              & Elite Model World
            </h2>

            <p className="font-outfit text-sm sm:text-base text-[#C2D6DC] font-light leading-relaxed">
              Serving as Hair Director for legendary French couturier{' '}
              <strong>Thierry Mugler</strong>, Jac Ghré commanded backstage
              teams for defining fashion moments in Paris, Milan, London,
              Los Angeles, Shanghai, and Hong Kong.
            </p>

            <p className="font-outfit text-sm sm:text-base text-[#C2D6DC] font-light leading-relaxed">
              These high-intensity collaborations encompassed haute couture
              runway presentations, global editorial covers, luxury fragrance
              campaigns, and exclusive red-carpet showcases — setting the
              benchmark for architectural hair volume, mirror shine, and
              effortless movement.
            </p>

            {/* Pillar Accents */}
            <div className="space-y-3 pt-2">

              <div className="flex items-start gap-3 p-3.5 bg-[#006073] border border-[#D4AF37]/30">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />

                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">
                    Prestigious New York Artistic Directorship
                  </h4>

                  <p className="font-outfit text-xs text-[#8EAAB0] mt-0.5 font-light">
                    Directed flagship salons in Manhattan, introducing French
                    balayage and trichological botanical scalp rituals to
                    American high society.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#006073] border border-[#D4AF37]/30">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />

                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">
                    Elite Model World Global Partnerships
                  </h4>

                  <p className="font-outfit text-xs text-[#8EAAB0] mt-0.5 font-light">
                    Key stylist and hair architect for Elite Model Look
                    competitions and discovery tours across Europe, the
                    United States, and Asia.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="p-8 sm:p-10 bg-[#006073] border-2 border-[#D4AF37] shadow-2xl relative">

              <div className="absolute top-2 right-2 p-2">
                <GoldEmblem size={24} withGlow />
              </div>

              <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase font-bold block mb-4">
                THE ATELIER PHILOSOPHY
              </span>

              <blockquote className="font-playfair text-xl sm:text-2xl italic text-[#F3E5AB] leading-relaxed mb-6">
                “Runway models put their hair through extreme heat, styling,
                and travel daily. I needed a formula that could instantly
                restore cellular keratin, reflect sunlight like diamonds, and
                feel weightless.”
              </blockquote>

              <div className="pt-4 border-t border-[#D4AF37]/30">
                <span className="font-cinzel text-sm font-bold text-[#FBF9F3] block">
                  JAC GHRÉ
                </span>

                <span className="text-xs font-cinzel text-[#D4AF37] tracking-wider block">
                  Founder & Master Formulator
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};