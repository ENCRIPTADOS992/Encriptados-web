# 📋 Plan de Mejora: Sistema de Identificación de Productos SIM

> **Fecha:** Enero 2026  
> **Versión:** 3.0 (Backend como Fuente de Verdad)  
> **Autor:** Copilot  
> **Estado:** ✅ Implementado

---

## 📊 RESUMEN EJECUTIVO

Este documento describe el sistema de identificación y clasificación de productos SIM. El objetivo es:

1. **El backend es la ÚNICA fuente de verdad** - `provider` y `type_product` determinan todo
2. **Derivar el `slug` de la URL** combinando family + format:
   - `encrypted` + `physical` → `sim-encriptada`
   - `encrypted` + `digital` → `esim-encriptada`
   - `tim` + `physical` → `tim-sim`
   - `tim` + `digital` → `esim-tim`
3. **Validar que el producto corresponde a la URL** - Si no coincide, redirigir automáticamente
4. **No hay productId estático en el frontend** - El producto se carga por `?productId=` en la URL
5. **Generar `canonical_path` por hidratación** en el frontend: `/sim/${slug}`

> **⚠️ PRINCIPIO CLAVE:** El frontend NO debe forzar un producto a una URL. Si alguien accede a `/sim/tim-sim?productId=59835` pero el producto 59835 tiene `provider: "Sim Encriptados"`, se redirige automáticamente a `/sim/esim-encriptada?productId=59835`.

---

## 🎯 DERIVACIÓN DE SLUGS (Backend → URL)

La URL correcta se determina ÚNICAMENTE por los campos del backend:

| `provider` (Backend)   | `type_product` | → `family`  | → `format`  | → `slug`          |
| ---------------------- | -------------- | ----------- | ----------- | ----------------- |
| `"Sim Encriptados"`    | `"Fisico"`     | `encrypted` | `physical`  | `sim-encriptada`  |
| `"Sim Encriptados"`    | `"Digital"`    | `encrypted` | `digital`   | `esim-encriptada` |
| `"Sim TIM"` (o similar)| `"Fisico"`     | `tim`       | `physical`  | `tim-sim`         |
| `"Sim TIM"` (o similar)| `"Digital"`    | `tim`       | `digital`   | `esim-tim`        |

### Ejemplo Real: Producto 59835

```json
{
  "id": 59835,
  "name": "eSIM + Recarga Datos",
  "provider": "Sim Encriptados",  // → family = "encrypted"
  "type_product": "Digital",      // → format = "digital"
  // RESULTADO: slug = "esim-encriptada"
}
```

**URL correcta:** `/sim/esim-encriptada?productId=59835`

---

## 🔍 ANÁLISIS DEL ESTADO ACTUAL

### 1. Estructura de Datos del Backend

#### Campos que SÍ envía el backend:

```json
{
  "id": 508,
  "name": "SIM Encriptada",
  "description": "...",
  "price": "119",
  "category": { "id": 40, "name": "SIM" },
  "provider": "Sim Encriptados",
  "brand": "Encriptados",
  "shipping": "si",
  "type_product": "Fisico",
  "config_sim": [{ "type": "esim", "sku": "...", "code": "..." }],
  "images": [...],
  "checks": [...],
  "faqs": [...],
  "features": [...],
  "advantages": [...]
},
{
            "id": 454,
            "name": "eSIM Encriptada",
            "description": "Conectate en todo el mundo con seguridad en tus comunicaciones. Adquiere tu eSIM con encriptación y disfruta de total anonimato en llamadas, filtros, cambios IMSI y más.",
            "checks": [
                {
                    "name": "Total anonimato"
                },
                {
                    "name": "Sin fecha de corte"
                },
                {
                    "name": "Disponibilidad global"
                }
            ],
            "activation": "Si",
            "type_product": "Digital",
            "config_sim": [],
            "provider": "Sim Encriptados",
            "licensetime": "0",
            "shipping": "No",
            "brand": "Encriptados",
            "sku": "ESIM-ENCRIPTADA",
            "price": 99,
            "on_sale": true,
            "sale_price": 99,
            "stock_quantity": "1000",
            "category": {
                "id": 40,
                "name": "Sims"
            },
```

#### Campos EXISTENTES que usaremos para derivar:

| Campo Existente  | Valor Ejemplo        | Se Deriva A        | Lógica de Derivación                                    |
| ---------------- | -------------------- | ------------------ | ------------------------------------------------------- |
| `provider`       | `"Sim Encriptados"` | `product_family`   | Contiene "Encriptados" → `encrypted`, sino → `tim`     |
| `type_product`   | `"Fisico"` / `"Digital"` | `product_format` | `"Fisico"` → `physical`, `"Digital"` → `digital`     |
| *(derivación)*    | family + format      | `slug`             | Ver tabla "Derivación de Slug" abajo                    |
| *(hidratación)*   | slug                 | `canonical_path`   | Se genera en frontend: `/sim/${slug}`                   |

#### Derivación de Slug (family + format → slug)

