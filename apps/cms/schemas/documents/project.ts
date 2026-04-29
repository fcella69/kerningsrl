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
      title: "Categoria visibile",
      type: "string",
      description:
        "Testo libero mostrato nella card e nella pagina progetto. Resta indipendente dai filtri del portfolio.",
    },

    {
      name: "portfolioFilterCategory",
      title: "Categoria filtro portfolio",
      type: "string",
      description:
        "Categoria usata esclusivamente per i filtri della pagina Portfolio.",
      options: {
        list: [
          { title: "Sito Web", value: "Sito Web" },
          { title: "Social", value: "Social" },
          { title: "Grafica", value: "Grafica" },
        ],
        layout: "dropdown",
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: "Sito Web",
    },

    {
      name: "coverImage",
      title: "Hero image / immagine principale",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Immagine grande subito sotto la hero e usata anche come copertina progetto.",
    },
    {
      name: "coverImageAlt",
      title: "Alt hero image",
      type: "string",
    },

    {
      name: "overviewEyebrow",
      title: "Eyebrow overview progetto",
      type: "string",
      initialValue: "Case Study",
    },
    {
      name: "overviewTitle",
      title: "Titolo overview progetto",
      type: "string",
      description:
        "Titolo non troppo grande della sezione descrittiva sotto la hero image.",
    },

    {
      name: "description",
      title: "Descrizione progetto",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Testo descrittivo principale del progetto, mostrato nella colonna sinistra.",
    },

    {
      name: "services",
      title: "Servizi offerti per il progetto",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Esempi: Sito web, ideazione struttura pagine, UI design, sviluppo frontend.",
      validation: (Rule: any) => Rule.max(8),
    },

    {
      name: "liveSiteLabel",
      title: "Testo bottone sito",
      type: "string",
      initialValue: "Vedi il sito",
    },
    {
      name: "liveSiteUrl",
      title: "URL sito progetto",
      type: "url",
    },

    {
      name: "galleryTopWideImage",
      title: "Gallery · immagine larga 1",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "galleryTopWideImageAlt",
      title: "Alt immagine larga 1",
      type: "string",
    },

    {
      name: "galleryPairLeftImage",
      title: "Gallery · immagine affiancata sinistra",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "galleryPairLeftImageAlt",
      title: "Alt immagine affiancata sinistra",
      type: "string",
    },

    {
      name: "galleryPairRightImage",
      title: "Gallery · immagine affiancata destra",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "galleryPairRightImageAlt",
      title: "Alt immagine affiancata destra",
      type: "string",
    },

    {
      name: "galleryBottomWideImage",
      title: "Gallery · immagine larga 2",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "galleryBottomWideImageAlt",
      title: "Alt immagine larga 2",
      type: "string",
    },

    {
      name: "galleryFinalWideImage",
      title: "Gallery · immagine larga 3",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "galleryFinalWideImageAlt",
      title: "Alt immagine larga 3",
      type: "string",
    },

    {
      name: "gallery",
      title: "Legacy gallery",
      type: "array",
      description:
        "Campo legacy mantenuto per retrocompatibilità. Se le nuove immagini non sono compilate, il template proverà a usare questi slot come fallback.",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
};