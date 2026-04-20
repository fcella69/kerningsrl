import type { Metadata } from "next";

import DigitalSolutionsHero from "@/components/sections/digitalSolutions/DigitalSolutionsHero/DigitalSolutionsHero";
import DigitalSolutionsPinnedCards from "@/components/sections/digitalSolutions/DigitalSolutionsPinnedCards/DigitalSolutionsPinnedCards";
import type { DigitalSolutionsPageData } from "@/components/sections/digitalSolutions/types";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  DIGITAL_SOLUTIONS_PAGE_QUERY,
  DIGITAL_SOLUTIONS_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(DIGITAL_SOLUTIONS_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Soluzioni Digitali",
    fallbackDescription:
      "Scopri le soluzioni digitali Kerning: Web Design, Social & Advertising, Brand Identity e Progetti Custom.",
    path: "/soluzioni-digitali",
    type: "website",
  });
}

export default async function DigitalSolutionsPage() {
  const data = await sanityFetch<DigitalSolutionsPageData | null>(
    DIGITAL_SOLUTIONS_PAGE_QUERY
  );

  return (
    <>
      <DigitalSolutionsHero
        eyebrow={data?.heroEyebrow}
        title={data?.heroTitle}
        subtitle={data?.heroSubtitle}
      />

      <DigitalSolutionsPinnedCards cards={data?.solutions} />
    </>
  );
}