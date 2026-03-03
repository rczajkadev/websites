import path from 'node:path';

import type { NextConfig } from 'next';

const workspaceRoot = path.resolve(__dirname, '../..');

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot
  },
  transpilePackages: ['@websites/hooks', '@websites/sanity-blog'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85, 90]
  }
};

export default nextConfig;
