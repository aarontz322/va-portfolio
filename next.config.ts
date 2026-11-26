import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/work/slatewell-roofing", destination: "/work/slatewell-roofing/index.html" },
      { source: "/work/verane", destination: "/work/verane/index.html" },
      { source: "/work/golden-hour-realty", destination: "/work/golden-hour-realty/index.html" },
      { source: "/work/sivrenne", destination: "/work/sivrenne/index.html" },
      { source: "/work/amberlune", destination: "/work/amberlune/index.html" },
      { source: "/work/voltloop", destination: "/work/voltloop/index.html" },
      { source: "/work/isolara", destination: "/work/isolara/index.html" },
      { source: "/work/quiet-harbor-therapy", destination: "/work/quiet-harbor-therapy/index.html" },
      { source: "/work/corvane-precision", destination: "/work/corvane-precision/index.html" },
    ];
  },
  images: {
    domains: ["images.unsplash.com", "randomuser.me"],
  },
};

export default nextConfig;
