import React from 'react';
import { GoldEmblem } from '../ui/GoldEmblem';
import { BrandLogo } from '../ui/BrandLogo';
import { MapPin, Mail, Phone, Instagram, Facebook, Globe, Sparkles, Gift, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateToPage, setIsWelcomePopupOpen } = useShop();

  return (
    <footer
      className="border-t pt-16 pb-12 font-poppins relative overflow-hidden bg-[#021317] border-[#D4AF37]/30 text-[#E8DCC4]"
    >
      {/* Background Subtle Geometry */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-launch VIP Banner in Footer */}
        <div
          className="mb-12 p-6 border flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#031d25] border-[#D4AF37]/40 text-[#F7F4EB]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] text-[#062B35] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                  OFFICIAL BOUTIQUE LAUNCH COMING SOON
                </span>
              </div>
              <p className="text-xs text-[#A5BFC4]">
                Pre-order our limited Parisian atelier batch today. Use VIP Voucher Code <strong>GHRE15</strong> for 15% inaugural savings.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWelcomePopupOpen(true)}
            className="px-5 py-2.5 bg-[#D4AF37] text-[#062B35] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow shrink-0 flex items-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Open VIP Invitation</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D4AF37]/15">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateToPage('home')}
                className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
              >
                <BrandLogo variant="horizontal" size="md" withScriptTagline withGlow />
              </button>
            </div>

            <p className="text-xs sm:text-sm font-normal leading-relaxed max-w-sm text-[#A5BFC4]">
              Haute hair care and solar fragrance rituals formulated with pure cold-pressed Moroccan prickly pear oil and botanical extracts by master artist Jac Ghré.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-cinzel text-[#D4AF37]">
              <span className="font-script text-2xl text-[#D4AF37]">
                Jac Ghré
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#8EAAB0]">
                Artistic Director
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border flex items-center justify-center transition-all shadow-md border-[#D4AF37]/30 bg-[#041e25] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border flex items-center justify-center transition-all shadow-md border-[#D4AF37]/30 bg-[#041e25] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigateToPage('contact')}
                className="w-9 h-9 border flex items-center justify-center transition-all shadow-md border-[#D4AF37]/30 bg-[#041e25] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] cursor-pointer"
                aria-label="Global Maison Concierge"
                title="Global Maison Concierge"
              >
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 3: Maison Navigation */}
          <div className="space-y-3">
            <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase block font-semibold">
              The Maison
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => navigateToPage('home')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('shop')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  Shop All Creations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('about-founder')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#D4AF37] font-semibold cursor-pointer"
                >
                  About The Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('about-company')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  About The Company
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('contact')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  Contact Us & VIP Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Curated Rituals */}
          <div className="space-y-3">
            <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase block font-semibold">
              Signature Rituals
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => navigateToPage('hair-care')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  Haute Hair Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('sun-body')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  Sun & Shimmer Body
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('fragrance')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  Blossom Positano Parfums
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('about-founder')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  Fisher Island VIP Atelier
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Ateliers */}
          <div className="space-y-3">
            <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase block font-semibold">
              Maison Ateliers
            </span>
            <div className="space-y-3 text-xs sm:text-sm text-[#A5BFC4]">
              <div>
                <strong className="font-cinzel block text-[11px] text-[#F7F4EB]">
                  FISHER ISLAND ATELIER
                </strong>
                <span className="text-xs">Fisher Island Club, Miami, FL 33109</span>
              </div>
              <div>
                <strong className="font-cinzel block text-[11px] text-[#F7F4EB]">
                  PARIS ATELIER
                </strong>
                <span className="text-xs">Place Vendôme, 75001 Paris</span>
              </div>
              <div>
                <strong className="font-cinzel block text-[11px] text-[#F7F4EB]">
                  SAINT-TROPEZ SALON
                </strong>
                <span className="text-xs">Place des Lices, 83990 Saint-Tropez</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-[#8FAAB0]">
          <p>© {new Date().getFullYear()} GHRÉ PARIS & JAC GHRÉ BEAUTY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 text-[11px] font-cinzel tracking-wider uppercase">
            <button onClick={() => navigateToPage('about-founder')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
              Jac Ghré Story
            </button>
            <span>•</span>
            <button onClick={() => navigateToPage('about-company')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
              The Maison
            </button>
            <span>•</span>
            <button onClick={() => navigateToPage('contact')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
