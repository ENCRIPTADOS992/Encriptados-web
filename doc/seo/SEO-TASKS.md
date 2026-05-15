# SEO - Backlog de Produccion Encriptados

> Proyecto: Encriptados Web (`Encriptados-frontend`)  
> Framework: Next.js 15.5.18 + App Router + next-intl 4.12.0  
> Ultima actualizacion: 15 de mayo de 2026  
> Objetivo: migrar `encriptados.io` a Next.js sin perder trafico organico de WordPress y sin romper las rutas actuales de productos. La prioridad principal es Google, pero la implementacion debe ser indexable y legible tambien para Bing, navegadores, previews sociales y crawlers usados por buscadores con IA.

---

## Estado Actual Verificado

| Area | Estado | Notas |
|---|---|---|
| Build produccion | Completado | `pnpm run build` pasa localmente despues de envolver el home raiz en `Suspense`. |
| Home canonico | Parcialmente completado | `/` renderiza home en espanol; `/es` y `/es/` redirigen a `/`; paginas internas ES conservan `/es/...`. |
| Blogs legacy WordPress | Completado fase inicial | `/blogs/noticias/{slug}/` y `/{locale}/blogs/{category}/{slug}/` responden 200 desde Next leyendo WordPress. |
| WordPress como backend blog | Completado fase inicial | `/api/wp-blog` soporta busqueda por `slug`; `/api/app-blog` entrega `legacyPath`. |
| Productos actuales | Respetado | No se deben modificar rutas ni comportamiento de productos actuales; solo redirecciones legacy hacia rutas vigentes. |
| Noindex por host staging | Completado fase inicial | Mientras la web actual viva en `www.encriptados.net`, ese host y subdominios `.net` deben llevar `X-Robots-Tag: noindex`. `encriptados.io` queda sin noindex y sera el destino indexable cuando termine la migracion. |
| Metadata global | Completado fase inicial | Existe `metadataBase`, title template, canonicals globales, normalizacion a `https://www.encriptados.net` y OG/Twitter por defecto desde helpers SEO. |
| robots/sitemap | Completado fase inicial | Existen `src/app/robots.ts`, `src/app/sitemap.ts` y `src/app/manifest.ts`; sitemap genera paginas estaticas, blogs legacy y productos publicos desde inventario/API con revalidate; falta validacion post-deploy en Search Console/Bing. |
| JSON-LD | Parcial avanzado | Organization, WebSite, Breadcrumb, Article, Product y FAQPage implementados en rutas principales; falta auditoria Rich Results completa. |
| Location pages | Pendiente critico | Hay miles de URLs `/location/*`; falta ruta dinamica o redirecciones fallback. |

---

## Reglas SEO Base del Proyecto

1. La URL canonica del home en espanol es `/`, no `/es`.
2. Solo el home espanol vive sin locale. Las demas paginas en espanol conservan `/es/...`.
3. Las URLs historicas del blog de WordPress se conservan como 200, no como redirecciones.
4. Las URLs actuales de productos en Next.js no se recrean ni se renombran.
5. Las URLs antiguas de productos/apps se redirigen con 301/308 a rutas actuales.
6. `encriptados.io` no debe tener `noindex`; es el dominio canonico preparado para la migracion final.
7. `www.encriptados.net`, `encriptados.net` y subdominios `.net` deben mantener `X-Robots-Tag: noindex` mientras sean entorno temporal, staging o espejo.
8. Toda pagina indexable debe tener canonical absoluto, title unico, description util y OG/Twitter.
9. Toda pagina con versiones por idioma debe tener hreflang entre `es`, `en`, `fr`, `it`, `pt` y `x-default` cuando aplique.
10. En App Router, cualquier componente que use `useSearchParams()` durante prerender debe estar bajo `Suspense`.
11. El contenido principal debe estar disponible en HTML inicial o render server/prerender, no depender exclusivamente de interacciones cliente.
12. No bloquear crawlers utiles por defecto. Si se restringen bots de IA o crawlers especificos, debe ser una decision de negocio explicita, no accidental.
13. Las previews de navegadores, mensajeria y redes deben funcionar con Open Graph, Twitter Cards e imagenes absolutas.

