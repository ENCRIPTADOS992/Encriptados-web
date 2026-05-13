# Plan de redirecciones WordPress a Next.js

> Fecha: 13 de mayo de 2026  
> Dominio de migracion: `https://encriptados.io/`  
> Sitio actual en el dominio: WordPress  
> Sitio destino: Next.js en `Encriptados-frontend`  
> Archivo base revisado: `doc/seo/Redirecciones Encriptados.io - Sitemap APPS EN.csv`

## Objetivo

Migrar `encriptados.io` a la nueva web sin danar el SEO ni el proyecto actual. La prioridad es:

1. Conservar las URLs actuales del blog de WordPress como URLs publicas en la nueva web.
2. Redirigir las paginas antiguas que no se conservaran a su equivalente actual en Next.js.
3. Resolver las URLs `location` con una solucion programatica en la nueva web.
4. Hacer que solo el home en espanol se vea sin `/es`, manteniendo `/es/...` para las demas paginas en espanol.

Alcance importante: no se deben replicar, recrear ni modificar las URLs actuales de productos en Next.js. Los productos actuales ya funcionan como se quiere; para URLs antiguas de productos solo se deben crear redirecciones hacia las rutas actuales.

## Reglas base de migracion

| Tipo de URL antigua | Accion | URL destino/canonica | Motivo |
|---|---|---|---|
| `https://encriptados.io/` | Mantener 200 | `https://encriptados.io/` | El home debe ser el espanol, pero sin mostrar `/es` por estetica. |
| `https://encriptados.io/es` | 301/308 | `https://encriptados.io/` | Evita duplicar el home entre `/` y `/es`. |
| Blog WordPress existente | Mantener 200, no redirigir | Misma URL actual | Es lo mas importante para no perder posicionamiento del blog. |
| Blog Next actual `/es/blog/{id-o-slug}` | 301 cuando exista slug legacy | URL legacy WordPress equivalente | Evita competir con la URL historica. |
| Paginas legacy de producto/app | 301 | Ruta actual Next con locale, normalmente `/{locale}/apps/{slug}` o `/{locale}/our-products/{productId}` | No se toca el producto actual; solo se redirige la URL antigua. |
| `location/*` | Generar pagina 200 o, como fallback, 301 a producto | Misma URL si se implementa pagina dinamica | Hay miles de URLs indexadas; 404 masivo seria riesgoso. |
| Sitemaps legacy | Mantener 200 si se generan esas URLs; si no, 301 | `/sitemap.xml` o sitemap equivalente | Search Console y Google pueden seguir consultandolos. |

## Home canonico

La raiz del dominio debe ser el home canonico en espanol, sin mostrar `/es`. Esto aplica solamente al home. El resto de paginas en espanol si deben conservar el prefijo `/es`.

| URL antigua | Nueva URL | Tipo |
|---|---|---|
| `https://encriptados.io/` | `https://encriptados.io/` | 200 canonico |
| `https://encriptados.io/es` | `https://encriptados.io/` | 301/308 permanente |
| `https://encriptados.io/es/apps/securecrypt` | `https://encriptados.io/es/apps/securecrypt` | 200, se mantiene con `/es` |
| `https://encriptados.io/es/blog/...` | URL legacy/canonica del blog que corresponda | Mantener o 301 segun mapeo de blog |

Notas de implementacion:

- El proyecto ya usa `next-intl` con `defaultLocale: "es"`.
- La regla estetica aplica solo al home espanol.
- `/` debe renderizar el mismo contenido que hoy renderiza `/es`.
- `/es` debe redirigir a `/` para evitar contenido duplicado.
- Las rutas internas en espanol deben seguir usando `/es/...`, por ejemplo `/es/apps/securecrypt`, `/es/sim/{slug}`, `/es/router`.
- La canonical del home debe ser `https://encriptados.io/`.
- Los links internos al home en espanol deben apuntar a `/`; los links a paginas internas en espanol deben apuntar a `/es/...`.

Ejemplo para implementacion posterior en `next.config.mjs`:

```js
async redirects() {
  return [
    {
      source: '/es',
      destination: '/',
      permanent: true,
    },
  ];
}
```

Adicionalmente, si `next-intl` no sirve el home espanol en `/` por defecto, se debe resolver en `middleware.ts` o con una pagina raiz que renderice el home de `es` sin cambiar las rutas internas.

