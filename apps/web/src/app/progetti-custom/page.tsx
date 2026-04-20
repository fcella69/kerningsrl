import type { Metadata } from "next";

import CustomProjectsHero from "@/components/sections/customProjects/CustomProjectsHero/CustomProjectsHero";
import CustomProjectsIntro from "@/components/sections/customProjects/CustomProjectsIntro/CustomProjectsIntro";
import CustomProjectsServices from "@/components/sections/customProjects/CustomProjectsServices/CustomProjectsServices";
import CustomProjectsProcess from "@/components/sections/customProjects/CustomProjectsProcess/CustomProjectsProcess";
import CustomProjectsFeatureImage from "@/components/sections/customProjects/CustomProjectsFeatureImage/CustomProjectsFeatureImage";
import CustomProjectsPillars from "@/components/sections/customProjects/CustomProjectsPillars/CustomProjectsPillars";
import CustomProjectsShowcase from "@/components/sections/customProjects/CustomProjectsShowcase/CustomProjectsShowcase";
import CustomProjectsDeliverables from "@/components/sections/customProjects/CustomProjectsDeliverables/CustomProjectsDeliverables";
import CustomProjectsCta from "@/components/sections/customProjects/CustomProjectsCta/CustomProjectsCta";
import type { CustomProjectsPageData } from "@/components/sections/customProjects/types";

import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  CUSTOM_PROJECTS_PAGE_QUERY,
  CUSTOM_PROJECTS_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(CUSTOM_PROJECTS_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Progetti Custom",
    fallbackDescription:
      "Soluzioni digitali su misura progettate da Kerning per esigenze specifiche, processi reali e obiettivi concreti.",
    path: "/progetti-custom",
    type: "website",
  });
}

export default async function CustomProjectsPage() {
  const page = await sanityFetch<CustomProjectsPageData | null>(
    CUSTOM_PROJECTS_PAGE_QUERY
  );

  if (!page) {
    return null;
  }

  return (
    <>
      <CustomProjectsHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        primaryLabel={page.heroPrimaryLabel}
        primaryHref={page.heroPrimaryHref}
        secondaryLabel={page.heroSecondaryLabel}
        secondaryHref={page.heroSecondaryHref}
        image={page.heroImage}
      />

      <CustomProjectsIntro
        title={page.introTitle}
        body={page.introBody}
        image={page.introImage}
      />

      <CustomProjectsServices
        title={page.servicesTitle}
        intro={page.servicesIntro}
        items={page.services}
      />

      <CustomProjectsProcess
        title={page.processTitle}
        intro={page.processIntro}
        steps={page.processSteps}
      />

      <CustomProjectsFeatureImage
        image={page.featureImage}
        video={page.featureVideo}
      />

      <CustomProjectsPillars
        title={page.pillarsTitle}
        intro={page.pillarsIntro}
        items={page.pillars}
      />

      <CustomProjectsShowcase
        title={page.showcaseTitle}
        text={page.showcaseText}
        projects={page.featuredProjects}
      />

      <CustomProjectsDeliverables
        title={page.deliverablesTitle}
        intro={page.deliverablesIntro}
        items={page.deliverables}
        image={page.deliverablesImage}
      />

      <CustomProjectsCta
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