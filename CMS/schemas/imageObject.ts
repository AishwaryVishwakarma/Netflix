export default {
  title: 'Image Object',
  name: 'imageObject',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Image Alternate Text',
      description: 'Important for SEO and accessibility',
    },
    {
      title: 'Image Name (Optional)',
      name: 'name',
      type: 'string',
    },
  ],
  preview: {
    select: {
      alt: 'alt',
      name: 'name',
      image: 'image',
    },
    prepare(selection: Record<string, any>) {
      const {alt, name, image} = selection

      return {
        title: 'Image Section',
        subtitle: alt || name,
        media: image,
      }
    },
  },
}