## Blog: conservar las URLs de WordPress

Esta es la parte critica. Para blogs no conviene redirigir todo a `/es/blog/{postId}` ni a rutas nuevas inventadas. La nueva web debe servir las URLs historicas del WordPress.

### Inventario de URLs con trafico

Archivo revisado: `doc/seo/Redirecciones Encriptados.io - Wordpress Blog.csv`.

| Metrica | Valor |
|---|---:|
| URLs de blog revisadas | 334 |
| Clics totales reportados | 1.027 |
| Impresiones totales reportadas | 93.128 |
| URLs con respuesta 200 | 330 |
| URLs con respuesta 301 | 4 |
| URLs indexables | 330 |

Distribucion por patron:

| Patron | Cantidad | Accion |
|---|---:|---|
| `/blogs/noticias/{slug}/` | 111 | Mantener 200 como blog espanol sin `/es`. |
| `/{locale}/blogs/{category}/{slug}/` | 223 | Mantener 200 para `en`, `fr`, `it`, `pt`. |

Distribucion por idioma inferido:

| Idioma | Cantidad |
|---|---:|
| Espanol raiz (`/blogs/noticias`) | 111 |
| Ingles (`/en/blogs/news`) | 99 |
| Frances (`/fr/blogs/nouvelles`) | 86 |
| Portugues (`/pt/blogs/noticias-pt`) | 19 |
| Italiano (`/it/blogs/notizia`) | 19 |

Top URLs con mas clics que no pueden caer en 404:

| URL legacy | Clics | Impresiones | Accion |
|---|---:|---:|---|
| `/fr/blogs/nouvelles/8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner/` | 310 | 2.348 | Mantener 200 desde Next.js. |
| `/blogs/noticias/top-5-aplicaciones-para-chatear-en-secreto/` | 211 | 14.397 | Mantener 200 desde Next.js. |
| `/blogs/noticias/celulares-encriptados-seguridad-digital-8-celulares-cifrados/` | 141 | 3.823 | Mantener 200 desde Next.js. |
| `/blogs/noticias/que-puedo-o-no-hacer-cuando-tengo-un-celular-encriptado/` | 51 | 6.125 | Mantener 200 desde Next.js. |
| `/blogs/noticias/rompiendo-barreras-la-verdad-de-las-tarjetas-sim-anonimas-y-su-efectividad-en-el-mundo-digital/` | 29 | 1.079 | Mantener 200 desde Next.js. |
| `/blogs/noticias/7-cosas-que-nunca-debes-hacer-en-internet/` | 21 | 1.111 | Mantener 200 desde Next.js. |
| `/blogs/noticias/silent-phone-la-aplicacion-cifrada-que-protegera-todos-tus-chats/` | 21 | 1.398 | Mantener 200 desde Next.js. |
| `/fr/blogs/nouvelles/60185/` | 19 | 576 | Mantener 200 aunque el slug sea numerico. |
| `/blogs/noticias/4-buscadores-web-mas-seguros-que-google/` | 18 | 975 | Mantener 200 desde Next.js. |
| `/it/blogs/notizia/telefoni-criptati-cosa-sono-e-perche-sempre-piu-aziende-li-utilizzano/` | 16 | 1.886 | Mantener 200 desde Next.js. |

### Hallazgo tecnico actual

La API de WordPress que ya se consume permite resolver posts por slug real:

```text
/wp-json/wp/v2/posts?lang=es&slug=top-5-aplicaciones-para-chatear-en-secreto&per_page=1&_embed
/wp-json/wp/v2/posts?lang=fr&slug=8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner&per_page=1&_embed
```

Pruebas realizadas:

| Consulta | Resultado |
|---|---|
| `lang=es`, `slug=top-5-aplicaciones-para-chatear-en-secreto` | Devuelve `id=29229`, `link=/blogs/noticias/top-5-aplicaciones-para-chatear-en-secreto/`. |
| `lang=fr`, `slug=8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner` | Devuelve `id=1548`, `link=/fr/blogs/nouvelles/8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner/`. |
| `lang=en`, `slug=8-encrypted-cell-phones-that-no-one-can-ever-spy-on` | Devuelve `id=1546`, `link=/en/blogs/news/8-encrypted-cell-phones-that-no-one-can-ever-spy-on/`. |

