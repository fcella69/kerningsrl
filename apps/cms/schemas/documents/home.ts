export default {
  name: "home",
  title: "Homepage",
  type: "document",
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },
    /* =========================
       HERO
    ========================= */
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [

        {
          name: "fixedWord",
          title: "Parola fissa",
          type: "string",
          initialValue: "siamo",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "rotatingWords",
          title: "Parole rotanti",
          type: "array",
          of: [{ type: "string" }],
          validation: (Rule: any) => Rule.required().min(1).max(6),
        },
        {
          name: "ctaLabel",
          title: "Testo CTA",
          type: "string",
          initialValue: "Scopri di più",
        },
        {
          name: "address",
          title: "Indirizzo / testo footer hero",
          type: "string",
          initialValue: "Via Sanremo, 39 · 85100 Potenza (PZ)",
        },
        {
          name: "socials",
          title: "Social hero",
          type: "array",
          validation: (Rule: any) => Rule.max(3),
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
    },

    /* =========================
       FEATURE MEDIA
    ========================= */
    {
      name: "featureMedia",
      title: "Feature media",
      type: "object",
      fields: [
        {
          name: "video",
          title: "Video",
          type: "file",
          description: "Se presente, ha priorità sull'immagine.",
          options: {
            accept: "video/*",
          },
        },
        {
          name: "image",
          title: "Immagine",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "imageAlt",
          title: "Alt immagine",
          type: "string",
        },
      ],
    },

    /* =========================
       PORTFOLIO PREVIEW
    ========================= */
    {
      name: "portfolioPreview",
      title: "Portfolio · Sezione Home",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Portfolio",
        },
        {
          name: "title",
          title: "Titolo sezione",
          type: "string",
          initialValue:
            "Progetti che prendono forma con metodo, visione e precisione.",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "description",
          title: "Testo descrittivo",
          type: "text",
          rows: 3,
          initialValue:
            "Una selezione di lavori che racconta il nostro modo di tradurre identità, obiettivi e performance in esperienze digitali concrete.",
        },
        {
          name: "ctaLabel",
          title: "Testo CTA",
          type: "string",
          initialValue: "Vedi tutti i progetti",
        },
        {
          name: "ctaHref",
          title: "Link CTA",
          type: "string",
          initialValue: "/portfolio",
        },
        {
          name: "featuredProjects",
          title: "Progetti in evidenza",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "project" }],
            },
          ],
          validation: (Rule: any) => Rule.max(8),
        },

        /* Legacy fallback */
        {
          name: "subtitle",
          title: "Sottotitolo legacy",
          type: "text",
          rows: 2,
          hidden: true,
        },
        {
          name: "projects",
          title: "Progetti legacy",
          type: "array",
          hidden: true,
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Titolo progetto",
                  type: "string",
                },
                {
                  name: "category",
                  title: "Categoria",
                  type: "string",
                },
                {
                  name: "image",
                  title: "Immagine",
                  type: "image",
                  options: { hotspot: true },
                },
                {
                  name: "slug",
                  title: "Slug",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },

    /* =========================
       STRENGTHS + SOLUTIONS
    ========================= */
    {
      name: "strengthsSection",
      title: "Punti di forza + Soluzioni",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Perché Kerning",
        },
        {
          name: "title",
          title: "Titolo",
          type: "string",
          initialValue:
            "Un approccio chiaro, progettuale e orientato al risultato.",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "intro",
          title: "Testo introduttivo",
          type: "text",
          rows: 3,
        },
        {
          name: "strengths",
          title: "Punti di forza",
          type: "array",
          validation: (Rule: any) => Rule.required().min(3).max(4),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Titolo",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "text",
                  title: "Testo",
                  type: "text",
                  rows: 3,
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "text",
                },
              },
            },
          ],
        },
        {
          name: "solutionsEyebrow",
          title: "Eyebrow carousel soluzioni",
          type: "string",
          initialValue: "Soluzioni digitali",
        },
        {
          name: "solutionsTitle",
          title: "Titolo carousel soluzioni",
          type: "string",
          initialValue:
            "Quattro aree, un unico metodo: qualità, coerenza e visione.",
        },
        {
          name: "solutionsCards",
          title: "Card soluzioni",
          type: "array",
          validation: (Rule: any) => Rule.required().min(4).max(4),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "eyebrow",
                  title: "Eyebrow card",
                  type: "string",
                },
                {
                  name: "title",
                  title: "Titolo card",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "text",
                  title: "Testo card",
                  type: "text",
                  rows: 3,
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "href",
                  title: "Link card",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "hoverImage",
                  title: "Piccola immagine hover",
                  type: "image",
                  options: { hotspot: true },
                  description:
                    "Piccola immagine che compare da desktop sull’hover della card.",
                },
                {
                  name: "hoverImageAlt",
                  title: "Alt immagine hover",
                  type: "string",
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "href",
                  media: "hoverImage",
                },
              },
            },
          ],
        },
        {
          name: "solutionsCtaLabel",
          title: "Testo CTA soluzioni",
          type: "string",
          initialValue: "Vai a Soluzioni Digitali",
        },
        {
          name: "solutionsCtaHref",
          title: "Link CTA soluzioni",
          type: "string",
          initialValue: "/soluzioni-digitali",
        },
      ],
    },

    /* =========================
       ABOUT BRIDGE
    ========================= */
    {
      name: "aboutBridge",
      title: "Rimando a Chi siamo",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Inside Kerning",
        },
        {
          name: "title",
          title: "Titolo",
          type: "string",
          initialValue:
            "Dietro ogni progetto c’è un modo preciso di osservare, costruire e rifinire.",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "text",
          title: "Testo",
          type: "text",
          rows: 3,
        },
        {
          name: "ctaLabel",
          title: "Testo CTA",
          type: "string",
          initialValue: "Scopri chi siamo",
        },
        {
          name: "ctaHref",
          title: "Link CTA",
          type: "string",
          initialValue: "/chi-siamo",
        },
        {
          name: "highlights",
          title: "Highlight cards",
          type: "array",
          validation: (Rule: any) => Rule.max(3),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Titolo",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "text",
                  title: "Testo",
                  type: "text",
                  rows: 3,
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "text",
                },
              },
            },
          ],
        },
      ],
    },

    /* =========================
       FINAL CTA
    ========================= */
    {
      name: "finalCta",
      title: "CTA finale",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Contatti",
        },
        {
          name: "title",
          title: "Titolo",
          type: "string",
          initialValue:
            "Se vuoi costruire qualcosa di solido, possiamo iniziare da qui.",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "text",
          title: "Testo",
          type: "text",
          rows: 3,
        },
        {
          name: "primaryLabel",
          title: "CTA primaria · testo",
          type: "string",
          initialValue: "Contattaci",
        },
        {
          name: "primaryHref",
          title: "CTA primaria · link",
          type: "string",
          initialValue: "/contatti",
        },
        {
          name: "secondaryLabel",
          title: "CTA secondaria · testo",
          type: "string",
          initialValue: "Scopri i servizi",
        },
        {
          name: "secondaryHref",
          title: "CTA secondaria · link",
          type: "string",
          initialValue: "/soluzioni-digitali",
        },
      ],
    },
  ],
};