# 📦 API de Productos - Documentación Completa

> ⚠️ **NOTA:** Para la estructura completa y actualizada de la página de producto, ver:
> **[PRODUCTO-ESTRUCTURA-COMPLETA.md](./PRODUCTO-ESTRUCTURA-COMPLETA.md)**

## 🌐 Base URL

```
https://encriptados.es/wp-json/encriptados/v1
```

---

## 📋 Endpoints Disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/products/{id}?lang={lang}` | GET | Obtener producto por ID |
| `/products/by-category-language?category_id={id}&lang={lang}` | GET | Listar productos por categoría |

---

## 🏷️ Categorías

| ID | Nombre | Descripción |
|----|--------|-------------|
| **38** | Apps | Aplicaciones de comunicación encriptada |
| **35** | Software | Software de seguridad y MDM |
| **36** | Routers | Router Camaleón |
| **40** | SIM | Tarjetas SIM encriptadas |

---

# 📊 Estructura de Respuesta por Categoría

---

## 1️⃣ CATEGORÍA 38: APPS

### Endpoint
```
GET /products/{id}?lang=es
```

### Ejemplo: Silent Phone (ID: 122)

```json
{
  "id": 122,
  "name": "Silent Phone",
  "description": "Es una app diseñada por las mejores mentes en tecnología móvil...",
  
  "checks": [
    { "name": "Llamadas cifradas" },
    { "name": "Sin permisos de ubicación" },
    { "name": "Mensajes temporizados" }
  ],
  
  "licensetime": "1",
  "price": "59",
  "on_sale": false,
  "sale_price": "",
  
  "category": {
    "id": 38,
    "name": "Apps"
  },
  
  "images": [
    { "src": "https://encriptados.es/wp-content/uploads/2025/03/Silent-Circle-Hero-Thumbnail-producto.jpg" }
  ],
  "image": "https://encriptados.es/wp-content/uploads/2025/03/Silent-Circle-Hero-Thumbnail-producto-1024x616.jpg",
  "image_full": "https://encriptados.es/wp-content/uploads/2025/03/Silent-Circle-Hero-Thumbnail-producto.jpg",
  
  "variants": [
    {
      "id": 59801,
      "licensetime": "3",
      "price": 59,
      "sku": "SILENT-CIRCLE-3",
      "image": "https://..."
    },
    {
      "id": 59803,
      "licensetime": "6",
      "price": 99,
      "sku": "SILENT-CIRCLE-6",
      "image": "https://..."
    }
  ],
  
  "features": [
    {
      "name": "Construido sobre un protocolo fundamentalmente diferente",
      "description": "Cuando dos usuarios de Silent Phone...",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/icon_slide-..."
    }
  ],
  
  "advantages": [
    {
      "name": "Chat",
      "description": "Los mensajes se eliminan automáticamente...",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/Encriptados_Silent_Circle_Chat_01..."
    }
  ],
  
  "faqs": [
    {
      "name": "¿Qué tan segura es la aplicación Silent Phone?",
      "description": "Silent Phone es una aplicación de mensajería encriptada..."
    }
  ]
}
```

### Productos Disponibles (Categoría 38)

| ID | Nombre | Variantes | Estado |
|----|--------|-----------|--------|
| 122 | Silent Phone | ✅ 2 variantes (3, 6 meses) | ✅ Completo |
| 127 | VaultChat | ✅ Variantes | ✅ Completo |
| 133 | Salt App | ✅ Variantes | ✅ Completo |
| 134 | VNC Lagoon | ✅ Variantes | ✅ Completo |
| 135 | Threema Work | ✅ Variantes | ✅ Completo |
| 136 | Threema | ✅ Variantes | ✅ Completo |
| 137 | Nord VPN | ✅ Variantes | ✅ Completo |
| 177 | Armadillo Chat | ✅ Variantes | ✅ Completo |

---

## 2️⃣ CATEGORÍA 35: SOFTWARE

### Ejemplo: Secure MDM iPhone (ID: 168)

```json
{
  "id": 168,
  "name": "Secure MDM iPhone",
  "description": "Blinda con el mayor grado de seguridad tu iPhone",
  
  "checks": [
    { "name": "Cifrado de datos" },
    { "name": "Borrado remoto" },
    { "name": "Bloqueo por USB" }
  ],
  
  "licensetime": "6",
  "price": "600",
  "on_sale": true,
  "sale_price": "600",
  
  "variants": [],  // ⚠️ SIN VARIANTES - Usar licensetime + price
  
  "features": [
    {
      "name": "",  // ⚠️ Sin título
      "description": "Protege la integridad de su información...",
      "image": ""  // ⚠️ Sin imagen
    }
  ],
  
  "advantages": [
    {
      "name": "",  // ⚠️ Sin título
      "description": "Bloqueo de redes inalámbricas...",
      "image": ""  // ⚠️ Sin imagen
    }
  ],
  
  "faqs": [
    {
      "name": "¿Qué es un MDM?",
      "description": "El MDM quiere decir La gestión de dispositivos móviles..."
    }
  ]
}
```

