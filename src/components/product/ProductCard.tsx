import React from 'react';
import { motion } from 'motion/react';
import { Heart, Eye, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  variant?: 'editorial' | 'grid' | 'compact' | 'featured';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'grid',
}) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    currencySymbol,
    currencyRate,
    theme,
  } = useShop();

  const isDark = theme === 'dark';
  const formattedPrice = `${currencySymbol}${(product.price * currencyRate).toFixed(0)}`;
  const isFavorited = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between border transition-all duration-500 rounded-none overflow-hidden ${
        isDark
          ? 'bg-[#062c37] border-[#D4AF37]/20 hover:border-[#D4AF37]/70 hover:shadow-[0_10px_35px_rgba(6,43,53,0.8)]'
          : 'bg-[#FFFFFF] border-[#D4AF37]/35 hover:border-[#D4AF37] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* Top badges & Wishlist */}
      <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span
            className={`pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase font-cinzel tracking-[0.2em] border backdrop-blur-md ${
              isDark
                ? 'bg-[#041d24]/90 text-[#F3E5AB] border-[#D4AF37]/40'
                : 'bg-[#FFFFFF]/90 text-[#B8860B] border-[#D4AF37]/60'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
            {product.badge}
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
          className={`pointer-events-auto w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-md ${
            isDark
              ? 'bg-[#041d24]/80 text-[#D4AF37] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35]'
              : 'bg-[#FFFFFF]/90 text-[#B8860B] border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B35]'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Image Stage */}
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden flex items-center justify-center p-6 ${
          isDark
            ? 'bg-gradient-to-b from-[#083542] to-[#041d24]'
            : 'bg-gradient-to-b from-[#FAF7F2] to-[#F3EDE2]'
        }`}
      >
        {/* Subtle radial light aura behind bottle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-108 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]"
          loading="lazy"
        />

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2.5 px-3 bg-[#062B35]/95 hover:bg-[#073A48] border border-[#D4AF37]/60 text-[#F3E5AB] font-cinzel text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 backdrop-blur-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            Quick View
          </button>
          <button
            onClick={() => addToCart(product)}
            className="py-2.5 px-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89028] text-[#062B35] hover:brightness-110 font-cinzel text-[11px] font-semibold tracking-[0.15em] uppercase flex items-center justify-center shadow-lg transition-all"
            title="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div
        className={`p-5 flex flex-col flex-1 justify-between border-t transition-colors ${
          isDark
            ? 'bg-gradient-to-b from-[#062c37] to-[#041d24] border-[#D4AF37]/15'
            : 'bg-[#FFFFFF] border-[#D4AF37]/20'
        }`}
      >
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[10px] font-cinzel tracking-[0.25em] uppercase font-semibold ${
                isDark ? 'text-[#D4AF37]/90' : 'text-[#B8860B]'
              }`}
            >
              {product.categoryLabel}
            </span>
            {product.rating && (
              <div
                className={`flex items-center gap-1 text-[11px] ${
                  isDark ? 'text-[#F3E5AB]' : 'text-[#062B35]'
                }`}
              >
                <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-poppins font-medium">{product.rating}</span>
                <span className="text-[#8EAAB0] text-[10px]">
                  ({product.reviewsCount})
                </span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className={`font-cinzel text-base md:text-lg font-normal tracking-wide transition-colors cursor-pointer line-clamp-1 ${
              isDark
                ? 'text-[#F7F4EB] group-hover:text-[#F3E5AB]'
                : 'text-[#062B35] group-hover:text-[#B8860B]'
            }`}
          >
            {product.name}
          </h3>

          {/* French Name Subtitle */}
          {product.frenchName && (
            <p
              className={`text-[12px] font-editorial italic line-clamp-1 mb-2 ${
                isDark ? 'text-[#D4AF37]/75' : 'text-[#B8860B]/85'
              }`}
            >
              {product.frenchName}
            </p>
          )}

          {/* Scent notes / key highlight */}
          {product.scentNotes?.displaySummary && (
            <div
              className={`my-2 py-1 px-2 border text-[11px] flex items-center gap-1.5 line-clamp-1 ${
                isDark
                  ? 'bg-[#041e25]/60 border-[#D4AF37]/10 text-[#E8DCC4]'
                  : 'bg-[#FAF7F2] border-[#D4AF37]/20 text-[#062B35]'
              }`}
            >
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-cinzel font-bold">
                Notes:
              </span>
              <span className="truncate">{product.scentNotes.displaySummary}</span>
            </div>
          )}

          <p
            className={`text-[12px] font-poppins font-light line-clamp-2 leading-relaxed mt-1 ${
              isDark ? 'text-[#B5C7CA]' : 'text-[#556E77]'
            }`}
          >
            {product.shortDescription}
          </p>
        </div>

        {/* Price and CTA */}
        <div
          className={`mt-4 pt-3 border-t flex items-center justify-between ${
            isDark ? 'border-[#D4AF37]/15' : 'border-[#D4AF37]/20'
          }`}
        >
          <div>
            <span
              className={`text-base md:text-lg font-cinzel font-semibold tracking-wider ${
                isDark ? 'text-[#F7F4EB]' : 'text-[#062B35]'
              }`}
            >
              {formattedPrice}
            </span>
            <span
              className={`block text-[10px] tracking-wider ${
                isDark ? 'text-[#8EAAB0]' : 'text-[#7A98A1]'
              }`}
            >
              {product.size}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-cinzel group/btn transition-colors ${
              isDark ? 'text-[#D4AF37] hover:text-[#FFF3C4]' : 'text-[#B8860B] hover:text-[#062B35]'
            }`}
          >
            <span>Discover</span>
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
