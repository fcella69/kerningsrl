import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "webDesignPage",
    title: "Web Design Page",
    type: "document",
    fields: [
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
        defineField({
            name: "heroEyebrow",
            title: "Hero eyebrow",
            type: "string",
            initialValue: "Web Design",
        }),
        defineField({
            name: "heroTitle",
            title: "Hero title",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero subtitle",
            type: "text",
            rows: 5,
        }),
        defineField({
            name: "heroPrimaryLabel",
            title: "Hero primary CTA label",
            type: "string",
        }),
        defineField({
            name: "heroPrimaryHref",
            title: "Hero primary CTA link",
            type: "string",
            initialValue: "/contatti",
        }),
        defineField({
            name: "heroSecondaryLabel",
            title: "Hero secondary CTA label",
            type: "string",
        }),
        defineField({
            name: "heroSecondaryHref",
            title: "Hero secondary CTA link",
            type: "string",
            initialValue: "/portfolio",
        }),
        defineField({
            name: "heroImage",
            title: "Hero image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),

        defineField({
            name: "introTitle",
            title: "Intro title",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "introBody",
            title: "Intro body",
            type: "text",
            rows: 7,
        }),
        defineField({
            name: "introImage",
            title: "Intro image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),

        defineField({
            name: "servicesTitle",
            title: "Services title",
            type: "string",
        }),
        defineField({
            name: "servicesIntro",
            title: "Services intro",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "services",
            title: "Service cards",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "text",
                            title: "Text",
                            type: "text",
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "text",
                        },
                    },
                }),
            ],
        }),

        defineField({
            name: "processTitle",
            title: "Process title",
            type: "string",
        }),
        defineField({
            name: "processIntro",
            title: "Process intro",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "processSteps",
            title: "Process steps",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "numberLabel",
                            title: "Number label",
                            type: "string",
                        }),
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "text",
                            title: "Text",
                            type: "text",
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "numberLabel",
                        },
                    },
                }),
            ],
        }),

        {
            name: "featureImage",
            title: "Break image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "featureVideo",
            title: "Break video",
            description: "Se è presente il video, avrà priorità sull'immagine",
            type: "file",
            options: {
                accept: "video/mp4,video/webm",
            },
        },

        defineField({
            name: "pillarsTitle",
            title: "Pillars title",
            type: "string",
        }),
        defineField({
            name: "pillarsIntro",
            title: "Pillars intro",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "pillars",
            title: "Pillars",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "text",
                            title: "Text",
                            type: "text",
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "text",
                        },
                    },
                }),
            ],
        }),

        defineField({
            name: "showcaseTitle",
            title: "Showcase title",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "showcaseText",
            title: "Showcase text",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "featuredProjects",
            title: "Featured projects",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: [{ type: "project" }],
                }),
            ],
        }),

        defineField({
            name: "deliverablesTitle",
            title: "Deliverables title",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "deliverablesIntro",
            title: "Deliverables intro",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "deliverables",
            title: "Deliverables",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Label",
                            type: "string",
                        }),
                    ],
                    preview: {
                        select: {
                            title: "label",
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "deliverablesImage",
            title: "Deliverables image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),

        defineField({
            name: "ctaTitle",
            title: "CTA title",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "ctaText",
            title: "CTA text",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "ctaPrimaryLabel",
            title: "CTA primary label",
            type: "string",
        }),
        defineField({
            name: "ctaPrimaryHref",
            title: "CTA primary link",
            type: "string",
            initialValue: "/contatti",
        }),
        defineField({
            name: "ctaSecondaryLabel",
            title: "CTA secondary label",
            type: "string",
        }),
        defineField({
            name: "ctaSecondaryHref",
            title: "CTA secondary link",
            type: "string",
            initialValue: "/portfolio",
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Web Design Page",
                subtitle: "Service/editorial page",
            };
        },
    },
});