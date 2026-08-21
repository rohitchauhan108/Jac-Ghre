import React from 'react';
import { FounderHero } from '../components/founder/FounderHero';
import { FounderVisionQuote } from '../components/founder/FounderVisionQuote';
import { SupermodelsPortfolio } from '../components/founder/SupermodelsPortfolio';
import { ThierryMuglerLegacy } from '../components/founder/ThierryMuglerLegacy';
import { PricklyPearInnovation } from '../components/founder/PricklyPearInnovation';
import { FisherIslandConcierge } from '../components/founder/FisherIslandConcierge';

export const JacGhrePage: React.FC = () => {
  return (
    <div className="bg-[#007288] min-h-screen">
      {/* 1. Hero: The Man. The Name. */}
      <FounderHero />

      {/* 2. The Vision Quote with Signature */}
      <FounderVisionQuote />

      {/* 3. Supermodels & Celebrities Portfolio */}
      <SupermodelsPortfolio />

      {/* 4. Thierry Mugler & Elite Model World Runway Legacy */}
      <ThierryMuglerLegacy />

      {/* 6. Fisher Island Club Concierge & Atelier Booking */}
      <FisherIslandConcierge />
    </div>
  );
};
