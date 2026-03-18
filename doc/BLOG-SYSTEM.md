# Sistema de Blog - Encriptados Frontend

## Estado Actual

### Arquitectura

El blog actual es 100% client-side. Todas las páginas usan `"use client"` y obtienen los datos directamente desde la API REST de WordPress en `encriptados.es`.

**Rutas:**
- `/[locale]/blog` → Listado de blogs (página principal)
- `/[locale]/blog/[postId]` → Detalle de un blog (por ID numérico de WordPress)

**No hay pathnames localizados** para blog en `routing.ts` — la ruta es `/blog` en todos los idiomas.

---

### API de WordPress

**Endpoint:** `https://encriptados.io/wp-json/encriptados/v1/blogs?lang={locale}`

- `?lang=es` → ~50 posts en español
- `?lang=en` → ~50 posts en inglés (traducciones WPML)
- Env var: `NEXT_PUBLIC_WP_BLOG_API` (fallback: `https://encriptados.io/wp-json`)

**Tipo de respuesta:**

```typescript
type BlogAPIItem = {
  id: number;                    // ID de WordPress (ej: 61183, 54227, 1322...)
  card: {
    imagen: string;              // URL imagen card (1024px)
    imagen_full: string;         // URL imagen completa
    titulo: string;              // Título del post
    descripcion: string;         // Extracto/descripción
    fecha: string;               // ISO 8601 "2026-03-02T18:09:51-05:00"
    autor: string;               // "Pablo Monsalve", "WebMaster", "encriptados"
  };
  contenido: {
    imagen: string;              // Avatar del autor (Gravatar URL)
    titulo: string;              // Título (duplicado del card)
    cuerpo: string;              // HTML completo del artículo (WordPress blocks/inline styles)
    fecha: string;               // ISO 8601 (duplicado del card)
    autor: string;               // Nombre del autor (duplicado del card)
  };
};
```

**Notas importantes:**
- El `id` es numérico y asignado por WordPress
- `card.imagen` es la versión 1024px, `card.imagen_full` es la versión completa
- `contenido.cuerpo` contiene HTML crudo de WordPress con:
  - Bloques `wp-block-*` (heading, paragraph, image, embed, list, spacer)
  - Estilos inline (`font-weight`, `width`, `height`)
  - Embeds de YouTube (iframes)
  - Embeds de Instagram
  - Imágenes con `srcset` y `loading="lazy"`
  - Enlaces a `encriptados.io` y `translate.google.com` (posts viejos)
- `contenido.imagen` es el avatar Gravatar del autor, **NO** la imagen del post
- Autores principales: "Pablo Monsalve", "WebMaster", "encriptados"
- Posts desde 2020 hasta 2026 (con fecha futura para programación)

---

### Componentes Actuales

#### Página de Listado (`/blog`)

```
page.tsx
  └── BlogPage.tsx          ← Fetch de datos + layout
        ├── BannerBlog.tsx   ← Banner superior con título/descripción
        └── ListOfPosts.tsx  ← Grid paginado (6 por página)
              └── CardOfPost.tsx  ← Tarjeta individual
```

**BlogPage.tsx** (`src/app/[locale]/blog/components/BlogPage.tsx`):
- `"use client"` con `useState` y `useEffect`
- Fetch directo a `BLOGS_API_URL` (hardcoded `?lang=es`)
- Mapea `BlogAPIItem[]` → `{ image, title, description, author, id }`
- No usa el locale actual para el `lang` parameter

**ListOfPosts.tsx:**
- Paginación de 6 posts por página
- Paginación inteligente con ellipsis (`...`) si hay > 7 páginas
- Scroll suave al cambiar page

**CardOfPost.tsx:**
- Imagen con `next/image` (fill, object-cover)
- Título (line-clamp-2), descripción (line-clamp-2)
- Avatar del autor (inicial en círculo) + nombre
- Link: `href={/blog/${id}}` — **Sin prefijo de locale** (lo maneja next-intl automáticamente)
- Texto hardcodeado: "Leer más →"

#### Página de Detalle (`/blog/[postId]`)

```
page.tsx                          ← SWR fetch + mapeo
  └── PostIdPage.tsx              ← Layout principal
        ├── BannerPostById.tsx    ← Banner superior
        ├── ContentBlogById.tsx   ← Contenido del artículo
        │     └── dangerouslySetInnerHTML  ← HTML de WordPress
        ├── PreviousPosts.tsx     ← Sidebar con posts anteriores (3)
        │     └── CardOfPost.tsx
        └── TalkNowBanner.tsx     ← CTA banner
```

**page.tsx** (`[postId]/page.tsx`):
- `"use client"` con `useSWR` para fetch
- Fetch a misma URL hardcoded `?lang=es`
- Mapea todos los posts y pasa a `PostIdPage`

**ContentBlogById.tsx:**
- Obtiene `postId` de `useParams()`
- Fetch **TODOS** los posts y busca por ID con `.find()`
- Renderiza `contenido.cuerpo` vía `dangerouslySetInnerHTML`
- Usa Tailwind prose classes para styling del HTML
- Imagen principal: `card.imagen_full || card.imagen`

**PreviousPosts.tsx:**
- Filtra posts con fecha anterior al post actual
- Ordena por fecha descendente
- Muestra máximo 3 posts anteriores
- Usa `CardOfPost` en layout vertical

---

