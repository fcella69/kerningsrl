import { groq } from "next-sanity";

const SEO_FIELDS = `
  "seoTitle": coalesce(seo.title, seoTitle),
  "seoDescription": coalesce(seo.description, seoDescription),
  "seoCanonicalPath": seo.canonicalPath,
  "seoNoIndex": coalesce(seo.noIndex, false),
  "seoOgImageUrl": seo.ogImage.asset->url,
  "seoOgImageAlt": seo.ogImageAlt
`;

export const headerQuery = groq`
  *[_type == "header"][0]{
    logo,
    menuLeft[]{
      label,
      link
    },
    menuRightTitle,
    menuRightTitleLink,
    menuRight[]{
      label,
      link
    },
    address,
    bottomTags,
    socials[]{
      label,
      url
    }
  }
`;

export const footerQuery = groq`
  *[_type == "footer"][0]{
    "logoUrl": logo.asset->url,
    logoAlt,
    logoLink,
    tagline,
    backToTopLabel,

    contactTitle,
    address,
    phone,
    email,

    navigationTitle,
    navigationLinks[]{
      label,
      href
    },

    solutionsTitle,
    solutionsLinks[]{
      label,
      href
    },

    socialsTitle,
    socials[]{
      label,
      url
    },

    legalLinks[]{
      label,
      href
    },

    copyrightText,
    vatNumber
  }
`;

export const homeQuery = groq`
  *[_type == "home"][0]{
    ${SEO_FIELDS},

    hero{
      fixedWord,
      rotatingWords,
      ctaLabel,
      address,
      socials[]{
        label,
        url
      }
    },

    featureMedia{
      "videoUrl": video.asset->url,
      "imageUrl": image.asset->url,
      imageAlt
    },

    portfolioPreview{
      eyebrow,
      title,
      description,
      ctaLabel,
      ctaHref,
      "featuredProjects": featuredProjects[]->{
        title,
        category,
        "slug": slug.current,
        "imageUrl": coverImage.asset->url
      },
      "legacyProjects": projects[]{
        title,
        category,
        slug,
        "imageUrl": image.asset->url
      }
    },

    strengthsSection{
      eyebrow,
      title,
      intro,
      strengths[]{
        _key,
        title,
        text
      },
      solutionsEyebrow,
      solutionsTitle,
      solutionsCards[]{
        _key,
        eyebrow,
        title,
        text,
        href,
        "hoverImageUrl": hoverImage.asset->url,
        hoverImageAlt
      },
      solutionsCtaLabel,
      solutionsCtaHref
    },

    aboutBridge{
      eyebrow,
      title,
      text,
      ctaLabel,
      ctaHref,
      highlights[]{
        _key,
        title,
        text
      }
    },

    finalCta{
      eyebrow,
      title,
      text,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    }
  }
`;

export const HOME_SEO_QUERY = groq`
  *[_type == "home"][0]{
    ${SEO_FIELDS}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${SEO_FIELDS},
    title,
    category,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    description,
    "gallery": gallery[]{
      "url": asset->url
    }
  }
`;

export const PROJECT_SEO_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${SEO_FIELDS},
    title,
    "slug": slug.current
  }
`;

export const projectBySlugDebugQuery = groq`
  *[_type == "project"]{
    "slug": slug.current
  }
`;

export const portfolioQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    title,
    category,
    "slug": slug.current,
    "imageUrl": coverImage.asset->url
  }
`;

export const portfolioPageQuery = groq`
  *[_type == "portfolioPage"][0]{
    ${SEO_FIELDS},
    title,
    subtitle,
    "featuredIds": featuredProjects[]._ref
  }
`;

export const PORTFOLIO_PAGE_SEO_QUERY = groq`
  *[_type == "portfolioPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const portfolioProjectsOrderedQuery = groq`
  *[_type == "portfolioPage"][0]{
    "projects": featuredProjects[]->{
      title,
      category,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url
    }
  }
