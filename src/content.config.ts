import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const eventsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/events',
  }),
  schema: z.object({
    title: z.string(),
    startDate: z.iso.datetime({ offset: true }).or(z.date()),
    endDate: z.iso.datetime({ offset: true }).or(z.date()),
    location: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    registrationUrl: z.url().optional(),
  }),
});

const teamCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/team',
  }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string().max(100),
    image: z.string().optional(),
    order: z.number(),
    isPastMember: z.boolean().optional().default(false),
    social: z
      .object({
        github: z.url().optional(),
        linkedin: z.url().optional(),
        twitter: z.url().optional(),
        website: z.url().optional(),
        email: z.email().optional(),
      })
      .optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.iso.datetime({ offset: true }).or(z.date()),
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
