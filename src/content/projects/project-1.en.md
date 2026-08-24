---
lang: "en"
title: "Personal DevSec Portfolio"
description: |
    High-performance personal website built with Astro, TypeScript, and Tailwind CSS.
    Focused on accessibility, bilingual i18n architecture, blazing-fast load times, and automated CI/CD deployment to GitHub Pages.
tech: ["Astro", "Tailwind CSS v4", "TypeScript", "i18n", "CI/CD"]
category: "fullstack"
featured: true
highlights:
  - "Ultra-fast static component architecture with zero unnecessary client-side JavaScript."
  - "Native bilingual support (Spanish / English) with prefix-based routing and state preservation."
  - "100/100 Lighthouse score across Performance, Accessibility, Best Practices, and SEO."
securityFeatures:
  - "100% Static Site Generation (SSG) eliminating traditional server-side attack vectors."
  - "Secure external link attributes `rel='noopener noreferrer'` preventing reverse tabnabbing vulnerabilities."
  - "Strict metadata sanitization and JSON-LD schema generation preventing XSS injections."
github: "https://github.com/SebastianVillaC/Portfolio"
demo: "https://sebastianvillac.github.io/Portfolio/"
---

## 🎯 Project Goal and Vision

The primary goal of this project was to design and engineer a modular, high-performance digital showcase representing the intersection of **modern software development** and **defensive cybersecurity principles**.

Rather than relying on heavy SPA frameworks or pre-made templates, this portfolio leverages **Astro component islands**, shipping minimal JavaScript to the client while maximizing rendering performance.

---

## 🏗️ Technical Architecture

```
Portfolio Architecture:
├── astro.config.mjs (i18n routing, Vite plugins, sitemap generator)
├── src/
│   ├── layouts/BaseLayout.astro (SEO, OpenGraph, JSON-LD, Fonts, Dark/Light theme)
│   ├── content.config.ts (Strict Zod schema typing for projects, blog, stack and certs)
│   ├── components/ (Decoupled, reusable UI components)
│   └── pages/ (Static and dynamic routes for ES/EN)
└── .github/workflows/deploy.yml (Automated CI/CD pipeline for GitHub Pages)
```

### Key Engineering Decisions:

1. **Native Internationalization (i18n):**
   Clean routing via Astro i18n backed by a typed dictionary (`src/i18n/ui.ts`), ensuring consistent UI strings and accessibility.

2. **Tailwind CSS v4 with Semantic Design Variables:**
   Powered by the new Tailwind v4 engine in Vite with CSS custom properties supporting smooth dark/light mode toggling without flash of unstyled content (*FOUC*).

3. **Strict Content Collections:**
   Markdown-driven content strictly validated at build time by Zod schemas to ensure rock-solid data integrity.
