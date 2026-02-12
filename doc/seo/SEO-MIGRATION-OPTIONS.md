# Migración SEO: WordPress → Next.js — Opciones para no perder tráfico

> **Proyecto:** Encriptados Web  
> **Dominio actual:** encriptados.io (WordPress + Rank Math SEO)  
> **Dominio destino:** encriptados.io (Next.js 14)  
> **Fecha:** 11 de febrero de 2026  
> **Estado:** Para debate con el equipo

---

## 1. SITUACIÓN ACTUAL

### 1.1 Tráfico actual
- **12,550 clics totales** en búsqueda web (últimos 3 meses)
- Tendencia estable ~100-150 clics/día

### 1.2 URLs indexadas en Google (según sitemaps)

| Sitemap | Tipo | URLs | Observaciones |
|---------|------|-----:|---------------|
| `sitemap_index.xml` | Índice principal (Rank Math) | 864 | Core pages + blog posts |
| `locations_v2.xml` | Índice location pages | 52,892 | SEO programático por ciudad |
| `sitemap.xml` | Páginas adicionales | 599 | Varias páginas |
| **apps-en.xml** | Location pages EN | 6,471 | `/location/{app}-app-{city}` |
| **apps-es.xml** | Location pages ES | 6,480 | `/location/es/{app}-app-{city}` |
| **apps-fr.xml** | Location pages FR | 5,607 | `/location/fr/{app}-app-{city}` |
| **phone-en.xml** | Phone pages EN | 8,628 | Location pages de phones |
| **phone-es.xml** | Phone pages ES | 8,640 | Location pages de phones |
| **phone-fr.xml** | Phone pages FR | 7,476 | Location pages de phones |
| **sim-en.xml** | SIM pages EN | 2,876 | Location pages de SIMs |
| **sim-es.xml** | SIM pages ES | 3,599 | Location pages de SIMs |
| **sim-fr.xml** | SIM pages FR | 3,115 | Location pages de SIMs |
| **TOTAL** | | **~54,355** | |

### 1.3 Desglose por tipo de contenido

| Categoría | Cantidad aprox. | % del total | Ejemplo de URL |
|-----------|----------------:|:-----------:|----------------|
| Location pages (apps×ciudades) | ~52,892 | **97.3%** | `/location/securecrypt-app-new-york` |
| Core pages (productos, info) | ~400 | 0.7% | `/pages/cryptcom/`, `/en/pages/threema-work/` |
| Blog posts (ES + EN) | ~450 | 0.8% | `/como-funciona-nordvpn-descubriendo...` |
| Otras (carrito, cuenta, etc.) | ~150 | 0.3% | `/mi-cuenta/`, `/carrito/` |

### 1.4 Hallazgo clave

> **El 97% de las URLs indexadas son location pages** (`/location/...`) que actualmente  
> **NO existen en el proyecto Next.js**. Si se despliega sin resolverlas, esas ~53,000 páginas  
> darán 404 masivo y Google penalizará severamente el dominio.

### 1.5 Apps que generan location pages

Cada una de estas apps tiene ~700 location pages × 3 idiomas (EN, ES, FR):

| App | EN | ES | FR |
|-----|:--:|:--:|:--:|
| SecureCrypt | ✅ | ✅ | — |
| Silent Circle | ✅ | ✅ | — |
| Armadillo Chat | ✅ | ✅ | — |
| VaultChat | ✅ | ✅ | — |
| Salt | ✅ | ✅ | — |
| VNCLagoon | ✅ | ✅ | — |
| Threema Work | ✅ | ✅ | — |
| Threema | ✅ | ✅ | — |
| NordVPN | ✅ | ✅ | — |
| + Phones y SIMs | ✅ | ✅ | ✅ |

---

## 2. OPCIONES DE MIGRACIÓN

---

### OPCIÓN A — Redirects Masivos con Patrones (⭐ Recomendada)

**Concepto:** Usar redirect 301 pattern-based en `next.config.mjs` para redirigir todas las URLs antiguas a sus equivalentes en Next.js.

#### Cómo funciona

```
WordPress URL                              →  Next.js URL
─────────────────────────────────────────     ──────────────────────
/pages/cryptcom/                           →  /es/apps/cryptcom
/en/pages/cryptcom/                        →  /en/apps/cryptcom
/fr/pages/cryptcom/                        →  /fr/apps/cryptcom
/pt/cryptcom/                              →  /pt/apps/cryptcom
/it/cryptcom/                              →  /it/apps/cryptcom
/location/securecrypt-app-new-york         →  /en/apps/securecrypt
/location/es/securecrypt-app-bogota        →  /es/apps/securecrypt
/location/fr/securecrypt-app-paris         →  /fr/apps/securecrypt
```

