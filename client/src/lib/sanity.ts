import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "scuuz9jw",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-10",
  token: "skwwTHmFilJhGvyPMZmxm8qwTiybFuEOaodJpSXMWlGIytsvWdtP47J5wQCc56ionK9M4GDDNbZacnZrb1lUrCWHFATdquSUk9LUlALx9knbkm9MCqPPO0ON7gXTyqMsg87WdnbtjgJFvI4YyDGf07EMpuZZCMk7NH8pNk27GaR9UXMLDFxH",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
