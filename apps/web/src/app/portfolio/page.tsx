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
  slug: string;
  imageUrl?: string;
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
  const page = await sanityFetch<{
    title?: string;
    subtitle?: string;
    featuredIds?: string[];
  }>(portfolioPageQuery);

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
      title={page?.title ?? "Portfolio"}
      subtitle={
        page?.subtitle ??
        "Una selezione di progetti che raccontano il nostro approccio."
      }
      projects={projects}
    />
  );
}