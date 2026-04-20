export default {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Meta title",
      type: "string",
      description: "Titolo SEO della pagina. Ideale entro 60 caratteri.",
      validation: (Rule: any) => Rule.max(70),
    },
    {
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Descrizione SEO. Ideale tra 140 e 160 caratteri.",
      validation: (Rule: any) => Rule.max(180),
    },
    {
      name: "canonicalPath",
      title: "Canonical path",
      type: "string",
      description:
        'Percorso canonico relativo, ad esempio "/web-design". Lascia vuoto se non ti serve.',
    },
    {
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
      description:
        "Immagine OG per condivisioni social. Consigliato formato 1200x630.",
    },
    {
      name: "ogImageAlt",
      title: "Open Graph image alt",
      type: "string",
      description: "Testo alternativo per l’immagine OG.",
    },
    {
      name: "noIndex",
      title: "No index",
      type: "boolean",
      initialValue: false,
      description:
        "Se attivo, la pagina verrà marcata come non indicizzabile.",
    },
  ],
};