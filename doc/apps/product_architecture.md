# Arquitectura de Productos Apps y Software

Este documento describe la arquitectura para productos de Apps (Categoría 38) y Software (Categoría 35).

## 1. Arquitectura de URL

A diferencia de las SIMs, los productos de Apps y Software utilizan una estrategia de generación de slug dinámica basada en el nombre del producto.

**Formato**: `/{locale}/apps/{slug}`

### Generación de Slug
El slug se genera utilizando una utilidad estándar de "slugify" (`generateSlug` en `productRouteResolver.ts`).

*   **Fuente**: Nombre del Producto (ej. "Threema app").
*   **Lógica**:
    1.  Tomar el nombre base (separando por " - ").
    2.  Convertir a minúsculas.
    3.  Reemplazar espacios y caracteres especiales con guiones.

**Ejemplo**:
*   Producto: "Threema Work"
*   Slug: `threema-work`
*   URL Resultante: `/es/apps/threema-work`

## 2. Resolución de Link

La función `getProductLink` maneja estas categorías (35 y 38) predeterminando la lógica de ruta dinámica `/apps/`.

```typescript
// src/shared/utils/productRouteResolver.ts
if (categoryId === 35 || categoryId === 38) {
  const baseName = productName.split(" - ")[0].trim();
  const slug = generateSlug(baseName);
  return `/apps/${slug}`;
}
```

## 3. Funcionalidad de Compartir

La lógica de compartir para Apps es más simple que la de SIMs, ya que hay menos variantes/regiones.

*   **Clave Primaria**: Product ID / Slug.
*   **Contexto**: Generalmente implica una licencia o clave digital.
*   **Parámetros**: Se aplican los parámetros estándar (`productId`, `categoryId`).

### Ejemplo de Link de Compartir (App)
```
https://encriptados.io/es/apps/threema-work?productId=123&categoryId=38&buy=1
```
