import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Exclude brands directory from build (contains demo/preview files)
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/brands/**', '**/node_modules/**'],
    };
    return config;
  },

  // Ignore TypeScript errors in brands directory during build
  typescript: {
    ignoreBuildErrors: false,
  },

  // Exclude brands from compilation
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'].map(ext => `page.${ext}`),
};

export default nextConfig;
