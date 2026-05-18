import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'volunteermedicalcorps.org',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/learn/:path*',
        destination: 'http://localhost/elearn/:path*',
      },
    ];
  },
};

export default nextConfig;
