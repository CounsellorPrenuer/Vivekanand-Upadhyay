const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'scuuz9jw',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-10',
});

async function test() {
  const result = await client.fetch('*[_type == "heroSection"][0]');
  console.log('Hero Section Data:', JSON.stringify(result, null, 2));
}

test().catch(console.error);
