export default {
  title: 'Link CTA',
  name: 'linkCta',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      text: 'text',
      link: 'link',
    },
    prepare(selection: Record<string, any>) {
      const {text, link} = selection

      return {
        title: text || "Link Cta",
        subtitle: link,
      }
    },
  },
}