---

## Que Significa "SEO Completo" en Este Proyecto

Estas tareas no se consideran terminadas hasta que el sitio tenga una capa SEO automatizada y mantenible. El objetivo no es agregar tags manuales sueltos, sino que cada ruta publica pueda generar su metadata desde una fuente consistente.

| Elemento | Requisito para Encriptados | Estado actual |
|---|---|---|
| Sitemap automatico | `src/app/sitemap.ts` debe generar URLs canonicas para home, paginas estaticas, productos publicos, SIM/router/apps y blogs WordPress legacy. Debe servir a Google, Bing y otros crawlers estandar. | Completado fase inicial: incluye inventario publico desde backend/store con `revalidate = 3600` y URLs limpias sin parametros. |
| robots automatico | `src/app/robots.ts` debe permitir `.io`, bloquear rutas privadas y apuntar al sitemap canonico. No debe bloquear bots utiles de buscadores/IA sin decision explicita. | Completado fase inicial |
| Metadata global | `metadataBase`, `title.template`, default description, default OG/Twitter image e icons. | Completado fase inicial |
| Metadata por ruta | Cada pagina publica debe tener `title`, `description`, `alternates.canonical`, `alternates.languages`, `openGraph`, `twitter` y robots apropiado. | Parcial avanzado |
| Imagen meta | Cada pagina importante debe tener una imagen OG/Twitter inspeccionable. Producto/blog usan imagen real si existe; fallback de marca si no existe. | Parcial avanzado: home, estaticas, blog index, prueba encriptada, TIM SIM y SIM Encriptada tienen PNG interno o imagen real. |
| Meta keywords | Se pueden definir para consistencia interna, pero no son factor principal en Google. No deben sustituir title, description, contenido ni enlaces internos. | Pendiente opcional |
| Canonical | Una sola URL canonica por contenido. Home ES es `/`; blogs WP usan la URL legacy; paginas ES internas mantienen `/es/...`. | Parcial |
| Hreflang | Páginas con equivalentes traducidos deben publicar alternates por locale y `x-default`. | Parcial avanzado |
| Structured data | Organization, WebSite, Breadcrumb, Article, Product y FAQPage donde aplique. | Parcial avanzado |
| Render SEO-friendly | Contenido principal debe estar prerenderizado o server-rendered; evitar depender de JS cliente para texto indexable. Esto ayuda a Google, Bing, navegadores y crawlers con menor capacidad JS. | Parcial |
| Performance | Optimizar imagenes, fuentes, JS y Core Web Vitals; seguir Vercel/Next.js SEO Playbook. | Pendiente |
| Legibilidad para IA | Contenido, headings, breadcrumbs, JSON-LD y enlaces internos deben ser claros para sistemas de respuesta generativa y buscadores semanticos. | Pendiente |
| Previews sociales/navegador | WhatsApp, Telegram, X, LinkedIn, Discord y navegadores deben mostrar titulo, descripcion e imagen correctos. | Parcial avanzado: implementadas imagenes PNG internas y URLs absolutas; faltan validadores externos. |

Contrato minimo de metadata por pagina indexable:

```ts
type SeoPageMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  locale: "es" | "en" | "fr" | "it" | "pt";
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
};
```

Buenas practicas tomadas del enfoque Next.js/Vercel:

- Priorizar prerender, SSR cacheado o ISR para contenido publico e indexable.
- Usar App Router Metadata API (`metadata` / `generateMetadata`) en vez de tags manuales duplicados.
- Evitar paginas huerfanas: todo contenido importante debe estar enlazado desde navegación, listados, sitemap o breadcrumbs.
- Usar 404 reales para contenido inexistente; no redirigir todo al home.
- Usar canonicals para consolidar duplicados y hreflang para regiones/idiomas.
- Medir Core Web Vitals y Lighthouse despues de desplegar en Vercel.
- Pensar en crawlers con capacidades distintas: algunos ejecutan JavaScript, otros solo leen HTML, metadata, sitemaps y JSON-LD.

