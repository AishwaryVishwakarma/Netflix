export default {
  title: 'FAQ Page',
  name: 'faqPage',
  type: 'document',
  fields: [
    {
      title: 'Features',
      name: 'features',
      type: 'array',
      of: [{type: "feature"}],
    },
  ],
  preview: {
    prepare(): {title: string} {
      return {
        title: 'FAQ Page Content',
      }
    },
  },
}
