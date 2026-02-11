# Guía de Contexto para IA — Implementación SEO Encriptados

> **Propósito:** Este documento proporciona a cualquier modelo de IA el contexto completo  
> necesario para implementar cada tarea SEO del plan maestro de forma incremental.  
> Cada sección es autónoma: la IA puede leer solo la tarea que necesita implementar.

---

## CONTEXTO GLOBAL DEL PROYECTO

### Stack Tecnológico
- **Framework:** Next.js 14.2.29 (App Router)
- **Lenguaje:** TypeScript 5.5.4
- **React:** 18
- **i18n:** next-intl ^3.20.0
- **Styling:** Tailwind CSS 3.4.1
- **Idiomas soportados:** `["en", "es", "fr", "it", "pt"]` — Default: `"es"`
- **Dominio producción:** Definido en `NEXT_PUBLIC_SITE_URL` (ej: `https://www.encriptados.io`)

### Estructura del proyecto (relevante para SEO)
```
src/app/
├── layout.tsx              ← Root layout (NO tiene metadata, NO tiene metadataBase)
├── globals.css
├── fonts/
├── [locale]/
│   ├── layout.tsx          ← Locale layout (NO tiene metadata)
│   ├── page.tsx            ← Homepage (NO tiene metadata)
│   ├── about-us/page.tsx
│   ├── apps/
│   │   ├── layout.tsx
│   │   └── [slug]/
│   │       ├── layout.tsx  ← ✅ TIENE generateMetadata
│   │       └── page.tsx    ← ✅ TIENE generateMetadata (⚠️ DUPLICADO con layout)
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [postId]/page.tsx
│   ├── distributors/page.tsx
│   ├── encrypted-sim/page.tsx     ← "use client" (NO puede tener metadata)
│   ├── encrypted-test/page.tsx
│   ├── encrypted-test/[typeOfTest]/
│   ├── ira-sim/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── offers/page.tsx
│   ├── our-products/
│   │   ├── layout.tsx             ← "use client" (NO puede tener metadata)
│   │   └── [productId]/
│   │       ├── layout.tsx         ← "use client" (NO puede tener metadata)
│   │       └── page.tsx           ← ✅ TIENE generateMetadata
│   ├── router/
│   │   ├── layout.tsx             ← ✅ TIENE generateMetadata
│   │   └── page.tsx
│   ├── sim/[slug]/
│   │   └── layout.tsx             ← ✅ TIENE generateMetadata
│   ├── tim-sim/
│   │   ├── layout.tsx             ← ✅ TIENE generateMetadata
│   │   └── page.tsx
│   ├── where-to-find-us/page.tsx
│   └── ...más rutas
│
messages/
├── es.json     ← NO tiene sección "seo"
├── en.json     ← NO tiene sección "seo"
├── fr.json
├── it.json
└── pt.json

src/shared/
├── components/
│   ├── FAQ/FAQSection.tsx    ← Componente FAQ (sin JSON-LD)
│   └── ...
└── (NO existe seo/ ni JsonLd/)

public/
├── icons/        ← SVG de producto, NO hay favicon
├── images/
└── meta-image/   ← OG images organizadas por categoría
    ├── apps/
    ├── router/
    ├── sim-encriptados/
    ├── sim-tim/
    └── sistemas/
```

### Configuración i18n (src/i18n/routing.ts)
```typescript
export const routing = defineRouting({
  locales: ["en", "es", "fr", "it", "pt"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/about-us": { en: "/about-us", es: "/nosotros", fr: "/a-propos-de-nous", it: "/chi-siamo", pt: "/sobre-nos" },
    "/offers": { en: "/offers", es: "/ofertas", fr: "/offres", it: "/offerte", pt: "/ofertas" },
    "/encrypted-sim": { en: "/encrypted-sim", es: "/sim-encriptada", fr: "/sim-cryptee", it: "/sim-crittografata", pt: "/sim-encriptada" },
    // ... más rutas localizadas
  }
});
```

