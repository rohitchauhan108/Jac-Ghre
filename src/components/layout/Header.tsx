import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Clock,
  Gift,
} from "lucide-react";
import { useShop, PageType } from "../../context/ShopContext";
import { PRODUCTS } from "../../data/products";
const logoLight = "/images/logo-light.png";

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    setIsWelcomePopupOpen,
    setQuickViewProduct,
    currentPage,
    navigateToPage,
  } = useShop();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const lastScrollY = useRef(0);

  // Smart Sticky Scroll: Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 40) {
        // At the top
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        // Scrolling UP -> reveal sticky header
        if (currentScrollY < lastScrollY.current - 5) {
          setIsVisible(true);
        }
        // Scrolling DOWN -> hide header
        else if (
          currentScrollY > lastScrollY.current + 5 &&
          currentScrollY > 120
        ) {
          setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { name: string; page: PageType; hasDropdown?: boolean }[] = [
    { name: "HOME", page: "home" },
    { name: "SHOP", page: "shop", hasDropdown: true },
    { name: "ABOUT", page: "about-company" },
    { name: "ABOUT THE FOUNDER", page: "about-founder" },
    { name: "GALLERY", page: "gallery" },
    { name: "CONTACT US", page: "contact" },
  ];

  const featuredCreations = PRODUCTS.slice(0, 3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-400 ease-out transform ${
          isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#006073]/98 backdrop-blur-lg border-b border-[#D4AF37]/35 py-3 shadow-[0_12px_35px_rgba(0,96,115,0.6)]"
            : "bg-gradient-to-b from-[#006073]/95 via-[#007288]/80 to-transparent py-4 sm:py-5 border-b border-[#D4AF37]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger (Left on mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 transition-colors focus:outline-none text-[#D4AF37] hover:text-[#FFF3C4]"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo - Updated to display logoDark Image */}
          <div className="flex items-center">
            <button
              onClick={() => navigateToPage("home")}
              className="group flex items-center text-left focus:outline-none cursor-pointer"
              aria-label="GHRÉ Paris Home"
            >
              <img
                src={logoLight}
                alt="GHRÉ Paris Logo"
                className="h-20 sm:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.page ||
                (link.page === "about-founder" && currentPage === "jac-ghre");
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.hasDropdown && setShopDropdownOpen(true)
                  }
                  onMouseLeave={() =>
                    link.hasDropdown && setShopDropdownOpen(false)
                  }
                >
                  <button
                    onClick={() => navigateToPage(link.page)}
                    className={`font-cinzel text-xs xl:text-[13px] tracking-[0.2em] py-2 inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#D4AF37] font-bold border-b-2 border-[#D4AF37]"
                        : "text-[#E8DCC4] hover:text-[#D4AF37]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]/70 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </button>

                  {/* Dropdown Mega Menu for SHOP */}
                  {link.hasDropdown && shopDropdownOpen && (
                    <div className="absolute top-full -left-20 w-[640px] pt-3 z-50">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="border-2 shadow-2xl p-6 grid grid-cols-12 gap-6 bg-[#006073] border-[#D4AF37]/50 text-[#F7F4EB]"
                      >
                        {/* Left: Collections Categories */}
                        <div className="col-span-5 border-r border-[#D4AF37]/20 pr-4 space-y-3">
                          <span className="text-[11px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase block border-b border-[#D4AF37]/20 pb-1.5 font-bold">
                            Curated Collections
                          </span>
                          <div className="space-y-2.5 text-xs font-poppins">
                            <button
                              onClick={() => {
                                setShopDropdownOpen(false);
                                navigateToPage("hair-care");
                              }}
                              className="block text-left w-full font-cinzel text-xs tracking-wider transition-colors text-[#F7F4EB] hover:text-[#D4AF37]"
                            >
                              Haute Hair Care Rituals
                            </button>
                            <button
                              onClick={() => {
                                setShopDropdownOpen(false);
                                navigateToPage("sun-body");
                              }}
                              className="block text-left w-full font-cinzel text-xs tracking-wider transition-colors text-[#F7F4EB] hover:text-[#D4AF37]"
                            >
                              GHRÉ Sun & Shimmer Body
                            </button>
                            <button
                              onClick={() => {
                                setShopDropdownOpen(false);
                                navigateToPage("fragrance");
                              }}
                              className="block text-left w-full font-cinzel text-xs tracking-wider transition-colors text-[#F7F4EB] hover:text-[#D4AF37]"
                            >
                              Blossom Positano Eau de Parfum
                            </button>
                            <button
                              onClick={() => {
                                setShopDropdownOpen(false);
                                navigateToPage("shop", "haircare");
                              }}
                              className="block text-left w-full font-cinzel text-xs tracking-wider transition-colors text-[#F7F4EB] hover:text-[#D4AF37]"
                            >
                              Repair Shampoos & Masks
                            </button>
                            {/* <button
                              onClick={() => {
                                setShopDropdownOpen(false);
                                navigateToPage('shop', 'all');
                              }}
                              className="block text-left w-full text-[#D4AF37] hover:text-[#FFF3C4] font-cinzel text-xs font-bold tracking-wider pt-1"
                            >
                              View All 9 Creations →
                            </button> */}
                          </div>
                        </div>

                        {/* Right: Featured Products Mini-Showcase */}
                        <div className="col-span-7 space-y-3">
                          <span className="text-[11px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase block border-b border-[#D4AF37]/20 pb-1.5 font-bold">
                            Iconic Formulations
                          </span>
                          <div className="grid grid-cols-3 gap-2.5">
                            {featuredCreations.map((p) => (
                              <div
                                key={p.id}
                                onClick={() => {
                                  setShopDropdownOpen(false);
                                  setQuickViewProduct(p);
                                }}
                                className="group/item cursor-pointer p-2.5 border transition-all text-center bg-[#007288] border-[#D4AF37]/20 hover:border-[#D4AF37]"
                              >
                                <div className="h-16 w-full flex items-center justify-center overflow-hidden mb-1">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="max-h-full object-contain group-hover/item:scale-105 transition-transform"
                                  />
                                </div>
                                <span className="font-cinzel text-[11px] line-clamp-1 block text-[#F7F4EB]">
                                  {p.name}
                                </span>
                                <span className="text-xs text-[#D4AF37] font-cinzel font-bold block mt-0.5">
                                  ${p.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons (Account, Cart) */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* Account / Concierge */}
            <button
              onClick={() => navigateToPage("contact")}
              className="p-2 transition-colors cursor-pointer text-[#E8DCC4] hover:text-[#D4AF37]"
              aria-label="Concierge"
              title="GHRÉ Client Concierge"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 transition-colors cursor-pointer text-[#F3E5AB] hover:text-white"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-[#F9E8B2] to-[#D4AF37] text-[#0E4C5A] font-cinzel text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#006073]/88 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm border-r-2 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto bg-[#007288] border-[#D4AF37]/40 text-[#F7F4EB]"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <img
                      src={logoLight}
                      alt="GHRÉ Paris Logo"
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-[#D4AF37] hover:text-[#FFF3C4] border border-[#D4AF37]/30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Coming Soon Notice inside Mobile Drawer */}
                <div className="flex items-center justify-between gap-2 p-3 bg-[#006073]/60 border border-[#D4AF37]/30 mb-5">
                  <div className="flex items-center gap-1.5 text-[11px] font-cinzel text-[#D4AF37] font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>LAUNCHING SOON</span>
                  </div>
                  <span className="text-[10px] font-cinzel text-[#8EAAB0]">
                    GHRÉ PARIS
                  </span>
                </div>

                {/* Nav Links */}
                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateToPage(link.page);
                      }}
                      className={`block w-full text-left font-cinzel text-sm tracking-[0.22em] py-2.5 border-b border-[#D4AF37]/10 transition-colors ${
                        currentPage === link.page ||
                        (link.page === "about-founder" &&
                          currentPage === "jac-ghre")
                          ? "text-[#D4AF37] font-bold"
                          : "text-[#E8DCC4] hover:text-[#D4AF37]"
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsWelcomePopupOpen(true);
                    }}
                    className="w-full py-2.5 bg-[#006073] border border-[#D4AF37] text-[#F3E5AB] font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mb-3"
                  >
                    <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Launch Notice</span>
                  </button>

                  <span className="text-[11px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase block font-bold">
                    Luxury Salons & Ateliers
                  </span>
                  <p className="text-xs text-[#8EAAB0] font-poppins">
                    Fisher Island, Miami • Paris • Saint-Tropez
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#D4AF37]/20">
                <p className="text-xs font-editorial italic text-[#D4AF37] text-center mb-1">
                  “Making women beautiful is my passion.”
                </p>
                <span className="block text-[10px] text-center font-cinzel text-[#8EAAB0]">
                  — Jac Ghré
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
