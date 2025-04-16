import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows you to deploy with errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
