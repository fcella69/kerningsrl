import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPillar',
  title: 'About Pillar',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Testo',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
    },
  },
})