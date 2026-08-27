import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, Bell, ShoppingBag, Eye, ArrowRight, Sun } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { CAMPAIGN_IMAGES, PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const CampaignBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const { addToCart, setQuickViewProduct, navigateToPage } = useShop();

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsReserved(true);
  };

  return (
    <section id="campaign-banner" className="relative py-20 sm:py-28 bg-[#007288] overflow-hidden">
      {/* Cinematic Deep Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#006073] via-[#007288] to-[#006073]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Full Width High-Fashion Campaign Banner Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-2 border-[#D4AF37]/60 bg-gradient-to-br from-[#006073]/95 via-[#007288]/95 to-[#006073]/95 shadow-[0_25px_60px_rgba(0,96,115,0.85)] relative overflow-hidden"
        >
          {/* Top Gold Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] z-20" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] z-20" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] z-20" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] z-20" />

          {/* Panoramic Campaign Banner Image */}
          <div 
            className="relative lg:h-screen w-full overflow-hidden bg-[#006073] group cursor-pointer" 
            onClick={() => navigateToPage('hair-care')}
          >
            <img
              src={CAMPAIGN_IMAGES.summerDream}
              alt="GHRÉ PARIS Your Summ'Hair Dream Campaign"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.015] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#006073]/60 via-transparent to-transparent pointer-events-none" />

            <div className="lg:absolute p-5 bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 bg-[#006073]/90 border border-[#D4AF37]/50 text-[#F3E5AB] font-cinzel text-xs tracking-[0.2em] uppercase backdrop-blur-md lg:w-auto w-full flex justify-center" >
                SAINT-TROPEZ • MIAMI
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToPage('shop');
                }}
                className="px-5 py-1.5 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-lg flex items-center gap-1.5 transition-all lg:w-auto w-full justify-center"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* VIP Access Bar Below Banner */}
          <div className="p-6 sm:p-8 bg-[#006073]/90 border-t border-[#D4AF37]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left space-y-1">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <GoldEmblem size={20} />
                <span className="text-xs font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase font-bold">
                  HAUTE BOTANICAL LAUNCH
                </span>
              </div>
              <p className="text-sm font-editorial italic text-[#F3E5AB]">
                “Monoï Vanilla Silk & Bamboo Marrow Formulations”
              </p>
            </div>

            {/* VIP Reservation Form */}
            {isReserved ? (
              <div className="p-3.5 bg-[#007288] border border-[#D4AF37] flex items-center gap-3 text-xs font-cinzel tracking-wider text-[#F3E5AB]">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>You are on the VIP Launch Priority Access List.</span>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter VIP email for release..."
                  className="px-4 py-2.5 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#F7F4EB] placeholder-[#8EAAB0]/70 font-sans outline-none focus:border-[#D4AF37] min-w-[240px]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B89028] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-lg shrink-0 transition-all flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};