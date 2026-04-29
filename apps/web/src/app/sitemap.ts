import type { MetadataRoute } from "next";
import { groq } from "next-sanity";

import { sanityFetch } from "@/lib/sanity/fetch";
import { getSiteUrl } from "@/lib/seo/buildSeoMetadata";

type ProjectSlugRow = {
  slug: string;
};

const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/chi-siamo",
    "/contatti",
    "/web-design",
    "/social-advertising",
    "/brand-identity",
    "/progetti-custom",
    "/soluzioni-digitali",
    "/portfolio",
    "/privacy-policy",
    "/cookie-policy",
    "/termini-e-condizioni",
  ].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/portfolio" ? 0.85 : 0.8,
  }));

  const projects =
    (await sanityFetch<ProjectSlugRow[]>(projectSlugsQuery)) ?? [];

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}