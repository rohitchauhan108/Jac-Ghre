import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Droplets, Sun, Award, Globe, MapPin, ArrowRight, Heart, Star, CheckCircle } from 'lucide-react';
import { GoldEmblem } from '../components/ui/GoldEmblem';
import { BrandLogo } from '../components/ui/BrandLogo';
import { CAMPAIGN_IMAGES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const AboutCompanyPage: React.FC = () => {
  const { navigateToPage } = useShop();

  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      title: 'PARISIAN HAUTE COIFFURE',
      tagline: 'Runway-Tested Excellence',
      description:
        'Born from legendary Paris and Milan fashion week runways under master hair directorship, our formulas were initially created to protect, style, and restore supermodel hair under extreme backstage lighting.',
    },
    {
      icon: <Droplets className="w-6 h-6 text-[#D4AF37]" />,
      title: 'PRICKLY PEAR BOTANICAL ALCHEMY',
      tagline: 'The Crown of Rare Oils',
      description:
        'We harness 100% cold-pressed Moroccan Prickly Pear Seed Oil (Opuntia Ficus-Indica)—nature’s richest source of Vitamin E, sterols, and omega fatty acids, offering 3x the restorative power of traditional argan oil.',
    },
    {
      icon: <Sun className="w-6 h-6 text-[#D4AF37]" />,
      title: 'COASTAL SOLAR & HUMIDITY SHIELD',
      tagline: 'Riviera & Miami Climate Defense',
      description:
        'Engineered specifically to combat UV solar degradation, salt water crystallization, and coastal humidity experienced across Saint-Tropez, the French Riviera, and Fisher Island, Miami.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      title: 'CLEAN HAUTE FORMULATION',
      tagline: 'Purity Without Compromise',
      description:
        'Every GHRÉ creation is 100% free of sulfates, parabens, harsh phthalates, and synthetic heavy fillers. Dermatologist-tested, color-safe, keratin-safe, and cruelty-free.',
    },
  ];

  const ateliers = [
    {
      city: 'FISHER ISLAND, MIAMI',
      name: 'Fisher Island Club Atelier',
      desc: 'Private VIP sanctuary serving elite members and international clientele.',
      status: 'Flagship Private Atelier',
    },
    {
      city: 'PARIS, FRANCE',
      name: 'Place Vendôme & Haute Couture',
      desc: 'Backstage runway direction, editorial creations, and haute coiffure.',
      status: 'Haute Couture Studio',
    },
    {
      city: 'SAINT-TROPEZ, RIVIERA',
      name: 'Ramatuelle Coastal Suite',
      desc: 'Summer yacht appointments and sun-defense restorative haircare.',
      status: 'Riviera Atelier',
    },
  ];

  return (
    <div className="bg-[#0C8A9B] min-h-screen text-[#FBF9F3]">
      {/* 1. Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#097B8A] via-[#0C8A9B] to-[#097B8A] overflow-hidden border-b border-[#D4AF37]/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#097B8A] border border-[#D4AF37]/50 mb-6 shadow-xl">
            <GoldEmblem size={18} />
            <span className="text-[11px] font-cinzel font-bold tracking-[0.35em] text-[#D4AF37] uppercase">
              THE HOUSE OF GHRÉ PARIS
            </span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.1em] text-[#FBF9F3] uppercase leading-tight">
            About The Company
          </h1>

          <p className="font-playfair text-xl sm:text-3xl italic text-[#F3E5AB] max-w-3xl mx-auto mt-4 leading-snug">
            “Where Parisian Haute Couture Craft Meets Pure Botanical Alchemy.”
          </p>

          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-8" />

          <p className="font-outfit text-sm sm:text-base text-[#C4D8DC] font-light max-w-2xl mx-auto leading-relaxed">
            Founded on the runway capitals of Paris and refined across the exclusive shores of Fisher Island, Miami, GHRÉ is a luxury haircare and beauty house dedicated to elevating daily care into an exquisite ritual of renewal.
          </p>
        </div>
      </section>

      {/* 2. Brand Story & Heritage Split Section */}
      <section className="py-20 bg-[#0C8A9B] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Visual Atmosphere */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative border-2 border-[#D4AF37] p-3 bg-[#097B8A] shadow-[0_20px_50px_rgba(0,96,115,0.8)]">
                <img
                  src="/gallery/catalogues/about.jpeg"
                  alt="GHRÉ Emblem — Barbary Fig Flower & Lotus"
                  className="w-full aspect-[3/4] sm:aspect-[4/5] object-contain bg-[#006073] filter contrast-105 brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#097B8A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#097B8A]/90 border border-[#D4AF37]/40 backdrop-blur-md">
                  <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase font-bold block">
                    THE EMBLEM OF LUXURY — THE SOUL OF GHRÉ
                  </span>
                  <p className="text-xs font-outfit text-[#FBF9F3] mt-0.5">
                    Barbary Fig Flower & Lotus — Inspired by Moroccan nature. Rare & Powerful.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Company Philosophy Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4">
                <span className="text-xs font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
                  OUR ESSENCE & PHILOSOPHY
                </span>
                <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase text-[#FBF9F3]">
                  An Uncompromising Standard of Purity
                </h2>
              </div>

              <p className="font-outfit text-sm sm:text-base text-[#C4D8DC] font-light leading-relaxed">
                For over two decades, GHRÉ has operated at the intersection of haute couture fashion and trichological science. What began as custom backstage elixir formulations for top supermodels during Paris Fashion Week has evolved into a globally celebrated beauty maison.
              </p>

              <p className="font-outfit text-sm sm:text-base text-[#C4D8DC] font-light leading-relaxed">
                Every formulation is crafted in France and the United States under strict clean-luxury guidelines. We select only the most potent cold-pressed botanicals, pairing Moroccan Prickly Pear Seed Oil with cellular Keratin complexes to transform damaged hair into vibrant, touchable silk.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#097B8A] border border-[#D4AF37]/30">
                  <span className="font-cinzel text-2xl font-bold text-[#D4AF37] block">100%</span>
                  <span className="text-xs font-outfit text-[#8EAAB0]">Clean & Cruelty-Free Formulation</span>
                </div>
                <div className="p-4 bg-[#097B8A] border border-[#D4AF37]/30">
                  <span className="font-cinzel text-2xl font-bold text-[#D4AF37] block">3x</span>
                  <span className="text-xs font-outfit text-[#8EAAB0]">Antioxidant Power vs. Argan Oil</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Company Pillars Grid */}
      <section className="py-24 bg-[#0C8A9B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <GoldEmblem size={28} withGlow className="mx-auto mb-3" />
            <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">
              THE FOUR CORNERSTONES
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase text-[#FBF9F3]">
              The GHRÉ Pillars of Craft
            </h2>
            <p className="font-outfit text-sm text-[#8EAAB0] mt-3">
              Meticulous standards governing our research, sustainable sourcing, and artisanal creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#097B8A] border border-[#D4AF37]/30 p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-all hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
              >
                <div>
                  <div className="w-12 h-12 bg-[#097B8A] border border-[#D4AF37]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase font-bold block mb-1">
                    {p.tagline}
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-[#FBF9F3] mb-3">
                    {p.title}
                  </h3>
                  <p className="font-outfit text-xs text-[#B3CBD1] font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Flagship Ateliers */}
      <section className="py-24 bg-[#0C8A9B] border-t border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block mb-1">
              WORLDWIDE PRESENCE
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase text-[#FBF9F3]">
              Our International Ateliers
            </h2>
            <p className="font-outfit text-sm text-[#8EAAB0] mt-3">
              Serving our private patrons across the world’s most prestigious luxury destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ateliers.map((a) => (
              <div
                key={a.city}
                className="bg-[#097B8A] border-2 border-[#D4AF37]/40 p-8 text-center space-y-4 hover:border-[#D4AF37] transition-all shadow-xl"
              >
                <MapPin className="w-8 h-8 text-[#D4AF37] mx-auto" />
                <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase font-bold px-3 py-1 bg-[#097B8A] border border-[#D4AF37]/30 inline-block">
                  {a.status}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#FBF9F3] uppercase">
                  {a.city}
                </h3>
                <h4 className="font-cinzel text-sm text-[#F3E5AB]">
                  {a.name}
                </h4>
                <p className="font-outfit text-xs text-[#8EAAB0] font-light leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Links and CTA Bar */}
          <div className="mt-16 p-8 bg-[#097B8A] border border-[#D4AF37] text-center max-w-4xl mx-auto space-y-4 shadow-2xl">
            <h3 className="font-cinzel text-2xl font-bold text-[#FBF9F3] uppercase">
              Experience the GHRÉ Haute Ritual
            </h3>
            <p className="font-outfit text-xs sm:text-sm text-[#B3CBD1] max-w-xl mx-auto">
              Discover our signature hair care creations or request a private consultation at our Fisher Island Club Flagship Atelier.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => navigateToPage('shop')}
                className="px-6 py-3 bg-[#D4AF37] text-[#0E4C5A] font-cinzel text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore The Shop</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateToPage('about-founder')}
                className="px-6 py-3 bg-[#097B8A] border border-[#D4AF37] text-[#F3E5AB] font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-[#0C8A9B] transition-all cursor-pointer"
              >
                About The Founder
              </button>
              <button
                onClick={() => navigateToPage('contact')}
                className="px-6 py-3 bg-transparent border border-[#8EAAB0]/40 text-[#8EAAB0] hover:text-[#FBF9F3] font-cinzel text-xs font-bold tracking-widest uppercase hover:border-[#D4AF37] transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
