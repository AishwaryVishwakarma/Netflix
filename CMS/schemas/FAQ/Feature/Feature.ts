export default {
  title: 'Feature',
  name: 'feature',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Feature Image',
      name: 'featureImage',
      type: 'imageObject',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
