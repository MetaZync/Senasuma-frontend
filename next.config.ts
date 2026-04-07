import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow your mobile device to connect to the dev server HMR without being blocked
  allowedDevOrigins: ["10.188.165.144"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
};

export default nextConfig;