### Crawlers y Canales a Considerar

| Canal | Prioridad | Que necesita |
|---|---|---|
| Google Search / Googlebot | Principal | HTML renderizado, canonicals, sitemap, hreflang, structured data, performance movil. |
| Bing / Microsoft ecosystem | Alta | Sitemap, robots claro, metadata estandar, IndexNow opcional si se decide implementar. |
| Buscadores con IA / respuestas generativas | Alta | Contenido semantico, headings claros, JSON-LD, autor/fuente/fecha en blogs, URLs estables. |
| Navegadores y previews | Alta | Title, description, favicon, manifest, Open Graph, Twitter Cards, imagenes absolutas. |
| Redes y mensajeria | Media | `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`. |
| Crawlers no deseados | Variable | No bloquear por accidente; si se bloquean, documentar razon en robots. |

Nota: optimizar para IA no significa escribir texto para bots. Significa que el contenido sea correcto, estructurado, trazable y accesible en HTML/metadata.

---

## Progreso General Actualizado

```text
Fase 0 - Infraestructura base          9/10   EN PROGRESO
Fase 1 - Home, canonicals y metadata   8/8    COMPLETADO FASE INICIAL
Fase 2 - Blog legacy WordPress         9/10   EN PROGRESO
Fase 3 - robots, sitemap y noindex     8/8    COMPLETADO FASE INICIAL
Fase 4 - Metadata por pagina           16/18  EN PROGRESO
Fase 5 - Structured data JSON-LD       8/10   EN PROGRESO
Fase 6 - Redirecciones legacy          2/9    EN PROGRESO
Fase 7 - Auditoria y validacion        4/8    EN PROGRESO
```

---

## Fase 0 - Infraestructura Base

| ID | Tarea | Archivo | Estado | Prioridad |
|---|---|---|---|---|
| SEO-001 | Crear constantes SEO globales: site URL, locales, siteName, default images | `src/shared/seo/constants.ts` | Completado fase inicial | Alta |
| SEO-002 | Crear helpers `buildCanonical`, `buildAlternates`, `buildOpenGraph`, `buildTwitter` | `src/shared/seo/metadata.ts` | Completado fase inicial | Alta |
| SEO-003 | Crear helper de URL absoluta seguro para `.io`, `.net` y localhost | `src/shared/seo/url.ts` | Completado fase inicial | Alta |
| SEO-004 | Definir fuente canonica desde `NEXT_PUBLIC_SITE_URL` con fallback `https://encriptados.io` | `src/shared/seo/constants.ts` | Completado fase inicial | Alta |
| SEO-005 | Corregir `metadataBase` global | `src/app/layout.tsx` | Completado | Critica |
| SEO-006 | Definir `title.template` global | `src/app/layout.tsx` | Completado | Alta |
| SEO-006A | Definir imagen OG/Twitter por defecto de marca | `public/` + `src/shared/seo/constants.ts` | Completado fase inicial | Alta |
| SEO-006B | Definir plantilla de keywords por categoria/pagina sin sobreoptimizar | `src/shared/seo/metadata.ts` | Completado fase inicial | Media |
| SEO-007 | Validar que `pnpm run build` pase antes de cada deploy | CI/Vercel | Completado local | Critica |
| SEO-008 | Mantener `skipTrailingSlashRedirect` para blogs legacy | `next.config.mjs` | Completado | Alta |
| SEO-009 | Mantener `Suspense` en home raiz por `useSearchParams()` | `src/app/page.tsx` | Completado | Alta |
| SEO-010 | Crear pagina 404 global y localizada | `src/app/not-found.tsx`, `src/app/[locale]/not-found.tsx` | Completado fase inicial | Media |

---

## Fase 1 - Home, Canonicals y Metadata Global

