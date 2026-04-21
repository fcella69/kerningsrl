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
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Portfolio",
    },
    {
      name: "title",
      title: "Titolo hero",
      type: "string",
      initialValue: "Portfolio",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Sottotitolo hero",
      type: "text",
      rows: 3,
      initialValue:
        "Una selezione di progetti che raccontano il nostro approccio.",
    },

    {
      name: "sectionEyebrow",
      title: "Eyebrow sezione progetti",
      type: "string",
      initialValue: "Selected Work",
    },
    {
      name: "sectionTitle",
      title: "Titolo sezione progetti",
      type: "string",
      initialValue:
        "Progetti costruiti con identità, struttura e attenzione al dettaglio.",
    },
    {
      name: "projectsCountSuffix",
      title: "Suffix conteggio progetti",
      type: "string",
      initialValue: "progetti",
      description: 'Esempio: "progetti"',
    },
    {
      name: "emptyStateText",
      title: "Testo stato vuoto",
      type: "string",
      initialValue: "Portfolio in caricamento…",
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