import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, ShieldCheck, SunMedium, ArrowUpRight, Crown, Droplets, Gem } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { useShop } from '../../context/ShopContext';

export const IntroSection: React.FC = () => {
  const { theme, navigateToPage } = useShop();
  const isDark = theme === 'dark';

  const hallmarks = [
    {
      icon: Award,
      badge: 'HAUTE COIFFURE',
      title: 'PARISIAN ATELIER CRAFT',
      subtitle: 'Formulated by Jac Ghré',
      description: 'Backstage runway direction for Thierry Mugler synthesized into daily transformative hair rituals.',
      linkAction: () => navigateToPage('jac-ghre'),
      actionLabel: 'Discover Jac Ghré',
    },
    {
      icon: Droplets,
      badge: 'SIGNATURE ELIXIR',
      title: 'PRICKLY PEAR BOTANICALS',
      subtitle: 'Cold-Pressed Excellence',
      description: 'Precious Moroccan prickly pear seed oil rich in Vitamin E, omega sterols, and cellular keratin shield.',
      linkAction: () => navigateToPage('hair-care'),
      actionLabel: 'Explore Hair Care',
    },
    {
      icon: SunMedium,
      badge: 'DUAL-COASTAL LUXURY',
      title: 'COASTAL SOLAR SHIELD',
      subtitle: 'Saint-Tropez & Miami',
      description: 'Engineered for UV radiation, sea salt, and tropical humidity to preserve radiant color and mirror gloss.',
      linkAction: () => navigateToPage('sun-body'),
      actionLabel: 'View Sun & Body',
    },
    {
      icon: ShieldCheck,
      badge: 'CLEAN BOTANICS',
      title: 'HAUTE FORMULATION',
      subtitle: 'Zero Compromise',
      description: 'Strictly sulfate-free, paraben-free, cruelty-free, and safe for all Keratin and color-treated hair.',
      linkAction: () => navigateToPage('shop', 'all'),
      actionLabel: 'Shop All 9 Creations',
    },
  ];

  return (
    <section
      id="brand-pillars"
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors duration-400 ${
        isDark
          ? 'bg-[#031920]'
          : 'bg-[#FAF7F2]'
      }`}
    >
      {/* Background Ambience & Fine Gold Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Central Luxury Statement Box with French Architecture Framing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Subtle Top Gold Crest */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="p-2 border border-[#D4AF37]/50 bg-[#042028] shadow-lg">
              <GoldEmblem size={28} withGlow />
            </div>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <span
            className="inline-block text-[11px] sm:text-xs font-cinzel font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-3"
          >
            L'ART DE VIVRE BEAUTÉ • PARIS • SAINT-TROPEZ • MIAMI
          </span>

          <h2
            className={`font-playfair text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-balance leading-tight ${
              isDark ? 'text-[#FBF9F3]' : 'text-[#062B35]'
            }`}
          >
            An Expression of <span className="italic font-playfair text-[#D4AF37]">Timeless Beauty</span>
          </h2>

          {/* Prominent Editorial Quote */}
          <div className="relative mt-7 px-4 sm:px-12">
            <span className="absolute -top-6 left-0 sm:left-4 text-5xl sm:text-6xl font-playfair text-[#D4AF37]/25 select-none">“</span>
            <p
              className={`text-lg sm:text-2xl font-editorial italic leading-relaxed text-balance ${
                isDark ? 'text-[#F3E5AB]' : 'text-[#8A6715]'
              }`}
            >
              Inspired by the sun, the sea, and the French art of living beautifully.
            </p>
            <span className="absolute -bottom-10 right-0 sm:right-4 text-5xl sm:text-6xl font-playfair text-[#D4AF37]/25 select-none">”</span>
          </div>

          <p
            className={`mt-8 text-sm sm:text-base font-outfit font-light max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-[#BFD5DB]' : 'text-[#415C65]'
            }`}
          >
            Born from the sun-drenched coasts of Saint-Tropez and the vibrant runway glamour of Miami, <strong className="font-semibold text-[#D4AF37]">GHRÉ PARIS</strong> marries Parisian cosmetic excellence with cold-pressed Mediterranean botanicals.
          </p>

          {/* City Badge Ticker */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-2 border border-[#D4AF37]/30 bg-[#021319]/60 backdrop-blur-sm">
            <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] font-semibold">PARIS (PLACE VENDÔME)</span>
            <span className="text-[#D4AF37]/40">•</span>
            <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] font-semibold">SAINT-TROPEZ</span>
            <span className="text-[#D4AF37]/40">•</span>
            <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] font-semibold">MIAMI (FISHER ISLAND)</span>
          </div>
        </motion.div>

        {/* 4 Atelier Pillars/Hallmarks Re-Architected with High Polish and Clear Visual Hierarchy */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {hallmarks.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              onClick={item.linkAction}
              className={`group relative p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isDark
                  ? 'bg-gradient-to-b from-[#04242e]/90 via-[#031d25]/90 to-[#021319]/90 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                  : 'bg-[#FFFFFF] border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]'
              }`}
            >
              {/* Corner Gold Accent Brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header with Icon and Pill Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`w-11 h-11 flex items-center justify-center border transition-all duration-300 ${
                      isDark
                        ? 'bg-[#03181f] border-[#D4AF37]/40 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#062B35]'
                        : 'bg-[#FAF7F2] border-[#D4AF37]/50 text-[#B8860B] group-hover:bg-[#D4AF37] group-hover:text-[#062B35]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 bg-[#021319]/80 border border-[#D4AF37]/30 text-[9px] font-cinzel font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                    {item.badge}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-cinzel font-bold tracking-[0.25em] block uppercase mb-1.5 ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#B8860B]'
                  }`}
                >
                  {item.subtitle}
                </span>

                <h3
                  className={`font-cinzel text-sm sm:text-base font-bold tracking-wider mb-2.5 ${
                    isDark ? 'text-[#FBF9F3]' : 'text-[#062B35]'
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-xs sm:text-[13px] font-outfit font-light leading-relaxed mb-4 ${
                    isDark ? 'text-[#B5CCD1]' : 'text-[#4D6972]'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Action Link at Bottom of Card */}
              <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] font-cinzel font-bold tracking-wider text-[#D4AF37] group-hover:text-[#FFF3C4]">
                <span>{item.actionLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
