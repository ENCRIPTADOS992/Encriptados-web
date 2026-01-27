# Análisis de Flujo de Compra por Producto

Este informe detalla el ciclo de vida de una compra *específicamente para cada producto* mencionado en el código, explicando qué popup se abre, qué datos se piden y qué se envía al backend.

---

## 1. Silent Phone
**Categoría:** Aplicaciones (Cifrado)
**Popup:** `ModalNewUser.tsx` (UnifiedPurchaseForm con política `SILENT_PHONE`)

### Flujo de Datos
1.  **UI:** Muestra 3 pestañas ("Quiero mi usuario", "Tengo código RONING", "Recargar").
2.  **Datos Recolectados:**
    *   **Email:** Obligatorio.
    *   **Usernames:** Lista de nombres sugeridos (solo en tab "Quiero mi usuario").
    *   **Cantidad:** Número de licencias.
    *   **Variante:** 3 meses, 6 meses, etc.
3.  **Método de Pago:** Tarjeta (Stripe Embedded) o Cripto (Kriptomus).
4.  **Backend Payload (`/api/wp-json/encriptados/v1/orders/userid`):**
    ```json
    {
      "product_id": 123,
      "email": "user@email.com",
      "username": "usuario_sugerido_1",
      "usernames": ["usuario_sugerido_1", "usuario_sugerido_2"],
      "silent_phone_mode": "new_user",  // o "roning_code" / "recharge"
      "amount": 100,
      "meta": { ... }
    }
    ```
5.  **Nota Especial:** Si se elige la pestaña "Recargar", el botón cambia a **Telegram** y no hay transacción web.

---

## 2. SecureCrypt
**Categoría:** Sistemas Operativos / Software Especial
**Popup:** `ModalNewUser.tsx` (UnifiedPurchaseForm con política `SOFTWARE_WITH_OS`)

### Flujo de Datos
1.  **UI:** Muestra un **Selector de Sistema Operativo** (Android / iOS) arriba de todo.
2.  **UI Tabs:** "Nueva licencia" vs "Renovar licencia".
3.  **Datos Recolectados:**
    *   **OS Type:** `android` o `ios`.
    *   **Email:** Obligatorio.
    *   **Telegram:** Opcional.
    *   **Renew ID:** Si es renovación.
4.  **Backend Payload (`.../orders/userid`):**
    ```json
    {
      "product_id": 456,
      "os_type": "android",
      "license_type": "new", // o "renew"
      "renew_id": "ABC-123", // si es renew
      "email": "...",
      "variant_id": 999
    }
    ```

---

## 3. Threema / Apps Generales (Cat 38)
**Popup:** `ModalNewUser.tsx` (UnifiedPurchaseForm con política `APP_RONING`)

### Flujo de Datos
1.  **UI:** Simple. Sin tabs especiales.
2.  **Datos:** Email (para código Roning) y Pago.
3.  **Backend Payload (`.../orders/userid`):**
    Envía `email`, `product_id`, `qty`, `variant_id`. No envía `usernames` ni `os_type`.

---

## 4. eSIM (Encriptados / TIM / Global)
**Popup:** `ModalSIM.tsx` (SimFormUnified con tipo `encrypted_esim` o `tim_esim`)

### Flujo de Datos
1.  **UI:** Formulario simplificado (No pide dirección de envío física).
2.  **Datos Recolectados:**
    *   **Email:** Obligatorio.
    *   **Cantidad:** Número de eSIMs.
3.  **Backend Payload (`.../tottoli/checkout`):**
    ```json
    {
      "product": "esim",
      "email": "...",
      "qty": 1,
      "method": "card", // o "cryptomus"
      "amount": 50,
      "meta": { "formType": "encrypted_esim", "variantId": ... }
    }
    ```
4.  **Confirmación:** Stripe Embedded (usa `client_secret` devuelto por Tottoli).

---

## 5. SIM Física (Encriptados / Generic)
**Popup:** `ModalSIM.tsx` (SimFormUnified con tipo `encrypted_physical` o `encrypted_generic`)

### Flujo de Datos
1.  **UI:** Formulario completo de envío.
2.  **Datos Recolectados:**
    *   **Datos Comprador:** Email, Telegram.
    *   **Dirección de Envío:** Nombre, Dirección, País, CP, Teléfono.
3.  **Backend Payload (`.../tottoli/checkout`):**
    ```json
    {
      "product": "sim_physical",
      "shipping_payload": {
        "shipping_name": "Juan Perez",
        "country": "Colombia",
        "postal_code": "110111",
        "phone": "+57..."
      },
      "meta": { ... }
    }
    ```

---

## 6. Planes de Datos / Minutos (Top-up)
**Popup:** `ModalSIM.tsx` (SimFormUnified con tipo `encrypted_data` o `encrypted_minutes`)

### Flujo de Datos
1.  **UI:** Pide el **Número de SIM** a recargar(ICCID o número de línea).
2.  **Datos Recolectados:**
    *   **SIM Number:** Obligatorio (validación de longitud).
    *   **Email.**
3.  **Backend Payload (`.../tottoli/checkout`):**
    ```json
    {
      "product": "data", // o "minutes"
      "sim_number": "8957...", // Enviado en campo root
      "meta": { "simNumbers": ["8957..."] }
    }
    ```

---

## 7. Paquetes de Roaming Internacional
**Popup:** `ModalRoning.tsx`

### Flujo de Datos
1.  **UI:** Similar a Apps. Selección de paquete por días/zona.
2.  **Backend Payload (`/api/wp-json/encriptados/v1/orders/roaming`):**
    *   Nota: Usa una ruta diferente (`roaming`) a la de Apps (`userid`), pero el mecanismo interno es el mismo (OrderApi local -> Stripe Embedded).

---

## 8. Routers / MiFi (Hardware)
**Popup:** `ModalNewUser.tsx` (Detectado por `categoryId: 36` o opción seleccionada)

### Flujo de Datos
1.  **UI:** Detecta que es hardware y muestra campos de envío en `UnifiedPurchaseForm`.
2.  **Datos:**
    *   **Shipping Address:** Dirección, Nombre, País, etc.
3.  **Backend Payload (`.../orders/userid`):**
    A diferencia de las SIMs físicas que usan Tottoli, los Routers usan el endpoint `userid` pero inyectan los datos de envío dentro del objeto `meta`.
    ```json
    {
      "product_id": 789,
      "email": "...",
      "meta": {
        "shippingAddress": "Calle 123",
        "shippingCountry": "..."
      }
    }
    ```

---

## 9. Productos "Solo Soporte" (Support Only)
**Ejemplos:** VaultChat, Armadillo, Ultra X, Intact Phone.
**Popup:** `ModalNewUser.tsx` (Política forzada a `paymentMethods: []`)

### Flujo
1.  **UI:** No muestra formulario de compra.
2.  **Acción:** Muestra texto "¿Necesitas ayuda?" y botón a **Telegram**.
3.  **Backend:** No hay envío de datos. Venta manual.
