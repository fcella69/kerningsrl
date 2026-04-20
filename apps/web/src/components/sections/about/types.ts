export interface SanityImage {
  alt?: string;
  asset?: {
    url?: string;
  };
}

export interface AboutTeamMember {
  _key?: string;
  name?: string;
  role?: string;
  description?: string;
  image?: SanityImage;
}

export interface PartnerLogo {
  _key?: string;
  name?: string;
  link?: string;
  image?: SanityImage;
}

export interface AboutPageData {
  seoTitle?: string;
  seoDescription?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;

  introLead?: string;
  introCtaLabel?: string;
  introCtaHref?: string;
  featuredImage?: SanityImage;

  partnersTitle?: string;
  partnerLogos?: PartnerLogo[];

  storyTitle?: string;
  storyBody?: string;
  storyImage?: SanityImage;

  teamTitle?: string;
  teamBody?: string;
  showTeamMembers?: boolean;
  teamMembers?: AboutTeamMember[];

  ctaTitle?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}