import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "scuuz9jw",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-10",
  token: "skv67jYYnd1SYMqdsDgf0j9ixTlG4b3KcybBSe0tqXM2QQbuOl3ufk13alY1dMc8lGPQ2eQQKY8IV7Nh6GOUJ64bufbAYNkS1DnvPiEFJU1VZJxa6uUcCpp35YJw0mk1OpcL9Zw8HxYl43RzWBRsVmxoVcIqCOIxQW4EWFMQuAGBuaYnEZed",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
