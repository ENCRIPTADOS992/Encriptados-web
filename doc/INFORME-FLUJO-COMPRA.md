# Informe: Flujo de compra (Web) y datos enviados al backend

Este documento describe el flujo de compra en el frontend (Next.js), qué datos se envían al backend en cada paso y dónde se toman decisiones (tipo de producto, modo de compra, proveedor de pago). También incluye hipótesis del problema reportado: correos indicando “licencias agotadas” al finalizar compras de **Apps / Sistemas / Router**.

## 1) Componentes y conceptos principales

### 1.1 Contexto del modal (entrada a la compra)

La compra inicia casi siempre con `openModal(...)` del contexto:

- Archivo: `src/providers/ModalPaymentProvider.tsx`
- Tipo de params: `ModalPaymentParams`

Campos relevantes del `openModal`:

- `productid` (string): ID del producto (WP).
- `languageCode` (string): locale actual.
- `selectedOption` (number): categoría/segmento seleccionado (ej: 38 Apps, 35 Sistemas, 36 Router, 40 SIM).
- `initialPrice` (number): precio inicial del plan/variante seleccionada en UI.
- `variantId` (number): ID de variante (si el caller lo proporciona).
- `provider`, `typeProduct`: valores del backend para rutas/condiciones especiales.
- `mode`: `"new_user" | "roning_code" | "recharge" | "sim"`.
- `sourceUrl`: URL desde la cual se abrió el modal (se auto-captura al abrir).

Notas:
- El provider actualmente hace `console.log(...)` del estado y params (útil para trazar en consola).

### 1.2 Selector de pantalla del modal (mode/kind)

El modal decide qué componente mostrar con:

- `src/shared/components/ModalPayment/ModalPaymentController.tsx`
- `src/shared/components/ModalPayment/useModalPaymentController.ts`

Pasos:
1. Lee `params.productid`, `params.selectedOption`, query params (`provider`, `selectedOption`).
2. Carga el producto con `getProductById(productid)`.
3. Calcula `kind` con `getProductCategoryKind(...)`.
4. Si detecta `kind === "SIM"`, auto-cambia el `mode` a `"sim"` (solo al inicio de la sesión del modal).

## 2) Flujo end-to-end: desde el “Comprar” hasta el “finalizado”

### 2.1 Inicio de compra (UI)

Ejemplos de entrypoints:
- Apps: `src/app/[locale]/apps/[slug]/AppClientPage.tsx` → `handleBuy()` y auto-popup con `?buy=1`.
- Our Products (cards): `src/app/[locale]/our-products/components/CardProduct.tsx` → `openModal(...)`.
- SIM: `src/app/[locale]/sim/[slug]/SimClientPage.tsx` (auto-popup `?buy=1`).

### 2.2 Camino A: Pago por crypto (Kriptomus) con redirect

Componentes:
- `src/shared/components/ModalPayment/new/ModalNewUser.tsx` (no SIM)
- Hook: `src/shared/hooks/useCheckout.ts`
- Service: `src/services/checkout.ts`

Payload enviado (UserID):

```json
POST {NEXT_PUBLIC_WP_API || https://encriptados.es/wp-json}/encriptados/v1/orders/userid
{
  "product_id": 123,
  "email": "cliente@dominio.com",
  "username": "opcional",
  "payment_provider": "kriptomus",
  "amount": 99.99,
  "currency": "USD"
}
```

Payload enviado (Roaming):

```json
POST {WP}/encriptados/v1/orders/roaming
{
  "product_id": 123,
  "qty": 1,
  "email": "cliente@dominio.com",
  "payment_provider": "kriptomus",
  "amount": 99.99,
  "currency": "USD"
}
```

Respuesta esperada:

```json
{
  "ok": true,
  "order_id": 9999,
  "status": "pending",
  "provider": "kriptomus",
  "provider_ref": "…",
  "payment_url": "https://…"
}
```

Acción posterior:
- El frontend hace `window.location.href = payment_url` (sale del sitio a completar el pago).

### 2.3 Camino B: Pago por tarjeta (Stripe) con PaymentIntent + confirmación

Componentes:
- Form: `src/shared/components/ModalPayment/new/UnifiedPurchaseForm.tsx`
- API client: `src/lib/payments/orderApi.ts`
- Stripe client: `src/payments/stripeClient.ts` (confirmación)

Paso 1: crear orden + intent (Stripe) en backend WP:

UserID:
```json
POST {WP}/encriptados/v1/orders/userid
{
  "product_id": 123,
  "email": "cliente@dominio.com",
  "username": "opcional",
  "payment_provider": "stripe",
  "amount": 99.99,
  "currency": "USD"
}
```

Roaming:
```json
POST {WP}/encriptados/v1/orders/roaming
{
  "product_id": 123,
  "qty": 1,
  "email": "cliente@dominio.com",
  "payment_provider": "stripe",
  "amount": 99.99,
  "currency": "USD"
}
```

Respuesta esperada:
```json
{
  "ok": true,
  "order_id": 9999,
  "client_secret": "pi_..._secret_..."
}
```

Paso 2: confirmar pago en frontend con Stripe:
- Se envía a Stripe: `client_secret` y datos de billing:
  - `name`, `email`, `postal_code` (opcionales).

Paso 3: polling de estado (frontend):
- `GET {WP}/encriptados/v1/orders/{orderId}/public-status`
- Se consulta cada 2s hasta `fulfilled | pending_admin | cancelled` o timeout.

### 2.4 SIMs (ramas especiales)

Componente principal:
- `src/shared/components/ModalPayment/new/ModalSIM.tsx`
- Submit handler: `src/shared/components/ModalPayment/new/sims/services/createSimSubmitHandler.ts`

