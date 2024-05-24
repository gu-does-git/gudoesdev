// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Export a single `collections` object to register your collection(s)
export const collections = {
  // Define a `type` and `schema` for each collection
  posts: defineCollection({
    type: "content",
    schema: z.object({
      author: z.string().default("Gustavo Rocha"),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      image: z.string(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
  }),
  projects: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      description: z.string(),
      url: z.string(),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().optional(),
    }),
  }),
};
