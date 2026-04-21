import { defineType, defineField } from "sanity";

export default defineType({
  name: "termsConditionsPage",
  title: "Terms & Conditions Page",
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
      initialValue: "Termini e Condizioni",
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
      validation: (Rule) => Rule.required(),
    }),
  ],
});