Rama 1: SIM “Encrypted” por Tottoli:
- Endpoint: `POST https://encriptados.es/wp-json/encriptados/v1/tottoli/checkout`
- Payload (varía por `formType`), ejemplos:

eSIM:
```json
{
  "email": "cliente@dominio.com",
  "method": "card" | "cryptomus",
  "amount": 10,
  "currency": "USD",
  "product": "esim",
  "qty": 1
}
```

SIM física:
```json
{
  "email": "cliente@dominio.com",
  "method": "card" | "cryptomus",
  "amount": 10,
  "currency": "USD",
  "product": "sim_physical",
  "shipping_payload": {
    "shipping_name": "Nombre Apellido",
    "country": "…",
    "postal_code": "…",
    "phone": "…",
    "telegram_id": "…"
  }
}
```

Resultado:
- Si `method=card`: devuelve `client_secret` y se confirma en frontend con Stripe.
- Si `method=cryptomus`: devuelve `payment_url` y se redirige.

Rama 2: SIM TIM / otras SIMs (no Tottoli):
- Se usa un `payUserId(...)` para crear orden y redirigir/Stripe.
- Se arma un `metadata` con:
  - `type`, `productFamily`, `productFormat`, `slug`, `sourcePage`
  - datos de shipping y contacto (`telegram`, `fullName`, `address`, `country`, `postalCode`, `phone`)
  - `quantity`, `simNumber`, `planId`

Importante:
- En `useCheckout.payUserId` (no SIM) el payload NO incluye `metadata`.
- Para SIM, el handler espera `payUserId` con `metadata?`. Hay que confirmar qué implementación real recibe el handler en el modal SIM (puede ser wrapper).

## 3) Webhooks / confirmación “finalizada”

### 3.1 En WordPress (WP)

La compra “finalizada” en la práctica depende del backend:
- Para crypto: Kriptomus envía webhook al backend, el backend marca orden como pagada y dispara acciones (incluyendo correos).
- Para tarjeta: Stripe webhook al backend y/o polling público confirma el estado.

### 3.2 En este repo (Next API “/api/wp-json/…”)

Existen endpoints de Next que simulan/normalizan:
- `src/app/api/wp-json/encriptados/v1/orders/*`
- `src/app/api/wp-json/encriptados/v1/payments/*`

Y un flujo interno:
- `src/lib/services/orderService.ts` crea órdenes y revisa stock (InventoryRepo).
- `src/lib/services/paymentService.ts` procesa “paid” y llama `sendEmail(...)`.
- `src/lib/email.ts` actualmente solo hace `console.log`, pero en producción podría ser real.

## 4) Datos que probablemente faltan (relacionado a “licencias agotadas”)

### 4.1 La UI sí permite elegir plan/variante, pero NO se envía al backend

En Apps/Sistemas/Router:
- En `ModalNewUser.tsx` se selecciona `selectedVariant` (por `variantId` o por `initialPrice`).
- Ese `selectedVariant` impacta `unitPrice` y el total.
- Pero al crear la orden (crypto o tarjeta) se envía solo:
  - `product_id`, `email`, `username`, `payment_provider`, `amount`, `currency` (y `qty` en roaming)
- NO se envía:
  - `variantId`
  - `sku`
  - `licensetime`
  - ningún identificador inequívoco de la licencia/plan comprado.

Esto puede provocar que el backend:
- No sepa qué licencia asignar.
- Use una licencia “default” o una variante incorrecta.
- Detecte que esa licencia está sin stock y dispare correos de “licencias agotadas” al “finalizar” (pago confirmado).

### 4.2 Stock stub en Next API (si el frontend apunta al Next en vez de WP real)

En `src/lib/repos/inventoryRepo.ts` el stock está hardcodeado:
- Solo `productId=122` tiene stock inicial 10.
- El resto queda en 0 por defecto.

Si `NEXT_PUBLIC_WP_API` se configurara apuntando al propio sitio (o a `/api/wp-json`), cualquier checkout roaming podría caer en `out_of_stock` para la mayoría de productos.

## 5) Checklist para aislar el problema (recomendado)

1) Confirmar a qué host está apuntando `NEXT_PUBLIC_WP_API` en el entorno donde “se envían correos”.
   - Debe ser `https://encriptados.es/wp-json` (o el WP real), no el Next.
2) Capturar el request real al backend al comprar (Network tab):
   - Ver si al endpoint `orders/userid` o `orders/roaming` se envía algún campo de variante/licencia.
3) Ver si el backend WP espera campos adicionales (ej: `variant_id`, `sku`, `licensetime`) para asignar licencias.
4) Confirmar el template de email de “licencias agotadas” y bajo qué condición se dispara.

## 6) Archivos relevantes (referencia rápida)

- Modal context: `src/providers/ModalPaymentProvider.tsx`
- Modal router: `src/shared/components/ModalPayment/ModalPaymentController.tsx`
- Selección kind/mode: `src/shared/components/ModalPayment/useModalPaymentController.ts`
- Compra crypto: `src/shared/hooks/useCheckout.ts`, `src/services/checkout.ts`
- Compra tarjeta: `src/shared/components/ModalPayment/new/UnifiedPurchaseForm.tsx`, `src/lib/payments/orderApi.ts`
- SIM submit: `src/shared/components/ModalPayment/new/sims/services/createSimSubmitHandler.ts`
- Next API (si aplica): `src/app/api/wp-json/encriptados/v1/orders/*`, `src/lib/services/orderService.ts`
- Stock stub: `src/lib/repos/inventoryRepo.ts`

