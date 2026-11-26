import type { NextConfig } from "next";
import { SITE_ORIGIN } from "./src/lib/site-url";

const nextConfig: NextConfig = {
  async redirects() {
    // Enable on the public deployment once the new domain is serving over HTTPS.
    if (process.env.ENABLE_LEGACY_PORTFOLIO_REDIRECT !== "1") return [];
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "aaron-va\\.vercel\\.app" }],
      destination: `${SITE_ORIGIN}/:path*`,
      permanent: true,
    }];
  },
  async rewrites() {
    return [
      { source: "/work/:slug", destination: "/work/:slug/index.html" },
      {
        source: "/work/equilibrium-debt-recovery/:page((?:[a-z0-9-]+/)*[a-z0-9-]+)",
        destination: "/work/equilibrium-debt-recovery/:page/index.html",
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com", "randomuser.me"],
  },
};

export default nextConfig;
