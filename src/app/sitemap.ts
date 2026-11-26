import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aaron-va.vercel.app/",
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: "https://aaron-va.vercel.app/work/slatewell-roofing" },
    { url: "https://aaron-va.vercel.app/work/verane" },
  ];
}
