# Reporte: IDs de productos hardcodeados por entorno

> Generado el 1 de junio de 2026  
> Este documento toma como insumo el reporte de la app compartido por el equipo y lo cruza contra el backend actual de productos en `https://admin.encriptados.io/wp-json/encriptados/v3/store/products`.

## Alcance

Este reporte responde dos preguntas:

1. Cuales son los equivalentes actuales de produccion para los IDs de staging reportados en la app.
2. Cual es la forma correcta de implementarlo para no depender otra vez de IDs hardcodeados por entorno.

## Hallazgos clave

- Los IDs viejos de staging reportados (`448`, `508`, `59835`, `61262`, `61588`, etc.) no resuelven directamente contra el backend actual: hoy devuelven `404` si se consultan como detalle por ID.
- La equivalencia de produccion se pudo reconstruir por nombre, SKU, proveedor, tipo de producto y categoria desde el catalogo actual del backend.
- La estrategia recomendada no es mantener un `PRODUCT_IDS` fijo por pantalla, sino resolver por claves estables del producto.
- En el frontend web actual ya existen IDs nuevos en configuraciones estaticas como [src/app/[locale]/apps/[slug]/productConfig.ts](d:/Clients/Encriptados/Encriptados-frontend/src/app/[locale]/apps/[slug]/productConfig.ts) y [src/app/[locale]/sim/[slug]/simProductConfig.ts](d:/Clients/Encriptados/Encriptados-frontend/src/app/[locale]/sim/[slug]/simProductConfig.ts), pero tambien sobreviven referencias legacy en algunos puntos.

## Resumen de archivos afectados

Esta tabla replica el alcance del reporte original compartido para la app.

| Archivo | IDs encontrados |
| --- | --- |
| `config/checkoutConfig.ts` | 32 IDs de productos |
| `components/organisms/ProductCheckoutSheet/ProductCheckoutSheet.tsx` | 6 IDs |
| `features/orders/buildOrderBody.ts` | 3 IDs |
| `features/products/useHighlightedProducts.ts` | 5 IDs |
| `screens/Home/components/PromoBannersCarousel.tsx` | 3 IDs |
| `screens/Store/StoreScreen.tsx` | 1 ID |
| `screens/Activities/ActivitiesScreen.tsx` | 5 grupos de IDs |
| `screens/Activities/ActivityCard.tsx` | 1 ID |
| `hooks/usePushNotificationNavigation.ts` | 5 grupos de IDs |

## Equivalencias consolidadas staging -> produccion

| ID (staging) | Nombre / descripcion | ID actual en backend | Como se resolvio |
| --- | --- | --- | --- |
| `448` | SIM Física TIM | `60946` | `SIM Física` + `provider=tim` |
| `508` | SIM Física Encriptada | `60950` | `SIM Física` + `provider=encrypted` |
| `59747` | Camaleón Router | `60975` | Nombre `Camaleón Router` |
| `449` | eSIM Encriptados | `60947` | Nombre `eSIM` + `provider=encrypted` |
| `443` | Recarga de datos | `60944` | `Recarga Datos` + `provider=encrypted` |
| `446` | Recarga de minutos | `60945` | `Recarga Minutos` + `provider=encrypted` |
| `61262` | eSIM + Recarga de minutos | `61002` | Nombre `eSIM + Minutos` + `provider=encrypted` |
| `59835` | eSIM + Datos | `60980` | Nombre `eSIM + Datos` + `provider=encrypted` |
| `442` | Recarga de datos TIM | `60943` | `Recarga Datos` + `provider=tim` |
| `454` | Recarga de datos TIM eSIM | `60949` | Nombre `eSIM + Datos` + `provider=tim` |
| `122` | Silent Phone | `60924` | SKU `SILENT-CIRCLE` |
| `127` | VNC Lagoon | `60927` | SKU `VNC-LAGOON` |
| `133` | Salt | `60926` | Nombre `Salt App` / SKU `SALT-APP` |
| `134` | VaultChat (Apps) | `60925` | SKU `VAULT-CHAT-APP` |
| `135` | Armadillo Chat | `60938` | SKU `ARMADILLO-CHAT-LICENSE-1` |
| `136` | Threema Work | `60928` | Nombre `Threema Work` |
| `137` | Threema | `60929` | Nombre `Threema` |
| `177` | NORD VPN | `60930` | Nombre `Nord VPN` |
| `233` | DEC Secure | `60942` | Nombre `DEC Secure` |
| `188` | Intact Phone | `60941` | Nombre `Intact Phone` |
| `182` | Ultra X | `60940` | Nombre `Ultra X` |
| `148` | VaultChat (Sistemas) | `60933` | SKU `VAULT-CHAT-6` |
| `180` | Armadillo (Sistemas) | `60939` | Nombre `Armadillo` |
| `142` | Chatmail | `60932` | Nombre `ChatMail` |
| `151` | Renati | `60934` | SKU `RENATI` |
| `174` | SecureCrypt | `60937` | Nombre `SecureCrypt` |
| `169` | Secure MDM Android | `60936` | Nombre `Secure MDM Android` |
| `168` | Secure MDM Apple | `60935` | Nombre `Secure MDM iPhone` |
| `139` | CRYPTCOM | `60931` | Nombre `Cryptcom` |
| `61335` | Zi0n | `61009` | Nombre `Zi0n` |
| `61085` | Galaxia MDM iPhone | `60996` | Nombre `Galaxia MDM Iphone` |
| `61588` | Activar Apps | `61021` | Nombre `Activar Apps` |
| `61453` | ID especial en ActivityCard | `❓` | No se pudo mapear con certeza solo con el reporte |

