# 📋 Mapa de Checkout por Producto — POST Requests al Backend

> **Generado:** 2026-02-11  
> **Objetivo:** Documentar por producto exactamente qué POST se hace al backend durante compra nueva y renovación de licencia.  
> **Endpoint de renovación:** `POST {WP_API}/encriptados/v1/orders/renewal`

---

## Estructura esperada por el backend

### Compra nueva (userid): `POST /orders/userid`
```jsonc
{
  "product_id": 142,
  "email": "usuario@example.com",
  "username": "john_doe",           // opcional
  "payment_provider": "stripe",     // "stripe" | "kriptomus"
  "amount": 220.00,
  "currency": "USD",
  "qty": 1,
  "variant_id": 456,                // opcional
  "sku": "SC-12M",                  // opcional
  "licensetime": 12,                // opcional
  "license_type": "new",            // "new"
  "system": "android",              // opcional — "android" | "ios"
  "silent_phone_mode": "new_user",  // opcional
  "usernames": ["user1"],           // opcional
  "coupon_code": "PROMO10",         // opcional
  "discount": 10,                   // opcional
  "source_url": "https://...",      // opcional
  "selected_option": 1,             // opcional
  "meta": {}                        // opcional
}
```

### Compra nueva (roaming): `POST /orders/roaming`
```jsonc
{
  "product_id": 123,
  "qty": 1,
  "email": "usuario@example.com",
  "payment_provider": "stripe",
  "amount": 220.00,
  "currency": "USD",
  "variant_id": 456,                // opcional
  "sku": "SC-12M",                  // opcional
  "months": 12,                     // opcional
  "coupon_code": "PROMO10",         // opcional
  "discount": 10,                   // opcional
  "source_url": "https://...",      // opcional
  "selected_option": 1,             // opcional
  "silent_phone_mode": "new_user",  // opcional
  "usernames": ["user1"],           // opcional
  "system": "android",              // opcional
  "meta": {}                        // opcional
}
```

### Renovación de licencia: `POST /orders/renewal`
```jsonc
{
  "product_id": 142,
  "license_ids": ["123456", "789012", "345678"],  // ARRAY de IDs de licencia
  "email": "usuario@example.com",
  "qty": 1,
  "months": 3,
  "amount": 1,
  "currency": "USD",
  "payment_provider": "stripe"    // "stripe" | "kriptomus"
}
```

---

## Leyenda de estados

| Icono | Significado |
|-------|-------------|
| ✅ | Implementado correctamente con `/orders/renewal` |
| 🔧 | Recién corregido en este sprint |
| ❌ | No tiene flujo de compra (solo soporte/Telegram) |
| ⚪ | No aplica renovación (solo compra nueva) |

---

## Categoría 35 — Software / Sistemas

### ChatMail (ID: 142)
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | Sí (`new_renew`) |
| **Telegram** | Oculto |
| **Compra nueva** | ✅ `POST /orders/userid` |
| **Renovación** | ✅ `POST /orders/renewal` |

**POST compra nueva:**
```jsonc
{
  "product_id": 142,
  "email": "...",
  "payment_provider": "stripe",  // o "kriptomus"
  "amount": 220.00,
  "currency": "USD",
  "qty": 1,
  "license_type": "new",
  "licensetime": 3               // según variante seleccionada
}
```

**POST renovación:**
```jsonc
{
  "product_id": 142,
  "license_ids": ["LIC-001", "LIC-002"],
  "email": "...",
  "qty": 1,
  "months": 3,                   // según variante seleccionada
  "amount": 220.00,
  "currency": "USD",
  "payment_provider": "stripe"   // o "kriptomus"
}
```

---

### Cryptcom (ID: 139)
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | Sí (`new_renew`) |
| **Telegram** | Oculto |
| **Compra nueva** | ✅ `POST /orders/userid` |
| **Renovación** | ✅ `POST /orders/renewal` |

**POST compra nueva:**
```jsonc
{
  "product_id": 139,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "license_type": "new",
  "licensetime": ...
}
```

**POST renovación:**
```jsonc
{
  "product_id": 139,
  "license_ids": ["LIC-XXX"],
  "email": "...",
  "qty": 1,
  "months": ...,
  "amount": ...,
  "currency": "USD",
  "payment_provider": "stripe"
}
```