| ID | Tarea | Archivo | Estado | Prioridad |
|---|---|---|---|---|
| SEO-011 | Home raiz `/` renderiza espanol 200 | `src/app/page.tsx` | Completado | Critica |
| SEO-012 | `/es` y `/es/` redirigen permanentemente a `/` | `src/middleware.ts` | Completado | Critica |
| SEO-013 | Agregar metadata completa del home raiz: title, description, canonical `/`, OG/Twitter | `src/app/page.tsx` | Completado | Critica |
| SEO-014 | Agregar metadata para `/{locale}` en idiomas no ES | `src/app/[locale]/page.tsx` | Completado fase inicial | Alta |
| SEO-015 | Agregar hreflang del home: `/`, `/en`, `/fr`, `/it`, `/pt`, `x-default` | `src/app/page.tsx`, `src/app/[locale]/page.tsx` | Completado fase inicial | Critica |
| SEO-016 | Revisar links internos al home: ES debe apuntar a `/`, otros idiomas a `/{locale}` | Header/Footer/Language switcher, prueba encriptada, distribuidores, terminos, politica de datos | Completado fase inicial | Alta |
| SEO-017 | Agregar `metadataBase` para evitar warning de Vercel | `src/app/layout.tsx` | Completado | Alta |
| SEO-018 | Evitar canonicals relativos en metadata existente | Metadata helpers | En progreso | Alta |

---

## Fase 2 - Blog Legacy WordPress

| ID | Tarea | Archivo | Estado | Prioridad |
|---|---|---|---|---|
| SEO-019 | Soportar busqueda WordPress por slug | `src/app/api/wp-blog/route.ts` | Completado | Critica |
| SEO-020 | Mantener fallback por ID numerico para posts legacy tipo `/60185/` | `src/features/blog/blogService.ts` | Completado | Alta |
| SEO-021 | Entregar `legacyPath`, `wpId`, `categorySlug` en listado | `src/app/api/app-blog/route.ts` | Completado | Critica |
| SEO-022 | Listado de blog enlaza a `legacyPath` cuando viene de WordPress | `CardOfPost.tsx`, `ListOfPosts.tsx` | Completado | Alta |
| SEO-023 | Ruta ES legacy `/blogs/noticias/[slug]` | `src/app/blogs/noticias/[slug]/page.tsx` | Completado | Critica |
| SEO-024 | Ruta localizada legacy `/{locale}/blogs/{category}/[slug]` | `src/app/[locale]/blogs/[category]/[slug]/page.tsx` | Completado | Critica |
| SEO-025 | Layout ES para `/blogs/*` sin locale | `src/app/blogs/layout.tsx` | Completado | Critica |
| SEO-026 | Metadata dinamica para blogs WordPress legacy | Rutas legacy blog | Completado fase inicial | Critica |
| SEO-027 | Canonical igual a URL legacy del CSV, conservando slash final | Rutas legacy blog | Completado fase inicial | Critica |
| SEO-028 | Article JSON-LD para posts WordPress y Markdown | Rutas detalle blog | Completado fase inicial | Alta |
| SEO-029 | Redireccionar `/es/blog/{wp-id}` a URL legacy cuando exista mapeo | Middleware o route handler | Pendiente | Media |
| SEO-030 | Smoke test de las 334 URLs del CSV | `scripts/validate-blog-legacy-urls.*` | Completado: 334/334 OK en local production | Critica |

Validaciones ya realizadas localmente:

| URL | Resultado |
|---|---|
| `/blogs/noticias/top-5-aplicaciones-para-chatear-en-secreto/` | 200 |
| `/fr/blogs/nouvelles/8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner/` | 200 |
| `/en/blogs/news/encrypted-cell-phones-in-the-crypto-world/` | 200 en dev |
| `/api/wp-blog?lang=es&slug=top-5-aplicaciones-para-chatear-en-secreto` | 200 |
| `/api/app-blog?lang=es&page=1&per_page=3` | 200 con `legacyPath` |

