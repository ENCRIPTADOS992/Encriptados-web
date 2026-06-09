# Guía de Ramas y Despliegue (Git Flow)

Este archivo detalla la estructura y el flujo de ramas del proyecto `Encriptados-web` (frontend) para evitar mezclas accidentales de código.

## ⚠️ RESTRICCIÓN CRÍTICA
**NUNCA fusiones (*merge*) `develop` en `main` o viceversa sin instrucciones explícitas del equipo.** 
Ambas ramas alimentan entornos completamente distintos con configuraciones de seguridad, SEO y taxonomías (categorías de productos) incompatibles.

---

## Estructura de Entornos

### 1. Rama `develop` (Producción)
* **URL Pública**: `https://encriptados.io/`
* **Propósito**: Es la versión oficial de producción visible para el público general.
* **Comportamiento**: 
  * Totalmente pública (sin contraseña de acceso).
  * Indexable por buscadores (SEO activo: `index, follow`).
  * Utiliza las categorías de producción correspondientes.
* **Despliegue (Servidor VPS `164.90.214.200`)**:
  * Directorio: `/var/www/prod.encriptados.io`
  * Nombre de proceso PM2: `staging-encriptados` (Puerto local `3001`)
  * Comandos de despliegue:
    ```bash
    git pull origin develop
    npm run build
    pm2 restart staging-encriptados
    ```

### 2. Rama `main` (Staging / Pruebas)
* **URL Pública**: `https://www.encriptados.net/`
* **Propósito**: Entorno privado de pruebas para control de calidad antes del paso a producción.
* **Comportamiento**:
  * **Acceso Restringido**: Implementa un portal de protección de acceso (*site-access gate* redirigiendo a `/site-access`) que solicita usuario y contraseña.
  * **No Indexado**: Inyecta cabeceras `noindex, nofollow` para evitar de forma absoluta que Google u otros buscadores indexen este sitio.
  * **Categorías Diferentes**: Utiliza estructuras de categorías y taxonomías distintas a la de producción (lo que hace inviable unificar la base de datos o la lógica de negocio).
