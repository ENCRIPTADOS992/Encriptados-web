# 📋 REFERENCIA DE URLs DE PRODUCTOS - Encriptados

> **DOCUMENTO OFICIAL** - Última actualización: Enero 2025
> 
> Este documento define las URLs canónicas para todos los productos.
> **TODA la web debe usar estas URLs.**

---

## 🎯 RESUMEN RÁPIDO

| Categoría | Ruta Base | Ejemplo |
|-----------|-----------|---------|
| **Aplicaciones** (38) | `/apps/[slug]` | `/apps/silent-circle` |
| **Sistemas** (35) | `/apps/[slug]` | `/apps/secure-mdm-iphone` |
| **Router** (36) | `/router` | `/router` |
| **SIMs** (40) | `/sim/[slug]` | `/sim/esim-encriptada` |

---

## 📱 APLICACIONES (Categoría 38)

Ruta: `/apps/[slug]`

| Producto | Slug | URL Canónica | Product ID |
|----------|------|--------------|------------|
| Silent Phone | `silent-circle` | `/apps/silent-circle` | 122 |
| VaultChat | `vault-chat` | `/apps/vault-chat` | 127 |
| Armadillo Chat | `armadillo` | `/apps/armadillo` | 177 |
| Threema | `threema` | `/apps/threema` | 136 |
| Threema Work | `threema-work` | `/apps/threema-work` | 135 |
| VNC Lagoon | `vnc-lagoon` | `/apps/vnc-lagoon` | 134 |
| Salt | `salt` | `/apps/salt` | 133 |
| Nord VPN | `nord-vpn` | `/apps/nord-vpn` | 137 |

---

## 🖥️ SISTEMAS / SOFTWARE (Categoría 35)

Ruta: `/apps/[slug]`

| Producto | Slug | URL Canónica | Product ID |
|----------|------|--------------|------------|
| Secure MDM iPhone | `secure-mdm-iphone` | `/apps/secure-mdm-iphone` | 168 |
| Secure MDM Android | `secure-mdm-android` | `/apps/secure-mdm-android` | 169 |
| Cryptcom | `cryptcom` | `/apps/cryptcom` | 139 |
| Renati | `renati` | `/apps/renati` | 151 |
| ChatMail | `chat-mail` | `/apps/chat-mail` | 142 |
| Armadillo (Sistema) | `armadillo-v2` | `/apps/armadillo-v2` | 180 |
| VaultChat (Sistema) | `vault-chat-v2` | `/apps/vault-chat-v2` | 148 |
| Ultra X | `ultrax` | `/apps/ultrax` | 182 |
| Intact Phone | `intact-phone` | `/apps/intact-phone` | 188 |
| DEC Secure | `dec-secure` | `/apps/dec-secure` | 233 |
| SecureCrypt | `secureCrypt` | `/apps/secureCrypt` | 174 |

> ⚠️ **NOTA**: Los slugs de sistemas con "v2" (`armadillo-v2`, `vault-chat-v2`) distinguen 
> las versiones de sistema de las versiones de aplicación.

---

## 🌐 ROUTER (Categoría 36)

Ruta: `/router` (página única, no usa `/apps/[slug]`)

| Producto | URL Canónica | Product ID |
|----------|--------------|------------|
| Router Camaleón | `/router` | 59747 |

---

## 📞 SIMs (Categoría 40)

Ruta: `/sim/[slug]`

| Producto | Slug | URL Canónica | Product ID | Provider | Type |
|----------|------|--------------|------------|----------|------|
| SIM Encriptada (Física) | `sim-encriptada` | `/sim/sim-encriptada` | 508 | encrypted | physical |
| eSIM Encriptada (Digital) | `esim-encriptada` | `/sim/esim-encriptada` | 454 | encrypted | digital |
| TIM-SIM (Física) | `tim-sim` | `/sim/tim-sim` | 59835 | tim | physical |
| eSIM TIM (Digital) | `esim-tim` | `/sim/esim-tim` | 59836 | tim | digital |

