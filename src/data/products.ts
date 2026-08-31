import { Product, CampaignSlide, BotanicalIngredient } from "../types";

export const CAMPAIGN_IMAGES = {
  heroModel: "/images/modelcompaign.jpeg",
  fullLineup: "/images/ghre_full_lineup_1787204386926.jpg",
  sunArt: "/images/ghre_sun_art_1787204403014.jpg",
  summerDream: "/images/summerhair1.jpeg",
  orangeBlossom: "/images/ghre_orange_blossom_banner_1787206177953.jpg",
  oilBotanic: "/images/ghre_oil_botanic_1787204418411.jpg",
  leaveIn: "/images/ghre_leave_in_1787204430544.jpg",
  jacGhre: "/images/founder.jpeg",
  repairShampoo: "/images/ghre_repair_shampoo_1787204461932.jpg",
  blossom: "/images/ghre_sun_art_1787204403014.jpg",
};

export const BRAND_INFO = {
  name: "GHRÉ PARIS",
  fullName: "GHRÉ / JAC GHRÉ",
  founder: "Jac Ghré",
  founderTitle: "Beauty Expert & Master Hair Artist",
  tagline: "Beautifully Yours",
  subTagline: "The Art of Sun-Kissed Beauty",
  contact: {
    name: "JAC GHRÉ",
    title: "BEAUTY EXPERT & CONSULTANT",
    specialty: "International Hair Designer",
    offering: "Luxury Hair Care",
    company: "American Beauty Company. LLC",
    cellUsa: "(1) 786 238 3631",
    email: "Ghrebeauty@gmail.com",
  },
  locations: [
    { city: "Paris", label: "8 Place Vendôme, 75001 Paris" },
    { city: "Saint-Tropez", label: "Place des Lices, French Riviera" },
    { city: "Miami", label: "Miami, Florida • USA" },
  ],
  visionQuote: "Making women beautiful is my passion.",
  founderBio:
    "Jac Ghré is an international beauty expert known for his refined technique and luxury approach to hair. Working with models, fashion productions, and high-end clientele, Jac built a reputation for creating elegant and timeless hairstyles. Now based in Miami, he continues to bring his vision of luxury beauty to an international clientele.",
};

