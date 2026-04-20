export interface BrandIdentityImage {
  alt?: string;
  asset?: {
    url?: string;
  };
}

export interface BrandIdentityVideo {
  asset?: {
    url?: string;
  };
}

export interface BrandIdentityServiceItem {
  _key?: string;
  title?: string;
  text?: string;
}

export interface BrandIdentityProcessStep {
  _key?: string;
  numberLabel?: string;
  title?: string;
  text?: string;
}

export interface BrandIdentityPillarItem {
  _key?: string;
  title?: string;
  text?: string;
}

export interface BrandIdentityDeliverable {
  _key?: string;
  label?: string;
}

export interface BrandIdentityFeaturedProject {
  title?: string;
  category?: string;
  slug?: string;
  imageUrl?: string;
}

export interface BrandIdentityPageData {
  seoTitle?: string;
  seoDescription?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryLabel?: string;
  heroPrimaryHref?: string;
  heroSecondaryLabel?: string;
  heroSecondaryHref?: string;
  heroImage?: BrandIdentityImage;

  introTitle?: string;
  introBody?: string;
  introImage?: BrandIdentityImage;

  servicesTitle?: string;
  servicesIntro?: string;
  services?: BrandIdentityServiceItem[];

  processTitle?: string;
  processIntro?: string;
  processSteps?: BrandIdentityProcessStep[];

  featureImage?: BrandIdentityImage;
  featureVideo?: BrandIdentityVideo;

  pillarsTitle?: string;
  pillarsIntro?: string;
  pillars?: BrandIdentityPillarItem[];

  showcaseTitle?: string;
  showcaseText?: string;
  featuredProjects?: BrandIdentityFeaturedProject[];

  deliverablesTitle?: string;
  deliverablesIntro?: string;
  deliverables?: BrandIdentityDeliverable[];
  deliverablesImage?: BrandIdentityImage;

  ctaTitle?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}