---

## Fase 3 - robots.txt, Sitemap y Control de Indexacion

| ID | Tarea | Archivo | Estado | Prioridad |
|---|---|---|---|---|
| SEO-031 | Crear `robots.ts` dinamico | `src/app/robots.ts` | Completado fase inicial | Critica |
| SEO-032 | En `.io`, permitir indexacion publica y bloquear dashboard/API/test | `src/app/robots.ts` | Completado fase inicial | Critica |
| SEO-033 | En `.net`, devolver `noindex` o bloquear segun fase de staging | `src/app/robots.ts`, middleware | Completado via `X-Robots-Tag` en middleware | Alta |
| SEO-034 | Crear `sitemap.ts` principal con rutas publicas actuales | `src/app/sitemap.ts` | Completado fase inicial: home, estaticas, apps/SIM estaticas, inventario store y blogs legacy | Critica |
| SEO-035 | Incluir blogs legacy WordPress en sitemap desde API/cache | `src/app/sitemap.ts` o sitemap especifico | Completado fase inicial | Critica |
| SEO-036 | Excluir dashboard, login, test, API y checkout transaccional del sitemap | `src/app/sitemap.ts` | Completado fase inicial | Critica |
| SEO-037 | Mantener `/sitemaps/apps-en.xml` o redirigirlo correctamente | Route handler o redirect | Completado: 308 a `/sitemap.xml` | Alta |
| SEO-038 | Validar que `X-Robots-Tag` no se aplique a `encriptados.io` | Middleware | Completado: `.net` noindex, `.io` sin header noindex | Critica |
| SEO-038A | Crear sitemap segmentado si el volumen crece: `sitemap-blog.xml`, `sitemap-products.xml`, `sitemap-pages.xml` | Route handlers o sitemap index | Pendiente | Media |
| SEO-038B | Evaluar IndexNow para Bing si se publican/actualizan muchos blogs/productos | API/script deploy | Pendiente opcional | Baja |
| SEO-038C | Definir politica de robots para crawlers IA: permitir, limitar o bloquear segun negocio | `src/app/robots.ts`, doc SEO | Completado fase inicial: no se bloquean bots utiles por defecto | Media |

Buenas practicas:

- `robots.txt` no reemplaza `noindex`; para entornos espejo usar header `X-Robots-Tag`.
- El sitemap debe listar solo URLs canonicas 200.
- No incluir URLs con parametros de compra o filtros (`?productId=`, `?variantId=`, `?buy=1`).
- Si se listan blogs WordPress, usar `legacyPath` como URL canonica y conservar slash final cuando venga de WordPress.
- Si una URL depende de inventario o API externa inestable, usar cache/revalidate para que el sitemap no falle el build.
- No bloquear `Googlebot`, `Bingbot` ni crawlers de previews sociales por accidente.
- Para crawlers de IA, documentar la decision antes de bloquear `GPTBot`, `Google-Extended`, `CCBot`, `PerplexityBot`, etc.

---

## Fase 4 - Metadata por Pagina