## `config/checkoutConfig.ts`

Registry principal de checkout nativo y conjunto de productos habilitados para compra.

| ID (staging) | Nombre / descripcion | ID actual (backend) |
| --- | --- | --- |
| `448` | SIM Física TIM | `60946` |
| `508` | SIM Física Encriptada | `60950` |
| `59747` | Camaleón Router | `60975` |
| `449` | eSIM Encriptados | `60947` |
| `443` | Recarga de datos | `60944` |
| `446` | Recarga de minutos | `60945` |
| `61262` | eSIM + Recarga de minutos | `61002` |
| `59835` | eSIM + Datos | `60980` |
| `442` | Recarga de datos TIM | `60943` |
| `454` | Recarga de datos TIM eSIM | `60949` |
| `122` | Silent Phone | `60924` |
| `127` | VNC Lagoon | `60927` |
| `133` | Salt | `60926` |
| `134` | VaultChat (Apps) | `60925` |
| `135` | Armadillo Chat | `60938` |
| `136` | Threema Work | `60928` |
| `137` | Threema | `60929` |
| `177` | NORD VPN | `60930` |
| `233` | DEC Secure | `60942` |
| `188` | Intact Phone | `60941` |
| `182` | Ultra X | `60940` |
| `148` | VaultChat (Sistemas) | `60933` |
| `180` | Armadillo (Sistemas) | `60939` |
| `142` | Chatmail | `60932` |
| `151` | Renati | `60934` |
| `174` | SecureCrypt | `60937` |
| `169` | Secure MDM Android | `60936` |
| `168` | Secure MDM Apple | `60935` |
| `139` | CRYPTCOM | `60931` |
| `61335` | Zi0n | `61009` |
| `61085` | Galaxia MDM iPhone | `60996` |
| `61588` | Activar Apps | `61021` |

## `components/organisms/ProductCheckoutSheet/ProductCheckoutSheet.tsx`

Condiciones visuales dentro del sheet de checkout.

| ID (staging) | Uso en el codigo | ID actual (backend) |
| --- | --- | --- |
| `174` | Mostrar enlace de configuración MDM (SecureCrypt iOS) | `60937` |
| `168` | Mostrar enlace de configuración MDM (Secure MDM Apple) | `60935` |
| `61085` | Mostrar enlace de configuración MDM (Galaxia MDM iPhone) | `60996` |
| `59747` | Mostrar descripcion específica de router (Camaleón) | `60975` |
| `508` | Mostrar descripcion de SIM Física Encriptada | `60950` |
| `448` | Mostrar descripcion de SIM Física TIM | `60946` |

## `features/orders/buildOrderBody.ts`

