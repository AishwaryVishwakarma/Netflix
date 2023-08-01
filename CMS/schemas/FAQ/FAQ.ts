export default {
  title: 'FAQ Page',
  name: 'faqPage',
  type: 'document',
  fields: [
    {
      title: 'Features',
      name: 'features',
      type: 'array',
      of: [{type: 'feature'}],
    },
    {
      title: 'Related Articles',
      name: 'relatedArticles',
      type: 'array',
      of: [{type: 'linkCta'}],
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
