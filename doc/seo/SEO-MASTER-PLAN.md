# Plan Maestro de Mejora SEO — Encriptados Web (Next.js 14)

> **Fecha de auditoría:** 10 de febrero de 2026  
> **Proyecto:** Encriptados Web — Migración WordPress → Next.js  
> **Stack:** Next.js 14.2.29 | React 18 | next-intl | TypeScript | Tailwind CSS  
> **Dominio objetivo (actualizado):** https://www.encriptados.net (sitio actual) → https://www.encriptados.io (destino de migración)  
> **Idiomas:** es (default), en, fr, it, pt

---

## 1. RESUMEN EJECUTIVO

El sitio Next.js actual tiene **deficiencias SEO críticas** que, si se pone en producción sobre el dominio con tráfico consolidado de WordPress, causarán una **pérdida significativa de posicionamiento orgánico**. 

### Estado actual: ❌ No apto para producción SEO

| Categoría | Estado | Impacto |
|-----------|--------|---------|
| Favicon | ❌ No existe | Pérdida de brand trust en SERP y tabs |
| robots.txt | ❌ No existe | Google no sabe qué rastrear |
| Sitemap XML | ❌ No existe | Google no descubre páginas eficientemente |
| Metadata base | ❌ No existe | OG images con URLs rotas |
| Homepage metadata | ❌ No existe | Sin título ni descripción en Google |
| Metadata en 16+ páginas | ❌ No existe | Páginas invisibles para SEO |
| hreflang (5 idiomas) | ❌ No existe | Contenido duplicado cross-locale |
| JSON-LD / Structured Data | ❌ No existe | Sin rich snippets en Google |
| FAQ Schema | ❌ No existe | FAQ component existe pero sin markup |
| Página 404 personalizada | ❌ No existe | Mala UX en páginas no encontradas |
| Redirecciones WordPress | ❌ No existe | Pérdida total de tráfico indexado |
| Traducciones SEO en i18n | ❌ No existe | Metadata hardcoded en español |
| Web Manifest (PWA) | ❌ No existe | Sin señales PWA |

### Qué sí tiene (5 rutas con metadata):
- ✅ `/apps/[slug]` — generateMetadata con OG, Twitter, canonical
- ✅ `/our-products/[productId]` — generateMetadata dinámico desde API
- ✅ `/tim-sim` — generateMetadata con datos de producto
- ✅ `/router` — generateMetadata hardcoded
- ✅ `/sim/[slug]` — generateMetadata por slug

---

## 1.1 ADDENDUM OPERATIVO — MIGRACIÓN `.net` → `.io` (19 Feb 2026)

### Objetivo temporal
Mientras se ejecuta la migración de dominio, el sitio en `.net` debe quedar completamente fuera de indexación en Google.

### Implementación aplicada en código
- **Archivo modificado:** `src/middleware.ts`
- **Regla activa:** cuando el `Host` sea `encriptados.net` o cualquier subdominio (`*.encriptados.net`), se inyecta cabecera:

```http
X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
```

- **Comportamiento esperado:**
  - En `.net`: todo el contenido queda marcado como no indexable.
  - En `.io`: no se aplica esta cabecera (no afecta indexación del nuevo dominio).
  - En `localhost`: no se aplica (no afecta desarrollo local).

### Verificación recomendada en producción

1. Comprobar una URL pública en `.net`:

```bash
curl -I https://www.encriptados.net/es
```

Debe devolver el header `X-Robots-Tag` con `noindex`.

2. Comprobar una URL pública en `.io`:

```bash
curl -I https://www.encriptados.io/es
```

No debe devolver ese `X-Robots-Tag` temporal.

3. En Google Search Console (propiedad `.net`):
   - Usar **Inspección de URL** y confirmar que Google detecta `noindex`.
   - Usar **Retiradas** para ocultación temporal de URLs críticas mientras se desindexa.

