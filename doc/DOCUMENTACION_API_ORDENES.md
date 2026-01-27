# Documentación API de Órdenes - Encriptados

## Tabla de Contenidos
1. [Tipos de Productos](#tipos-de-productos)
2. [Endpoints de Creación de Órdenes](#endpoints-de-creación-de-órdenes)
3. [Flujo de Pago](#flujo-de-pago)
4. [Webhooks](#webhooks)
5. [Ejemplos por Producto](#ejemplos-por-producto)

---

## Tipos de Productos

### 1. **Productos Roaming** (tienen licencias en inventario)
- **Productos:** Armadillo Chat, Threema, VNC, Vault Chat, NordVPN, Salt, SIM Encriptados
- **Endpoint:** `/wp-json/encriptados/v1/orders/roaming`
- **Fulfillment:** Automático al confirmar pago
- **Email:** "Tu código roaming" con las licencias asignadas

### 2. **Productos UserID** (requieren creación manual de usuario)
- **Productos:** Silent Phone
- **Endpoint:** `/wp-json/encriptados/v1/orders/userid`
- **Fulfillment:** Manual (admin debe crear el usuario)
- **Email:** "Estamos creando tu usuario"

### 3. **Productos Manual** (se procesan vía Telegram)
- **Endpoint:** `/wp-json/encriptados/v1/orders/manual`
- **Fulfillment:** Manual vía Telegram
- **Email:** "Gracias — continúa por Telegram"

### 4. **Productos Tottoli** (SIMs, eSIMs, recargas)
- **Productos:** eSIM, eSIM + Datos, Recargas de datos, Recargas de minutos
- **Endpoint:** Integración especial (ver sección específica)
- **Fulfillment:** Automático vía API Tottoli

---

## Endpoints de Creación de Órdenes

### 1. POST `/wp-json/encriptados/v1/orders/roaming`
**Para:** Silent Phone, Armadillo Chat, Threema, VNC, Vault Chat, NordVPN, Salt, etc.

**Parámetros:**
```json
{
  "product_id": 177,           // ID del producto WooCommerce (requerido)
  "qty": 1,                    // Cantidad de licencias (requerido)
  "email": "user@mail.com",    // Email del comprador (requerido)
  "payment_provider": "stripe", // "stripe" o "cryptomus" (requerido)
  "amount": 75.00,             // Monto a cobrar (requerido)
  "currency": "USD",           // Moneda (opcional, default: USD)
  "months": 6                  // Duración en meses (opcional)
}
```

**Respuesta con Stripe:**
```json
{
  "ok": true,
  "order_id": 123,
  "status": "pending",
  "provider": "stripe",
  "provider_ref": "pi_3SuG4THUMzkJrZ0I...",
  "client_secret": "pi_3SuG4THUMzkJrZ0I..._secret_...",
  "payment_url": null
}
```

**Respuesta con Cryptomus:**
```json
{
  "ok": true,
  "order_id": 123,
  "status": "pending",
  "provider": "cryptomus",
  "provider_ref": "abc123...",
  "payment_url": "https://pay.cryptomus.com/pay/abc123..."
}
```

---

### 2. POST `/wp-json/encriptados/v1/orders/userid`
**Para:** Silent Phone (únicamente)

**Parámetros:**
```json
{
  "product_id": 122,           // ID de Silent Phone
  "qty": 1,
  "email": "user@mail.com",
  "payment_provider": "stripe",
  "amount": 150.00,
  "currency": "USD",
  "username": "user123"        // Username deseado (opcional)
}
```

**Respuesta:** Igual que `/orders/roaming`

---

## Flujo de Pago

### Opción A: Stripe

```mermaid
Frontend          Backend (WordPress)         Stripe
   |                     |                      |
   |--1. POST /orders/-->|                      |
   |<--client_secret-----|                      |
   |                     |                      |
   |--2. confirmPayment------------------>      |
   |                     |                      |
   |                     |<---3. Webhook--------|
   |                     | (pago confirmado)    |
   |                     |                      |
   |<--4. Redirect a /compra-exitosa--------    |
```

**Paso 1: Crear la orden**
```javascript
const response = await fetch('https://encriptados.es/wp-json/encriptados/v1/orders/roaming', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    product_id: 177,
    qty: 1,
    email: 'user@mail.com',
    payment_provider: 'stripe',
    amount: 75.00,
    currency: 'USD',
    months: 6
  })
});

const data = await response.json();
// data.client_secret contiene el Payment Intent secret
```

**Paso 2: Procesar el pago con Stripe.js**
```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

const stripe = await loadStripe('pk_live_...');

// Confirmar el pago
const result = await stripe.confirmPayment({
  elements,
  clientSecret: data.client_secret,
  confirmParams: {
    return_url: `https://encriptados.es/compra-exitosa?order=${data.order_id}`,
  },
});

if (result.error) {
  // Mostrar error al usuario
  console.error(result.error.message);
}
```

**Paso 3: Webhook automático** (NO requiere implementación frontend)
- Stripe envía webhook a `https://encriptados.es/wp-json/encriptados/v1/payments/stripe`
- El backend confirma el pago, asigna licencias y envía email
- Todo automático

**Paso 4: Redirigir al usuario**
- Stripe redirige a `/compra-exitosa?order=123`
- Mostrar página de éxito con detalles de la orden

---

### Opción B: Cryptomus (Criptomonedas)

```mermaid
Frontend          Backend (WordPress)         Cryptomus
   |                     |                      |
   |--1. POST /orders/-->|                      |
   |<--payment_url-------|                      |
   |                     |                      |
   |--2. Redirect-------->|--3. Pago---------->|
   |                     |                      |
   |                     |<---4. Webhook--------|
   |                     | (pago confirmado)    |
   |                     |                      |
   |<--5. Redirect a /compra-exitosa--------    |
```

**Paso 1: Crear la orden**
```javascript
const response = await fetch('https://encriptados.es/wp-json/encriptados/v1/orders/roaming', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    product_id: 177,
    qty: 1,
    email: 'user@mail.com',
    payment_provider: 'cryptomus',
    amount: 75.00,
    currency: 'USD'
  })
});

const data = await response.json();
// data.payment_url contiene la URL de pago de Cryptomus
```

**Paso 2: Redirigir al usuario**
```javascript
window.location.href = data.payment_url;
// El usuario paga en la página de Cryptomus
```

**Paso 3-5: Automático**
- Cryptomus envía webhook cuando se confirma el pago
- Backend procesa y envía email
- Cryptomus redirige a `/compra-exitosa?order=123`

---

## Webhooks

> ⚠️ **IMPORTANTE:** Los webhooks son endpoints del BACKEND que Stripe/Cryptomus llaman automáticamente. **El frontend NUNCA debe llamar a estos endpoints.**

### Webhook de Stripe
- **URL:** `https://encriptados.es/wp-json/encriptados/v1/payments/stripe`
- **Quién lo llama:** Stripe (desde sus servidores)
- **Cuándo:** Cuando el pago se completa o falla
- **Configuración:** Ya configurado en el panel de Stripe
- **Eventos:** `payment_intent.succeeded`, `payment_intent.payment_failed`
- **Frontend:** ❌ NO implementar - es automático

### Webhook de Cryptomus
- **URL:** `https://encriptados.es/wp-json/encriptados/v1/payments/cryptomus`
- **Quién lo llama:** Cryptomus (desde sus servidores)
- **Cuándo:** Cuando el pago se confirma
- **Configuración:** Ya configurado en el panel de Cryptomus
- **Frontend:** ❌ NO implementar - es automático

### ¿Cómo funcionan?
```
Usuario paga → Stripe/Cryptomus procesa → Ellos llaman al webhook → Backend confirma y envía email
```

**El frontend solo debe:**
1. Crear la orden (`POST /orders/roaming`)
2. Procesar el pago con Stripe.js o redirigir a Cryptomus
3. Esperar la redirección a `/compra-exitosa`

---

## Ejemplos por Producto

### Ejemplo 1: Armadillo Chat (6 meses)

**Request:**
```bash
POST https://encriptados.es/wp-json/encriptados/v1/orders/roaming
Content-Type: application/json

{
  "product_id": 177,
  "qty": 1,
  "email": "cliente@mail.com",
  "payment_provider": "stripe",
  "amount": 75.00,
  "currency": "USD",
  "months": 6
}
```

**Response:**
```json
{
  "ok": true,
  "order_id": 25,
  "status": "pending",
  "provider": "stripe",
  "provider_ref": "pi_3SuG4THUMzkJrZ0I0MCKJXko",
  "client_secret": "pi_3SuG4THUMzkJrZ0I0MCKJXko_secret_6UMvQpVwjjI2zVuND8LzRwEk0",
  "payment_url": null
}
```

**Email enviado después del pago:**
- Asunto: "Tu código roaming — Encriptados"
- Contiene: código de licencia, logo de Armadillo, duración (6 meses)

---

### Ejemplo 2: Silent Phone

**Request:**
```bash
POST https://encriptados.es/wp-json/encriptados/v1/orders/userid
Content-Type: application/json

{
  "product_id": 122,
  "qty": 1,
  "email": "cliente@mail.com",
  "payment_provider": "stripe",
  "amount": 150.00,
  "currency": "USD",
  "username": "cliente123"
}
```

**Email enviado después del pago:**
- Asunto: "Compra recibida — Estamos creando tu usuario"
- Nota: Admin debe crear usuario manualmente en el proveedor

---

### Ejemplo 3: Múltiples licencias (Threema - 5 usuarios)

**Request:**
```bash
POST https://encriptados.es/wp-json/encriptados/v1/orders/roaming
Content-Type: application/json

{
  "product_id": 136,
  "qty": 5,
  "email": "empresa@mail.com",
  "payment_provider": "cryptomus",
  "amount": 375.00,
  "currency": "USD",
  "months": 12
}
```

**Email enviado después del pago:**
- Asunto: "Tu código roaming — Encriptados"
- Contiene: 5 códigos de licencia Threema

---

## Manejo de Errores

### Error: Sin stock
Si no hay licencias disponibles:

**Response:**
```json
{
  "ok": true,
  "order_id": 26,
  "status": "paid_no_stock"
}
```

**Email enviado:**
- Cliente: "Pago confirmado — estamos preparando tu licencia"
- Admin: "Orden pagada sin stock — acción requerida"

### Error: Producto no encontrado
```json
{
  "code": "bad_request",
  "message": "Campos requeridos: product_id, email, payment_provider",
  "data": { "status": 400 }
}
```

### Error: Pago fallido
```json
{
  "ok": false,
  "error": "Payment failed: insufficient funds"
}
```

---

## Verificar Estado de una Orden

### GET `/wp-json/encriptados/v1/orders/{id}/public-status`

**Request:**
```bash
GET https://encriptados.es/wp-json/encriptados/v1/orders/25/public-status
```

**Response:**
```json
{
  "id": 25,
  "status": "fulfilled",
  "email": "cliente@mail.com",
  "amount": "75.00",
  "currency": "USD",
  "payment_provider": "stripe",
  "created_at": "2026-01-27 10:30:00"
}
```

**Estados posibles:**
- `pending` - Orden creada, esperando pago
- `paid` - Pago confirmado, procesando fulfillment
- `fulfilled` - Orden completada, licencias enviadas
- `paid_no_stock` - Pago confirmado pero sin stock
- `pending_admin` - Esperando acción del admin (userid)
- `manual` - Procesamiento manual vía Telegram

---

## Productos Tottoli (SIMs/eSIMs)

**Nota:** Los productos Tottoli tienen integración especial y NO usan los endpoints `/orders/roaming` ni `/orders/userid`.

---

## Resumen de IDs de Productos

| Producto | ID | Tipo | Endpoint |
|----------|------|------|----------|
| SIM Encriptados | 122 | tottoli | Especial |
| Armadillo Chat | 177 | roaming | /orders/roaming |
| Threema | 136 | roaming | /orders/roaming |
| Threema Work | 135 | roaming | /orders/roaming |
| VNC Laggon | 134 | roaming | /orders/roaming |
| Vault Chat | 127 | roaming | /orders/roaming |
| NordVPN | 137 | roaming | /orders/roaming |
| Salt | 133 | roaming | /orders/roaming |
| Silent Phone | TBD | userid | /orders/userid |

---

## Checklist de Implementación

### Frontend debe:
- [ ] Crear orden con el endpoint correcto según tipo de producto
- [ ] Integrar Stripe.js para procesar pagos (si usa Stripe)
- [ ] Redirigir a `payment_url` (si usa Cryptomus)
- [ ] Manejar redirección a `/compra-exitosa?order={id}`
- [ ] Mostrar estado de la orden en página de éxito
- [ ] Manejar errores (sin stock, pago fallido, etc.)

### Backend hace automáticamente:
- ✅ Recibir webhooks de Stripe/Cryptomus
- ✅ Confirmar pagos
- ✅ Asignar licencias del inventario
- ✅ Enviar emails con códigos
- ✅ Calcular fechas de expiración
- ✅ Manejar sin stock

---