### Patrón de metadata EXISTENTE en el proyecto
Los archivos que ya tienen `generateMetadata` siguen este patrón:
```typescript
import { Metadata } from "next";

interface Props {
  params: { locale: string; slug?: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";
  // ... build metadata
  return {
    title: "...",
    description: "...",
    openGraph: { title, description, url, siteName: "Encriptados", images: [...], locale, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [...] },
    alternates: { canonical: productUrl },
  };
}
```

### Archivos de mensajes i18n — Estructura actual
```json
{
  "HeaderMenu": { ... },
  "FooterSection": { ... },
  "AboutUsPage": { ... },
  "OffersBanner": { ... },
  // ... secciones por componente
  // ⚠️ NO existe sección "seo" ni "metadata"
}
```

---

## INSTRUCCIONES GENERALES PARA LA IA

### Reglas de implementación:
1. **Siempre Server Components** para archivos con metadata. Si un page.tsx es `"use client"`, crear un wrapper server component o mover metadata a un layout.tsx padre server.
2. **Usar `getTranslations` de next-intl/server** para obtener traducciones en `generateMetadata`.
3. **No instalar librerías externas** para SEO. Next.js 14 tiene todo lo necesario nativamente.
4. **Seguir el patrón existente** del proyecto (ver arriba).
5. **URLs de OG images deben ser absolutas** — siempre prefixar con `baseUrl`.
6. **Mantener compatibilidad** con el middleware de auth y next-intl existente.
7. **Usar TypeScript** con tipos de Next.js (`Metadata`, `MetadataRoute.Robots`, etc.).
8. **Descripciones SEO** deben ser 150-160 caracteres. Títulos SEO 50-60 caracteres.

### Convenciones de nombres:
- Constantes SEO: `src/shared/seo/constants.ts`
- Helpers: `src/shared/seo/metadata.ts`
- JSON-LD components: `src/shared/components/JsonLd/[Schema]JsonLd.tsx`
- Traducciones SEO: `messages/[lang].json` → clave `"seo"` con sub-claves por página

---

## GUÍA DE IMPLEMENTACIÓN POR TAREA

---

### T-001: Crear constantes SEO globales

**Archivo a crear:** `src/shared/seo/constants.ts`

**Qué debe contener:**
```typescript
export const SEO_CONSTANTS = {
  siteName: "Encriptados",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.io",
  defaultLocale: "es" as const,
  locales: ["en", "es", "fr", "it", "pt"] as const,
  // Social
  twitterHandle: "@encriptados",  // Verificar handle real
  // Default images
  defaultOgImage: "/meta-image/default-og.png",
  defaultFavicon: "/favicon.ico",
  // Organization
  organizationName: "Encriptados",
  organizationUrl: "https://www.encriptados.io",
  organizationLogo: "/images/logo-encriptados.png", // Verificar ruta real
};

export type Locale = typeof SEO_CONSTANTS.locales[number];
```

**Notas para la IA:**
- Verificar si existe un logo de Encriptados en `public/images/` y usar esa ruta
- El `NEXT_PUBLIC_SITE_URL` ya se usa en los generateMetadata existentes
- No importar nada de next-intl aquí, solo constantes puras

---

### T-002: Crear helpers de metadata

**Archivo a crear:** `src/shared/seo/metadata.ts`

**Qué debe contener:**
```typescript
import { Metadata } from "next";
import { SEO_CONSTANTS } from "./constants";

// Construir alternates con hreflang para todos los idiomas
export function buildAlternates(path: string, currentLocale: string) {
  const languages: Record<string, string> = {};
  SEO_CONSTANTS.locales.forEach(locale => {
    languages[locale] = `${SEO_CONSTANTS.baseUrl}/${locale}${path}`;
  });
  return {
    canonical: `${SEO_CONSTANTS.baseUrl}/${currentLocale}${path}`,
    languages,
  };
}

// Construir OG image con URL absoluta
export function buildOgImage(imagePath: string, alt: string) {
  const url = imagePath.startsWith("http") 
    ? imagePath 
    : `${SEO_CONSTANTS.baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  return {
    url,
    width: 1200,
    height: 630,
    alt,
    type: "image/png" as const,
  };
}

