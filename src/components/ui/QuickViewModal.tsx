import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Star, ShoppingBag, Heart, Check, Shield, Droplets, Leaf } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoldEmblem } from './GoldEmblem';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    currencySymbol,
    currencyRate,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'composition' | 'scent'>('details');
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const formattedPrice = `${currencySymbol}${(product.price * currencyRate * quantity).toFixed(0)}`;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-[#021317]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-[#062c37] border border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)] rounded-none overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-30 p-2 text-[#D4AF37] hover:text-[#F3E5AB] hover:bg-[#041e25] transition-colors border border-[#D4AF37]/20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
            {/* Left Image Showcase */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#083542] via-[#062b35] to-[#031920] p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#D4AF37]/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none" />

              {product.badge && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase font-cinzel tracking-[0.2em] bg-[#041d24]/90 text-[#F3E5AB] border border-[#D4AF37]/40">
                  <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                  {product.badge}
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="max-h-[340px] w-full object-contain relative z-10 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
              />

              <div className="mt-6 flex items-center gap-2 text-xs text-[#D4AF37]/90 font-cinzel tracking-widest uppercase">
                <GoldEmblem size={18} />
                <span>Paris • Saint-Tropez • Miami</span>
              </div>
            </div>

            {/* Right Information */}
            <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-[#062c37] to-[#041e26]">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase">
                    {product.categoryLabel}
                  </span>
                  {product.rating && (
                    <div className="flex items-center gap-1 text-xs text-[#F3E5AB]">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="font-sans font-medium">{product.rating}</span>
                      <span className="text-[#D4AF37]/60">({product.reviewsCount} reviews)</span>
                    </div>
                  )}
                </div>

                <h2 className="font-cinzel text-2xl md:text-3xl text-[#F7F4EB] tracking-wide">
                  {product.name}
                </h2>

                {product.frenchName && (
                  <p className="text-sm font-editorial italic text-[#D4AF37]/90 mt-0.5 mb-2">
                    {product.frenchName}
                  </p>
                )}

                <div className="flex items-baseline gap-3 my-3">
                  <span className="text-2xl font-cinzel font-semibold text-[#F3E5AB]">
                    {formattedPrice}
                  </span>
                  <span className="text-xs text-[#8EAAB0] font-sans">
                    {product.size} • Tax Included
                  </span>
                </div>

                {/* Tab selectors */}
                <div className="flex border-b border-[#D4AF37]/20 my-4 text-xs font-cinzel tracking-[0.15em] uppercase">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 px-3 border-b-2 transition-all ${
                      activeTab === 'details'
                        ? 'border-[#D4AF37] text-[#F3E5AB]'
                        : 'border-transparent text-[#8EAAB0] hover:text-[#E8DCC4]'
                    }`}
                  >
                    Ritual Details
                  </button>
                  {product.composition && (
                    <button
                      onClick={() => setActiveTab('composition')}
                      className={`pb-2 px-3 border-b-2 transition-all ${
                        activeTab === 'composition'
                          ? 'border-[#D4AF37] text-[#F3E5AB]'
                          : 'border-transparent text-[#8EAAB0] hover:text-[#E8DCC4]'
                      }`}
                    >
                      Composition
                    </button>
                  )}
                  {product.scentNotes && (
                    <button
                      onClick={() => setActiveTab('scent')}
                      className={`pb-2 px-3 border-b-2 transition-all ${
                        activeTab === 'scent'
                          ? 'border-[#D4AF37] text-[#F3E5AB]'
                          : 'border-transparent text-[#8EAAB0] hover:text-[#E8DCC4]'
                      }`}
                    >
                      Scent Notes
                    </button>
                  )}
                </div>

                {/* Tab content */}
                <div className="min-h-[110px] text-xs text-[#C5D5D8] leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.fullDescription}</p>
                      {product.benefits && (
                        <ul className="mt-2 space-y-1">
                          {product.benefits.slice(0, 3).map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[11px] text-[#E8DCC4]">
                              <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {activeTab === 'composition' && (
                    <div className="space-y-2">
                      <p className="text-[11px] text-[#D4AF37]">
                        Formulated without sulfates, parabens, synthetic dyes, or phthalates.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {product.composition?.map((comp, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-[#041e25] border border-[#D4AF37]/25 text-[#F3E5AB] text-[11px] font-sans"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'scent' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-[#041e25] border border-[#D4AF37]/20">
                        <span className="text-[10px] uppercase font-cinzel text-[#D4AF37] block mb-1 tracking-widest">
                          Olfactory Profile
                        </span>
                        <p className="text-sm font-editorial italic text-[#F7F4EB]">
                          {product.scentNotes?.displaySummary}
                        </p>
                      </div>
                      {product.scentNotes?.top && (
                        <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
                          <div className="p-1.5 bg-[#083542]/50 border border-[#D4AF37]/10">
                            <span className="text-[#D4AF37] block font-cinzel">Top</span>
                            <span>{product.scentNotes.top.join(', ')}</span>
                          </div>
                          <div className="p-1.5 bg-[#083542]/50 border border-[#D4AF37]/10">
                            <span className="text-[#D4AF37] block font-cinzel">Heart</span>
                            <span>{product.scentNotes.heart?.join(', ') || 'Blossoms'}</span>
                          </div>
                          <div className="p-1.5 bg-[#083542]/50 border border-[#D4AF37]/10">
                            <span className="text-[#D4AF37] block font-cinzel">Base</span>
                            <span>{product.scentNotes.base?.join(', ') || 'Amber Woods'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#D4AF37]/40 bg-[#041e25] px-2 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2 py-1 text-[#D4AF37] hover:text-[#F3E5AB]"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-cinzel font-medium text-[#F7F4EB]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2 py-1 text-[#D4AF37] hover:text-[#F3E5AB]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#062B35] hover:brightness-110 font-cinzel text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Ritual Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Ritual Bag • {formattedPrice}
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3 border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#041e25] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] transition-all"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Guarantees bar */}
                <div className="flex items-center justify-between text-[10px] text-[#8EAAB0] pt-2">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#D4AF37]" /> Authentic French Formulation
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-[#D4AF37]" /> Cold-Pressed Botanical Elixirs
                  </span>
                  <span className="flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-[#D4AF37]" /> Sulfate & Cruelty Free
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
