# Sistema de Enlaces para Compartir Productos

## Descripción General

Este sistema permite compartir enlaces de productos que abren automáticamente el popup de compra cuando el usuario accede a través del enlace compartido.

## Funcionamiento

1. **Usuario hace clic en "Compartir"** en el popup de compra
2. **Se copia un enlace** con el parámetro `buy=1`
3. **Cuando otro usuario accede** a ese enlace, el popup de compra se abre automáticamente
4. **El parámetro se limpia** de la URL después de abrir el popup

## Atributo Especial

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| `buy` | `1` | Activa automáticamente el popup de pago al cargar la página |

**Ejemplos:**
- Apps: `https://www.encriptados.net/apps/silent-circle?buy=1`
- SIMs: `https://www.encriptados.net/sim/sim-encriptada?productId=508&price=15&buy=1`
- Router: `https://www.encriptados.net/router?buy=1`

---

## Estructura de URLs

| Tipo | Estructura | Ejemplo |
|------|------------|---------|
| Apps/Sistemas | `/apps/[slug]?buy=1` | `/apps/silent-circle?buy=1` |
| SIMs | `/sim/[slug]?productId=X&price=Y&buy=1` | `/sim/sim-encriptada?productId=508&price=15&buy=1` |
| Router | `/router?buy=1` | `/router?buy=1` |

---

## Imágenes de Metadatos (Open Graph)

Las imágenes para previsualización en redes sociales están en:

```
public/meta-image/
├── apps/                      # Aplicaciones (Categoría 38)
├── sistemas/                  # Software/Sistemas (Categoría 35)
├── sim-encriptados/           # SIMs Encriptados (Categoría 40)
├── sim-tim/                   # SIMs TIM (Categoría 40)
└── router/                    # Router (Categoría 36)
```

---

## Listado Completo de Enlaces de Compartir

### 🔹 APLICACIONES (Categoría 38)

| Producto | Product ID | Slug | Imagen Meta | Enlace de Compartir |
|----------|------------|------|-------------|---------------------|
| Silent Phone | 122 | silent-circle | `/meta-image/apps/silent-phone.png` | `/apps/silent-circle?buy=1` |
| Vault Chat | 127 | vault-chat | `/meta-image/apps/vaultchat.png` | `/apps/vault-chat?buy=1` |
| Armadillo | 177 | armadillo | `/meta-image/apps/armadillo.png` | `/apps/armadillo?buy=1` |
| Threema | 136 | threema | `/meta-image/apps/threema.png` | `/apps/threema?buy=1` |
| Threema Work | 135 | threema-work | `/meta-image/apps/threemawork.png` | `/apps/threema-work?buy=1` |
| VNC Lagoon | 134 | vnc-lagoon | `/meta-image/apps/vnclaggon.png` | `/apps/vnc-lagoon?buy=1` |
| Salt | 133 | salt | `/meta-image/apps/salt.png` | `/apps/salt?buy=1` |
| NordVPN | 137 | nord-vpn | `/meta-image/apps/nordvpn.png` | `/apps/nord-vpn?buy=1` |

### 🔹 SISTEMAS / SOFTWARE (Categoría 35)

| Producto | Product ID | Slug | Imagen Meta | Enlace de Compartir |
|----------|------------|------|-------------|---------------------|
| Secure MDM iPhone | 168 | secure-mdm-iphone | `/meta-image/sistemas/mdm-apple.png` | `/apps/secure-mdm-iphone?buy=1` |
| Secure MDM Android | 169 | secure-mdm-android | `/meta-image/sistemas/mdm-android.png` | `/apps/secure-mdm-android?buy=1` |
| CryptCom | 139 | cryptcom | `/meta-image/sistemas/cryptcom.png` | `/apps/cryptcom?buy=1` |
| Renati | 151 | renati | `/meta-image/sistemas/renati.png` | `/apps/renati?buy=1` |
| Chat Mail | 142 | chat-mail | `/meta-image/sistemas/chatmail.png` | `/apps/chat-mail?buy=1` |
| Armadillo Software | 180 | armadillo-software | `/meta-image/sistemas/armadillo.png` | `/apps/armadillo-software?buy=1` |
| Vault Chat Software | 148 | vault-chat-software | `/meta-image/sistemas/vaultchat.png` | `/apps/vault-chat-software?buy=1` |
| Ultra-X | 182 | ultra-x | `/meta-image/sistemas/ultra-x.png` | `/apps/ultra-x?buy=1` |
| Intact Phone | 188 | intact-phone | `/meta-image/sistemas/intactphone.png` | `/apps/intact-phone?buy=1` |
| Dec Secure | 233 | dec-secure | `/meta-image/sistemas/dec-secure.png` | `/apps/dec-secure?buy=1` |
| SecureCrypt | 174 | secure-crypt | `/meta-image/sistemas/securecrypt.png` | `/apps/secure-crypt?buy=1` |

### 🔹 SIM ENCRIPTADOS (Categoría 40)

| Producto | Product ID | Slug | Imagen Meta | Enlace de Compartir |
|----------|------------|------|-------------|---------------------|
| SIM Física Encriptados | 508 | sim-encriptada | `/meta-image/sim-encriptados/encriptados-sim-fisica.png` | `/sim/sim-encriptada?productId=508&price=15&buy=1` |
| eSIM Encriptados | 449 | esim-encriptada | `/meta-image/sim-encriptados/encriptados-esim.png` | `/sim/esim-encriptada?productId=449&price=12&buy=1` |