// Template base de metadata
export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImage?: string;
  type?: "website" | "article";
}): Metadata {
  const { title, description, path, locale, ogImage, type = "website" } = opts;
  const url = `${SEO_CONSTANTS.baseUrl}/${locale}${path}`;
  const image = buildOgImage(ogImage || SEO_CONSTANTS.defaultOgImage, title);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SEO_CONSTANTS.siteName,
      images: [image],
      locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    alternates: buildAlternates(path, locale),
  };
}
```

**Notas para la IA:**
- Este helper simplifica la creación de metadata en cada página
- Los `buildAlternates` deben considerar los pathnames localizados de routing.ts
- Importar Metadata de "next", no de otro lugar

---

### T-003: Añadir metadataBase + metadata global en root layout

**Archivo a modificar:** `src/app/layout.tsx`

**Estado actual del archivo:**
```typescript
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/shared/components/Providers";

// ... fonts ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
```

**Qué añadir:**
1. Importar `Metadata` de `"next"`
2. Exportar `metadata` con `metadataBase`, título default, descripción, íconos, manifest
3. **NO cambiar** lang="en" aquí (lo maneja next-intl a nivel locale)

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.io"),
  title: {
    default: "Encriptados — Comunicaciones Seguras y Encriptadas",
    template: "%s | Encriptados",
  },
  description: "Plataforma líder en comunicaciones encriptadas. Smartphones, SIM cards, aplicaciones y sistemas operativos seguros para proteger tu privacidad.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};
```

**Notas para la IA:**
- `metadataBase` es CRÍTICO: sin esto, las OG images con rutas relativas se rompen
- El `title.template` hace que cualquier página hija solo necesite definir `title: "Mi Página"` y Next.js automáticamente genera `"Mi Página | Encriptados"`
- No mover nada de la estructura existente del layout

---

### T-004: Crear robots.ts

**Archivo a crear:** `src/app/robots.ts`

**Qué debe contener:**
```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.io";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/api/",
          "/login",
          "/test",
          "/test-design-system",
          "/test-payment-modal",
          "/products-test",
          "/identity-verification",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

**Notas para la IA:**
- No indexar rutas de dashboard (protegidas), API, login, ni páginas de test
- El archivo genera automáticamente `/robots.txt` — Next.js lo sirve como ruta
- Tipo de retorno: `MetadataRoute.Robots`

---

### T-005: Crear sitemap.ts dinámico

**Archivo a crear:** `src/app/sitemap.ts`

**Qué debe contener:**
- Listar TODAS las rutas públicas del sitio
- Para cada ruta, generar entradas para TODOS los idiomas (es, en, fr, it, pt) 
- Incluir rutas dinámicas (productos, apps, blog posts) si es posible hacer fetch
- `lastModified`, `changeFrequency`, `priority`

**Rutas públicas estáticas a incluir:**
```
/                     → homepage (priority: 1.0)
/about-us             → (priority: 0.7)
/offers               → (priority: 0.8)
/blog                 → (priority: 0.8)
/encrypted-sim        → (priority: 0.9)
/tim-sim              → (priority: 0.9)
/ira-sim              → (priority: 0.9)
/router               → (priority: 0.8)
/distributors         → (priority: 0.6)
/where-to-find-us     → (priority: 0.5)
/where-to-find-encrypted → (priority: 0.5)
/encrypted-test       → (priority: 0.6)
/news                 → (priority: 0.7)
/ambassadors          → (priority: 0.5)
/become-encrypted-partner → (priority: 0.5)
/fast-delivery        → (priority: 0.5)
/deliveries           → (priority: 0.5)
/encrypted-phones-distributors → (priority: 0.5)
/security-test        → (priority: 0.6)
```

**Rutas dinámicas a incluir (si se puede fetch):**
```
/apps/[slug]              → Cada app de producto
/our-products/[productId] → Cada producto
/sim/[slug]               → Cada SIM
/blog/[postId]            → Cada blog post
/encrypted-test/[typeOfTest] → Cada tipo de test
```

**Notas para la IA:**
- Usar `MetadataRoute.Sitemap` como tipo de retorno
- Para las rutas localizadas, consultar `routing.pathnames` en `src/i18n/routing.ts`
- NO incluir rutas protegidas (/dashboard, /login)
- Considerar que las rutas tienen paths diferentes por idioma (ej: `/es/nosotros` vs `/en/about-us`)
- Si no se puede hacer fetch de productos dinámicos, al menos incluir las rutas estáticas

---

### T-006: Crear favicon.ico + icon.png + apple-icon.png

**Archivos a crear:**
- `src/app/favicon.ico` (32x32)
- `src/app/icon.png` (192x192) — o `icon.tsx` para generación dinámica
- `src/app/apple-icon.png` (180x180)

**Notas para la IA:**
- Se necesita el asset real del logotipo de Encriptados
- Buscar en `public/images/` si hay algún logo que se pueda usar
- Si no hay asset, crear un placeholder SVG/PNG simple con las iniciales "E"
- Next.js detecta estos archivos automáticamente por convención

---

### T-007: Crear manifest.ts

**Archivo a crear:** `src/app/manifest.ts`

**Qué debe contener:**
```typescript
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Encriptados",
    short_name: "Encriptados",
    description: "Comunicaciones seguras y encriptadas",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

