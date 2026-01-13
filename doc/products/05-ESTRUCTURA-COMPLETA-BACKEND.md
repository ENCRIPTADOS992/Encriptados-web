# 📦 Estructura Completa de Datos Backend - Página de Producto

> **Fecha:** Diciembre 2024  
> **Versión:** 2.0  
> **Objetivo:** Definir la estructura JSON completa que debe entregar el backend para renderizar todas las secciones de la página de producto.

---

## 🎯 RESUMEN EJECUTIVO

La página de producto está compuesta por **10 secciones** que requieren datos. Algunos datos vienen de la **API del backend**, otros son **configuración estática local** en el frontend.

| Sección | Fuente de Datos |
|---------|-----------------|
| Hero Banner | 🔸 Mixto (API + Local) |
| Product Info | ✅ API |
| Price & Plans | ✅ API |
| Features Grid | ✅ API |
| Benefits Grid | ✅ API |
| Security Features | ✅ API |
| Video Section | ❌ Local |
| Related Products | ❌ Local |
| FAQ Section | ✅ API |
| Sticky Banner | ✅ API |

---

## 📡 ENDPOINT PRINCIPAL

```
GET /wp-json/encriptados/v1/products/{productId}?lang={locale}
```

**Parámetros:**
- `productId`: ID del producto (ej: 122, 177, 168)
- `lang`: Código de idioma (es, en, pt, fr, it)

---

## 📊 ESTRUCTURA JSON COMPLETA ESPERADA