| `family`    | `format`   | → `slug`            | → `canonical_path`        |
| ----------- | ---------- | ------------------- | ------------------------- |
| `encrypted` | `physical` | `sim-encriptada`    | `/sim/sim-encriptada`     |
| `encrypted` | `digital`  | `esim-encriptada`   | `/sim/esim-encriptada`    |
| `tim`       | `physical` | `tim-sim`           | `/sim/tim-sim`            |
| `tim`       | `digital`  | `esim-tim`          | `/sim/esim-tim`           |

---

### 2. Lógica de Identificación Actual (Problemas)

#### Problema 1: Lógica dispersa en múltiples archivos

```
├── resolveSimFormType.ts      → Identifica para Modal de Pago
├── getProductCategoryKind.ts  → Identifica categoría general
├── ListOfProducts.tsx         → Identifica para listado
├── simProductConfig.ts        → Configuración estática
└── productRouteResolver.ts    → Resolución de rutas
```

**Impacto:** Inconsistencias, difícil mantenimiento, duplicación de lógica.

#### Problema 2: Inferencia frágil basada en strings

```typescript
// resolveSimFormType.ts - Actual (FRÁGIL)
const isEncrypted = prov.includes("encript"); // ¿Qué pasa si cambia?
const isTim = prov.includes("tim"); // ¿Y si hay "interim"?
const isPhysical = ship === "si"; // Dependencia de texto
```

#### Problema 3: Sin metadata para Open Graph

```typescript
// page.tsx actual - NO tiene generateMetadata
"use client"; // ← Client component no puede tener metadata server-side
```

#### Problema 4: Modal de pago sin contexto completo

```typescript
// createSimSubmitHandler.ts - Actual
metadata: {
  type: "SIM_GENERIC",  // ← Genérico, sin detalle del producto
  // Falta: product_family, product_format, source_page
}
```

---

## 🏗️ ARQUITECTURA PROPUESTA

### Opción Seleccionada: Sin Cambios en Backend (Derivación en Frontend)

**Estrategia:** Usar campos existentes del backend (`provider`, `type_product`) y derivar los valores necesarios en el frontend.

### Mapeo de Campos Existentes → Valores Derivados

| Campo Backend    | Ejemplo                | Campo Derivado     | Lógica                                                  |
| ---------------- | ---------------------- | ------------------ | ------------------------------------------------------- |
| `provider`       | `"Sim Encriptados"`   | `productFamily`    | `.toLowerCase().includes("encript")` → `"encrypted"`   |
| `provider`       | `"Sim TIM"`           | `productFamily`    | `.toLowerCase().includes("tim")` → `"tim"`             |
| `type_product`   | `"Fisico"`            | `productFormat`    | `"Fisico"` → `"physical"`                              |
| `type_product`   | `"Digital"`           | `productFormat`    | `"Digital"` → `"digital"`                              |
| *(slug)*         | `"sim-encriptada"`    | `canonicalPath`    | Hidratación: `/sim/${slug}`                             |

### Valores Derivados por Producto

| Product ID | Slug            | `provider` (Backend) | `type_product` | → `productFamily` | → `productFormat` | → `canonicalPath` (Hidratado) |
| ---------- | --------------- | -------------------- | -------------- | ----------------- | ----------------- | ----------------------------- |
| 508        | sim-encriptada  | `"Sim Encriptados"`  | `"Fisico"`     | `"encrypted"`     | `"physical"`      | `"/sim/sim-encriptada"`       |
| 454        | esim-encriptada | `"Sim Encriptados"`  | `"Digital"`    | `"encrypted"`     | `"digital"`       | `"/sim/esim-encriptada"`      |
| 59835      | tim-sim         | `"Sim TIM"`          | `"Fisico"`     | `"tim"`           | `"physical"`      | `"/sim/tim-sim"`              |
| 59836      | esim-tim        | `"Sim TIM"`          | `"Digital"`    | `"tim"`           | `"digital"`       | `"/sim/esim-tim"`             |

### Diagrama de Arquitectura (Mínima)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         ARQUITECTURA HÍBRIDA                              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  BACKEND (WordPress API) - SIN CAMBIOS                                   │
│  ══════════════════════════════════════                                  │
│  Usa campos EXISTENTES del endpoint:                                     │
│  GET /wp-json/encriptados/v1/products/{id}                              │
│                                                                          │
│  {                                                                       │
│    "id": 508,                                                            │
│    "name": "SIM Encriptada",                                             │
│    "provider": "Sim Encriptados",  // ← Deriva: encrypted               │
│    "type_product": "Fisico",       // ← Deriva: physical                │
│    ...otros campos existentes...                                        │
│  }                                                                       │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  FRONTEND (Deriva valores + Hidrata canonical_path)                      │
│  ═══════════════════════════════════════════════════                     │
│                                                                          │
│  simProductConfig.ts (AGREGAR HELPERS)                                   │
│  └── deriveProductFamily(provider) → "encrypted" | "tim"                │
│  └── deriveProductFormat(type_product) → "physical" | "digital"         │
│  └── deriveProductSlug(family, format) → slug (sim-encriptada, etc.)    │
│  └── hydrateCanonicalPath(slug) → "/sim/${slug}"                        │
│                                                                          │
│  page.tsx (MODIFICAR)                                                    │
│  └── Usa valores derivados para secciones UI                             │
│  └── Usa canonical_path hidratado para metadata                          │
│                                                                          │
│  resolveSimFormType.ts (SIMPLIFICAR)                                     │
│  └── Usa valores derivados en lugar de inferencia múltiple               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 📡 CAMBIOS EN BACKEND (WordPress)