**Notas para la IA:**
- Encriptados usa tema oscuro (fondo negro), ajustar `background_color` y `theme_color`
- Verificar colores del brand en `tailwind.config.ts` (buscar colores primary/brand)

---

### T-008: Crear not-found.tsx

**Archivos a crear:**
1. `src/app/not-found.tsx` — Para rutas fuera de locales
2. `src/app/[locale]/not-found.tsx` — Para rutas dentro de locales

**Qué debe contener:**
- Mensaje amigable "Página no encontrada"
- Link al homepage
- Links a páginas principales (productos, blog, contacto)
- Mismo header/footer del sitio (si está en locale)
- Metadata con `title: "404 - Página no encontrada"` y `robots: { index: false }`

**Notas para la IA:**
- El not-found.tsx a nivel de locale puede usar traducciones
- El not-found.tsx raíz es más básico (sin i18n context)
- Mantener el branding de Encriptados (tema oscuro)

---

### T-009: Añadir sección "seo" a archivos de mensajes i18n

**Archivos a modificar:** `messages/es.json`, `messages/en.json`, `messages/fr.json`, `messages/it.json`, `messages/pt.json`

**Estructura a añadir al final de cada archivo JSON:**

```json
{
  "seo": {
    "home": {
      "title": "Comunicaciones Seguras y Encriptadas",
      "description": "Plataforma líder en smartphones encriptados, SIM cards seguras, apps de privacidad y sistemas operativos protegidos. Tu comunicación, completamente privada."
    },
    "aboutUs": {
      "title": "Sobre Nosotros",
      "description": "Conoce a Encriptados: líderes en soluciones de comunicación encriptada y privacidad digital desde [año]."
    },
    "offers": {
      "title": "Ofertas en Productos Encriptados",
      "description": "Descubre las mejores ofertas en smartphones encriptados, SIM cards seguras y aplicaciones de privacidad."
    },
    "blog": {
      "title": "Blog de Seguridad y Privacidad",
      "description": "Artículos, guías y noticias sobre seguridad digital, privacidad y comunicaciones encriptadas."
    },
    "encryptedSim": {
      "title": "SIM Card Encriptada",
      "description": "SIM cards encriptadas para comunicaciones seguras. Protege tus llamadas, mensajes y datos con tecnología de encriptación avanzada."
    },
    "iraSim": {
      "title": "IRA SIM - Conectividad Segura",
      "description": "IRA SIM para comunicaciones seguras y privadas. Planes de datos encriptados con cobertura global."
    },
    "timSim": {
      "title": "TIM SIM - Comunicaciones Privadas",
      "description": "TIM SIM con encriptación de datos. Planes seguros para proteger tus comunicaciones móviles."
    },
    "router": {
      "title": "Camaleón Router - Internet Seguro",
      "description": "Router Camaleón con encriptación avanzada. Protege toda tu red con un dispositivo de seguridad de última generación."
    },
    "distributors": {
      "title": "Distribuidores Autorizados",
      "description": "Encuentra distribuidores autorizados de productos Encriptados cerca de ti. Red global de distribución."
    },
    "whereToFindUs": {
      "title": "Dónde Encontrarnos",
      "description": "Localiza puntos de venta y distribuidores de Encriptados en tu ciudad o país."
    },
    "encryptedTest": {
      "title": "Test de Seguridad Encriptada",
      "description": "Prueba la seguridad de nuestras soluciones de encriptación. Verifica la protección de tus comunicaciones."
    },
    "news": {
      "title": "Noticias de Seguridad Digital",
      "description": "Últimas noticias sobre seguridad digital, privacidad y tecnología de encriptación."
    },
    "ambassadors": {
      "title": "Programa de Embajadores",
      "description": "Únete al programa de embajadores de Encriptados. Promueve la privacidad digital y obtén beneficios exclusivos."
    },
    "becomePartner": {
      "title": "Sé Socio de Encriptados",
      "description": "Conviértete en socio distribuidor de Encriptados. Oportunidad de negocio en seguridad y privacidad."
    },
    "fastDelivery": {
      "title": "Entrega Rápida",
      "description": "Envío rápido y seguro de productos encriptados a tu puerta. Entrega express disponible."
    },
    "deliveries": {
      "title": "Estado de Entregas",
      "description": "Consulta el estado de tus entregas de productos Encriptados."
    },
    "securityTest": {
      "title": "Test de Seguridad",
      "description": "Evalúa el nivel de seguridad de tus comunicaciones con nuestro test especializado."
    },
    "notFound": {
      "title": "Página no encontrada",
      "description": "La página que buscas no existe o ha sido movida.",
      "heading": "404 - Página no encontrada",
      "message": "Lo sentimos, la página que buscas no existe o ha sido movida.",
      "backHome": "Volver al inicio",
      "browseProducts": "Ver productos",
      "contactUs": "Contáctanos"
    }
  }
}
```