### Productos Disponibles (Categoría 35)

| ID | Nombre | Variantes | Datos Faltantes |
|----|--------|-----------|-----------------|
| 139 | Cryptcom | ❓ | Verificar |
| 142 | ChatMail | ❓ | Verificar |
| 148 | VaultChat | ❓ | Verificar |
| 151 | Renati | ❓ | Verificar |
| 168 | Secure MDM iPhone | ❌ Sin variantes | features sin name, sin images |
| 169 | Secure MDM Android | ❌ Sin variantes | features sin name, sin images |
| 174 | SecureCrypt | ✅ 3 variantes | ✅ |
| 180 | Armadillo | ❓ | Verificar |
| 182 | Ultra X | ✅ 3 variantes | ✅ |
| 188 | Intact Phone | ✅ 3 variantes | ✅ |
| 233 | DEC Secure | ✅ 2 variantes | ✅ |

---

## 3️⃣ CATEGORÍA 36: ROUTER

### Ejemplo: Camaleón Router (ID: 59747)

```json
{
  "id": 59747,
  "name": "Camaleón Router",
  "description": "El Router Camaleón es la solución ideal para quienes buscan privacidad total...",
  
  "checks": [
    { "name": "Cambio de IMEI dinámico" },
    { "name": "Doble VPN" },
    { "name": "Conexión segura" }
  ],
  
  "licensetime": "0",
  "price": "750",
  
  "variants": [],  // ⚠️ SIN VARIANTES - Producto único
  
  "features": [
    {
      "name": "Cambio de IMEI Dinámico",
      "description": "Esta función te permite cambiar el número IMEI...",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/..."  // ✅ Con imagen
    }
  ],
  
  "advantages": [
    {
      "name": "Múltiples operadores de Red",
      "description": "El router se conecta a una SIM TIM...",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/..."  // ✅ Con imagen
    }
  ],
  
  "faqs": [
    {
      "name": "¿Qué es el malware Pegasus?",
      "description": "Pegasus es un software espía..."
    }
  ],
  
  "image": "https://encriptados.es/wp-content/uploads/2025/07/Camaleon-Modem-1024x616.jpg",
  "image_full": "https://encriptados.es/wp-content/uploads/2025/07/Camaleon-Modem.jpg"
}
```

### Productos Disponibles (Categoría 36)

| ID | Nombre | Variantes | Estado |
|----|--------|-----------|--------|
| 59747 | Camaleón Router | ❌ Sin variantes (producto único) | ✅ Datos completos |

---

# 🔄 Mapeo API → Página de Producto

## Componentes y Fuente de Datos

| Componente UI | Campo API | Transformación |
|---------------|-----------|----------------|
| **HeroBanner** | `image_full` o `images[0].src` | Usar imagen de API o fallback local |
| **ProductSection - Título** | `name` | Directo |
| **ProductSection - Descripción** | `description` | Directo |
| **ProductSection - Features (checks)** | `checks[].name` | Array de strings |
| **ProductSection - Precio** | `variants[selected].price` o `price` | Formatear como `$XX USD` |
| **ProductSection - Radio Options** | `variants[].licensetime` | Formatear como `Licencia X Meses` |
| **ProductFeaturesGrid** | `features[]` | `{ image, title: name, description }` |
| **ProductBenefitsGrid** | `advantages[]` | `{ icon: image, title: name, description }` |
| **HeroVideoSection** | ❌ No viene de API | Configuración estática local |
| **FAQSection** | `faqs[]` | `{ question: name, answer: description }` |

---

## Lógica de Variantes y Precios

