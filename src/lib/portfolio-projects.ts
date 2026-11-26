export const industries = {
  skincare: "Beauty & skincare",
  "construction-roofing": "Construction & roofing",
  fashion: "Fashion & accessories",
  fitness: "Fitness",
  jewelry: "Jewelry",
  "luxury-travel": "Luxury travel",
  "mental-health": "Mental health & wellness",
  "real-estate": "Real estate",
} as const;

export type Industry = keyof typeof industries;

type PortfolioProject = {
  slug: string;
  title: string;
  industry: Industry;
  desc: string;
  alt: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "slatewell-roofing",
    title: "Slatewell Roofing",
    industry: "construction-roofing",
    desc: "Compare one home's roof before and after replacement, watch the project film, and build a sample inspection request.",
    alt: "Slatewell Roofing homepage with the roof inspection film beside the headline",
  },
  {
    slug: "verane",
    title: "VERANE",
    industry: "fashion",
    desc: "Explore the Cara handbag in four colors, watch the campaign films, and try different combinations in the shopping bag.",
    alt: "VERANE storefront showing the cognac Cara handbag on a marble café table",
  },
  {
    slug: "golden-hour-realty",
    title: "Golden Hour Realty",
    industry: "real-estate",
    desc: "Tour the Glass House, filter listings by city and bedroom count, and take a seven-slide buyer guide to your next showing.",
    alt: "Golden Hour Realty listing page featuring the Glass House and its garden",
  },
  {
    slug: "sivrenne",
    title: "SIVRENNE",
    industry: "jewelry",
    desc: "See how the Fold pendant sits with three necklines, take a closer look at the cuff and studs, and build a sample jewelry order.",
    alt: "SIVRENNE storefront introducing the Fold collection of silver jewelry",
  },
  {
    slug: "amberlune",
    title: "AMBERLUNE",
    industry: "skincare",
    desc: "See how Golden Drop Serum looks on skin, compare the 30 mL bottle to a lip balm, and try the demo shopping bag.",
    alt: "AMBERLUNE storefront with an amber glass dropper bottle beside the Golden Drop Serum product details",
  },
  {
    slug: "voltloop",
    title: "VOLTLOOP",
    industry: "fitness",
    desc: "Watch the resistance bands in action, preview a two-minute workout, and set your own work and rest intervals.",
    alt: "VOLTLOOP storefront showing three fabric resistance bands and their black carry pouch",
  },
  {
    slug: "isolara",
    title: "ISOLARA Private Journeys",
    industry: "luxury-travel",
    desc: "Plan a coastal stay around local food, time on the water, or scenic drives. Download the day-by-day itinerary to share with a travel advisor.",
    alt: "ISOLARA travel studio homepage showing a white villa above a turquoise bay",
  },
  {
    slug: "quiet-harbor-therapy",
    title: "Quiet Harbor Therapy",
    industry: "mental-health",
    desc: "Explore what to ask before a first therapy visit, watch the illustrated harbor film, and save a personal list of questions for an introductory call.",
    alt: "Quiet Harbor Therapy homepage with a watercolor boat, dock, and distant lighthouse",
  },
];