### Checklist de transición SEO (orden sugerido)
- [ ] Deploy del cambio a producción de `.net`.
- [ ] Validación del header `X-Robots-Tag` en URLs principales (`/`, categorías, productos, blog).
- [ ] Envío de sitemap solo de `.io` (no enviar sitemap de `.net`).
- [ ] Solicitud de indexación de URLs estratégicas de `.io`.
- [ ] Monitoreo de cobertura/indexación durante 2-4 semanas.

### Retiro del modo migración
Cuando `.net` deje de ser canónico:
- mantener 301 hacia `.io` donde aplique,
- y eliminar esta regla temporal `noindex` por host desde `middleware.ts` para evitar confusión futura.

---

## 2. VENTAJAS DE NEXT.JS PARA SEO (QUE DEBEMOS APROVECHAR)

Next.js 14 App Router ofrece funcionalidades nativas de SEO que este proyecto **no está usando**:

### 2.1 Metadata API (Nativa)
```
✅ export const metadata: Metadata = { ... }          // Estático
✅ export async function generateMetadata() { ... }    // Dinámico
✅ metadataBase                                        // Base URL para OG images
✅ metadata.alternates.languages                       // hreflang automático
✅ Template de títulos: { template: "%s | Encriptados" }
```

### 2.2 Archivos de Convención SEO (Nativos)
```
✅ app/robots.ts          → Genera robots.txt dinámico
✅ app/sitemap.ts         → Genera sitemap.xml dinámico
✅ app/favicon.ico        → Favicon automático
✅ app/icon.png           → App icon
✅ app/apple-icon.png     → Apple touch icon
✅ app/manifest.ts        → Web manifest dinámico
✅ app/opengraph-image.png → OG image por defecto
✅ [route]/opengraph-image.tsx → OG images dinámicas por ruta
```

### 2.3 Server Components para SEO
```
✅ Renderizado en servidor por defecto (contenido visible para crawlers)
✅ generateStaticParams() para pre-render de rutas dinámicas
✅ Streaming con Suspense (no bloquea indexación)
```

### 2.4 Structured Data (Manual pero potente)
```
✅ <script type="application/ld+json"> en Server Components
✅ Se puede inyectar en cualquier layout o page
✅ No necesita librerías externas
```

### 2.5 Redirecciones y Rewrites (Nativas)
```
✅ next.config.mjs → redirects() para migración WordPress
✅ middleware.ts → Catch-all inteligente
✅ not-found.tsx → 404 personalizado con SEO
```

---

## 3. ARQUITECTURA SEO PROPUESTA

