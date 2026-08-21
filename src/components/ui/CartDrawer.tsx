import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { GoldEmblem } from './GoldEmblem';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    currencySymbol,
    currencyRate,
  } = useShop();

  const formattedTotal = `${currencySymbol}${(cartTotal * currencyRate).toFixed(2)}`;
  const freeShippingThreshold = 150;
  const currentTotalUSD = cartTotal;
  const progressToFreeShipping = Math.min(100, (currentTotalUSD / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - currentTotalUSD);

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-[#006073]/85 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#007288] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#006073]">
              <div className="flex items-center gap-3">
                <GoldEmblem size={22} />
                <div>
                  <h2 className="font-cinzel text-lg text-[#F7F4EB] tracking-wider uppercase">
                    Your Ritual Bag
                  </h2>
                  <span className="text-[11px] text-[#D4AF37] tracking-widest font-cinzel">
                    {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#D4AF37] hover:text-[#F3E5AB] hover:bg-[#007288] border border-[#D4AF37]/20 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-6 py-3 bg-[#006073]/60 border-b border-[#D4AF37]/15">
              <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                {remainingForFreeShipping > 0 ? (
                  <span className="text-[#C5D5D8]">
                    Add <strong className="text-[#F3E5AB]">{currencySymbol}{(remainingForFreeShipping * currencyRate).toFixed(0)}</strong> for complimentary courier delivery
                  </span>
                ) : (
                  <span className="text-[#D4AF37] flex items-center gap-1 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Complimentary White-Glove Delivery Unlocked!
                  </span>
                )}
              </div>
              <div className="w-full h-1.5 bg-[#006073] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#AA8221] via-[#D4AF37] to-[#F9E8B2] transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" data-lenis-prevent>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <ShoppingBag className="w-12 h-12 text-[#D4AF37]/40 mb-4 stroke-1" />
                  <h3 className="font-cinzel text-lg text-[#F7F4EB] mb-2">
                    Your bag is currently empty
                  </h3>
                  <p className="text-xs text-[#8EAAB0] max-w-xs mb-6">
                    Explore the GHRÉ collection of luxury hair care, sun elixirs, and bespoke perfumes.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="py-2.5 px-6 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] font-cinzel text-xs tracking-widest uppercase transition-all"
                  >
                    Explore Creations
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-[#006073] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="w-20 h-24 bg-[#006073] border border-[#D4AF37]/10 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-cinzel text-sm text-[#F7F4EB] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#8EAAB0] hover:text-red-400 p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#D4AF37] block font-sans">
                          {item.product.size}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D4AF37]/10">
                        {/* Quantity */}
                        <div className="flex items-center border border-[#D4AF37]/30 bg-[#041e25]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#D4AF37] hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-cinzel text-[#F7F4EB]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#D4AF37] hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-cinzel text-sm font-semibold text-[#F3E5AB]">
                          {currencySymbol}
                          {(item.product.price * currencyRate * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#006073] border-t border-[#D4AF37]/30 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#8EAAB0]">
                    <span>Subtotal</span>
                    <span className="font-cinzel text-[#F7F4EB]">{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#8EAAB0]">
                    <span>Luxury Gift Packaging</span>
                    <span className="text-[#D4AF37]">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-[#8EAAB0]">
                    <span>Standard Shipping</span>
                    <span className="text-[#D4AF37]">
                      {remainingForFreeShipping === 0 ? 'Complimentary' : `${currencySymbol}${(15 * currencyRate).toFixed(0)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-cinzel text-[#F3E5AB] pt-2 border-t border-[#D4AF37]/20">
                    <span>Estimated Total</span>
                    <span>{formattedTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Proceeding to luxury encrypted checkout... Ready for payment gateway connection.')}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#B89028] text-[#062B35] hover:brightness-110 font-cinzel text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-xl transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#8EAAB0] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>256-Bit SSL Encrypted Luxury Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    currencySymbol,
    currencyRate,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-[#006073]/85 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#052932] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#006073]">
              <div className="flex items-center gap-3">
                <GoldEmblem size={22} />
                <div>
                  <h2 className="font-cinzel text-lg text-[#F7F4EB] tracking-wider uppercase">
                    Curated Wishlist
                  </h2>
                  <span className="text-[11px] text-[#D4AF37] tracking-widest font-cinzel">
                    {wishlist.length} {wishlist.length === 1 ? 'FAVORITE' : 'FAVORITES'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-[#D4AF37] hover:text-[#F3E5AB] hover:bg-[#007288] border border-[#D4AF37]/20 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" data-lenis-prevent>
              {wishlistProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <GoldEmblem size={40} className="mb-4 opacity-50" />
                  <h3 className="font-cinzel text-lg text-[#F7F4EB] mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-xs text-[#8EAAB0] max-w-xs mb-6">
                    Save your desired beauty formulas and bespoke perfumes to revisit anytime.
                  </p>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="py-2.5 px-6 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] font-cinzel text-xs tracking-widest uppercase transition-all"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 bg-[#006073] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="w-20 h-24 bg-[#006073] border border-[#D4AF37]/10 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-cinzel text-sm text-[#F7F4EB] line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-[#8EAAB0] hover:text-red-400 p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#D4AF37] block font-sans">
                          {product.size}
                        </span>
                        <span className="font-cinzel text-sm font-semibold text-[#F3E5AB] mt-1 block">
                          {currencySymbol}{(product.price * currencyRate).toFixed(0)}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="mt-2 py-1.5 px-3 bg-[#D4AF37] text-[#062B35] font-cinzel text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 hover:brightness-110"
                      >
                        <ShoppingBag className="w-3 h-3" /> Move to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-[#006073] border-t border-[#D4AF37]/30">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                disabled={wishlistProducts.length === 0}
                className="w-full py-3 px-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35] disabled:opacity-40 disabled:pointer-events-none font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-all"
              >
                Add All to Bag
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