Construcción del body del pedido.

| ID (staging) | Uso en el codigo | ID actual (backend) |
| --- | --- | --- |
| `122` | Builder dedicado para Silent Phone | `60924` |
| `61335` | Lógica especial de renovación por cantidad (Zi0n) | `61009` |
| `61262` | Lógica especial para eSIM + minutos | `61002` |

## `features/products/useHighlightedProducts.ts`

Productos destacados en Home.

| ID (staging) | Nombre | ID actual (backend) |
| --- | --- | --- |
| `61588` | Activar Apps | `61021` |
| `59835` | eSIM + Datos | `60980` |
| `454` | Recarga de datos TIM eSIM | `60949` |
| `122` | Silent Phone | `60924` |
| `139` | CRYPTCOM | `60931` |

## `screens/Home/components/PromoBannersCarousel.tsx`

| ID (staging) | Nombre | ID actual (backend) |
| --- | --- | --- |
| `61588` | Activar Apps | `61021` |
| `61335` | Zi0n | `61009` |
| `61085` | Galaxia MDM iPhone | `60996` |

## `screens/Store/StoreScreen.tsx`

| ID (staging) | Uso en el codigo | ID actual (backend) |
| --- | --- | --- |
| `61588` | Redirección especial al flujo de Activar Apps | `61021` |

## `screens/Activities/ActivitiesScreen.tsx` y `ActivityCard.tsx`

| IDs (staging) | Uso en el codigo | IDs actuales (backend) |
| --- | --- | --- |
| `454`, `449`, `59835`, `61262` | Navegar a pantalla de SIM despues de activación (eSIM) | `60949`, `60947`, `60980`, `61002` |
| `442`, `443`, `446` | Navegar a pantalla de SIM (recargas) | `60943`, `60944`, `60945` |
| `448`, `508` | Navegar a pantalla de SIM física | `60946`, `60950` |
| `61453` | Lógica especial en tarjeta de actividad | `❓` |

## `hooks/usePushNotificationNavigation.ts`

| IDs (staging) | Uso en el codigo | IDs actuales (backend) |
| --- | --- | --- |
| `454`, `449`, `59835`, `61262` | Push -> pantalla de SIM (eSIM) | `60949`, `60947`, `60980`, `61002` |
| `442`, `443`, `446` | Push -> pantalla de SIM (recargas) | `60943`, `60944`, `60945` |
| `448`, `508` | Push -> pantalla de SIM física | `60946`, `60950` |

## Como se deberia implementar

## Opcion 1. Mapa fijo por entorno

Esta opción sirve como parche corto cuando ya existe mucha lógica basada en ID.

```ts
export const PRODUCT_IDS = {
  staging: {
    SIM_TIM_PHYSICAL: 448,
    SIM_ENCRYPTED_PHYSICAL: 508,
    ESIM_ENCRYPTED: 449,
    ESIM_TIM_DATA: 454,
    ESIM_ENCRYPTED_DATA: 59835,
    ESIM_ENCRYPTED_MINUTES: 61262,
    ACTIVAR_APPS: 61588,
    ZI0N: 61335,
    GALAXIA_MDM_IPHONE: 61085,
  },
  production: {
    SIM_TIM_PHYSICAL: 60946,
    SIM_ENCRYPTED_PHYSICAL: 60950,
    ESIM_ENCRYPTED: 60947,
    ESIM_TIM_DATA: 60949,
    ESIM_ENCRYPTED_DATA: 60980,
    ESIM_ENCRYPTED_MINUTES: 61002,
    ACTIVAR_APPS: 61021,
    ZI0N: 61009,
    GALAXIA_MDM_IPHONE: 60996,
  },
} as const;
```

Ventaja:

- Es simple de implementar.

Problema:

- Sigue siendo frágil.
- Si el backend vuelve a cambiar IDs, hay que redeployar la app.

## Opcion 2. Resolver por clave estable del producto

Esta es la opción recomendada.

La app no debería pensar en IDs como clave primaria de negocio. Debería usar una clave estable y luego resolver el ID real del entorno actual.

### Claves recomendadas

