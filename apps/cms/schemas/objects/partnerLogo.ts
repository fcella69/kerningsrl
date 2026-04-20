import { defineField, defineType } from "sanity";

export default defineType({
  name: "partnerLogo",
  title: "Partner Logo",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Logo",
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
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});