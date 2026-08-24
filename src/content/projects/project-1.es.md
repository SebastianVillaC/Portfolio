---
lang: "es"
title: "Portfolio Personal DevSec"
description: |
    Sitio web personal de alto rendimiento desarrollado con Astro, TypeScript y Tailwind CSS.
    Enfoque en accesibilidad, arquitectura bilingüe i18n, optimización extrema de carga y despliegue automatizado en GitHub Pages.
tech: ["Astro", "Tailwind CSS v4", "TypeScript", "i18n", "CI/CD"]
category: "fullstack"
featured: true
highlights:
  - "Arquitectura de componentes estáticos ultra rápidos con cero JavaScript innecesario en el cliente."
  - "Soporte nativo bilingüe (Español / Inglés) con enrutamiento por prefijo y preservación de estado."
  - "Puntuación de 100/100 en Lighthouse para Rendimiento, Accesibilidad, Mejores Prácticas y SEO."
securityFeatures:
  - "Generación 100% estática (SSG) que elimina vectores comunes de ataque en servidores dinámicos."
  - "Encabezados y enlaces con atributos seguros `rel='noopener noreferrer'` para prevenir vulnerabilidades de reverse tabnabbing."
  - "Sanitización estricta de metadatos y schemas JSON-LD para prevenir inyecciones XSS."
github: "https://github.com/SebastianVillaC/Portfolio"
demo: "https://sebastianvillac.github.io/Portfolio/"
---

## 🎯 Objetivo y Visión del Proyecto

El objetivo principal de este proyecto fue diseñar y desarrollar una presencia digital profesional, modular y de alto rendimiento que reflejase la intersección entre el **desarrollo de software moderno** y los **principios de ciberseguridad defensiva**.

A diferencia de plantillas prediseñadas o sitios pesados construidos sobre frameworks SPA tradicionales, este portafolio aprovecha la arquitectura de **islas de componentes de Astro**, minimizando el JavaScript enviado al cliente y maximizando la velocidad de carga.

---

## 🏗️ Arquitectura Técnica

```
Portfolio Architecture:
├── astro.config.mjs (i18n routing, Vite plugins, sitemap generator)
├── src/
│   ├── layouts/BaseLayout.astro (SEO, OpenGraph, JSON-LD, Fonts, Dark/Light theme)
│   ├── content.config.ts (Tipado estricto con Zod para proyectos, blog, stack y certs)
│   ├── components/ (Componentes desacoplados e independientes)
│   └── pages/ (Rutas dinámicas y estáticas para ES/EN)
└── .github/workflows/deploy.yml (Pipeline automatizado de CI/CD para GitHub Pages)
```

### Principales Decisiones de Ingeniería:

1. **Internacionalización Nativa (i18n):**
   Implementación de enrutamiento bilingüe mediante Astro i18n con diccionario tipado centralizado (`src/i18n/ui.ts`), garantizando consistencia en textos y accesibilidad.

2. **Tailwind CSS v4 con Variables de Diseño:**
   Uso del nuevo motor de Tailwind v4 integrado en Vite, con variables CSS semánticas para soportar temas dinámicos (Oscuro/Claro) con transiciones suaves sin parpadeo de pantalla (*FOUC*).

3. **Content Collections Tipadas:**
   Gestión de contenido en Markdown validado por esquemas de Zod en tiempo de compilación, evitando errores de estructura en proyectos o artículos.

---

## 🔒 Consideraciones de Seguridad Implementadas

- **Aislamiento de Enlaces Externos:** Todos los hipervínculos salientes utilizan `rel="noopener noreferrer"` para proteger contra vulnerabilidades de *window.opener*.
- **Generación de Sitio Estático (SSG):** Al no contar con una base de datos conectada en el frontend ni backend dinámico expuesto, la superficie de ataque frente a inyecciones SQL o ejecución remota de código es prácticamente nula.
- **Validación Estricta de Esquemas:** Zod valida que las URLs y campos de metadatos cumplan con formatos válidos antes de generar las páginas estáticas.