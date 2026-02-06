# Encriptados Web — Complete API Endpoints Catalog

> **Generated:** 2026-02-06  
> **Scope:** Every HTTP call discovered in the codebase (client-side fetch/axios + Next.js API routes)

---

## Table of Contents

1. [Base URLs & Configuration](#1-base-urls--configuration)
2. [PRODUCTS](#2-products)
3. [ORDERS / CHECKOUT](#3-orders--checkout)
4. [PAYMENTS — Webhooks](#4-payments--webhooks)
5. [COUPONS](#5-coupons)
6. [AUTH (JWT & Token)](#6-auth-jwt--token)
7. [RECHARGE](#7-recharge)
8. [REGIONS & COUNTRIES](#8-regions--countries)
9. [SIM TIM](#9-sim-tim)
10. [TOTTOLI (eSIM / Packs)](#10-tottoli-esim--packs)
11. [BLOG](#11-blog)
12. [WORDPRESS (Posts)](#12-wordpress-posts)
13. [ADMIN](#13-admin)
14. [EXTERNAL / THIRD-PARTY](#14-external--third-party)
15. [Next.js Internal API Routes (BFF)](#15-nextjs-internal-api-routes-bff)
16. [Stripe SDK (Client-Side)](#16-stripe-sdk-client-side)
17. [Kriptomus (Server-Side)](#17-kriptomus-server-side)

---

## 1. Base URLs & Configuration

| Variable | Default Value | Used In |
|---|---|---|
| `NEXT_PUBLIC_WP_API` | `https://encriptados.es/wp-json` | Most services |
| `NEXT_PUBLIC_WP_API_URL` | *(empty)* | `wordpress.ts` |
| `WP_AUTH_TOKEN` | *(env)* | `wordpress.ts` |
| `NEXT_PUBLIC_SIMTIM_BASEURL` | `https://encriptados.es/wp-json/encriptados/v1/simtim` | `simtimService.ts` |
| `API_CRYPTO_MUS` | *(env)* | `lib/payments/kriptomus.ts` |
| `STRIPE_SECRET_KEY` | *(env)* | `lib/payments/stripe.ts` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | *(env)* | `payments/stripeClient.ts` |

**Axios base instance** (`config/axionsInstance.ts`):
- `baseURL`: `NEXT_PUBLIC_WP_API`
- Interceptor adds `Authorization: Bearer <token>` from `localStorage`

---

## 2. PRODUCTS

### 2.1 Get Products by Category & Language

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{WP_API}/encriptados/v1/products/by-category-language` |
| **Function** | `getAllProducts()` |
| **File** | `src/features/products/services.ts` |
| **Query Params** | `category_id` (number), `lang` (string), `sim_country?` (string, only cat 40), `sim_region?` (string, only cat 40), `provider?` (string, only cat 40) |
| **Response** | `{ message: string, products: Record<string, Product> }` |
| **Also called from** | `ProductSearch.tsx` (hardcoded `https://encriptados.es/wp-json/encriptados/v1/products/by-category-language?category_id=...&lang=...`) |
| **Also called from** | `RenatiEncryptedCellphone.tsx` (hardcoded with `category_id=35&lang=es&sim_region=global`) |
| **React Query hooks** | `useGetProducts`, `useGetProductByIdUpdate` |

### 2.2 Get Product by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{WP_API}/encriptados/v1/products/{productId}` |
| **Function** | `getProductById()` |
| **File** | `src/features/products/services.ts` |
| **Query Params** | `lang` (string), `sim_region?`, `sim_country?`, `provider?` |
| **Response** | `ProductById` (full product detail object) |
| **React Query hook** | `useProductDetail` (by id or by slug) |

### 2.3 Get Product by Slug (derived)

| Field | Value |
|---|---|
| **Method** | Calls `getAllProducts()` for categories [38, 35, 36] then `getProductById()` |
| **Function** | `getProductBySlug()` |
| **File** | `src/features/products/services.ts` |

### 2.4 WooCommerce Raw Products (Test Page)

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `https://encriptados.es/wp-json/wc/v3/products` |
| **File** | `src/app/[locale]/products-test/page.tsx` |
| **Auth** | `Authorization: Bearer <hardcoded_JWT>` |
| **Response** | WooCommerce product array |

---

## 3. ORDERS / CHECKOUT

### 3.1 Create Roaming Order

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{WP_API}/encriptados/v1/orders/roaming` |
| **Functions** | `createOrderAndIntent()` in `src/lib/payments/orderApi.ts` AND `src/payments/orderApi.ts`, `CheckoutService.roaming()` in `src/services/checkout.ts` |
| **Request Body (JSON)** | `{ product_id, qty, email, payment_provider, amount, currency, variant_id?, sku?, months?, coupon_code?, discount?, source_url?, selected_option?, silent_phone_mode?, usernames?, system?, meta? }` |
| **Request Body (form-urlencoded)** | `src/payments/orderApi.ts` sends: `product_id, email, payment_provider, order_type, quantity, qty, amount, amount_cents, currency, provider, method` |
| **Response** | `{ ok, order_id, status, provider, provider_ref, client_secret, payment_url? }` |

### 3.2 Create UserID Order

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{WP_API}/encriptados/v1/orders/userid` |
| **Functions** | `createUserIdOrderAndIntent()` in `src/lib/payments/orderApi.ts`, `CheckoutService.userId()` in `src/services/checkout.ts` |
| **Request Body** | `{ product_id, email, username?, payment_provider, amount, currency, qty?, variant_id?, sku?, licensetime?, license_type?, renew_id?, system?, silent_phone_mode?, usernames?, coupon_code?, discount?, source_url?, selected_option?, meta? }` |
| **Response** | `{ ok, order_id, status, provider, provider_ref, client_secret, payment_url? }` |

### 3.3 Create SIM Order (via createOrderAndIntent — old API)

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{WP_API}/encriptados/v1/orders/sim` |
| **Function** | `createOrderAndIntent()` in `src/payments/orderApi.ts` (orderType = `"sim"`) |
| **Request Body (form-urlencoded)** | Same as roaming variant, with `order_type: "sim"` |
| **Response** | `{ order_id, client_secret }` |

### 3.4 Create Manual Order

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{WP_API}/encriptados/v1/orders/manual` |
| **Function** | `createManualOrderAndIntent()` |
| **File** | `src/payments/orderApi.ts` |
| **Request Body** | `{ product_id, qty, email, payment_provider: "stripe", amount, currency, success_url? }` |
| **Response** | `{ order_id, client_secret }` |

### 3.5 Create Renewal Order

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{WP_API}/encriptados/v1/orders/renewal` |
| **Function** | `createRenewalOrder()` |
| **File** | `src/lib/payments/orderApi.ts` |
| **Request Body** | `{ product_id, license_id, email, qty, months, payment_provider: "stripe", amount, currency }` |
| **Response** | `{ ok, order_id, status, provider, provider_ref?, client_secret, payment_url? }` |

### 3.6 Get Public Order Status (Polling)

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{WP_API}/encriptados/v1/orders/{orderId}/public-status` |
| **Functions** | `fetchPublicStatus()` in both `src/lib/payments/orderApi.ts` and `src/payments/orderApi.ts` |
| **Response** | `{ ok, order_id, type, status: "pending"|"paid"|"fulfilled"|"pending_admin"|"cancelled", provider }` |

---

## 4. PAYMENTS — Webhooks

### 4.1 Stripe Payment Webhook

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/wp-json/encriptados/v1/payments/stripe` |
| **Type** | Next.js API route (server-side) |
| **File** | `src/app/api/wp-json/encriptados/v1/payments/stripe/route.ts` |
| **Request Body** | `{ provider_ref: string, status: "paid" }` |
| **Response** | `{ ok: true }` |
| **Auth** | None (webhook from Stripe) |

### 4.2 Kriptomus Payment Webhook

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/wp-json/encriptados/v1/payments/kriptomus` |
| **Type** | Next.js API route (server-side) |
| **File** | `src/app/api/wp-json/encriptados/v1/payments/kriptomus/route.ts` |
| **Request Body** | `{ provider_ref: string, status: "paid" }` |
| **Response** | `{ ok: true }` |

---

## 5. COUPONS

### 5.1 Validate Coupon (Client → Next.js Proxy)

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/coupons/validate?code={code}&product_id={productId?}` |
| **Function** | `validateCoupon()` |
| **File** | `src/lib/payments/orderApi.ts` (client-side) |
| **Response** | `{ ok, discount_type: "fixed"|"percent", discount_amount, message }` |

### 5.2 Validate Coupon (Next.js Proxy → WP)

| Field | Value |
|---|---|
| **Method** | `GET` (server-side fetch) |
| **URL** | `{WP_API}/encriptados/v1/admin/coupons?q={code}&product_id={productId?}` |
| **File** | `src/app/api/coupons/validate/route.ts` |
| **Auth** | `Authorization: Basic <base64>` |
| **Response (from WP)** | Array of coupon objects: `[{ code, discount_type, amount, ... }]` |
| **Response (to client)** | `{ ok, code, discount_type, discount_amount, message }` |

---

## 6. AUTH (JWT & Token)

### 6.1 JWT Token (WordPress)

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{WP_API}/jwt-auth/v1/token` |
| **Function** | `getToken()` |
| **File** | `src/features/products/authService.ts` |
| **Request Body** | `{ username: NEXT_PUBLIC_WP_USERNAME, password: NEXT_PUBLIC_WP_PASSWORD }` |
| **Response** | `{ token: string }` |

### 6.2 Login With Token

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{NEXT_PUBLIC_WP_API}/loginWithToken` |
| **Function** | `userAuthLogin()` |
| **File** | `src/features/auth/services.ts` |
| **Request Body** | `{ token: string }` |
| **Response** | `{ success, data: { token, type, name, expires_at }, message }` |
| **React Query hook** | `useAuthLogin` |
| **Uses** | `axiosInstance` (with Bearer token interceptor) |

### 6.3 Register Token

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{NEXT_PUBLIC_WP_API}/registerToken` |
| **Function** | `userRegisterToken()` |
| **File** | `src/features/auth/services.ts` |
| **Request Body** | `{}` (empty) |
| **Response** | `{ success, data: { token, token_separated, download_url }, message }` |
| **React Query hook** | `useRegisterToken` |
| **Uses** | `axiosInstance` |

---

## 7. RECHARGE

### 7.1 Recharge SIM Number

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{NEXT_PUBLIC_WP_API}/rechargeNumberSim` |
| **Function** | `rechargeNumberSim()` |
| **File** | `src/features/recharge/services.ts` |
| **Request Body** | `{ number: string }` |
| **Response** | `{ number: string }` |
| **React Query hook** | `useRechargeNumber` |
| **Uses** | `axiosInstance` |

---

## 8. REGIONS & COUNTRIES

### 8.1 Fetch Regions

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{WP_API}/encriptados/v1/regions` |
| **Function** | `fetchRegions()` |
| **File** | `src/services/regionCountryService.ts` |
| **Response** | `Region[]` — `{ id, name, slug }` |

### 8.2 Fetch Countries by Region

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{WP_API}/encriptados/v1/regions/{regionId}` |
| **Function** | `fetchCountries(regionId)` |
| **File** | `src/services/regionCountryService.ts` |
| **Response** | `{ id, name, countries: [{ id, name }] }` |

---

## 9. SIM TIM

**Base URL:** `NEXT_PUBLIC_SIMTIM_BASEURL` (default: `https://encriptados.es/wp-json/encriptados/v1/simtim`)

### 9.1 Get Regions

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{SIMTIM_BASE}/regions?service={service}` |
| **Function** | `getRegions(service)` |
| **File** | `src/services/simtimService.ts` |
| **Query Params** | `service`: `"esim_datos"` \| `"recarga_datos"` \| `"sim_fisica"` |
| **Response** | `Region[]` — `{ code, name, countryCount, minFrom: { amount, currency } | null }` |

### 9.2 Get Countries

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{SIMTIM_BASE}/countries` |
| **Function** | `getCountries()` |
| **File** | `src/services/simtimService.ts` |
| **Response** | `Country[]` — `{ code, name, flag }` |

### 9.3 Search Regions

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{SIMTIM_BASE}/search?scope=region&q={query}` |
| **Function** | `searchRegions(q)` |
| **File** | `src/services/simtimService.ts` |
| **Response** | `Region[]` |

### 9.4 Search Countries

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{SIMTIM_BASE}/search?scope=country&q={query}` |
| **Function** | `searchCountries(q)` |
| **File** | `src/services/simtimService.ts` |
| **Response** | `Country[]` |

---

## 10. TOTTOLI (eSIM / Packs)

### 10.1 Tottoli Checkout

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `https://encriptados.es/wp-json/encriptados/v1/tottoli/checkout` |
| **Function** | `tottoliCheckout()` |
| **File** | `src/features/products/payments/tottoliCheckout.ts` |
| **Request Body** | `{ email, product: "esim"|"data"|"minutes"|"sim_physical", method: "card"|"cryptomus", amount, currency?, product_id?, qty?, sim_number?, iccid?, esim_type?, esim_group?, shipping_payload?, meta? }` |
| **Response** | `{ ok: true, order_id, status, provider: "stripe"|"cryptomus", provider_ref?, client_secret?, payment_url? }` |

### 10.2 Get Minutes Packs

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `https://encriptados.es/wp-json/encriptados/v1/tottoli/rest/packs?perPage=50&page=1` |
| **Function** | `useGetEncryptedPacks` (React Query) |
| **File** | `src/features/products/queries/useGetEncryptedPacks.ts` |
| **Response** | `MinutePackApi[]` or `{ data: MinutePackApi[] }` — each: `{ id, name?, price?, minutes?, pricePerMinute? }` |

### 10.3 Get Data Packs

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `https://encriptados.es/wp-json/encriptados/v1/tottoli/rest/dataPacks?perPage=50&page=1` |
| **Function** | `useGetEncryptedPacks` (React Query) |
| **File** | `src/features/products/queries/useGetEncryptedPacks.ts` |
| **Response** | `DataPackApi[]` or `{ data: DataPackApi[] }` — each: `{ id, name?, price?, dataAmount?, pricePerDataUnit? }` |

---

## 11. BLOG

### 11.1 Get Blogs

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `https://encriptados.es/wp-json/encriptados/v1/blogs?lang=es` |
| **Files** | `src/app/[locale]/blog/[postId]/page.tsx`, `src/app/[locale]/blog/[postId]/components/ContentBlogById.tsx`, `src/app/[locale]/blog/components/BlogPage.tsx` |
| **Response** | `BlogPost[]` — `{ id, card: { imagen, imagen_full?, titulo, descripcion, fecha }, contenido: { imagen, titulo, cuerpo, autor? } }` |

---

## 12. WORDPRESS (Posts)

### 12.1 Get WP Posts

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{WP_API_URL}/posts` |
| **Function** | `getPosts()` |
| **File** | `src/services/wordpress.ts` |
| **Auth** | `Authorization: Basic {WP_AUTH_TOKEN}` |
| **Response** | WordPress standard posts array |

---

## 13. ADMIN

### 13.1 Complete UserID Order

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/wp-json/encriptados/v1/admin/orders/{id}/complete` |
| **Type** | Next.js API route (server-side) |
| **File** | `src/app/api/wp-json/encriptados/v1/admin/orders/[id]/complete/route.ts` |
| **Auth** | `Authorization: Basic <base64>` (validated via `requireBasicAuth`) |
| **Request Body** | `{ final_username: string (min 3), final_password: string (min 8) }` |
| **Response** | `{ ok: true }` |
| **Logic** | Updates order status to `fulfilled`, sends email to customer |

### 13.2 Add Licenses

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/wp-json/encriptados/v1/admin/licenses` |
| **Type** | Next.js API route (server-side) |
| **File** | `src/app/api/wp-json/encriptados/v1/admin/licenses/route.ts` |
| **Auth** | `Authorization: Basic <base64>` |
| **Request Body** | `{ product_id: number, licenses: string[] }` |
| **Response** | `{ ok: true, productId, added, total }` |

---

## 14. EXTERNAL / THIRD-PARTY

### 14.1 REST Countries API

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `https://restcountries.com/v3.1/name/{countryName}` |
| **File** | `src/shared/components/ListOfCountries/ListOfCountries.tsx` |
| **Response** | `Country[]` — `{ cca3, flags: { svg }, name: { common } }` |

---

## 15. Next.js Internal API Routes (BFF)

These are Next.js `route.ts` files that act as server-side endpoints accessible at `/api/...`.

| Route | Method | File | Description |
|---|---|---|---|
| `/api/products?category={id}` | GET | `src/app/api/products/route.ts` | Get products by category (stub/incomplete) |
| `/api/coupons/validate?code=...&product_id=...` | GET | `src/app/api/coupons/validate/route.ts` | Proxy to WP coupon validation |
| `/api/wp-json/encriptados/v1/orders/roaming` | POST | `src/app/api/wp-json/encriptados/v1/orders/roaming/route.ts` | Create roaming order (in-memory) |
| `/api/wp-json/encriptados/v1/orders/userid` | POST | `src/app/api/wp-json/encriptados/v1/orders/userid/route.ts` | Create userid order (in-memory) |
| `/api/wp-json/encriptados/v1/payments/stripe` | POST | `src/app/api/wp-json/encriptados/v1/payments/stripe/route.ts` | Stripe webhook handler |
| `/api/wp-json/encriptados/v1/payments/kriptomus` | POST | `src/app/api/wp-json/encriptados/v1/payments/kriptomus/route.ts` | Kriptomus webhook handler |
| `/api/wp-json/encriptados/v1/admin/orders/{id}/complete` | POST | `src/app/api/wp-json/encriptados/v1/admin/orders/[id]/complete/route.ts` | Admin: complete userid order |
| `/api/wp-json/encriptados/v1/admin/licenses` | POST | `src/app/api/wp-json/encriptados/v1/admin/licenses/route.ts` | Admin: add license keys |

---

## 16. Stripe SDK (Client-Side)

Not REST calls but Stripe.js SDK calls used for payment confirmation:

| Action | Function | File |
|---|---|---|
| `loadStripe(pk)` | `getStripe()` | `src/payments/stripeClient.ts` |
| `stripe.confirmCardPayment(clientSecret, ...)` | `confirmCardPayment()` | `src/payments/stripeClient.ts` |
| `stripe.checkout.sessions.create(...)` | `createStripeCheckout()` | `src/lib/payments/stripe.ts` (server-side) |

---

## 17. Kriptomus (Server-Side)

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{API_CRYPTO_MUS}` (env variable) |
| **Function** | `createKriptomusInvoice()` |
| **File** | `src/lib/payments/kriptomus.ts` |
| **Request Body** | `{ amount, currency, email, metadata }` |
| **Response** | `{ payment_url \| url \| result.url, provider_ref \| invoice_id \| result.invoice_id \| uuid }` |
| **Note** | Falls back to stub if env var not set |

---

## Summary by Domain

| Domain | Endpoint Count | Key Files |
|---|---|---|
| **Products** | 4 | `features/products/services.ts`, `queries/useGetEncryptedPacks.ts`, `ProductSearch.tsx` |
| **Orders/Checkout** | 6 | `lib/payments/orderApi.ts`, `payments/orderApi.ts`, `services/checkout.ts` |
| **Payments (Webhooks)** | 2 | `app/api/.../payments/stripe/route.ts`, `.../kriptomus/route.ts` |
| **Coupons** | 2 | `lib/payments/orderApi.ts`, `app/api/coupons/validate/route.ts` |
| **Auth** | 3 | `features/auth/services.ts`, `features/products/authService.ts` |
| **Recharge** | 1 | `features/recharge/services.ts` |
| **Regions/Countries** | 2 | `services/regionCountryService.ts` |
| **SIM TIM** | 4 | `services/simtimService.ts` |
| **Tottoli** | 3 | `features/products/payments/tottoliCheckout.ts`, `queries/useGetEncryptedPacks.ts` |
| **Blog** | 1 | Multiple page components |
| **WordPress** | 1 | `services/wordpress.ts` |
| **Admin** | 2 | `app/api/.../admin/...` routes |
| **External** | 1 | `ListOfCountries.tsx` |
| **Kriptomus** | 1 | `lib/payments/kriptomus.ts` |
| **TOTAL** | **~33 unique endpoints** | |