```
src/app/
├── favicon.ico                    ← ⭐ CREAR
├── icon.png                       ← ⭐ CREAR (192x192)
├── apple-icon.png                 ← ⭐ CREAR (180x180)
├── robots.ts                      ← ⭐ CREAR
├── sitemap.ts                     ← ⭐ CREAR
├── manifest.ts                    ← ⭐ CREAR
├── layout.tsx                     ← ⭐ MODIFICAR (metadataBase + metadata global)
├── not-found.tsx                  ← ⭐ CREAR
├── [locale]/
│   ├── layout.tsx                 ← ⭐ MODIFICAR (metadata template + hreflang)
│   ├── page.tsx                   ← ⭐ MODIFICAR (metadata homepage)
│   ├── not-found.tsx              ← ⭐ CREAR
│   ├── about-us/page.tsx          ← ⭐ MODIFICAR (añadir metadata)
│   ├── offers/page.tsx            ← ⭐ MODIFICAR (añadir metadata)
│   ├── blog/page.tsx              ← ⭐ MODIFICAR (añadir metadata)
│   ├── blog/[postId]/page.tsx     ← ⭐ MODIFICAR (añadir metadata dinámica)
│   ├── encrypted-sim/page.tsx     ← ⭐ REFACTORIZAR (server component + metadata)
│   ├── ira-sim/layout.tsx         ← ⭐ MODIFICAR (añadir metadata)
│   ├── distributors/page.tsx      ← ⭐ MODIFICAR (añadir metadata)
│   ├── where-to-find-us/page.tsx  ← ⭐ MODIFICAR (añadir metadata)
│   ├── encrypted-test/page.tsx    ← ⭐ MODIFICAR (añadir metadata)
│   └── ...demás páginas
│
src/shared/
│   ├── components/
│   │   ├── JsonLd/                ← ⭐ CREAR (componentes reutilizables)
│   │   │   ├── OrganizationJsonLd.tsx
│   │   │   ├── ProductJsonLd.tsx
│   │   │   ├── FAQJsonLd.tsx
│   │   │   ├── BreadcrumbJsonLd.tsx
│   │   │   └── WebSiteJsonLd.tsx
│   │   └── FAQ/
│   │       └── FAQSection.tsx     ← ⭐ MODIFICAR (inyectar FAQJsonLd)
│   └── seo/                       ← ⭐ CREAR
│       ├── metadata.ts            (helpers para generar metadata)
│       ├── structured-data.ts     (helpers para JSON-LD)
│       └── constants.ts           (constantes SEO: site name, base URL, etc.)
│
messages/
├── es.json                        ← ⭐ MODIFICAR (añadir sección "seo")
├── en.json                        ← ⭐ MODIFICAR
├── fr.json                        ← ⭐ MODIFICAR
├── it.json                        ← ⭐ MODIFICAR
└── pt.json                        ← ⭐ MODIFICAR

next.config.mjs                    ← ⭐ MODIFICAR (redirecciones WordPress)
middleware.ts                      ← ⭐ MODIFICAR (catch-all WordPress URLs)
```

---

## 4. INVENTARIO DE PÁGINAS Y ESTADO DE METADATA

### Páginas públicas que necesitan SEO:

| Ruta | Tiene Metadata | Acción | Prioridad |
|------|:-:|--------|:-:|
| `/` (homepage) | ❌ | Crear generateMetadata | P0 |
| `/about-us` | ❌ | Crear metadata estática | P1 |
| `/offers` | ❌ | Crear metadata estática | P1 |
| `/blog` | ❌ | Crear metadata estática | P1 |
| `/blog/[postId]` | ❌ | Crear generateMetadata dinámico | P1 |
| `/encrypted-sim` | ❌ (client component) | Refactorizar + metadata | P1 |
| `/ira-sim` | ❌ | Crear generateMetadata | P1 |
| `/distributors` | ❌ | Crear metadata estática | P1 |
| `/encrypted-phones-distributors` | ❌ | Crear metadata estática | P2 |
| `/where-to-find-us` | ❌ | Crear metadata estática | P2 |
| `/where-to-find-encrypted` | ❌ | Crear metadata estática | P2 |
| `/encrypted-test` | ❌ | Crear metadata estática | P2 |
| `/encrypted-test/[typeOfTest]` | ❌ | Crear generateMetadata | P2 |
| `/news` | ❌ | Crear metadata estática | P2 |
| `/ambassadors` | ❌ | Crear metadata estática | P2 |
| `/become-encrypted-partner` | ❌ | Crear metadata estática | P2 |
| `/fast-delivery` | ❌ | Crear metadata estática | P3 |
| `/deliveries` | ❌ | Crear metadata estática | P3 |
| `/identity-verification` | ❌ | Crear metadata estática | P3 |
| `/security-test` | ❌ | Crear metadata estática | P3 |
| `/terms-app` | ❌ | Crear metadata estática | P3 |
| `/apps/[slug]` | ✅ | Revisar y mejorar | P2 |
| `/our-products/[productId]` | ✅ | Revisar y mejorar | P2 |
| `/tim-sim` | ✅ | Revisar y mejorar | P2 |
| `/router` | ✅ | i18n de metadata | P2 |
| `/sim/[slug]` | ✅ | Revisar y mejorar | P2 |

