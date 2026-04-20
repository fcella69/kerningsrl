export interface SocialAdvertisingImage {
  alt?: string;
  asset?: {
    url?: string;
  };
}

export interface SocialAdvertisingVideo {
  asset?: {
    url?: string;
  };
}

export interface SocialAdvertisingServiceItem {
  _key?: string;
  title?: string;
  text?: string;
}

export interface SocialAdvertisingProcessStep {
  _key?: string;
  numberLabel?: string;
  title?: string;
  text?: string;
}

export interface SocialAdvertisingPillarItem {
  _key?: string;
  title?: string;
  text?: string;
}

export interface SocialAdvertisingDeliverable {
  _key?: string;
  label?: string;
}

export interface SocialAdvertisingFeaturedProject {
  title?: string;
  category?: string;
  slug?: string;
  imageUrl?: string;
}

export interface SocialAdvertisingPageData {
  seoTitle?: string;
  seoDescription?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryLabel?: string;
  heroPrimaryHref?: string;
  heroSecondaryLabel?: string;
  heroSecondaryHref?: string;
  heroImage?: SocialAdvertisingImage;

  introTitle?: string;
  introBody?: string;
  introImage?: SocialAdvertisingImage;

  servicesTitle?: string;
  servicesIntro?: string;
  services?: SocialAdvertisingServiceItem[];

  processTitle?: string;
  processIntro?: string;
  processSteps?: SocialAdvertisingProcessStep[];

  featureImage?: SocialAdvertisingImage;
  featureVideo?: SocialAdvertisingVideo;

  pillarsTitle?: string;
  pillarsIntro?: string;
  pillars?: SocialAdvertisingPillarItem[];

  showcaseTitle?: string;
  showcaseText?: string;
  featuredProjects?: SocialAdvertisingFeaturedProject[];

  deliverablesTitle?: string;
  deliverablesIntro?: string;
  deliverables?: SocialAdvertisingDeliverable[];
  deliverablesImage?: SocialAdvertisingImage;

  ctaTitle?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}