Totales reportados por WordPress API:

| Idioma | Posts API |
|---|---:|
| `es` | 112 |
| `en` | 100 |
| `fr` | 87 |
| `it` | 20 |
| `pt` | 20 |

Esto confirma que no hace falta copiar manualmente los blogs para empezar. La nueva web puede servir las URLs legacy leyendo desde la API actual y cacheando los resultados.

### Por que muchos blogs no aparecen hoy

El flujo actual tiene estos problemas:

| Problema | Efecto |
|---|---|
| `mapWpItemToCard()` guarda `slug: String(item.id)` para WordPress. | Las tarjetas apuntan a `/blog/{id}` en vez de la URL real `/blogs/{category}/{slug}/`. |
| `mapToAppItem()` genera `path = /{locale}/blog/{item.slug}`. | El endpoint unificado no entrega las URLs historicas que tienen trafico. |
| El detalle actual solo detecta WordPress por ID numerico. | Si el usuario entra por `/blogs/noticias/{slug}/`, Next.js no tiene ruta equivalente y puede caer en 404. |
| El listado carga todo junto para el gestor. | Funciona para cientos de posts, pero debe paginar/cachear para no crecer mal. |

### Solucion propuesta para blogs legacy

Objetivo: que si el usuario entra a `raiz + resto de URL` desde el CSV, esa URL responda en la nueva web de Next.js y muestre el blog correcto cargado desde la API de WordPress.

Crear rutas legacy de blog:

```text
src/app/
  blogs/
    noticias/
      [slug]/page.tsx                 # Espanol legacy sin /es
  [locale]/
    blogs/
      [category]/
        [slug]/page.tsx               # EN/FR/IT/PT legacy
```

La ruta debe resolver:

| URL entrante | Locale | Category | Slug para API |
|---|---|---|---|
| `/blogs/noticias/top-5-aplicaciones-para-chatear-en-secreto/` | `es` | `noticias` | `top-5-aplicaciones-para-chatear-en-secreto` |
| `/en/blogs/news/8-encrypted-cell-phones-that-no-one-can-ever-spy-on/` | `en` | `news` | `8-encrypted-cell-phones-that-no-one-can-ever-spy-on` |
| `/fr/blogs/nouvelles/60185/` | `fr` | `nouvelles` | `60185` |

El fetch de detalle debe intentar en este orden:

1. Buscar WordPress por `slug` con `wp/v2/posts?lang={locale}&slug={slug}&per_page=1&_embed`.
2. Si el slug es numerico y la busqueda por slug no encuentra, buscar por ID con `wp/v2/posts/{id}?_embed`.
3. Si no existe en WordPress, buscar Markdown local por slug.
4. Si no existe en ninguna fuente, devolver 404 real.

### Gestor/listado de blog

El gestor actual debe listar tambien estos blogs legacy. Para eso el endpoint unificado `/api/app-blog` debe entregar cada item con la URL legacy real.

Cambios recomendados:

| Archivo | Cambio |
|---|---|
| `src/features/blog/types.ts` | Agregar `wpId?: number`, `legacyPath?: string`, `categorySlug?: string`. |
| `src/app/api/app-blog/route.ts` | En WordPress usar `slug: item.slug`, `wpId: item.id`, `legacyPath` desde `item.link` o desde categoria por idioma. |
| `src/features/blog/blogService.ts` | Mapear WordPress con `item.slug`, no con ID. |
| `CardOfPost.tsx` | Usar `post.legacyPath ?? post.path ?? /blog/{slug}` para el link. |
| `fetchBlogPost()` | Aceptar busqueda por slug real, ID numerico y fuente Markdown. |

El listado no debe cargar el contenido HTML completo de cada blog. Solo debe cargar tarjetas:

```text
GET /api/app-blog?lang=es&page=1&per_page=12
```

Y cada detalle debe cargar el contenido completo bajo demanda:

```text
GET /api/wp-blog?lang=es&slug=top-5-aplicaciones-para-chatear-en-secreto
```

### Carga eficiente desde la API actual

Para que sea rapido y estable:

