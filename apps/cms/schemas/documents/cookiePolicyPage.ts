import { defineType, defineField } from "sanity";

export default defineType({
  name: "cookiePolicyPage",
  title: "Cookie Policy Page",
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
      initialValue: "Informativa",
    }),

    defineField({
      name: "title",
      title: "Titolo pagina",
      type: "string",
      initialValue: "Cookie Policy",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "introText",
      title: "Testo introduttivo",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "content",
      title: "Contenuto",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "declarationTitle",
      title: "Titolo sezione Cookiebot",
      type: "string",
      initialValue: "Dichiarazione dei cookie",
    }),

    defineField({
      name: "declarationText",
      title: "Testo sopra la dichiarazione Cookiebot",
      type: "text",
      rows: 2,
      initialValue:
        "Di seguito puoi consultare la dichiarazione aggiornata dei cookie generata da Cookiebot.",
    }),

    defineField({
      name: "declarationScript",
      title: "Script dichiarazione Cookiebot",
      type: "text",
      rows: 6,
      description:
        "Incolla qui lo script completo fornito da Cookiebot per la pagina Cookie Policy / dichiarazione cookie statica.",
    }),
  ],
});