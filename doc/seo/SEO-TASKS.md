# SEO — Tareas de Implementación para Producción

> **Proyecto:** Encriptados Web (Next.js 14)  
> **Objetivo:** Poner el sitio en producción con SEO completo sin perder tráfico de WordPress  
> **Tiempo total estimado:** ~23h (con IA: ~12-15h)  
> **Última actualización:** 10 de febrero de 2026

---

## Progreso General

```
Fase 0 — Infraestructura Base      [░░░░░░░░░░]  0/9   ⛔ BLOQUEANTE
Fase 1 — Metadata Global           [░░░░░░░░░░]  0/6   ⛔ BLOQUEANTE
Fase 2 — Metadata por Página       [░░░░░░░░░░]  0/17
Fase 3 — Structured Data JSON-LD   [░░░░░░░░░░]  0/10
Fase 4 — Mejora Metadata Existente [░░░░░░░░░░]  0/6
Fase 5 — Redirecciones WordPress   [░░░░░░░░░░]  0/5   ⛔ BLOQUEANTE
Fase 6 — Optimización Avanzada     [░░░░░░░░░░]  0/6
─────────────────────────────────────────────────
TOTAL                                             0/59
```

---

## Instrucciones para la IA

Antes de implementar cualquier tarea de este archivo:
1. Leer `doc/seo/SEO-AI-IMPLEMENTATION-GUIDE.md` para obtener el contexto técnico detallado
2. Leer `doc/seo/SEO-MASTER-PLAN.md` para entender la arquitectura SEO propuesta
3. Buscar la tarea por su ID (ej: T-001) en la guía de implementación — ahí están los detalles de código

**Prompt recomendado:**
> "Lee doc/seo/SEO-AI-IMPLEMENTATION-GUIDE.md e implementa T-XXX"

---

## FASE 0 — Infraestructura SEO Base

> ⛔ **BLOQUEANTE** — Nada funciona sin esto. Hacer ANTES de producción.  
> ⏱️ Estimado: **3.5 horas**

| # | ID | Tarea | Archivo | Tiempo | Dep. | Estado |
|:-:|:--:|-------|---------|:------:|:----:|:------:|
| 1 | T-001 | Constantes SEO globales (baseUrl, siteName, locales) | `src/shared/seo/constants.ts` | 15min | — | ⬜ |
| 2 | T-002 | Helpers de metadata (buildAlternates, buildOgImage, buildPageMetadata) | `src/shared/seo/metadata.ts` | 30min | T-001 | ⬜ |
| 3 | T-003 | metadataBase + title template + icons en root layout | `src/app/layout.tsx` | 20min | T-001 | ⬜ |
| 4 | T-004 | robots.ts (disallow dashboard, api, test) | `src/app/robots.ts` | 15min | T-001 | ⬜ |
| 5 | T-005 | sitemap.ts dinámico (todas rutas públicas × 5 idiomas) | `src/app/sitemap.ts` | 45min | T-001 | ⬜ |
| 6 | T-006 | Favicon .ico + icon.png + apple-icon.png | `src/app/` | 15min | Asset | ⬜ |
| 7 | T-007 | Web manifest (PWA) | `src/app/manifest.ts` | 15min | T-001 | ⬜ |
| 8 | T-008 | Página 404 personalizada (global + locale) | `src/app/not-found.tsx` + `src/app/[locale]/not-found.tsx` | 30min | — | ⬜ |
| 9 | T-009 | Traducciones SEO en messages/ (5 idiomas × 17+ páginas) | `messages/*.json` | 45min | — | ⬜ |

---

## FASE 1 — Metadata Global y Homepage

> ⛔ **BLOQUEANTE** — Homepage y layout sin meta = invisible en Google.  
> ⏱️ Estimado: **2 horas**  
> 📌 Requiere: Fase 0 completada

| # | ID | Tarea | Archivo | Tiempo | Dep. | Estado |
|:-:|:--:|-------|---------|:------:|:----:|:------:|
| 10 | T-010 | generateMetadata con title.template + hreflang en locale layout | `src/app/[locale]/layout.tsx` | 30min | T-003, T-009 | ⬜ |
| 11 | T-011 | Metadata completa para homepage (title, desc, OG, Twitter) | `src/app/[locale]/page.tsx` | 20min | T-010 | ⬜ |
| 12 | T-012 | Componente OrganizationJsonLd | `src/shared/components/JsonLd/OrganizationJsonLd.tsx` | 20min | — | ⬜ |
| 13 | T-013 | Componente WebSiteJsonLd (con SearchAction) | `src/shared/components/JsonLd/WebSiteJsonLd.tsx` | 20min | — | ⬜ |
| 14 | T-014 | Inyectar JSON-LD Organization + WebSite en locale layout | `src/app/[locale]/layout.tsx` | 10min | T-012, T-013 | ⬜ |
| 15 | T-015 | Componente BreadcrumbJsonLd | `src/shared/components/JsonLd/BreadcrumbJsonLd.tsx` | 20min | — | ⬜ |

