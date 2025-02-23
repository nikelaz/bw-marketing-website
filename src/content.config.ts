import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    image: image(),
    thumbnail: image(),
    author: z.string(),
    summary: z.string(),
  }),
});

export const collections = { blog };