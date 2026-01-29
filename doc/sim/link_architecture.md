# Arquitectura de Enlaces de Productos SIM

Este documento describe la arquitectura para generar y resolver URLs para productos SIM (Categoría 40) en la aplicación web de Encriptados.

## 1. Estructura Base de la URL

La URL base para productos SIM tiene el siguiente formato:
`/{locale}/sim/{slug}`

### Derivación del Slug
El `{slug}` se deriva **determinísticamente** a partir de los datos del backend del producto, específicamente los campos `provider` (proveedor) y `type_product` (tipo de producto). Esta lógica está centralizada en `src/shared/utils/productRouteResolver.ts`.

| Familia (Provider) | Formato (Type Product) | Slug Derivado |
| :--- | :--- | :--- |
| **Encriptados** | **Físico** | `sim-encriptada` |
| **Encriptados** | **Digital** | `esim-encriptada` |
| **TIM** | **Físico** | `tim-sim` |
| **TIM** | **Digital** | `esim-tim` |

**Lógica:**
1.  **Familia**: Se resuelve desde `provider`.
    *   "sim encriptados", "encrypted" -> `encrypted`
    *   "sim tim", "tim" -> `tim`
2.  **Formato**: Se resuelve desde `type_product`.
    *   "Digital" -> `digital`
    *   "Fisico" (u otro) -> `physical`

## 2. Parámetros de Consulta (Query Parameters)

Para definir completamente el estado del producto (variante, región, etc.), añadimos parámetros a la URL.

### 🔒 Seguridad e Identificación (Obligatorio)
*   `productId`: El ID único del producto específico.
    *   *Tiene prioridad sobre los IDs canónicos por defecto.*
*   `categoryId`: Fijo en `40` para SIMs.
*   `variantId`: **CRÍTICO**. Especifica la variante exacta (ej. monto de recarga específico).
    *   *Usado para la resolución segura de precios.*
    *   *La aplicación confía preferentemente en `variantId` sobre otras señales de precio.*

### 🌍 Contexto Regional (Específico de TIM)
*   `sim_region`: **CRÍTICO**. Usado por la API `getProductById` para obtener variantes específicas de una región (ej. "GLOBAL", "EUROPE").
    *   *Si falta, los productos TIM pueden fallar al cargar variantes.*
*   `region`: Etiqueta legible por humanos (ej. "Global", "United States").
*   `regionCode`: Código ISO (ej. "GL", "US").

### ⚙️ Selección del Usuario
*   `gb`: Etiqueta de cantidad de datos (ej. "10 GB"). Usado para preseleccionar menús desplegables.
*   `buy`: Establecer en `1` para abrir el modal de compra inmediatamente al cargar.

### 🚫 Parámetros Prohibidos
*   `price`: **ESTRICTAMENTE PROHIBIDO**.
    *   Riesgo de seguridad: Permite la manipulación del precio mostrado.
    *   **Decisión de Arquitectura**: La aplicación elimina proactivamente este parámetro si se encuentra en la URL. Los precios siempre deben resolverse desde el backend vía `variantId`.

## 3. Ejemplos de Estructura de Links (Landing)

A continuación se muestran ejemplos de cómo se construyen los links que llevan a la Landing Page del producto (desde tarjetas de producto, menú, etc.).

### Ejemplo 1: Landing de eSIM TIM Global
Link base generado por la lógica de resolución.
```
https://encriptados.io/es/sim/esim-tim
```

### Ejemplo 2: Landing de SIM Encriptada Física
```
https://encriptados.io/es/sim/sim-encriptada
```

### Ejemplo 3: Link Completo con Contexto (Botón "Más Información")
Cuando se navega desde una tarjeta de producto específica (ej. TIM Global), la URL incluye parámetros para asegurar que se cargue la información correcta.
```
https://encriptados.io/es/sim/esim-tim?productId=454&categoryId=40&region=Global&regionCode=GLOBAL&sim_region=GLOBAL
```