---

### Renati (ID: 151)
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | Sí (`new_renew`) |
| **Telegram** | Oculto |
| **Compra nueva** | ✅ `POST /orders/userid` |
| **Renovación** | ✅ `POST /orders/renewal` |

**POST compra nueva:**
```jsonc
{
  "product_id": 151,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "license_type": "new",
  "licensetime": ...
}
```

**POST renovación:**
```jsonc
{
  "product_id": 151,
  "license_ids": ["LIC-XXX"],
  "email": "...",
  "qty": 1,
  "months": ...,
  "amount": ...,
  "currency": "USD",
  "payment_provider": "stripe"
}
```

---

### SecureCrypt (ID: 174)
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_WITH_OS` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | Sí (`new_renew`) |
| **Selector SO** | Sí (Android / iOS) |
| **Telegram** | Oculto |
| **Compra nueva** | ✅ `POST /orders/userid` |
| **Renovación** | ✅ `POST /orders/renewal` |

**POST compra nueva:**
```jsonc
{
  "product_id": 174,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "license_type": "new",
  "system": "android",           // o "ios"
  "licensetime": ...
}
```

**POST renovación:**
```jsonc
{
  "product_id": 174,
  "license_ids": ["LIC-XXX"],
  "email": "...",
  "qty": 1,
  "months": ...,
  "amount": ...,
  "currency": "USD",
  "payment_provider": "stripe"
}
```

---

### Secure MDM iPhone (ID: 168)
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | Sí (`new_renew`) — pero puede estar limitado por override |
| **Telegram** | Oculto |
| **Compra nueva** | ✅ `POST /orders/userid` |
| **Renovación** | ✅ `POST /orders/renewal` |

**POST renovación:** misma estructura que ChatMail con `"product_id": 168`

---

### Secure MDM Android (ID: 169)
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | Sí (`new_renew`) — pero puede estar limitado por override |
| **Telegram** | Oculto |
| **Compra nueva** | ✅ `POST /orders/userid` |
| **Renovación** | ✅ `POST /orders/renewal` |

**POST renovación:** misma estructura que ChatMail con `"product_id": 169`

---

### Armadillo System (ID: 180) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` → override a Support Only |
| **Compra/Renovación** | ❌ No tiene formulario de compra — solo botón de Telegram |
| **POST al backend** | Ninguno |

---

### VaultChat v2 System (ID: 148) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` → override a Support Only |
| **Compra/Renovación** | ❌ No tiene formulario de compra — solo botón de Telegram |
| **POST al backend** | Ninguno |

---

### Ultra X (ID: 182) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` → override a Support Only |
| **Compra/Renovación** | ❌ No tiene formulario de compra — solo botón de Telegram |
| **POST al backend** | Ninguno |

---

### Intact Phone (ID: 188) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` → override a Support Only |
| **Compra/Renovación** | ❌ No tiene formulario de compra — solo botón de Telegram |
| **POST al backend** | Ninguno |

---

### DEC Secure (ID: 233) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 35 (Software) |
| **Form Type** | `SOFTWARE_LICENSE` → override a Support Only |
| **Compra/Renovación** | ❌ No tiene formulario de compra — solo botón de Telegram |
| **POST al backend** | Ninguno |

---

## Categoría 38 — Aplicaciones (Apps)

### Silent Phone (ID: 122)
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `SILENT_PHONE` |
| **Order Type** | `userid` |
| **Tiene tabs** | Sí (`three_way`: Código RONING / Quiero mi usuario / Recargar) |
| **Renovación** | ⚪ No tiene tab de "Renovar" — tiene "Recargar" que redirige a Telegram |
| **Compra nueva** | `POST /orders/userid` |

**POST compra nueva (modo new_user):**
```jsonc
{
  "product_id": 122,
  "email": "...",
  "username": "nombre_sugerido",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "silent_phone_mode": "new_user",
  "usernames": ["user1", "user2", "user3"],
  "licensetime": ...
}
```

**POST compra nueva (modo roning_code):**
```jsonc
{
  "product_id": 122,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "silent_phone_mode": "roning_code",
  "licensetime": ...
}
```

**Modo recharge:** No hace POST — redirige a Telegram.

---