```typescript
/**
 * Transforma variantes a planes de licencia
 * Si no hay variantes, usa licensetime y price del producto principal
 */
function transformVariantsToPlans(variants: any[], product?: ProductById): LicensePlan[] {
  // Si hay variantes, usarlas
  if (variants && variants.length > 0) {
    return variants.map(variant => ({
      label: `Licencia ${variant.licensetime} ${Number(variant.licensetime) === 1 ? 'Mes' : 'Meses'}`,
      value: String(variant.licensetime),
      price: Number(variant.price),
      variantId: variant.id,
      sku: variant.sku || "",
    }));
  }
  
  // Si NO hay variantes, usar licensetime y price del producto principal
  if (product) {
    const licensetime = product.licensetime || "1";
    const price = Number(product.price) || 0;
    const licenseLabel = licensetime === "0" || licensetime === "Única" 
      ? "Única" 
      : `${licensetime} ${Number(licensetime) === 1 ? 'Mes' : 'Meses'}`;
    
    return [{
      label: `Licencia ${licenseLabel}`,
      value: licensetime,
      price: price,           // ← Usa el precio del producto
      variantId: product.id,
      sku: product.sku || "",
    }];
  }
  
  // Fallback
  return [{ label: "Licencia Única", value: "1", price: 0, variantId: 0, sku: "" }];
}

// Ejemplo de uso:
const plans = transformVariantsToPlans(product.variants, product);
// VNC Lagoon (sin variantes): [{ label: "Licencia 12 Meses", price: 180, ... }]
// Silent Circle (con variantes): [{ label: "Licencia 3 Meses", price: 59 }, { label: "Licencia 6 Meses", price: 99 }]
```

### Casos de Ejemplo

| Producto | Variantes | licensetime | price | Resultado |
|----------|-----------|-------------|-------|-----------|
| Silent Circle | ✅ 2 variantes | - | - | `[{3 meses, $59}, {6 meses, $99}]` |
| VNC Lagoon | ❌ Vacío | "12" | "180" | `[{12 Meses, $180}]` |
| Camaleón Router | ❌ Vacío | "0" | "750" | `[{Única, $750}]` |
| Secure MDM iPhone | ❌ Vacío | "6" | "600" | `[{6 Meses, $600}]` |

---

# ⚠️ Datos Faltantes por Producto

## Campos que DEBEN venir de la API pero están vacíos/faltantes:

### Categoría 35 (Software)

| Producto | Campo | Problema |
|----------|-------|----------|
| Secure MDM iPhone | `features[].name` | Vacío `""` |
| Secure MDM iPhone | `features[].image` | Vacío `""` |
| Secure MDM iPhone | `advantages[].name` | Vacío `""` |
| Secure MDM iPhone | `advantages[].image` | Vacío `""` |
| Secure MDM Android | (mismos problemas) | |

### Campos NO disponibles en API (requieren configuración local):

| Campo | Descripción | Solución |
|-------|-------------|----------|
| `heroBanners.desktop` | Banner hero desktop | Configurar en `productConfig.ts` |
| `heroBanners.tablet` | Banner hero tablet | Configurar en `productConfig.ts` |
| `heroBanners.mobile` | Banner hero mobile | Configurar en `productConfig.ts` |
| `videoUrl` | URL embed YouTube | Configurar en `productConfig.ts` |
| `appStoreUrl` | URL App Store | Configurar en `productConfig.ts` |
| `googlePlayUrl` | URL Google Play | Configurar en `productConfig.ts` |
| `benefitIcon` | Icono fallback beneficios | Configurar en `productConfig.ts` |

---

# 📁 Estructura de Configuración Local

Para cada producto se necesita en `productConfig.ts`:

```typescript
{
  slug: "silent-circle",
  productId: 122,
  categoryId: 38,
  templateType: "app",
  
  // Imágenes locales (NO vienen de API)
  heroBanners: {
    desktop: "/images/apps/silent-circle/hero-desktop.png",
    tablet: "/images/apps/silent-circle/hero-tablet.png",
    mobile: "/images/apps/silent-circle/hero-mobile.jpg",
  },
  productImage: "/images/apps/silent-circle/banner.png",
  iconUrl: "/images/apps/silent-circle/logo.png",
  benefitIcon: "/images/apps/silent-circle/icono.png",
  
  // Video (NO viene de API)
  videoUrl: "https://www.youtube.com/embed/X9iE-f8briY",
  videoTitle: "Silent Phone - Comunicación segura",
  
  // URLs de tiendas (NO vienen de API)
  appStoreUrl: "https://apps.apple.com/app/silent-phone",
  googlePlayUrl: "https://play.google.com/store/apps/details?id=...",
  
  // Productos relacionados
  relatedProducts: {
    simProductId: "508",
    esimProductId: "454",
  },
}
```

---

# 📊 Resumen de Completitud por Categoría

## Categoría 38 - Apps ✅

| Dato | Estado | Fuente |
|------|--------|--------|
| Nombre | ✅ | API |
| Descripción | ✅ | API |
| Checks | ✅ | API |
| Variantes | ✅ | API |
| Precios | ✅ | API |
| Features | ✅ | API (con imágenes) |
| Advantages | ✅ | API (con imágenes) |
| FAQs | ✅ | API |
| Banner Hero | ⚠️ | Local (usar `image_full` como fallback) |
| Video | ❌ | Local |

