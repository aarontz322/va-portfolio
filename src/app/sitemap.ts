import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/portfolio-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aaron-va.vercel.app/",
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: "https://aaron-va.vercel.app/portfolio" },
    ...portfolioProjects.map(({ slug }) => ({ url: `https://aaron-va.vercel.app/work/${slug}` })),
  ];
}