| Capa | Regla |
|---|---|
| Listado `/api/app-blog` | Traer solo tarjetas, paginar con `page` y `per_page`, cachear 5-15 minutos. |
| Detalle `/api/wp-blog` | Buscar por `slug`, cachear cada post por `locale + slug`. |
| Fallback | Si WordPress falla, devolver cache stale si existe. |
| Imagenes | Usar `_embed` para portada y servir URLs absolutas. |
| SEO | Canonical igual a la URL legacy del CSV. |
| Mobile/App | Consumir el mismo `/api/app-blog` con `legacyPath` y `url`. |

### Estado de implementacion de blogs

Implementado en Next.js:

| Punto | Estado |
|---|---|
| `/api/wp-blog?lang={locale}&slug={slug}` | Implementado. Busca en WordPress por slug y conserva fallback por ID numerico. |
| `/api/app-blog` | Implementado. Devuelve `slug` real de WordPress, `wpId`, `legacyPath`, `categorySlug`, `path` y `url`. |
| `/blogs/noticias/[slug]` | Implementado para blogs espanoles sin `/es`. |
| `/{locale}/blogs/{category}/[slug]` | Implementado para blogs legacy localizados. |
| Tarjetas del gestor | Implementado. Enlazan a `legacyPath` cuando viene de WordPress. |
| Slash final legacy | Implementado con `skipTrailingSlashRedirect`, para que URLs del CSV con `/` final respondan 200. |
| Middleware | Implementado bypass para `/blogs/*`, evitando que next-intl fuerce locale en los blogs espanoles raiz. |

Validacion local realizada:

| URL | Resultado |
|---|---|
| `/api/wp-blog?lang=es&slug=top-5-aplicaciones-para-chatear-en-secreto` | 200, `id=29229`, link WordPress legacy correcto. |
| `/api/app-blog?lang=es&page=1&per_page=3` | 200, items WordPress con `legacyPath`. |
| `/blogs/noticias/top-5-aplicaciones-para-chatear-en-secreto/` | 200. |
| `/fr/blogs/nouvelles/8-telephones-portables-cryptes-que-personne-ne-pourra-jamais-espionner/` | 200. |

### Fase inicial recomendada

Para empezar sin tocar productos ni otras paginas:

1. Crear soporte de API por slug en `/api/wp-blog`.
2. Cambiar el mapeo WordPress para usar `item.slug`, `item.id` como `wpId` y `item.link` como `legacyPath`.
3. Crear las rutas legacy `/blogs/noticias/[slug]` y `/{locale}/blogs/{category}/[slug]`.
4. Reusar los componentes visuales actuales del detalle de blog para no redisenar.
5. Cambiar las tarjetas del gestor para enlazar a `legacyPath`.
6. Probar las 20 URLs con mas clics del CSV.
7. Cuando esas funcionen, validar las 334 URLs del CSV con un script de smoke test.

### Patron objetivo

| Idioma | URL actual/objetivo | Accion |
|---|---|---|
| Espanol | `/blogs/noticias/{slug}/` | Mantener 200 en Next.js. |
| Ingles | `/en/blogs/news/{slug}/` | Mantener 200 en Next.js. |
| Frances | `/fr/blogs/nouvelles/{slug}/` | Mantener 200 en Next.js si existe contenido. |
| Italiano | `/it/blogs/notizia/{slug}/` | Mantener 200 en Next.js si existe contenido. |
| Portugues | `/pt/blogs/noticias-pt/{slug}/` | Mantener 200 en Next.js si existe contenido. |

Si WordPress tiene una variante distinta para alguna URL real, manda la URL real. La regla de oro es: la URL que ya esta indexada y recibe trafico debe seguir respondiendo 200 con el mismo contenido o contenido equivalente.

### Mapeo blog legacy a Next.js

| URL antigua | Nueva URL | Accion recomendada |
|---|---|---|
| `/blogs/noticias/{wp-slug}/` | Misma URL | Crear ruta publica en Next.js y servir el post por `slug`. |
| `/en/blogs/news/{wp-slug}/` | Misma URL | Crear ruta publica en Next.js y servir el post por `slug`. |
| `/es/blog/{wp-id}` | `/blogs/noticias/{wp-slug}/` | 301 despues de resolver `wp-id -> wp-slug`. |
| `/{locale}/blog/{md-slug}` | `/{locale}/blogs/{category}/{md-slug}` | 301 para los blogs nuevos en Markdown. |
| `/blog/{slug}` sin locale | `/blogs/noticias/{slug}/` | 301 si existe en espanol. |