#### Implementación

```js
// next.config.mjs → redirects()
async redirects() {
  return [
    // === CORE PAGES (producto por producto, idioma por idioma) ===
    { source: '/pages/cryptcom/', destination: '/es/apps/cryptcom', permanent: true },
    { source: '/en/pages/cryptcom/', destination: '/en/apps/cryptcom', permanent: true },
    // ... (~400-600 reglas manuales)

    // === LOCATION PAGES (pattern-based, ~30 reglas cubren ~53,000 URLs) ===
    { source: '/location/securecrypt-app-:city', destination: '/en/apps/securecrypt', permanent: true },
    { source: '/location/es/securecrypt-app-:city', destination: '/es/apps/securecrypt', permanent: true },
    { source: '/location/silent-circle-app-:city', destination: '/en/apps/silent-circle', permanent: true },
    { source: '/location/es/silent-circle-app-:city', destination: '/es/apps/silent-circle', permanent: true },
    { source: '/location/armadillo-chat-app-:city', destination: '/en/apps/armadillo-chat', permanent: true },
    { source: '/location/es/armadillo-chat-app-:city', destination: '/es/apps/armadillo-chat', permanent: true },
    // ... (~30-50 reglas por app × idioma)

    // === BLOG POSTS (necesita mapeo manual o catch-all) ===
    { source: '/noticias/', destination: '/es/news', permanent: true },
    { source: '/en/news/', destination: '/en/news', permanent: true },
    // ... posts individuales
  ]
}
```

#### Pros
- ✅ Cero dependencia de WordPress después de migrar
- ✅ ~30 reglas de pattern cubren ~53,000 location pages
- ✅ Google procesa 301 y transfiere autoridad (~90-99%)
- ✅ Implementación limpia, todo en un solo archivo
- ✅ Sin costos adicionales de infraestructura

#### Contras
- ⚠️ Se pierde el tráfico long-tail de location pages (ej: "securecrypt app denver")
- ⚠️ Blog posts requieren mapeo manual (~200-400 redirects)
- ⚠️ Caída temporal de tráfico mientras Google re-indexa (2-6 semanas)

#### Tiempos estimados

| Tarea | Tiempo | Quién |
|-------|:------:|-------|
| Exportar URLs con tráfico desde Search Console | 1h | SEO/Marketing |
| Crear mapeo core pages WP → Next.js | 3-4h | Dev |
| Crear reglas pattern para location pages | 2h | Dev |
| Mapear blog posts con tráfico | 3-4h | Dev + SEO |
| Implementar en `next.config.mjs` | 2h | Dev |
| Testing y validación de redirects | 2-3h | Dev + QA |
| Implementar Fases 0-1 SEO-TASKS.md (sitemap, robots, metadata) | 6-8h | Dev |
| **TOTAL** | **~20-24h** | |
| **Tiempo de recuperación Google** | **2-6 semanas** | Automático |

---

### OPCIÓN B — Replicar Location Pages en Next.js (SEO Programático)

**Concepto:** Crear una ruta dinámica `/location/[...slug]` en Next.js que genere las mismas ~53,000 páginas dinámicamente, manteniendo todas las URLs intactas.

#### Cómo funciona

```
src/app/location/
  └── [...slug]/
      └── page.tsx    ← Genera /location/securecrypt-app-new-york
                        /location/es/threema-app-bogota
                        etc.
```

La página parsea el slug para extraer:
1. **Idioma** (si hay prefijo `es/`, `fr/`)
2. **App** (`securecrypt-app`, `threema-work-app`, etc.)
3. **Ciudad** (`new-york`, `bogota`, etc.)

Y renderiza una página con contenido del producto + datos de la ciudad.

#### Pros
- ✅ **Cero pérdida de URLs** — todas las 53,000 siguen vivas
- ✅ Mantiene tráfico long-tail de keywords locales
- ✅ Mejora las pages con contenido más rico (Next.js vs WP)
- ✅ Oportunidad de mejorar el SEO programático con mejor metadata

#### Contras
- ⚠️ Mucho trabajo de desarrollo (~40-60h)
- ⚠️ Necesita base de datos de ciudades/países para generar contenido
- ⚠️ Build times largos si se usa `generateStaticParams` para 53K páginas
- ⚠️ Las location pages pueden tener bajo ROI (verificar en Search Console)
- ⚠️ Mantenimiento continuo de una funcionalidad heredada

