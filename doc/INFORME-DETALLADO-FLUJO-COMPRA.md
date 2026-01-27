# Informe Detallado: Flujo de Datos al Backend en Compras

Fecha: 27 de Enero de 2026
Estado: **Validado**

Este informe detalla técnicamente cómo se construyen, envían y procesan los datos de compra para cada tipo de producto en Encriptados-web. Se ha auditado el código desde el componente visual (Popup) hasta el endpoint de recepción.

---

## 1. Apps, Sistemas y Routers (Flujo `userid`)

Este flujo maneja productos digitales (licencias de apps), sistemas operativos (SecureCrypt) y hardware tipo Router/MiFi.

### 1.1 Recolección de Datos (Frontend)
**Componente:** `src/shared/components/ModalPayment/new/ModalNewUser.tsx`
**Formulario:** `src/shared/components/ModalPayment/new/UnifiedPurchaseForm.tsx`

El usuario selecciona opciones y el `UnifiedPurchaseForm` construye un objeto `FormData`. Al pulsar pagar (ej. Kriptomus), se invoca `payUserId` con el siguiente **payload completo**:

| Campo | Origen | Descripción |
|-------|--------|-------------|
| `product_id` | Prop | ID del producto (ej. 123) |
| `email` | Input | Email del cliente |
| `amount` | Cálculo | Precio total en USD |
| `currency` | Constante | "USD" |
| `payment_provider`| Selección | "stripe" o "kriptomus" |
| `qty` | Estado `quantity` | Cantidad de licencias/tems |
| `username` | Lógica | `telegramId` (prioridad) o primer `usernames[0]` |
| `variant_id` | Estado `selectedVariant` | ID de la variante (duración/tipo exacto) |
| `sku` | Variante | SKU de la variante |
| `licensetime` | Variante | Tiempo de licencia (ej. "3", "12") |
| `license_type` | Form `licenseType` | "new" (Alta) o "renew" (Renovación) |
| `renew_id` | Input | ID a renovar (si aplica) |
| `os_type` | Input | "android" o "ios" (para SecureCrypt) |
| `silent_phone_mode`| Tabs | "new_user", "roning_code", "recharge" |
| `usernames` | Input Lista | Array de usuarios a crear (ej. Silent Phone) |
| `coupon_code` | Input | Código de cupon aplicado (ej. "DESCUENTO5") |
| `discount` | Estado | Monto descontado |
| `source_url` | URL Param | Trazabilidad de origen |
| `meta` | Objeto | Copia redundante de todos los datos extra |

### 1.2 Envío al Servicio (`CheckoutService`)
**Archivo:** `src/services/checkout.ts` (`userId` method)
**Endpoint:** `POST /api/wp-json/encriptados/v1/orders/userid` (Proxy interno a Next.js API)

**Lógica de Envío:**
1. Se construye un payload `extended` con TODOS los campos arriba mencionados.
2. Se intenta enviar.
3. **Fallback de Seguridad:** Si el backend responde con error `400` o `422` (validación estricta fallida), el servicio captura el error y **reintenta automáticamente** enviando solo el payload `minimal` (`product_id`, `email`, `username`, `provider`, `amount`).

### 1.3 Recepción y Validación (Backend Next.js)
**Archivo:** `src/app/api/wp-json/encriptados/v1/orders/userid/route.ts`
**Esquema:** `src/lib/validation.ts` -> `userIdCheckoutSchema`

**Estado de Validación:** ✅ **CORRECTO**
El esquema de validación (`zod`) ha sido verificado y **permite explícitamente** todos los campos opcionales extendidos:
```typescript
variant_id: z.number().optional(),
sku: z.string().optional(),
license_type: z.enum(['new', 'renew']).optional(),
renew_id: z.string().optional(),
os_type: z.enum(['android', 'ios']).optional(),
meta: z.record(z.any()).optional(),
// ... y el resto
```
Esto asegura que la validación `safeParse` no rechazará los datos ricos enviados por el frontend.

### 1.4 Persistencia
**Archivo:** `src/lib/services/orderService.ts` -> `checkoutUserId`