### Cambios tecnicos necesarios para blog

1. Crear rutas compatibles con WordPress:

```text
src/app/
  blogs/
    noticias/
      [slug]/page.tsx
  [locale]/
    blogs/
      [category]/
        [slug]/page.tsx
```

2. Cambiar el lookup de WordPress para usar `slug` y no ID numerico.
3. Mantener un endpoint interno capaz de resolver:
   - post WordPress por slug,
   - post Markdown por slug,
   - post WordPress por ID solo para redireccionar rutas antiguas de la nueva web.
4. Los nuevos blogs Markdown deben publicarse directamente con el patron legacy-compatible, no con `/blog/{slug}`.
5. Generar canonical por fuente:
   - WP ES historico: `https://encriptados.io/blogs/noticias/{slug}/`
   - WP EN historico: `https://encriptados.io/en/blogs/news/{slug}/`
   - Markdown nuevo: usar el mismo patron por idioma.

## Paginas actuales de Next.js para usar como destino

Estas rutas ya existen en el frontend y deben ser los destinos principales de las redirecciones. No se deben cambiar sus URLs actuales, componentes, flujo de compra ni comportamiento.

| Seccion | Ruta actual Next.js |
|---|---|
| Home espanol | `/` |
| Home otros idiomas | `/{locale}` |
| Apps | `/{locale}/apps/{slug}` |
| SIM por slug | `/{locale}/sim/{slug}` |
| Producto por ID | `/{locale}/our-products/{productId}` |
| Router | `/{locale}/router` |
| TIM SIM | `/{locale}/tim-sim` |
| IRA SIM | `/{locale}/ira-sim` |
| Entregas | `/{locale}/deliveries` o ruta localizada por `next-intl` |
| Distribuidores | `/{locale}/distributors` o ruta localizada por `next-intl` |
| Donde encontrarnos | `/{locale}/where-to-find-us` o ruta localizada por `next-intl` |
| Ofertas | `/{locale}/offers` o ruta localizada por `next-intl` |
| Nosotros | `/{locale}/about-us` o ruta localizada por `next-intl` |

El archivo `src/i18n/routing.ts` ya define traducciones para varias rutas. Cuando exista pathname localizado, se debe usar el pathname localizado para el idioma correspondiente.

## Mapeo general de URLs antiguas

| URL antigua WordPress | URL nueva Next.js | Tipo | Observaciones |
|---|---|---|---|
| `/pages/{app}/` | `/es/apps/{slug-actual}` | 301 | Paginas legacy en espanol. |
| `/en/pages/{app}/` | `/en/apps/{slug-actual}` | 301 | Paginas legacy en ingles. |
| `/fr/pages/{app}/` | `/fr/apps/{slug-actual}` | 301 | Paginas legacy en frances. |
| `/it/pages/{app}/` | `/it/apps/{slug-actual}` | 301 | Paginas legacy en italiano. |
| `/pt/pages/{app}/` | `/pt/apps/{slug-actual}` | 301 | Paginas legacy en portugues. |
| `/producto/{id-o-slug}/` | `/es/our-products/{productId}` o `/es/apps/{slug}` | 301 | Solo redireccion. No crear ni modificar paginas de producto en Next.js. |
| `/product/{id-o-slug}/` | `/en/our-products/{productId}` o `/en/apps/{slug}` | 301 | Solo redireccion. Requiere tabla producto legacy -> producto actual. |
| `/category/{categoria}/` | Categoria equivalente o home de seccion | 301 | Evitar mandar todo al home si hay categoria actual. |
| `/cart/`, `/checkout/`, `/my-account/` | Ruta actual de checkout/login/dashboard | 301/302 segun flujo | Validar porque son rutas transaccionales. |
| `/wp-content/*` | CDN/asset nuevo o 410 | 301/410 | Solo redirigir assets con trafico real. |
| `/wp-json/*` | API legacy o bloquear | 404/410/Proxy temporal | No indexable; no debe entrar al sitemap. |

## Slugs actuales de apps

