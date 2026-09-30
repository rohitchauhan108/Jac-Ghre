import React from "react";
import { motion } from "motion/react";
import {
  Award,
  ShieldCheck,
  SunMedium,
  ArrowUpRight,
  Droplets,
} from "lucide-react";
import { GoldEmblem } from "../ui/GoldEmblem";
import { useShop } from "../../context/ShopContext";

export const IntroSection: React.FC = () => {
  const { theme, navigateToPage } = useShop();
  const isDark = theme === "dark";

  const hallmarks = [
    {
      icon: Award,
      bg: "/intro-page/3.webp",
      badge: "HAUTE COIFFURE",
      title: "ATELIER CRAFT",
      subtitle: "Formulated by Jac Ghré",
      description:
        "Backstage runway direction for Thierry Mugler synthesized into daily transformative hair rituals.",
      linkAction: () => navigateToPage("jac-ghre"),
      actionLabel: "Discover Jac Ghré",
    },
    {
      icon: Droplets,
      bg: "/intro-page/2.webp",
      badge: "SIGNATURE ELIXIR",
      title: "PRICKLY PEAR BOTANICALS",
      subtitle: "Cold-Pressed Excellence",
      description:
        "Precious Moroccan prickly pear seed oil rich in Vitamin E, omega sterols, and cellular keratin shield.",
      linkAction: () => navigateToPage("hair-care"),
      actionLabel: "Explore Hair Care",
    },
    {
      icon: SunMedium,
      bg: "/intro-page/3.webp",
      badge: "SOLAR LUXURY",
      title: "COASTAL SOLAR SHIELD",
      subtitle: "Sunlit Rituals",
      description:
        "Engineered for UV radiation, sea salt, and tropical humidity to preserve radiant color and mirror gloss.",
      linkAction: () => navigateToPage("shop", "all"),
      actionLabel: "View Sun & Body",
    },
    {
      icon: ShieldCheck,
      bg: "/intro-page/2.webp",
      badge: "CLEAN BOTANICS",
      title: "HAUTE FORMULATION",
      subtitle: "Zero Compromise",
      description:
        "Strictly sulfate-free, paraben-free, cruelty-free, and safe for all Keratin and color-treated hair.",
      linkAction: () => navigateToPage("shop", "all"),
      actionLabel: "Shop All 12 Creations",
    },
  ];

  return (
    <section
      id="brand-pillars"
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors duration-400 ${
        isDark ? "bg-[#007288]" : "bg-[#FAF7F2]"
      }`}
    >
      {/* =========================================================
          LUXURY TEAL BACKGROUND SYSTEM
          Main: #007288
          Pattern: #006073
      ========================================================= */}

      {isDark && (
        <>
          {/* Large soft teal atmospheric glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,96,115,0.55)_0%,transparent_38%),radial-gradient(circle_at_80%_75%,rgba(0,96,115,0.5)_0%,transparent_40%)] pointer-events-none" />

          {/* Subtle diagonal luxury pattern */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  transparent 0%,
                  transparent 46%,
                  rgba(0,96,115,0.32) 46%,
                  rgba(0,96,115,0.32) 47%,
                  transparent 47%,
                  transparent 100%
                ),
                linear-gradient(
                  45deg,
                  transparent 0%,
                  transparent 46%,
                  rgba(0,96,115,0.22) 46%,
                  rgba(0,96,115,0.22) 47%,
                  transparent 47%,
                  transparent 100%
                )
              `,
              backgroundSize: "90px 90px",
            }}
          />

          {/* Soft center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_68%)] pointer-events-none" />

          {/* Top gold line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          {/* Bottom gold line */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        </>
      )}

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =======================================================
            MAIN CENTRAL STATEMENT
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Gold Crest */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />

            <div
              className={`p-2 border border-[#D4AF37]/50 shadow-lg ${
                isDark ? "bg-[#006073]" : "bg-[#FAF7F2]"
              }`}
            >
              <GoldEmblem size={28} withGlow />
            </div>

            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          {/* Eyebrow */}
          <div className="flex flex-col gap-3 text-[13px] sm:text-xs  font-bold tracking-[0.4em] uppercase text-white mb-3">
            <span>L'ART DE VIVRE</span>
          </div>

          {/* Heading */}
          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-balance leading-tight ${
              isDark ? "text-[#FBF9F3]" : "text-[#062B35]"
            }`}
          >
            COSMETICS HAIR CARE WITH EXPERIENCE
          </h2>

          {/* Quote */}
          <div className="relative mt-7 px-4 sm:px-12">
            <span className="absolute -top-6 left-0 sm:left-4 text-5xl sm:text-6xl text-white select-none">
              “
            </span>

            <p
              className={`text-lg sm:text-4xl font-editorial italic leading-relaxed text-balance ${
                isDark ? "text-white" : "text-white"
              }`}
            >
              An Expression of Timeless Beauty
              {/* Inspired by the sun, the sea, and the French art of living
              beautifully. */}
            </p>

            <span className="absolute -bottom-10 right-0 sm:right-4 text-5xl sm:text-6xl text-[#D4AF37]/25 select-none">
              ”
            </span>
          </div>

          {/* Description */}
          <p
            className={`mt-8 text-xl sm:text-base font-outfit font-light max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-[#D0E1E5]" : "text-[#415C65]"
            }`}
          >
            Born from sunlit beauty rituals and runway glamour,{" "}
            <strong className="font-semibold text-[#D4AF37]">GHRÉ</strong>{" "}
            marries cosmetic excellence with cold-pressed botanical botanicals.
          </p>
        </motion.div>

        {/* =========================================================
            4 ATELIER PILLARS
        ========================================================= */}

        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
          {hallmarks.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
              }}
              onClick={item.linkAction}
              style={{
                backgroundImage: `url(${item.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "90% center",
                backgroundRepeat: "no-repeat",
              }}
              className={`group relative p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isDark
                  ? `
                    bg-[#007288]
                    border-[#D4AF37]/30
                    hover:bg-[#006073]
                    hover:border-[#D4AF37]
                    hover:shadow-[0_15px_35px_rgba(0,96,115,0.8)]
                  `
                  : `
                    bg-[#FFFFFF]
                    border-[#D4AF37]/40
                    hover:border-[#D4AF37]
                    hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]
                  `
              }`}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/95 to-transparent"></div>{" "}
              {/* Subtle card highlight */}
              {isDark && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,114,136,0.55)_0%,transparent_55%)] pointer-events-none opacity-80" />
              )}
              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon + Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`w-11 h-11 flex items-center justify-center border transition-all duration-300 ${
                      isDark
                        ? "bg-white border-[#D4AF37] text-[#D4AF37]"
                        : "bg-white border-[#D4AF37] text-[#D4AF37]"
                    }`}
                  >
                    <item.icon className="w-8 h-8" />
                  </div>

                  <span
                    className={`px-2.5 py-1 text-[11px]  font-bold tracking-[0.2em] text-white border-2 border-[#D4AF37] uppercase ${
                      isDark ? "bg-[#006d83]" : "bg-[#FAF7F2]"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Subtitle */}
                <span
                  className={`text-[10px] font-extrabold tracking-[0.25em] block uppercase mb-1.5 ${
                    isDark ? "text-[#D4AF37]" : "text-[#B8860B]"
                  }`}
                >
                  {item.subtitle}
                </span>

                {/* Title */}
                <h3
                  className={`text-[16px] font-poppins sm:text-lg font-black mb-2.5 ${
                    isDark ? "text-[#007288]" : "text-[#007288]"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-lg sm:text-[15px] font-outfit font-light leading-relaxed mb-4 pr-15 ${
                    isDark ? "text-black" : "text-black"
                  }`}
                >
                  {item.description}
                </p>
              </div>
              {/* Action */}
              <div className="relative z-10 pt-3 border-t border-[#D4AF37] flex items-center justify-between text-[14px] font-bold tracking-wider text-[#D4AF37]">
                <span>{item.actionLabel}</span>

                <span className="bg-white p-1 rounded-lg">
                  <ArrowUpRight className="w-5 h-5 text-[#D4AF37] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
