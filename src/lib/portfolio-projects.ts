export const industries = {
  "construction-roofing": "Construction & roofing",
  fashion: "Fashion & accessories",
  jewelry: "Jewelry",
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
];
