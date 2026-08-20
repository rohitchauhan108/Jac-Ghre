import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown, Camera, Star, CheckCircle, Award } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';

export const SupermodelsPortfolio: React.FC = () => {
  const supermodels = [
    { name: 'Claudia Schiffer', title: 'Iconic Supermodel & Fashion Legend' },
    { name: 'Cindy Crawford', title: 'Global Supermodel & Haute Couture Icon' },
    { name: 'Helena Christensen', title: 'Danish Supermodel & Runway Muse' },
    { name: 'Naomi Campbell', title: 'Legendary Runway Supermodel & Cultural Icon' },
    { name: 'Christie Turlington', title: 'The Trinity Supermodel & Vogue Muse' },
    { name: 'Eva Herzigova', title: 'International Supermodel & Campaign Star' },
    { name: 'Kate Moss', title: 'Fashion Era Defining British Supermodel' },
  ];

  const celebrities = [
    { name: 'Ivana Trump', title: 'International Business Icon & Socialite' },
    { name: 'Sharon Stone', title: 'Golden Globe Winning Film Actress & Icon' },
    { name: 'Paris Hilton', title: 'Global Celebrity, Entrepreneur & Icon' },
  ];

  const fashionCapitals = [
    { city: 'PARIS', note: 'Place Vendôme & Haute Couture Week' },
    { city: 'MILAN', note: 'Via Montenapoleone Runway Shows' },
    { city: 'LONDON', note: 'British Fashion Council Direction' },
    { city: 'NEW YORK', note: 'Artistic Director Salon Flagships' },
    { city: 'LOS ANGELES', note: 'Red Carpet & Celebrity Campaigns' },
    { city: 'SHANGHAI', note: 'International Haute Coiffure Tour' },
    { city: 'HONG KONG', note: 'Global Luxury Fashion Events' },
  ];

  return (
    <section className="relative py-24 bg-[#03151c] text-[#F7F4EB] overflow-hidden border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#021319] border border-[#D4AF37]/40 mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              THE RUNWAY ROSTER
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide uppercase text-[#FBF9F3]">
            Supermodels & Global Celebrities
          </h2>

          <p className="mt-4 font-outfit text-sm sm:text-base text-[#B3CBD1] font-light max-w-2xl mx-auto leading-relaxed">
            Throughout his celebrated career, Jac Ghré has created signature runway looks and editorial hair artistry for the world's most iconic supermodels, film legends, and haute couture houses.
          </p>
        </div>

        {/* Supermodel Grid Showcase */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              World-Renowned Supermodels Worked With
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {supermodels.map((model, idx) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-5 bg-gradient-to-br from-[#042028] to-[#02141a] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all group relative shadow-lg"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#021319] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-xs font-cinzel font-bold">
                    0{idx + 1}
                  </div>
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-cinzel text-base font-bold text-[#FBF9F3] group-hover:text-[#F3E5AB] transition-colors">
                  {model.name}
                </h4>
                <p className="text-xs font-outfit text-[#8EAAB0] mt-1 font-light">
                  {model.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* High-Profile Celebrities & VIPs */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              High-Profile Celebrity Portfolio
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {celebrities.map((celeb, idx) => (
              <div
                key={celeb.name}
                className="p-6 bg-[#04242e] border-2 border-[#D4AF37]/40 text-center relative shadow-xl"
              >
                <GoldEmblem size={20} className="mx-auto mb-2" />
                <h4 className="font-cinzel text-lg font-bold text-[#FBF9F3]">{celeb.name}</h4>
                <p className="text-xs font-outfit text-[#C4D8DC] mt-1 font-light">{celeb.title}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-[#021319] border border-[#D4AF37]/30 text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-wider">
                  Private VIP Styling
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Fashion Capitals Ticker */}
        <div className="p-8 bg-[#021319] border border-[#D4AF37]/50">
          <div className="text-center mb-6">
            <span className="text-[11px] font-cinzel font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
              INTERNATIONAL RUNWAY CAPITALS
            </span>
            <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#FBF9F3] uppercase mt-1">
              Where Jac Ghré Directed Haute Couture Hair Artistry
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {fashionCapitals.map((cap) => (
              <div
                key={cap.city}
                className="p-3 bg-[#041d24] border border-[#D4AF37]/20 text-center group hover:border-[#D4AF37] transition-colors"
              >
                <span className="font-cinzel text-xs font-bold text-[#F3E5AB] block">
                  {cap.city}
                </span>
                <span className="text-[9px] font-outfit text-[#8EAAB0] block mt-1 leading-tight line-clamp-2">
                  {cap.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