### Derivación de URLs de SIM

La URL se deriva automáticamente del backend:

```typescript
// provider + type_product → URL
"encrypted" + "Fisico"  → /sim/sim-encriptada
"encrypted" + "Digital" → /sim/esim-encriptada
"tim"       + "Fisico"  → /sim/tim-sim
"tim"       + "Digital" → /sim/esim-tim
```

---

## ❌ URLs DEPRECADAS - NO USAR

| URL Antigua | URL Correcta | Motivo |
|-------------|--------------|--------|
| `/sim-encriptada` | `/sim/sim-encriptada` | Falta prefijo /sim/ |
| `/encrypted-sim` | `/sim/sim-encriptada` | Ruta legacy |
| `/tim-sim` (root) | `/sim/tim-sim` | Falta prefijo /sim/ |
| `/apps/armadillo-software` | `/apps/armadillo-v2` | Slug antiguo unificado |
| `/apps/vault-chat-software` | `/apps/vault-chat-v2` | Slug antiguo unificado |
| `/apps/ultra-x` | `/apps/ultrax` | Slug con guión incorrecto |
| `/apps/secure-crypt` | `/apps/secureCrypt` | Slug en minúsculas incorrecto |
| `/systems/*` | `/apps/*` | No existe ruta /systems/ |

### Productos Discontinuados (NO tienen página)
- Total Sec (`/system8`) - Producto no disponible
- T2 Communicator - Producto no disponible

---

## 🔗 OTRAS PÁGINAS (No productos)

| Página | URL Canónica |
|--------|--------------|
| Tienda/Home | `/` |
| Entregas | `/deliveries` |
| Blog | `/blog` |
| Ofertas | `/offers` |
| Test de Seguridad | `/encrypted-test` |
| Distribuidores | `/distributors` |
| Nosotros | `/about-us` |
| Embajadores | `/ambassadors` |
| Dónde Estamos | `/where-to-find-us` |

---

## 📁 ARCHIVOS DE CONFIGURACIÓN

Los siguientes archivos contienen las configuraciones de rutas:

1. **`src/shared/constants/productRoutes.ts`**
   - `PRODUCT_ROUTES`: Apps y Sistemas
   - `SIM_PRODUCT_ROUTES`: SIMs

2. **`src/app/[locale]/apps/[slug]/productConfig.ts`**
   - Configuración completa de productos para template unificado

3. **`src/shared/utils/productRouteResolver.ts`**
   - `getProductLink()`: Resuelve URL desde nombre y categoría
   - `getSimProductUrl()`: Deriva URL de SIM desde provider/type

4. **`src/shared/components/HeaderComponents/data/CategoryMenu.tsx`**
   - Menú de navegación con enlaces a productos

---

## ✅ CHECKLIST DE VALIDACIÓN

Antes de agregar un nuevo producto:

- [ ] Agregar entrada en `productRoutes.ts`
- [ ] Agregar configuración en `productConfig.ts`
- [ ] Actualizar `CategoryMenu.tsx` si va en el menú
- [ ] Verificar que el slug coincide en todos los archivos
- [ ] Crear carpeta de imágenes en `/public/images/apps/[slug]/`

---

## 🔄 CÓMO GENERAR URL EN CÓDIGO

### Para Aplicaciones/Sistemas (categorías 35, 38):
```typescript
import { getProductLink } from "@/shared/utils/productRouteResolver";

const url = getProductLink(productName, categoryId);
// Ej: getProductLink("Silent Phone", 38) → "/apps/silent-circle"
```

### Para SIMs (categoría 40):
```typescript
import { getSimProductUrl } from "@/shared/utils/productRouteResolver";

const url = getSimProductUrl(provider, typeProduct);
// Ej: getSimProductUrl("tim", "Digital") → "/sim/esim-tim"
```

### Para Router (categoría 36):
```typescript
// Siempre es /router
const url = "/router";
```