El handler de la ruta extrae los campos validados y, **si existen**, los inyecta dentro de la propiedad `meta` del objeto `Order` antes de guardarlo en la base de datos `OrdersRepo`.
**Conclusión:** Datos como `license_type`, `os_type`, `usernames` NO se pierden; quedan guardados en el JSON `meta` de la orden.

---

## 2. Roaming (Flujo `roaming`)

Maneja la compra de paquetes de datos internacionales (para eSIM/SIM).

### 2.1 Datos y Envío
**Componente:** `ModalRoning.tsx` -> `UnifiedPurchaseForm`
**Servicio:** `CheckoutService.roaming`
**Endpoint:** `POST /api/wp-json/encriptados/v1/orders/roaming`

**Payload:** Similar a UserID pero enfocado en roaming:
- `product_id`, `qty`, `email`, `amount`, `provider`
- `variant_id`, `sku`, `licensetime` (Variant data)
- `coupon_code`, `discount`
- `silent_phone_mode` (a veces usado para identificar tipo de carga)

**Recepción Backend:**
**Archivo:** `src/app/api/wp-json/encriptados/v1/orders/roaming/route.ts`
**Esquema:** `roamingCheckoutSchema`

**Estado:** ✅ **CORRECTO**
Al igual que en UserID, el backend valida (permitiendo opcionales) y guarda todos los datos extra en `order.meta`.

---

## 3. SIM Cards (Flujo `tottoli`)

Maneja la compra de SIMs físicas y eSIMs (O perfiles Tottoli).

### 3.1 Recolección de Datos
**Componente:** `ModalSIM.tsx` -> `SimFormUnified.tsx`
**Servicio:** `src/features/products/payments/tottoliCheckout.ts`

**Payload Enviado:**
```json
{
  "email": "...",
  "product": "esim" | "sim_physical" | "minutes" | "data",
  "method": "card" | "cryptomus",
  "amount": 100,
  "qty": 1,
  "sim_number": "...",
  "iccid": "...",
  "esim_type": "...",
  "meta": {
    "variantId": 123,
    "sku": "...",
    "shippingAddress": "...",
    "shippingFullName": "...",
    // ... otros datos de envío y variante
  }
}
```

### 3.2 Envío al Backend (Diferencia Crítica)
**Endpoint:** `https://encriptados.es/wp-json/encriptados/v1/tottoli/checkout`

⚠ **Nota Importante:** Este servicio **NO** apunta a una ruta API interna de Next.js (`src/app/api/...`) en este codebase. Apunta a una URL absoluta que parece ser la instalación de WordPress (o un backend legado) que corre en el dominio principal `encriptados.es`.
Por lo tanto, la validación final depende de ese backend externo.

**Mecanismo de Seguridad:**
El archivo `tottoliCheckout.ts` implementa una lógica de reintento robusta:
1. Envía payload con `meta`.
2. Si recibe error `400` o `422`, elimina la propiedad `meta` y reintenta el envío.
Esto asegura que la compra proceda incluso si el backend legado no soporta los campos nuevos de shipping/variantes.

---

## 4. Recargas (Flujo Manual)

**Componente:** `ModalRecharge.tsx` -> `PurchaseScaffold`

### 4.1 Comportamiento
Actualmente, este modal **NO procesa pagos automáticamente**.
Si se abre en modo 'recharge':
1. `PurchaseScaffold` detecta `showRechargeCTA={true}`.
2. Renderiza un mensaje: "Si quieres recargar comunícate con nosotros".
3. Muestra un botón que redirige a **Telegram**.

**Conclusión:** No hay flujo de datos al backend; es un flujo de redirección manual a soporte.

---

## Resumen de Validación

| Tipo de Producto | Endpoint | Integridad de Datos | Observación |
|------------------|----------|---------------------|-------------|
| **Apps / Sistemas** | `/api/wp-json/.../userid` | ✅ Alta | Frontend envía todo, Backend guarda todo en `meta`. |
| **Roaming** | `/api/wp-json/.../roaming` | ✅ Alta | Idem anterior. |
| **SIM Cards** | `https://encriptados.es/...` | ⚠️ Externa | Depende del backend WordPress. Frontend tiene fallback anti-fail. |
| **Recargas** | N/A | ℹ️ Manual | Redirección a Telegram. No hay API call. |
