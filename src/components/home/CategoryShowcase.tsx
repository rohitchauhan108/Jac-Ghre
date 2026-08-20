import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

export const CategoryShowcase: React.FC = () => {
  const categories = [
    {
      id: 'haircare',
      title: 'Haute Hair Care',
      subtitle: 'RESTORATIVE CLEANSING & CONDITIONING',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop',
      tag: 'Iconic Formulas',
      link: '#collection',
    },
    {
      id: 'bodycare',
      title: 'Sun & Shimmer Body',
      subtitle: 'MONOÏ DE TAHITI & SOLAR GLOW',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop',
      tag: 'Saint-Tropez Scent',
      link: '#collection',
    },
    {
      id: 'fragrance',
      title: 'Haute Parfumerie',
      subtitle: 'BLOSSOM POSITANO & RIVIERA MISTS',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop',
      tag: 'Grasse Distillations',
      link: '#fragrance',
    },
    {
      id: 'elixirs',
      title: 'Precious Elixirs',
      subtitle: 'COLD-PRESSED PRICKLY PEAR OIL',
      image: 'https://images.unsplash.com/photo-1608248597359-543160a2b0e6?q=80&w=1000&auto=format&fit=crop',
      tag: 'Liquid Gold',
      link: '#spotlight',
    },
  ];

  return (
    <section id="sun-body" className="relative py-24 sm:py-32 bg-[#052932] overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041e26] via-[#052932] to-[#041e26]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GoldEmblem size={22} />
          </div>
          <span className="text-xs font-cinzel font-semibold tracking-[0.35em] text-[#D4AF37] uppercase block mb-2">
            Curated Universes
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.14em] text-[#F7F4EB] uppercase">
            Shop By Category
          </h2>
          <p className="mt-3 text-base sm:text-xl font-editorial italic text-[#F3E5AB]">
            Explore the bespoke realms of GHRÉ Paris.
          </p>
          <div className="h-0.5 w-20 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={cat.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative h-[420px] overflow-hidden border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500 flex flex-col justify-end p-6 bg-[#031c22] shadow-xl"
            >
              {/* Background Photo */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-105 group-hover:scale-110 group-hover:brightness-90 transition-all duration-700"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03171d] via-[#052932]/70 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-[#041d24]/90 border border-[#D4AF37]/40 text-[9px] font-cinzel tracking-[0.2em] text-[#F3E5AB] uppercase backdrop-blur-sm">
                  {cat.tag}
                </span>
              </div>

              {/* Content Box */}
              <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                  {cat.subtitle}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#F7F4EB] tracking-wide group-hover:text-[#F3E5AB] transition-colors mb-3">
                  {cat.title}
                </h3>
                <div className="inline-flex items-center gap-2 text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF37] uppercase border-b border-[#D4AF37]/40 pb-1 group-hover:text-white group-hover:border-white transition-all">
                  <span>Explore Universe</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
