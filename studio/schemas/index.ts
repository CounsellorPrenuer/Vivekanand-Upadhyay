export const pricingPlan = {
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'isPremium', title: 'Is Premium', type: 'boolean' },
    { name: 'paymentButtonId', title: 'Payment Button ID (Legacy)', type: 'string', description: 'Used for old static buttons' },
    { name: 'planId', title: 'Plan ID', type: 'string', description: 'Unique identifier for the plan' },
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
    { name: 'order', title: 'Order', type: 'number' },
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
    { name: 'image', title: 'Header Image', type: 'image', hidden: ({document}: any) => document?.section !== 'custom' },
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

export const coupon = {
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  fields: [
    { name: 'code', title: 'Coupon Code', type: 'string' },
    {
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage', value: 'percentage' },
          { title: 'Flat Amount', value: 'flat' },
        ],
      },
    },
    { name: 'value', title: 'Discount Value', type: 'number' },
    { name: 'isActive', title: 'Is Active', type: 'boolean', initialValue: true },
    { name: 'expiryDate', title: 'Expiry Date', type: 'date' },
  ],
}

export const heroSection = {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'taglines', title: 'Taglines', type: 'array', of: [{ type: 'string' }] },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'profileImage', title: 'Profile Image', type: 'image' },
    { name: 'experienceText', title: 'Experience Text', type: 'string' },
  ],
}

export const aboutSection = {
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    { name: 'description1', title: 'Description Paragraph 1', type: 'text' },
    { name: 'description2', title: 'Description Paragraph 2', type: 'text' },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'traits',
      title: 'Traits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
          ],
        },
      ],
    },
  ],
}

export const statsSection = {
  name: 'statsSection',
  title: 'Stats Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'number' },
            { name: 'suffix', title: 'Suffix', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
          ],
        },
      ],
    },
    { name: 'philosophy', title: 'Philosophy Quote', type: 'text' },
    { name: 'philosophyAuthor', title: 'Philosophy Author', type: 'string' },
  ],
}

export const mentoriaSection = {
  name: 'mentoriaSection',
  title: 'Mentoria Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'bgColor', title: 'Background Color Class', type: 'string' },
            { name: 'iconColor', title: 'Icon Color Class', type: 'string' },
          ],
        },
      ],
    },
  ],
}

export const ctaSection = {
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'whatsapp', title: 'WhatsApp Number', type: 'string' },
  ],
}

export const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
  ],
}

export const processStep = {
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    { name: 'order', title: 'Order', type: 'number' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
  ],
}

export const schemaTypes = [
  pricingCategory,
  pricingPlan,
  testimonial,
  service,
  blogPost,
  coupon,
  heroSection,
  aboutSection,
  statsSection,
  mentoriaSection,
  ctaSection,
  faq,
  processStep
]
