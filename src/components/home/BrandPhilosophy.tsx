import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from '../ui/BrandLogo';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 lg:py-40 bg-[#007288] overflow-hidden text-center">

      {/* =========================================================
          LUXURY BACKGROUND SYSTEM
          Main: #007288
          Pattern / Depth: #006073
      ========================================================= */}

      {/* Deep Teal Edge Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#006073]/80 via-[#007288] to-[#006073]/80 pointer-events-none" />

      {/* Large Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09)_0%,rgba(0,114,136,0.15)_35%,transparent_72%)] pointer-events-none" />

      {/* =========================================================
          SUBTLE DIAGONAL LUXURY PATTERN
      ========================================================= */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              135deg,
              transparent 0%,
              transparent 47%,
              rgba(0,96,115,0.35) 47%,
              rgba(0,96,115,0.35) 48%,
              transparent 48%,
              transparent 100%
            ),
            linear-gradient(
              45deg,
              transparent 0%,
              transparent 47%,
              rgba(0,96,115,0.25) 47%,
              rgba(0,96,115,0.25) 48%,
              transparent 48%,
              transparent 100%
            )
          `,
          backgroundSize: '110px 110px',
        }}
      />

      {/* Fine Gold Horizontal Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      {/* =========================================================
          DECORATIVE SIDE GLOW
      ========================================================= */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-40 h-[500px] bg-[radial-gradient(ellipse_at_left,rgba(0,96,115,0.7)_0%,transparent_70%)] pointer-events-none" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-40 h-[500px] bg-[radial-gradient(ellipse_at_right,rgba(0,96,115,0.7)_0%,transparent_70%)] pointer-events-none" />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >

          {/* =====================================================
              OUTER GOLD FRAME
          ===================================================== */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-[#D4AF37]/70 via-[#D4AF37]/20 to-[#D4AF37]/70 pointer-events-none" />

          {/* Main Philosophy Panel */}
          <div className="relative bg-[#006073] border border-[#D4AF37]/40 shadow-[0_30px_80px_rgba(0,48,58,0.55)] overflow-hidden">

            {/* ===================================================
                INNER BACKGROUND GLOW
            =================================================== */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,114,136,0.65)_0%,transparent_68%)] pointer-events-none" />

            {/* Subtle Inner Pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(212,175,55,0.12) 50%,
                    transparent 100%
                  )
                `,
              }}
            />

            {/* ===================================================
                GOLD CORNER ARCHITECTURE
            =================================================== */}

            {/* Top Left */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#D4AF37]/80" />
            <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-[#D4AF37]/30" />

            {/* Top Right */}
            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#D4AF37]/80" />
            <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-[#D4AF37]/30" />

            {/* Bottom Left */}
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#D4AF37]/80" />
            <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-[#D4AF37]/30" />

            {/* Bottom Right */}
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#D4AF37]/80" />
            <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-[#D4AF37]/30" />

            {/* ===================================================
                CONTENT
            =================================================== */}
            <div className="relative z-10 px-7 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">

              {/* =================================================
                  EYEBROW
              ================================================= */}
              <div className="flex items-center justify-center gap-4 mb-8">

                <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />

                <span className="text-[10px] sm:text-[11px] font-cinzel font-bold tracking-[0.4em] text-[#D4AF37] uppercase whitespace-nowrap">
                  THE GHRÉ PHILOSOPHY
                </span>

                <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />

              </div>

              {/* =================================================
                  BRAND LOGO
              ================================================= */}
              <div className="relative flex justify-center py-4 mb-7">

                {/* Logo Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-32 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

                {/* <div className="relative">
                  <BrandLogo
                    variant="stacked"
                    size="xl"
                    withScriptTagline
                    withGlow
                  />
                </div> */}
                <div>
                  <img src="/images/logo-light.png" alt=""
                  width={500} />
                </div>

              </div>

              {/* =================================================
                  GOLD DIVIDER
              ================================================= */}
              <div className="flex items-center justify-center gap-3 my-7">

                <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />

                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />

                <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />

              </div>

              {/* =================================================
                  MAIN PHILOSOPHY TEXT
              ================================================= */}
              <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-[#E0ECEF] font-sans font-light leading-[1.9] tracking-wide">
                From the golden light of the Mediterranean to the tropical
                warmth of Miami,{' '}
                <span className="text-[#F3E5AB] font-medium">
                  GHRÉ
                </span>{' '}
                was created to celebrate beauty, elegance, and the art of
                self-care.
              </p>

              <p className="max-w-2xl mx-auto mt-5 text-sm sm:text-base text-[#BFD5DA] font-sans font-light leading-[1.85]">
                Every formula, every fragrance, and every detail is designed
                to bring a touch of Parisian luxury into your daily hair
                ritual.
              </p>

              {/* =================================================
                  FOUNDER SIGNATURE AREA
              ================================================= */}
              <div className="mt-10 sm:mt-12 pt-7 border-t border-[#D4AF37]/20">

                <div className="flex flex-col items-center">

                  {/* Signature */}
                  <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#D4AF37] tracking-wider leading-none">
                    Jac Ghré
                  </span>

                  {/* Small Gold Line */}
                  <div className="w-10 h-px bg-[#D4AF37]/60 my-3" />

                  {/* Locations */}
                  <span className="text-[9px] sm:text-[10px] font-cinzel tracking-[0.35em] text-[#A8C1C7] uppercase font-bold">
                    PARIS
                    <span className="mx-2 text-[#D4AF37]">•</span>
                    SAINT-TROPEZ
                    <span className="mx-2 text-[#D4AF37]">•</span>
                    MIAMI
                  </span>

                </div>

              </div>

            </div>
          </div>
        </motion.div>

        {/* =========================================================
            SMALL BRAND STATEMENT BELOW PANEL
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />

          <span className="text-[9px] sm:text-[10px] font-cinzel tracking-[0.3em] text-[#9DBBC2] uppercase">
            PARISIAN BEAUTY • COASTAL BOTANICALS • TIMELESS RITUALS
          </span>

          <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
        </motion.div>

      </div>
    </section>
  );
};