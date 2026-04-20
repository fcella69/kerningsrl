export default {
  name: "portfolioPage",
  title: "Portfolio Page",
  type: "document",
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },
    {
      name: "title",
      title: "Titolo",
      type: "string",
      initialValue: "Portfolio",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Sottotitolo",
      type: "text",
      rows: 3,
      initialValue: "Una selezione di progetti che raccontano il nostro approccio.",
    },

    {
      name: "featuredProjects",
      title: "Ordine progetti (drag & drop)",
      description:
        "Trascina qui i progetti nell’ordine in cui vuoi mostrarli. Se lasci vuoto, verranno mostrati tutti i progetti in ordine di creazione.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    },
  ],
};
