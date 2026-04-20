import type { Metadata } from "next";

import BrandIdentityHero from "@/components/sections/brandIdentity/BrandIdentityHero/BrandIdentityHero";
import BrandIdentityIntro from "@/components/sections/brandIdentity/BrandIdentityIntro/BrandIdentityIntro";
import BrandIdentityServices from "@/components/sections/brandIdentity/BrandIdentityServices/BrandIdentityServices";
import BrandIdentityProcess from "@/components/sections/brandIdentity/BrandIdentityProcess/BrandIdentityProcess";
import BrandIdentityFeatureImage from "@/components/sections/brandIdentity/BrandIdentityFeatureImage/BrandIdentityFeatureImage";
import BrandIdentityPillars from "@/components/sections/brandIdentity/BrandIdentityPillars/BrandIdentityPillars";
import BrandIdentityShowcase from "@/components/sections/brandIdentity/BrandIdentityShowcase/BrandIdentityShowcase";
import BrandIdentityDeliverables from "@/components/sections/brandIdentity/BrandIdentityDeliverables/BrandIdentityDeliverables";
import BrandIdentityCta from "@/components/sections/brandIdentity/BrandIdentityCta/BrandIdentityCta";
import type { BrandIdentityPageData } from "@/components/sections/brandIdentity/types";

import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  BRAND_IDENTITY_PAGE_QUERY,
  BRAND_IDENTITY_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(BRAND_IDENTITY_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Brand Identity",
    fallbackDescription:
      "Sistemi visivi costruiti da Kerning per rendere un brand riconoscibile, coerente e credibile.",
    path: "/brand-identity",
    type: "website",
  });
}

export default async function BrandIdentityPage() {
  const page = await sanityFetch<BrandIdentityPageData | null>(
    BRAND_IDENTITY_PAGE_QUERY
  );

  if (!page) {
    return null;
  }

  return (
    <>
      <BrandIdentityHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        primaryLabel={page.heroPrimaryLabel}
        primaryHref={page.heroPrimaryHref}
        secondaryLabel={page.heroSecondaryLabel}
        secondaryHref={page.heroSecondaryHref}
        image={page.heroImage}
      />

      <BrandIdentityIntro
        title={page.introTitle}
        body={page.introBody}
        image={page.introImage}
      />

      <BrandIdentityServices
        title={page.servicesTitle}
        intro={page.servicesIntro}
        items={page.services}
      />

      <BrandIdentityProcess
        title={page.processTitle}
        intro={page.processIntro}
        steps={page.processSteps}
      />

      <BrandIdentityFeatureImage
        image={page.featureImage}
        video={page.featureVideo}
      />

      <BrandIdentityPillars
        title={page.pillarsTitle}
        intro={page.pillarsIntro}
        items={page.pillars}
      />

      <BrandIdentityShowcase
        title={page.showcaseTitle}
        text={page.showcaseText}
        projects={page.featuredProjects}
      />

      <BrandIdentityDeliverables
        title={page.deliverablesTitle}
        intro={page.deliverablesIntro}
        items={page.deliverables}
        image={page.deliverablesImage}
      />

      <BrandIdentityCta
        title={page.ctaTitle}
        text={page.ctaText}
        primaryLabel={page.ctaPrimaryLabel}
        primaryHref={page.ctaPrimaryHref}
        secondaryLabel={page.ctaSecondaryLabel}
        secondaryHref={page.ctaSecondaryHref}
      />
    </>
  );
}