| ID | Tarea | Archivo | Estado | Prioridad |
|---|---|---|---|---|
| SEO-039 | Apps por slug: revisar metadata duplicada layout/page | `src/app/[locale]/apps/[slug]/layout.tsx`, `page.tsx` | Completado fase inicial | Alta |
| SEO-040 | Apps por slug: i18n de title/description y canonical absoluto | `src/app/[locale]/apps/[slug]/layout.tsx` | Completado fase inicial; falta auditoria copy por idioma | Alta |
| SEO-041 | SIM por slug: canonical, OG, Twitter, hreflang | `src/app/[locale]/sim/[slug]/layout.tsx` | Completado fase inicial; falta hreflang especifico | Alta |
| SEO-042 | Router: i18n metadata, canonical, hreflang | `src/app/[locale]/router/layout.tsx` | Parcial avanzado: canonical absoluto e imagen del backend; faltan copy i18n y hreflang | Media |
| SEO-043 | TIM SIM: i18n metadata, canonical, hreflang | `src/app/[locale]/tim-sim/layout.tsx` | Completado fase inicial: metadata i18n, canonical, hreflang e imagen PNG interna | Media |
| SEO-044 | Producto por ID: canonical y evitar indexar variantes duplicadas si corresponde | `src/app/[locale]/our-products/[productId]/page.tsx` | Parcial avanzado: canonical `.io` + locale corregido | Alta |
| SEO-045 | Blog listing `/{locale}/blog` | `src/app/[locale]/blog/page.tsx` | Completado fase inicial: metadata, hreflang e imagen PNG interna | Alta |
| SEO-046 | Blog Markdown `/{locale}/blog/{slug}` | `src/app/[locale]/blog/[postId]/page.tsx` | Completado fase inicial | Media |
| SEO-047 | About us | `src/app/[locale]/about-us/page.tsx` | Completado fase inicial | Media |
| SEO-048 | Offers | `src/app/[locale]/offers/page.tsx` | Completado fase inicial | Media |
| SEO-049 | Deliveries / fast delivery | `src/app/[locale]/deliveries`, `fast-delivery` | Completado fase inicial: metadata estatica, preview PNG y FAQPage en deliveries | Media |
| SEO-050 | Distributors / where to find us | `src/app/[locale]/distributors`, `where-to-find-us` | Completado fase inicial | Media |
| SEO-051 | News / ambassadors / partner pages | Varias paginas institucionales | Completado fase inicial para news, ambassadors y distributors | Media |
| SEO-052 | Activar apps: revisar si debe indexar o quedar fuera del sitemap | `src/app/[locale]/activar-apps/page.tsx` | Completado fase inicial: indexable con metadata propia | Media |
| SEO-053 | Dashboard/login/test: confirmar `robots: { index: false }` o exclusion | Varias rutas | Completado via `X-Robots-Tag` middleware | Alta |

Buenas practicas para metadata:

- No usar metadata hardcoded en espanol para paginas de otros idiomas.
- Preferir metadata en componentes server; si una pagina es cliente, mover metadata a `layout.tsx` server.
- Canonical debe ser absoluto y apuntar a la version limpia sin parametros.
- OG image debe ser inspeccionable, no generica oscura si existe imagen real del producto/articulo.

---

## Fase 5 - Structured Data JSON-LD

| ID | Tarea | Archivo | Estado | Prioridad |
|---|---|---|---|---|
| SEO-054 | `OrganizationJsonLd` global | `src/shared/components/JsonLd/OrganizationJsonLd.tsx` | Completado fase inicial | Alta |
| SEO-055 | `WebSiteJsonLd` con `SearchAction` si existe busqueda publica real | `src/shared/components/JsonLd/WebSiteJsonLd.tsx` | Completado sin SearchAction | Media |
| SEO-056 | `BreadcrumbJsonLd` reutilizable | `src/shared/components/JsonLd/BreadcrumbJsonLd.tsx` | Completado fase inicial | Alta |
| SEO-057 | `ArticleJsonLd` para blogs WordPress y Markdown | `src/shared/components/JsonLd/ArticleJsonLd.tsx` | Completado fase inicial | Alta |
| SEO-058 | `ProductJsonLd` para apps, SIM, routers y productos | `src/shared/components/JsonLd/ProductJsonLd.tsx` | Parcialmente completado apps/SIM | Alta |
| SEO-059 | `FAQJsonLd` solo donde las FAQs sean visibles en pantalla | `src/shared/components/JsonLd/faqJsonLd.ts`, layouts de productos y landings | Completado fase inicial: apps, SIM, router, TIM SIM, SIM Encriptada y deliveries | Media |
| SEO-060 | Validar JSON-LD con Rich Results Test | Externo | Pendiente: validado localmente por HTML, falta Google Rich Results Test | Media |
| SEO-060A | Agregar autor, fecha publicada/modificada e imagen real en Article schema | Rutas blog legacy y markdown | Completado fase inicial | Alta |
| SEO-060B | Agregar breadcrumbs visibles + JSON-LD en paginas principales | Layouts/paginas publicas | Parcial: JSON-LD agregado; faltan breadcrumbs visibles | Media |

