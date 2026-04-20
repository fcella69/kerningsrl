import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";

import ProjectTemplate from "@/components/sections/portfolio/ProjectTemplate/ProjectTemplate";
import { sanityFetch } from "@/lib/sanity/fetch";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import {
  projectBySlugQuery,
  PROJECT_SEO_BY_SLUG_QUERY,
  portfolioPageQuery,
  portfolioProjectsOrderedQuery,
  portfolioProjectsFallbackQuery,
} from "@/lib/sanity/queries";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectNavItem = {
  title: string;
  category?: string;
  slug: string;
  imageUrl?: string;
};

type RawProjectData = {
  title: string;
  category?: string;
  slug: string;

  coverImageUrl?: string;
  coverImageAlt?: string;

  overviewEyebrow?: string;
  overviewTitle?: string;
  description?: PortableTextBlock[];

  services?: string[];
  liveSiteLabel?: string;
  liveSiteUrl?: string;

  galleryTopWideImageUrl?: string;
  galleryTopWideImageAlt?: string;

  galleryPairLeftImageUrl?: string;
  galleryPairLeftImageAlt?: string;

  galleryPairRightImageUrl?: string;
  galleryPairRightImageAlt?: string;

  galleryBottomWideImageUrl?: string;
  galleryBottomWideImageAlt?: string;

  galleryFinalWideImageUrl?: string;
  galleryFinalWideImageAlt?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const seo = await sanityFetch<any>(PROJECT_SEO_BY_SLUG_QUERY, { slug });

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: seo?.title
      ? `${seo.title} — Portfolio`
      : "Progetto — Portfolio",
    fallbackDescription:
      "Scopri un progetto realizzato da Kerning all’interno del portfolio.",
    path: seo?.slug ? `/portfolio/${seo.slug}` : "/portfolio",
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = await sanityFetch<RawProjectData | null>(projectBySlugQuery, {
    slug,
  });

  if (!project) {
    return null;
  }

  const pageMeta = await sanityFetch<{
    featuredIds?: string[];
  } | null>(portfolioPageQuery);

  const hasCustomOrder = (pageMeta?.featuredIds?.length ?? 0) > 0;

  const orderedProjects: ProjectNavItem[] = hasCustomOrder
    ? (
        await sanityFetch<{
          projects: ProjectNavItem[];
        } | null>(portfolioProjectsOrderedQuery)
      )?.projects ?? []
    : (await sanityFetch<ProjectNavItem[]>(portfolioProjectsFallbackQuery)) ?? [];

  const currentIndex = orderedProjects.findIndex((item) => item.slug === slug);

  const previousProject =
    currentIndex > 0 ? orderedProjects[currentIndex - 1] : null;

  const nextProject =
    currentIndex !== -1 && currentIndex < orderedProjects.length - 1
      ? orderedProjects[currentIndex + 1]
      : null;

  return (
    <ProjectTemplate
      project={project}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  );
}