# IDs validados de equivalencia producción

> Generado el 2 de junio de 2026
> Solicitud para el equipo de backend

---

## Contexto

Se completó la migración de **todos los product IDs** hardcodeados en la app para que sean condicionales por entorno (staging vs producción). Con la validación contra `https://admin.encriptados.io/` ya quedan resueltas las equivalencias de producción listadas abajo.

> Nota: las rutas de archivos citadas en este documento provienen del ticket original y algunas ya no coinciden con la estructura actual del frontend. Las equivalencias sí fueron validadas contra producción y, cuando hizo falta, contra export histórico de staging.

---

## 1. Variant IDs en productos destacados del Home

Archivo: `features/products/useHighlightedProducts.ts`

Estos variant IDs se usan para pre-seleccionar la variante visible en las tarjetas de productos destacados del Home.

| Producto (staging) | Product ID staging | Product ID producción | Variant ID staging | Variant ID producción |
|---|---|---|---|---|
| Activar Apps | 61588 | 61021 | `61592` | `61022` |
| eSIM + Datos | 59835 | 60980 | `59839` | `60981` |
| Recarga de datos TIM eSIM | 454 | 60949 | `1597` | `3515` |
| Silent Phone | 122 | 60924 | `59801` | `60976` |
| CRYPTCOM | 139 | 60931 | `621` | `60961` |

**Resultado de validación**

- `61592 -> 61022`, `59839 -> 60981`, `59801 -> 60976` y `621 -> 60961` quedaron confirmados comparando producción con el export histórico de staging.
- Para TIM/eSIM no apareció el ID histórico `1597` en los exports/docs/dumps actuales. Se deja `3515` como **equivalente funcional actual** porque el producto de producción `60949` expone las variantes `3515..3520` y la selección por defecto vigente cae en la opción base/de menor valor.

---

## 2. Variant IDs del producto Top-Up (recarga de saldo)

Archivo: `components/organisms/RechargeCheckoutSheet/RechargeCheckoutSheet.tsx`

El producto **Top-Up** (recarga de saldo de reseller) tiene 6 variantes que representan montos fijos de recarga.

| Product ID staging | Product ID producción |
|---|---|
| `61453` | `61010` |

| Monto (USD) | Variant ID staging | Variant ID producción |
|---|---|---|
| $100 | `61454` | `61011` |
| $250 | `61455` | `61012` |
| $500 | `61456` | `61013` |
| $1000 | `61457` | `61014` |
| $2000 | `61458` | `61015` |
| $5000 | `61459` | `61016` |

**Resultado de validación**

- Product ID Top-Up / recarga de saldo: `61453 -> 61010`.
- Variant IDs por monto: `61454 -> 61011`, `61455 -> 61012`, `61456 -> 61013`, `61457 -> 61014`, `61458 -> 61015`, `61459 -> 61016`.

---

## 3. Archivos adicionales con `61453` hardcodeado

Estos archivos también usan el product ID `61453` directamente. El equivalente confirmado en producción es `61010`:

| Archivo | Uso |
|---|---|
| `screens/Settings/MyProductsScreen.tsx` | Filtrado del producto Top-Up |
| `hooks/useTopUpPayment.ts` | ID del producto para crear la orden de recarga |
| `types/orders.ts` | Tipo del body de orden de recarga |

---

## Cómo se validó

1. **Por endpoint**: consulta a `GET /wp-json/encriptados/v3/store/product/{productId}?lang=es` en producción para revisar `variants` y mapear por `amount`, `licensetime` o `label`.
2. **Por staging histórico**: cruce contra export WooCommerce de staging para confirmar qué representaban los variant IDs antiguos cuando seguían existiendo.

---

## Resultado esperado

Con esta validación ya se puede agregar un `VARIANT_IDS` condicional por entorno, igual que el `PRODUCT_IDS` ya implementado, y eliminar los últimos IDs hardcodeados de la app. La única salvedad es TIM/eSIM, donde `3515` quedó documentado como equivalencia funcional actual por falta de trazabilidad histórica directa del `1597`.