export const CAMPAIGN_SLIDES: CampaignSlide[] = [
  {
    id: "ghre-collection-lineup",
    eyebrow: "PURE • EXCELLENCE",
    title: "GHRÉ COLLECTION",
    subtitle: "Pure, Excellence",
    tagline:
      "The complete luxury salon lineup of botanical shampoos, silk elixirs, and signature parfums",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "shop",
    secondaryCtaText: "VIEW RITUALS",
    secondaryCtaLink: "hair-care",
    accentTheme: "teal-gold",
    image: "/home/banner1.jpg",
    mobileImage: "/home/mobile-banner.jpg",
    locationBadge: "PARIS • SAINT-TROPEZ • MIAMI",
  },
  {
    id: "ghre-sun-art",
    eyebrow: "THE ART OF SUN-KISSED BEAUTY",
    title: "GHRÉ SUN & BODY",
    subtitle: "Capturing the essence of the sun",
    tagline:
      "Body Watch Monoï, Summer Glow Oils, and refreshing French Riviera Body & Hair Mists",
    ctaText: "DISCOVER SUN & BODY",
    ctaLink: "sun-body",
    secondaryCtaText: "SHOP MISTS",
    secondaryCtaLink: "sun-body",
    accentTheme: "summer-sun",
    image: "/home/banner3.jpg",
    mobileImage: "/home/mobile-banner3.jpg",
    locationBadge: "SAINT-TROPEZ • RIVIERA",
  },
  {
    id: "summ-hair-dream",
    eyebrow: "YOUR SUMM’HAIR DREAM",
    title: "GOOD HAIR DAY — MONOÏ VANILLA",
    subtitle: "Saint-Tropez & Miami Edition",
    tagline:
      "Monoï Vanilla Silk Conditioner & Silk Shampoo for lustrous summer hydration and sea breeze shine",
    ctaText: "DISCOVER MONOÏ SILK",
    ctaLink: "hair-care",
    secondaryCtaText: "SHOP HAIR CARE",
    secondaryCtaLink: "shop",
    accentTheme: "summer-sun",
    image: "/home/banner2.webp",
    mobileImage: "/home/mobile-banner2.webp",
    locationBadge: "SAINT-TROPEZ • MIAMI",
  },
  {
    id: "orange-blossom-duo",
    eyebrow: "GOOD HAIR DAY",
    title: "ORANGE BLOSSOM & BAMBOO MARROW",
    subtitle: "Intensive Restorative Duet",
    tagline:
      "Deep nutritive botanical hair bath formulated for sun, salt, and heat revitalisation",
    ctaText: "DISCOVER BAMBOO MARROW",
    ctaLink: "hair-care",
    secondaryCtaText: "SHOP COLLECTION",
    secondaryCtaLink: "shop",
    accentTheme: "teal-gold",
    image: "/home/banner4.webp",
    mobileImage: "/home/mobile-banner4.webp",
    locationBadge: "SAINT-TROPEZ • MIAMI",
  },
  {
    id: "orange-blossom-duo",
    eyebrow: "GOOD HAIR DAY",
    title: "ORANGE BLOSSOM & BAMBOO MARROW",
    subtitle: "Intensive Restorative Duet",
    tagline:
      "Deep nutritive botanical hair bath formulated for sun, salt, and heat revitalisation",
    ctaText: "DISCOVER BAMBOO MARROW",
    ctaLink: "hair-care",
    secondaryCtaText: "SHOP COLLECTION",
    secondaryCtaLink: "shop",
    accentTheme: "teal-gold",
    image: "/images/banner5.jpg",
    mobileImage: "/images/mobile-banner5.jpeg",
    locationBadge: "SAINT-TROPEZ • MIAMI",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "repair-shampoo",
    name: "GHRÉ Repair Shampoo",
    frenchName: "Shampooing Réparateur — Purify • Repair • Hydrate",
    category: "haircare",
    categoryLabel: "Luxury Hair Care",
    tagline: "Purify • Repair • Hydrate",
    shortDescription:
      "Gently cleanses while repairing and strengthening. Revives shine and leaves hair soft, healthy and manageable.",
    fullDescription:
      "Formulated with Keratin, Moroccan Prickly Pear Oil, Panthenol (Pro-Vitamin B5), Vitamin E, Amino Acids, and Hydrolyzed Silk Protein. Scented with sparkling notes of Bergamot, Orange Blossom, Bamboo, and Lemon.",
    price: 68,
    size: "200 ml | 6.8 fl.oz",
    badge: "1. Repair Shampoo",
    isHeroFeatured: true,
    isBestseller: true,

    ritualDetails:
      "Gently cleanses while repairing and strengthening hair. Restores softness, shine, and elasticity. Ideal for dry, damaged, or over-processed hair.",

    composition: [
      "Keratin",
      "Prickly Pear Oil",
      "Panthenol (Pro-Vitamin B5)",
      "Vitamin E",
      "Amino Acids",
      "Hydrolyzed Silk Protein",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Gently cleanses while repairing and strengthening hair fibers",
      "Restores softness, mirror-like shine, and natural elasticity",
      "Protects against heat styling, UV oxidation, and sea salt damage",
      "Ideal for dry, damaged, colored, or over-processed hair",
    ],
    image: "/product/2.webp",
    accentColor: "#074553",
    rating: 4.98,
    reviewsCount: 184,
  },

  {
    id: "oil-hair-body",
    name: "GHRÉ Oil Hair and Body",
    frenchName:
      "Huile Précieuse Cheveux & Corps — Nourish • Glow • Protect",
    category: "elixir",
    categoryLabel: "Precious Elixirs",
    tagline: "Nourish • Glow • Protect",
    shortDescription:
      "Multi-use precious oil. Nourishes and illuminates hair. On the body, it moisturizes and leaves skin soft, silky and radiant.",
    fullDescription:
      "Sublime multi-use elixir formulated with Moroccan Prickly Pear Oil, Argan Oil, Jojoba Oil, Vitamin E, and powerful Antioxidants. Featherweight and non-greasy, leaving a silky luminous finish with lingering notes of Bergamot, Orange Blossom, Bamboo, and Lemon.",
    price: 115,
    size: "100 ml | 3.4 fl.oz",
    badge: "9. Oil Hair & Body",
    isHeroFeatured: true,
    isBestseller: true,

    ritualDetails:
      "Multi-use oil that deeply nourishes hair and skin. Illuminates, hydrates, and softens. Leaves skin silky and radiant, hair shiny and revitalized.",

    composition: [
      "100% Prickly Pear Oil",
      "Vitamin E",
      "Essential Fatty Acids",
      "Antioxidants",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Deeply nourishes hair lengths and skin with cold-pressed omegas",
      "Enhances natural glow and softness with zero greasy residue",
      "Protects against dryness, sun damage, and environmental stress",
      "Leaves a silky, glass-smooth luminous finish on hair & décolleté",
      "Featherweight, fast-absorbing botanical dry-oil formulation",
    ],
    image: "/product/8.webp",
    accentColor: "#D4AF37",
    rating: 5.0,
    reviewsCount: 260,
  },

  {
    id: "leave-in-conditioner",
    name: "GHRÉ Leave-In Conditioner",
    frenchName:
      "Soin Sans Rinçage Protecteur — Bring Your Beauty Vision To Life",
    category: "haircare",
    categoryLabel: "Luxury Hair Care",
    tagline: "Hydration • Anti-Frizz • Heat Shield",
    shortDescription:
      "Lightweight leave-in treatment that hydrates, detangles and smooths. Controls frizz and enhances shine without weighing hair down.",
    fullDescription:
      "Engineered for salon-level protection between appointments. Infuses hair fibers with Orange Blossom floral hydrosol, Bamboo extract, and silk proteins to create a weightless protective shield against UV rays and heat styling.",
    price: 58,
    size: "150 ml | 5.1 fl.oz",
    badge: "New Launch",
    isHeroFeatured: true,
    isNew: true,

    ritualDetails:
      "Lightweight leave-in treatment that hydrates, detangles, and smooths. Controls frizz, enhances shine and protects from heat styling and UV damage.",

    composition: [
      "Prickly Pear Oil",
      "Panthenol",
      "Hydrolyzed Keratin",
      "Vitamin E",
      "Silk Protein",
      "UV Filter",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "24-hour continuous moisture retention without weighing hair down",
      "Instant detangling and mirror-smooth blow-dry priming",
      "Shields against Miami sun, UV rays, and Riviera sea salt",
    ],
    image: "/product/5.webp",
    accentColor: "#074553",
    rating: 4.95,
    reviewsCount: 92,
  },

  {
    id: "repair-conditioner",
    name: "GHRÉ Nourish & Repair Conditioner",
    frenchName: "Après-Shampooing Nourrissant — Nourish & Repair",
    category: "haircare",
    categoryLabel: "Luxury Hair Care",
    tagline: "Deep Nutrition & Silk Detangling",
    shortDescription:
      "Nourishes, detangles and smooths the hair. Helps reduce frizz and leaves hair silky, soft and easy to style.",
    fullDescription:
      "Rich restorative conditioner enriched with bamboo marrow extract, monoi de Tahiti, and silk amino acids that melt into lengths to detangle instantly and protect against humidity.",
    price: 72,
    size: "250 ml | 8.4 fl.oz",
    badge: "Award Winner",
    isHeroFeatured: true,

    ritualDetails:
      "Nourishes deeply, detangles and smooths the hair. Helps reduce frizz and leaves hair soft, silky, and easy to style.",

    composition: [
      "Prickly Pear Oil",
      "Keratin",
      "Shea Butter",
      "Panthenol",
      "Vitamin E",
      "Silk Amino Acids",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Instant detangling without weighing down fine or medium textures",
      "Seals hair fiber against UV degradation and humidity swelling",
      "Leaves hair silky smooth with a radiant natural bounce",
    ],
    image: "/product/4.webp",
    accentColor: "#0C6573",
    rating: 4.88,
    reviewsCount: 114,
  },

  {
    id: "hair-mask-masque",
    name: "GHRÉ Masque Capillaire Luxury Hair Mask",
    frenchName: "Masque Réparateur Profond — Hair Mask",
    category: "haircare",
    categoryLabel: "Luxury Hair Care",
    tagline: "Intensive Reconstructing Cream",
    shortDescription:
      "Intense nourishment and deep repair. Strengthens the hair fiber, restores softness and shine. Ideal for very dry or damaged hair.",
    fullDescription:
      "An opulent buttery mask combining Shea butter, Keratin reconstructors, and Moroccan Prickly Pear to rebuild the hair cortex from within.",
    price: 88,
    size: "250 ml | 8.4 fl.oz",
    badge: "Weekly Ritual",
    isHeroFeatured: true,

    ritualDetails:
      "Intense nourishment and repair. Strengthens the hair fiber, restores softness and shine. Ideal for very dry or damaged hair.",

    composition: [
      "Prickly Pear Oil",
      "Keratin",
      "Shea Butter",
      "Argan Oil",
      "Panthenol",
      "Vitamin E",
      "Hydrolyzed Silk Protein",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Visibly reduces hair breakage by 89% after first application",
      "Restores natural lipid moisture barrier in 5 to 10 minutes",
      "Imparts deep plush softness and velvet slip",
    ],
    image: "/product/1.webp",
    accentColor: "#063B46",
    rating: 4.96,
    reviewsCount: 142,
  },

  {
    id: "gold-serum",
    name: "GHRÉ Sérum d’Or Luxury Gold Serum",
    frenchName: "Sérum d’Or Prickly Pear Oil Elixir",
    category: "elixir",
    categoryLabel: "Precious Elixirs",
    tagline: "Intense Heat Shield & Glass Gloss",
    shortDescription:
      "Luxurious finishing serum that enhances shine, smooths frizz and flyaways. Leaves hair silky, luminous and perfectly polished.",
    fullDescription:
      "Engineered by Jac Ghré for runway backstage styling. Shields against thermal styling stress, locks in color vibrance, and smooths split ends seamlessly.",
    price: 92,
    size: "30 ml | 1 fl.oz",
    badge: "Pro Salon Exclusive",
    isHeroFeatured: true,

    ritualDetails:
      "Luxurious finishing serum that adds instant shine, frizz control, and softness. Leaves hair luminous and perfectly polished.",

    composition: [
      "Prickly Pear Oil",
      "Argan Oil",
      "Jojoba Oil",
      "Vitamin E",
      "Silk Protein",
      "Gold Particles",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Thermal heat protection up to 230°C / 450°F",
      "Dramatic reduction in split end visibility in a single use",
      "Non-greasy, featherweight satin finish",
    ],
    image: "/product/7.webp",
    accentColor: "#C59B27",
    rating: 4.92,
    reviewsCount: 88,
  },

  {
    id: "summer-glow-oil",
    name: "Repair Shampoo Sulfate Free",
    frenchName: "Repair Shampoo Sulfate Free",
    category: "haircare",
    categoryLabel: "Luxury Hair Care",
    tagline: "Cleanse • Protect • Hydrate",
    shortDescription:
      "Gentle sulfate-free formula that cleanses without stripping. Protects moisture and improves softness and elasticity.",
    fullDescription:
      "Gentle sulfate-free formula that cleanses without stripping. Protects moisture and improves softness and elasticity.",
    price: 78,
    size: "150 ml | 5.1 fl.oz",
    badge: "Repair Shampoo Sulfate Free",
    isHeroFeatured: true,
    isBestseller: true,

    ritualDetails:
      "Sulfate-free formula that cleanses without stripping. Protects natural moisture, strengthens, and improves softness and shine.",

    composition: [
      "Keratin",
      "Prickly Pear Oil",
      "Panthenol (Pro-Vitamin B5)",
      "Vitamin E",
      "Amino Acids",
      "Hydrolyzed Silk Protein",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Gentle sulfate-free formula that cleanses without stripping",
      "Protects moisture",
      "Improves softness and elasticity",
    ],
    image: "/product/3.webp",
    accentColor: "#E5C365",
    rating: 4.95,
    reviewsCount: 198,
  },

  {
    id: "blossom-positano-edp",
    name: "Thermal Protection Spray",
    frenchName:
      "Spray de Protection Thermique — Thermal Protection Spray",
    category: "haircare",
    categoryLabel: "Luxury Hair Care",
    tagline: "Protect • Smooth • Shine",
    shortDescription:
      "Protects hair from heat styling and thermal damage. Helps prevent breakage, leaving hair soft, smooth and glossy.",
    fullDescription:
      "Protects hair from heat styling and thermal damage. Helps prevent breakage, leaving hair soft, smooth and glossy.",
    price: 148,
    size: "100 ml | 3.4 fl.oz",
    badge: "Thermal Protection Spray",
    isHeroFeatured: true,
    isNew: true,

    ritualDetails:
      "Protects hair from heat styling up to 230°C / 450°F. Helps prevent breakage, leaving hair soft, smooth, and glossy.",

    composition: [
      "Prickly Pear Oil",
      "Hydrolyzed Keratin",
      "Panthenol",
      "Vitamin E",
      "Amino Acids",
      "Heat Protectant",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Protects hair from heat styling and thermal damage",
      "Helps prevent breakage",
      "Leaves hair soft, smooth and glossy",
    ],
    image: "/product/6.webp",
    accentColor: "#F9B77C",
    rating: 4.99,
    reviewsCount: 312,
  },

  {
    id: "body-hair-mist",
    name: "Marrakech Blossom",
    frenchName: "Eau de Parfum — Marrakech Blossom",
    category: "fragrance",
    categoryLabel: "Haute Parfumerie",
    tagline: "Scent • Freshness • Elegance",
    shortDescription:
      "A radiant fragrance with Bergamot, Bamboo, Orange Blossom and Lemon. Fresh, elegant and unforgettable.",
    fullDescription:
      "A radiant fragrance with Bergamot, Bamboo, Orange Blossom and Lemon. Fresh, elegant and unforgettable.",
    price: 62,
    size: "100 ml | 3.4 fl.oz",
    badge: "Marrakech Blossom Eau de Parfum",

    ritualDetails:
      "A radiant and elegant fragrance that awakens the senses. Fresh, floral and uplifting, with a warm, refined signature that lingers beautifully.",

    composition: [
      "Bergamot",
      "Orange Blossom",
      "Jasmine",
      "Bamboo",
      "Lemon",
      "Fig Accord",
    ],

    scentNotes: {
      displaySummary: "Bergamot, Orange Blossom, Bamboo, Lemon",
    },

    benefits: [
      "Radiant and refreshing fragrance",
      "Elegant blend of Bergamot, Bamboo, Orange Blossom and Lemon",
      "Leaves a fresh and unforgettable impression",
    ],
    image: "/product/9.webp",
    accentColor: "#7CC3D2",
    rating: 4.91,
    reviewsCount: 127,
  },
{
  id: "blossom-positano",
  name: "Blossom Positano",
  frenchName: "Eau de Parfum — Blossom Positano",
  category: "fragrance",
  categoryLabel: "Haute Parfumerie",
  tagline: "Citrus • Blossom • Elegance",
  shortDescription:
    "A radiant citrus fragrance inspired by the beauty of Positano, blending sparkling citrus freshness with delicate floral notes.",
  fullDescription:
    "A radiant and elegant Eau de Parfum inspired by the sun-kissed beauty of Positano. Bright citrus accords meet delicate blossoms to create a fresh, refined and effortlessly luxurious scent.",

  price: 62,
  size: "100 ml | 3.4 fl.oz",
  badge: "Blossom Positano Eau de Parfum",

  ritualDetails:
    "A luminous fragrance ritual that awakens the senses with sparkling citrus freshness and soft floral elegance. Designed to leave a refined, fresh and memorable signature throughout the day.",

  composition: [
    "Citrus Zest",
    "Lemon Blossom",
    "Orange Blossom",
    "Jasmine",
    "Bergamot",
    "Soft Floral Accord",
  ],

  scentNotes: {
    displaySummary: "Citrus Zest, Lemon Blossom, Orange Blossom, Jasmine",
  },

  benefits: [
    "Bright and refreshing citrus fragrance",
    "Elegant blend of citrus and delicate blossom notes",
    "Leaves a fresh, sophisticated and memorable impression",
  ],

  image: "/product/10.webp",
  accentColor: "#D9A441",
  rating: 4.91,
  reviewsCount: 127,
},
{
  id: "monoi-silk-shampoo",
  name: "Monoi Silk Shampoo &Conditioner",
  frenchName: "Shampoo — Monoi Silk",
  category: "haircare",
  categoryLabel: "Hair Care",
  tagline: "Cleanse • Nourish • Shine",
  shortDescription:
    "A luxurious Monoi-infused shampoo that gently cleanses the hair while leaving it soft, smooth and beautifully refreshed.",
  fullDescription:
    "A luxurious Monoi Silk Shampoo designed to gently cleanse and care for the hair. Its silky formula helps leave hair feeling soft, smooth, nourished and naturally radiant.",

  price: 42,
  size: "500 ml | 16.9 fl.oz",
  badge: "Monoi Silk Shampoo",

  ritualDetails:
    "A gentle cleansing ritual that refreshes the hair while enveloping it in a silky Monoi-inspired care experience. Leaves hair feeling clean, soft, smooth and beautifully conditioned.",

  composition: [
    "Monoi",
    "Silk Protein",
    "Nourishing Hair Care Complex",
    "Moisturizing Agents",
    "Smoothing Agents",
  ],

  scentNotes: {
    displaySummary: "Monoi, Soft Floral, Silky Clean",
  },

  benefits: [
    "Gently cleanses the hair",
    "Helps leave hair soft, smooth and nourished",
    "Provides a silky, refreshed feel",
    "Leaves hair looking healthy and radiant",
  ],

  image: "/product/11.webp",
  accentColor: "#C7A15A",
  rating: 4.91,
  reviewsCount: 127,
},
{
  id: "monoi-body-mist",
  name: "Monoï Body Mist",
  frenchName: "Brume Corps — Monoï",
  category: "bodycare",
  categoryLabel: "Body Care",
  tagline: "A Tropical Escape In Every Spray",
  shortDescription:
    "A tropical Monoi-infused body mist that instantly transports your senses to paradise while leaving skin lightly scented and refreshed.",
  fullDescription:
    "A luxurious Monoï Body Mist designed to envelop the skin in a tropical, sun-kissed fragrance. Its refreshing formula provides an exotic escape in every spray, leaving the skin delicately scented and radiant.",

  price: 38,
  size: "250 ml | 8.4 fl.oz",
  badge: "Monoï Body Mist",

  ritualDetails:
    "A sensory misting ritual that refreshes the skin while capturing the essence of a tropical getaway. Leaves the body feeling revitalized, cool, and beautifully fragrant.",

  composition: [
    "Monoï de Tahiti",
    "Tropical Floral Extracts",
    "Hydrating Essence",
    "Refreshing Agents"
  ],

  scentNotes: {
    displaySummary: "Monoï, Tiare Flower, Coconut, Warm Sand",
  },

  benefits: [
    "Delicately scents the skin with a tropical fragrance",
    "Provides an instant burst of freshness",
    "Leaves skin feeling revitalized and refreshed",
    "Evokes the essence of a sun-kissed getaway",
  ],

  image: "/product/12.webp",
  accentColor: "#E3B448",
  rating: 4.95,
  reviewsCount: 98,
},
{
    id: "monoi-vanilla-silk-hair-duo",
  name: "Monoï Vanilla Silk Hair Duo",
  frenchName: "Duo Cheveux Soie — Monoï & Vanille",
  category: "haircare",
  categoryLabel: "Hair Care",
  tagline: "Your Summ'hair Dream",
  shortDescription:
    "A luxurious shampoo and conditioner duo infused with Monoï and Vanilla Silk to deeply nourish, smooth, and transform your hair into a tropical dream.",
  fullDescription:
    "Transport your daily routine to Saint-Tropez and Miami with the Monoï Vanilla Silk Hair Duo. Formulated to provide ultimate hydration and silky manageability, this set cleanses and conditions while enveloping your hair in a sun-kissed, exotic fragrance.",

  price: 54,
  size: "2 x 400 ml | 13.5 fl.oz",
  badge: "Hair Duo",

  ritualDetails:
    "A sensory hair-cleansing ritual that leaves locks feeling silky soft, deeply nourished, and beautifully fragrant with notes of tropical Monoï and sweet Vanilla.",

  composition: [
    "Monoï de Tahiti",
    "Vanilla Extract",
    "Silk Proteins",
    "Nourishing Botanicals"
  ],

  scentNotes: {
    displaySummary: "Monoï, Vanilla Silk, Coconut Water, Tropical Blossoms",
  },

  benefits: [
    "Deeply cleanses and conditions hair for a silky-smooth finish",
    "Infuses locks with a luxurious Monoï and vanilla fragrance",
    "Leaves hair feeling soft, manageable, and radiant",
    "Evokes the essence of an exotic summer getaway",
  ],

  image: "/images/mobile-banner5.jpeg",
  accentColor: "#D4AF37",
  rating: 4.98,
  reviewsCount: 142,
}
];

