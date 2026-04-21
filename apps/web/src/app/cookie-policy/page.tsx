import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";

import LegalPageTemplate from "@/components/sections/legal/LegalPageTemplate/LegalPageTemplate";
import CookieDeclarationEmbed from "@/components/sections/legal/CookieDeclarationEmbed/CookieDeclarationEmbed";
import { sanityFetch } from "@/lib/sanity/fetch";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import {
  COOKIE_POLICY_PAGE_QUERY,
  COOKIE_POLICY_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";

type CookiePolicyPageData = {
  heroEyebrow?: string;
  title?: string;
  introText?: string;
  content?: PortableTextBlock[];
  declarationTitle?: string;
  declarationText?: string;
  declarationScript?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(COOKIE_POLICY_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Cookie Policy",
    fallbackDescription:
      "Consulta la Cookie Policy del sito Kerning e la dichiarazione aggiornata dei cookie.",
    path: "/cookie-policy",
    type: "website",
  });
}

export default async function CookiePolicyPage() {
  const data = await sanityFetch<CookiePolicyPageData | null>(
    COOKIE_POLICY_PAGE_QUERY
  );

  return (
    <LegalPageTemplate
      eyebrow={data?.heroEyebrow || "Informativa"}
      title={data?.title || "Cookie Policy"}
      introText={data?.introText}
      content={data?.content}
    >
      <div>
        <h2>{data?.declarationTitle}</h2>
        <p>
          {data?.declarationText }
        </p>

        {data?.declarationScript?.trim() ? (
          <CookieDeclarationEmbed script={data.declarationScript} />
        ) : (
          <p>
          </p>
        )}
      </div>
    </LegalPageTemplate>
  );
}