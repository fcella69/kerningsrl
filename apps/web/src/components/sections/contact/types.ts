export type ContactQuickItem = {
  _key?: string;
  label?: string;
  value?: string;
  href?: string;
};

export type ContactSidebarBlock = {
  _key?: string;
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type ContactLocation = {
  _key?: string;
  name?: string;
  city?: string;
  address?: string;
  email?: string;
  phone?: string;
  mapUrl?: string;
};

export type ContactPageData = {
  seoTitle?: string;
  seoDescription?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;

  quickContacts?: ContactQuickItem[];

  formTitle?: string;
  formDescription?: string;
  serviceOptions?: string[];

  sidebarBlocks?: ContactSidebarBlock[];

  locationsTitle?: string;
  locationsDescription?: string;
  locations?: ContactLocation[];

  ctaTitle?: string;
  ctaText?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
};