### Traducciones (i18n)

**Namespace:** `BlogPage` en `messages/{locale}.json`

```json
{
  "BlogPage": {
    "ourBlogTitleBanner": "Nuestro Blog",
    "ourBlogDescriptionBanner": "Aprende sobre seguridad cifrada",
    "menu": {
      "techTitle": "Tecnología",
      "ventureTitle": "Emprendimiento",
      "eCommerceTitle": "Comercio Electrónico",
      "marketingTitle": "Marketing",
      "toolsTitle": "Herramientas",
      "publicityTitle": "Publicidad"
    },
    "writeBy": "Escrito por:",
    "share": "Compartir:",
    "downloadAppTitle": "...",
    "subscribe": "Suscribirse",
    ...
  }
}
```

**Problema actual:** Solo se traducen las labels de UI (títulos de banner, categorías del menú). El contenido de los posts siempre se trae en español porque `?lang=es` está hardcodeado.

---

### Problemas Identificados

1. **Idioma hardcodeado:** `BLOGS_API_URL` siempre usa `?lang=es`, ignorando el locale de next-intl
2. **Doble fetch:** La página de detalle hace fetch de TODOS los posts para encontrar uno por ID
3. **"Leer más →" hardcodeado** en español en `CardOfPost.tsx`
4. **"Artículos anteriores" hardcodeado** en español en `PreviousPosts.tsx`
5. **No hay slug/URL amigable:** Los posts usan ID numérico de WordPress como URL (`/blog/61183`)
6. **No hay categorías reales:** El menú de categorías está en las traducciones pero no se usa para filtrar
7. **`dangerouslySetInnerHTML`:** Riesgo XSS con contenido HTML de WordPress (contenido confiable pero sin sanitizar)
8. **Sin SEO:** Las páginas son `"use client"` — sin metadata, sin SSR, sin `generateStaticParams`

---

## Plan: Sistema Híbrido

### Concepto

Mantener los blogs de WordPress Y agregar nuevos blogs escritos en Markdown (servidos desde NestJS backend o localmente). Ambos tipos se muestran en la misma página `/blog` con el mismo template.

### Fuentes de Datos

| Fuente | Identificador | Contenido | Idiomas |
|--------|--------------|-----------|---------|
| WordPress API | ID numérico (ej: `61183`) | HTML crudo | `?lang=es/en` (WPML) |
| MD/NestJS | Slug string (ej: `encrypted-sim-guide`) | Markdown → HTML | Carpetas por idioma |

### Tipo Unificado

```typescript
type UnifiedBlogPost = {
  id: string;                    // WP: "wp-61183", MD: "md-encrypted-sim-guide"
  slug: string;                  // WP: "61183", MD: "encrypted-sim-guide"
  source: "wordpress" | "markdown";
  title: string;
  description: string;
  image: string;
  imageFull?: string;
  author: string;
  date: string;                  // ISO 8601
  content: string;               // HTML (WP directo o MD convertido)
  locale: string;                // "es", "en", "fr"...
};
```

### Diferenciación de URLs

- WordPress: `/blog/61183` (mantener compatibilidad con IDs numéricos existentes)
- Markdown: `/blog/encrypted-sim-guide` (slugs descriptivos)
- Detección: Si `postId` es numérico → WordPress, si es string → Markdown

### Estructura de Blogs Markdown

```
content/
  blog/
    encrypted-sim-guide/
      meta.json          ← { slug, author, date, image, tags }
      es.md              ← Contenido en español
      en.md              ← Contenido en inglés
      fr.md              ← Contenido en francés
    post-quantum-security/
      meta.json
      es.md
      en.md
```

**meta.json:**
```json
{
  "slug": "encrypted-sim-guide",
  "author": "Equipo Encriptados",
  "date": "2025-07-15T12:00:00-05:00",
  "image": "/images/blog/encrypted-sim-guide.jpg",
  "imageFull": "/images/blog/encrypted-sim-guide-full.jpg",
  "tags": ["sim", "encryption", "privacy"]
}
```

### Flujo de Datos

```
BlogPage.tsx
  ├── fetchWordPressPosts(locale)  → UnifiedBlogPost[]
  ├── fetchMarkdownPosts(locale)   → UnifiedBlogPost[]
  └── merge + sort by date         → UnifiedBlogPost[]
       └── ListOfPosts.tsx         → CardOfPost.tsx (mismo template)

BlogDetailPage.tsx
  ├── isNumeric(postId)?
  │   └── fetchWordPressPost(postId, locale)  → UnifiedBlogPost
  └── else
      └── fetchMarkdownPost(slug, locale)     → UnifiedBlogPost
           └── ContentBlogById.tsx (mismo template, HTML sanitizado)
```

### Cambios Necesarios

1. **Crear `blogService.ts`** — Servicio unificado con funciones para ambas fuentes
2. **Pasar locale al fetch de WordPress** — `?lang=${locale}` en lugar de `?lang=es`
3. **Crear estructura `content/blog/`** — Para blogs Markdown
4. **Actualizar `BlogPage.tsx`** — Merge de ambas fuentes
5. **Actualizar `ContentBlogById.tsx`** — Detectar fuente por tipo de ID
6. **Internacionalizar textos hardcodeados** — "Leer más →", "Artículos anteriores"
7. **Sanitizar HTML** — Usar `DOMPurify` para contenido WordPress
