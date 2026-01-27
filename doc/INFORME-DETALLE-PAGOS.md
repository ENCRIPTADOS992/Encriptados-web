# Informe: Detalle de Pagos y Flujo Técnico (Validado)

Fecha: 27 de Enero de 2026
Estado: **Final / Corregido**

Este informe valida exactamente cómo se procesan los pagos en la aplicación, confirmando que **NO se utiliza redirección** para tarjeta de crédito; todo el proceso ocurre dentro del popup ("Embedded") consumiendo un backend externo.

---

## 1. Apps, Sistemas y Routers (Flujo `userid`)

**Usa:** `UnifiedPurchaseForm.tsx` (Frontend) -> `orderApi.ts` -> API Externa (`encriptados.es/wp-json/encriptados/v1/orders/userid`)

### Flujo de Tarjeta (Stripe Embedded)
1. **Inicio:** El usuario llena los datos de tarjeta (número, fecha, CVC) directamente en el popup. Estos campos son **Stripe Elements** montados localmente.
2. **Solicitud de Intención:** Al dar "Continuar", el frontend envía el payload completo a la API Externa.
3. **Respuesta Backend:** La API devuelve un `client_secret` asociado a un `PaymentIntent` de Stripe creado en el servidor.
4. **Confirmación:** El frontend recibe el `client_secret` y ejecuta `stripe.confirmCardPayment` en segundo plano.
   - **Éxito:** Muestra modal de éxito sin recargar la página.
   - **Fallo:** Muestra error en el mismo popup (ej. "Fondos insuficientes").

**¿Qué pasa si falla o no hay pago?**
- Si la API no devuelve `client_secret`, el frontend muestra "No se pudo iniciar el pago".
- Si el pago es rechazado por el banco, el usuario permanece en el popup para intentar con otra tarjeta.

### Flujo de Cripto (Kriptomus)
1. **Inicio:** El frontend solicita la creación de una orden a la API.
2. **Redirección:** La API devuelve una `payment_url`.
3. **Acción:** El navegador redirige al usuario a la pasarela de Kriptomus.

---

## 2. Roaming (Datos Internacionales)

**Usa:** `ModalRoning.tsx` -> `orderApi.ts` -> API Externa (`.../orders/roaming`)

### Flujo
**Idéntico al de UserID.**
- **Tarjeta:** Se llena en popup -> API devuelve `client_secret` -> Se confirma pago en popup.
- **Cripto:** Redirección.

---

## 3. SIM Cards (Físicas y eSIMs)

**Usa:** `SimFormUnified.tsx` -> `tottoliCheckout.ts` -> API Externa (`.../tottoli/checkout`)

### Flujo de Tarjeta (Stripe Embedded)
El usuario corregía: *"llena los datos de tarjeta de pago desde el popup y se envian al back"*.
**Confirmación:** El código `SimFormUnified.tsx` implementa exactamente esto:
1. **Fase 1 (Datos):** El usuario llena shipping y datos de tarjeta (Stripe Elements).
2. **Fase 2 (Submit):** Se envía todo a la API de Tottoli.
3. **Respuesta:** La API Tottoli devuelve `{ client_secret: "pi_..." }`.
4. **Fase 3 (Confirmación):** El frontend usa ese secreto para `confirmCardPayment`.

**Nota:** A diferencia de UserID, el formulario de SIMs envía los datos en un solo paso (crear orden) y luego confirma el pago inmediatamente si recibe el secreto.

---

## 4. Recargas

**Usa:** `ModalRecharge.tsx`

### Flujo
**Manual.** No hay API de pagos. Botón "Ir a Telegram".

---

## Resumen de Arquitectura

| Producto | Proveedor Tarjeta | UX Tarjeta | Backend que procesa |
|---|---|---|---|
| **Apps / Router** | Stripe | **Popup (Embedded)** | `encriptados.es/wp-json` (WordPress) |
| **Roaming** | Stripe | **Popup (Embedded)** | `encriptados.es/wp-json` (WordPress) |
| **SIMs** | Stripe | **Popup (Embedded)** | `encriptados.es/wp-json` (WordPress) |

> **Nota Técnica:** El código local en `src/lib/payments/stripe.ts` (que implementaba redirección) **NO SE USA** en producción, ya que las variables de entorno `NEXT_PUBLIC_WP_API` apuntan a la infraestructura externa de WordPress, la cual soporta el flujo embedded que consume el frontend.
