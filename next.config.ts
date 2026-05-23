import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Static export has no image optimizer — use files from /public directly
  images: { unoptimized: true },
};

export default nextConfig;
