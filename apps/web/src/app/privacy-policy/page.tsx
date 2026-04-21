import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";

import LegalPageTemplate from "@/components/sections/legal/LegalPageTemplate/LegalPageTemplate";
import { sanityFetch } from "@/lib/sanity/fetch";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import {
  PRIVACY_POLICY_PAGE_QUERY,
  PRIVACY_POLICY_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

type PrivacyPolicyPageData = {
  heroEyebrow?: string;
  title?: string;
  introText?: string;
  content?: PortableTextBlock[];
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(PRIVACY_POLICY_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Privacy Policy",
    fallbackDescription:
      "Consulta l’informativa sulla privacy del sito Kerning.",
    path: "/privacy-policy",
    type: "website",
  });
}

export default async function PrivacyPolicyPage() {
  const data = await sanityFetch<PrivacyPolicyPageData | null>(
    PRIVACY_POLICY_PAGE_QUERY
  );

  return (
    <LegalPageTemplate
      eyebrow={data?.heroEyebrow || "Informativa"}
      title={data?.title || "Privacy Policy"}
      introText={data?.introText}
      content={data?.content}
    />
  );
}