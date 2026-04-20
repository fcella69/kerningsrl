export type DigitalSolutionsCard = {
  _key?: string;
  title?: string;
  text?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type DigitalSolutionsPageData = {
  seoTitle?: string;
  seoDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  solutions?: DigitalSolutionsCard[];
} | null;