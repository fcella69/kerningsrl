export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "logoAlt",
      title: "Alt logo",
      type: "string",
      initialValue: "Kerning",
    },
    {
      name: "logoLink",
      title: "Link logo",
      type: "string",
      initialValue: "/",
    },
    {
      name: "tagline",
      title: "Tagline breve",
      type: "text",
      rows: 2,
      initialValue:
        "Progetti digitali costruiti con metodo, visione e precisione.",
    },

    {
      name: "backToTopLabel",
      title: "Testo pulsante torna su",
      type: "string",
      initialValue: "Torna su",
    },

    {
      name: "contactTitle",
      title: "Titolo colonna contatti",
      type: "string",
      initialValue: "Contatti",
    },
    {
      name: "address",
      title: "Indirizzo",
      type: "string",
      initialValue: "Via Sanremo, 39 · 85100 Potenza (PZ)",
    },
    {
      name: "phone",
      title: "Telefono",
      type: "string",
      initialValue: "+39 000 000 0000",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      initialValue: "info@kerning.it",
    },

    {
      name: "navigationTitle",
      title: "Titolo colonna navigazione",
      type: "string",
      initialValue: "Navigazione",
    },
    {
      name: "navigationLinks",
      title: "Link navigazione",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "href",
              title: "Link",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    },

    {
      name: "solutionsTitle",
      title: "Titolo colonna soluzioni",
      type: "string",
      initialValue: "Soluzioni Digitali",
    },
    {
      name: "solutionsLinks",
      title: "Link soluzioni digitali",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "href",
              title: "Link",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    },

    {
      name: "socialsTitle",
      title: "Titolo colonna social",
      type: "string",
      initialValue: "Social",
    },
    {
      name: "socials",
      title: "Social",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Nome social",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        },
      ],
    },

    {
      name: "legalLinks",
      title: "Link pagine legali",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "href",
              title: "Link",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    },

    {
      name: "copyrightText",
      title: "Testo copyright",
      type: "string",
      initialValue: "© 2026 Kerning. Tutti i diritti riservati.",
    },
    {
      name: "vatNumber",
      title: "Partita IVA",
      type: "string",
      initialValue: "P.IVA 00000000000",
    },
  ],
};