### Endpoint Afectado

```
GET /wp-json/encriptados/v1/products/{productId}?lang={locale}
```

### Estructura JSON Actualizada

```json
{
  // Campos existentes (sin cambios)
  "id": 508,
  "name": "SIM Encriptada",
  "description": "...",
  "price": "119",
  "category": { "id": 40, "name": "SIM" },
  "provider": "Sim Encriptados",
  "shipping": "si",
  "type_product": "Fisico",
  "config_sim": [...],
  "images": [...],
  "checks": [...],
  "faqs": [...],   // ← Ver sección de FAQs más abajo

  // ═══════════════════════════════════════════════════════════════════
  // 🆕 NUEVOS CAMPOS (Solo 3)
  // ═══════════════════════════════════════════════════════════════════
  "product_family": "encrypted",        // "encrypted" | "tim"
  "product_format": "physical",         // "physical" | "digital"
  "canonical_path": "/sim/sim-encriptada"
}
```

---

## 📋 EJEMPLOS COMPLETOS DE JSON ESPERADO DEL BACKEND

### SIM Encriptada (ID: 508)

```json
{
  "id": 508,
  "name": "SIM Encriptada",
  "slug": "sim-encriptada",
  "description": "Protege tus comunicaciones con nuestra SIM Encriptada. Llamadas y mensajes cifrados de extremo a extremo.",
  "price": "119",
  "regular_price": "149",
  "sale_price": "119",
  "currency": "USD",
  "category": {
    "id": 40,
    "name": "SIM",
    "slug": "sim"
  },
  "provider": "Sim Encriptados",
  "brand": "Encriptados",
  "shipping": "si",
  "type_product": "Fisico",
  "stock_status": "instock",
  "config_sim": [],
  "images": [
    {
      "id": 1001,
      "src": "https://encriptados.io/wp-content/uploads/sim-encriptada-main.jpg",
      "alt": "SIM Encriptada"
    }
  ],
  "checks": [
    {
      "name": "Llamadas encriptadas",
      "description": "Cifrado de extremo a extremo"
    },
    { "name": "Sin registro", "description": "No requiere datos personales" },
    { "name": "Cobertura global", "description": "Funciona en +200 países" }
  ],
  "features": [
    {
      "name": "Encriptación militar",
      "description": "AES-256",
      "image": "/icons/shield.svg"
    }
  ],
  "advantages": [
    {
      "name": "Privacidad total",
      "description": "Sin rastro digital",
      "image": "/icons/privacy.svg"
    }
  ],
  "faqs": [
    {
      "name": "¿Qué es una SIM Encriptada?",
      "description": "Es una tarjeta SIM que cifra tus llamadas y mensajes de extremo a extremo."
    },
    {
      "name": "¿Necesito un teléfono especial?",
      "description": "No, funciona en cualquier teléfono desbloqueado."
    },
    {
      "name": "¿Cómo activo mi SIM?",
      "description": "Inserta la SIM y sigue las instrucciones del SMS de activación."
    },
    {
      "name": "¿Cuánto cuesta el servicio mensual?",
      "description": "Consulta nuestros planes de recarga para detalles de precios."
    },
    {
      "name": "¿En qué países funciona?",
      "description": "Funciona en más de 200 países con roaming incluido."
    }
  ],

  "product_family": "encrypted",
  "product_format": "physical",
  "canonical_path": "/sim/sim-encriptada"
}
```

### eSIM Encriptada (ID: 454)

```json
{
  "id": 454,
  "name": "eSIM Encriptada",
  "slug": "esim-encriptada",
  "description": "Activa tu eSIM Encriptada al instante. Sin tarjeta física, máxima privacidad.",
  "price": "99",
  "regular_price": "129",
  "sale_price": "99",
  "currency": "USD",
  "category": {
    "id": 40,
    "name": "SIM",
    "slug": "sim"
  },
  "provider": "Sim Encriptados",
  "brand": "Encriptados",
  "shipping": "no",
  "type_product": "Digital",
  "stock_status": "instock",
  "config_sim": [
    {
      "type": "esim",
      "sku": "ESIM-ENC-001",
      "code": "QR_CODE_DATA"
    }
  ],
  "images": [
    {
      "id": 1002,
      "src": "https://encriptados.io/wp-content/uploads/esim-encriptada-main.jpg",
      "alt": "eSIM Encriptada"
    }
  ],
  "checks": [
    {
      "name": "Activación instantánea",
      "description": "Escanea el QR y listo"
    },
    { "name": "Sin tarjeta física", "description": "100% digital" },
    { "name": "Encriptación E2E", "description": "Comunicaciones seguras" }
  ],
  "features": [
    {
      "name": "QR instantáneo",
      "description": "Recibe por email",
      "image": "/icons/qr.svg"
    }
  ],
  "advantages": [
    {
      "name": "Sin esperas",
      "description": "Activa en minutos",
      "image": "/icons/fast.svg"
    }
  ],
  "faqs": [
    {
      "name": "¿Qué es una eSIM Encriptada?",
      "description": "Es una SIM digital con encriptación de extremo a extremo. Se activa escaneando un código QR."
    },
    {
      "name": "¿Cómo sé si mi teléfono es compatible?",
      "description": "La mayoría de teléfonos desde 2019 soportan eSIM: iPhone XS+, Samsung S20+, Pixel 3+."
    },
    {
      "name": "¿Cuánto tarda en activarse?",
      "description": "La activación es instantánea. Recibes el QR por email tras el pago."
    },
    {
      "name": "¿Puedo tener varias eSIMs?",
      "description": "Sí, puedes almacenar múltiples eSIMs, pero solo una activa a la vez."
    },
    {
      "name": "¿Qué pasa si cambio de teléfono?",
      "description": "Contacta soporte para generar un nuevo código QR de activación."
    }
  ],

  "product_family": "encrypted",
  "product_format": "digital",
  "canonical_path": "/sim/esim-encriptada"
}
```

