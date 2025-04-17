import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**', // allow all paths under img.clerk.com
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        pathname: '**', // optional: allow all paths under images.clerk.dev
      },
    ],
  },
};

export default nextConfig;
