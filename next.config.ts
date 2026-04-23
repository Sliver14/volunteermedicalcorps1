import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'volunteermedicalcorps.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