### Páginas protegidas (dashboard) — NO necesitan SEO:
- `/dashboard/*` — Detrás de auth, no indexar

---

## 5. PLAN DE TAREAS

### FASE 0: Infraestructura SEO Base (Crítica — Antes de producción)
**Tiempo estimado: 3-4 horas de implementación**

| ID | Tarea | Archivo(s) | Tiempo | Dependencias |
|:--:|-------|-----------|:------:|:---:|
| T-001 | Crear constantes SEO globales | `src/shared/seo/constants.ts` | 15min | — |
| T-002 | Crear helpers de metadata | `src/shared/seo/metadata.ts` | 30min | T-001 |
| T-003 | Añadir metadataBase + metadata global en root layout | `src/app/layout.tsx` | 20min | T-001 |
| T-004 | Crear robots.ts | `src/app/robots.ts` | 15min | T-001 |
| T-005 | Crear sitemap.ts dinámico | `src/app/sitemap.ts` | 45min | T-001 |
| T-006 | Crear favicon.ico + icon.png + apple-icon.png | `src/app/` | 15min | Asset del cliente |
| T-007 | Crear manifest.ts | `src/app/manifest.ts` | 15min | T-001 |
| T-008 | Crear not-found.tsx (global + locale) | `src/app/not-found.tsx`, `src/app/[locale]/not-found.tsx` | 30min | — |
| T-009 | Añadir sección "seo" a archivos de mensajes i18n | `messages/*.json` | 45min | — |

### FASE 1: Metadata Global y Homepage (Alta prioridad)
**Tiempo estimado: 2-3 horas**

| ID | Tarea | Archivo(s) | Tiempo | Dependencias |
|:--:|-------|-----------|:------:|:---:|
| T-010 | Metadata template + hreflang en locale layout | `src/app/[locale]/layout.tsx` | 30min | T-003, T-009 |
| T-011 | Metadata para homepage | `src/app/[locale]/page.tsx` | 20min | T-010, T-009 |
| T-012 | JSON-LD Organization schema (global) | `src/shared/components/JsonLd/OrganizationJsonLd.tsx` | 20min | — |
| T-013 | JSON-LD WebSite schema con SearchAction | `src/shared/components/JsonLd/WebSiteJsonLd.tsx` | 20min | — |
| T-014 | Inyectar JSON-LD global en locale layout | `src/app/[locale]/layout.tsx` | 10min | T-012, T-013 |
| T-015 | JSON-LD BreadcrumbList component | `src/shared/components/JsonLd/BreadcrumbJsonLd.tsx` | 20min | — |

### FASE 2: Metadata para Páginas Estáticas (Prioridad media-alta)
**Tiempo estimado: 3-4 horas**

| ID | Tarea | Archivo(s) | Tiempo | Dependencias |
|:--:|-------|-----------|:------:|:---:|
| T-016 | Metadata para /about-us | `src/app/[locale]/about-us/page.tsx` | 15min | T-009, T-002 |
| T-017 | Metadata para /offers | `src/app/[locale]/offers/page.tsx` | 15min | T-009, T-002 |
| T-018 | Metadata para /blog | `src/app/[locale]/blog/page.tsx` | 15min | T-009, T-002 |
| T-019 | Metadata para /blog/[postId] (dinámica) | `src/app/[locale]/blog/[postId]/page.tsx` | 30min | T-009, T-002 |
| T-020 | Metadata para /encrypted-sim | `src/app/[locale]/encrypted-sim/page.tsx` | 20min | T-009 |
| T-021 | Metadata para /ira-sim | `src/app/[locale]/ira-sim/layout.tsx` | 20min | T-009, T-002 |
| T-022 | Metadata para /distributors | `src/app/[locale]/distributors/page.tsx` | 15min | T-009 |
| T-023 | Metadata para /where-to-find-us | `src/app/[locale]/where-to-find-us/page.tsx` | 15min | T-009 |
| T-024 | Metadata para /where-to-find-encrypted | `src/app/[locale]/where-to-find-encrypted/page.tsx` | 15min | T-009 |
| T-025 | Metadata para /encrypted-test | `src/app/[locale]/encrypted-test/page.tsx` | 15min | T-009 |
| T-026 | Metadata para /encrypted-test/[typeOfTest] | `src/app/[locale]/encrypted-test/[typeOfTest]/page.tsx` | 20min | T-009 |
| T-027 | Metadata para /news | `src/app/[locale]/news/page.tsx` | 15min | T-009 |
| T-028 | Metadata para /ambassadors | `src/app/[locale]/ambassadors/page.tsx` | 15min | T-009 |
| T-029 | Metadata para /become-encrypted-partner | `src/app/[locale]/become-an-encrypted-partner/page.tsx` | 15min | T-009 |
| T-030 | Metadata para /fast-delivery | Según ruta existente | 15min | T-009 |
| T-031 | Metadata para /deliveries | Según ruta existente | 15min | T-009 |
| T-032 | Metadata para /security-test | `src/app/[locale]/security-test/page.tsx` | 15min | T-009 |

