const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'scuuz9jw',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-10',
  token: 'skv67jYYnd1SYMqdsDgf0j9ixTlG4b3KcybBSe0tqXM2QQbuOl3ufk13alY1dMc8lGPQ2eQQKY8IV7Nh6GOUJ64bufbAYNkS1DnvPiEFJU1VZJxa6uUcCpp35YJw0mk1OpcL9Zw8HxYl43RzWBRsVmxoVcIqCOIxQW4EWFMQuAGBuaYnEZed',
});

async function debug() {
  const categories = await client.fetch('*[_type == "pricingCategory"]');
  console.log('Total Categories Found:', categories.length);
  categories.forEach(c => {
    console.log(`Document ID: ${c._id}`);
    console.log(`Label: ${c.label}`);
    console.log(`Section: ${c.section}`);
    console.log(`Plans Count: ${c.plans?.length || 0}`);
    console.log('---');
  });
}

debug().catch(console.error);
