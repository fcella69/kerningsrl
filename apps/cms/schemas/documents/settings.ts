import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
    }),

    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Icona del sito usata come favicon. Consigliato PNG quadrato.",
    }),

    defineField({
      name: "faviconAlt",
      title: "Favicon Alt",
      type: "string",
      initialValue: "Kerning favicon",
    }),

    defineField({
      name: "cookiebotId",
      title: "Cookiebot ID",
      type: "string",
      description:
        "Inserisci il Cookiebot CBID. Verrà usato per il banner globale e per la Cookie Policy.",
    }),
  ],
});