#### Tiempos estimados

| Tarea | Tiempo | Quién |
|-------|:------:|-------|
| Analizar estructura de location pages en WP | 3h | Dev |
| Extraer/crear base de datos de ciudades | 5-8h | Dev |
| Crear ruta dinámica `/location/[...slug]` | 8-12h | Dev |
| Templates por tipo (app, phone, sim) | 8-10h | Dev |
| Metadata + JSON-LD por location page | 4-6h | Dev |
| Sitemap para 53K URLs | 3-4h | Dev |
| Testing | 4-6h | Dev + QA |
| **TOTAL** | **~40-55h** | |
| **Tiempo de recuperación Google** | **0-2 semanas** | Mínimo |

---

### OPCIÓN C — Proxy Inverso Transicional (Migración Gradual)

**Concepto:** Mantener WordPress activo sirviendo las URLs que Next.js aún no tiene, usando un proxy/rewrite. Migrar progresivamente.

#### Cómo funciona

```
                    ┌─────────────────────┐
  Usuario ────────▶ │   Next.js (Vercel)  │
                    │                     │
                    │  ¿Ruta existe?      │
                    │  SÍ → Servir Next   │
                    │  NO → Proxy a WP ───┼──▶ WordPress (servidor actual)
                    │                     │
                    └─────────────────────┘
```

Implementación en `next.config.mjs`:
```js
async rewrites() {
  return {
    fallback: [
      // Todo lo que Next.js no matchee → WordPress
      { source: '/:path*', destination: 'https://wp-legacy.encriptados.io/:path*' }
    ]
  }
}
```

#### Pros
- ✅ **Cero riesgo de pérdida de tráfico** — WordPress sigue sirviendo lo que Next.js no tiene
- ✅ Migración gradual, sin urgencia
- ✅ Fácil de revertir si algo sale mal

#### Contras
- ⚠️ **WordPress debe seguir corriendo** (costos de servidor, mantenimiento, seguridad)
- ⚠️ Latencia adicional para las páginas proxy'd
- ⚠️ Complejidad operativa (dos sistemas en paralelo)
- ⚠️ DNS y configuración de red más compleja
- ⚠️ No hay fecha clara de "migración completada"
- ⚠️ WordPress legacy se convierte en deuda técnica permanente

#### Tiempos estimados

| Tarea | Tiempo | Quién |
|-------|:------:|-------|
| Configurar WordPress en subdominio/IP separada | 3-4h | DevOps |
| Configurar rewrites/proxy en Next.js | 2-3h | Dev |
| Testing de rutas proxy vs Next.js | 3-4h | Dev + QA |
| Configurar DNS/SSL para ambos | 2-3h | DevOps |
| **Setup inicial** | **~12-15h** | |
| **Migración progresiva de cada sección** | **2-4h/sección** | Continuo |
| **Tiempo total (si migran todo)** | **~60-80h** | 2-4 meses |
| **Tiempo de recuperación Google** | **0 semanas** | Sin impacto |

---

### OPCIÓN D — Redirect Selectivo + 410 Gone (Pragmática)

**Concepto:** Solo redirigir URLs que realmente generan tráfico. El resto devuelve 410 (Gone) para que Google las desindexe limpiamente.

#### Cómo funciona

1. **Exportar de Search Console** las URLs con clics > 0 en últimos 12 meses
2. **Core pages con tráfico** → Redirect 301 a su equivalente Next.js
3. **Location pages con tráfico** → Redirect 301 al producto principal
4. **Location pages SIN tráfico** → Responder 410 (Gone)
5. **Blog posts con tráfico** → Redirect 301 a `/news` o post equivalente

#### Diferencia entre 404 y 410
| Código | Significado | Google behavior |
|:------:|-------------|-----------------|
| 404 | No encontrado | Google sigue intentando rastrear periódicamente |
| 410 | Eliminado permanente | Google desindexará más rápido y dejará de rastrear |

#### Pros
- ✅ Solo inviertes tiempo en lo que genera valor real
- ✅ Limpieza del índice (eliminar páginas que no aportan)
- ✅ Rápido de implementar
- ✅ Reduce el crawl budget desperdiciado en 53K páginas de bajo valor

#### Contras
- ⚠️ Requiere análisis previo de Search Console
- ⚠️ Posible pérdida de tráfico long-tail marginal
- ⚠️ Decisión difícil de revertir (una vez que Google desindexe, reindexa es lento)