Reglas:

- JSON-LD debe describir contenido visible o claramente disponible en la pagina.
- No crear reviews, ratings o precios falsos.
- Para productos, usar `Offer` solo si precio/disponibilidad son confiables.
- Para blogs, incluir `datePublished`, `dateModified`, `author`, `publisher`, `image` y canonical.
- Para IA y buscadores semanticos, los headings visibles deben coincidir con el tema real de la pagina.

---

## Fase 6 - Redirecciones Legacy y Location Pages

| ID | Tarea | Archivo | Estado | Prioridad |
|---|---|---|---|---|
| SEO-061 | Mantener redirecciones app legacy ya existentes | `next.config.mjs` | Parcial | Alta |
| SEO-062 | Completar mapeo producto/app legacy hacia rutas actuales | `doc/seo/PLAN-REDIRECCIONES-WORDPRESS-A-NEXT.md` | Parcial | Critica |
| SEO-063 | No replicar paginas de producto legacy; solo redirigir | Politica de implementacion | Completado | Critica |
| SEO-064 | Crear ruta dinamica `/location/[[...parts]]` o fallback 301 por patron | `src/app/location/[[...parts]]/page.tsx` | Pendiente | Critica |
| SEO-065 | Si se generan location pages 200, crear contenido unico por producto + ciudad | Location page | Pendiente | Alta |
| SEO-066 | Si no se generan location pages, implementar 301 a apps actuales | `next.config.mjs` | Pendiente | Critica |
| SEO-067 | Validar sitemaps legacy consultados por Google | `sitemaps/apps-en.xml` y otros | Pendiente | Alta |
| SEO-068 | Evitar catch-all a home para URLs importantes | Middleware/redirects | Pendiente | Alta |
| SEO-069 | Crear script de validacion de redirecciones legacy | `scripts/validate-seo-urls.*` | Pendiente | Alta |

Nota importante: no usar una redireccion masiva de todo lo desconocido al home como solucion SEO. Para Google, un soft 404 masivo puede ser peor que redirecciones especificas. Priorizar mapeos reales.

---

## Fase 7 - Auditoria, QA y Monitoreo

| ID | Tarea | Herramienta | Estado | Prioridad |
|---|---|---|---|---|
| SEO-070 | Build local antes de deploy | `pnpm run build` | Completado local | Critica |
| SEO-071 | Smoke test de home y rutas i18n | Script HTTP | Completado fase inicial en local production | Critica |
| SEO-072 | Smoke test 334 URLs blog CSV | Script HTTP | Completado: 334/334 OK | Critica |
| SEO-073 | Validar 20 URLs con mas clics de Search Console | Script HTTP/manual | Parcial | Critica |
| SEO-074 | Lighthouse desktop/mobile home y blog | Lighthouse/PageSpeed | Pendiente | Media |
| SEO-075 | Revisar que no haya `noindex` en `.io` | curl/Search Console | Pendiente | Critica |
| SEO-076 | Enviar sitemap a Search Console despues de deploy | Google Search Console | Pendiente | Alta |
| SEO-077 | Monitorear 404, soft 404 y cobertura 2-6 semanas | GSC/Vercel logs | Pendiente | Alta |
| SEO-078 | Validar Bing Webmaster Tools y sitemap | Bing Webmaster Tools | Pendiente | Media |
| SEO-079 | Validar previews sociales de home, producto y blog | WhatsApp/Telegram/X/LinkedIn debuggers | Parcial: OG/Twitter implementado con PNG/imagenes reales; faltan debuggers externos post-deploy | Media |
| SEO-080 | Validar HTML sin JS de paginas clave | `curl`, View Source, Rich Results Test | Parcial: FAQPage validado localmente en HTML para TIM SIM, SIM Encriptada, Router, Cryptcom y deliveries; faltan URLs minimas completas | Alta |

