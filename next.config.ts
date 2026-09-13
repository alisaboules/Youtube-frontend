import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jejlfbogmfxhehnnsgjh.supabase.co',
        pathname: '/storage/v1/object/public/Youtube/**',
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/uploads/:path*',
  //       destination: `${process.env.API_URL}/uploads/:path*`
  //     }
  //   ]
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