### TIM SIM (ID: 59835)

```json
{
  "id": 59835,
  "name": "TIM SIM",
  "slug": "tim-sim",
  "description": "Navega en más de 200 países con nuestra TIM SIM. Datos de alta velocidad sin roaming.",
  "price": "49",
  "regular_price": "59",
  "sale_price": "49",
  "currency": "USD",
  "category": {
    "id": 40,
    "name": "SIM",
    "slug": "sim"
  },
  "provider": "TIM International",
  "brand": "TIM",
  "shipping": "si",
  "type_product": "Fisico",
  "stock_status": "instock",
  "config_sim": [],
  "images": [
    {
      "id": 1003,
      "src": "https://encriptados.io/wp-content/uploads/tim-sim-main.jpg",
      "alt": "TIM SIM"
    }
  ],
  "checks": [
    { "name": "Datos internacionales", "description": "Sin cargos de roaming" },
    { "name": "+200 países", "description": "Cobertura global" },
    { "name": "Alta velocidad", "description": "4G/LTE disponible" }
  ],
  "features": [
    {
      "name": "Datos globales",
      "description": "Sin fronteras",
      "image": "/icons/globe.svg"
    }
  ],
  "advantages": [
    {
      "name": "Sin sorpresas",
      "description": "Precio fijo",
      "image": "/icons/price.svg"
    }
  ],
  "faqs": [
    {
      "name": "¿Qué es TIM SIM?",
      "description": "Es una tarjeta SIM de datos para navegar en más de 200 países sin roaming."
    },
    {
      "name": "¿Incluye llamadas y mensajes?",
      "description": "Está optimizada para datos. Usa apps VoIP como WhatsApp para llamadas."
    },
    {
      "name": "¿Cómo recargo mis datos?",
      "description": "Recarga desde nuestra plataforma. Paquetes de 1GB a ilimitado."
    },
    {
      "name": "¿Cuánto tarda en llegar?",
      "description": "3-5 días América, 5-7 días Europa, 7-10 días Asia/Oceanía."
    },
    {
      "name": "¿Funciona en cualquier dispositivo?",
      "description": "Sí, en cualquier dispositivo desbloqueado: smartphones, tablets, routers MiFi."
    }
  ],

  "product_family": "tim",
  "product_format": "physical",
  "canonical_path": "/sim/tim-sim"
}
```

### eSIM TIM (ID: 59836)

```json
{
  "id": 59836,
  "name": "eSIM TIM",
  "slug": "esim-tim",
  "description": "Activa tu eSIM TIM al instante. Datos móviles en más de 200 países.",
  "price": "39",
  "regular_price": "49",
  "sale_price": "39",
  "currency": "USD",
  "category": {
    "id": 40,
    "name": "SIM",
    "slug": "sim"
  },
  "provider": "TIM International",
  "brand": "TIM",
  "shipping": "no",
  "type_product": "Digital",
  "stock_status": "instock",
  "config_sim": [
    {
      "type": "esim",
      "sku": "ESIM-TIM-001",
      "code": "QR_CODE_DATA"
    }
  ],
  "images": [
    {
      "id": 1004,
      "src": "https://encriptados.io/wp-content/uploads/esim-tim-main.jpg",
      "alt": "eSIM TIM"
    }
  ],
  "checks": [
    { "name": "Activación instantánea", "description": "Sin esperar envío" },
    { "name": "Dual SIM", "description": "Usa con tu SIM actual" },
    { "name": "Datos globales", "description": "+200 países" }
  ],
  "features": [
    {
      "name": "Ideal para viajeros",
      "description": "Activa antes de viajar",
      "image": "/icons/travel.svg"
    }
  ],
  "advantages": [
    {
      "name": "Inmediato",
      "description": "QR en minutos",
      "image": "/icons/instant.svg"
    }
  ],
  "faqs": [
    {
      "name": "¿Qué ventaja tiene sobre TIM SIM física?",
      "description": "Activación instantánea, ideal para viajeros de último minuto."
    },
    {
      "name": "¿Puedo usar eSIM TIM y mi SIM actual juntas?",
      "description": "Sí, mantén tu número en la SIM física y usa eSIM TIM para datos."
    },
    {
      "name": "¿En cuánto tiempo recibo mi eSIM?",
      "description": "Inmediatamente tras el pago recibes el QR por email."
    },
    {
      "name": "¿Qué pasa si pierdo el código QR?",
      "description": "Accede desde tu cuenta o contacta soporte para reenviarlo."
    },
    {
      "name": "¿Puedo recargar datos?",
      "description": "Sí, agrega datos en cualquier momento desde nuestra plataforma."
    }
  ],

  "product_family": "tim",
  "product_format": "digital",
  "canonical_path": "/sim/esim-tim"
}
```

