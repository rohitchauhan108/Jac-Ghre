import React from 'react';
import { GoldEmblem } from '../ui/GoldEmblem';
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Globe,
  Sparkles,
  Gift,
  Clock,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BRAND_INFO } from '../../data/products';

const logoLight = '/images/logo-light.png';

export const Footer: React.FC = () => {
  const { navigateToPage, setIsWelcomePopupOpen } = useShop();

  return (
    <footer
      className="
        border-t
        pt-16
        pb-12
        font-poppins
        relative
        overflow-hidden
        bg-[#006073]
        border-[#D4AF37]/30
        text-[#E8DCC4]
      "
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      {/* Top Gold Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Subtle Gold Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle Luxury Pattern */}
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              135deg,
              transparent 0%,
              transparent 47%,
              rgba(255,255,255,0.045) 47%,
              rgba(255,255,255,0.045) 48%,
              transparent 48%,
              transparent 100%
            ),
            linear-gradient(
              45deg,
              transparent 0%,
              transparent 47%,
              rgba(255,255,255,0.035) 47%,
              rgba(255,255,255,0.035) 48%,
              transparent 48%,
              transparent 100%
            )
          `,
          backgroundSize: '110px 110px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =========================================================
            PRE-LAUNCH VIP BANNER
        ========================================================= */}

        <div
          className="
            mb-12
            p-6
            border
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            bg-[#0C8A9B]
            border-[#D4AF37]/40
            text-[#F7F4EB]
          "
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
                Pre-order our limited Parisian atelier batch today. Use VIP
                Voucher Code <strong>GHRE15</strong> for 15% inaugural savings.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWelcomePopupOpen(true)}
            className="
              px-5
              py-2.5
              bg-[#D4AF37]
              text-[#062B35]
              font-cinzel
              text-xs
              font-bold
              uppercase
              tracking-wider
              hover:brightness-110
              shadow
              shrink-0
              flex
              items-center
              gap-1.5
              transition-all
            "
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Open VIP Invitation</span>
          </button>
        </div>

        {/* =========================================================
            MAIN FOOTER GRID
        ========================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D4AF37]/15">

          {/* =====================================================
              BRAND IDENTITY
          ===================================================== */}

          <div className="lg:col-span-2 space-y-5">

            {/* SAME LOGO AS NAVBAR */}
            <div className="flex items-center">
              <button
                onClick={() => navigateToPage('home')}
                className="
                  group
                  flex
                  items-center
                  text-left
                  focus:outline-none
                  cursor-pointer
                "
                aria-label="GHRÉ Paris Home"
              >
                <img
                  src={logoLight}
                  alt="GHRÉ Paris Logo"
                  className="
                    h-16
                    sm:h-20
                    lg:h-32
                    w-auto
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-[1.03]
                  "
                />
              </button>
            </div>

    

            <p className="text-xs sm:text-sm font-normal leading-relaxed max-w-sm text-[#A5BFC4]">
              Haute hair care and solar fragrance rituals formulated with pure
              cold-pressed Moroccan prickly pear oil and botanical extracts by
              master artist Jac Ghré.
            </p>

            {/* Founder */}
            <div className="pt-1 flex items-center gap-4 text-xs font-cinzel text-[#D4AF37]">
              <span className="font-script text-2xl text-[#D4AF37]">
                Jac Ghré
              </span>

              <span className="text-[10px] tracking-widest uppercase text-[#8EAAB0]">
                Artistic Director
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] sm:text-xs text-[#C5D5D8] leading-relaxed">
              <p className="font-cinzel text-[#D4AF37] uppercase tracking-[0.18em] text-[10px]">
                {BRAND_INFO.contact.title}
              </p>
              <p className="font-semibold text-[#F7F4EB] uppercase">{BRAND_INFO.contact.name}</p>
              <p>{BRAND_INFO.contact.secondaryTitle}</p>
              <p>{BRAND_INFO.contact.specialty}</p>
              <p>{BRAND_INFO.contact.offering}</p>
              <p>{BRAND_INFO.contact.company}</p>
              <p>Cell USA: {BRAND_INFO.contact.cellUsa}</p>
              <a href={`mailto:${BRAND_INFO.contact.email}`} className="hover:text-[#D4AF37] transition-colors">
                Email: {BRAND_INFO.contact.email}
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="
                  w-9 h-9
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  shadow-md
                  border-[#D4AF37]/30
                  bg-[#0C8A9B]
                  text-[#D4AF37]
                  hover:bg-[#D4AF37]
                  hover:text-[#062B35]
                "
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="
                  w-9 h-9
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  shadow-md
                  border-[#D4AF37]/30
                  bg-[#0C8A9B]
                  text-[#D4AF37]
                  hover:bg-[#D4AF37]
                  hover:text-[#062B35]
                "
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <button
                onClick={() => navigateToPage('contact')}
                className="
                  w-9 h-9
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  shadow-md
                  border-[#D4AF37]/30
                  bg-[#0C8A9B]
                  text-[#D4AF37]
                  hover:bg-[#D4AF37]
                  hover:text-[#062B35]
                  cursor-pointer
                "
                aria-label="Global Maison Concierge"
                title="Global Maison Concierge"
              >
                <Globe className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* =====================================================
              MAISON NAVIGATION
          ===================================================== */}

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
                  onClick={() => navigateToPage('gallery')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-[#C5D5D8] cursor-pointer"
                >
                  The Gallery
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

          {/* =====================================================
              SIGNATURE RITUALS
          ===================================================== */}

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

          {/* =====================================================
              ATELIERS
          ===================================================== */}

          <div className="space-y-3">
            <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase block font-semibold">
              Maison Ateliers
            </span>

            <div className="space-y-3 text-xs sm:text-sm text-[#A5BFC4]">

              <div>
                <strong className="font-cinzel block text-[11px] text-[#F7F4EB]">
                  FISHER ISLAND ATELIER
                </strong>
                <span className="text-xs">
                  Fisher Island Club, Miami, FL 33109
                </span>
              </div>

              <div>
                <strong className="font-cinzel block text-[11px] text-[#F7F4EB]">
                  PARIS ATELIER
                </strong>
                <span className="text-xs">
                  Place Vendôme, 75001 Paris
                </span>
              </div>

              <div>
                <strong className="font-cinzel block text-[11px] text-[#F7F4EB]">
                  SAINT-TROPEZ SALON
                </strong>
                <span className="text-xs">
                  Place des Lices, 83990 Saint-Tropez
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* =========================================================
            BOTTOM BAR
        ========================================================= */}

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-[#8FAAB0]">

          <p>
            © {new Date().getFullYear()} GHRÉ PARIS & JAC GHRÉ BEAUTY.
            ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6 text-[11px] font-cinzel tracking-wider uppercase">

            <button
              onClick={() => navigateToPage('about-founder')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Jac Ghré Story
            </button>

            <span>•</span>

            <button
              onClick={() => navigateToPage('about-company')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              The Maison
            </button>

            <span>•</span>

            <button
              onClick={() => navigateToPage('contact')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Contact Us
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
};