Estos slugs existen o estan soportados por la configuracion actual de apps. Se documentan solo como destinos de redireccion; no implican cambios en las paginas actuales.

| Producto legacy | Slug actual Next.js |
|---|---|
| SecureCrypt | `securecrypt` |
| Silent Circle | `silent-phone` |
| Armadillo Chat | `armadillo-chat` |
| VaultChat | `vaultchat` |
| Salt | `salt-app` |
| VNC Lagoon | `vnc-lagoon` |
| Threema Work | `threema-work` |
| Threema | `threema` |
| NordVPN | `nord-vpn` |

## Location pages

El CSV `Redirecciones Encriptados.io - Sitemap APPS EN.csv` contiene 6.472 filas:

| Tipo | Cantidad |
|---|---:|
| `/location/*` | 6.471 |
| `/sitemaps/apps-en.xml` | 1 |

Las 6.471 URLs son 9 apps por 719 ubicaciones:

| Prefijo legacy | Cantidad | Producto | Destino si se redirige | Recomendacion |
|---|---:|---|---|---|
| `/location/securecrypt-app-{city}` | 719 | SecureCrypt | `/en/apps/securecrypt` | Generar pagina 200. |
| `/location/silent-circle-app-{city}` | 719 | Silent Phone | `/en/apps/silent-phone` | Generar pagina 200. |
| `/location/armadillo-chat-app-{city}` | 719 | Armadillo Chat | `/en/apps/armadillo-chat` | Generar pagina 200. |
| `/location/vaultchat-app-{city}` | 719 | VaultChat | `/en/apps/vaultchat` | Generar pagina 200. |
| `/location/salt-app-{city}` | 719 | Salt App | `/en/apps/salt-app` | Generar pagina 200. |
| `/location/vnclagoon-app-{city}` | 719 | VNC Lagoon | `/en/apps/vnc-lagoon` | Generar pagina 200. |
| `/location/threema-work-app-{city}` | 719 | Threema Work | `/en/apps/threema-work` | Generar pagina 200. |
| `/location/threema-app-{city}` | 719 | Threema | `/en/apps/threema` | Generar pagina 200. |
| `/location/nordvpn-app-{city}` | 719 | NordVPN | `/en/apps/nord-vpn` | Generar pagina 200. |

### Solucion recomendada para `location`

Crear una ruta dinamica legacy fuera de `[locale]`:

```text
src/app/location/[[...parts]]/page.tsx
```

Debe soportar:

| URL | Locale detectado | Producto | Ciudad |
|---|---|---|---|
| `/location/securecrypt-app-aalborg` | `en` | `securecrypt` | `aalborg` |
| `/location/es/securecrypt-app-bogota` | `es` | `securecrypt` | `bogota` |
| `/location/fr/threema-app-paris` | `fr` | `threema` | `paris` |

Reglas del parser:

1. Si el primer segmento despues de `/location/` es `es`, `en`, `fr`, `it` o `pt`, usarlo como locale.
2. Si no hay locale en la URL, asumir `en` para el sitemap `apps-en.xml`.
3. Identificar el producto por prefijo conocido (`securecrypt-app`, `silent-circle-app`, etc.).
4. Todo lo que queda despues del prefijo es `citySlug`.
5. Renderizar contenido indexable con metadata unica por producto + ciudad.
6. Usar canonical igual a la URL legacy si se decide conservarla.

### Contenido minimo para una location page

Cada pagina generada debe incluir:

| Elemento | Ejemplo |
|---|---|
| Title | `SecureCrypt App Aalborg | Encriptados` |
| H1 | `SecureCrypt App Aalborg` |
| Descripcion | Texto unico con producto + ciudad. |
| CTA | Link a `/{locale}/apps/{productSlug}`. |
| Breadcrumb | `Home > Location > SecureCrypt App Aalborg`. |
| JSON-LD | `Product` + `BreadcrumbList`. |
| Canonical | URL legacy de `location`. |
| Hreflang | Solo si existen equivalentes por idioma. |

### Fallback si no se alcanza a generar `location`

Si no se implementa la ruta dinamica antes del cambio de dominio, usar 301 por patron hacia la app:

