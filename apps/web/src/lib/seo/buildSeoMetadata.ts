import type { Metadata } from "next";

type SeoSource = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoCanonicalPath?: string | null;
  seoNoIndex?: boolean | null;
  seoOgImageUrl?: string | null;
  seoOgImageAlt?: string | null;
};

type BuildSeoMetadataArgs = {
  data?: SeoSource | null;
  fallbackTitle: string;
  fallbackDescription: string;
  path?: string;
  type?: "website" | "article";
};

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "");

  const finalUrl = envUrl || "http://localhost:3000";

  return finalUrl.endsWith("/") ? finalUrl.slice(0, -1) : finalUrl;
}

function toAbsoluteUrl(value?: string | null) {
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  const base = getSiteUrl();
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${base}${normalized}`;
}

export function buildSeoMetadata({
  data,
  fallbackTitle,
  fallbackDescription,
  path,
  type = "website",
}: BuildSeoMetadataArgs): Metadata {
  const title = data?.seoTitle?.trim() || fallbackTitle;
  const description = data?.seoDescription?.trim() || fallbackDescription;

  const canonicalPath =
    data?.seoCanonicalPath?.trim() || path || undefined;

  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const ogImageUrl = toAbsoluteUrl(data?.seoOgImageUrl || undefined);
  const ogImageAlt =
    data?.seoOgImageAlt?.trim() || title;

  const noIndex = Boolean(data?.seoNoIndex);

  return {
    title,
    description,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Kerning",
      locale: "it_IT",
      type,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              alt: ogImageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}