export type HomeSocialLink = {
  label?: string;
  url?: string;
};

export type HomeHeroData = {
  fixedWord?: string;
  rotatingWords?: string[];
  ctaLabel?: string;
  address?: string;
  socials?: HomeSocialLink[];
};

export type HomeFeatureMediaData = {
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type HomePortfolioProject = {
  title?: string;
  category?: string;
  imageUrl?: string;
  slug?: string;
};

export type HomePortfolioPreviewData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  featuredProjects?: HomePortfolioProject[];
  legacyProjects?: HomePortfolioProject[];
};

export type HomeStrengthItem = {
  _key?: string;
  title?: string;
  text?: string;
};

export type HomeSolutionCard = {
  _key?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  href?: string;
  hoverImageUrl?: string;
  hoverImageAlt?: string;
};

export type HomeStrengthsSectionData = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  strengths?: HomeStrengthItem[];
  solutionsEyebrow?: string;
  solutionsTitle?: string;
  solutionsCards?: HomeSolutionCard[];
  solutionsCtaLabel?: string;
  solutionsCtaHref?: string;
};

export type HomeAboutBridgeHighlight = {
  _key?: string;
  title?: string;
  text?: string;
};

export type HomeAboutBridgeData = {
  eyebrow?: string;
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  highlights?: HomeAboutBridgeHighlight[];
};

export type HomeFinalCtaData = {
  eyebrow?: string;
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type HomePageData = {
  hero?: HomeHeroData;
  featureMedia?: HomeFeatureMediaData;
  portfolioPreview?: HomePortfolioPreviewData;
  strengthsSection?: HomeStrengthsSectionData;
  aboutBridge?: HomeAboutBridgeData;
  finalCta?: HomeFinalCtaData;
} | null;