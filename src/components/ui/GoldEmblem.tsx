import React from 'react';

interface GoldEmblemProps {
  className?: string;
  size?: number;
  withGlow?: boolean;
}

export const GoldEmblem: React.FC<GoldEmblemProps> = ({
  className = '',
  size = 36,
  withGlow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {withGlow && (
        <div
          className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-md pointer-events-none"
          aria-hidden="true"
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#D4AF37] relative z-10 transition-transform duration-500 hover:rotate-45"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E8B2" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA8221" />
            <stop offset="100%" stopColor="#F4DE8E" />
          </linearGradient>
        </defs>

        {/* Central Core Petal */}
        <path
          d="M50 18 C46 32 40 45 50 62 C60 45 54 32 50 18 Z"
          fill="url(#goldGradient)"
        />

        {/* Inner Floral Diamond */}
        <path
          d="M50 38 L58 50 L50 62 L42 50 Z"
          fill="#062B35"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
        />

        {/* Left Primary Petal */}
        <path
          d="M50 62 C34 56 22 45 28 32 C38 35 44 48 50 62 Z"
          fill="url(#goldGradient)"
          opacity="0.9"
        />

        {/* Right Primary Petal */}
        <path
          d="M50 62 C66 56 78 45 72 32 C62 35 56 48 50 62 Z"
          fill="url(#goldGradient)"
          opacity="0.9"
        />

        {/* Outer Left Wing Petal */}
        <path
          d="M50 62 C28 62 14 55 18 42 C26 44 38 52 50 62 Z"
          fill="url(#goldGradient)"
          opacity="0.8"
        />

        {/* Outer Right Wing Petal */}
        <path
          d="M50 62 C72 62 86 55 82 42 C74 44 62 52 50 62 Z"
          fill="url(#goldGradient)"
          opacity="0.8"
        />

        {/* Bottom Floral Base */}
        <path
          d="M36 68 C44 76 56 76 64 68 C58 72 42 72 36 68 Z"
          fill="url(#goldGradient)"
        />

        {/* Small Bottom Accent Dots */}
        <circle cx="50" cy="80" r="2.5" fill="url(#goldGradient)" />
        <circle cx="42" cy="77" r="1.5" fill="url(#goldGradient)" />
        <circle cx="58" cy="77" r="1.5" fill="url(#goldGradient)" />
      </svg>
    </div>
  );
};

export const LuxuryDivider: React.FC<{
  title?: string;
  subtitle?: string;
  className?: string;
  ornamentSize?: number;
}> = ({ title, subtitle, className = '', ornamentSize = 24 }) => {
  return (
    <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
      {subtitle && (
        <span className="text-[11px] tracking-[0.35em] text-[#D4AF37] uppercase font-cinzel mb-2 font-medium">
          {subtitle}
        </span>
      )}
      <div className="flex items-center gap-4 w-full max-w-xs justify-center">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
        <GoldEmblem size={ornamentSize} />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      </div>
      {title && (
        <h3 className="mt-3 font-cinzel text-xl text-[#F7F4EB] tracking-wider text-center">
          {title}
        </h3>
      )}
    </div>
  );
};