### Armadillo Chat (ID: 177)
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `APP_RONING` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | No |
| **Renovación** | ⚪ No disponible |
| **Compra nueva** | `POST /orders/userid` |

**POST compra nueva:**
```jsonc
{
  "product_id": 177,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "licensetime": ...
}
```

---

### Threema (ID: 136)
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `APP_RONING` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | No |
| **Renovación** | ⚪ No disponible |
| **Compra nueva** | `POST /orders/userid` |
| **Nota especial** | `licensetime` siempre se envía como `null` (override en código) |

**POST compra nueva:**
```jsonc
{
  "product_id": 136,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1
  // licensetime se omite (null) por lógica especial de Threema
}
```

---

### Threema Work (ID: 135)
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `APP_RONING` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | No |
| **Renovación** | ⚪ No disponible |
| **Compra nueva** | `POST /orders/userid` |

**POST compra nueva:**
```jsonc
{
  "product_id": 135,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "licensetime": ...
}
```

---

### VaultChat App (ID: 127) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `APP_RONING` → override a Support Only |
| **Compra/Renovación** | ❌ Solo botón de Telegram |
| **POST al backend** | Ninguno |

---

### VNC Lagoon (ID: 134) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `APP_RONING` → override a Support Only |
| **Compra/Renovación** | ❌ Solo botón de Telegram |
| **POST al backend** | Ninguno |

---

### Salt App (ID: 133) ❌ Solo Soporte
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `APP_RONING` → override a Support Only |
| **Compra/Renovación** | ❌ Solo botón de Telegram |
| **POST al backend** | Ninguno |

---

### Nord VPN (ID: 137)
| Campo | Valor |
|-------|-------|
| **Categoría** | 38 (Aplicaciones) |
| **Form Type** | `APP_RONING` |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | No |
| **Renovación** | ⚪ No disponible |
| **Compra nueva** | `POST /orders/userid` |

**POST compra nueva:**
```jsonc
{
  "product_id": 137,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "licensetime": ...
}
```

---

## Categoría 36 — Router

### Router Camaleón (ID: 59747)
| Campo | Valor |
|-------|-------|
| **Categoría** | 36 (Router) |
| **Form Type** | `APP_RONING` (default por categoría) |
| **Order Type** | `userid` |
| **Tiene tabs Renovar** | No |
| **Renovación** | ⚪ No disponible (producto físico) |
| **Campos adicionales** | Dirección de envío, nombre, país, código postal, teléfono |
| **Compra nueva** | `POST /orders/userid` |

**POST compra nueva:**
```jsonc
{
  "product_id": 59747,
  "email": "...",
  "payment_provider": "stripe",
  "amount": ...,
  "currency": "USD",
  "qty": 1,
  "meta": {
    "shippingAddress": "Calle 123...",
    "shippingFullName": "Juan Pérez",
    "shippingCountry": "Colombia",
    "shippingPostalCode": "110111",
    "shippingPhone": "+57300..."
  }
}
```

---

## Resumen de endpoints por producto

| Producto | ID | Cat | Compra nueva | Renovación | Estado |
|----------|-----|-----|-------------|------------|--------|
| ChatMail | 142 | 35 | `POST /orders/userid` | `POST /orders/renewal` | ✅ |
| Cryptcom | 139 | 35 | `POST /orders/userid` | `POST /orders/renewal` | ✅ |
| Renati | 151 | 35 | `POST /orders/userid` | `POST /orders/renewal` | ✅ |
| SecureCrypt | 174 | 35 | `POST /orders/userid` | `POST /orders/renewal` | ✅ |
| Secure MDM iPhone | 168 | 35 | `POST /orders/userid` | `POST /orders/renewal` | ✅ |
| Secure MDM Android | 169 | 35 | `POST /orders/userid` | `POST /orders/renewal` | ✅ |
| Armadillo System | 180 | 35 | ❌ Solo soporte | ❌ | — |
| VaultChat v2 | 148 | 35 | ❌ Solo soporte | ❌ | — |
| Ultra X | 182 | 35 | ❌ Solo soporte | ❌ | — |
| Intact Phone | 188 | 35 | ❌ Solo soporte | ❌ | — |
| DEC Secure | 233 | 35 | ❌ Solo soporte | ❌ | — |
| Silent Phone | 122 | 38 | `POST /orders/userid` | ⚪ N/A | ✅ |
| Armadillo Chat | 177 | 38 | `POST /orders/userid` | ⚪ N/A | ✅ |
| Threema | 136 | 38 | `POST /orders/userid` | ⚪ N/A | ✅ |
| Threema Work | 135 | 38 | `POST /orders/userid` | ⚪ N/A | ✅ |
| VaultChat App | 127 | 38 | ❌ Solo soporte | ❌ | — |
| VNC Lagoon | 134 | 38 | ❌ Solo soporte | ❌ | — |
| Salt App | 133 | 38 | ❌ Solo soporte | ❌ | — |
| Nord VPN | 137 | 38 | `POST /orders/userid` | ⚪ N/A | ✅ |
| Router Camaleón | 59747 | 36 | `POST /orders/userid` | ⚪ N/A | ✅ |

