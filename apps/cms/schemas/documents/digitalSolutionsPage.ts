export default {
    name: "digitalSolutionsPage",
    title: "Soluzioni Digitali Page",
    type: "document",
    fields: [
        {
            name: "seo",
            title: "SEO",
            type: "seo",
        },

        {
            name: "heroEyebrow",
            title: "Hero Eyebrow",
            type: "string",
            initialValue: "Soluzioni Digitali",
        },
        {
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            initialValue: "Quattro aree.\nUn solo metodo.",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "text",
            rows: 4,
            initialValue:
                "Diamo forma a identità, presenza e strumenti digitali attraverso un approccio coerente, progettuale e costruito per durare.",
        },

        {
            name: "solutions",
            title: "Solutions",
            type: "array",
            validation: (Rule: any) => Rule.required().min(4).max(4),
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "title",
                            title: "Titolo",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: "text",
                            title: "Testo",
                            type: "text",
                            rows: 4,
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: "bullets",
                            title: "3 bullet point",
                            type: "array",
                            validation: (Rule: any) => Rule.required().min(3).max(3),
                            of: [{ type: "string" }],
                        },
                        {
                            name: "ctaLabel",
                            title: "Testo CTA",
                            type: "string",
                            initialValue: "Scopri di più",
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: "ctaHref",
                            title: "Link CTA",
                            type: "string",
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: "image",
                            title: "Immagine",
                            type: "image",
                            options: { hotspot: true },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: "imageAlt",
                            title: "Alt immagine",
                            type: "string",
                        },
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "ctaHref",
                            media: "image",
                        },
                    },
                },
            ],
        },
    ],
};