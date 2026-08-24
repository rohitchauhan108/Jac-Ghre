import React from 'react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { IntroSection } from '../components/home/IntroSection';
import { CollectionShowcase } from '../components/home/CollectionShowcase';
import { EditorialFeature } from '../components/home/EditorialFeature';
import { GoodHairDaySection } from '../components/home/GoodHairDaySection';
import { CampaignBanner } from '../components/home/CampaignBanner';
import { BlossomPositano } from '../components/home/BlossomPositano';
import { FounderSection } from '../components/home/FounderSection';
import { VisionSection } from '../components/home/VisionSection';
import { IngredientStory } from '../components/home/IngredientStory';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { ProductSpotlight } from '../components/home/ProductSpotlight';
import { BrandPhilosophy } from '../components/home/BrandPhilosophy';
import { Newsletter } from '../components/home/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* 1. Cinematic Campaign Hero Carousel */}
      <HeroCarousel />

      {/* 2. Brand Introduction */}
      <IntroSection />

        <FounderSection />

      {/* 3. Primary Collection Showcase */}
      <CollectionShowcase />

      {/* 4. Editorial Magazine Feature */}
      <EditorialFeature />

   

      {/* 6. High-Impact Botanical Launch Banner */}
      <CampaignBanner />


      {/* 8. Jac Ghré Founder & Hair Artist Profile */}
    

      {/* 9. The Vision */}
      <VisionSection />

   


     

      {/* 13. Brand Closing Philosophy */}
      <BrandPhilosophy />

      {/* 14. VIP Newsletter */}
      <Newsletter />
    </div>
  );
};
