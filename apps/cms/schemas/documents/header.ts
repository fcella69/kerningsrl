export default {
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },

    {
      name: "menuLeft",
      title: "Menu sinistro",
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
              name: "link",
              title: "Link",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "link",
            },
          },
        },
      ],
    },

    {
      name: "menuRightTitle",
      title: "Titolo lato destro",
      type: "string",
      initialValue: "Soluzioni Digitali",
    },
    {
      name: "menuRightTitleLink",
      title: "Link titolo lato destro",
      type: "string",
      description:
        "Se compilato, il titolo lato destro del fullscreen menu diventa cliccabile mantenendo lo stesso aspetto.",
      initialValue: "/soluzioni-digitali",
    },

    {
      name: "menuRight",
      title: "Menu destro",
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
              name: "link",
              title: "Link",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "link",
            },
          },
        },
      ],
    },

    {
      name: "address",
      title: "Indirizzo",
      type: "string",
      initialValue: "Via Sanremo, 39 · 85100 Potenza (PZ)",
    },

    {
      name: "bottomTags",
      title: "Testo centrale footer menu",
      type: "string",
      initialValue: "Startup · PMI · Brand culturali · Professionisti",
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
  ],
};