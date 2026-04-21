import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";

import LegalPageTemplate from "@/components/sections/legal/LegalPageTemplate/LegalPageTemplate";
import { sanityFetch } from "@/lib/sanity/fetch";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import {
  TERMS_CONDITIONS_PAGE_QUERY,
  TERMS_CONDITIONS_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

type TermsConditionsPageData = {
  heroEyebrow?: string;
  title?: string;
  introText?: string;
  content?: PortableTextBlock[];
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(TERMS_CONDITIONS_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Termini e Condizioni",
    fallbackDescription:
      "Consulta i termini e le condizioni del sito Kerning.",
    path: "/termini-e-condizioni",
    type: "website",
  });
}

export default async function TermsConditionsPage() {
  const data = await sanityFetch<TermsConditionsPageData | null>(
    TERMS_CONDITIONS_PAGE_QUERY
  );

  return (
    <LegalPageTemplate
      eyebrow={data?.heroEyebrow || "Informativa"}
      title={data?.title || "Termini e Condizioni"}
      introText={data?.introText}
      content={data?.content}
    />
  );
}