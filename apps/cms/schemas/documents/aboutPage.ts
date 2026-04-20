import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "Chi Siamo",
  type: "document",
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
    { name: "partners", title: "Partner" },
    { name: "story", title: "Story Block" },
    { name: "team", title: "Team" },
    { name: "cta", title: "CTA" },
  ],
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
      initialValue: "Chi siamo",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 4,
      group: "hero",
    }),

    defineField({
      name: "introLead",
      title: "Intro Lead",
      type: "text",
      rows: 6,
      group: "intro",
    }),
    defineField({
      name: "introCtaLabel",
      title: "Intro CTA Label",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introCtaHref",
      title: "Intro CTA Link",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "featuredImage",
      title: "Intro Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      group: "intro",
    }),

    defineField({
      name: "partnersTitle",
      title: "Partners Title",
      type: "string",
      initialValue: "I nostri partner",
      group: "partners",
    }),
    defineField({
      name: "partnerLogos",
      title: "Partner Logos",
      type: "array",
      of: [{ type: "partnerLogo" }],
      group: "partners",
    }),

    defineField({
      name: "storyTitle",
      title: "Story Block Title",
      type: "text",
      rows: 3,
      group: "story",
    }),
    defineField({
      name: "storyBody",
      title: "Story Block Body",
      type: "text",
      rows: 6,
      group: "story",
    }),
    defineField({
      name: "storyImage",
      title: "Story Block Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      group: "story",
    }),

    defineField({
      name: "teamTitle",
      title: "Team Title",
      type: "text",
      rows: 3,
      group: "team",
    }),
    defineField({
      name: "teamBody",
      title: "Team Body",
      type: "text",
      rows: 6,
      group: "team",
    }),
    defineField({
      name: "showTeamMembers",
      title: "Mostra i membri del team",
      type: "boolean",
      initialValue: false,
      group: "team",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [{ type: "teamMember" }],
      hidden: ({ document }) => !document?.showTeamMembers,
      group: "team",
    }),

    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "text",
      rows: 4,
      group: "cta",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "CTA Primary Label",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaPrimaryHref",
      title: "CTA Primary Link",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "CTA Secondary Label",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryHref",
      title: "CTA Secondary Link",
      type: "string",
      group: "cta",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Chi Siamo",
        subtitle: "Pagina About Kerning",
      };
    },
  },
});