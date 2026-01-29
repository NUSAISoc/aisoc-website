import { defineCollection, z } from 'astro:content';

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().datetime().or(z.date()), // React to both ISO string or Date object
    time: z.string(),
    location: z.string(),
    status: z.enum(['upcoming', 'past']),
    description: z.string().optional(), // Description often in body, but can be frontmatter too. We use body in plan, but maybe brief is useful.
    image: z.string().optional(),
    registrationUrl: z.string().url().optional(),
  }),
});

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string().max(100),
    image: z.string(),
    order: z.number(),
    social: z.object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
      email: z.string().email().optional(),
    }).optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.string().datetime().or(z.date()),
    excerpt: z.string(),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
  }),
});

export const collections = {
  events: eventsCollection,
  team: teamCollection,
  blog: blogCollection,
};