### FASE 3: Structured Data (JSON-LD) 
**Tiempo estimado: 3-4 horas**

| ID | Tarea | Archivo(s) | Tiempo | Dependencias |
|:--:|-------|-----------|:------:|:---:|
| T-033 | JSON-LD Product schema component | `src/shared/components/JsonLd/ProductJsonLd.tsx` | 30min | — |
| T-034 | JSON-LD FAQ schema component | `src/shared/components/JsonLd/FAQJsonLd.tsx` | 20min | — |
| T-035 | Integrar FAQJsonLd en FAQSection | `src/shared/components/FAQ/FAQSection.tsx` | 20min | T-034 |
| T-036 | Inyectar ProductJsonLd en /apps/[slug] | Layout o page correspondiente | 20min | T-033 |
| T-037 | Inyectar ProductJsonLd en /our-products/[productId] | Layout o page correspondiente | 20min | T-033 |
| T-038 | Inyectar ProductJsonLd en /tim-sim | Layout correspondiente | 15min | T-033 |
| T-039 | Inyectar ProductJsonLd en /sim/[slug] | Layout correspondiente | 15min | T-033 |
| T-040 | Inyectar ProductJsonLd en /router | Layout correspondiente | 15min | T-033 |
| T-041 | JSON-LD Article schema para blog posts | `src/shared/components/JsonLd/ArticleJsonLd.tsx` | 20min | — |
| T-042 | Inyectar ArticleJsonLd en /blog/[postId] | Page correspondiente | 15min | T-041 |

### FASE 4: Mejora de Metadata Existente
**Tiempo estimado: 2-3 horas**

| ID | Tarea | Archivo(s) | Tiempo | Dependencias |
|:--:|-------|-----------|:------:|:---:|
| T-043 | Internacionalizar metadata de /apps/[slug] | layout.tsx | 30min | T-009 |
| T-044 | Internacionalizar metadata de /router | layout.tsx | 20min | T-009 |
| T-045 | Internacionalizar metadata de /sim/[slug] | layout.tsx | 20min | T-009 |
| T-046 | Resolver metadata duplicada en apps/[slug] | layout.tsx vs page.tsx | 20min | — |
| T-047 | Añadir hreflang alternates a todas las metadata | Todos los generateMetadata | 45min | T-002 |
| T-048 | Revisar layouts "use client" que impiden metadata | our-products/layout.tsx, etc. | 30min | — |

### FASE 5: Migración WordPress — Redirecciones
**Tiempo estimado: 2-4 horas (depende de cantidad de URLs)**