---

## FASE 2 — Metadata para Cada Página

> 📋 Primera semana post-lanzamiento idealmente.  
> ⏱️ Estimado: **4 horas**  
> 📌 Requiere: T-002, T-009

| # | ID | Tarea | Archivo | Tiempo | Dep. | Estado |
|:-:|:--:|-------|---------|:------:|:----:|:------:|
| 16 | T-016 | Metadata `/about-us` | `src/app/[locale]/about-us/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 17 | T-017 | Metadata `/offers` | `src/app/[locale]/offers/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 18 | T-018 | Metadata `/blog` | `src/app/[locale]/blog/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 19 | T-019 | Metadata `/blog/[postId]` (dinámica desde API) | `src/app/[locale]/blog/[postId]/page.tsx` | 30min | T-002, T-009 | ⬜ |
| 20 | T-020 | Metadata `/encrypted-sim` (⚠️ es "use client") | `src/app/[locale]/encrypted-sim/` | 20min | T-002, T-009 | ⬜ |
| 21 | T-021 | Metadata `/ira-sim` | `src/app/[locale]/ira-sim/layout.tsx` | 20min | T-002, T-009 | ⬜ |
| 22 | T-022 | Metadata `/distributors` | `src/app/[locale]/distributors/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 23 | T-023 | Metadata `/where-to-find-us` | `src/app/[locale]/where-to-find-us/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 24 | T-024 | Metadata `/where-to-find-encrypted` | `src/app/[locale]/where-to-find-encrypted/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 25 | T-025 | Metadata `/encrypted-test` | `src/app/[locale]/encrypted-test/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 26 | T-026 | Metadata `/encrypted-test/[typeOfTest]` (dinámica) | `src/app/[locale]/encrypted-test/[typeOfTest]/` | 20min | T-002, T-009 | ⬜ |
| 27 | T-027 | Metadata `/news` | `src/app/[locale]/news/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 28 | T-028 | Metadata `/ambassadors` | `src/app/[locale]/ambassadors/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 29 | T-029 | Metadata `/become-encrypted-partner` | `src/app/[locale]/become-an-encrypted-partner/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 30 | T-030 | Metadata `/fast-delivery` | `src/app/[locale]/fast-delivery/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 31 | T-031 | Metadata `/deliveries` | `src/app/[locale]/deliveries/page.tsx` | 15min | T-002, T-009 | ⬜ |
| 32 | T-032 | Metadata `/security-test` | `src/app/[locale]/security-test/page.tsx` | 15min | T-002, T-009 | ⬜ |

---

## FASE 3 — Structured Data (JSON-LD)

> 📋 Rich snippets en Google (FAQs, Products, Articles).  
> ⏱️ Estimado: **3 horas**

| # | ID | Tarea | Archivo | Tiempo | Dep. | Estado |
|:-:|:--:|-------|---------|:------:|:----:|:------:|
| 33 | T-033 | Componente ProductJsonLd | `src/shared/components/JsonLd/ProductJsonLd.tsx` | 30min | — | ⬜ |
| 34 | T-034 | Componente FAQJsonLd | `src/shared/components/JsonLd/FAQJsonLd.tsx` | 20min | — | ⬜ |
| 35 | T-035 | Integrar FAQJsonLd en FAQSection existente | `src/shared/components/FAQ/FAQSection.tsx` | 20min | T-034 | ⬜ |
| 36 | T-036 | ProductJsonLd en `/apps/[slug]` | Layout/page de apps | 20min | T-033 | ⬜ |
| 37 | T-037 | ProductJsonLd en `/our-products/[productId]` | Layout/page de products | 20min | T-033 | ⬜ |
| 38 | T-038 | ProductJsonLd en `/tim-sim` | Layout tim-sim | 15min | T-033 | ⬜ |
| 39 | T-039 | ProductJsonLd en `/sim/[slug]` | Layout sim | 15min | T-033 | ⬜ |
| 40 | T-040 | ProductJsonLd en `/router` | Layout router | 15min | T-033 | ⬜ |
| 41 | T-041 | Componente ArticleJsonLd | `src/shared/components/JsonLd/ArticleJsonLd.tsx` | 20min | — | ⬜ |
| 42 | T-042 | ArticleJsonLd en `/blog/[postId]` | Page blog post | 15min | T-041 | ⬜ |

---

## FASE 4 — Mejorar Metadata que ya Existe

> 📋 Lo que ya tiene metadata está incompleto o hardcoded.  
> ⏱️ Estimado: **2.5 horas**

| # | ID | Tarea | Archivo | Tiempo | Dep. | Estado |
|:-:|:--:|-------|---------|:------:|:----:|:------:|
| 43 | T-043 | Internacionalizar metadata de `/apps/[slug]` (ahora hardcoded "¡Compra ahora!") | `src/app/[locale]/apps/[slug]/layout.tsx` | 30min | T-009 | ⬜ |
| 44 | T-044 | Internacionalizar metadata de `/router` (hardcoded español) | `src/app/[locale]/router/layout.tsx` | 20min | T-009 | ⬜ |
| 45 | T-045 | Internacionalizar metadata de `/sim/[slug]` | `src/app/[locale]/sim/[slug]/layout.tsx` | 20min | T-009 | ⬜ |
| 46 | T-046 | Resolver metadata DUPLICADA en apps/[slug] (layout + page) | `apps/[slug]/layout.tsx` vs `page.tsx` | 20min | — | ⬜ |
| 47 | T-047 | Añadir hreflang alternates a TODA metadata existente | Todos los generateMetadata | 45min | T-002 | ⬜ |
| 48 | T-048 | Resolver layouts "use client" que bloquean metadata | `our-products/layout.tsx`, `[productId]/layout.tsx` | 30min | — | ⬜ |

---

## FASE 5 — Redirecciones WordPress (No Perder Tráfico)

> ⛔ **BLOQUEANTE** — Sin esto se pierde todo el tráfico orgánico al migrar.  
> ⏱️ Estimado: **4 horas**  
> ⚠️ Requiere: Acceso a Google Search Console o sitemap.xml de WordPress

| # | ID | Tarea | Archivo | Tiempo | Dep. | Estado |
|:-:|:--:|-------|---------|:------:|:----:|:------:|
| 49 | T-049 | Exportar lista de URLs indexadas de WordPress | Externo (GSC / sitemap.xml / Screaming Frog) | 1h | Acceso WP | ⬜ |
| 50 | T-050 | Crear mapeo: URL WordPress → URL Next.js | `doc/seo/wordpress-url-mapping.md` | 1h | T-049 | ⬜ |
| 51 | T-051 | Implementar redirecciones 301 en next.config.mjs | `next.config.mjs` | 45min | T-050 | ⬜ |
| 52 | T-052 | Catch-all en middleware: URLs no mapeadas → homepage | `src/middleware.ts` | 30min | — | ⬜ |
| 53 | T-053 | Validar con script que 0 URLs importantes den 404 | `scripts/validate-redirects.js` | 30min | T-051 | ⬜ |

---

## FASE 6 — Optimización Avanzada (Post-Lanzamiento)

> 🔄 Mejoras continuas después de estar en producción.  
> ⏱️ Estimado: **4 horas**

| # | ID | Tarea | Archivo | Tiempo | Dep. | Estado |
|:-:|:--:|-------|---------|:------:|:----:|:------:|
| 54 | T-054 | generateStaticParams para pre-render de rutas dinámicas | Páginas dinámicas | 45min | — | ⬜ |
| 55 | T-055 | Habilitar optimización de imágenes Next.js | `next.config.mjs` | 1h | — | ⬜ |
| 56 | T-056 | OpenGraph images dinámicas con ImageResponse | `app/[locale]/opengraph-image.tsx` | 1h | — | ⬜ |
| 57 | T-057 | Headers de caché SEO-friendly | `next.config.mjs` | 30min | — | ⬜ |
| 58 | T-058 | Canonical URLs automáticas en todas las páginas | `src/shared/seo/metadata.ts` | 30min | T-002 | ⬜ |
| 59 | T-059 | Auditoría Core Web Vitals + optimización | Lighthouse / PageSpeed | Continuo | — | ⬜ |

---

## Orden de Ejecución Recomendado

```
ANTES DE PRODUCCIÓN (obligatorio):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
T-001 → T-002 → T-003           Infraestructura base
T-004 → T-005                   robots.txt + sitemap.xml
T-006 → T-007                   Favicon + manifest
T-008                           Página 404
T-009                           Traducciones SEO i18n
T-010 → T-011                   Metadata global + homepage
T-012 → T-013 → T-014           JSON-LD global
T-049 → T-050 → T-051 → T-052   Redirecciones WordPress

PRIMERA SEMANA POST-LANZAMIENTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
T-016 a T-032                   Metadata de cada página
T-015                           BreadcrumbJsonLd
T-046 → T-048                   Fixes de metadata existente

SEMANAS 2-3:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
T-033 → T-034                   Componentes Product + FAQ JSON-LD
T-035 a T-042                   Inyectar JSON-LD en páginas
T-043 a T-045 → T-047           i18n de metadata existente
T-053                           Validar redirecciones

CONTINUO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
T-054 a T-059                   Optimización avanzada
```

---

## Leyenda

| Símbolo | Significado |
|:-------:|-------------|
| ⬜ | No iniciada |
| 🔄 | En progreso |
| ✅ | Completada |
| ⛔ | Bloqueada |

**Al completar una tarea:** cambiar ⬜ por ✅ y actualizar la barra de progreso arriba.

---

## Documentación de referencia

| Archivo | Contenido |
|---------|-----------|
| `doc/seo/SEO-MASTER-PLAN.md` | Auditoría completa, estado actual, arquitectura, métricas de éxito |
| `doc/seo/SEO-AI-IMPLEMENTATION-GUIDE.md` | Contexto técnico detallado por tarea, código, patrones, reglas |