**Notas para la IA:**
- Crear las traducciones equivalentes en TODOS los idiomas (en, fr, it, pt)
- Los títulos SEO deben tener 50-60 caracteres máximo
- Las descripciones SEO deben tener 150-160 caracteres máximo
- Las traducciones deben ser naturales en cada idioma, NO traducciones literales
- Añadir al FINAL del objeto JSON existente, antes del cierre `}`
- IMPORTANTE: NO modificar las claves existentes, solo añadir la nueva sección "seo"

---

### T-010: Metadata template + hreflang en locale layout

**Archivo a modificar:** `src/app/[locale]/layout.tsx`

**Estado actual:** No tiene metadata, es server component (sin "use client")

**Qué añadir:**
1. `generateMetadata` con `title.template` localizado
2. `alternates.languages` para hreflang
3. `openGraph.locale` y `openGraph.alternateLocales`

```typescript
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
  params: { locale: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "seo.home" });
  
  const alternateLocales = ["en", "es", "fr", "it", "pt"].filter(l => l !== locale);
  
  return {
    title: {
      template: `%s | Encriptados`,
      default: t("title"),
    },
    description: t("description"),
    openGraph: {
      locale,
      alternateLocales,
      siteName: "Encriptados",
    },
  };
}
```

**Notas para la IA:**
- Este layout YA tiene imports y providers. Solo AÑADIR la export de generateMetadata
- NO cambiar el componente LocaleLayout ni sus imports existentes
- El `title.template` aquí se hereda por TODAS las páginas hijas

---

### T-011: Metadata para homepage

**Archivo a modificar:** `src/app/[locale]/page.tsx`

**Estado actual:**
```typescript
import OurProductsPage from "./our-products/OurProductsPage";
import { DownloadAppContainer } from "@/shared/components/DownloadApp/DownloadAppContainer";

export default function HomePage() {
  return (
    <>
      <DownloadAppContainer />
      <OurProductsPage />
    </>
  );
}
```

