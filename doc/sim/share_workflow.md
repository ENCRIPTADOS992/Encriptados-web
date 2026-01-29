# Flujo de Compartir SIM y Botón "Comprar"

Este documento detalla el ciclo de vida de la funcionalidad "Compartir" y el comportamiento del botón "Comprar" para productos SIM.

## 1. Generación de URL (PurchaseHeader.tsx)

Cuando un usuario hace clic en "Compartir" dentro del modal de compra, se genera una URL segura.

### Lógica
El generador refleja la lógica autoritativa de `CardProduct.tsx` para asegurar consistencia.

*   **Entradas**:
    *   `productId`: Usa el ID de producto específico (no el predeterminado canónico).
    *   `selectedVariantId`: Captura la opción seleccionada actualmente en el menú desplegable.
    *   `region` / `regionCode`: Captura el contexto regional actual.
*   **Acciones de Seguridad**:
    *   **Eliminación de Precio**: El parámetro `price` se excluye explícitamente para evitar manipulaciones.
    *   **Imposición de Variante**: Se añade `variantId` para fijar la oferta específica.

### Ejemplo de Link de Compartir
Este es el link que se copia al portapapeles cuando el usuario comparte una oferta específica (ej. eSIM TIM Global, 15GB).
```
https://encriptados.io/es/sim/esim-tim?productId=454&categoryId=40&buy=1&variantId=1600&gb=15+GB&region=Global&regionCode=GLOBAL&sim_region=GLOBAL
```

## 2. Consumo de URL (ModalSIM.tsx)

Cuando se abre la URL, `ModalSIM.tsx` inicializa el estado específico.

### Prioridad de Inicialización
1.  **ID de Variante (`paramVariantId`)**:
    *   **Máxima Prioridad**. Si `variantId` está presente en la URL, la lógica **omite** la selección heurística por defecto.
    *   El modal espera encontrar la variante con este ID exacto y la selecciona.
2.  **Etiqueta GB (`initialGb`)**:
    *   Prioridad secundaria. Útil si falta el ID de variante (enlaces antiguos).
    *   Coincide con la etiqueta del plan de datos (ej. "15 GB").
3.  **Heurística de Precio**:
    *   Lógica de respaldo. Coincide planes basándose en el precio.

## 3. Lógica del Botón "Comprar" (Compra Directa)

Al hacer clic en "Comprar" en una tarjeta de producto, la lógica es ligeramente diferente porque la tarjeta a menudo muestra un **Precio Total** (Producto + Base), mientras que las variantes internas pueden almacenar solo el **Monto de Recarga**.

### Coincidencia Robusta de Precios
Para asegurar que se seleccione la variante correcta al hacer clic en "Comprar" (que envía `initialPrice`), el sistema realiza una verificación robusta contra posibles costos base:

*   **Bases Verificadas**: `$0`, `$12` (Físico/Legacy), `$7.50` (eSIM).
*   **Estrategia de Coincidencia**:
    1.  **Coincidencia Directa**: ¿Precio de Variante == `initialPrice`?
    2.  **Coincidencia Neta**: ¿(Precio de Variante - Base) == `initialPrice`?
    3.  **Coincidencia Bruta**: ¿(Precio de Variante + Base) == `initialPrice`?

Esto asegura que un Precio Total de `$107.50` seleccione correctamente una variante de `$100` (asumiendo base de `$7.50`), incluso si la estructura de datos interna varía.
