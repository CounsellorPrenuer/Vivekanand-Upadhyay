const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'scuuz9jw',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-10',
  token: 'skv67jYYnd1SYMqdsDgf0j9ixTlG4b3KcybBSe0tqXM2QQbuOl3ufk13alY1dMc8lGPQ2eQQKY8IV7Nh6GOUJ64bufbAYNkS1DnvPiEFJU1VZJxa6uUcCpp35YJw0mk1OpcL9Zw8HxYl43RzWBRsVmxoVcIqCOIxQW4EWFMQuAGBuaYnEZed',
});

async function cleanup() {
  console.log('Cleaning up all documents...');
  const types = ['heroSection', 'aboutSection', 'statsSection', 'mentoriaSection', 'ctaSection', 'pricingCategory', 'testimonial', 'service', 'blogPost', 'faq', 'processStep', 'coupon'];
  
  for (const type of types) {
    const docs = await client.fetch(`*[_type == "${type}"]`);
    console.log(`Deleting ${docs.length} documents of type ${type}...`);
    for (const doc of docs) {
      await client.delete(doc._id);
    }
  }
  console.log('Cleanup complete!');
}

cleanup().catch(console.error);