**Qué añadir:** `generateMetadata` con título, descripción, OG image del homepage

**Notas para la IA:**
- La homepage muestra productos — usar metadata que refleje eso
- Prioridad de OG image: buscar si existe alguna imagen general en `/public/meta-image/`
- El título NO debe incluir "| Encriptados" porque el template del layout ya lo añade

---

### T-012 a T-015: Componentes JSON-LD

**Archivos a crear:**
- `src/shared/components/JsonLd/OrganizationJsonLd.tsx`
- `src/shared/components/JsonLd/WebSiteJsonLd.tsx`
- `src/shared/components/JsonLd/BreadcrumbJsonLd.tsx`
- `src/shared/components/JsonLd/ProductJsonLd.tsx`
- `src/shared/components/JsonLd/FAQJsonLd.tsx`
- `src/shared/components/JsonLd/ArticleJsonLd.tsx`

**Patrón:**
```typescript
// Server Component — SIN "use client"
interface Props {
  // props específicas del schema
}

export default function [Schema]JsonLd({ ...props }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "[SchemaType]",
    // ... campos
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

**OrganizationJsonLd:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Encriptados",
  "url": "https://www.encriptados.io",
  "logo": "https://www.encriptados.io/images/logo.png",
  "sameAs": ["social media URLs"],
  "contactPoint": { "@type": "ContactPoint", "contactType": "customer service" }
}
```

**WebSiteJsonLd:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Encriptados",
  "url": "https://www.encriptados.io",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.encriptados.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**ProductJsonLd — Props interface:**
```typescript
interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  brand?: string;
  price?: string;
  currency?: string;
  availability?: "InStock" | "OutOfStock";
  sku?: string;
}
```

**FAQJsonLd — Props interface:**
```typescript
interface FAQJsonLdProps {
  faqs: Array<{ question: string; answer: string }>;
}
```

**Notas para la IA:**
- TODOS deben ser Server Components (sin "use client")
- Usar `dangerouslySetInnerHTML` con `JSON.stringify` — patrón estándar Next.js
- OrganizationJsonLd y WebSiteJsonLd se inyectan en `src/app/[locale]/layout.tsx`
- ProductJsonLd se inyecta en las páginas de producto individual
- FAQJsonLd se integra con el componente FAQSection existente
- Validar con https://validator.schema.org/ mentalmente

---

### T-016 a T-032: Metadata para páginas estáticas (PATRÓN GENÉRICO)

**Para cada página sin metadata, seguir este patrón:**

1. **Si el page.tsx es Server Component** (sin "use client"):
   - Añadir `generateMetadata` directamente al archivo
   
2. **Si el page.tsx es Client Component** (con "use client"):
   - Opción A: Crear/modificar un `layout.tsx` padre que sea Server Component y poner ahí el metadata
   - Opción B: Extraer el "use client" a un componente hijo y dejar page.tsx como Server Component

**Template de generateMetadata para página estática:**
```typescript
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/shared/seo/metadata";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "seo.pageName" });
  
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/page-path",
    locale,
    ogImage: "/meta-image/specific-image.png", // si existe
  });
}
```