URLs minimas a validar en cada deploy:

```text
/
/es
/es/apps/securecrypt
/blogs/noticias/top-5-aplicaciones-para-chatear-en-secreto/
/fr/blogs/nouvelles/8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner/
/en/blogs/news/encrypted-cell-phones-in-the-crypto-world/
/api/wp-blog?lang=es&slug=top-5-aplicaciones-para-chatear-en-secreto
/api/app-blog?lang=es&page=1&per_page=3
```

---

## Orden Recomendado Antes de Produccion

1. Implementar `metadataBase`, title template y helpers SEO globales.
2. Agregar metadata completa y hreflang al home `/` y homes por idioma.
3. Crear `robots.ts` y `sitemap.ts`.
4. Agregar metadata dinamica a blogs legacy y Article JSON-LD.
5. Ejecutar smoke test de las 334 URLs del CSV de blogs.
6. Implementar estrategia para `/location/*` antes de mover DNS.
7. Completar redirecciones legacy de productos/apps sin tocar productos actuales.
8. Validar con `pnpm run build`, Lighthouse, Search Console, Bing Webmaster Tools y previews sociales.

---

## Comandos de Verificacion

```powershell
Set-Location 'D:\Clients\Encriptados\Encriptados-frontend'
pnpm exec tsc --noEmit
pnpm run build
```

Smoke test basico:

```powershell
$urls = @(
  'http://localhost:3000/',
  'http://localhost:3000/es',
  'http://localhost:3000/es/apps/securecrypt',
  'http://localhost:3000/blogs/noticias/top-5-aplicaciones-para-chatear-en-secreto/',
  'http://localhost:3000/fr/blogs/nouvelles/8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner/'
)
foreach ($url in $urls) {
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri $url -MaximumRedirection 0 -TimeoutSec 30 -ErrorAction Stop
    "{0} -> {1}" -f $url, $r.StatusCode
  } catch {
    $resp = $_.Exception.Response
    if ($resp) { "{0} -> {1} {2}" -f $url, [int]$resp.StatusCode, $resp.Headers.Location } else { "{0} -> ERROR" -f $url }
  }
}
```

---

## Documentos Relacionados

| Archivo | Uso |
|---|---|
| `doc/seo/PLAN-REDIRECCIONES-WORDPRESS-A-NEXT.md` | Plan principal de migracion, blogs legacy, home y location pages. |
| `doc/seo/Redirecciones Encriptados.io - Wordpress Blog.csv` | Inventario de URLs de blog con trafico. |
| `doc/seo/SEO-MASTER-PLAN.md` | Plan SEO original. Debe revisarse contra este backlog actualizado. |
| `doc/seo/SEO-AI-IMPLEMENTATION-GUIDE.md` | Guia tecnica original. Usar como referencia, pero validar contra estado actual. |

---

## Criterios de Aceptacion SEO para Lanzamiento

- Durante la fase actual en `www.encriptados.net`, el host `.net` responde con `X-Robots-Tag: noindex` para evitar indexacion prematura.
- Al migrar a `encriptados.io`, el host `.io` debe responder sin `X-Robots-Tag: noindex` y conservar canonicals absolutos a `https://encriptados.io`.
- `https://encriptados.io/` responde 200, indexable y canonico a `/`.
- `https://encriptados.io/es` redirige permanentemente a `/`.
- `https://encriptados.io/es/apps/securecrypt` responde 200 y conserva `/es`.
- Las URLs principales del blog WordPress responden 200 con la misma URL legacy.
- No hay `X-Robots-Tag: noindex` en `encriptados.io`.
- `robots.txt` y `sitemap.xml` existen y no listan rutas privadas.
- Las URLs de productos actuales siguen igual y no fueron modificadas.
- Las URLs `/location/*` tienen estrategia 200 o 301 antes de mover DNS.
- El build de produccion pasa en local y Vercel.
