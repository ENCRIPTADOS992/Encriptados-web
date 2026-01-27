# Guía de Integración Frontend-Backend (Empalme de API de Órdenes)

Este documento detalla cómo debe realizarse la integración ("empalme") entre el Frontend (Next.js) y el Backend (WordPress/WooCommerce API) basándose en la documentación técnica (`DOCUMENTACION_API_ORDENES.md`) y el análisis del flujo actual (`INFORME-FLUJO-POR-PRODUCTO.md`).

## 1. Mapa General de Productos y Endpoints

| Categoría Frontend | Productos Típicos | Endpoint Backend | Tipo (Doc Backend) | Payload Clave |
| :--- | :--- | :--- | :--- | :--- |
| **Licencias (Stock)** | Armadillo, Threema, VNC, Vault Chat, NordVPN, Salt | `/orders/roaming` | Productos Roaming | `months`, `qty` |
| **Usuario/Manual** | Silent Phone | `/orders/userid` | Productos UserID | `username`, `qty` |
| **SIMs / eSIMs** | eSIM Encriptados, SIM Física, Recargas | `/tottoli/checkout` * | Productos Tottoli | `sim_number`, `shipping` |
| **Hardware** | Routers | `/orders/manual` ** | Productos Manual | `shipping_address` |

> (*) **Nota sobre Tottoli:** La documentación del backend indica integración especial. El frontend ya usa `/tottoli/checkout` que parece estar alineado con una API intermedia o directa. Mantener implementación actual a menos que se indique lo contrario.
> (**) **Nota sobre Routers:** El frontend enviaba a `/orders/userid`. Según el backend, para productos que requieren gestión manual (envío físico no automatizado por Tottoli), `/orders/manual` podría ser más apropiado, o `/orders/userid` si se gestiona como "usuario manual". Se recomienda confirmar, pero aquí documentamos la adaptación a lo existente.

---

## 2. Detalle de Implementación por Tipo

### A. Productos tipo "Roaming" (Licencias en Inventario)
**Aplica a:** Armadillo Chat, Threema, Threema Work, VNC Lagoon, Vault Chat, NordVPN, Salt.
**Objetivo:** El backend asigna licencias automáticamente del inventario.

**Implementación en Frontend (`orderApi.ts` / `UnifiedPurchaseForm`):**
Cuando el usuario compra uno de estos productos, se debe construir y enviar el siguiente JSON a `/wp-json/encriptados/v1/orders/roaming`.

**Campos a mapear:**
*   `product_id`: ID numérico del producto (ej: 177 para Armadillo). Obtener de `productConfig`.
*   `months`: **CRÍTICO**. La API espera la duración en meses como entero (ej: `6`, `12`).
    *   *Actualmente el Frontend podría estar enviando `variant_id`.* Se debe asegurar enviar `months`.
*   `qty`: Cantidad seleccionada.
*   `email`: Email del usuario.
*   `amount` & `currency`: Totales calculados.

**Ejemplo de Código de Empalme:**
```javascript
// Transformación necesaria antes de enviar
const payload = {
  product_id: product.id,
  qty: formData.quantity,
  email: formData.email,
  payment_provider: paymentMethod === 'crypto' ? 'cryptomus' : 'stripe',
  amount: calculateTotal(product, formData),
  currency: 'USD',
  // TRANSFORMACIÓN CLAVE: Extraer meses de la variante seleccionada
  months: parseInt(selectedPlan.license_duration) || 12 
};

// Enviar
await axios.post('/orders/roaming', payload);
```

### B. Productos tipo "UserID" (Creación Manual de Usuario)
**Aplica a:** Silent Phone.
**Objetivo:** El admin recibe la orden y crea el usuario manualmente.

**Implementación en Frontend:**
Enviar a `/wp-json/encriptados/v1/orders/userid`.

**Campos a mapear:**
*   `username`: El nombre de usuario que el cliente desea (si aplica).
*   `meta`: Información adicional si es necesaria.

### C. Manejo de Respuesta y Pagos
El backend devuelve instrucciones claras sobre cómo proceder con el pago. El frontend NO debe inicializar pagos por su cuenta sin antes crear la orden en el backend.

**Flujo Correcto:**
1.  **Crear Orden:** `POST /orders/...` con datos del carrito/form.
2.  **Recibir Respuesta:**
    *   Si `provider: 'stripe'`: Recibes `client_secret`. Usar `stripe.confirmPayment` con ese secret.
    *   Si `provider: 'cryptomus'`: Recibes `payment_url`. Redirigir al usuario `window.location.href = data.payment_url`.
3.  **Webhook (Backend):** El frontend se olvida. El backend escuchará a Stripe/Cryptomus.
4.  **Redirección Éxito:** Configurar las URLs de retorno (return_url) en Stripe/Cryptomus para que vuelvan a `/compra-exitosa?order={id}`.

### D. Ajustes Específicos Detectados (Gap Analysis)
1.  **Parámetro `months` vs `variant_id`:** La documentación del backend para `/orders/roaming` pide explícitamente `months`. Verificar que el frontend no esté enviando solo `variant_id` esperando que el backend adivine.
2.  **Routers:** Verificar si se deben enviar como `/orders/manual` (ya que requieren envío físico y no son licencias digitales automáticas). Si el backend actual soporta `/orders/userid` con meta-data de envío, mantenerlo, pero la guía "limpia" sugiere separación.

---

## 3. Webhooks y Estados
**IMPORTANTE:** El frontend **NO DEBE** llamar a endpoints de confirmación de pago manualmente.
*   **Mal:** `await axios.post('/confirm-payment', ...)` después de Stripe.
*   **Bien:** Stripe llama al webhook del backend. El frontend solo redirige al usuario a la "Thank You Page".

## 4. Checklist para Desarrolladores Frontend
1. [ ] Revisar `orderApi.ts`. Asegurar que las rutas apunten a los endpoints base documentados `/wp-json/encriptados/v1/...`.
2. [ ] En productos de licencia (Armadillo, etc.), asegurar que se envíe el campo `months` derivado de la variante.
3. [ ] Para Silent Phone, asegurar envío de `username` a `/orders/userid`.
4. [ ] Eliminar cualquier lógica de "confirmación manual" desde el cliente si existía. Confiar en el flujo `Create Order -> Pay -> Webhook -> Success Page`.
