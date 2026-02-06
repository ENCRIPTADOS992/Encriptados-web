# 📡 Encriptados Web — Catálogo Completo de Endpoints

> Documento generado: 6 de febrero de 2026
> Última revisión del codebase completo.

---

## 📌 Variables de entorno relevantes

| Variable | Ejemplo por defecto |
|----------|-------------------|
| `NEXT_PUBLIC_WP_API` | `https://encriptados.es/wp-json` |
| `NEXT_PUBLIC_SIMTIM_BASEURL` | `https://encriptados.es/wp-json/encriptados/v1/simtim` |
| `NEXT_PUBLIC_WP_USERNAME` | *(credenciales JWT)* |
| `NEXT_PUBLIC_WP_PASSWORD` | *(credenciales JWT)* |
| `WP_AUTH_TOKEN` | *(Basic auth para blog)* |

**Base URLs derivadas:**
```
WP_BASE    = NEXT_PUBLIC_WP_API                          → https://encriptados.es/wp-json
API_BASE   = WP_BASE/encriptados/v1                      → https://encriptados.es/wp-json/encriptados/v1
SIMTIM     = NEXT_PUBLIC_SIMTIM_BASEURL                  → https://encriptados.es/wp-json/encriptados/v1/simtim
```

---

## 📂 Índice

