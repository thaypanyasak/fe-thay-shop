import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://thay-shop.onrender.com/api/:path*",
      },
    ];
  },

  images: {
    domains: ["static.nike.com", "images.unsplash.com"],
  },
};

export default nextConfig;
