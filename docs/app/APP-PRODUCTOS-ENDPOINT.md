# Endpoints de productos para app

## Objetivo

Este documento explica como debe consumir la app de Encriptados los endpoints de productos para usar el mismo backend que usa el frontend `develop`.

La idea correcta para la app no es depender del proxy web `/api/wp-json`, sino pegar directo al backend origen:

```text
https://admin.encriptados.io/wp-json/encriptados/v3
```

De esa forma la app consume la misma fuente de datos real de productos, precios, variantes, regiones y configuraciones auxiliares.

## Fuente de verdad

### Backend recomendado para la app

```text
Base backend productos: https://admin.encriptados.io/wp-json/encriptados/v3
```

### Como lo usa hoy la web

En `develop`, la web usa dos modos:

1. En navegador usa `/api/wp-json/...` y ese proxy reenvia a `https://admin.encriptados.io/wp-json/...`
2. En servidor algunas rutas dependen de variables de entorno, pero el consumo cliente de productos sigue aterrizando en el admin

Para la app movil, lo recomendable es simplificar:

- consumir directo `admin.encriptados.io`
- no depender del proxy de la web
- no depender de `encriptados.es`

## Endpoints principales de productos

## 1. Listado de productos

### Endpoint

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/store/products?category_id=apps&lang=es
```

### Uso real en frontend

El frontend usa este endpoint para:

- listados por categoria
- busqueda de productos
- ofertas
- resolucion previa de slug
- bloques destacados como Renati
- filtros de SIM por region, pais o provider

### Query params soportados por el frontend

| Param | Tipo | Requerido | Ejemplo | Descripcion |
| --- | --- | --- | --- | --- |
| `category_id` | string | Si | `apps` | Categoria a consultar. La web usa aliases de texto. |
| `lang` | string | Si | `es` | Idioma: `es`, `en`, `fr`, `it`, `pt`. |
| `sim_country` | string | No | `mx` | Filtro para productos SIM por pais. |
| `sim_region` | string | No | `global` | Filtro para productos SIM por region. |
| `provider` | string | No | `tim` | Filtro por proveedor para SIMs y activar-apps. |

### Categorias usadas por la web

La web normaliza los IDs a aliases. Para la app conviene usar los mismos aliases:

| Categoria | Alias recomendado |
| --- | --- |
| Software | `software` |
| Apps | `apps` |
| Routers | `routers` |
| SIMs | `sims` |
| Activar apps | `activar-apps` |
| Recargas | `recargas` |

### Respuesta observada

```json
{
  "message": "Products retrieved successfully",
  "products": [
    {
      "id": 60938,
      "name": "Armadillo Chat",
      "description": "Aplicación de mensajería instantánea de alta seguridad que respeta tu privacidad",
      "checks": [
        { "name": "Borrado remoto" },
        { "name": "Alertas contra impostores" }
      ],
      "activation": "Si",
      "type_product": "digital",
      "provider": "Ninguno",
      "licensetime": "1",
      "shipping": "No",
      "brand": "Armadillo Chat",
      "sku": "ARMADILLO-CHAT-LICENSE-1",
      "price": 15,
      "on_sale": false,
      "sale_price": 15,
      "stock_quantity": "1000",
      "category": {
        "id": 431,
        "name": "Apps"
      },
      "images": [
        {
          "src": "https://admin.encriptados.io/wp-content/uploads/...jpg"
        }
      ],
      "faqs": [],
      "advantages": [],
      "features": [],
      "variants": []
    }
  ]
}
```

### Notas importantes

- `products` llega como arreglo.
- `price` y `sale_price` pueden llegar como numero, string o `null` segun tipo de producto.
- `variants` puede venir vacio o con estructuras distintas segun categoria.
- Las imagenes ya llegan como URLs absolutas al dominio `admin.encriptados.io`.

## 2. Detalle de producto

### Endpoint

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/store/product/{productId}?lang=es
```

