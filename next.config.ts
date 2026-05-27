import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/TypeScript_Project1",
  assetPrefix: "/TypeScript_Project1/",

  images: {
    unoptimized: true,

    remotePatterns: [
      { protocol: 'https', hostname: 'images2.imgbox.com' },
      { protocol: 'https', hostname: '*.staticflickr.com' },
      { protocol: 'https', hostname: 'imgur.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
};

export default nextConfig;
