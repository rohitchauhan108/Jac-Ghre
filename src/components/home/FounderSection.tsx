import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Globe, Sparkles, Check, Calendar, ArrowRight, Crown, Star } from 'lucide-react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { CAMPAIGN_IMAGES, BRAND_INFO } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const FounderSection: React.FC = () => {
  const { navigateToPage } = useShop();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [booked, setBooked] = useState(false);

  const supermodels = ['Claudia Schiffer', 'Cindy Crawford', 'Helena Christensen', 'Naomi Campbell', 'Kate Moss'];

  return (
    <section id="founder" className="relative py-24 sm:py-32 bg-[#007288] overflow-hidden border-t border-[#D4AF37]/30">
      {/* Background gradients and subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#006073] via-[#007288] to-[#006073]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Founder Portrait matching Reference Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Outer offset gold border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/40 pointer-events-none hidden sm:block" />

            <div className="relative z-10 overflow-hidden bg-[#006073] border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,96,115,0.85)]">
              <img
                src={CAMPAIGN_IMAGES.jacGhre}
                alt="Jac Ghré — Beauty Expert"
                className="w-full aspect-[4/5] object-cover object-top filter contrast-105"
              />

              {/* Founder Header Ribbon */}
              <div className="absolute top-0 inset-x-0 p-5 bg-gradient-to-b from-[#006073]/95 via-[#006073]/80 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GoldEmblem size={24} withGlow />
                  <span className="font-cinzel text-xs font-bold text-[#F3E5AB] tracking-widest uppercase">
                    JAC GHRÉ
                  </span>
                </div>
                <span className="text-[10px] font-cinzel tracking-widest text-[#D4AF37] uppercase font-bold border border-[#D4AF37]/40 px-2 py-0.5 bg-[#006073]/60">
                  BEAUTY EXPERT
                </span>
              </div>

              {/* Global Atelier Identity Overlay */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 bg-[#006073]/95 border border-[#D4AF37]/50 backdrop-blur-md flex items-center justify-between text-xs font-cinzel text-[#F3E5AB]">
                <span className="flex items-center gap-1.5 text-[11px] tracking-wider text-[#F3E5AB]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Private Client Atelier
                </span>
                <span className="flex items-center gap-1.5 text-[11px] tracking-wider text-[#D4AF37]">
                  <Globe className="w-3.5 h-3.5" /> Jacghre.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: The Story & Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GoldEmblem size={20} />
                <span className="text-xs font-cinzel tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">
                  THE MAN • THE NAME
                </span>
              </div>

              <h2 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
                Jac Ghré
              </h2>

              <p className="text-xs sm:text-sm font-cinzel tracking-[0.25em] text-[#D4AF37] mt-1 uppercase font-semibold">
                International Hair, Beauty & Fashion Expert
              </p>

              <div className="h-0.5 w-24 bg-gradient-to-r from-[#D4AF37] to-transparent my-4" />
            </div>

            {/* Poster Story text */}
            <div className="p-6 sm:p-7 bg-[#006073]/80 border border-[#D4AF37]/35 space-y-3 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase block border-b border-[#D4AF37]/20 pb-2 font-bold">
                THE STORY & RUNWAY LEGACY
              </span>

              <p className="text-xs sm:text-sm text-[#E8DCC4] font-outfit font-light leading-relaxed">
                Jac Ghré is widely recognized for his visionary work in the global runway and fashion industry. He notably collaborated with legendary designer <strong className="text-[#F3E5AB]">Thierry Mugler</strong>, serving as <strong>Hair Director</strong> across major international fashion shows.
              </p>

              {/* Supermodels worked with mini-bar */}
              <div className="pt-2">
                <span className="text-[10px] font-cinzel text-[#8EAAB0] uppercase tracking-wider block mb-1.5 font-bold">
                  HAUTE COUTURE RUNWAYS & EDITORIALS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {supermodels.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 bg-[#006073] border border-[#D4AF37]/30 text-[10px] font-outfit text-[#D4AF37]"
                    >
                      {m}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 bg-[#006073] border border-[#D4AF37]/30 text-[10px] font-outfit text-[#8EAAB0]">
                    + Celebrities & Elite Models
                  </span>
                </div>
              </div>
            </div>

            {/* The Vision Quote matching Poster */}
            <div className="p-5 bg-gradient-to-r from-[#007288] to-[#006073] border-l-4 border-[#D4AF37] space-y-1.5 shadow-xl">
              <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase block font-semibold">
                THE VISION
              </span>
              <p className="font-playfair text-2xl sm:text-3xl italic text-[#F3E5AB]">
                “Making women beautiful is my passion.”
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#D4AF37]/20">
                <span className="text-xs font-cinzel text-[#D4AF37] tracking-widest uppercase font-bold">
                  — Jac Ghré
                </span>
                <span className="font-script text-3xl text-[#D4AF37] select-none">
                  Jac Ghré
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateToPage('jac-ghre')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#062B35] font-cinzel text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Full Founder Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowBookingModal(true)}
                className="px-5 py-3.5 bg-[#006073] border border-[#D4AF37]/60 text-[#F3E5AB] font-cinzel text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#007288] transition-all cursor-pointer"
              >
                Inquire Atelier Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-md w-full p-8 bg-[#006073] border-2 border-[#D4AF37] shadow-2xl">
            <h3 className="font-cinzel text-xl text-[#F7F4EB] uppercase tracking-wider mb-2 text-center">
              Private Atelier Inquiry
            </h3>
            <p className="text-xs text-[#B5CAD0] text-center mb-6 font-outfit">
              Schedule a private luxury styling consultation with Jac Ghré through our private client concierge.
            </p>

            {booked ? (
              <div className="p-4 bg-[#007288] border border-[#D4AF37] text-center text-xs font-cinzel text-[#F3E5AB]">
                <Check className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                Thank you. Our concierge team will reach out within 12 hours.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBooked(true);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#F7F4EB] placeholder-[#8EAAB0] outline-none font-outfit"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-2.5 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#F7F4EB] placeholder-[#8EAAB0] outline-none font-outfit"
                />
                <select className="w-full px-4 py-2.5 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#F7F4EB] outline-none font-outfit cursor-pointer">
                  <option>Private Client Atelier</option>
                  <option>Haute Couture Consultation</option>
                  <option>Signature Botanical Ritual</option>
                </select>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold uppercase cursor-pointer"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingModal(false);
                      setBooked(false);
                    }}
                    className="px-4 py-3 bg-[#006073] border border-[#D4AF37]/40 text-xs text-[#B5CAD0] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