1. [Productos](#1-productos)
2. [Órdenes / Checkout (Apps & Licencias)](#2-órdenes--checkout-apps--licencias)
3. [Tottoli Checkout (SIMs)](#3-tottoli-checkout-sims)
4. [Estado de Orden (Polling)](#4-estado-de-orden-polling)
5. [Renovación de Licencia](#5-renovación-de-licencia)
6. [Orden Manual](#6-orden-manual)
7. [Cupones](#7-cupones)
8. [Autenticación JWT](#8-autenticación-jwt)
9. [Regiones y Países](#9-regiones-y-países)
10. [SIM TIM Service](#10-sim-tim-service)
11. [Tottoli Packs (Datos/Minutos)](#11-tottoli-packs-datosminutos)
12. [Blog](#12-blog)
13. [WordPress Posts](#13-wordpress-posts)
14. [Admin (Server-side)](#14-admin-server-side)
15. [Webhooks](#15-webhooks)
16. [Stripe (Client-side)](#16-stripe-client-side)
17. [Kriptomus (Server-side)](#17-kriptomus-server-side)
18. [API Routes Next.js (BFF)](#18-api-routes-nextjs-bff)
19. [Externos / Terceros](#19-externos--terceros)

---

## 1. Productos

### 1.1 `GET` Obtener productos por categoría e idioma

| | |
|---|---|
| **URL** | `{API_BASE}/products/by-category-language` |
| **Archivo** | `src/features/products/services.ts` → `getAllProducts()` |
| **Auth** | No |

**Query Params:**
```
category_id  : number    (requerido) — 38=Apps, 35=Software, 36=Routers, 40=SIMs
lang         : string    (requerido) — "es", "en", "fr", "it", "pt"
sim_country  : string    (opcional)  — solo cat 40, ej: "CO", "US"
sim_region   : string    (opcional)  — solo cat 40, ej: "EUROPE", "global"
provider     : string    (opcional)  — solo cat 40, ej: "tim", "bne"
```

**Respuesta:**
```jsonc
{
  "message": "OK",
  "products": {
    "123": {
      "id": 123,
      "name": "SecureCrypt",
      "description": "...",
      "checks": [{ "name": "Cifrado E2E" }],
      "activation": "...",
      "type_product": "Digital",        // "Digital" | "Fisico"
      "provider": "encriptados",        // "encriptados" | "tim" | "bne"
      "licensetime": "12",
      "shipping": "...",
      "brand": "Encriptados",
      "sku": "SC-001",
      "price": "220",
      "on_sale": false,
      "sale_price": "",
      "stock_quantity": null,
      "category": { "id": 38, "name": "Apps" },
      "purchase_note": "...",
      "images": [{ "src": "https://..." }],
      "faqs": [{ "name": "...", "description": "..." }],
      "advantages": [{ "name": "...", "description": "...", "image": "..." }],
      "features": [{ "name": "...", "description": "...", "image": "..." }],
      "variants": [
        {
          "id": 456,
          "licensetime": "12",
          "price": 220,
          "sku": "SC-12M",
          "image": "https://..."
        }
      ],
      "plan_data_amount": null,
      "image_full": "https://...",
      "heroBanners": { "desktop": "...", "tablet": "...", "mobile": "..." },
      "iconUrl": "https://...",
      "videoUrl": "https://...",
      "appStoreUrl": "https://...",
      "googlePlayUrl": "https://..."
    }
  }
}
```

---

### 1.2 `GET` Obtener producto por ID

| | |
|---|---|
| **URL** | `{API_BASE}/products/{productId}` |
| **Archivo** | `src/features/products/services.ts` → `getProductById()` |
| **Auth** | No |

**Query Params:**
```
lang         : string    (requerido) — "es"
sim_region   : string    (opcional)
sim_country  : string    (opcional)
provider     : string    (opcional)
```

**Respuesta:** Igual estructura que un producto individual del endpoint anterior (`ProductById`).

---

### 1.3 `GET` Buscar producto por slug

| | |
|---|---|
| **URL** | Busca en categorías 38, 35, 36 usando `getAllProducts()` y luego `getProductById()` |
| **Archivo** | `src/features/products/services.ts` → `getProductBySlug()` |
| **Auth** | No |

No es un endpoint en sí — hace múltiples llamadas a `by-category-language` para buscar.

---

## 2. Órdenes / Checkout (Apps & Licencias)

### 2.1 `POST` Crear orden tipo Roaming (con Stripe intent)

| | |
|---|---|
| **URL** | `{API_BASE}/orders/roaming` |
| **Archivos** | `src/lib/payments/orderApi.ts` → `createOrderAndIntent()` / `src/services/checkout.ts` → `CheckoutService.roaming()` |
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request Body (extendido):**
```jsonc
{
  "product_id": 123,                    // requerido
  "qty": 1,                             // requerido
  "email": "user@example.com",          // requerido
  "payment_provider": "stripe",         // requerido — "stripe" | "kriptomus"
  "amount": 220.00,                     // requerido — monto en USD
  "currency": "USD",                    // requerido
  // — opcionales —
  "variant_id": 456,
  "sku": "SC-12M",
  "months": 12,                         // (licensetime convertido)
  "coupon_code": "PROMO10",
  "discount": 10,
  "source_url": "https://encriptados.io/apps/securecrypt",
  "selected_option": 1,
  "silent_phone_mode": "new_user",
  "usernames": ["user1", "user2"],
  "system": "android",                  // "android" | "ios"
  "meta": { "key": "value" }
}
```

> ⚠️ **Patrón fallback**: Si la API responde 400/422 con el body extendido, se reintenta con el body **mínimo** (solo `product_id`, `qty`, `email`, `payment_provider`, `amount`, `currency`).

**Respuesta exitosa:**
```jsonc
{
  "ok": true,
  "order_id": 91,
  "status": "pending",                  // "pending" | "fulfilled" | "pending_admin"
  "provider": "stripe",
  "provider_ref": "pi_3SxuYb...",
  "client_secret": "pi_3SxuYb..._secret_...",
  "payment_url": null                   // solo para kriptomus
}
```

---

### 2.2 `POST` Crear orden tipo UserId (con Stripe intent)

| | |
|---|---|
| **URL** | `{API_BASE}/orders/userid` |
| **Archivos** | `src/lib/payments/orderApi.ts` → `createUserIdOrderAndIntent()` / `src/services/checkout.ts` → `CheckoutService.userId()` |
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request Body (extendido):**
```jsonc
{
  "product_id": 123,                    // requerido
  "email": "user@example.com",          // requerido
  "payment_provider": "stripe",         // requerido
  "amount": 220.00,                     // requerido
  "currency": "USD",                    // requerido
  // — opcionales —
  "username": "john_doe",
  "qty": 1,
  "variant_id": 456,
  "sku": "SC-12M",
  "licensetime": 12,
  "license_type": "new",               // "new" | "renew"
  "renew_id": "LIC-00123",
  "system": "android",                  // "android" | "ios"
  "silent_phone_mode": "new_user",
  "usernames": ["user1"],
  "coupon_code": "PROMO10",
  "discount": 10,
  "source_url": "https://encriptados.io/...",
  "selected_option": 1,
  "meta": { "key": "value" }
}
```

> ⚠️ Mismo patrón fallback que roaming.

**Respuesta exitosa:** Misma estructura que roaming (ver 2.1).

---

### 2.3 `POST` Crear orden Roaming (legacy — URLSearchParams)

| | |
|---|---|
| **URL** | `{API_BASE}/orders/{orderType}` |
| **Archivo** | `src/payments/orderApi.ts` → `createOrderAndIntent()` |
| **Auth** | No |
| **Content-Type** | `application/x-www-form-urlencoded` |

**Request Body (form-encoded):**
```
product_id=123
email=user@example.com
payment_provider=stripe
order_type=roaming
quantity=1
qty=1
amount=220
amount_cents=22000
currency=USD
provider=stripe
method=stripe
```

**Respuesta:**
```jsonc
{
  "order_id": 91,
  "client_secret": "pi_3SxuYb..._secret_..."
}
```

---

## 3. Tottoli Checkout (SIMs)

### 3.1 `POST` Tottoli Checkout

| | |
|---|---|
| **URL** | `https://encriptados.es/wp-json/encriptados/v1/tottoli/checkout` |
| **Archivo** | `src/features/products/payments/tottoliCheckout.ts` → `tottoliCheckout()` |
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request Body:**
```jsonc
{
  "email": "user@example.com",          // requerido
  "product": "esim",                    // requerido — "esim" | "data" | "minutes" | "sim_physical"
  "method": "card",                     // requerido — "card" | "cryptomus"
  "amount": 37.00,                      // requerido — total en USD
  "currency": "USD",                    // requerido
  // — opcionales según producto —
  "product_id": 123,
  "qty": 1,                             // para esim: cantidad de eSIMs
  "sim_number": "8934...",              // para data/minutes: número(s) SIM separados por coma
  "iccid": "...",
  "esim_type": "...",
  "esim_group": 1,
  "shipping_payload": {                 // solo para sim_physical
    "shipping_name": "Juan Pérez",
    "country": "Colombia",
    "postal_code": "110111",
    "phone": "+573001234567",
    "telegram_id": "@user"
  },
  "meta": {                             // metadata adicional
    "formType": "encrypted_esimData",
    "quantity": 1,
    "unitPrice": 37,
    "discount": 0,
    "shippingFee": 0,
    "selectedPlanId": 25,
    "selectedVariantId": 456,
    "sourceUrl": "https://...",
    "simNumbers": ["8934..."]
  }
}
```

> ⚠️ **Patrón fallback**: Si responde 400/422, se reintenta sin el campo `meta`.

**Respuesta exitosa:**
```jsonc
{
  "ok": true,
  "order_id": 172939394014859,
  "status": "pending",
  "provider": "stripe",                 // "stripe" | "cryptomus"
  "provider_ref": "pi_...",
  "client_secret": "pi_..._secret_...", // solo para card
  "payment_url": "https://pay.cryptomus.com/..." // solo para cryptomus
}
```

---

## 4. Estado de Orden (Polling)

### 4.1 `GET` Consultar estado público de orden

| | |
|---|---|
| **URL** | `{API_BASE}/orders/{orderId}/public-status` |
| **Archivos** | `src/lib/payments/orderApi.ts` → `fetchPublicStatus()` / `src/payments/orderApi.ts` → `fetchPublicStatus()` |
| **Auth** | No |

**Respuesta:**
```jsonc
{
  "ok": true,
  "order_id": 91,
  "type": "roaming",                    // "roaming" | "userid"
  "status": "paid",                     // "pending" | "paid" | "fulfilled" | "pending_admin" | "cancelled"
  "provider": "stripe"
}
```

---

## 5. Renovación de Licencia

### 5.1 `POST` Crear orden de renovación

| | |
|---|---|
| **URL** | `{API_BASE}/orders/renewal` |
| **Archivo** | `src/lib/payments/orderApi.ts` → `createRenewalOrder()` |
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request Body:**
```jsonc
{
  "product_id": 123,                    // requerido
  "license_id": "LIC-00123",           // requerido
  "email": "user@example.com",         // requerido
  "qty": 1,
  "months": 12,                         // requerido
  "payment_provider": "stripe",
  "amount": 220.00,                     // requerido
  "currency": "USD"
}
```

**Respuesta:** Misma estructura que checkout (ver 2.1).

---

## 6. Orden Manual

### 6.1 `POST` Crear orden manual

| | |
|---|---|
| **URL** | `{API_BASE}/orders/manual` |
| **Archivo** | `src/payments/orderApi.ts` → `createManualOrderAndIntent()` |
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request Body:**
```jsonc
{
  "product_id": 123,                    // requerido
  "qty": 1,                             // requerido
  "email": "user@example.com",         // requerido
  "payment_provider": "stripe",
  "amount": 220.00,                     // requerido
  "currency": "USD",
  "success_url": "https://..."          // opcional
}
```

**Respuesta:**
```jsonc
{
  "order_id": 91,
  "client_secret": "pi_..._secret_..."
}
```

---

## 7. Cupones

### 7.1 `GET` Validar cupón (client → BFF proxy)

| | |
|---|---|
| **URL** | `/api/coupons/validate` |
| **Archivo** | `src/lib/payments/orderApi.ts` → `validateCoupon()` |
| **Auth** | No (el proxy agrega Basic auth) |

**Query Params:**
```
code        : string    (requerido) — código del cupón
product_id  : number    (opcional)  — ID del producto
```

**Respuesta exitosa:**
```jsonc
{
  "ok": true,
  "code": "PROMO10",
  "discount_type": "fixed",            // "fixed" | "percent"
  "discount_amount": 10,
  "message": "Cupón PROMO10 aplicado"
}
```

**Respuesta error:**
```jsonc
{
  "error": true,
  "message": "Cupón no encontrado"
}
```

---

### 7.2 `GET` Admin: Buscar cupones en WP (server-side proxy)

| | |
|---|---|
| **URL** | `{WP_BASE}/encriptados/v1/admin/coupons` |
| **Archivo** | `src/app/api/coupons/validate/route.ts` (proxy) |
| **Auth** | Basic Auth (`Dannaback:...`) |

**Query Params:**
```
q           : string    — código del cupón a buscar
product_id  : number    — (opcional)
```

**Respuesta:** Array de cupones WP:
```jsonc
[
  {
    "code": "PROMO10",
    "discount_type": "fixed_cart",       // "fixed_cart" | "percent"
    "amount": "10"
  }
]
```

---

## 8. Autenticación JWT

### 8.1 `POST` Obtener token JWT

| | |
|---|---|
| **URL** | `{WP_BASE}/jwt-auth/v1/token` |
| **Archivo** | `src/features/products/authService.ts` → `getToken()` |
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request Body:**
```jsonc
{
  "username": "...",                     // NEXT_PUBLIC_WP_USERNAME
  "password": "..."                      // NEXT_PUBLIC_WP_PASSWORD
}
```

**Respuesta:**
```jsonc
{
  "token": "eyJ0eXAiOiJKV1Qi...",
  "user_email": "admin@encriptados.es",
  "user_nicename": "admin",
  "user_display_name": "Admin"
}
```

---

### 8.2 `POST` Login con token (axiosInstance + Bearer)

| | |
|---|---|
| **URL** | `{WP_BASE}/loginWithToken` |
| **Archivo** | `config/axionsInstance.ts` (instancia base) |
| **Auth** | Bearer JWT (desde localStorage) |

**Request Body:**
```jsonc
{
  "token": "abc123..."
}
```

**Respuesta:**
```jsonc
{
  "success": true,
  "user": { ... }
}
```

---

### 8.3 `POST` Registrar nuevo token

| | |
|---|---|
| **URL** | `{WP_BASE}/register` |
| **Auth** | Bearer JWT |

**Respuesta:**
```jsonc
{
  "success": true,
  "token": "new-token-123"
}
```

---

## 9. Regiones y Países

### 9.1 `GET` Listar todas las regiones

| | |
|---|---|
| **URL** | `{API_BASE}/regions` |
| **Archivo** | `src/services/regionCountryService.ts` → `fetchRegions()` |
| **Auth** | No |

**Respuesta:**
```jsonc
[
  { "id": 1, "name": "Latinoamérica", "slug": "latinoamerica" },
  { "id": 2, "name": "Europa", "slug": "europa" }
]
```

---

### 9.2 `GET` Obtener países de una región

| | |
|---|---|
| **URL** | `{API_BASE}/regions/{regionId}` |
| **Archivo** | `src/services/regionCountryService.ts` → `fetchCountries()` |
| **Auth** | No |

**Respuesta:**
```jsonc
{
  "id": "1",
  "name": "Latinoamérica",
  "countries": [
    { "id": "10", "name": "Colombia" },
    { "id": "11", "name": "México" }
  ]
}
```

---

## 10. SIM TIM Service

Base: `{SIMTIM}` = `https://encriptados.es/wp-json/encriptados/v1/simtim`

### 10.1 `GET` Regiones por servicio

| | |
|---|---|
| **URL** | `{SIMTIM}/regions?service={service}` |
| **Archivo** | `src/services/simtimService.ts` → `getRegions()` |
| **Auth** | No |

**Query Params:**
```
service : string — "esim_datos" | "recarga_datos" | "sim_fisica"
```

**Respuesta:**
```jsonc
[
  {
    "code": "EU",
    "name": "Europa",
    "countryCount": 27,
    "minFrom": { "amount": 15, "currency": "USD" }
  }
]
```

---

### 10.2 `GET` Todos los países

| | |
|---|---|
| **URL** | `{SIMTIM}/countries` |
| **Archivo** | `src/services/simtimService.ts` → `getCountries()` |

**Respuesta:**
```jsonc
[
  { "code": "CO", "name": "Colombia", "flag": "🇨🇴" },
  { "code": "US", "name": "Estados Unidos", "flag": "🇺🇸" }
]
```

---

### 10.3 `GET` Buscar regiones

| | |
|---|---|
| **URL** | `{SIMTIM}/search?scope=region&q={query}` |
| **Archivo** | `src/services/simtimService.ts` → `searchRegions()` |

---

### 10.4 `GET` Buscar países

| | |
|---|---|
| **URL** | `{SIMTIM}/search?scope=country&q={query}` |
| **Archivo** | `src/services/simtimService.ts` → `searchCountries()` |

---

## 11. Tottoli Packs (Datos/Minutos)

### 11.1 `GET` Paquetes de minutos

| | |
|---|---|
| **URL** | `https://encriptados.es/wp-json/encriptados/v1/tottoli/rest/packs?perPage=50&page=1` |
| **Archivo** | `src/shared/components/ModalPayment/new/sims/hooks/useTottoliPacks.ts` |
| **Auth** | No |

**Respuesta:**
```jsonc
[
  {
    "id": 1,
    "name": "100 Minutos",
    "minutes": 100,
    "price": 15,
    "currency": "USD"
  }
]
```

---

### 11.2 `GET` Paquetes de datos

| | |
|---|---|
| **URL** | `https://encriptados.es/wp-json/encriptados/v1/tottoli/rest/dataPacks?perPage=50&page=1` |
| **Archivo** | `src/shared/components/ModalPayment/new/sims/hooks/useTottoliPacks.ts` |
| **Auth** | No |

**Respuesta:**
```jsonc
[
  {
    "id": 1,
    "name": "5 GB",
    "gb": 5,
    "price": 25,
    "currency": "USD"
  }
]
```

---

## 12. Blog

### 12.1 `GET` Obtener posts del blog

| | |
|---|---|
| **URL** | `{WP_BASE}/encriptados/v1/blogs?lang={lang}` |
| **Archivos** | `src/app/[locale]/blog/components/BlogPage.tsx`, `src/app/[locale]/blog/[postId]/page.tsx` |
| **Auth** | No |

**Query Params:**
```
lang : string — "es", "en", etc.
```

---

### 12.2 `GET` Post por ID

| | |
|---|---|
| **URL** | `{WP_BASE}/encriptados/v1/blogs?lang={lang}` → filtrar por ID |
| **Archivo** | `src/app/[locale]/blog/[postId]/components/ContentBlogById.tsx` |

---

## 13. WordPress Posts

### 13.1 `GET` Obtener posts WP (legacy)

| | |
|---|---|
| **URL** | `{NEXT_PUBLIC_WP_API_URL}/posts` |
| **Archivo** | `src/services/wordpress.ts` → `getPosts()` |
| **Auth** | Basic Auth (`WP_AUTH_TOKEN`) |

---

## 14. Admin (Server-side)

### 14.1 `POST` Agregar license keys a un producto

| | |
|---|---|
| **URL** | `/api/wp-json/encriptados/v1/admin/products/{productId}/keys` |
| **Auth** | Basic Auth (APP_ADMIN_USER / APP_ADMIN_APP_PASSWORD) |
| **Content-Type** | `application/json` |

**Request Body:**
```jsonc
{
  "keys": ["KEY-001", "KEY-002", "KEY-003"]
}
```

---

### 14.2 `POST` Completar orden userid

| | |
|---|---|
| **URL** | `/api/wp-json/encriptados/v1/admin/orders/{id}/complete` |
| **Auth** | Basic Auth |
| **Content-Type** | `application/json` |

**Request Body:**
```jsonc
{
  "license_key": "KEY-001",
  "notes": "Entregado automáticamente"
}
```

---

## 15. Webhooks

### 15.1 `POST` Stripe Webhook

| | |
|---|---|
| **URL** | `/api/wp-json/encriptados/v1/webhooks/stripe` |
| **Auth** | Stripe signature verification |

**Body:** Stripe Event object (raw body verificado con signature).

---

### 15.2 `POST` Kriptomus Webhook

| | |
|---|---|
| **URL** | `/api/wp-json/encriptados/v1/webhooks/kriptomus` |
| **Auth** | Ninguna (validación interna) |

**Body:**
```jsonc
{
  "order_id": "...",
  "status": "paid",
  "uuid": "...",
  "amount": "220.00",
  "currency": "USD"
}
```

---

## 16. Stripe (Client-side)

### 16.1 Confirmar pago con tarjeta

| | |
|---|---|
| **Método** | `stripe.confirmCardPayment()` (Stripe.js SDK) |
| **Archivos** | `src/payments/stripeClient.ts` → `confirmCardPayment()` / `src/payments/stripe.ts` |

**Parámetros:**
```typescript
stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardNumberElement,
    billing_details: {
      name: "Juan Pérez",
      email: "user@example.com",
      address: { postal_code: "110111" }
    }
  }
})
```

**Respuesta interna:**
```jsonc
{
  "status": "succeeded",               // "succeeded" | "processing" | "requires_action" | "canceled"
  "error": null,                        // string si hay error
  "intent": {                           // PaymentIntent de Stripe
    "id": "pi_3SxuYb...",
    "amount": 22000,
    "currency": "usd",
    "status": "succeeded"
  }
}
```

---

## 17. Kriptomus (Server-side)

### 17.1 `POST` Crear invoice de pago crypto

| | |
|---|---|
| **URL** | `https://api.kriptomus.com/v1/invoices` (u otro endpoint configurado) |
| **Archivo** | `src/lib/payments/kriptomus.ts` |
| **Auth** | API Key |

**Request Body:**
```jsonc
{
  "amount": "220.00",
  "currency": "USD",
  "order_id": "91",
  "callback_url": "https://encriptados.io/api/wp-json/encriptados/v1/webhooks/kriptomus"
}
```

**Respuesta:**
```jsonc
{
  "payment_url": "https://pay.cryptomus.com/pay/...",
  "uuid": "..."
}
```

---

## 18. API Routes Next.js (BFF)

Resumen de todas las rutas bajo `src/app/api/`:

| Ruta | Método | Función |
|------|--------|---------|
| `/api/products` | GET | Proxy productos por categoría |
| `/api/coupons/validate` | GET | Proxy validación cupón (agrega Basic auth) |
| `/api/wp-json/encriptados/v1/admin/products/[id]/keys` | POST | Admin: agregar license keys |
| `/api/wp-json/encriptados/v1/admin/orders/[id]/complete` | POST | Admin: completar orden |
| `/api/wp-json/encriptados/v1/orders/roaming` | POST | Crear orden roaming |
| `/api/wp-json/encriptados/v1/orders/userid` | POST | Crear orden userid |
| `/api/wp-json/encriptados/v1/webhooks/stripe` | POST | Webhook Stripe |
| `/api/wp-json/encriptados/v1/webhooks/kriptomus` | POST | Webhook Kriptomus |

---

## 19. Externos / Terceros

### 19.1 `GET` REST Countries API

| | |
|---|---|
| **URL** | `https://restcountries.com/v3.1/name/{countryName}` |
| **Uso** | Obtener datos de país (bandera, código) |

---

## 📊 Resumen por dominio

| Dominio | Endpoints | Método principal |
|---------|-----------|-----------------|
| **Productos** | 3 | GET |
| **Checkout (Apps)** | 3 | POST |
| **Tottoli (SIMs)** | 1 | POST |
| **Polling estado** | 1 | GET |
| **Renovación** | 1 | POST |
| **Orden manual** | 1 | POST |
| **Cupones** | 2 | GET |
| **Auth JWT** | 3 | POST |
| **Regiones/Países** | 2 | GET |
| **SIM TIM** | 4 | GET |
| **Tottoli Packs** | 2 | GET |
| **Blog** | 2 | GET |
| **WordPress** | 1 | GET |
| **Admin** | 2 | POST |
| **Webhooks** | 2 | POST |
| **Stripe** | 1 | SDK |
| **Kriptomus** | 1 | POST |
| **Externos** | 1 | GET |
| **TOTAL** | **~33** | |

---

## ⚠️ Notas importantes

### Duplicación de archivos
Existen **dos versiones** de `orderApi.ts`:
- `src/payments/orderApi.ts` — legacy, usa `URLSearchParams` para el body
- `src/lib/payments/orderApi.ts` — nueva, usa JSON con patrón fallback

Ambos apuntan a los mismos endpoints WP pero con formatos distintos.

### Patrón Fallback
La mayoría de endpoints POST usan un **patrón fallback**: envían primero el payload completo (extended) y si recibe 400/422, reintentan con el payload mínimo (minimal). Esto para compatibilidad con versiones anteriores de la API WP.

### URLs hardcodeadas
Algunos componentes usan URLs hardcodeadas en lugar de variables de entorno:
- `src/features/products/payments/tottoliCheckout.ts` → `https://encriptados.es/wp-json/...`
- Componentes Renati en `deliveries/` → URLs hardcodeadas
- `useTottoliPacks.ts` → URLs hardcodeadas para packs

### axiosInstance (Bearer JWT)
El archivo `config/axionsInstance.ts` crea una instancia de axios que automáticamente agrega `Authorization: Bearer {token}` desde localStorage para todas las peticiones que la usan.

### Categorías de productos
```
38 = Apps (SecureCrypt, Armadillo, etc.)
35 = Software / Sistemas
36 = Routers
40 = SIMs (eSIM, SIM Física, Datos, Minutos)
```