### 🔹 SIM TIM (Categoría 40)

| Producto | Product ID | Slug | Imagen Meta | Enlace de Compartir |
|----------|------------|------|-------------|---------------------|
| TIM SIM Física | 448 | tim-sim | `/meta-image/sim-tim/tim-fisica.png` | `/sim/tim-sim?productId=448&price=10&buy=1` |
| TIM eSIM | 442 | esim-tim | `/meta-image/sim-tim/tim-esim-datos.png` | `/sim/esim-tim?productId=442&price=10&buy=1` |

### 🔹 ROUTER (Categoría 36)

| Producto | Product ID | Slug | Imagen Meta | Enlace de Compartir |
|----------|------------|------|-------------|---------------------|
| Router Camaleón | 59747 | router-camaleon | `/meta-image/router/router-camaleon.png` | `/router?buy=1` |

---

## Metadatos para Compartir

Cada producto tiene metadatos optimizados para redes sociales:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `title` | Título del producto con beneficio clave | "Silent Phone - Comunicación 100% Encriptada" |
| `description` | CTA corto y persuasivo | "¡Protege tus llamadas y mensajes! Compra aquí Silent Phone." |
| `image` | Imagen de previsualización (1200x630 recomendado) | `/meta-image/apps/silent-phone.png` |
| `url` | URL de destino con `buy=1` | `https://www.encriptados.net/apps/silent-circle?buy=1` |

---

## Archivos de Configuración

### Configuración de Enlaces
```
src/shared/constants/shareConfig.ts
```

Contiene:
- `APPS_SHARE_CONFIG` - Aplicaciones
- `SISTEMAS_SHARE_CONFIG` - Software/Sistemas
- `SIM_ENCRIPTADOS_SHARE_CONFIG` - SIMs Encriptados
- `SIM_TIM_SHARE_CONFIG` - SIMs TIM
- `ROUTER_SHARE_CONFIG` - Router

### Funciones Útiles

```typescript
import { 
  getShareConfigByProductId,
  getShareConfigBySlug,
  getShareUrl,
  getMetaImage 
} from "@/shared/constants/shareConfig";

// Obtener URL de compartir
const shareUrl = getShareUrl(122); // Silent Phone

// Obtener imagen de metadatos
const metaImage = getMetaImage(122);
```

---

## Implementación en Páginas

### Apps y Software (`/apps/[slug]`)

El archivo `src/app/[locale]/apps/[slug]/page.tsx` incluye:

```typescript
// Detectar parámetro ?buy=1
const searchParams = useSearchParams();

useEffect(() => {
  const buyParam = searchParams.get("buy");
  if (buyParam === "1" && product) {
    openModal({
      productid: String(product.id),
      languageCode: locale,
      selectedOption: product.category?.id || 38,
      initialPrice: numericPrice,
    });
    
    // Limpiar URL
    const url = new URL(window.location.href);
    url.searchParams.delete("buy");
    window.history.replaceState({}, "", url.toString());
  }
}, [searchParams, product]);
```

### SIMs (`/sim/[slug]`)

La página de SIMs usa estructura: `/sim/[slug]?productId=X&price=Y&buy=1`

Cuando se detecta `buy=1`, se abre el popup con los parámetros productId y price.

---

## Flujo de Compartir

```
┌─────────────────────────────────────────────────────────────────┐
│  1. Usuario en popup de compra                                  │
│     ↓                                                           │
│  2. Clic en "Compartir"                                         │
│     ↓                                                           │
│  3. Se genera URL con buy=1                                     │
│     - Apps: /apps/slug?buy=1                                    │
│     - SIMs: /sim/slug?productId=X&price=Y&buy=1                 │
│     - Router: /router?buy=1                                     │
│     ↓                                                           │
│  4. Se copia al portapapeles o abre Web Share API               │
│     ↓                                                           │
│  5. Otro usuario accede al enlace                               │
│     ↓                                                           │
│  6. Página detecta buy=1                                        │
│     ↓                                                           │
│  7. Se abre automáticamente el popup de compra                  │
│     ↓                                                           │
│  8. Se limpia buy=1 de la URL                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Previsualización en Redes Sociales

Cuando se comparte un enlace, las redes sociales mostrarán:

- **Imagen**: La imagen de `/meta-image/[categoria]/[producto].png`
- **Título**: Nombre del producto + beneficio
- **Descripción**: CTA corto invitando a comprar

### Tamaño Recomendado de Imágenes
- **1200 x 630 px** (proporción 1.91:1)
- Formato: PNG o JPG
- Peso máximo: 5MB

---

## Notas Importantes

1. **El parámetro `buy=1`** se limpia automáticamente de la URL después de abrir el popup
2. **Las imágenes de metadatos** deben existir en la carpeta correspondiente
3. **Para nuevos productos**, agregar la configuración en `shareConfig.ts`
4. **Base URL** se obtiene de `NEXT_PUBLIC_SITE_URL` (default: `https://www.encriptados.net`)