## Categoría 35 - Software ⚠️

| Dato | Estado | Fuente |
|------|--------|--------|
| Nombre | ✅ | API |
| Descripción | ✅ | API |
| Checks | ✅ | API |
| Variantes | ⚠️ | Algunos sin variantes |
| Precios | ✅ | API (`price` si no hay variantes) |
| Features | ⚠️ | API (algunos sin `name` ni `image`) |
| Advantages | ⚠️ | API (algunos sin `name` ni `image`) |
| FAQs | ✅ | API |
| Banner Hero | ❌ | Local |
| Video | ❌ | Local |

## Categoría 36 - Router ✅

| Dato | Estado | Fuente |
|------|--------|--------|
| Nombre | ✅ | API |
| Descripción | ✅ | API |
| Checks | ✅ | API |
| Variantes | ❌ | Sin variantes (producto único) |
| Precio | ✅ | API (`price`) |
| Features | ✅ | API (con imágenes) |
| Advantages | ✅ | API (con imágenes) |
| FAQs | ✅ | API |
| Banner Hero | ⚠️ | Local (usar `image_full` como fallback) |
| Video | ❌ | Local |

---

# 🔧 Recomendaciones

1. **Usar `image_full` de la API como fallback** para el banner hero cuando no exista imagen local.

2. **Completar datos en WordPress** para productos de Software que tienen `features` y `advantages` sin nombre ni imagen.

3. **Agregar campo `video_url` en WordPress** para que los videos también vengan de la API.

4. **Crear variantes para productos sin ellas** o manejar el caso donde `licensetime` del producto principal se usa como opción única.

5. **Normalizar estructura de datos** - Algunos productos tienen `advantages` con el campo `name` vacío, lo que afecta la visualización.

---

# 🌐 Sistema de Traducciones

## Textos de la API vs Textos Locales

### ✅ Textos que vienen de la API (ya traducidos según `lang`):
- `name` - Nombre del producto
- `description` - Descripción
- `checks[].name` - Features/checks
- `features[].name`, `features[].description` - Características
- `advantages[].name`, `advantages[].description` - Ventajas
- `faqs[].name`, `faqs[].description` - FAQs

### 🌐 Textos locales que usan `next-intl`:

Ubicación: `messages/{es|en|fr|it|pt}.json` → `appsShared.productTemplate`

| Clave | ES | EN |
|-------|----|----|
| `license` | Licencia | License |
| `licenseUnique` | Única | One-time |
| `priceFrom` | Desde | From |
| `priceConsult` | Consultar precio | Contact for price |
| `buyNow` | Comprar ahora | Buy now |
| `selectPlan` | Selecciona un plan | Select a plan |
| `downloadAppStore` | Descargar en App Store | Download on App Store |
| `downloadGooglePlay` | Descargar en Google Play | Download on Google Play |
| `faqTitle` | Preguntas frecuentes | Frequently asked questions |
| `featuresTitle` | Características principales | Main features |
| `securityFeaturesTitle` | Características de seguridad de {productName} | Security features of {productName} |
| `videoTitle` | {productName}, tu app de comunicación segura | {productName}, your secure communication app |
| `productNotAvailable` | Este producto aún no está disponible en el catálogo. | This product is not yet available in the catalog. |
| `productComingSoon` | Este producto será añadido próximamente. | This product will be added soon. |
| `productLoadError` | No se pudo cargar la información del producto. | Could not load product information. |

### Uso en Componentes

```typescript
// En page.tsx
import { useTranslations } from "next-intl";

const t = useTranslations("appsShared.productTemplate");
const tSim = useTranslations("appsShared");

// Uso
<ProductFeaturesGridUnified title={t("featuresTitle")} />
<FAQSectionUnified title={t("faqTitle")} />
<FeaturedProductsUnified
  left={{
    title: tSim("encryptedSim.title"),
    description: tSim("encryptedSim.description"),
    ...
  }}
/>
```

### Traducciones de Licencias

Las etiquetas de licencia se generan dinámicamente usando `LicenseTranslations`:

```typescript
const licenseTranslations: LicenseTranslations = {
  license: t("license"),     // "Licencia" / "License" / etc.
  month: "Mes",              // Singular según idioma
  months: "Meses",           // Plural según idioma
  unique: t("licenseUnique"), // "Única" / "One-time"
};

// Resultado: "Licencia 3 Meses", "License 6 Months", "Licence Unique"
```
