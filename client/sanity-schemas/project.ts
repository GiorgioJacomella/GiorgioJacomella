export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Title', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'de', title: 'German Title', type: 'string', validation: (Rule: any) => Rule.required() }
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English Description', type: 'text', validation: (Rule: any) => Rule.required() },
        { name: 'de', title: 'German Description', type: 'text', validation: (Rule: any) => Rule.required() }
      ]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which projects should appear (lower numbers first)'
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Link Text',
          type: 'object',
          fields: [
            { name: 'en', title: 'English Text', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'de', title: 'German Text', type: 'string', validation: (Rule: any) => Rule.required() }
          ],
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (Rule: any) => Rule.required().uri({ scheme: ['http', 'https'] })
        }
      ],
      description: 'External link for the project (e.g., GitHub, website)'
    }
  ],
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Publication Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    },
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
      publishedAt: 'publishedAt'
    },
    prepare(selection: any) {
      const { title, media, publishedAt } = selection
      return {
        title: title || 'Untitled',
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date',
        media: media
      }
    }
  }
}
