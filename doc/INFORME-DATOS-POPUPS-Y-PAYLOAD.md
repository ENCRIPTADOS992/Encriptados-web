# Informe: Datos recolectados en popups de compra y campos a enviar al backend

Objetivo: enumerar **qué datos recoge cada popup** (Apps / Sistemas / Router / SIM) y proponer **qué campos deben enviarse al backend** (además de los que ya se envían) sin romper lo existente.

## 0) Reglas de diseño (para no dañar lo que funciona)

- Mantener los campos actuales: `product_id`, `email`, `payment_provider`, `amount`, `currency` (+ `qty` en roaming).
- Agregar campos **opcionales** cuando existan (variante/licencia, renovación, OS, usernames, etc.).
- En los requests, si el backend rechaza campos extra (validación estricta), hacer **reintento** automático con el payload mínimo.

## 1) Popups de Apps / Sistemas / Router (tipo `userid`)

### 1.1 Popup: ModalNewUser

Archivo: `src/shared/components/ModalPayment/new/ModalNewUser.tsx`

**Datos recolectados (UI / estado del popup)**
- Producto: `productid`
- Variante/licencia elegida: `selectedVariant` → `{ id, sku?, licensetime, price }`
- Cantidad: `quantity`
- Cupón: `coupon` (texto)
- Descuento aplicado: `discount` (número)
- Precio unitario y total: `unitPrice`, `amount` (derivados)
- Origen: `sourceUrl` (del provider)
- Contexto: `selectedOption` (categoría)

**Datos recolectados (formulario dentro del popup)**
- Identidad: `email`
- Telegram: `telegramId` (opcional)
- Usernames: `usernames[]` (solo algunos productos y según `silentPhoneMode`)
- Tipo de licencia: `licenseType` (`new|renew`) (según política del producto)
- Renovación: `renewId` (si `licenseType=renew`)
- Sistema operativo: `osType` (`android|ios`) (SecureCrypt)
- Modo Silent Phone: `silentPhoneMode` (`new_user|roning_code|recharge`)
- Pago: `method` (`crypto|card`), `cardName`, `postal` (para Stripe)
- Términos: `terms` (no es necesario enviarlo)

### 1.2 Qué enviar al backend (recomendado)

**Campos base (ya existentes)**
- `product_id`
- `email`
- `username` (sugerido): `telegramId` o primer `usernames[0]` (mantener compatibilidad)
- `payment_provider`
- `amount`
- `currency`

**Campos nuevos (opcionales)**
- Variante/licencia:
  - `variant_id` (ID de la variante elegida)
  - `sku` (si existe)
  - `licensetime` (meses o etiqueta equivalente)
- Cantidad:
  - `qty` (en `userid` puede enviarse para consistencia, aunque el backend use 1 por defecto)
- Renovación (si aplica):
  - `license_type` (`new|renew`)
  - `renew_id`
- SecureCrypt (si aplica):
  - `os_type` (`android|ios`)
- Silent Phone (si aplica):
  - `silent_phone_mode`
  - `usernames` (lista completa)
- Promoción:
  - `coupon_code`
  - `discount`
- Trazabilidad:
  - `source_url`
  - `selected_option`
- Extensible:
  - `meta` (objeto) con todo lo anterior (y cualquier detalle adicional que el backend quiera guardar sin cambiar contrato)

## 2) Popups de Roaming (tipo `roaming`)

### 2.1 Popup: ModalRoning

Archivo: `src/shared/components/ModalPayment/new/ModalRoning.tsx`

**Datos recolectados (UI / estado del popup)**
- Producto: `productid`
- Variante/licencia elegida: `selectedVariant` → `{ id, sku?, licensetime, price }`
- Cantidad: `quantity`
- Cupón: `coupon`
- Descuento: `discount`
- Total: `amountUsd`
- Origen: `sourceUrl`
- Contexto: `selectedOption`

**Datos recolectados (formulario)**
- `email`
- (Dependiendo del producto/policy puede aparecer `silentPhoneMode` y/o `usernames[]`)
- Pago: `method`, `cardName`, `postal`

