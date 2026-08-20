import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { GoldEmblem } from './GoldEmblem';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct, currencySymbol, currencyRate } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim() === ''
    ? PRODUCTS.slice(0, 4)
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.frenchName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.scentNotes?.displaySummary?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const suggestedQueries = [
    'Repair Shampoo',
    'Prickly Pear Oil',
    'Blossom Positano',
    'Summer Glow Oil',
    'Monoï Mist',
    'Sérum d’Or',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" data-lenis-prevent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-[#021317]/90 backdrop-blur-md"
        />

        <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl bg-[#062c37] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 relative"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#D4AF37] hover:text-[#F3E5AB] border border-[#D4AF37]/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <GoldEmblem size={24} />
              <span className="text-xs font-cinzel tracking-[0.3em] text-[#D4AF37] uppercase">
                GHRÉ Concierge Search
              </span>
            </div>

            {/* Input field */}
            <div className="relative border-b-2 border-[#D4AF37]/50 pb-3 flex items-center gap-3">
              <Search className="w-6 h-6 text-[#D4AF37]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search formulas, fragrances, ingredients..."
                autoFocus
                className="w-full bg-transparent text-lg sm:text-xl font-editorial italic text-[#F7F4EB] placeholder-[#8EAAB0]/60 outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-[#D4AF37] hover:text-white uppercase font-cinzel"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick suggested searches */}
            <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[#8EAAB0] font-cinzel text-[11px] tracking-wider uppercase">
                Popular:
              </span>
              {suggestedQueries.map((query) => (
                <button
                  key={query}
                  onClick={() => setSearchTerm(query)}
                  className="px-2.5 py-1 bg-[#041e25] border border-[#D4AF37]/20 text-[#E8DCC4] hover:text-[#F3E5AB] hover:border-[#D4AF37]/60 font-sans text-xs transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="mt-8">
              <h4 className="text-xs font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase mb-4 flex items-center justify-between">
                <span>{searchTerm.trim() ? `Search Results (${filteredProducts.length})` : 'Signature Curations'}</span>
                {searchTerm.trim() && (
                  <span className="text-[10px] text-[#8EAAB0] font-sans lowercase">
                    matching "{searchTerm}"
                  </span>
                )}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-2 py-8 text-center text-sm text-[#8EAAB0]">
                    No creations found matching "{searchTerm}". Try searching for 'shampoo', 'oil', or 'positano'.
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setQuickViewProduct(product);
                      }}
                      className="flex items-center gap-3 p-3 bg-[#041e25] border border-[#D4AF37]/15 hover:border-[#D4AF37]/60 cursor-pointer transition-all group"
                    >
                      <div className="w-16 h-16 bg-[#062c37] p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-cinzel uppercase text-[#D4AF37] block tracking-widest truncate">
                          {product.categoryLabel}
                        </span>
                        <h5 className="font-cinzel text-xs text-[#F7F4EB] group-hover:text-[#F3E5AB] transition-colors truncate">
                          {product.name}
                        </h5>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-cinzel text-xs font-medium text-[#F3E5AB]">
                            {currencySymbol}{(product.price * currencyRate).toFixed(0)}
                          </span>
                          <span className="text-[10px] text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Inspect <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
