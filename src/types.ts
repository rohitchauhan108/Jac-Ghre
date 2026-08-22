export interface Product {
  id: string;
  name: string;
  frenchName?: string;
  category: 'haircare' | 'bodycare' | 'fragrance' | 'elixir' | 'collections';
  categoryLabel: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  size: string;
  badge?: string;
  isHeroFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  composition?: string[];
  scentNotes?: {
    top?: string[];
    heart?: string[];
    base?: string[];
    displaySummary?: string;
  };
  benefits?: string[];
  image: string;
  bgAtmosphere?: string;
  accentColor?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CampaignSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  accentTheme: 'teal-gold' | 'citrus-gold' | 'summer-sun' | 'founder-luxury';
  image: string;
  mobileImage: string; // Added for dedicated mobile banner support
  productOverlayImage?: string;
  locationBadge?: string;
  quote?: string;
}

export interface BotanicalIngredient {
  id: string;
  name: string;
  frenchName: string;
  origin: string;
  description: string;
  benefits: string[];
  icon: string;
  image: string;
  accentNote: string;
}

export interface NavCategory {
  title: string;
  href: string;
  description?: string;
  featured?: {
    name: string;
    image: string;
    tag: string;
  };
  subItems?: { label: string; href: string }[];
}