export const industries = {
  "construction-roofing": "Construction & roofing",
  fashion: "Fashion & accessories",
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
];
