import type { Metadata } from "next";

import AboutCta from "@/components/sections/about/AboutCta/AboutCta";
import AboutHero from "@/components/sections/about/AboutHero/AboutHero";
import AboutIntroStatement from "@/components/sections/about/AboutIntroStatement/AboutIntroStatement";
import AboutPartners from "@/components/sections/about/AboutPartners/AboutPartners";
import AboutStoryBlock from "@/components/sections/about/AboutStoryBlock/AboutStoryBlock";
import AboutTeamSection from "@/components/sections/about/AboutTeamSection/AboutTeamSection";
import type { AboutPageData } from "@/components/sections/about/types";
import { sanityFetch } from "@/lib/sanity/fetch";
import { ABOUT_PAGE_QUERY, ABOUT_PAGE_SEO_QUERY } from "@/lib/sanity/queries";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import styles from "./AboutPage.module.css";

const FALLBACK_DATA: AboutPageData = {
  heroEyebrow: "Chi siamo",
  heroTitle: "Uno studio digitale creativo\nvicino ai clienti e dentro i progetti.",
  heroSubtitle: "",
  introLead: "",
  introCtaLabel: "Scopri i progetti",
  introCtaHref: "/portfolio",
  partnersTitle: "I nostri partner",
  partnerLogos: [],
  teamTitle: "Un team che mette insieme idee,\nmetodo e presenza.",
  teamBody: "",
  showTeamMembers: false,
  teamMembers: [],
  ctaTitle: "Hai un progetto da costruire?",
  ctaText: "",
  ctaPrimaryLabel: "Contattaci",
  ctaPrimaryHref: "/contatti",
  ctaSecondaryLabel: "Scopri i progetti",
  ctaSecondaryHref: "/portfolio",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(ABOUT_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Chi siamo",
    fallbackDescription:
      "Scopri visione, metodo e approccio progettuale di Kerning.",
    path: "/chi-siamo",
    type: "website",
  });
}

export default async function ChiSiamoPage() {
  const aboutPage = await sanityFetch<AboutPageData | null>(ABOUT_PAGE_QUERY);

  const data: AboutPageData = {
    ...FALLBACK_DATA,
    ...(aboutPage ?? {}),
    partnerLogos: aboutPage?.partnerLogos ?? [],
    teamMembers: aboutPage?.teamMembers ?? [],
  };

  return (
    <main className={styles.page}>
      <AboutHero
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
      />

      <AboutIntroStatement
        lead={data.introLead}
        ctaLabel={data.introCtaLabel}
        ctaHref={data.introCtaHref}
        image={data.featuredImage}
      />

      <AboutPartners
        title={data.partnersTitle}
        logos={data.partnerLogos}
      />

      <AboutStoryBlock
        title={data.storyTitle}
        body={data.storyBody}
        image={data.storyImage}
      />

      <AboutTeamSection
        title={data.teamTitle}
        body={data.teamBody}
        showMembers={data.showTeamMembers}
        members={data.teamMembers}
      />

      <AboutCta
        title={data.ctaTitle}
        text={data.ctaText}
        primaryLabel={data.ctaPrimaryLabel}
        primaryHref={data.ctaPrimaryHref}
        secondaryLabel={data.ctaSecondaryLabel}
        secondaryHref={data.ctaSecondaryHref}
      />
    </main>
  );
}