import type { NextConfig } from "next";

let loaderPath: string | undefined;
try {
  loaderPath = require.resolve('orchids-visual-edits/loader.js');
} catch {
  // orchids-visual-edits not available - skip loader
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(loaderPath ? {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [loaderPath]
        }
      }
    }
  } : {}),
};

export default nextConfig;