---

## ❓ ESTRUCTURA DE FAQs

### Interfaz TypeScript (Existente)

```typescript
// src/features/products/types/AllProductsResponse.ts
export interface FAQ {
  name: string; // Pregunta
  description: string; // Respuesta
}
```

### Transformación en Frontend (Existente)

```typescript
// src/app/[locale]/sim/[slug]/simProductUtils.ts
export function transformFaqs(product: ProductById | null): FAQItem[] {
  if (!product?.faqs) return [];

  return product.faqs.map((faq) => ({
    question: faq.name, // Backend: name → Frontend: question
    answer: faq.description, // Backend: description → Frontend: answer
  }));
}
```

> **Nota:** Los ejemplos completos de FAQs para cada producto están incluidos en la sección "EJEMPLOS COMPLETOS DE JSON ESPERADO DEL BACKEND" arriba.

---

## 🔧 CAMBIOS EN FRONTEND (Mínimos)

### Actualizar AllProductsResponse.ts

```typescript
// src/features/products/types/AllProductsResponse.ts

export interface ProductById {
  // ... campos existentes ...

  // 🆕 NUEVOS CAMPOS
  /** Familia del producto: "encrypted" | "tim" */
  product_family?: "encrypted" | "tim";

  /** Formato del producto: "physical" | "digital" */
  product_format?: "physical" | "digital";

  /** Path canónico para SEO (ej: "/sim/sim-encriptada") */
  canonical_path?: string;
}
```

---

## 🔄 ACTUALIZAR simProductConfig.ts (Existente)

### Agregar campos derivados

```typescript
// src/app/[locale]/sim/[slug]/simProductConfig.ts

// Agregar al tipo existente
export interface SimProductStaticConfig {
  // ... campos existentes ...

  // 🆕 Fallback si backend no envía (temporalmente)
  productFamily: "encrypted" | "tim";
  productFormat: "physical" | "digital";
  canonicalPath: string;
}

// Actualizar cada producto en simProductConfigs
export const simProductConfigs: Record<string, SimProductStaticConfig> = {
  "sim-encriptada": {
    // ... campos existentes ...
    productFamily: "encrypted",
    productFormat: "physical",
    canonicalPath: "/sim/sim-encriptada",
  },
  "esim-encriptada": {
    // ... campos existentes ...
    productFamily: "encrypted",
    productFormat: "digital",
    canonicalPath: "/sim/esim-encriptada",
  },
  "tim-sim": {
    // ... campos existentes ...
    productFamily: "tim",
    productFormat: "physical",
    canonicalPath: "/sim/tim-sim",
  },
  "esim-tim": {
    // ... campos existentes ...
    productFamily: "tim",
    productFormat: "digital",
    canonicalPath: "/sim/esim-tim",
  },
};

// 🆕 NUEVAS FUNCIONES HELPER (con prioridad API > Config)
export function getProductFamily(
  product: ProductById | null,
  config: SimProductStaticConfig | null
): "encrypted" | "tim" {
  // Prioridad: Derivar de API > Fallback config local
  if (product?.provider) {
    return deriveProductFamily(product.provider);
  }
  return config?.productFamily || "encrypted";
}

export function getProductFormat(
  product: ProductById | null,
  config: SimProductStaticConfig | null
): "physical" | "digital" {
  // Prioridad: Derivar de API > Fallback config local
  if (product?.type_product) {
    return deriveProductFormat(product.type_product);
  }
  return config?.productFormat || "physical";
}

export function getCanonicalPath(
  product: ProductById | null,
  config: SimProductStaticConfig | null
): string {
  // Si hay producto del backend, derivar directamente
  if (product) {
    return deriveCanonicalPathFromProduct(product);
  }
  // Fallback a config local
  return config?.canonicalPath || `/sim/sim-encriptada`;
}

// 🆕 FUNCIONES DE DERIVACIÓN (de campos backend a valores normalizados)

/** Deriva family desde el campo `provider` del backend */
export function deriveProductFamily(
  provider: string | undefined
): "encrypted" | "tim" {
  const prov = (provider || "").toLowerCase();
  if (prov.includes("encript")) return "encrypted";
  if (prov.includes("tim")) return "tim";
  return "encrypted"; // fallback
}

/** Deriva format desde el campo `type_product` del backend */
export function deriveProductFormat(
  typeProduct: string | undefined
): "physical" | "digital" {
  const tp = (typeProduct || "").toLowerCase();
  if (tp === "digital") return "digital";
  return "physical"; // "Fisico" o cualquier otro valor
}

// 🆕 DERIVAR SLUG A PARTIR DE FAMILY + FORMAT
export type SimSlug = "sim-encriptada" | "esim-encriptada" | "tim-sim" | "esim-tim";

export function deriveProductSlug(
  family: "encrypted" | "tim",
  format: "physical" | "digital"
): SimSlug {
  // Mapeo: family + format → slug
  const slugMap: Record<string, Record<string, SimSlug>> = {
    encrypted: {
      physical: "sim-encriptada",
      digital: "esim-encriptada",
    },
    tim: {
      physical: "tim-sim",
      digital: "esim-tim",
    },
  };
  return slugMap[family][format];
}

// 🆕 DERIVAR CANONICAL PATH
export function hydrateCanonicalPath(slug: SimSlug): string {
  return `/sim/${slug}`;
}

// 🆕 FUNCIÓN COMPLETA: Backend fields → Canonical Path
export function deriveCanonicalPathFromProduct(product: ProductById): string {
  const family = deriveProductFamily(product.provider);
  const format = deriveProductFormat(product.type_product);
  const slug = deriveProductSlug(family, format);
  return hydrateCanonicalPath(slug);
}

// 🆕 HELPERS PARA UI
export function shouldShowEncryptedSections(
  family: "encrypted" | "tim"
): boolean {
  return family === "encrypted";
}

export function shouldShowTimSections(family: "encrypted" | "tim"): boolean {
  return family === "tim";
}

export function shouldShowEsimInfo(format: "physical" | "digital"): boolean {
  return format === "digital";
}

export function shouldShowShippingInfo(
  format: "physical" | "digital"
): boolean {
  return format === "physical";
}
```