#### Tiempos estimados

| Tarea | Tiempo | Quién |
|-------|:------:|-------|
| Exportar y analizar datos Search Console | 2-3h | SEO/Marketing |
| Clasificar URLs: redirect vs 410 | 2-3h | SEO + Dev |
| Implementar redirects para URLs con tráfico | 3-4h | Dev |
| Implementar middleware para 410 en location pages | 1-2h | Dev |
| Implementar Fases 0-1 SEO-TASKS.md | 6-8h | Dev |
| Testing | 2-3h | Dev + QA |
| **TOTAL** | **~18-24h** | |
| **Tiempo de recuperación Google** | **2-4 semanas** | |

---

## 3. TABLA COMPARATIVA

| Criterio | A: Redirects Masivos | B: Replicar Pages | C: Proxy | D: Selectivo + 410 |
|----------|:-------------------:|:-----------------:|:--------:|:-------------------:|
| **Riesgo de pérdida de tráfico** | Medio | Bajo | Nulo | Medio-Bajo |
| **Esfuerzo de desarrollo** | 20-24h | 40-55h | 12-15h setup + continuo | 18-24h |
| **Costo de infraestructura** | Ninguno | Ninguno | WP activo ($$$) | Ninguno |
| **Complejidad operativa** | Baja | Media | Alta | Baja |
| **Tiempo hasta go-live** | 1 semana | 3-4 semanas | 1 semana | 1 semana |
| **Recuperación en Google** | 2-6 semanas | 0-2 semanas | Inmediata | 2-4 semanas |
| **Mantiene location pages** | ❌ Redirige | ✅ Completo | ✅ Temporal | ❌ Selectivo |
| **Deuda técnica** | Baja | Media | Alta | Baja |
| **Escalabilidad futura** | ✅ | ✅ | ⚠️ | ✅ |

---

## 4. RECOMENDACIÓN

### Para decidir, el equipo necesita responder UNA pregunta:

> **¿Cuánto tráfico real generan las ~53,000 location pages?**

#### Si generan < 5% del tráfico total → **OPCIÓN A o D**
Las location pages son SEO programático de bajo valor. Redirigir al producto principal y enfocarse en mejorar las core pages.

#### Si generan > 20% del tráfico total → **OPCIÓN B**
Vale la pena invertir las 40-55h para replicarlas en Next.js.

#### Si no pueden permitirse NINGUNA caída → **OPCIÓN C**
El proxy les da tiempo infinito, pero a costo de mantener WordPress.

### Mi recomendación: **Opción D (Pragmática) + elementos de A**

1. Exportar datos de Search Console (1 día)
2. Implementar redirects pattern-based para location pages → producto (cubre el 97% de URLs)
3. Redirects manuales para las ~600 core pages
4. 410 para páginas obsoletas (carrito, mi-cuenta, etc.)
5. Implementar Fases 0-1-5 del SEO-TASKS.md
6. Enviar nuevos sitemaps a Search Console
7. Monitorear 30 días y ajustar

---

## 5. PASOS INMEDIATOS (Independiente de la opción elegida)

Estas tareas se deben hacer **antes de cualquier migración**:

- [ ] Exportar TODAS las URLs con clics de Google Search Console (últimos 12 meses)
- [ ] Exportar las queries con más impresiones/clics
- [ ] Identificar las top 50 páginas por tráfico
- [ ] Verificar que cada top page tiene equivalente en Next.js
- [ ] Completar Fase 0 del SEO-TASKS.md (robots.txt, sitemap, metadata base)
- [ ] Completar Fase 5 del SEO-TASKS.md (archivo de redirecciones)

---

## 6. TIMELINE PROPUESTO (si eligen Opción A/D)

```
Semana 1:  Exportar datos Search Console + Análisis de URLs
Semana 2:  Crear mapeo de redirects + Implementar Fase 0 SEO
Semana 3:  Testing de redirects + Implementar Fase 1 SEO
Semana 4:  Go-live con redirects activos
Semana 5-8: Monitoreo en Search Console + Ajustes
```

### Si eligen Opción B:

```
Semana 1:    Análisis de location pages + Exportar datos
Semana 2-3:  Desarrollar ruta dinámica /location/[...slug]
Semana 4:    Templates + metadata + JSON-LD
Semana 5:    Testing + Implementar Fases 0-1 SEO
Semana 6:    Go-live
Semana 7-10: Monitoreo + Ajustes
```

---

*Documento generado para discusión interna. Requiere validación con datos reales de Search Console.*
