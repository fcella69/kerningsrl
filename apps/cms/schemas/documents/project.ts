export default {
  name: "project",
  title: "Progetto",
  type: "document",
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },
    {
      name: "title",
      title: "Titolo progetto",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: "category",
      title: "Tipologia progetto",
      type: "string",
      description: "Es: Branding, Web Design, Social, Fotografia",
    },

    {
      name: "coverImage",
      title: "Immagine di copertina",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    {
      name: "description",
      title: "Descrizione progetto",
      type: "array",
      of: [{ type: "block" }],
    },

    {
      name: "gallery",
      title: "Galleria immagini progetto",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
};