export const BOTANICAL_INGREDIENTS: BotanicalIngredient[] = [
  {
    id: "prickly-pear",
    name: "Prickly Pear Seed Oil",
    frenchName: "Huile de Figue de Barbarie",
    origin: "Atlas Mountain Valleys, Morocco",
    description:
      "One of the rarest and most potent botanical oils in the world. Requires nearly 1 ton of cactus fruit to extract 1 liter of pure cold-pressed seed oil. Rich in Vitamin E and sterols.",
    benefits: [
      "Superior hair fiber elasticity",
      "Deep cellular hydration",
      "Intense mirror-like shine",
    ],
    icon: "Sparkles",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    accentNote: "High Vitamin E & Essential Omegas",
  },
  {
    id: "orange-blossom",
    name: "Orange Blossom",
    frenchName: "Fleur d’Oranger de Grasse",
    origin: "Côte d’Azur & Seville Groves",
    description:
      "Delicate white blossoms hand-picked at dawn to capture their peak aromatic purity and soothing bio-flavonoids. Imparts a signature luxury fragrance.",
    benefits: [
      "Natural scalp calming",
      "Hydrating floral water",
      "Iconic solar fragrance profile",
    ],
    icon: "Flower2",
    image:
      "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop",
    accentNote: "Hand-harvested at sunrise",
  },
  {
    id: "bamboo-marrow",
    name: "Bamboo Marrow Extract",
    frenchName: "Moelle de Bambou",
    origin: "Subtropical Botanical Reserves",
    description:
      "Naturally dense in organic silica and strengthening phyto-nutrients that reinforce the structural cortex of fragile or chemically treated hair fibers.",
    benefits: [
      "Fortifies weak hair strands",
      "Weightless tensile strength",
      "Reduces split ends",
    ],
    icon: "Feather",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    accentNote: "Rich in organic bio-silica",
  },
  {
    id: "amalfi-lemon",
    name: "Amalfi Primo Fiore Lemon",
    frenchName: "Citron d’Amalfi Primo Fiore",
    origin: "Cliffside Terraces of Amalfi & Positano",
    description:
      "Renowned for intense aromatic essential oils packed with natural AHA brightening acids that clarify scalp pores and maximize refractive shine.",
    benefits: [
      "Clarifies impurities without drying",
      "Maximizes luminous light refraction",
      "Invigorating Mediterranean freshness",
    ],
    icon: "Sun",
    image:
      "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?q=80&w=800&auto=format&fit=crop",
    accentNote: "High-altitude cold mountain harvest",
  },
  {
    id: "monoi-tahiti",
    name: "Authentic Monoï de Tahiti",
    frenchName: "Appellation d’Origine Monoï",
    origin: "Polynesian Coral Lagoons",
    description:
      "Fresh Tiare flowers steeped in pure refined coconut oil, celebrated for centuries as the ultimate secret to silky, sun-drenched hair and golden skin.",
    benefits: [
      "Protects against salt & chlorine",
      "Silkening softness and slip",
      "Irresistible tropical bouquet",
    ],
    icon: "Palmtree",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    accentNote: "Pure Tiare blossom maceration",
  },
  {
    id: "hydrolyzed-silk",
    name: "Hydrolyzed Silk Protein",
    frenchName: "Protéine de Soie Pure",
    origin: "Lyon Textile & Silk Artisans, France",
    description:
      "Micro-peptides with molecular affinity to human keratin that bind to surface micro-cracks, creating an imperceptible breathable silk shield.",
    benefits: [
      "Backstage runway silk slip",
      "Thermal heat protection",
      "Locks in salon color vibrancy",
    ],
    icon: "Shield",
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop",
    accentNote: "Molecular hair cuticle repair",
  },
];

