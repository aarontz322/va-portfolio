import type { Metadata } from "next";

export const SITE_ORIGIN = "https://portfolio.kotsaaron.com";

export function siteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).href;
}

type PagePreview = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function pageMetadata({ path, title, description, image, imageAlt }: PagePreview): Metadata {
  const url = siteUrl(path);
  const images = [{ url: siteUrl(image), alt: imageAlt }];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_US", siteName: "Aaron Novicio", url, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
