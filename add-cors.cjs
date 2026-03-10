const projectId = 'scuuz9jw';
const token = 'skv67jYYnd1SYMqdsDgf0j9ixTlG4b3KcybBSe0tqXM2QQbuOl3ufk13alY1dMc8lGPQ2eQQKY8IV7Nh6GOUJ64bufbAYNkS1DnvPiEFJU1VZJxa6uUcCpp35YJw0mk1OpcL9Zw8HxYl43RzWBRsVmxoVcIqCOIxQW4EWFMQuAGBuaYnEZed';

async function addCors() {
  const url = `https://${projectId}.api.sanity.io/v1/projects/${projectId}/cors`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      origin: 'https://counsellorprenuer.github.io',
      allowCredentials: true
    })
  });
  
  const text = await response.text();
  if (response.ok) {
    console.log('CORS origin added successfully!');
  } else {
    console.error('Error adding CORS:', text);
  }
}

addCors().catch(console.error);
