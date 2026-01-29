# Arquitectura de Productos Router

Este documento describe la arquitectura para productos de Router (Categoría 36).

## 1. Arquitectura de URL

Actualmente, los productos Router se mapean a una única página de aterrizaje estática o sección.

**Formato**: `/{locale}/router`

## 2. Resolución de Link

La función `getProductLink` verifica explícitamente la Categoría 36.

```typescript
// src/shared/utils/productRouteResolver.ts
if (categoryId === 36) {
  return "/router";
}
```

Este manejo omite la generación dinámica de slugs, dirigiendo todo el tráfico de routers a la página dedicada.

## 3. Funcionalidad de Compartir

*   **Lógica**: Compartir un producto router típicamente enlaza a la página principal `/router`.
*   **Especificidades**: Si modelos específicos de router necesitan enlaces distintos en el futuro, la lógica del resolvedor deberá actualizarse para soportar slugs dinámicos (similar a Apps). Actualmente, utiliza un punto de entrada unificado.

### Ejemplo de Link (Router)
```
https://encriptados.io/es/router
```
