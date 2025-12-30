# 📦 Estructura Completa de Producto - API Backend

> **Fecha:** Diciembre 2024  
> **Versión:** 3.0  
> **Aplica a:** Apps (cat. 38), Software/Sistemas (cat. 35), Router (cat. 36)

---

## 🎯 RUTAS UNIFICADAS

| Categoría | Ruta | Ejemplos |
|-----------|------|----------|
| **Aplicaciones** | `/apps/[slug]` | `/apps/silent-circle`, `/apps/vault-chat` |
| **Sistemas** | `/apps/[slug]` | `/apps/secure-mdm-iphone`, `/apps/cryptcom` |
| **Router** | `/router` | `/router` (página única) |

---

## 📋 PRODUCTOS DISPONIBLES

### Aplicaciones (Categoría 38)
| Slug | Nombre | Product ID |
|------|--------|------------|
| `silent-circle` | Silent Phone | 122 |
| `vault-chat` | VaultChat | 127 |
| `armadillo` | Armadillo | 177 |
| `threema` | Threema | 136 |
| `threema-work` | ThreemaWork | 135 |
| `vnc-lagoon` | VNCLagoon | 134 |
| `salt` | Salt | 133 |
| `nord-vpn` | Nord VPN | 137 |

### Sistemas (Categoría 35)
| Slug | Nombre | Product ID |
|------|--------|------------|
| `secure-mdm-iphone` | Secure MDM iPhone | 168 |
| `secure-mdm-android` | Secure MDM Android | 169 |
| `cryptcom` | Cryptcom | 139 |
| `renati` | Renati | 151 |
| `chat-mail` | ChatMail | 142 |
| `armadillo-software` | Armadillo (Sistema) | 180 |
| `vault-chat-software` | VaultChat (Sistema) | 148 |
| `ultra-x` | Ultra X | 182 |
| `intact-phone` | Intact Phone | 188 |
| `dec-secure` | DEC Secure | 233 |
| `secure-crypt` | SecureCrypt | 174 |

### Router (Categoría 36)
| Slug | Nombre | Product ID |
|------|--------|------------|
| `router-camaleon` | Router Camaleón | 59747 |

---

## 📡 ENDPOINT

```
GET /wp-json/encriptados/v1/products/{productId}?lang={locale}
```

**Parámetros:**
- `productId`: ID del producto
- `lang`: Código de idioma (es, en, pt, fr, it)

---

## 📊 JSON COMPLETO DE EJEMPLO

