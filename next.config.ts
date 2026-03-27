import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
