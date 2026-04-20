import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // tienilo: evita problemi con lightningcss
  },

  images: {
    // domini esterni consentiti (Sanity)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],

    // ottimizzazioni immagini
    formats: ["image/avif", "image/webp"], // formati moderni
    deviceSizes: [320, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