```ts
type ProductKey =
  | "SIM_TIM_PHYSICAL"
  | "SIM_ENCRYPTED_PHYSICAL"
  | "ESIM_ENCRYPTED"
  | "ESIM_TIM_DATA"
  | "ESIM_ENCRYPTED_DATA"
  | "ESIM_ENCRYPTED_MINUTES"
  | "SILENT_PHONE"
  | "VNC_LAGOON"
  | "SALT_APP"
  | "VAULTCHAT_APP"
  | "ARMADILLO_CHAT"
  | "THREEMA_WORK"
  | "THREEMA"
  | "NORD_VPN"
  | "DEC_SECURE"
  | "INTACT_PHONE"
  | "ULTRA_X"
  | "VAULTCHAT_SYSTEM"
  | "ARMADILLO_SYSTEM"
  | "CHATMAIL"
  | "RENATI"
  | "SECURECRYPT"
  | "SECURE_MDM_ANDROID"
  | "SECURE_MDM_IPHONE"
  | "CRYPTCOM"
  | "ZI0N"
  | "GALAXIA_MDM_IPHONE"
  | "ACTIVAR_APPS"
  | "ROUTER_CAMALEON";
```

### Regla de resolución

La app debe resolver el producto real usando, en este orden:

1. `sku` si existe
2. `name + category`
3. `name + provider + type_product`

### Ejemplo de lookup semantico

```ts
type ProductLookupRule = {
  category: "apps" | "software" | "routers" | "sims" | "activar-apps" | "recargas";
  sku?: string;
  name?: string;
  provider?: string;
  type_product?: string;
};

export const PRODUCT_LOOKUPS: Record<ProductKey, ProductLookupRule> = {
  SIM_TIM_PHYSICAL: {
    category: "sims",
    name: "SIM Física",
    provider: "tim",
    type_product: "physical",
  },
  SIM_ENCRYPTED_PHYSICAL: {
    category: "sims",
    name: "SIM Física",
    provider: "encrypted",
    type_product: "physical",
  },
  SILENT_PHONE: {
    category: "apps",
    sku: "SILENT-CIRCLE",
  },
  ROUTER_CAMALEON: {
    category: "routers",
    name: "Camaleón Router",
  },
  ACTIVAR_APPS: {
    category: "activar-apps",
    name: "Activar Apps",
  },
};
```

### Ejemplo de resolución en runtime

```ts
async function resolveProductId(rule: ProductLookupRule): Promise<number | null> {
  const params = new URLSearchParams({
    category_id: rule.category,
    lang: "es",
  });

  const res = await fetch(
    `https://admin.encriptados.io/wp-json/encriptados/v3/store/products?${params.toString()}`,
  );

  if (!res.ok) return null;

  const data = await res.json();
  const products = Array.isArray(data.products) ? data.products : [];

  const match = products.find((product: any) => {
    if (rule.sku && product.sku === rule.sku) return true;

    if (rule.name && String(product.name).trim().toLowerCase() !== rule.name.trim().toLowerCase()) {
      return false;
    }

    if (rule.provider && String(product.provider).trim().toLowerCase() !== rule.provider.trim().toLowerCase()) {
      return false;
    }

    if (rule.type_product && String(product.type_product).trim().toLowerCase() !== rule.type_product.trim().toLowerCase()) {
      return false;
    }

    return Boolean(rule.name);
  });

  return match?.id ?? null;
}
```

## Recomendacion final

Si el objetivo es dejar de romper la app entre staging y produccion, la implementación correcta es:

1. Reemplazar IDs hardcodeados por `ProductKey` estables.
2. Resolver los IDs reales por backend al iniciar la app o al bootstrap del catalogo.
3. Usar `sku` como criterio principal cuando exista.
4. Usar `name + provider + type_product + category` como fallback.
5. Mantener un mapa fijo por entorno solo como fallback de emergencia, no como fuente principal.

## Pendientes

- `61453` no pudo mapearse con certeza solo con el reporte textual compartido. Se necesita el nombre del producto o el fragmento exacto de lógica en la app para resolverlo bien.
- `Activar Apps` (`61021`) aparece en el catalogo actual, pero conviene validar en la app si su flujo debe seguir considerándose especial por ruta y navegación, no solo por ID.