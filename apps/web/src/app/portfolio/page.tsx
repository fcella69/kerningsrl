import type { Metadata } from "next";

import PortfolioGrid from "@/components/sections/portfolio/PortfolioGrid";
import { sanityFetch } from "@/lib/sanity/fetch";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import {
  portfolioPageQuery,
  portfolioProjectsOrderedQuery,
  portfolioProjectsFallbackQuery,
  PORTFOLIO_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

type Project = {
  title: string;
  category?: string;
  portfolioFilterCategory?: string;
  slug: string;
  imageUrl?: string;
};

type PortfolioPageData = {
  heroEyebrow?: string;
  title?: string;
  subtitle?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  projectsCountSuffix?: string;
  emptyStateText?: string;
  featuredIds?: string[];
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(PORTFOLIO_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Portfolio",
    fallbackDescription:
      "Una selezione di progetti digitali firmati Kerning tra branding, web design, comunicazione e sviluppo.",
    path: "/portfolio",
    type: "website",
  });
}

export default async function PortfolioPage() {
  const page = await sanityFetch<PortfolioPageData>(portfolioPageQuery);

  const hasCustomOrder = (page?.featuredIds?.length ?? 0) > 0;

  const projects = hasCustomOrder
    ? (
        await sanityFetch<{
          projects: Project[];
        }>(portfolioProjectsOrderedQuery)
      )?.projects ?? []
    : await sanityFetch<Project[]>(portfolioProjectsFallbackQuery);

  return (
    <PortfolioGrid
      heroEyebrow={page?.heroEyebrow ?? "Portfolio"}
      title={page?.title ?? "Portfolio"}
      subtitle={
        page?.subtitle ??
        "Una selezione di progetti che raccontano il nostro approccio."
      }
      sectionEyebrow={page?.sectionEyebrow ?? "Selected Work"}
      sectionTitle={
        page?.sectionTitle ??
        "Progetti costruiti con identità, struttura e attenzione al dettaglio."
      }
      projectsCountSuffix={page?.projectsCountSuffix ?? "progetti"}
      emptyStateText={page?.emptyStateText ?? "Portfolio in caricamento…"}
      projects={projects}
    />
  );
}