```json
{
  // ═══════════════════════════════════════════════════════════════
  // INFORMACIÓN BÁSICA DEL PRODUCTO
  // ═══════════════════════════════════════════════════════════════
  "id": 122,
  "name": "Silent Phone",
  "description": "Es una app diseñada por las mejores mentes en tecnología móvil para proteger tus comunicaciones personales y empresariales con cifrado de extremo a extremo.",
  "brand": "Silent Circle",
  "sku": "SILENT-CIRCLE",
  "type_product": "Digital",         // "Digital" | "Physical" | "Service"
  "activation": "Inmediata",         // "Inmediata" | "24h" | "48h"
  "provider": "Silent Circle Inc.",
  "shipping": "",                    // "" para productos digitales
  
  // ═══════════════════════════════════════════════════════════════
  // CATEGORÍA
  // ═══════════════════════════════════════════════════════════════
  "category": {
    "id": 38,                        // 38=Apps, 35=Software, 36=Router, 40=SIM
    "name": "Apps"
  },

  // ═══════════════════════════════════════════════════════════════
  // PRECIO BASE (usado si no hay variantes)
  // ═══════════════════════════════════════════════════════════════
  "price": "59",                     // Precio base en USD
  "on_sale": false,                  // Si está en oferta
  "sale_price": "",                  // Precio de oferta (si on_sale=true)
  "licensetime": "1",                // Tiempo de licencia en meses ("0" = única, "1", "6", "12", etc.)
  "stock_quantity": null,            // null para productos digitales
  "purchase_note": "",               // Nota post-compra

  // ═══════════════════════════════════════════════════════════════
  // IMÁGENES DEL PRODUCTO
  // ═══════════════════════════════════════════════════════════════
  "image": "https://encriptados.es/wp-content/uploads/.../producto-1024x616.jpg",
  "image_full": "https://encriptados.es/wp-content/uploads/.../producto.jpg",
  "images": [
    { "src": "https://encriptados.es/wp-content/uploads/.../imagen1.jpg" },
    { "src": "https://encriptados.es/wp-content/uploads/.../imagen2.jpg" }
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHECKS (Features principales - lista de bullets)
  // Usado en: ProductSection
  // ═══════════════════════════════════════════════════════════════
  "checks": [
    { "name": "Llamadas cifradas de extremo a extremo" },
    { "name": "Mensajes con autodestrucción" },
    { "name": "Sin permisos de ubicación ni acceso a contactos" },
    { "name": "Protocolo SRTP con cifrado AES-256" },
    { "name": "Sin almacenamiento en servidores externos" }
  ],

  // ═══════════════════════════════════════════════════════════════
  // VARIANTES (Planes de licencia)
  // Usado en: ProductSection (radio buttons), StickyPriceBanner
  // ═══════════════════════════════════════════════════════════════
  "variants": [
    {
      "id": 59801,
      "licensetime": "3",            // Meses de licencia
      "price": 59,                   // Precio en USD (number, NO string)
      "sku": "SILENT-CIRCLE-3",
      "image": ""                    // Opcional: imagen específica de variante
    },
    {
      "id": 59803,
      "licensetime": "6",
      "price": 99,
      "sku": "SILENT-CIRCLE-6",
      "image": ""
    },
    {
      "id": 59805,
      "licensetime": "12",
      "price": 159,
      "sku": "SILENT-CIRCLE-12",
      "image": ""
    }
  ],

  // ═══════════════════════════════════════════════════════════════
  // FEATURES (Características con imagen grande/screenshot)
  // Usado en: ProductFeaturesGrid
  // ═══════════════════════════════════════════════════════════════
  "features": [
    {
      "name": "Protocolo de Cifrado Único",
      "description": "Silent Phone utiliza el protocolo ZRTP diseñado específicamente para comunicaciones de voz seguras. Cada llamada genera claves únicas que se destruyen al finalizar.",
      "image": "https://encriptados.es/wp-content/uploads/.../feature-cifrado.png"
    },
    {
      "name": "Verificación de Identidad",
      "description": "Confirma la identidad de tus contactos mediante códigos de verificación únicos que solo ustedes pueden ver.",
      "image": "https://encriptados.es/wp-content/uploads/.../feature-verificacion.png"
    },
    {
      "name": "Sin Metadatos",
      "description": "A diferencia de otras apps, Silent Phone no almacena metadatos de tus comunicaciones. Ni siquiera nosotros sabemos con quién hablas.",
      "image": "https://encriptados.es/wp-content/uploads/.../feature-metadatos.png"
    }
  ],

  // ═══════════════════════════════════════════════════════════════
  // ADVANTAGES (Beneficios con icono pequeño)
  // Usado en: ProductBenefitsGrid
  // ═══════════════════════════════════════════════════════════════
  "advantages": [
    {
      "name": "Chat Seguro",
      "description": "Los mensajes se eliminan automáticamente después del tiempo que configures. Desde segundos hasta días.",
      "image": "https://encriptados.es/wp-content/uploads/.../icon-chat.png"
    },
    {
      "name": "Llamadas Cifradas",
      "description": "Realiza llamadas de voz y video con cifrado de extremo a extremo. Nadie puede interceptar tus conversaciones.",
      "image": "https://encriptados.es/wp-content/uploads/.../icon-llamadas.png"
    },
    {
      "name": "Transferencia de Archivos",
      "description": "Comparte documentos, fotos y videos de forma segura con cifrado completo durante la transferencia.",
      "image": "https://encriptados.es/wp-content/uploads/.../icon-archivos.png"
    },
    {
      "name": "Conferencias Seguras",
      "description": "Crea salas de conferencia cifradas para reuniones empresariales con hasta 100 participantes.",
      "image": "https://encriptados.es/wp-content/uploads/.../icon-conferencias.png"
    }
  ],

  // ═══════════════════════════════════════════════════════════════
  // SECURITY FEATURES (Solo para productos tipo Software/MDM)
  // Usado en: SecurityFeaturesUnified
  // ═══════════════════════════════════════════════════════════════
  // NOTA: Se extraen de 'features' o 'advantages' según el template
  // Para productos de tipo "software", se muestran en una sección separada

  // ═══════════════════════════════════════════════════════════════
  // FAQs (Preguntas frecuentes)
  // Usado en: FAQSectionUnified
  // ═══════════════════════════════════════════════════════════════
  "faqs": [
    {
      "name": "¿Qué tan segura es la aplicación Silent Phone?",
      "description": "Silent Phone es una de las aplicaciones más seguras del mercado. Utiliza cifrado de extremo a extremo con el protocolo ZRTP, diseñado por Phil Zimmermann, creador de PGP. Las claves de cifrado se generan únicamente en los dispositivos y nunca se almacenan en servidores."
    },
    {
      "name": "¿Puedo usar Silent Phone en múltiples dispositivos?",
      "description": "Sí, puedes vincular tu cuenta de Silent Phone a múltiples dispositivos. Sin embargo, por razones de seguridad, las llamadas activas solo pueden mantenerse en un dispositivo a la vez."
    },
    {
      "name": "¿Silent Phone funciona sin conexión a internet?",
      "description": "No, Silent Phone requiere una conexión a internet (WiFi o datos móviles) para funcionar, ya que utiliza VoIP para las comunicaciones cifradas."
    },
    {
      "name": "¿Cómo verifico que mi llamada es segura?",
      "description": "Al iniciar una llamada, ambos participantes verán un código de verificación corto (SAS - Short Authentication String). Al comparar estos códigos verbalmente, pueden confirmar que nadie está interceptando la comunicación."
    }
  ]
}
```