export const CATEGORIES_DATA = [
  {
    id: "haircare",
    title: "HAIR CARE",
    frenchTitle: "Soins Capillaires",
    description:
      "Luxury shampoos, restructuring conditioners, and intensive botanical hair masks.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    count: "8 Products",
    accent: "Parisian Hair Artistry",
  },
  {
    id: "sun-body",
    title: "SUN & BODY CARE",
    frenchTitle: "Corps & Soleil",
    description:
      "Shimmering golden dry oils, cooling après-sun gels, and fragrant body mists.",
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1000&auto=format&fit=crop",
    count: "6 Products",
    accent: "Saint-Tropez & Miami",
  },
  {
    id: "fragrance",
    title: "HAUTE PARFUMERIE",
    frenchTitle: "Parfums d’Exception",
    description:
      "Signature artisanal scents inspired by Positano lemons, Marrakech gardens & Grasse florals.",
    image:
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop",
    count: "4 Fragrances",
    accent: "Distilled in Grasse",
  },
  {
    id: "elixirs",
    title: "PRECIOUS ELIXIRS",
    frenchTitle: "Élixirs & Sérums d’Or",
    description:
      "Cold-pressed Moroccan Prickly Pear seed oil and 24K gold-infused finishing serums.",
    image:
      "https://images.unsplash.com/photo-1608248597359-009139f4007b?q=80&w=1000&auto=format&fit=crop",
    count: "3 Formulations",
    accent: "24K Gold & Pure Prickly Pear",
  },
];
