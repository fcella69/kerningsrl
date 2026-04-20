export type WebDesignImage = {
    alt?: string;
    asset?: {
        url?: string;
    };
};

export type WebDesignServiceItem = {
    _key?: string;
    title?: string;
    text?: string;
};

export type WebDesignProcessStep = {
    _key?: string;
    numberLabel?: string;
    title?: string;
    text?: string;
};

export type WebDesignPillarItem = {
    _key?: string;
    title?: string;
    text?: string;
};

export type WebDesignFeaturedProject = {
    title?: string;
    category?: string;
    slug?: string;
    imageUrl?: string;
};

export type WebDesignDeliverable = {
    _key?: string;
    label?: string;
};

export interface WebDesignMedia {
    asset?: {
        url?: string;
    };
    alt?: string;
}

export type WebDesignPageData = {
    seoTitle?: string;
    seoDescription?: string;

    heroEyebrow?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroPrimaryLabel?: string;
    heroPrimaryHref?: string;
    heroSecondaryLabel?: string;
    heroSecondaryHref?: string;
    heroImage?: WebDesignImage;

    introTitle?: string;
    introBody?: string;
    introImage?: WebDesignImage;

    servicesTitle?: string;
    servicesIntro?: string;
    services?: WebDesignServiceItem[];

    processTitle?: string;
    processIntro?: string;
    processSteps?: WebDesignProcessStep[];

    featureImage?: WebDesignMedia;
    featureVideo?: {
        asset?: {
            url?: string;
        };
    };

    pillarsTitle?: string;
    pillarsIntro?: string;
    pillars?: WebDesignPillarItem[];

    showcaseTitle?: string;
    showcaseText?: string;
    featuredProjects?: WebDesignFeaturedProject[];

    deliverablesTitle?: string;
    deliverablesIntro?: string;
    deliverables?: WebDesignDeliverable[];
    deliverablesImage?: WebDesignImage;

    ctaTitle?: string;
    ctaText?: string;
    ctaPrimaryLabel?: string;
    ctaPrimaryHref?: string;
    ctaSecondaryLabel?: string;
    ctaSecondaryHref?: string;
};