Ejemplo real:

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/store/product/60996?lang=es
```

### Query params usados por el frontend

| Param | Tipo | Requerido | Ejemplo | Descripcion |
| --- | --- | --- | --- | --- |
| `lang` | string | Si | `es` | Idioma del detalle. |
| `sim_region` | string | No | `global` | Filtro de contexto para SIMs. |
| `sim_country` | string | No | `co` | Filtro de contexto para SIMs. |
| `provider` | string | No | `tim` | Proveedor del producto cuando aplica. |

### Respuesta observada

El endpoint devuelve el objeto producto directamente, no envuelto en `message`.

```json
{
  "id": 60996,
  "name": "Galaxia MDM Iphone",
  "description": "Protege tu iPhone con el más alto nivel de seguridad.",
  "checks": [
    { "name": "VPN integrado" },
    { "name": "eSIM internacional" },
    { "name": "Borrado remoto" }
  ],
  "activation": "Si",
  "type_product": "digital",
  "provider": "Ninguno",
  "licensetime": "6",
  "shipping": "No",
  "brand": "Galaxia MDM",
  "sku": "GALAXIA-MDM",
  "price": "",
  "on_sale": false,
  "sale_price": null,
  "category": {
    "id": 439,
    "name": "Software"
  },
  "images": [
    {
      "src": "https://admin.encriptados.io/wp-content/uploads/...png"
    }
  ],
  "faqs": [],
  "advantages": [],
  "features": [],
  "variants": [],
  "image": "https://admin.encriptados.io/wp-content/uploads/...png",
  "image_full": "https://admin.encriptados.io/wp-content/uploads/...png",
  "heroBanners": {
    "desktop": "https://admin.encriptados.io/...",
    "tablet": "https://admin.encriptados.io/...",
    "mobile": "https://admin.encriptados.io/..."
  },
  "iconUrl": "https://admin.encriptados.io/...",
  "videoUrl": "https://www.youtube.com/embed/..."
}
```

### Campos que la app deberia considerar como opcionales

No todos los productos traen todos los campos. La app debe tratar como opcionales:

- `price`
- `sale_price`
- `variants`
- `heroBanners`
- `image`
- `image_full`
- `image_benefits`
- `iconUrl`
- `videoUrl`
- `videoThumbnail`
- `videoImage`
- `appStoreUrl`
- `googlePlayUrl`
- `buyNowImage_variants`
- `telegram_link`
- `purchase_type`

## 3. Configuracion auxiliar de eSIM

### Endpoint

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/store/esim-config
```

### Respuesta observada

```json
{
  "sims_esim_cost": 5,
  "sims_esim_cost_minutos": 5,
  "simtim_esim_cost": 0.19
}
```

### Uso

Este endpoint sirve para reglas de precio o costo base relacionadas con eSIM.

## 4. Regiones y paises para filtros de productos SIM

### Listado de regiones

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/regions
```

En la verificacion actual este endpoint respondio:

```json
[]
```

La app debe tolerar lista vacia.

### Paises por region

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/regions/{regionId}
```

La web espera una forma parecida a esta:

```json
{
  "id": "1",
  "name": "Europa",
  "countries": [
    { "id": "34", "name": "España" },
    { "id": "39", "name": "Italia" }
  ]
}
```

## 5. Packs auxiliares de productos encriptados

Estos endpoints se usan en la web para mostrar packs de minutos y datos.

