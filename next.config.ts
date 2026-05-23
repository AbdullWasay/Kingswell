import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewareClientMaxBodySize: "15mb",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
