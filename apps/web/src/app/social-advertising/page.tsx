import type { Metadata } from "next";

import SocialAdvertisingHero from "@/components/sections/socialAdvertising/SocialAdvertisingHero/SocialAdvertisingHero";
import SocialAdvertisingIntro from "@/components/sections/socialAdvertising/SocialAdvertisingIntro/SocialAdvertisingIntro";
import SocialAdvertisingServices from "@/components/sections/socialAdvertising/SocialAdvertisingServices/SocialAdvertisingServices";
import SocialAdvertisingProcess from "@/components/sections/socialAdvertising/SocialAdvertisingProcess/SocialAdvertisingProcess";
import SocialAdvertisingFeatureImage from "@/components/sections/socialAdvertising/SocialAdvertisingFeatureImage/SocialAdvertisingFeatureImage";
import SocialAdvertisingPillars from "@/components/sections/socialAdvertising/SocialAdvertisingPillars/SocialAdvertisingPillars";
import SocialAdvertisingShowcase from "@/components/sections/socialAdvertising/SocialAdvertisingShowcase/SocialAdvertisingShowcase";
import SocialAdvertisingDeliverables from "@/components/sections/socialAdvertising/SocialAdvertisingDeliverables/SocialAdvertisingDeliverables";
import SocialAdvertisingCta from "@/components/sections/socialAdvertising/SocialAdvertisingCta/SocialAdvertisingCta";
import type { SocialAdvertisingPageData } from "@/components/sections/socialAdvertising/types";

import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  SOCIAL_ADVERTISING_PAGE_QUERY,
  SOCIAL_ADVERTISING_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(SOCIAL_ADVERTISING_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Social & Advertising",
    fallbackDescription:
      "Strategia, contenuti e campagne per costruire presenza, continuità e risultati misurabili.",
    path: "/social-advertising",
    type: "website",
  });
}

export default async function SocialAdvertisingPage() {
  const page = await sanityFetch<SocialAdvertisingPageData | null>(
    SOCIAL_ADVERTISING_PAGE_QUERY
  );

  if (!page) {
    return null;
  }

  return (
    <>
      <SocialAdvertisingHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        primaryLabel={page.heroPrimaryLabel}
        primaryHref={page.heroPrimaryHref}
        secondaryLabel={page.heroSecondaryLabel}
        secondaryHref={page.heroSecondaryHref}
        image={page.heroImage}
      />

      <SocialAdvertisingIntro
        title={page.introTitle}
        body={page.introBody}
        image={page.introImage}
      />

      <SocialAdvertisingServices
        title={page.servicesTitle}
        intro={page.servicesIntro}
        items={page.services}
      />

      <SocialAdvertisingProcess
        title={page.processTitle}
        intro={page.processIntro}
        steps={page.processSteps}
      />

      <SocialAdvertisingFeatureImage
        image={page.featureImage}
        video={page.featureVideo}
      />

      <SocialAdvertisingPillars
        title={page.pillarsTitle}
        intro={page.pillarsIntro}
        items={page.pillars}
      />

      <SocialAdvertisingShowcase
        title={page.showcaseTitle}
        text={page.showcaseText}
        projects={page.featuredProjects}
      />

      <SocialAdvertisingDeliverables
        title={page.deliverablesTitle}
        intro={page.deliverablesIntro}
        items={page.deliverables}
        image={page.deliverablesImage}
      />

      <SocialAdvertisingCta
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