### 2.2 Qué enviar al backend (recomendado)

**Campos base (ya existentes)**
- `product_id`
- `qty`
- `email`
- `payment_provider`
- `amount`
- `currency`

**Campos nuevos (opcionales)**
- `variant_id`, `sku`, `licensetime`
- `coupon_code`, `discount`
- `source_url`, `selected_option`
- `silent_phone_mode`, `usernames`
- `meta` (objeto)

## 3) Popup de Recharge

Archivo: `src/shared/components/ModalPayment/new/ModalRecharge.tsx`

**Datos recolectados**
- Variante/licencia (`selectedVariant`), `quantity`, `coupon`, `discount`, etc.

**Qué enviar**
- Actualmente **no se envía nada** (CTA/Telegram). Si en el futuro se implementa compra de recarga, usar el mismo criterio: enviar `variant_id/sku/licensetime`, `qty`, `coupon_code/discount` y trazabilidad.

## 4) Popups de SIM

### 4.1 Popup: ModalSIM + SimFormUnified

Archivos:
- `src/shared/components/ModalPayment/new/ModalSIM.tsx`
- `src/shared/components/ModalPayment/new/sims/SimFormUnified.tsx`

**Datos recolectados (UI / estado del popup)**
- `formType` (tipo de flujo SIM)
- `quantity`, `coupon`, `discount`
- `selectedPlanId` (cuando aplica: minutos/planes)
- `selectedVariant` (cuando aplica)
- `unitPrice` (derivado), `amountUsd` (derivado)
- `hideSimField` (cuando aplica)
- `sourceUrl`

**Datos recolectados (formulario)**
- Comprador: `email`, `telegram`
- SIM: `simNumber` (según tipo)
- Envío (si física): `fullName`, `address`, `country`, `postalCode`, `phone`
- Pago: `method`, `cardName`, `cardPostal` (Stripe)

### 4.2 Qué enviar al backend (recomendado)

En SIMs el backend principal es `tottoli/checkout`. Ya se envía lo mínimo requerido (email, method, amount, product y campos por tipo). Lo recomendado adicional:
- `selectedPlanId`, `selectedVariantId`, `unitPrice`, `discount`, `shippingFee`, `sourceUrl` dentro de `meta`.

## 5) Ejemplos de payload recomendado (extensión segura)

### 5.1 UserID (Apps/Sistemas/Router)

```json
{
  "product_id": 123,
  "email": "cliente@dominio.com",
  "username": "opcional",
  "payment_provider": "kriptomus",
  "amount": 59,
  "currency": "USD",
  "qty": 1,
  "variant_id": 999,
  "sku": "SKU-123",
  "licensetime": "3",
  "license_type": "renew",
  "renew_id": "ABC-DEF",
  "os_type": "android",
  "silent_phone_mode": "new_user",
  "usernames": ["user1","user2"],
  "coupon_code": "DESCUENTO5",
  "discount": 5,
  "source_url": "https://…",
  "selected_option": 38,
  "meta": { "cualquier_otro_dato": "…" }
}
```

### 5.2 Roaming

```json
{
  "product_id": 123,
  "qty": 2,
  "email": "cliente@dominio.com",
  "payment_provider": "stripe",
  "amount": 99.99,
  "currency": "USD",
  "variant_id": 999,
  "licensetime": "3",
  "coupon_code": "DESCUENTO5",
  "discount": 5,
  "source_url": "https://…",
  "selected_option": 36,
  "meta": { "…" : "…" }
}
```

## 6) Estado actual del código (desfase detectado)

- Se recolecta `selectedVariant` (id/sku/licensetime) en `ModalNewUser` y `ModalRoning`, pero antes no se enviaba al backend.
- Se recolecta `licenseType/renewId/osType/silentPhoneMode/usernames[]` en `UnifiedPurchaseForm`, pero antes no se enviaba al backend.
- Se recolecta `quantity` siempre, pero en `userid` solo se usa localmente para cálculo de total (debería enviarse cuando aplica).

