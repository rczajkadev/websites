import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
