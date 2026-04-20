import type { Metadata } from "next";

import Hero from "@/components/sections/home/Hero/Hero";
import FeatureMedia from "@/components/sections/home/FeatureMedia/FeatureMedia";
import PortfolioCarousel from "@/components/sections/home/PortfolioCarousel/PortfolioCarousel";
import StrengthsSolutions from "@/components/sections/home/StrengthsSolutions/StrengthsSolutions";
import HomeAboutBridge from "@/components/sections/home/HomeAboutBridge/HomeAboutBridge";
import HomeFinalCta from "@/components/sections/home/HomeFinalCta/HomeFinalCta";

import type { HomePageData } from "@/components/sections/home/types";
import { sanityFetch } from "@/lib/sanity/fetch";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import { HOME_SEO_QUERY, homeQuery } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(HOME_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Kerning — Digital Studio",
    fallbackDescription:
      "Kerning è uno studio digitale specializzato in branding, web design e prodotti digitali ad alte prestazioni.",
    path: "/",
    type: "website",
  });
}

export default async function HomePage() {
  const data = await sanityFetch<HomePageData>(homeQuery);

  return (
    <>
      <Hero hero={data?.hero} />
      <FeatureMedia media={data?.featureMedia} />
      <PortfolioCarousel data={data?.portfolioPreview} />
      <StrengthsSolutions data={data?.strengthsSection} />
      <HomeAboutBridge data={data?.aboutBridge} />
      <HomeFinalCta data={data?.finalCta} />
    </>
  );
}