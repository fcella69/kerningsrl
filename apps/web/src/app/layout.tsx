import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../app/globals.css";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import PageTransition from "@/components/layout/PageTransition/PageTransition";
import SplashScreen from "@/components/layout/SplashScreen/SplashScreen";
import PerformanceMode from "@/components/ui/PerformanceMode/PerformanceMode";

import { sanityFetch } from "@/lib/sanity/fetch";
import {
  footerQuery,
  headerQuery,
  settingsQuery,
} from "@/lib/sanity/queries";
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

type SettingsData = {
  siteName?: string;
  siteUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  faviconUrl?: string;
  faviconAlt?: string;
  cookiebotId?: string;
};

/* =========================
   METADATA BASE
========================= */

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SettingsData | null>(settingsQuery);

  const siteName = settings?.siteName?.trim() || "Kerning";
  const defaultTitle = settings?.seoTitle?.trim() || "Kerning — Digital Studio";
  const defaultDescription =
    settings?.seoDescription?.trim() ||
    "Kerning è uno studio digitale specializzato in branding, web design e prodotti digitali ad alte prestazioni.";

  return {
    metadataBase: new URL(settings?.siteUrl || getSiteUrl()),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    icons: settings?.faviconUrl
      ? {
          icon: [
            {
              url: settings.faviconUrl,
              type: "image/png",
            },
          ],
          shortcut: [settings.faviconUrl],
          apple: [settings.faviconUrl],
        }
      : undefined,
    openGraph: {
      siteName,
      locale: "it_IT",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

/* =========================
   ROOT LAYOUT
========================= */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerData, footerData, settings] = await Promise.all([
    sanityFetch<any>(headerQuery),
    sanityFetch<any>(footerQuery),
    sanityFetch<SettingsData | null>(settingsQuery),
  ]);

  const cookiebotId = settings?.cookiebotId?.trim();

  return (
    <html
      lang="it"
      className={`${monument.variable} ${inter.variable} preload-site`}
    >
      <body>
        <Script
          id="kerning-splash-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var root = document.documentElement;
                try {
                  var key = "kerning-splash-seen";
                  var seen = window.sessionStorage.getItem(key) === "1";

                  if (seen) {
                    root.classList.remove("preload-site");
                    root.classList.add("app-ready");
                  } else {
                    root.classList.remove("preload-site");
                    root.classList.add("show-initial-splash");
                    window.sessionStorage.setItem(key, "1");
                  }
                } catch (e) {
                  root.classList.remove("preload-site");
                  root.classList.add("show-initial-splash");
                }
              })();
            `,
          }}
        />

        <noscript>
          <style>{`
            html.preload-site #site-shell {
              opacity: 1 !important;
              visibility: visible !important;
            }
          `}</style>
        </noscript>

        <SplashScreen />
        <PerformanceMode />

        {cookiebotId ? (
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={cookiebotId}
            data-blockingmode="auto"
            strategy="beforeInteractive"
          />
        ) : null}

        <div id="site-shell">
          <Header data={headerData} />
          <PageTransition>{children}</PageTransition>
          <Footer data={footerData} />
        </div>
      </body>
    </html>
  );
}