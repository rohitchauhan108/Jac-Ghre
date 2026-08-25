import React from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Eye,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
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

  const formattedPrice = `${currencySymbol}${(
    product.price * currencyRate
  ).toFixed(0)}`;

  const isFavorited = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        group
        relative
        flex
        flex-col
        justify-between
        overflow-hidden
        rounded-none
        border
        transition-all
        duration-500

        ${
          isDark
            ? `
                bg-[#007288]
                border-[#D4AF37]/30
                hover:border-[#D4AF37]/80
                hover:shadow-[0_15px_45px_rgba(0,96,115,0.35)]
              `
            : `
                bg-[#FFFFFF]
                border-[#D4AF37]/35
                hover:border-[#D4AF37]
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
              `
        }
      `}
    >
      {/* =========================================================
          PRODUCT IMAGE STAGE
      ========================================================= */}

      <div
        className={`
          relative
          aspect-[4/5]
          w-full
          overflow-hidden
          flex
          items-center
          justify-center
          p-0

          ${
            isDark
              ? `
                bg-[#006073]
              `
              : `
                bg-gradient-to-b from-[#FAF7F2] to-[#F3EDE2]
              `
          }
        `}
      >
        {/* Soft Gold Aura */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              circle_at_center,
              rgba(212,175,55,0.16)_0%,
              transparent_70%
            )]
            opacity-70
            group-hover:opacity-100
            transition-opacity
            duration-700
            pointer-events-none
          "
        />

        {/* Subtle Teal Pattern */}

        {isDark && (
          <div
            className="
              absolute
              inset-0
              opacity-[0.12]
              pointer-events-none
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  transparent 0%,
                  transparent 48%,
                  rgba(255,255,255,0.08) 48%,
                  rgba(255,255,255,0.08) 49%,
                  transparent 49%
                ),
                linear-gradient(
                  45deg,
                  transparent 0%,
                  transparent 48%,
                  rgba(255,255,255,0.05) 48%,
                  rgba(255,255,255,0.05) 49%,
                  transparent 49%
                )
              `,
              backgroundSize: '70px 70px',
            }}
          />
        )}

        <img
          src={product.image}
          alt={product.name}
          className="
            relative
            z-10
            w-full
            h-full
            object-cover
            object-center
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.08]
            filter
            drop-shadow-[0_15px_25px_rgba(0,0,0,0.22)]
          "
          loading="lazy"
        />

        {/* =======================================================
            HOVER QUICK ACTION (Quick View & Add to Bag)
        ======================================================= */}

        <div
          className="
            absolute
            inset-x-4
            bottom-4
            z-20
            flex
            items-center
            gap-2
            opacity-0
            translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-400
          "
        >
          <button
            onClick={() => setQuickViewProduct(product)}
            className="
              flex-1
              py-2.5
              px-3
              bg-[#006073]/95
              hover:bg-[#007288]
              border
              border-[#D4AF37]/70
              text-[#F3E5AB]
              font-cinzel
              text-[11px]
              tracking-[0.2em]
              uppercase
              flex
              items-center
              justify-center
              gap-2
              backdrop-blur-md
              transition-colors
            "
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            Quick View
          </button>

          <button
            onClick={() => addToCart(product)}
            className="
              py-2.5
              px-3.5
              bg-gradient-to-r
              from-[#D4AF37]
              to-[#B89028]
              text-[#007288]
              hover:brightness-110
              font-cinzel
              text-[11px]
              font-semibold
              tracking-[0.15em]
              uppercase
              flex
              items-center
              justify-center
              shadow-lg
              transition-all
            "
            title="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================
          PRODUCT INFORMATION (Name, Price & Discover Button)
      ========================================================= */}

      <div
        className={`
          p-5
          flex
          flex-col
          flex-1
          justify-between
          border-t
          transition-colors

          ${
            isDark
              ? `
                bg-[#007288]
                border-[#D4AF37]/25
              `
              : `
                bg-[#FFFFFF]
                border-[#D4AF37]/20
              `
          }
        `}
      >
        <div>
          {/* PRODUCT TITLE */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className={`
              font-cinzel
              text-base
              md:text-lg
              font-normal
              tracking-wide
              transition-colors
              cursor-pointer

              ${
                isDark
                  ? `
                    text-[#F7F4EB]
                    group-hover:text-[#F3E5AB]
                  `
                  : `
                    text-[#0E4C5A]
                    group-hover:text-[#B8860B]
                  `
              }
            `}
          >
            {product.name}
          </h3>
        </div>

        {/* =======================================================
            PRICE + DISCOVER CTA
        ======================================================= */}

        <div
          className={`
            mt-4
            pt-3
            border-t
            flex
            items-center
            justify-between

            ${
              isDark
                ? 'border-[#D4AF37]/20'
                : 'border-[#D4AF37]/20'
            }
          `}
        >
          <div>
            <span
              className={`
                text-base
                md:text-lg
                font-cinzel
                font-semibold
                tracking-wider

                ${
                  isDark
                    ? 'text-[#F7F4EB]'
                    : 'text-[#0E4C5A]'
                }
              `}
            >
              {formattedPrice}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`
              inline-flex
              items-center
              gap-1.5
              text-[11px]
              uppercase
              tracking-[0.2em]
              font-cinzel
              group/btn
              transition-colors

              ${
                isDark
                  ? `
                    text-[#D4AF37]
                    hover:text-[#FFF3C4]
                  `
                  : `
                    text-[#B8860B]
                    hover:text-[#0E4C5A]
                  `
              }
            `}
          >
            <span>Discover</span>

            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};