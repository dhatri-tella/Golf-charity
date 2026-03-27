import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