```json
{
  "id": 122,
  "name": "Silent Phone",
  "description": "Es una app diseñada por las mejores mentes en tecnología móvil para proteger tus comunicaciones personales y empresariales con cifrado de extremo a extremo.",
  
  "category": {
    "id": 38,
    "name": "Apps"
  },
  
  "price": "59",
  "on_sale": true,
  "sale_price": "49",
  "licensetime": "6",
  
  "checks": [
    { "name": "Llamadas cifradas de extremo a extremo" },
    { "name": "Mensajes con autodestrucción" },
    { "name": "Sin permisos de ubicación" },
    { "name": "Protocolo SRTP con cifrado AES-256" },
    { "name": "Sin almacenamiento en servidores externos" }
  ],
  
  "variants": [
    { "id": 59801, "licensetime": "3", "price": 59, "sku": "SILENT-3M", "image": "" },
    { "id": 59803, "licensetime": "6", "price": 99, "sku": "SILENT-6M", "image": "" },
    { "id": 59805, "licensetime": "12", "price": 159, "sku": "SILENT-12M", "image": "" }
  ],
  
  "features": [
    {
      "name": "Protocolo de Cifrado Único",
      "description": "Silent Phone utiliza el protocolo ZRTP diseñado específicamente para comunicaciones de voz seguras.",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/feature-cifrado.png"
    },
    {
      "name": "Verificación de Identidad",
      "description": "Confirma la identidad de tus contactos mediante códigos de verificación únicos.",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/feature-verificacion.png"
    },
    {
      "name": "Sin Metadatos",
      "description": "A diferencia de otras apps, Silent Phone no almacena metadatos de tus comunicaciones.",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/feature-metadatos.png"
    }
  ],
  
  "title_benefits": "Asegura tus comunicaciones",
  
  "advantages": [
    {
      "name": "Chat Seguro",
      "description": "Los mensajes se eliminan automáticamente después del tiempo configurado.",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/icon-chat.png"
    },
    {
      "name": "Llamadas Cifradas",
      "description": "Realiza llamadas de voz y video con cifrado de extremo a extremo.",
      "image": ""
    },
    {
      "name": "Transferencia de Archivos",
      "description": "Comparte documentos, fotos y videos de forma segura.",
      "image": ""
    },
    {
      "name": "Conferencias Seguras",
      "description": "Crea salas de conferencia cifradas para reuniones empresariales.",
      "image": ""
    }
  ],
  
  "faqs": [
    {
      "name": "¿Qué tan segura es la aplicación Silent Phone?",
      "description": "Silent Phone es una de las aplicaciones más seguras del mercado. Utiliza cifrado de extremo a extremo con el protocolo ZRTP, diseñado por Phil Zimmermann, creador de PGP."
    },
    {
      "name": "¿Puedo usar Silent Phone en múltiples dispositivos?",
      "description": "Sí, puedes vincular tu cuenta a múltiples dispositivos. Sin embargo, las llamadas activas solo pueden mantenerse en un dispositivo a la vez."
    },
    {
      "name": "¿Silent Phone funciona sin conexión a internet?",
      "description": "No, Silent Phone requiere una conexión a internet (WiFi o datos móviles) para funcionar, ya que utiliza VoIP para las comunicaciones cifradas."
    },
    {
      "name": "¿Cómo verifico que mi llamada es segura?",
      "description": "Al iniciar una llamada, ambos participantes verán un código de verificación corto (SAS). Al comparar estos códigos verbalmente, pueden confirmar que nadie está interceptando."
    }
  ],
  
  "heroBanners": {
    "desktop": "https://encriptados.es/wp-content/uploads/2025/06/silent-hero-desktop.png",
    "tablet": "https://encriptados.es/wp-content/uploads/2025/06/silent-hero-tablet.png",
    "mobile": "https://encriptados.es/wp-content/uploads/2025/06/silent-hero-mobile.jpg"
  },
  
  "productImage": "https://encriptados.es/wp-content/uploads/2025/06/silent-phone-producto.png",
  
  "iconUrl": "https://encriptados.es/wp-content/uploads/2025/06/silent-logo.png",
  
  "image_benefits": "https://encriptados.es/wp-content/uploads/2025/06/celular-silent-logo.png",
  
  "videoUrl": "https://www.youtube.com/embed/X9iE-f8briY",
  
  "video_text": "Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023",
  
  "appStoreUrl": "https://apps.apple.com/app/silent-phone",
  
  "googlePlayUrl": "https://play.google.com/store/apps/details?id=com.silentcircle.silentphone",
  
  "image_full": "https://encriptados.es/wp-content/uploads/2025/06/silent-full-resolution.jpg",
  
  "images": [
    { "src": "https://encriptados.es/wp-content/uploads/2025/06/silent-thumb-1.jpg" },
    { "src": "https://encriptados.es/wp-content/uploads/2025/06/silent-thumb-2.jpg" }
  ]
}
```

---

## 📋 MAPEO CAMPOS → COMPONENTES

### Tabla de Campos