---

## 🗂️ MAPEO DETALLADO: API → COMPONENTES UI

### 1. HeroBannerUnified

| Campo UI | Campo API | Notas |
|----------|-----------|-------|
| `imageUrl.desktop` | `image_full` | Fallback si no hay config local |
| `imageUrl.tablet` | `image_full` | Fallback si no hay config local |
| `imageUrl.mobile` | `image_full` | Fallback si no hay config local |
| `alt` | `name` | Concatenado con "Hero Banner" |

**Prioridad:** Config local > API (`image_full`)

### 2. ProductSectionUnified

| Campo UI | Campo API | Transformación |
|----------|-----------|----------------|
| `title` | `name` | Directo |
| `description` | `description` | Directo |
| `features` | `checks[]` | `checks.map(c => c.name)` |
| `price` | `variants[selected].price` o `price` | Formatear como `XX$ USD` |
| `radioOptions` | `variants[]` | `variants.map(v => "Licencia X Meses")` |

### 3. StickyPriceBannerUnified

| Campo UI | Campo API | Notas |
|----------|-----------|-------|
| `productInfo.title` | `name` | Directo |
| `productInfo.price` | `variants[selected].price` | Formateado |
| `productInfo.subtitle` | `description` | Truncado a 100 caracteres |
| `productInfo.categoryId` | `category.id` | Para lógica de modal |
| `productInfo.productId` | `id` | Para lógica de compra |

### 4. ProductFeaturesGridUnified

| Campo UI | Campo API | Transformación |
|----------|-----------|----------------|
| `features[].image` | `features[].image` | URL de imagen grande |
| `features[].title` | `features[].name` | Título de la característica |
| `features[].description` | `features[].description` | Descripción detallada |

### 5. ProductBenefitsGridUnified

| Campo UI | Campo API | Transformación |
|----------|-----------|----------------|
| `benefits[].icon` | `advantages[].image` | URL de icono pequeño |
| `benefits[].title` | `advantages[].name` | Título del beneficio |
| `benefits[].description` | `advantages[].description` | Descripción del beneficio |

### 6. SecurityFeaturesUnified (Solo Software)

| Campo UI | Campo API | Transformación |
|----------|-----------|----------------|
| `features[].title` | `features[].name` | Título de seguridad |
| `features[].description` | `features[].description` | Descripción |

### 7. FAQSectionUnified

| Campo UI | Campo API | Transformación |
|----------|-----------|----------------|
| `faqs[].question` | `faqs[].name` | Pregunta |
| `faqs[].answer` | `faqs[].description` | Respuesta |

---

## 🔢 TIPOS DE LICENCIA

El campo `licensetime` define el tipo de plan:

| Valor | Significado | Label UI |
|-------|-------------|----------|
| `"0"` | Licencia única/perpetua | "Licencia Única" |
| `"1"` | 1 mes | "Licencia 1 Mes" |
| `"3"` | 3 meses | "Licencia 3 Meses" |
| `"6"` | 6 meses | "Licencia 6 Meses" |
| `"12"` | 12 meses | "Licencia 12 Meses" |
| `"24"` | 24 meses | "Licencia 24 Meses" |

---

## 📁 DATOS QUE NO VIENEN DE LA API

Estos datos se configuran en `productConfig.ts` del frontend:

