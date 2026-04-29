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

    async redirects() {
    return [
      {
        source: "/about",
        destination: "/chi-siamo",
        permanent: true,
      },
      {
        source: "/about/",
        destination: "/chi-siamo",
        permanent: true,
      },

      {
        source: "/contatti/",
        destination: "/contatti",
        permanent: true,
      },

      {
        source: "/realizzazione-siti-web-potenza",
        destination: "/web-design",
        permanent: true,
      },
      {
        source: "/realizzazione-siti-web-potenza/",
        destination: "/web-design",
        permanent: true,
      },

      {
        source: "/creazione-logo-a-potenza",
        destination: "/brand-identity",
        permanent: true,
      },
      {
        source: "/creazione-logo-a-potenza/",
        destination: "/brand-identity",
        permanent: true,
      },

      {
        source: "/social-media-manager-potenza",
        destination: "/social-advertising",
        permanent: true,
      },
      {
        source: "/social-media-manager-potenza/",
        destination: "/social-advertising",
        permanent: true,
      },

      {
        source: "/portfolio/",
        destination: "/portfolio",
        permanent: true,
      },

      {
        source: "/privacy-policy/",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/cookie-policy/",
        destination: "/cookie-policy",
        permanent: true,
      },

      {
        source: "/portfolio/:slug/",
        destination: "/portfolio/:slug",
        permanent: true,
      },
    ];
  },

    async headers() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "kerningsrl-web.vercel.app",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  
};

export default nextConfig;
