import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flower2, HeartHandshake } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

export const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="relative py-28 sm:py-36 bg-[#031c22] overflow-hidden text-center">
      {/* Background Deep Rich Petrol Teal Gradient with Organic Curves */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041d24] via-[#062c37] to-[#041d24]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)]" />

      {/* Decorative Gold Circular Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] border border-[#D4AF37]/15 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] border border-[#D4AF37]/10 rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <GoldEmblem size={48} withGlow className="mb-6" />

          <span className="text-xs sm:text-sm font-cinzel font-semibold tracking-[0.4em] text-[#D4AF37] uppercase mb-4">
            The Philosophy of Jac Ghré
          </span>

          <div className="relative py-6 px-4">
            <span className="text-5xl sm:text-7xl font-serif text-[#D4AF37]/30 absolute -top-4 -left-4 select-none">
              “
            </span>

            <blockquote className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#F7F4EB] italic leading-tight tracking-wide">
              Making women beautiful is my passion.
            </blockquote>

            <span className="text-5xl sm:text-7xl font-serif text-[#D4AF37]/30 absolute -bottom-10 -right-4 select-none">
              ”
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center">
            {/* Signature in luxury script */}
            <span className="font-script text-4xl sm:text-6xl text-[#D4AF37] tracking-wider mb-2">
              Jac Ghré
            </span>
            <span className="text-xs font-cinzel tracking-[0.3em] text-[#E8DCC4] uppercase">
              FOUNDER & MASTER BEAUTY ARTIST
            </span>
            <span className="text-[11px] text-[#8EAAB0] font-sans mt-1">
              PARIS • SAINT-TROPEZ • MIAMI
            </span>
          </div>

          {/* Decorative Divider */}
          <div className="mt-10 flex items-center gap-4 w-64 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
