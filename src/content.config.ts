import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(["es", "en"]),
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      category: z.enum(["cybersecurity", "backend", "fullstack", "tools"]).default("fullstack"),
      featured: z.boolean().default(true),
      highlights: z.array(z.string()).optional(),
      securityFeatures: z.array(z.string()).optional(),
      github: z.string().nullable().optional(),
      demo: z.string().optional().nullable(),
      image: image().optional(),
    }),
});

const certifications = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/certifications",
  }),
  schema: z.object({
    lang: z.enum(["es", "en"]),
    title: z.string(),
    issuer: z.string(),
    year: z.number(),
    url: z.string().optional().nullable(),
  }),
});

const stack = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/stack",
  }),
  schema: z.object({
    lang: z.enum(["es", "en"]),
    title: z.string(),
    icon: z.string(),
    skills: z.array(z.string()),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: z.object({
    lang: z.enum(["es", "en"]),
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    readingTime: z.string().default("5 min"),
    author: z.string().default("Sebastián Villa"),
  }),
});

const timeline = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/timeline",
  }),
  schema: z.object({
    lang: z.enum(["es", "en"]),
    year: z.string(),
    title: z.string(),
    organization: z.string(),
    description: z.string(),
    badge: z.string().optional(),
    type: z.enum(["education", "certification", "experience", "achievement"]).default("experience"),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects,
  certifications,
  stack,
  blog,
  timeline,
};