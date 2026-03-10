export const pricingPlan = {
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'isPremium', title: 'Is Premium', type: 'boolean' },
    { name: 'paymentButtonId', title: 'Payment Button ID', type: 'string' },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}

export const pricingCategory = {
  name: 'pricingCategory',
  title: 'Pricing Category',
  type: 'document',
  fields: [
    { name: 'id', title: 'ID', type: 'string' },
    { name: 'label', title: 'Label', type: 'string' },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Custom', value: 'custom' },
        ],
      },
    },
    {
      name: 'plans',
      title: 'Plans',
      type: 'array',
      of: [{ type: 'pricingPlan' }],
    },
  ],
}

export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'rating', title: 'Rating', type: 'number' },
    { name: 'text', title: 'Text', type: 'text' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
}

export const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}

export const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'readTime', title: 'Read Time', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
}

export const schemaTypes = [pricingCategory, pricingPlan, testimonial, service, blogPost]