```typescript
interface ProductStaticConfig {
  slug: string;                    // URL slug del producto
  productId: number;               // ID del producto en la API
  categoryId: number;              // 38=Apps, 35=Software, 36=Router
  templateType: "app" | "software" | "router";
  
  // Imágenes locales (banners hero responsivos)
  heroBanners: {
    desktop: string;               // "/images/apps/{slug}/hero-desktop.png"
    tablet: string;                // "/images/apps/{slug}/hero-tablet.png"
    mobile: string;                // "/images/apps/{slug}/hero-mobile.jpg"
  };
  
  productImage: string;            // Imagen del producto para secciones
  iconUrl: string;                 // Logo/icono del producto
  benefitIcon: string;             // Icono fallback para beneficios
  
  // Video (YouTube embed)
  videoUrl?: string;               // "https://www.youtube.com/embed/VIDEO_ID"
  
  // URLs de tiendas de apps
  appStoreUrl?: string;            // URL de App Store
  googlePlayUrl?: string;          // URL de Google Play
  
  // Productos relacionados
  relatedProducts: {
    simProductId: string;          // ID de SIM relacionada
    esimProductId: string;         // ID de eSIM relacionada
  };
}
```

---

## ⚠️ VALIDACIONES Y CASOS ESPECIALES

### Producto SIN variantes

Cuando `variants` está vacío o es `[]`, usar los campos del producto principal:

```json
{
  "variants": [],
  "price": "750",
  "licensetime": "0"    // Licencia única
}
```

**Resultado UI:** Un solo radio button "Licencia Única" con precio $750 USD

### Producto con campos vacíos

Manejar graciosamente cuando faltan datos:

```typescript
// Features sin imagen
{ "name": "Cifrado", "description": "...", "image": "" }
// → Usar fallback: config.benefitIcon o "/images/apps/default-icon.png"

// Advantages sin nombre
{ "name": "", "description": "Bloqueo de USB...", "image": "" }
// → No mostrar en la grid o usar un título genérico
```

---

## 🌐 TRADUCCIONES DESDE LA API

Los siguientes campos deben venir traducidos según el parámetro `lang`:

| Campo | Idiomas |
|-------|---------|
| `name` | es, en, pt, fr, it |
| `description` | es, en, pt, fr, it |
| `checks[].name` | es, en, pt, fr, it |
| `features[].name` | es, en, pt, fr, it |
| `features[].description` | es, en, pt, fr, it |
| `advantages[].name` | es, en, pt, fr, it |
| `advantages[].description` | es, en, pt, fr, it |
| `faqs[].name` | es, en, pt, fr, it |
| `faqs[].description` | es, en, pt, fr, it |

---

## 📊 RESUMEN DE CATEGORÍAS

### Categoría 38: Apps

```
Productos: Silent Phone, VaultChat, Armadillo, Threema, Threema Work, VNC Lagoon, Salt, Nord VPN
Template: "app"
Características: variants[], features con imágenes, advantages con iconos
```

### Categoría 35: Software

```
Productos: Secure MDM iPhone, Secure MDM Android, SecureCrypt, Intact Phone, DEC Secure, Ultra X, ChatMail, Cryptcom, Renati
Template: "software"
Características: Puede no tener variantes, sección SecurityFeatures adicional
```

### Categoría 36: Router

```
Productos: Camaleón Router
Template: "router"
Características: Producto único sin variantes, precio fijo
```

### Categoría 40: SIM

```
Productos: SIMs encriptadas, eSIMs, TIM SIM
Template: Diferente (no usa este template de producto)
```

---

## ✅ CHECKLIST PARA BACKEND

Para cada producto, verificar que tenga:

- [ ] `id` - ID único
- [ ] `name` - Nombre en todos los idiomas
- [ ] `description` - Descripción en todos los idiomas
- [ ] `category` - Con id y name
- [ ] `price` - Precio base
- [ ] `licensetime` - Tiempo de licencia
- [ ] `checks[]` - Mínimo 3-5 items
- [ ] `variants[]` - Al menos 1 variante O usar price/licensetime del producto
- [ ] `features[]` - Mínimo 2-4 items con name, description, image
- [ ] `advantages[]` - Mínimo 3-6 items con name, description, image
- [ ] `faqs[]` - Mínimo 3-5 preguntas frecuentes
- [ ] `image_full` - Imagen de alta resolución

---

## 🔗 REFERENCIAS

- [AllProductsResponse.ts](../../src/features/products/types/AllProductsResponse.ts) - Tipos TypeScript
- [productConfig.ts](../../src/app/[locale]/apps/[slug]/productConfig.ts) - Configuración estática
- [productUtils.ts](../../src/app/[locale]/apps/[slug]/productUtils.ts) - Funciones de transformación
- [04-BACKEND-DATA-STRUCTURE.md](./04-BACKEND-DATA-STRUCTURE.md) - Documentación original
