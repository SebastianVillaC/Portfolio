import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    github: z.string().url().nullable(),
    demo: z.string().url().optional().nullable(),
  }),
});

const certifications = defineCollection({
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    year: z.number(),
    url: z.string().url().optional().nullable(),
  }),
});

const stack = defineCollection({
  schema: z.object({
    title: z.string(),
    icon: z.string(), // nombre del icono
    skills: z.array(z.string()),
  }),
});

export const collections = {
  projects,
  certifications,
  stack,
};
