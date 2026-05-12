# Endpoint de blogs para app

## Objetivo

Este endpoint entrega a la app la misma lista de blogs que usa la web. Combina los posts publicados en WordPress (`encriptados.io`) con los blogs Markdown locales del frontend (`content/blog/`) y devuelve una lista unificada por idioma.

## Endpoint

```http
GET {WEB_BASE_URL}/api/app-blog?lang=es
GET {WEB_BASE_URL}/api/app-blog?lang=es&page=1&per_page=20
```

Ejemplos de base URL:

```text
Produccion: https://www.encriptados.net
Local:      http://localhost:3000
```

## Query params

| Param | Tipo | Requerido | Default | Descripcion |
| --- | --- | --- | --- | --- |
| `lang` | string | No | `es` | Idioma ISO de 2 letras: `es`, `en`, `fr`, `it`, `pt`. |
| `page` | number | No | null | Pagina solicitada. Si no se envia, se devuelven todos los blogs. |
| `per_page` | number | No | null | Cantidad por pagina. Debe enviarse junto con `page`. |

## Respuesta exitosa

```json
{
  "locale": "es",
  "total": 115,
  "page": 1,
  "perPage": 20,
  "hasMore": true,
  "sources": {
    "wordpress": 112,
    "markdown": 3
  },
  "items": [
    {
      "id": "wp-60831",
      "slug": "60831",
      "source": "wordpress",
      "title": "Que es la encriptacion de comunicaciones y por que importa hoy?",
      "description": "Resumen corto del articulo...",
      "image": "https://encriptados.io/wp-content/uploads/...webp",
      "imageFull": "https://encriptados.io/wp-content/uploads/...webp",
      "author": "Equipo Encriptados",
      "date": "2026-05-01T12:00:00",
      "path": "/es/blog/60831",
      "url": "https://www.encriptados.net/es/blog/60831"
    }
  ]
}
```

## Campos del item

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `id` | string | Identificador unico. WordPress usa `wp-{id}` y Markdown usa `md-{slug}`. |
| `slug` | string | Identificador navegable. En WordPress es numerico; en Markdown es textual. |
| `source` | `wordpress` \| `markdown` | Fuente del articulo. |
| `title` | string | Titulo localizado del articulo. |
| `description` | string | Extracto para tarjetas/listados. |
| `image` | string | Imagen recomendada para card. Siempre llega como URL absoluta. |
| `imageFull` | string | Imagen recomendada para detalle. Siempre llega como URL absoluta. |
| `author` | string | Autor visible. |
| `date` | string | Fecha del articulo en formato parseable por cliente. |
| `path` | string | Ruta web relativa del articulo. |
| `url` | string | URL web absoluta del articulo. |

## Orden y paginacion

- Los articulos se devuelven ordenados por `date` descendente.
- Si la app envia `page` y `per_page`, `items` contiene solo esa pagina.
- Si la app no envia paginacion, `items` contiene la lista completa.
- `total` siempre representa el total combinado antes de paginar.
- `hasMore` indica si hay mas elementos despues de la pagina actual.

## Fuentes de datos

El endpoint agrega dos fuentes:

- WordPress REST: `{NEXT_PUBLIC_WP_BLOG_API}/wp/v2/posts?lang={lang}&_embed`
- Markdown local: `content/blog/{slug}/meta.json` + archivos `{lang}.md`

Si `NEXT_PUBLIC_WP_BLOG_API` no esta configurado, el fallback es:

```text
https://encriptados.io/wp-json
```

## Errores

```json
{
  "error": "Failed to fetch blog list"
}
```

Codigos esperados:

| Codigo | Motivo |
| --- | --- |
| `200` | Lista generada correctamente. |
| `204` | Respuesta a `OPTIONS` para CORS/preflight. |
| `502` | Fallo consultando WordPress y sin cache utilizable. |

## Headers utiles

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Cache-Control: public, max-age=60, stale-while-revalidate=300
X-Cache: HIT | MISS | STALE
```

## Ejemplo de consumo

```ts
type BlogSource = "wordpress" | "markdown";

type BlogItem = {
  id: string;
  slug: string;
  source: BlogSource;
  title: string;
  description: string;
  image: string;
  imageFull: string;
  author: string;
  date: string;
  path: string;
  url: string;
};

type BlogResponse = {
  locale: string;
  total: number;
  page: number | null;
  perPage: number | null;
  hasMore: boolean;
  sources: {
    wordpress: number;
    markdown: number;
  };
  items: BlogItem[];
};

async function getBlogs(lang = "es", page = 1, perPage = 20) {
  const params = new URLSearchParams({
    lang,
    page: String(page),
    per_page: String(perPage),
  });

  const response = await fetch(
    `https://www.encriptados.net/api/app-blog?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`Blog API error: ${response.status}`);
  }

  return (await response.json()) as BlogResponse;
}
```

## Notas para la app

- Usar `id` como key estable en listas.
- Usar `image` para tarjetas y `imageFull` para pantallas de detalle.
- Usar `url` para compartir el articulo en la web.
- Para abrir el contenido dentro de la app, la app puede navegar a `url` en webview o solicitar un endpoint de detalle si se implementa despues.
- No asumir que `slug` siempre es texto: WordPress usa IDs numericos.