import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/work/sales-pro-impact" },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
