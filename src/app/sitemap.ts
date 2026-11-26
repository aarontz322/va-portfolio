import type { MetadataRoute } from "next";
import { industries } from "@/lib/portfolio-projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/portfolio", "/nova", ...Object.keys(industries).map(key => "/portfolio/" + key)];
  return paths.map(path => ({ url: siteUrl(path) }));
}
