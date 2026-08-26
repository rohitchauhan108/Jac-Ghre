import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Star,
  Check,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { GoldEmblem } from '../components/ui/GoldEmblem';

export const ShopPage: React.FC = () => {
  const {
    addToCart,
    setQuickViewProduct,
    toggleWishlist,
    isInWishlist,
    currencySymbol,
    currencyRate,
    shopCategoryFilter,
  } = useShop();

  // If you no longer use search, sort, or badge states elsewhere, they can be cleaned up as well.
  const [searchQuery] = useState('');
  const [selectedSort] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [activeBadge] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter based on context
      if (shopCategoryFilter !== 'all') {
        if (shopCategoryFilter === 'hair-care' && product.category !== 'haircare' && product.category !== 'elixir') return false;
        if (shopCategoryFilter === 'sun-care' && product.category !== 'bodycare') return false;
        if (shopCategoryFilter === 'fragrance' && product.category !== 'fragrance') return false;
        if (shopCategoryFilter === 'haircare' && product.category !== 'haircare') return false;
        if (shopCategoryFilter === 'elixir' && product.category !== 'elixir') return false;
        if (shopCategoryFilter === 'bodycare' && product.category !== 'bodycare') return false;
      }

      // Badge filter
      if (activeBadge !== 'all') {
        if (activeBadge === 'bestseller' && !product.isBestseller) return false;
        if (activeBadge === 'hero' && !product.isHeroFeatured) return false;
        if (activeBadge === 'new' && !product.isNew) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesComposition = product.composition?.some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesComposition) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.price - b.price;
      if (selectedSort === 'price-high') return b.price - a.price;
      if (selectedSort === 'rating') return (b.rating || 5) - (a.rating || 5);
      return 0; // 'featured' retains curated order
    });
  }, [shopCategoryFilter, activeBadge, searchQuery, selectedSort]);

  return (
    <div className="pt-8 pb-28 bg-[#0C8A9B] min-h-screen">
      {/* Header Banner */}
      <section className="relative py-16 sm:py-20 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#097B8A] via-[#0C8A9B] to-[#097B8A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#097B8A] border border-[#D4AF37]/50 mb-4 shadow-md">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#F3E5AB] uppercase">
              PARISIAN HAUTE FORMULATIONS
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.12em] text-[#F7F4EB] uppercase">
            The Complete GHRÉ Catalog
          </h1>

          <p className="mt-4 max-w-2xl mx-auto font-editorial text-2xl sm:text-3xl italic text-[#D4AF37]">
            “Artisanal Moroccan Prickly Pear, Polynesian Monoï & Grasse Essences.”
          </p>

          <p className="mt-3 max-w-2xl mx-auto font-poppins text-sm sm:text-base text-[#B5CAD0] font-normal leading-relaxed">
            Explore all 9 signature creations formulated in France and the French Riviera by Master Hair Artist Jac Ghré.
          </p>
        </div>
      </section>

      {/* Main Products Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#097B8A] border border-[#D4AF37]/30 p-8">
            <GoldEmblem size={28} withGlow className="mb-3" />
            <h3 className="font-cinzel text-xl font-bold text-[#F7F4EB] uppercase">
              No Creations Found
            </h3>
            <p className="font-poppins text-sm text-[#B5CAD0] mt-2">
              No products match your current view.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const formattedPrice = `${currencySymbol}${(product.price * currencyRate).toFixed(0)}`;
              const inWish = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-[#097B8A] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between shadow-2xl p-6 relative group"
                >
                  <div>
                    {/* Top Row: Badge & Wishlist */}
                    {/* <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-cinzel font-semibold tracking-widest text-[#D4AF37] uppercase bg-[#097B8A] px-2 py-0.5 border border-[#D4AF37]/30">
                        {product.badge || product.categoryLabel}
                      </span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-1.5 border transition-all ${
                          inWish
                            ? 'bg-[#D4AF37] text-[#0E4C5A] border-[#D4AF37]'
                            : 'bg-[#097B8A] text-[#E8DCC4] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                        }`}
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-3.5 h-3.5" fill={inWish ? 'currentColor' : 'none'} />
                      </button>
                    </div> */}

                    {/* Product Image Area */}
                    <div
                      onClick={() => setQuickViewProduct(product)}
                      className="aspect-square flex items-center justify-center p-6 bg-[#097B8A] border border-[#D4AF37]/20 my-4 cursor-pointer relative overflow-hidden group/img"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#097B8A]/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="px-3.5 py-1.5 bg-[#D4AF37] text-[#0E4C5A] font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          Quick Dossier
                        </span>
                      </div>
                    </div>

                    {/* Product Meta */}
                    <div className="space-y-1.5">
                      {/* <div className="flex items-center justify-between text-xs text-[#8EAAB0] font-poppins">
                        <span>{product.size}</span>
                        <div className="flex items-center gap-1 text-[#D4AF37]">
                          <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                          <span className="text-xs font-bold font-poppins text-[#F7F4EB]">
                            {product.rating || 5.0}
                          </span>
                        </div>
                      </div> */}

                      <h3
                        onClick={() => setQuickViewProduct(product)}
                        className="font-cinzel text-lg font-bold text-[#F7F4EB] hover:text-[#D4AF37] cursor-pointer transition-colors leading-snug "
                      >
                        {product.name}
                      </h3>

                      {/* <p className="text-xs font-editorial italic text-[#D4AF37] line-clamp-1">
                        {product.tagline}
                      </p> */}

                      {/* <p className="text-xs sm:text-sm text-[#8EAAB0] font-poppins line-clamp-2 pt-1 leading-relaxed">
                        {product.shortDescription}
                      </p> */}
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-cinzel font-bold text-[#F7F4EB]">
                        {formattedPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="p-2.5 bg-[#097B8A] text-[#E8DCC4] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                        title="View Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 bg-[#D4AF37] text-[#0E4C5A] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center gap-1.5 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Acquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};