import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'stacked' | 'horizontal' | 'compact' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withScriptTagline?: boolean;
  withGlow?: boolean;
  lightModeForceTeal?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  withScriptTagline = true,
  withGlow = false,
  lightModeForceTeal = false,
}) => {
  // Size mappings
  const scaleStyles = {
    sm: {
      jac: 'text-[9px] tracking-[0.35em]',
      ghre: 'text-lg tracking-[0.22em]',
      paris: 'text-[8px] tracking-[0.45em]',
      script: 'text-base -mt-1',
      horizontalMain: 'text-base sm:text-lg tracking-[0.2em]',
      horizontalSub: 'text-[8px] tracking-[0.35em]',
    },
    md: {
      jac: 'text-[11px] tracking-[0.4em]',
      ghre: 'text-2xl sm:text-3xl tracking-[0.24em]',
      paris: 'text-[10px] tracking-[0.5em]',
      script: 'text-xl sm:text-2xl -mt-1.5',
      horizontalMain: 'text-xl sm:text-2xl tracking-[0.22em]',
      horizontalSub: 'text-[9px] tracking-[0.4em]',
    },
    lg: {
      jac: 'text-[13px] tracking-[0.45em]',
      ghre: 'text-4xl sm:text-5xl tracking-[0.26em]',
      paris: 'text-[12px] tracking-[0.55em]',
      script: 'text-3xl sm:text-4xl -mt-2',
      horizontalMain: 'text-2xl sm:text-3xl tracking-[0.24em]',
      horizontalSub: 'text-[11px] tracking-[0.45em]',
    },
    xl: {
      jac: 'text-base sm:text-lg tracking-[0.5em]',
      ghre: 'text-5xl sm:text-6xl md:text-7xl tracking-[0.28em]',
      paris: 'text-sm sm:text-base tracking-[0.6em]',
      script: 'text-4xl sm:text-5xl md:text-6xl -mt-3',
      horizontalMain: 'text-3xl sm:text-4xl tracking-[0.25em]',
      horizontalSub: 'text-xs tracking-[0.5em]',
    },
  }[size];

  // Gold metallic text styles
  const goldGradientClass =
    'bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#AA8221] bg-clip-text text-transparent filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]';

  const scriptGoldClass =
    'bg-gradient-to-r from-[#F9E596] via-[#E5BF45] to-[#C99718] bg-clip-text text-transparent filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]';

  // Badge/Monogram SVG Icon
  if (variant === 'badge') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        {withGlow && (
          <div className="absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-md pointer-events-none" />
        )}
        <div className="relative z-10 flex flex-col items-center justify-center p-2 rounded-full border border-[#D4AF37]/40 bg-[#006073]/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,96,115,0.4)]">
          <span className="font-cinzel text-[8px] tracking-[0.3em] text-[#D4AF37] font-semibold">JAC</span>
          <span className="font-cinzel text-sm font-bold tracking-widest text-[#F3E5AB] leading-none my-0.5">GHRÉ</span>
          <span className="font-cinzel text-[6px] tracking-[0.4em] text-[#D4AF37] uppercase">PARIS</span>
        </div>
      </div>
    );
  }

  // Exact Match to Uploaded Image (Vertical Stacked Format)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {withGlow && (
          <div className="absolute w-48 h-48 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none -z-10" />
        )}

        {/* JAC */}
        <span
          className={`font-cinzel font-semibold uppercase ${scaleStyles.jac} ${goldGradientClass} block leading-tight`}
        >
          JAC
        </span>

        {/* GHRÉ */}
        <span
          className={`font-cinzel font-bold uppercase ${scaleStyles.ghre} ${goldGradientClass} block leading-none my-1`}
          style={{ textShadow: '0 4px 12px rgba(0,0,0,0.45)' }}
        >
          GHRÉ
        </span>

        {/* PARIS */}
        <span
          className={`font-cinzel font-medium uppercase ${scaleStyles.paris} ${goldGradientClass} block leading-tight mb-1`}
        >
          PARIS
        </span>

        {/* Beautifully Yours */}
        {withScriptTagline && (
          <span
            className={`font-script italic ${scaleStyles.script} ${scriptGoldClass} block font-normal`}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            Beautifully Yours
          </span>
        )}
      </div>
    );
  }

  // Header / Horizontal Layout (Compact and ultra-refined)
  return (
    <div className={`flex items-center gap-3 select-none text-left ${className}`}>
      {/* Mini Seal Monogram */}
      <div className="relative shrink-0 flex flex-col items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#007288] to-[#006073] shadow-[0_3px_12px_rgba(0,96,115,0.35)]">
        <span className="font-cinzel text-[7px] tracking-[0.2em] text-[#D4AF37] font-semibold block leading-none">JAC</span>
        <span className="font-cinzel text-[11px] font-bold text-[#F3E5AB] leading-none my-0.5">G</span>
        <div className="w-3 h-px bg-[#D4AF37]/60" />
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-cinzel font-bold ${scaleStyles.horizontalMain} ${goldGradientClass} leading-tight`}
          >
            JAC GHRÉ
          </span>
          <span
            className={`font-cinzel font-semibold text-[9px] sm:text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase`}
          >
            PARIS
          </span>
        </div>

        {withScriptTagline && (
          <span
            className={`font-script text-sm sm:text-base italic ${scriptGoldClass} -mt-1 leading-none`}
          >
            Beautifully Yours
          </span>
        )}
      </div>
    </div>
  );
};