```js
{ source: '/location/securecrypt-app-:city', destination: '/en/apps/securecrypt', permanent: true }
{ source: '/location/silent-circle-app-:city', destination: '/en/apps/silent-phone', permanent: true }
{ source: '/location/armadillo-chat-app-:city', destination: '/en/apps/armadillo-chat', permanent: true }
{ source: '/location/vaultchat-app-:city', destination: '/en/apps/vaultchat', permanent: true }
{ source: '/location/salt-app-:city', destination: '/en/apps/salt-app', permanent: true }
{ source: '/location/vnclagoon-app-:city', destination: '/en/apps/vnc-lagoon', permanent: true }
{ source: '/location/threema-work-app-:city', destination: '/en/apps/threema-work', permanent: true }
{ source: '/location/threema-app-:city', destination: '/en/apps/threema', permanent: true }
{ source: '/location/nordvpn-app-:city', destination: '/en/apps/nord-vpn', permanent: true }
```

Este fallback evita 404, pero pierde trafico long-tail local. Por eso la opcion recomendada es generar paginas 200.

## Sitemap legacy `apps-en.xml`

| URL antigua | Accion recomendada |
|---|---|
| `/sitemaps/apps-en.xml` | Mantener 200 y generar un XML con las nuevas/legacy location pages si se implementan. |

Si las location pages no se generan, redirigir a `/sitemap.xml`, pero esa opcion es menos fuerte para Google porque el sitemap historico deja de listar las URLs conocidas.

## Orden de implementacion para no danar el proyecto

1. Congelar inventario de URLs con trafico desde Google Search Console.
2. Implementar home espanol en `/`, redireccion `/es -> /` y canonicals.
3. Implementar rutas blog legacy y resolver posts por slug.
4. Cambiar enlaces internos del blog para que apunten a `/blogs/{category}/{slug}`.
5. Implementar `location/[[...parts]]` para apps EN del CSV.
6. Agregar sitemaps legacy compatibles (`/sitemaps/apps-en.xml` primero).
7. Agregar redirecciones de paginas legacy de producto/app a las rutas actuales sin modificar productos Next.js.
8. Probar en staging con una lista de URLs reales antes de mover DNS.
9. Hacer deploy, cambiar dominio y monitorear Search Console 2 a 6 semanas.

## Checklist de validacion

Antes de apuntar `encriptados.io` a Next.js:

- [ ] `https://encriptados.io/` responde 200 con el home en espanol.
- [ ] `https://encriptados.io/es` responde 301/308 hacia `https://encriptados.io/`.
- [ ] Una pagina interna en espanol, por ejemplo `/es/apps/securecrypt`, responde 200 y conserva `/es`.
- [ ] Una URL real de blog WordPress en espanol responde 200 con la misma URL.
- [ ] Una URL real de blog WordPress en ingles responde 200 con la misma URL.
- [ ] `/es/blog/{id}` redirige a la URL legacy del blog si existe equivalencia.
- [ ] Una URL antigua de producto responde 301/308 hacia su producto actual en Next.js.
- [ ] Las URLs actuales de productos Next.js siguen respondiendo 200 y no cambiaron.
- [ ] `/location/securecrypt-app-aalborg` responde 200 si se genero la pagina, o 301 a `/en/apps/securecrypt` como fallback.
- [ ] `/sitemaps/apps-en.xml` responde 200 si se conservan location pages.
- [ ] No hay `X-Robots-Tag: noindex` en `encriptados.io`.
- [ ] Si `encriptados.net` sigue activo, mantiene `noindex` o 301 hacia `.io` segun fase.
- [ ] El sitemap principal no incluye rutas de dashboard, test o login.

## Pendientes para completar el mapeo exacto

Para convertir esta estrategia en una tabla final URL por URL faltan estos insumos:

| Insumo | Para que sirve |
|---|---|
| Export de URLs de blog desde WordPress con `id`, `slug`, `link`, `lang` | Mantener exactamente las URLs del blog y redirigir IDs actuales. |
| Export de Search Console con clicks/impressions por URL | Priorizar URLs que no pueden fallar el dia de migracion. |
| Tabla WooCommerce producto legacy -> producto actual/API productId | Redirigir productos transaccionales correctamente sin tocar productos Next.js. |
| Sitemaps `apps-es.xml`, `apps-fr.xml`, `phone-*`, `sim-*` | Extender la solucion `location` mas alla del CSV EN de apps. |
