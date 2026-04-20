import type { Metadata } from "next";

import ProjectTemplate from "@/components/sections/portfolio/ProjectTemplate/ProjectTemplate";
import { sanityFetch } from "@/lib/sanity/fetch";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import {
  projectBySlugQuery,
  PROJECT_SEO_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectData = {
  title: string;
  category?: string;
  slug: string;
  coverImageUrl?: string;
  description?: string;
  gallery?: {
    url?: string;
  }[];
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

  const project = await sanityFetch<ProjectData | null>(projectBySlugQuery, {
    slug,
  });

  if (!project) {
    return null;
  }

  return <ProjectTemplate project={project} />;
}