---

## Flujo de código por archivo

### Compra nueva (card)
```
UnifiedPurchaseForm.tsx → handlePay()
  ├─ licenseType === "renew"  → createRenewalOrder()  → POST /orders/renewal  ← PRIORIDAD 1
  ├─ orderType === "roaming" → createOrderAndIntent() → POST /orders/roaming
  └─ else                     → createUserIdOrderAndIntent() → POST /orders/userid
```

### Compra nueva (crypto)
```
ModalNewUser.tsx → onPayCrypto()
  ├─ licenseType === "renew"  → payRenewal()  → CheckoutService.renewal() → POST /orders/renewal  ← NUEVO
  └─ else                     → payUserId()   → CheckoutService.userId()  → POST /orders/userid
```

### Archivos involucrados
| Archivo | Rol |
|---------|-----|
| [src/lib/payments/orderApi.ts](../../src/lib/payments/orderApi.ts) | `createRenewalOrder()` — payload directo a WP |
| [src/services/checkout.ts](../../src/services/checkout.ts) | `CheckoutService.renewal()` — wrapper con api.post |
| [src/shared/hooks/useCheckout.ts](../../src/shared/hooks/useCheckout.ts) | `payRenewal()` — hook de React |
| [src/shared/components/ModalPayment/new/UnifiedPurchaseForm.tsx](../../src/shared/components/ModalPayment/new/UnifiedPurchaseForm.tsx) | Card payment: detecta `licenseType === "renew"` |
| [src/shared/components/ModalPayment/new/ModalNewUser.tsx](../../src/shared/components/ModalPayment/new/ModalNewUser.tsx) | Crypto payment: detecta `licenseType === "renew"` |
| [src/shared/constants/formPolicies.ts](../../src/shared/constants/formPolicies.ts) | Define qué productos muestran tabs de renovación |

---

## Cambios realizados (2026-02-11)

1. **`createRenewalOrder()`** — Cambiado `licenseId: string` → `licenseIds: string[]` y `license_id` → `license_ids` en el payload
2. **`CheckoutService.renewal()`** — Nuevo método en checkout service para crypto payments
3. **`payRenewal()`** — Nuevo método en useCheckout hook
4. **`UnifiedPurchaseForm.tsx`** — Card path: renewal se evalúa PRIMERO (antes de roaming), usa `createRenewalOrder()` → `POST /orders/renewal`
5. **`ModalNewUser.tsx`** — Crypto path: renewal se evalúa PRIMERO, usa `payRenewal()` → `POST /orders/renewal`
6. **Orden de branches corregido** — El check de `licenseType === "renew"` ahora tiene prioridad sobre `orderType === "roaming"` (cat 35 tenía orderType "roaming" lo cual bloqueaba el branch de renewal)

### ⚠️ Antes de este fix
- Las renovaciones se enviaban a `POST /orders/userid` con `license_type: "renew"` y `renew_id: "solo-primer-id"` en el body, y `renewIds` enterrado en `meta`
- La función `createRenewalOrder()` existía pero nunca se llamaba
- Enviaba `license_id` (singular string) en vez de `license_ids` (array)

### ✅ Después de este fix
- Las renovaciones se envían a `POST /orders/renewal` con la estructura correcta: `license_ids` (array), `months`, `qty`, `amount`, `currency`, `payment_provider`
- Funciona tanto para card (Stripe) como crypto (Kriptomus) 