---

## 📄 ACTUALIZAR page.tsx (Mínimo)

### Opción A: Separar en Server + Client Component

```typescript
// src/app/[locale]/sim/[slug]/page.tsx (Server Component)
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { simProductConfigs, getCanonicalPath } from "./simProductConfig";
import SimProductPageClient from "./SimProductPageClient";

interface PageProps {
  params: { slug: string; locale: string };
}

// ═══════════════════════════════════════════════════════════════════════════
// METADATA (Server-side)
// ═══════════════════════════════════════════════════════════════════════════

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = params;
  const config = simProductConfigs[slug];

  if (!config) {
    return { title: "Producto no encontrado | Encriptados" };
  }

  const t = await getTranslations({ locale, namespace: "simProducts" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://encriptados.io";
  const canonicalPath = config.canonicalPath;

  // Usar datos de configuración local + traducciones
  const productName = t(`${slug}.name`);
  const description = t(`${slug}.seo.description`);
  const ogImage = config.ogImage || `/images/og/${slug}-og.jpg`;

  return {
    title: `${productName} | Encriptados`,
    description,
    openGraph: {
      title: productName,
      description,
      url: `${baseUrl}/${locale}${canonicalPath}`,
      siteName: "Encriptados",
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
      locale,
      type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title: productName,
      description,
      images: [`${baseUrl}${ogImage}`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${canonicalPath}`,
      languages: {
        es: `${baseUrl}/es${canonicalPath}`,
        en: `${baseUrl}/en${canonicalPath}`,
        pt: `${baseUrl}/pt${canonicalPath}`,
        fr: `${baseUrl}/fr${canonicalPath}`,
        it: `${baseUrl}/it${canonicalPath}`,
      },
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// STATIC PARAMS
// ═══════════════════════════════════════════════════════════════════════════

export async function generateStaticParams() {
  return Object.keys(simProductConfigs).map((slug) => ({ slug }));
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function SimProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  const config = simProductConfigs[slug];

  if (!config) {
    notFound();
  }

  return <SimProductPageClient slug={slug} locale={locale} />;
}
```

### SimProductPageClient.tsx (Extracto del cliente actual)

```typescript
// src/app/[locale]/sim/[slug]/SimProductPageClient.tsx
"use client";

import {
  simProductConfigs,
  deriveProductFamily,
  deriveProductFormat,
  shouldShowEncryptedSections,
  shouldShowTimSections,
  shouldShowEsimInfo,
} from "./simProductConfig";
// ... resto de imports ...