| Campo | Tipo | Componente | Requerido | Si no viene... |
|-------|------|------------|-----------|----------------|
| `id` | `number` | CardProduct, StickyBanner | ✅ Sí | Error |
| `name` | `string` | CardProduct, StickyBanner, Video | ✅ Sí | Error |
| `description` | `string` | CardProduct | ✅ Sí | No mostrar descripción |
| `category` | `object` | CardProduct | ✅ Sí | Error |
| `price` | `string` | CardProduct, StickyBanner | ✅ Sí | Mostrar "Consultar" |
| `on_sale` | `boolean` | CardProduct | ❌ No | `false` |
| `sale_price` | `string` | CardProduct | ❌ No | Usar `price` |
| `licensetime` | `string` | CardProduct | ❌ No | No mostrar tiempo |
| `checks[]` | `array` | CardProduct | ❌ No | **No mostrar lista** |
| `variants[]` | `array` | CardProduct | ❌ No | **No mostrar radios** |
| `features[]` | `array` | Features | ❌ No | **No mostrar sección** |
| `advantages[]` | `array` | Advantages | ❌ No | **No mostrar sección** |
| `advantages[].image` | `string` | Advantages | ❌ No | **Usar CheckCircle icon** |
| `title_benefits` | `string` | Advantages | ❌ No | Usar "Asegura tus comunicaciones" |
| `faqs[]` | `array` | FAQSection | ❌ No | **No mostrar sección** |
| `heroBanners` | `object` | BannerProduct | ❌ No | Usar `image_full` o `images[]` |
| `productImage` | `string` | CardProductBanner | ❌ No | Usar `images[0].src` |
| `iconUrl` | `string` | CardProductBanner, StickyBanner | ❌ No | **No mostrar logo** |
| `image_benefits` | `string` | Advantages | ❌ No | **No mostrar imagen lateral** |
| `videoUrl` | `string` | VideoSection | ❌ No | **No mostrar sección** |
| `video_text` | `string` | VideoSection | ❌ No | Usar "Conoce {name} en acción" |
| `appStoreUrl` | `string` | CardProductBanner | ❌ No | **No mostrar botón** |
| `googlePlayUrl` | `string` | CardProductBanner | ❌ No | **No mostrar botón** |
| `image_full` | `string` | BannerProduct (fallback) | ❌ No | Usar `images[]` |
| `images[]` | `array` | Varios (fallback) | ❌ No | Placeholder gris |

---

## 🧩 COMPONENTES Y LÓGICA DE RENDERIZADO

### 1️⃣ BannerProduct

```tsx
// Lógica de renderizado
const shouldShowBanner = 
  heroBanners?.desktop || 
  heroBanners?.mobile || 
  image_full || 
  images?.length > 0;

if (!shouldShowBanner) return null;

// Prioridad de imágenes:
// 1. heroBanners.desktop/tablet/mobile
// 2. image_full
// 3. images[0].src / images[1].src
```

**Campos usados:**
- `heroBanners.desktop` → Imagen desktop
- `heroBanners.tablet` → Imagen tablet  
- `heroBanners.mobile` → Imagen mobile
- `image_full` → Fallback
- `images[]` → Fallback final

---

### 2️⃣ CardProduct

```tsx
// Siempre se muestra (campos requeridos: id, name, category)

// Lógica condicional:
{checks?.length > 0 && (
  <ChecksList checks={checks} />
)}

{variants?.length > 0 ? (
  <VariantRadios variants={variants} />
) : (
  <SinglePrice price={price} licensetime={licensetime} />
)}

{on_sale && sale_price && (
  <SaleBadge originalPrice={price} salePrice={sale_price} />
)}
```

**Campos usados:**
- `name` → Título (requerido)
- `description` → Descripción
- `checks[].name` → Lista ✓ bullets
- `variants[]` → Radio buttons
- `price` → Precio base
- `on_sale` → Badge oferta
- `sale_price` → Precio oferta
- `id`, `category.id` → Modal compra

---

### 3️⃣ CardProductBanner

```tsx
// Lógica de renderizado
const imageToShow = productImage || images?.[0]?.src;
if (!imageToShow) return <PlaceholderImage />;

// Botones opcionales:
{appStoreUrl && <AppStoreButton url={appStoreUrl} />}
{googlePlayUrl && <GooglePlayButton url={googlePlayUrl} />}
{iconUrl && <LogoBadge src={iconUrl} />}
```

**Campos usados:**
- `productImage` → Imagen principal
- `iconUrl` → Logo badge
- `appStoreUrl` → Botón App Store
- `googlePlayUrl` → Botón Google Play
- `images[0].src` → Fallback

---

### 4️⃣ Features

```tsx
// NO mostrar si no hay features
if (!features || features.length === 0) return null;

// Renderizar grid
{features.map(feature => (
  <FeatureCard
    image={feature.image}
    title={feature.name}
    description={feature.description}
  />
))}
```

**Campos usados:**
- `features[].image` → Screenshot
- `features[].name` → Título
- `features[].description` → Descripción

---

### 5️⃣ Advantages