### Packs de minutos

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/tottoli/packs?perPage=50&page=1
```

### Packs de datos

```http
GET https://admin.encriptados.io/wp-json/encriptados/v3/tottoli/data-packs?perPage=50&page=1
```

### Uso

- no reemplazan el catalogo principal
- complementan pantallas de productos o recargas
- la app debe tratarlos como listas auxiliares

## Como resuelve hoy la web un producto por slug

Importante: la web no usa un endpoint backend tipo `/product-by-slug`.

El flujo real es este:

1. pide listados por categoria con `store/products`
2. normaliza el nombre a slug
3. compara contra el slug esperado
4. cuando encuentra match, pide el detalle por ID con `store/product/{id}`

Para la app eso significa que hay dos opciones sanas:

1. navegar siempre con `productId` y pedir detalle directo
2. si la app necesita abrir por slug, replicar la misma resolucion que usa la web

La opcion recomendada es usar `productId` como identificador estable.

## Como se consume hoy en el frontend `develop`

### Listados

La web llama:

```http
GET /encriptados/v3/store/products?category_id={alias}&lang={locale}
```

Filtros adicionales solo cuando aplican:

- `sim_country`
- `sim_region`
- `provider`

### Detalle

La web llama:

```http
GET /encriptados/v3/store/product/{id}?lang={locale}
```

### Busqueda

La busqueda de header no usa un endpoint search dedicado.

Hace esto:

1. descarga varias categorias con `store/products`
2. combina resultados
3. filtra localmente por nombre

Si la app necesita una busqueda remota, hoy no existe un endpoint dedicado documentado en esta revision.

## Recomendacion de integracion para la app

## Estrategia recomendada

1. Usar backend directo `https://admin.encriptados.io/wp-json/encriptados/v3`
2. Usar aliases de categoria en vez de IDs duros
3. Usar `productId` como llave principal de navegacion y cache
4. Tratar `price`, `sale_price` y `variants` como campos flexibles
5. Tolerar arrays vacios en filtros auxiliares como regiones
6. No asumir que todos los productos tienen el mismo shape visual

## Tipos sugeridos para la app

```ts
type ProductCategory = {
  id: number;
  name: string;
};

type ProductImage = {
  src: string;
};

type ProductCheck = {
  name: string;
};

type ProductFaq = {
  name: string;
  description: string;
};

type ProductVariant = {
  id: number;
  licensetime?: string | null;
  price?: number | string;
  sale_price?: number | string | null;
  sku?: string;
  image?: string;
  gb?: string;
  minutes?: number;
  days?: number;
  label?: string;
  currency?: string;
  purchase_url?: string;
  scope?: {
    type: string;
    code: string;
  };
};

type ProductItem = {
  id: number;
  name: string;
  description: string;
  activation: string;
  type_product: string;
  provider: string;
  licensetime: string;
  shipping: string;
  brand: string;
  sku: string;
  price: number | string | null;
  on_sale: boolean;
  sale_price: number | string | null;
  stock_quantity: number | string | null;
  category: ProductCategory;
  purchase_note: string;
  images: ProductImage[];
  checks?: ProductCheck[];
  faqs?: ProductFaq[];
  advantages?: Array<{ name: string; description: string; image: string }>;
  features?: Array<{ name: string; description: string; image: string }>;
  variants?: ProductVariant[];
  image?: string;
  image_full?: string;
  image_benefits?: string;
  iconUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoImage?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  telegram_link?: string;
  purchase_type?: string;
};

type ProductListResponse = {
  message: string;
  products: ProductItem[];
};
```

## Ejemplo de consumo en la app

```ts
const API_BASE = "https://admin.encriptados.io/wp-json/encriptados/v3";

async function getProducts(category: string, lang = "es") {
  const params = new URLSearchParams({
    category_id: category,
    lang,
  });

  const response = await fetch(`${API_BASE}/store/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Products API error: ${response.status}`);
  }

  return (await response.json()) as ProductListResponse;
}

async function getProductById(productId: number, lang = "es") {
  const response = await fetch(`${API_BASE}/store/product/${productId}?lang=${lang}`);

  if (!response.ok) {
    throw new Error(`Product detail API error: ${response.status}`);
  }

  return (await response.json()) as ProductItem;
}
```

## Conclusion

Si la app necesita consumir el mismo backend que la web usa hoy para productos, el camino correcto es este:

- backend directo `admin.encriptados.io`
- endpoint principal de lista: `/encriptados/v3/store/products`
- endpoint principal de detalle: `/encriptados/v3/store/product/{id}`
- endpoints auxiliares: `/store/esim-config`, `/regions`, `/regions/{id}`, `/tottoli/packs`, `/tottoli/data-packs`

Con eso la app queda alineada con el mismo origen de datos que alimenta el catalogo del frontend `develop`.