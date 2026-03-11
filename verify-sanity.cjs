const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'scuuz9jw',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-10',
  token: 'skv67jYYnd1SYMqdsDgf0j9ixTlG4b3KcybBSe0tqXM2QQbuOl3ufk13alY1dMc8lGPQ2eQQKY8IV7Nh6GOUJ64bufbAYNkS1DnvPiEFJU1VZJxa6uUcCpp35YJw0mk1OpcL9Zw8HxYl43RzWBRsVmxoVcIqCOIxQW4EWFMQuAGBuaYnEZed',
});

async function test() {
  const categories = await client.fetch('*[_type == "pricingCategory"]');
  console.log('Pricing Categories:', categories.length);
  categories.forEach(c => {
    console.log(`- ${c.label} (${c.section}): ${c.plans?.length || 0} plans`);
  });
  
  const hero = await client.fetch('*[_type == "heroSection"][0]');
  console.log('Hero Title:', hero?.title);
}

test().catch(console.error);