```tsx
// NO mostrar si no hay advantages
if (!advantages || advantages.length === 0) return null;

// Título de la sección (opcional, default: "Asegura tus comunicaciones")
<h2>{title_benefits || "Asegura tus comunicaciones"}</h2>

// Imagen lateral opcional
{image_benefits && (
  <BenefitsImage src={image_benefits} />
)}

{advantages.map(adv => (
  <AdvantageCard
    // Si image viene → usa la imagen
    // Si NO viene → usa CheckCircle icon (color #6ADFFF)
    icon={adv.image ? <Image src={adv.image} /> : <CheckCircle />}
    title={adv.name}
    description={adv.description}
  />
))}
```

**Campos usados:**
- `title_benefits` → Título sección (opcional)
- `advantages[].image` → Icono (opcional - si no viene usa CheckCircle)
- `advantages[].name` → Título
- `advantages[].description` → Descripción
- `image_benefits` → Imagen lateral

---

### 6️⃣ VideoSection

```tsx
// NO mostrar si no hay videoUrl
if (!videoUrl) return null;

// Texto acompañante del video (opcional)
<h2>{video_text || `Conoce ${name} en acción`}</h2>

<VideoEmbed 
  url={videoUrl} 
  title={video_text || `${name} - Video`} 
/>
```

**Campos usados:**
- `videoUrl` → URL embed YouTube
- `video_text` → Texto acompañante (opcional)
- `name` → Fallback para texto

---

### 7️⃣ FAQSection

```tsx
// NO mostrar si no hay FAQs
if (!faqs || faqs.length === 0) return null;

<Accordion
  items={faqs.map(faq => ({
    title: faq.name,
    content: faq.description
  }))}
/>
```

**Campos usados:**
- `faqs[].name` → Pregunta
- `faqs[].description` → Respuesta

---

### 8️⃣ StickyPriceBanner

```tsx
// Siempre se muestra cuando hay scroll

<StickyBanner
  icon={iconUrl}  // Opcional, no mostrar si no viene
  title={name}
  price={selectedVariant?.price || price}
  onBuy={() => openModal(id, category.id)}
/>
```

**Campos usados:**
- `iconUrl` → Logo (opcional)
- `name` → Nombre producto
- `variants[selected].price` o `price` → Precio
- `id`, `category.id` → Modal compra

---

## 🏷️ CATEGORÍAS SOPORTADAS

| ID | Nombre | Template |
|----|--------|----------|
| **38** | Apps | Producto estándar |
| **35** | Software | Producto estándar |
| **36** | Router | Producto estándar |

---

## ⚠️ REGLAS DE RENDERIZADO

### Campos que OCULTAN el componente si no vienen:

| Campo | Componente que se oculta |
|-------|--------------------------|
| `features[]` vacío o null | Sección Features completa |
| `advantages[]` vacío o null | Sección Advantages completa |
| `faqs[]` vacío o null | Sección FAQ completa |
| `videoUrl` vacío o null | Sección Video completa |
| `checks[]` vacío o null | Lista de checks en CardProduct |
| `variants[]` vacío o null | Radio buttons (usa price directo) |
| `appStoreUrl` vacío o null | Botón App Store |
| `googlePlayUrl` vacío o null | Botón Google Play |
| `iconUrl` vacío o null | Logo/badge del producto |
| `image_benefits` vacío o null | Imagen lateral en Advantages |

### Campos con FALLBACK:

| Campo | Fallback |
|-------|----------|
| `heroBanners` | `image_full` → `images[0]` |
| `productImage` | `images[0].src` |
| `sale_price` (si on_sale) | `price` |
| `price` | "Consultar precio" |

---

## 🌐 MULTIIDIOMA

Campos traducibles según parámetro `lang`:

- `name`
- `description`
- `checks[].name`
- `features[].name`, `features[].description`
- `advantages[].name`, `advantages[].description`
- `faqs[].name`, `faqs[].description`

**Idiomas soportados:** es, en, pt, fr, it

---

## 📁 ARCHIVOS RELACIONADOS

- **Tipos TypeScript:** `src/features/products/types/AllProductsResponse.ts`
- **Componentes:** `src/app/[locale]/our-products/[productId]/components/`
- **Context:** `src/app/[locale]/our-products/[productId]/context/ProductByIdContext.tsx`