**Notas para la IA:**
- El `namespace` debe coincidir con la clave en messages/*.json (ej: `"seo.aboutUs"`)
- El `path` debe ser la ruta en INGLÉS (el helper maneja la localización)
- Verificar si existe OG image en `public/meta-image/` para la página
- Si no hay image específica, omitir `ogImage` (el helper usa el default)

---

### T-033: JSON-LD Product schema component

**Archivo a crear:** `src/shared/components/JsonLd/ProductJsonLd.tsx`

**Contexto de datos de producto en el proyecto:**
Los productos se obtienen via `getProductById(id, locale)` del servicio en `src/features/products/services`. Un producto tiene:
- `name`, `description`, `price`, `regular_price`, `sale_price`
- `images: [{ src, alt }]`
- `sku`, `provider`, `type_product`
- `categories`, `slug`

**La IA debe:**
- Crear el componente ProductJsonLd
- Mapear campos del producto al schema Product de schema.org
- Incluir Offer schema con precio y disponibilidad
- Incluir Brand schema si hay provider

---

### T-034 + T-035: FAQ JSON-LD + Integración con FAQSection

**Contexto:** El componente `FAQSection.tsx` en `src/shared/components/FAQ/` ya recibe:
```typescript
interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}
interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  // ... más props de presentación
}
```

**La IA debe:**
1. Crear `FAQJsonLd.tsx` que reciba `faqs: FAQItem[]` y genere el schema
2. Modificar `FAQSection.tsx` para renderizar `<FAQJsonLd>` al inicio del componente
3. El FAQSection es usado en múltiples páginas — al inyectar ahí, TODAS las FAQs obtienen schema automáticamente

---

### T-049 a T-053: Migración WordPress (Redirecciones)

**Contexto:** El sitio WordPress en `encriptados.io` tiene tráfico consolidado. Al cambiar a Next.js se deben redirigir TODAS las URLs viejas.

**Paso 1 (T-049):** El equipo debe proveer la lista de URLs de WordPress. Se puede obtener de:
- Google Search Console → Páginas indexadas
- Sitemap XML de WordPress: `https://encriptados.io/sitemap.xml`
- Herramienta como Screaming Frog

**Paso 2 (T-050):** Crear documento de mapeo URL vieja → URL nueva

**Paso 3 (T-051):** Implementar en `next.config.mjs` → función `redirects()`:
```javascript
async redirects() {
  return [
    // URLs existentes ya definidas ...
    // Nuevas redirecciones WordPress:
    { source: "/old-wordpress-page/", destination: "/es/new-nextjs-page", permanent: true },
    // ...
  ];
}
```

**Paso 4 (T-052):** Catch-all en middleware — si una URL no matchea ninguna ruta conocida, redirigir al homepage del idioma detectado:
```typescript
// En middleware.ts, antes del intlMiddleware:
if (isWordPressLegacyUrl(pathname)) {
  return NextResponse.redirect(new URL("/", request.url), 302);
}
```

**Notas para la IA:**
- Redirecciones exactas deben ser `permanent: true` (301)
- El catch-all debe ser `302` (temporal) hasta confirmar que funciona
- NO redirigir rutas que ya existen en Next.js
- Considerar que WordPress usa slugs diferentes (ej: `/celulares-encriptados/` vs `/es/our-products`)
- Las redirecciones de WordPress suelen tener trailing slash `/`

---

## CHECKLIST DE VALIDACIÓN POST-IMPLEMENTACIÓN

Después de implementar cada fase, verificar:

### Fase 0:
- [ ] `curl -I https://dominio.com/robots.txt` → 200 OK
- [ ] `curl -I https://dominio.com/sitemap.xml` → 200 OK
- [ ] `curl -I https://dominio.com/favicon.ico` → 200 OK
- [ ] `curl -I https://dominio.com/manifest.json` → 200 OK
- [ ] View Source de homepage → tiene `<title>` y `<meta name="description">`
- [ ] View Source de homepage → tiene `<link rel="canonical">`

### Fase 1:
- [ ] TODAS las páginas públicas tienen `<title>` único
- [ ] TODAS las páginas tienen `<meta name="description">`
- [ ] TODAS las páginas tienen `<meta property="og:*">`
- [ ] TODAS las páginas tienen `<meta name="twitter:*">`
- [ ] Revisar con Facebook Sharing Debugger
- [ ] Revisar con Twitter Card Validator

### Fase 2-3:
- [ ] JSON-LD visible en View Source de homepage (Organization + WebSite)
- [ ] JSON-LD Product en páginas de producto
- [ ] JSON-LD FAQ en páginas con preguntas frecuentes
- [ ] Validar con Google Rich Results Test

### Fase 5:
- [ ] 0 errores 404 para URLs importantes de WordPress
- [ ] Google Search Console → Cobertura sin errores nuevos
- [ ] Herramienta de redirecciones: todas retornan 301

---

## RECURSOS ÚTILES

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js SEO Files Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Google Search Console](https://search.google.com/search-console)
