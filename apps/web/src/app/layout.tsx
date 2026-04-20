import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "../app/globals.css";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import PageTransition from "@/components/layout/PageTransition/PageTransition";

// SANITY
import { sanityFetch } from "@/lib/sanity/fetch";
import { footerQuery, headerQuery } from "@/lib/sanity/queries";
import { getSiteUrl } from "@/lib/seo/buildSeoMetadata";

/* =========================
   FONT CONFIG
========================= */

const monument = localFont({
  src: [
    {
      path: "../fonts/monument/MonumentExtended-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/monument/MonumentExtended-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-title",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

/* =========================
   METADATA BASE
========================= */

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Kerning — Digital Studio",
    template: "%s | Kerning",
  },
  description:
    "Kerning è uno studio digitale specializzato in branding, web design e prodotti digitali ad alte prestazioni.",
  openGraph: {
    siteName: "Kerning",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* =========================
   ROOT LAYOUT
========================= */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerData = await sanityFetch<any>(headerQuery);
  const footerData = await sanityFetch<any>(footerQuery);

  return (
    <html lang="it" className={`${monument.variable} ${inter.variable}`}>
      <body>
        <Header data={headerData} />

        <PageTransition>{children}</PageTransition>

        <Footer data={footerData} />
      </body>
    </html>
  );
}