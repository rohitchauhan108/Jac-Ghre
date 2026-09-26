import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Clock,
  Gift,
  Search,
  LogOut,
  UserCircle2,
  Loader2,
} from "lucide-react";
import { useShop, PageType } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
const logoLight = "/images/logo-light.png";

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const {
    cartCount,
    setIsCartOpen,
    setIsWelcomePopupOpen,
    setQuickViewProduct,
    setIsSearchOpen,
    currentPage,
    navigateToPage,
  } = useShop();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const prevCartCount = useRef(cartCount);
  const [cartBadgeKey, setCartBadgeKey] = useState(0);

  useEffect(() => {
    if (cartCount !== prevCartCount.current && cartCount > 0) {
      setCartBadgeKey((k) => k + 1);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConciergeClick = () => {
    if (authLoading) return;
    if (isAuthenticated) {
      setProfileMenuOpen((prev) => !prev);
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
    router.push("/");
  };

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks: { name: string; page: PageType }[] = [
    { name: "HOME", page: "home" },
    { name: "SHOP", page: "shop" },
    { name: "ABOUT", page: "about-company" },
    { name: "ABOUT THE FOUNDER", page: "about-founder" },
    { name: "THE ARTIST", page: "artist" },
    { name: "GALLERY", page: "gallery" },
    { name: "CONTACT US", page: "contact" },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-400 ease-out transform ${
          isVisible
            ? "translate-y-0"
            : "-translate-y-full pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#006d83] bg-[#006d83] backdrop-blur-lg border-b border-[#0B4F71]/15 py-3 shadow-md md:shadow-[0_12px_35px_rgba(11,79,113,0.14)]"
            : "bg-[#006d83] py-4 sm:py-5 lg:border-b lg:border-[#0B4F71]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile header layout to match reference */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <button
              onClick={() => navigateToPage("home")}
              className="group flex items-center text-left focus:outline-none cursor-pointer"
              aria-label="GHRÉ Home"
            >
              <img
                src="/logo.png"
                alt="GHRÉ Logo Mobile"
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleConciergeClick}
                className="p-2 text-[#D4AF37] hover:text-[#D4AF37] transition-colors relative"
                aria-label={isAuthenticated ? "My Account" : "Sign In"}
                title={isAuthenticated ? "My Account" : "Sign In"}
              >
                {authLoading ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : isAuthenticated ? (
                  <UserCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                {isAuthenticated && profileMenuOpen && (
                  <span className="absolute top-full right-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#D4AF37] hover:text-[#D4AF37] transition-colors relative"
                aria-label="Shopping Bag"
                title={`Cart · ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartBadgeKey}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.35, 1],
                      opacity: [0, 1, 1],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 0.55,
                      times: [0, 0.45, 1],
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[20px] px-1 bg-white text-[#006073] text-[12px] font-black tracking-tight rounded-full flex items-center justify-center border-[2.5px] border-[#FBF9F3] ring-1 z-[1] select-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Desktop header */}
          <div className="hidden lg:flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateToPage("home")}
                className="group flex items-center text-left focus:outline-none cursor-pointer"
                aria-label="GHRÉ Home"
              >
                <img
                  src="/logo.png"
                  alt="GHRÉ Logo Desktop"
                  className="h-20 sm:h-20 w-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            </div>

            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  currentPage === link.page ||
                  (link.page === "about-founder" &&
                    currentPage === "jac-ghre");

                return (
                  <button
                    key={link.name}
                    onClick={() => navigateToPage(link.page)}
                    className={` text-xs xl:text-[13px] tracking-[0.2em] py-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "lg:text-[#D4AF37] text-[#0B4F71] font-bold border-b-2 lg:border-[#D4AF37] border-[#0B4F71]"
                        : "lg:text-[#E8DCC4] lg:hover:text-[#D4AF37] text-[#0B4F71] hover:text-[#176B87]"
                    }`}
                  >
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2.5 sm:space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div ref={profileMenuRef} className="relative">
                <button
                  onClick={handleConciergeClick}
                  className="p-2 transition-colors cursor-pointer lg:text-[#E8DCC4] lg:hover:text-[#D4AF37] text-[#0B4F71] hover:text-[#176B87]"
                  aria-label={isAuthenticated ? "My Account" : "Sign In"}
                  title={isAuthenticated ? user?.name || "My Account" : "Sign In / GHRÉ Client Concierge"}
                >
                  {authLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : isAuthenticated ? (
                    <UserCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                <AnimatePresence>
                  {profileMenuOpen && isAuthenticated && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-64 origin-top-right z-50"
                    >
                      <div className="bg-gradient-to-b from-[#097B8A] to-[#06242B] border-2 border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                        {/* User info header */}
                        <div className="p-5 border-b border-[#D4AF37]/20 bg-[#006e83]/30">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#8B6914] rounded-full flex items-center justify-center shrink-0 shadow-lg">
                              <span className="font-cinzel text-xl font-bold text-[#06242B]">
                                {(user?.name || "G").charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-cinzel text-sm text-[#FBF9F3] font-bold tracking-wide truncate">
                                {user?.name || "GHRÉ Patron"}
                              </p>
                              <p className="font-outfit text-xs text-[#8EAAB0] truncate">
                                {user?.email || ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <button
                            onClick={() => {
                              setProfileMenuOpen(false);
                              router.push("/account");
                            }}
                            className="w-full flex items-center gap-3 px-5 py-3 font-outfit text-xs text-[#E8DCC4] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all tracking-wide"
                          >
                            <UserCircle2 className="w-4 h-4 text-[#D4AF37]" />
                            <span className="uppercase tracking-[0.2em] font-medium">My Account</span>
                          </button>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-5 py-3 font-outfit text-xs text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-all tracking-wide border-t border-[#D4AF37]/10 mt-1"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="uppercase tracking-[0.2em] font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 transition-colors cursor-pointer lg:text-[#E8DCC4] lg:hover:text-[#D4AF37] text-[#0B4F71] hover:text-[#176B87]"
                aria-label="Shopping Bag"
                title={`Cart · ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 lg:text-[#E8DCC4] text-[#0B4F71]" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartBadgeKey}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.4, 1],
                      opacity: [0, 1, 1],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.45, 1],
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[20px] px-1 bg-white text-[#006073] text-[12px] font-black tracking-tight rounded-full flex items-center justify-center border-[2.5px] border-[#FBF9F3] ring-1 z-[1] select-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
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
                      src="/logo.png"
                      alt="GHRÉ Logo"
                      className="h-20 w-auto object-contain"
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
                  <div className="flex items-center gap-1.5 text-[11px]  text-[#D4AF37] font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>LAUNCHING SOON</span>
                  </div>

                  <span className="text-[10px]  text-[#8EAAB0]">
                    GHRÉ
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
                      className={`block w-full text-left  text-sm tracking-[0.22em] py-2.5 border-b border-[#D4AF37]/10 transition-colors ${
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
                    className="w-full py-2.5 bg-[#006073] border border-[#D4AF37] text-[#F3E5AB]  text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mb-3"
                  >
                    <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Launch Notice</span>
                  </button>

                  <span className="text-[11px]  tracking-[0.3em] text-[#D4AF37] uppercase block font-bold">
                    Luxury Salons & Ateliers
                  </span>

                  <p className="text-xs text-[#8EAAB0] font-poppins">
                    Global Private Client Atelier
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#D4AF37]/20">
                <p className="text-xs font-playfair italic text-[#D4AF37] text-center mb-1">
                  “Making women beautiful is my passion.”
                </p>

                <span className="block text-[10px] text-center  text-[#8EAAB0]">
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