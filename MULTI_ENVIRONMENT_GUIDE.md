# Guía de Arquitectura Multi-Entorno y Despliegue

Este documento sirve como referencia técnica para desarrolladores y asistentes de IA sobre cómo está estructurado el frontend de **Encriptados** para funcionar simultáneamente en los entornos de pruebas y producción usando un único codebase unificado.

---

## 📊 Resumen de Entornos y Arquitectura

| Característica | Entorno de Pruebas (Staging) | Entorno de Producción |
|---|---|---|
| **Dominio Público** | `https://www.encriptados.net` | `https://encriptados.io` |
| **Rama Git** | `main` | `develop` |
| **Hosting** | Vercel (Serverless) | DigitalOcean (VPS Propio) |
| **Servidor Backend** | `https://encriptados.es/wp-json` | `https://admin.encriptados.io/wp-json` |
| **Bloqueo de Acceso** | Activo (Password Gateway) | Inactivo |
| **Indexación (SEO)** | `noindex, nofollow` | Indexado Normal |

---

## 🔍 Mecanismo de Detección de Entorno

Para evitar hardcodear URLs y comportamientos, el frontend detecta de forma dinámica en qué entorno se está ejecutando usando la constante `isProductionServer`.

El código se encuentra en [`src/shared/constants/backend.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/shared/constants/backend.ts):

```typescript
export const isServer = typeof window === "undefined";

// Detecta si el dominio del sitio corresponde a producción
export const isProductionServer = process.env.NEXT_PUBLIC_SITE_URL?.includes("encriptados.io");
```

---

## 🛠️ Comportamientos Diferenciados por Entorno

### 1. Resolución de Endpoints Administrativos y Órdenes
Para evitar que las transacciones y cupones de prueba impacten la base de datos de producción:
*   **Cupones y Configuración**: En [`backend.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/shared/constants/backend.ts), `WP_ADMIN_BASE_URL` apunta a `encriptados.es` en staging y a `admin.encriptados.io` en producción.
*   **Órdenes**: En [`proxyOrderRoute.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/app/api/wp-json/encriptados/v1/orders/proxyOrderRoute.ts), la variable `WP_ORDER_BASE` se resuelve en runtime según el hostname detectado en la cabecera del request, enviando las órdenes al backend correcto.

### 2. Normalización de Parámetros de Proveedor (SIMs)
En la base de datos de staging (`encriptados.es`), el proveedor de las SIMs Encriptadas está guardado como `"encrypted"`, mientras que en el frontend y en producción se busca como `"encriptados"`.
*   **Solución**: En [`services.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/features/products/services.ts), se intercepta el parámetro `provider` en las consultas de catálogo y detalles de producto. Si estamos en staging (`!isProductionServer`), se traduce automáticamente `"encriptados"` a `"encrypted"`.

### 3. Resolución de Colisiones de IDs de Categoría (SIMs vs Recargas)
En staging, tanto la categoría de SIMs como la de Recargas están configuradas con el ID `40` en el archivo `.env`.
*   **Solución**: En [`productCategories.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/shared/constants/productCategories.ts), el objeto `PRODUCT_CATEGORY_API_PARAM_BY_ID` define la clave `[PRODUCT_CATEGORY_IDS.SIMS]: "sims"` en último lugar. Esto garantiza que en caso de colisión, la categoría de SIMs tome prioridad de mapeo, consultando `/store/products?category_id=sims` y cargando las 39 tarjetas SIM en lugar de caer en el endpoint de recargas (que devuelve 1 solo producto).

### 4. Bypass de Caché en Staging
Para facilitar las pruebas de cambios en el inventario/precios del WordPress de staging sin esperar tiempos de CDN o Next.js Cache:
*   **API Proxy**: En [`route.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/app/api/wp-json/[...path]/route.ts), el `fetch` al backend de WordPress se realiza siempre con `cache: "no-store"` para evitar el almacenamiento persistente en disco durante la fase de build.
*   **Cabeceras de Respuesta**: Si es staging, el proxy retorna `Cache-Control: no-store, max-age=0, must-revalidate` para evitar almacenamiento en el CDN de Vercel.
*   **Query Param Dinámico**: En [`services.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/features/products/services.ts), se añade un timestamp dinámico `_cb=Date.now()` a las consultas de staging para forzar la actualización de caché en el navegador.

### 5. Fallback de Slugs de SIMs
Dado que los slugs generados a partir de los nombres de producto en staging difieren de producción (ej. `"sim-fisica"` vs `"sim-encriptada"`):
*   **Solución**: En [`services.ts`](file:///d:/Clients/Encriptados/Encriptados-frontend/src/features/products/services.ts), la función `getProductBySlugInCategory` intercepta las peticiones de tipo SIM y resuelve dinámicamente el slug mapeándolo de forma inteligente por `provider` y `type_product` usando la utilidad `getSimProductUrl`.

---

## 🔄 Flujo de Trabajo y Despliegue de Cambios

Cualquier cambio de código debe realizarse siguiendo el flujo Git para garantizar paridad y orden:

```
                  ┌───────────────┐
                  │ Rama develop  │ (Release / Desarrollo activo)
                  └───────┬───────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
 ┌─────────────────────┐     ┌─────────────────────┐
 │ DigitalOcean (.io)  │     │   Merge a "main"    │
 ├─────────────────────┤     └──────────┬──────────┘
 │ Despliegue manual   │                │
 │ de producción       │                ▼
 └─────────────────────┘     ┌─────────────────────┐
                             │   Vercel (.net)     │
                             ├─────────────────────┤
                             │ Auto-deploy de      │
                             │ staging en Vercel   │
                             └─────────────────────┘
```

### 1. Desarrollo e Integración
*   Trabaja siempre sobre la rama `develop`.
*   Realiza commits descriptivos y haz push:
    ```bash
    git checkout develop
    git commit -m "feat: mi cambio"
    git push origin develop
    ```

### 2. Desplegar a Producción (`encriptados.io` - VPS DigitalOcean)
El servidor VPS se despliega manualmente desde la rama `develop`:
```bash
# Conexión SSH al servidor de producción
ssh -i ~/.ssh/id_rsa_admin_enc root@164.90.214.200

# Comandos de despliegue en el servidor
cd /var/www/prod.encriptados.io
git pull origin develop
npm run build
pm2 restart staging-encriptados
```

### 3. Desplegar a Staging (`encriptados.net` - Vercel)
Para sincronizar las pruebas, mezcla la rama `develop` a `main` y empuja a GitHub. Vercel detectará el push en `main` e iniciará la build automáticamente:
```bash
git checkout main
git merge develop
git push origin main
git checkout develop
```