| ID | Tarea | Archivo(s) | Tiempo | Dependencias |
|:--:|-------|-----------|:------:|:---:|
| T-049 | Obtener lista de URLs indexadas de WordPress | Externo (Google Search Console / Sitemap) | 1h | Acceso a WP |
| T-050 | Mapear URLs WordPress → URLs Next.js | Documento de mapeo | 1h | T-049 |
| T-051 | Implementar redirecciones 301 en next.config.mjs | `next.config.mjs` | 45min | T-050 |
| T-052 | Implementar catch-all en middleware | `src/middleware.ts` | 30min | — |
| T-053 | Verificar que no hay 404 en URLs importantes | Script de validación | 30min | T-051 |

### FASE 6: Optimización Avanzada (Post-lanzamiento)
**Tiempo estimado: 3-4 horas**

| ID | Tarea | Archivo(s) | Tiempo | Dependencias |
|:--:|-------|-----------|:------:|:---:|
| T-054 | Implementar generateStaticParams para rutas dinámicas | Páginas dinámicas | 45min | — |
| T-055 | Optimizar images con next/image (habilitar optimización) | next.config.mjs + componentes | 1h | — |
| T-056 | Implementar OpenGraph images dinámicas con ImageResponse | `app/[locale]/opengraph-image.tsx` | 1h | — |
| T-057 | Configurar headers de caché SEO-friendly | next.config.mjs | 30min | — |
| T-058 | Implementar canonical URLs automáticas | Helper en metadata.ts | 30min | T-002 |
| T-059 | Auditar Core Web Vitals y optimizar | Lighthouse | Ongoing | — |

---

## 6. PRIORIZACIÓN PARA LANZAMIENTO

### ⛔ BLOQUEANTES (Hacer ANTES de poner en producción):
- T-001 a T-008 (Infraestructura SEO base)
- T-010, T-011 (Metadata global + homepage)
- T-051, T-052 (Redirecciones WordPress)

### ⚠️ ALTA PRIORIDAD (Primera semana post-lanzamiento):
- T-009 (Traducciones SEO)
- T-012 a T-015 (JSON-LD global)
- T-016 a T-023 (Metadata páginas principales)

### 📋 MEDIA PRIORIDAD (Primeras 2-3 semanas):
- T-024 a T-032 (Metadata páginas secundarias)
- T-033 a T-042 (Structured data productos y FAQ)
- T-043 a T-048 (Mejorar metadata existente)

### 🔄 CONTINUA (Post-lanzamiento):
- T-054 a T-059 (Optimización avanzada)

---

## 7. MÉTRICAS DE ÉXITO

| Métrica | Estado Actual | Objetivo |
|---------|:---:|:---:|
| Páginas con metadata completa | 5/25+ | 25/25+ |
| Sitemap XML | No existe | Todas las páginas públicas |
| robots.txt | No existe | Configurado correctamente |
| JSON-LD schemas | 0 | Organization, Product, FAQ, Article, BreadcrumbList, WebSite |
| hreflang | 0 idiomas | 5 idiomas en todas las páginas |
| Favicon | No existe | .ico + .png + apple-icon |
| Core Web Vitals | No medido | Verde en PageSpeed Insights |
| Errores 404 post-migración | N/A | < 1% de URLs indexadas |
| Rich snippets en Google | 0 | FAQ, Product, Organization |

---

## 8. NOTAS TÉCNICAS

### Patrón de metadata recomendado para este proyecto:

```typescript
// En layout.tsx (Server Component)
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SEO_CONSTANTS } from "@/shared/seo/constants";
import { buildAlternates } from "@/shared/seo/metadata";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "seo.pageName" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SEO_CONSTANTS.baseUrl}/${locale}/page-path`,
      siteName: SEO_CONSTANTS.siteName,
      images: [{ url: `${SEO_CONSTANTS.baseUrl}/meta-image/page.png`, width: 1200, height: 630 }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: buildAlternates("/page-path", locale),
  };
}
```

### Patrón JSON-LD recomendado:

```typescript
// Server Component
export default function JsonLdComponent({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### Variables de entorno requeridas:
```
NEXT_PUBLIC_SITE_URL=https://www.encriptados.io   # URL del dominio final
```
