import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/work/slatewell-roofing", destination: "/work/slatewell-roofing/index.html" },
      { source: "/work/verane", destination: "/work/verane/index.html" },
    ];
  },
  images: {
    domains: ["images.unsplash.com", "randomuser.me"],
  },
};

export default nextConfig;
