export interface CustomProjectsImage {
  alt?: string;
  asset?: {
    url?: string;
  };
}

export interface CustomProjectsVideo {
  asset?: {
    url?: string;
  };
}

export interface CustomProjectsServiceItem {
  _key?: string;
  title?: string;
  text?: string;
}

export interface CustomProjectsProcessStep {
  _key?: string;
  numberLabel?: string;
  title?: string;
  text?: string;
}

export interface CustomProjectsPillarItem {
  _key?: string;
  title?: string;
  text?: string;
}

export interface CustomProjectsDeliverable {
  _key?: string;
  label?: string;
}

export interface CustomProjectsFeaturedProject {
  title?: string;
  category?: string;
  slug?: string;
  imageUrl?: string;
}

export interface CustomProjectsPageData {
  seoTitle?: string;
  seoDescription?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryLabel?: string;
  heroPrimaryHref?: string;
  heroSecondaryLabel?: string;
  heroSecondaryHref?: string;
  heroImage?: CustomProjectsImage;

  introTitle?: string;
  introBody?: string;
  introImage?: CustomProjectsImage;

  servicesTitle?: string;
  servicesIntro?: string;
  services?: CustomProjectsServiceItem[];

  processTitle?: string;
  processIntro?: string;
  processSteps?: CustomProjectsProcessStep[];

  featureImage?: CustomProjectsImage;
  featureVideo?: CustomProjectsVideo;

  pillarsTitle?: string;
  pillarsIntro?: string;
  pillars?: CustomProjectsPillarItem[];

  showcaseTitle?: string;
  showcaseText?: string;
  featuredProjects?: CustomProjectsFeaturedProject[];

  deliverablesTitle?: string;
  deliverablesIntro?: string;
  deliverables?: CustomProjectsDeliverable[];
  deliverablesImage?: CustomProjectsImage;

  ctaTitle?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}