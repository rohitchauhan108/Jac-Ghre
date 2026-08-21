import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, Droplets, Leaf, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { BOTANICAL_INGREDIENTS } from '../data/products';
import { GoldEmblem } from '../components/ui/GoldEmblem';
import { useShop } from '../context/ShopContext';

export const JournalPage: React.FC = () => {
  const { navigateToPage } = useShop();

  const articles = [
    {
      id: 'prickly-pear',
      category: 'Phyto-Trichology',
      title: 'The Science of Moroccan Prickly Pear: Why It Outperforms Argan Oil',
      date: 'GHRÉ Research Lab • Paris',
      readTime: '4 min read',
      excerpt: 'With 150% more Vitamin E than traditional argan oil and a rare profile of linoleic acid, cold-pressed cactus seed oil penetrates the hair cuticle rather than coating it.',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop',
      keyFact: '1 ton of prickly pear fruit yields only 1 liter of pure organic seed oil.',
    },
    {
      id: 'bamboo-marrow',
      category: 'Cellular Reconstruction',
      title: 'Bamboo Marrow & Hydrolyzed Silk: The Structural Scaffold for Damaged Keratin',
      date: 'Clinical Efficacy Studies',
      readTime: '6 min read',
      excerpt: 'How our laboratory cross-links botanical bamboo silica with biomimetic silk polypeptides to recreate the natural tensile elasticity of virgin hair fibers.',
      image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=1000&auto=format&fit=crop',
      keyFact: 'Increases hair fiber break resistance by +340% within 3 applications.',
    },
    {
      id: 'monoi-tahiti',
      category: 'Sun & Coastal Science',
      title: 'Protecting Hair from UV and Sea Salt: Lessons from the French Riviera & Miami',
      date: 'Resort Hair Care Guide',
      readTime: '5 min read',
      excerpt: 'Why traditional sunscreens leave hair brittle and how multi-lipid Tahitian Monoï creates a breathable, non-greasy shield against free radical damage.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      keyFact: 'Blocks 94% of lipid peroxidation induced by strong UV-A/UV-B rays.',
    },
  ];

  return (
    <div className="pt-8 pb-28 bg-[#007288] min-h-screen">
      {/* Hero Header Banner */}
      <section className="relative py-20 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#006073] via-[#007288] to-[#006073] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#006073] border border-[#D4AF37]/50 mb-4 shadow-md">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              LE JOURNAL BOTANIQUE & SCIENCE
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            The Botanical Journal
          </h1>

          <p className="mt-4 max-w-2xl mx-auto font-editorial text-2xl sm:text-3xl italic text-[#D4AF37]">
            “Where clinical trichology meets rare Mediterranean phyto-botany.”
          </p>

          <p className="mt-3 max-w-2xl mx-auto font-poppins text-sm sm:text-base text-[#B5CAD0] font-normal leading-relaxed">
            Discover the scientific research, extraction secrets, and formulation philosophies behind every GHRÉ master creation.
          </p>
        </div>
      </section>

      {/* Main Journal Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Featured Editorial Articles */}
        <div className="space-y-12 mb-24">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-[#006073] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden bg-[#006073] border border-[#D4AF37]/25">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#006073]/90 text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-wider">
                  {article.category}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-4 text-xs font-poppins text-[#8EAAB0]">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F7F4EB] hover:text-[#D4AF37] cursor-pointer transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="font-poppins text-sm sm:text-base text-[#B5CAD0] leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="p-3 bg-[#006073] border-l-2 border-[#D4AF37] text-xs font-poppins text-[#F3E5AB]">
                  <strong className="text-[#D4AF37]">Key Discovery:</strong> {article.keyFact}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigateToPage('hair-care')}
                    className="inline-flex items-center gap-2 font-cinzel text-xs font-bold text-[#D4AF37] hover:text-[#FFF3C4] uppercase tracking-wider"
                  >
                    <span>Explore Formulations Using This Phyto-Complex</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botanical Ingredients Compendium */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <GoldEmblem size={24} withGlow className="mb-2" />
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase text-[#F7F4EB]">
              The Phyto-Botanical Compendium
            </h2>
            <p className="font-editorial text-xl italic text-[#D4AF37] mt-1">
              “Every drop harvested from certified organic sustainable estates.”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOTANICAL_INGREDIENTS.map((ing) => (
              <div
                key={ing.name}
                className="bg-[#006073] border border-[#D4AF37]/30 p-6 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="w-10 h-10 bg-[#021318] border border-[#D4AF37]/40 flex items-center justify-center mb-4">
                    <Leaf className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-cinzel text-base font-bold text-[#F7F4EB] uppercase">
                    {ing.name}
                  </h4>
                  <span className="text-xs font-editorial italic text-[#D4AF37] block mt-0.5">
                    {ing.origin}
                  </span>
                  <p className="font-poppins text-xs sm:text-sm text-[#8EAAB0] mt-3 leading-relaxed">
                    {ing.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4AF37]/20">
                  <span className="text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-wider block font-semibold">
                    Primary Key Benefit:
                  </span>
                  <p className="text-xs text-[#F7F4EB] font-poppins mt-0.5">
                    {ing.benefits.join(' • ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