export default function SimProductPageClient({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const config = simProductConfigs[slug];
  const { data: product } = useProduct(String(config.productId), locale);

  // Derivar valores de campos backend: provider, type_product
  const family = deriveProductFamily(product?.provider) || config.productFamily;
  const format = deriveProductFormat(product?.type_product) || config.productFormat;

  const showEncrypted = shouldShowEncryptedSections(family);
  const showTim = shouldShowTimSections(family);
  const showEsim = shouldShowEsimInfo(format);

  return (
    <>
      <HeroSimSection config={config} product={product} />

      <CoverageSearch />

      {showEncrypted && <FeaturesList />}
      {showEncrypted && <OurObjective />}
      {showEncrypted && <BannerSecure />}

      <PayForUse />

      {showEncrypted && <WhyCallSim />}

      <BannerCoverage />

      {showTim && <DataPlans />}

      {showEsim && <EsimInfo />}
      {!showEsim && <ShippingInfo />}

      <FAQSection />
    </>
  );
}
```

---

## � SIMPLIFICAR resolveSimFormType.ts

### Antes (Inferencia frágil)

```typescript
// Actual - Muchas condiciones frágiles
export function resolveSimFormType(product: ProductById): FormType {
  const prov = product.provider?.toLowerCase() || "";
  const cfg = product.config_sim?.[0]?.type?.toLowerCase() || "";
  const ship = product.shipping?.toLowerCase() || "";

  const isEncrypted = prov.includes("encript");
  const isTim = prov.includes("tim");
  const isPhysical = ship === "si";
  // ... más lógica compleja
}
```

### Después (Usando derivación)

```typescript
// Simplificado - Usando funciones de derivación
import {
  deriveProductFamily,
  deriveProductFormat,
  deriveProductSlug,
} from "@/app/[locale]/sim/[slug]/simProductConfig";

export type FormType =
  | "encrypted_physical"
  | "encrypted_esim"
  | "tim_physical"
  | "tim_esim";

export function resolveSimFormType(
  product: ProductById | null
): FormType {
  // Deriva directamente de campos backend: provider, type_product
  const family = deriveProductFamily(product?.provider);
  const format = deriveProductFormat(product?.type_product);

  // Mapeo directo sin inferencia frágil
  if (family === "encrypted") {
    return format === "digital" ? "encrypted_esim" : "encrypted_physical";
  } else {
    return format === "digital" ? "tim_esim" : "tim_physical";
  }
}

// También podemos obtener el slug correcto
export function getSimSlugFromProduct(product: ProductById | null) {
  const family = deriveProductFamily(product?.provider);
  const format = deriveProductFormat(product?.type_product);
  return deriveProductSlug(family, format);
}
```

---

## 🛒 ACTUALIZAR createSimSubmitHandler.ts

### Agregar metadata extendida

```typescript
// src/shared/components/ModalPayment/new/sims/services/createSimSubmitHandler.ts

import {
  simProductConfigs,
  deriveProductFamily,
  deriveProductFormat,
  deriveProductSlug,
  hydrateCanonicalPath,
} from "@/app/[locale]/sim/[slug]/simProductConfig";

interface ExtendedPaymentMetadata {
  type: string;
  productFamily: "encrypted" | "tim";
  productFormat: "physical" | "digital";
  sourcePage: string;
  locale: string;
}

export function createSimSubmitHandler(config: SimSubmitConfig) {
  return async (formData: SimFormData) => {
    const { product, slug, locale } = config;
    const staticConfig = simProductConfigs[slug];

    // Derivar valores de campos backend: provider, type_product
    const family = deriveProductFamily(product?.provider);
    const format = deriveProductFormat(product?.type_product);
    const slug = deriveProductSlug(family, format);
    const canonicalPath = hydrateCanonicalPath(slug);

    // Construir metadata usando derivación
    const metadata: ExtendedPaymentMetadata = {
      type: resolveSimFormType(product, slug),
      productFamily: family,
      productFormat: format,
      sourcePage: canonicalPath,
      locale,
    };

    // Enviar al checkout con metadata completa
    await submitToCheckout({
      ...formData,
      metadata,
    });
  };
}
```

---

## 🚀 PLAN DE IMPLEMENTACIÓN (SIMPLIFICADO)

### Fase 1: Backend (Coordinación con equipo WP)

- [ ] Agregar `product_family` al endpoint de productos
- [ ] Agregar `product_format` al endpoint de productos
- [ ] Agregar `canonical_path` al endpoint de productos
- [ ] Verificar respuesta del API con los 4 productos

### Fase 2: Frontend - Tipos (30 min)

- [ ] Actualizar `AllProductsResponse.ts` con campos opcionales
- [ ] Actualizar `SimProductStaticConfig` en `simProductConfig.ts`
- [ ] Agregar helpers: `getProductFamily`, `getProductFormat`, `getCanonicalPath`
- [ ] Agregar helpers UI: `shouldShowEncryptedSections`, `shouldShowTimSections`, `shouldShowEsimInfo`

### Fase 3: Frontend - Page (1-2 horas)

- [ ] Crear `SimProductPageClient.tsx` (extraer del actual page.tsx)
- [ ] Convertir `page.tsx` a Server Component
- [ ] Implementar `generateMetadata()`
- [ ] Implementar `generateStaticParams()`
- [ ] Usar helpers para renderizado condicional de secciones

### Fase 4: Frontend - Modal de Pago (1 hora)

- [ ] Simplificar `resolveSimFormType.ts`
- [ ] Actualizar `createSimSubmitHandler.ts` con metadata extendida

### Fase 5: Assets y Traducciones (1 hora)

- [ ] Crear imágenes OG (1200x630) para los 4 productos
- [ ] Agregar traducciones SEO a `messages/*.json`

### Fase 6: Testing (1 hora)

- [ ] Verificar metadata con Facebook Debugger
- [ ] Verificar Twitter Card Validator
- [ ] Probar secciones UI por producto
- [ ] Probar flujo de pago completo

---

## 📊 TIEMPO ESTIMADO TOTAL

| Fase                   | Tiempo        |
| ---------------------- | ------------- |
| Backend (coordinación) | Variable      |
| Frontend - Tipos       | 30 min        |
| Frontend - Page        | 1-2 horas     |
| Frontend - Modal       | 1 hora        |
| Assets/Traducciones    | 1 hora        |
| Testing                | 1 hora        |
| **Total Frontend**     | **4-6 horas** |

---

## 📝 TRADUCCIONES REQUERIDAS

### Agregar a messages/{locale}.json

```json
{
  "simProducts": {
    "sim-encriptada": {
      "name": "SIM Encriptada",
      "seo": {
        "description": "Protege tus llamadas y mensajes con nuestra SIM Encriptada. Privacidad total sin registro."
      }
    },
    "esim-encriptada": {
      "name": "eSIM Encriptada",
      "seo": {
        "description": "Activa tu eSIM Encriptada al instante. Sin tarjeta física, máxima privacidad."
      }
    },
    "tim-sim": {
      "name": "TIM SIM",
      "seo": {
        "description": "Navega en más de 200 países con nuestra TIM SIM. Datos de alta velocidad."
      }
    },
    "esim-tim": {
      "name": "eSIM TIM",
      "seo": {
        "description": "Activa tu eSIM TIM al instante. Datos móviles en más de 200 países."
      }
    }
  }
}
```

---

## 📊 MATRIZ DE SECCIONES UI

| Sección        | `product_family` | `product_format` | Condición                |
| -------------- | ---------------- | ---------------- | ------------------------ |
| HeroSimSection | any              | any              | Siempre                  |
| CoverageSearch | any              | any              | Siempre                  |
| FeaturesList   | `encrypted`      | any              | `family === "encrypted"` |
| OurObjective   | `encrypted`      | any              | `family === "encrypted"` |
| BannerSecure   | `encrypted`      | any              | `family === "encrypted"` |
| PayForUse      | any              | any              | Siempre                  |
| WhyCallSim     | `encrypted`      | any              | `family === "encrypted"` |
| BannerCoverage | any              | any              | Siempre                  |
| DataPlans      | `tim`            | any              | `family === "tim"`       |
| EsimInfo       | any              | `digital`        | `format === "digital"`   |
| ShippingInfo   | any              | `physical`       | `format === "physical"`  |
| FAQSection     | any              | any              | Siempre                  |

### Resultado por Producto

| Sección      | sim-encriptada | esim-encriptada | tim-sim | esim-tim |
| ------------ | :------------: | :-------------: | :-----: | :------: |
| FeaturesList |       ✅       |       ✅        |   ❌    |    ❌    |
| OurObjective |       ✅       |       ✅        |   ❌    |    ❌    |
| BannerSecure |       ✅       |       ✅        |   ❌    |    ❌    |
| WhyCallSim   |       ✅       |       ✅        |   ❌    |    ❌    |
| DataPlans    |       ❌       |       ❌        |   ✅    |    ✅    |
| EsimInfo     |       ❌       |       ✅        |   ❌    |    ✅    |
| ShippingInfo |       ✅       |       ❌        |   ✅    |    ❌    |

---

## ✅ CHECKLIST DE VALIDACIÓN

### Backend

- [ ] API devuelve `product_family` para IDs: 508, 454, 59835, 59836
- [ ] API devuelve `product_format` para los mismos IDs
- [ ] API devuelve `canonical_path` para los mismos IDs

### Frontend - Tipos

- [ ] `AllProductsResponse.ts` tiene campos opcionales
- [ ] `simProductConfig.ts` tiene fallbacks locales
- [ ] Helpers funcionan correctamente

### Frontend - SEO/Metadata

- [ ] `generateMetadata()` genera título correcto
- [ ] `generateMetadata()` genera descripción correcta
- [ ] `generateMetadata()` genera og:image correcta
- [ ] URLs canónicas son correctas
- [ ] Verificar con Facebook Sharing Debugger
- [ ] Verificar con Twitter Card Validator

### Frontend - UI

- [ ] Productos encrypted muestran: FeaturesList, OurObjective, BannerSecure, WhyCallSim
- [ ] Productos TIM muestran: DataPlans
- [ ] Productos digital muestran: EsimInfo
- [ ] Productos physical muestran: ShippingInfo

### Frontend - Modal de Pago

- [ ] `resolveSimFormType` usa nuevos campos
- [ ] Metadata del pago incluye `productFamily`, `productFormat`, `sourcePage`
- [ ] Flujo de pago funciona para los 4 productos

---

## 📚 REFERENCIAS

| Archivo                                                                                                           | Propósito                 |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [simProductConfig.ts](../../src/app/[locale]/sim/[slug]/simProductConfig.ts)                                      | Config estática + helpers |
| [resolveSimFormType.ts](../../src/shared/components/ModalPayment/new/sims/utils/resolveSimFormType.ts)            | Tipo de formulario        |
| [createSimSubmitHandler.ts](../../src/shared/components/ModalPayment/new/sims/services/createSimSubmitHandler.ts) | Handler de pago           |
| [AllProductsResponse.ts](../../src/features/products/types/AllProductsResponse.ts)                                | Tipos de API              |
| [page.tsx](../../src/app/[locale]/sim/[slug]/page.tsx)                                                            | Página de producto SIM    |

---

## 📞 RESUMEN

Este plan propone un **enfoque mínimo** que:

1. **Agrega solo 3 campos al backend**: `product_family`, `product_format`, `canonical_path`
2. **Reutiliza** la infraestructura existente en `simProductConfig.ts`
3. **Separa** `page.tsx` en Server + Client components para soportar metadata
4. **Simplifica** la lógica de inferencia en `resolveSimFormType.ts`
5. **Enriquece** la metadata enviada al sistema de pagos

**Tiempo estimado de implementación frontend: 4-6 horas**