`;

export const portfolioProjectsFallbackQuery = groq`
  *[_type == "project"] | order(_createdAt desc){
    title,
    category,
    "slug": slug.current,
    "imageUrl": coverImage.asset->url
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0]{
    ${SEO_FIELDS},

    heroEyebrow,
    heroTitle,
    heroSubtitle,

    introLead,
    introCtaLabel,
    introCtaHref,
    featuredImage{
      alt,
      asset->{
        url
      }
    },

    partnersTitle,
    partnerLogos[]{
      _key,
      name,
      link,
      image{
        alt,
        asset->{
          url
        }
      }
    },

    storyTitle,
    storyBody,
    storyImage{
      alt,
      asset->{
        url
      }
    },

    teamTitle,
    teamBody,
    showTeamMembers,
    teamMembers[]{
      _key,
      name,
      role,
      description,
      image{
        alt,
        asset->{
          url
        }
      }
    },

    ctaTitle,
    ctaText,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`;

export const ABOUT_PAGE_SEO_QUERY = groq`
  *[_type == "aboutPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage"][0]{
    ${SEO_FIELDS},

    heroEyebrow,
    heroTitle,
    heroSubtitle,

    quickContacts[]{
      _key,
      label,
      value,
      href
    },

    formTitle,
    formDescription,
    serviceOptions,

    sidebarBlocks[]{
      _key,
      title,
      text,
      ctaLabel,
      ctaHref
    },

    locationsTitle,
    locationsDescription,
    locations[]{
      _key,
      name,
      city,
      address,
      email,
      phone,
      mapUrl
    },

    ctaTitle,
    ctaText,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`;

export const CONTACT_PAGE_SEO_QUERY = groq`
  *[_type == "contactPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const DIGITAL_SOLUTIONS_PAGE_QUERY = groq`
  *[_type == "digitalSolutionsPage"][0]{
    ${SEO_FIELDS},

    heroEyebrow,
    heroTitle,
    heroSubtitle,

    solutions[]{
      _key,
      title,
      text,
      bullets,
      ctaLabel,
      ctaHref,
      "imageUrl": image.asset->url,
      imageAlt
    }
  }
`;

export const DIGITAL_SOLUTIONS_PAGE_SEO_QUERY = groq`
  *[_type == "digitalSolutionsPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const WEB_DESIGN_PAGE_QUERY = groq`
  *[_type == "webDesignPage"][0]{
    ${SEO_FIELDS},

    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroPrimaryLabel,
    heroPrimaryHref,
    heroSecondaryLabel,
    heroSecondaryHref,
    heroImage{
      alt,
      asset->{
        url
      }
    },

    introTitle,
    introBody,
    introImage{
      alt,
      asset->{
        url
      }
    },

    servicesTitle,
    servicesIntro,
    services[]{
      _key,
      title,
      text
    },

    processTitle,
    processIntro,
    processSteps[]{
      _key,
      numberLabel,
      title,
      text
    },

    featureImage{
      asset->{
        url
      },
      alt
    },
    featureVideo{
      asset->{
        url
      }
    },

    pillarsTitle,
    pillarsIntro,
    pillars[]{
      _key,
      title,
      text
    },

    showcaseTitle,
    showcaseText,
    featuredProjects[]->{
      title,
      category,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url
    },

    deliverablesTitle,
    deliverablesIntro,
    deliverables[]{
      _key,
      label
    },
    deliverablesImage{
      alt,
      asset->{
        url
      }
    },

    ctaTitle,
    ctaText,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`;

export const WEB_DESIGN_PAGE_SEO_QUERY = groq`
  *[_type == "webDesignPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const SOCIAL_ADVERTISING_PAGE_QUERY = groq`
  *[_type == "socialAdvertisingPage"][0]{
    ${SEO_FIELDS},

    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroPrimaryLabel,
    heroPrimaryHref,
    heroSecondaryLabel,
    heroSecondaryHref,
    heroImage{
      alt,
      asset->{
        url
      }
    },

    introTitle,
    introBody,
    introImage{
      alt,
      asset->{
        url
      }
    },

    servicesTitle,
    servicesIntro,
    services[]{
      _key,
      title,
      text
    },

    processTitle,
    processIntro,
    processSteps[]{
      _key,
      numberLabel,
      title,
      text
    },

    featureImage{
      asset->{
        url
      },
      alt
    },
    featureVideo{
      asset->{
        url
      }
    },

    pillarsTitle,
    pillarsIntro,
    pillars[]{
      _key,
      title,
      text
    },

    showcaseTitle,
    showcaseText,
    featuredProjects[]->{
      title,
      category,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url
    },

    deliverablesTitle,
    deliverablesIntro,
    deliverables[]{
      _key,
      label
    },
    deliverablesImage{
      alt,
      asset->{
        url
      }
    },

    ctaTitle,
    ctaText,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`;

export const SOCIAL_ADVERTISING_PAGE_SEO_QUERY = groq`
  *[_type == "socialAdvertisingPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const BRAND_IDENTITY_PAGE_QUERY = groq`
  *[_type == "brandIdentityPage"][0]{
    ${SEO_FIELDS},

    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroPrimaryLabel,
    heroPrimaryHref,
    heroSecondaryLabel,
    heroSecondaryHref,
    heroImage{
      alt,
      asset->{
        url
      }
    },

    introTitle,
    introBody,
    introImage{
      alt,
      asset->{
        url
      }
    },

    servicesTitle,
    servicesIntro,
    services[]{
      _key,
      title,
      text
    },

    processTitle,
    processIntro,
    processSteps[]{
      _key,
      numberLabel,
      title,
      text
    },

    featureImage{
      asset->{
        url
      },
      alt
    },
    featureVideo{
      asset->{
        url
      }
    },

    pillarsTitle,
    pillarsIntro,
    pillars[]{
      _key,
      title,
      text
    },

    showcaseTitle,
    showcaseText,
    featuredProjects[]->{
      title,
      category,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url
    },

    deliverablesTitle,
    deliverablesIntro,
    deliverables[]{
      _key,
      label
    },
    deliverablesImage{
      alt,
      asset->{
        url
      }
    },

    ctaTitle,
    ctaText,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`;

export const BRAND_IDENTITY_PAGE_SEO_QUERY = groq`
  *[_type == "brandIdentityPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const CUSTOM_PROJECTS_PAGE_QUERY = groq`
  *[_type == "customProjectsPage"][0]{
    ${SEO_FIELDS},

    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroPrimaryLabel,
    heroPrimaryHref,
    heroSecondaryLabel,
    heroSecondaryHref,
    heroImage{
      alt,
      asset->{
        url
      }
    },

    introTitle,
    introBody,
    introImage{
      alt,
      asset->{
        url
      }
    },

    servicesTitle,
    servicesIntro,
    services[]{
      _key,
      title,
      text
    },

    processTitle,
    processIntro,
    processSteps[]{
      _key,
      numberLabel,
      title,
      text
    },

    featureImage{
      asset->{
        url
      },
      alt
    },
    featureVideo{
      asset->{
        url
      }
    },

    pillarsTitle,
    pillarsIntro,
    pillars[]{
      _key,
      title,
      text
    },

    showcaseTitle,
    showcaseText,
    featuredProjects[]->{
      title,
      category,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url
    },

    deliverablesTitle,
    deliverablesIntro,
    deliverables[]{
      _key,
      label
    },
    deliverablesImage{
      alt,
      asset->{
        url
      }
    },

    ctaTitle,
    ctaText,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`;

export const CUSTOM_PROJECTS_PAGE_SEO_QUERY = groq`
  *[_type == "customProjectsPage"][0]{
    ${SEO_FIELDS}
  }
`;

export const GENERIC_PAGE_SEO_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    ${SEO_FIELDS},
    title,
    "slug": slug.current
  }
`;