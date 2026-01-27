# Informe de Análisis: Popups de Pago y Flujo de Datos

Este informe detalla los hallazgos tras revisar el código fuente de los popups de pago (`ModalNewUser`, `ModalRoning`, `ModalSIM`) y su servicio de backend (`orderApi.ts`).

## Hallazgos Críticos

### 1. Desvío Incorrecto de Productos "Roaming"
**Problema:** Productos como **Armadillo Phone, Threema, Vault Chat** son clasificados en la documentación del backend como "Productos Roaming" (requieren asignación de licencias de stock). Sin embargo, el frontend actual los procesa a través de `ModalNewUser` sin especificar un `orderType`.
**Consecuencia:** `ModalNewUser` usa por defecto el endpoint `/orders/userid`. Esto significa que **se están enviando órdenes de licencias automáticas al endpoint de creación manual de usuarios**. Esto probablemente causa que el sistema no asigne licencias automáticamente o falle si el backend espera datos distintos.

### 2. Error en Parámetro de Duración (`months` vs `licensetime`)
**Problema:** En el servicio `orderApi.ts`, la función `createOrderAndIntent` (usada para `/orders/roaming`) construye el payload usando la clave `licensetime`.
**Documentación Backend:** La documentación especifica claramente que el endpoint `/orders/roaming` espera un campo llamado `months` (entero).
**Consecuencia:** Incluso si la orden llegara al endpoint correcto, el backend no recibiría la duración de la licencia, lo que causaría el error **"paid_no_stock"** (pagado sin stock) porque el sistema no sabe qué duración de licencia buscar en el inventario.

### 3. Flujo de Routers
**Estado:** Los routers usan `ModalNewUser`, enviando a `/orders/userid`.
**Análisis:** Aunque la documentación sugiere `/orders/manual` para envíos físicos, es posible que el endpoint `userid` soporte metadatos de envío. Sin embargo, para mayor limpieza, debería usar el flujo manual o asegurarse de que `userid` procese el envío.

## Análisis Detallado por Modal

| Modal Component | Productos Que Lo Usan | OrderType Actual | Endpoint Destino | Estado | Corrección Necesaria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ModalNewUser` | Apps (Armadillo, Threema), Sistemas, Routers | `userid` (Default) | `/orders/userid` | ❌ **Error para Roaming** | Debe detectar si es producto Roaming y cambiar `orderType`. |
| `ModalRoning` | Paquetes Roaming? (No usado por Apps) | `roaming` | `/orders/roaming` | ⚠️ **Error Payload** | El endpoint recibe `licensetime` en vez de `months`. |
| `ModalSIM` | SIMs, eSIMs, Recargas | `tottoli` (Custom) | `/tottoli/checkout` | ✅ **Correcto** | Mantiene integración especial Tottoli. |

## Plan de Acción Recomendado

1.  **Corregir `orderApi.ts`:**
    *   Modificar `createOrderAndIntent` para mapear `licensetime` -> `months` antes de enviar el JSON.
    *   Asegurar que `months` sea un entero (`parseInt`).

2.  **Ajustar `ModalNewUser.tsx`:**
    *   Detectar si el producto es de tipo "Roaming" (basado en categoría o política de formulario).
    *   Pasar explícitamente `orderType="roaming"` al `UnifiedPurchaseForm` en esos casos.

3.  **Confirmar Categoría de Productos:**
    *   Asegurarse de que Armadillo, Threema, etc. activen la lógica de "Roaming" en el paso 2.

---
Este análisis confirma por qué ocurren errores como "pagado sin stock" (falta de parámetro `months`) y por qué podrían haber fallos de lógica (endpoint incorrecto).
