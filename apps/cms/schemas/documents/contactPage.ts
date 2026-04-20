import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "contactPage",
    title: "Pagina Contatti",
    type: "document",
    fields: [
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),


        defineField({
            name: "heroEyebrow",
            title: "Hero Eyebrow",
            type: "string",
            initialValue: "Contatti",
        }),
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "text",
            rows: 3,
            initialValue: "Parliamo del tuo prossimo progetto digitale.",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "text",
            rows: 4,
        }),

        defineField({
            name: "quickContacts",
            title: "Quick Contacts",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    name: "quickContactItem",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Label",
                            type: "string",
                        }),
                        defineField({
                            name: "value",
                            title: "Value",
                            type: "string",
                        }),
                        defineField({
                            name: "href",
                            title: "Link / href",
                            type: "string",
                            description: "Esempi: mailto:info@..., tel:+39..., /portfolio, https://...",
                        }),
                    ],
                    preview: {
                        select: {
                            title: "label",
                            subtitle: "value",
                        },
                    },
                }),
            ],
        }),

        defineField({
            name: "formTitle",
            title: "Form Title",
            type: "string",
            initialValue: "Scrivici",
        }),
        defineField({
            name: "formDescription",
            title: "Form Description",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "serviceOptions",
            title: "Service Options",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
        }),

        defineField({
            name: "sidebarBlocks",
            title: "Sidebar Blocks",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    name: "sidebarBlock",
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
                        defineField({
                            name: "ctaLabel",
                            title: "CTA Label",
                            type: "string",
                        }),
                        defineField({
                            name: "ctaHref",
                            title: "CTA href",
                            type: "string",
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
            name: "locationsTitle",
            title: "Locations Title",
            type: "string",
            initialValue: "Dove siamo",
        }),
        defineField({
            name: "locationsDescription",
            title: "Locations Description",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "locations",
            title: "Locations",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    name: "locationItem",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Name",
                            type: "string",
                        }),
                        defineField({
                            name: "city",
                            title: "City",
                            type: "string",
                        }),
                        defineField({
                            name: "address",
                            title: "Address",
                            type: "text",
                            rows: 3,
                        }),
                        defineField({
                            name: "email",
                            title: "Email",
                            type: "string",
                        }),
                        defineField({
                            name: "phone",
                            title: "Phone",
                            type: "string",
                        }),
                        defineField({
                            name: "mapUrl",
                            title: "Map URL",
                            type: "url",
                        }),
                    ],
                    preview: {
                        select: {
                            title: "name",
                            subtitle: "city",
                        },
                    },
                }),
            ],
        }),

        defineField({
            name: "ctaTitle",
            title: "Final CTA Title",
            type: "string",
        }),
        defineField({
            name: "ctaText",
            title: "Final CTA Text",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "ctaPrimaryLabel",
            title: "Final CTA Primary Label",
            type: "string",
        }),
        defineField({
            name: "ctaPrimaryHref",
            title: "Final CTA Primary href",
            type: "string",
        }),
        defineField({
            name: "ctaSecondaryLabel",
            title: "Final CTA Secondary Label",
            type: "string",
        }),
        defineField({
            name: "ctaSecondaryHref",
            title: "Final CTA Secondary href",
            type: "string",
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Pagina Contatti",
            };
        },
    },
});