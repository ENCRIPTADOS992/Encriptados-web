# Documentación de Integración Web - App (React Native WebView)

Este documento detalla el esquema de comunicación entre la Web y la App Móvil a través de `ReactNativeWebView`, específicamente enfocado en el manejo de compras y soporte (Telegram), variando según si el usuario está identificado (`user`) o es un visitante (`guest`).

## 1. Parámetros de Entrada (URL / App Mode)
Para que la Web se adapte al contexto de la App, la App debe enviar un parámetro `from` en la URL al cargar la WebView. Dependiendo de este parámetro, la Web activará distintos comportamientos.

### Valores de `from`:
*   `?from=user`: Indica que es un usuario registrado navegando desde la app. La Web interceptará botones clave para enviar eventos nativos a la App, bloqueando acciones web (ej: no se abre el checkout web).
*   `?from=guest`: Indica que es un usuario invitado navegando desde la app. Se comporta con el flujo web estándar: el botón de comprar abre el checkout web normal y el botón de soporte abre directamente Telegram. No envía eventos a la App.
*   `?from=app_mobile`: Valor legacy soportado que delega el comportamiento al estándar web pero con adaptaciones de UI móvil.

> **Nota:** La web persistirá este estado internamente durante la sesión de navegación del usuario, por lo que no es necesario pasar `?from=` en cada cambio interno de ruta, pero sí en la carga inicial que haga la App en su WebView.

## 2. Eventos que emite la Web hacia la App
La web envía información a la app utilizando la interfaz inyectada: `window.ReactNativeWebView.postMessage(JSON.stringify(payload))`. 

La App (React Native) debe escuchar estos eventos implementando la propiedad `onMessage` de su `<WebView>` y realizando un `JSON.parse(event.nativeEvent.data)`.

### Evento A: `OPEN_CHECKOUT`
Se dispara cuando el usuario (con `from=user`) presiona el botón de **"¡Compra ahora!"** en cualquier producto (SIMs, Apps y Routers).

**Condición para bloquear modal web y dispararse (postMessage):**
*   **Bloqueo de Modal:** El modal de compra web se bloquea automáticamente si la sesión se registró con `from=user`. Con `from=guest` se abre el checkout web normal.
*   **Disparo del Evento:** El evento hacia React Native se lanza sí y solo sí está inyectado `window.ReactNativeWebView` y el modo es `user`.

**Payload enviado:**
```json
{
  "action": "OPEN_CHECKOUT",
  "data": {
    "productid": "123",            // ID del producto a comprar
    "languageCode": "es",          // Idioma seleccionado
    "selectedOption": 0,           // Índice de la variante (si aplica)
    "initialPrice": 25.5           // Precio inicial del producto
  }
}
```
**Acción esperada en la App:** La app debe capturar este evento, leer la data del producto y abrir **su propio modal de checkout nativo** sin necesidad de esperar a la web.

### Evento B: `OPEN_CHAT`
Se dispara cuando el usuario (con `from=user`) presiona el botón de soporte, que originalmente decía "Chatear Telegram".

**Condiciones y Cambios en el Botón (UI):**
*   Cuando es `from=user`, el nombre del botón cambia de "Chatear Telegram" a **"Chatear ahora"**.
*   El icono circular azul de Telegram ya **no se muestra** para `from=user`.

**Condición para dispararse:**
*   `window.ReactNativeWebView` está presente.
*   El contexto/URL cargada fue registrada con `from=user`.

**Payload enviado:**
```json
{
  "action": "OPEN_CHAT"
}
```
**Acción esperada en la App:** La app intercepta la acción y abre la sección de soporte/chat 100% nativa o maneja la lógica que requiera para su canal de soporte, sin abandonar la vista actual de la WebView.

### Evento C: `OPEN_CHAT_DISTRIBUIDORES`
Se dispara cuando el usuario (con `from=user`) presiona **cualquier botón de soporte dentro de la página `/distribuidores`**.

**Páginas afectadas:** Solo aplica a la página de distribuidores (`/es/distribuidores`). El resto de páginas sigue usando `OPEN_CHAT`.

**Componentes con este botón en distribuidores:**
*   `BannerDistributors` — banner principal
*   `BeDistributorEncrypted` — sección "¿Qué implica ser un distribuidor?" (desktop)
*   `BeDistributorEncryptedMobile` — la misma sección en mobile
*   `JoinUsBanner` — banner inferior de cierre

**Condiciones y Cambios en el Botón (UI):**
*   Cuando es `from=user`, el nombre del botón cambia de "Chatear Telegram" a **"Chatear ahora"**.
*   El icono circular azul de Telegram ya **no se muestra** para `from=user`.

**Condición para dispararse:**
*   `window.ReactNativeWebView` está presente.
*   El contexto/URL fue registrada con `from=user`.

**Payload enviado:**
```json
{
  "action": "OPEN_CHAT_DISTRIBUIDORES"
}
```
**Acción esperada en la App:** La app intercepta la acción y puede diferenciarlo del soporte genérico para mostrar un flujo específico de onboarding de distribuidores, chat dedicado, o el flujo que considere adecuado.

### Evento D: `OPEN_SIMS`
Se dispara cuando el usuario (con `from=user`) presiona el botón **"SIM's"** en el menú flotante (`GlobalFloatingMenu`), visible al hacer scroll en cualquier página donde esté integrado (distribuidores, blog, noticias, embajadores, etc.).

**Condición para dispararse:**
*   `window.ReactNativeWebView` está presente.
*   El contexto fue registrado con `from=user`.

**Payload enviado:**
```json
{
  "action": "OPEN_SIMS"
}
```
**Acción esperada en la App:** La app navega o filtra a la sección de SIMs dentro de su vista de productos.

---

### Evento E: `OPEN_APPS`
Se dispara cuando el usuario (con `from=user`) presiona el botón **"Apps"** en el menú flotante.

**Payload enviado:**
```json
{
  "action": "OPEN_APPS"
}
```
**Acción esperada en la App:** La app navega o filtra a la sección de Aplicaciones.

---

### Evento F: `OPEN_SISTEMAS`
Se dispara cuando el usuario (con `from=user`) presiona el botón **"Sistemas"** en el menú flotante.

**Payload enviado:**
```json
{
  "action": "OPEN_SISTEMAS"
}
```
**Acción esperada en la App:** La app navega o filtra a la sección de Sistemas/Teléfonos.

---

### Evento G: `OPEN_ROUTERS`
Se dispara cuando el usuario (con `from=user`) presiona el botón **"Routers"** en el menú flotante.

**Payload enviado:**
```json
{
  "action": "OPEN_ROUTERS"
}
```
**Acción esperada en la App:** La app navega o filtra a la sección de Routers.

> **Nota:** El botón **"Ofertas"** del menú flotante **no genera ningún evento**; en todos los modos (incluyendo `from=user`) navega normalmente a la página `/offers`.

---

### Evento H: `OPEN_CHAT_PROMOTOR`
Se dispara cuando el usuario (con `from=user`) presiona el botón de soporte dentro de la **card "Promotor"** en la página `/embajadores`.

**Páginas afectadas:** Solo aplica a la página de embajadores (`/es/embajadores`), componente `AmbassadorCardPromotor`.

**Condiciones y Cambios en el Botón (UI):**
*   Cuando es `from=user`, el nombre del botón cambia de "Chatear Telegram" a **"Chatear ahora"**.
*   El icono circular azul de Telegram ya **no se muestra** para `from=user`.

**Condición para dispararse:**
*   `window.ReactNativeWebView` está presente.
*   El contexto/URL fue registrado con `from=user`.

**Payload enviado:**
```json
{
  "action": "OPEN_CHAT_PROMOTOR"
}
```
**Acción esperada en la App:** La app puede iniciar el flujo de registro/onboarding de promotor o abrir un canal de chat dedicado para promotores.

---

### Evento I: `OPEN_CHAT_DISTRIBUIDOR`
Se dispara cuando el usuario (con `from=user`) presiona el botón de soporte dentro de la **card "Distribuidor"** en la página `/embajadores`.

**Páginas afectadas:** Solo aplica a la página de embajadores (`/es/embajadores`), componente `AmbassadorCardDistributor`.

**Condiciones y Cambios en el Botón (UI):**
*   Cuando es `from=user`, el nombre del botón cambia de "Chatear Telegram" a **"Chatear ahora"**.
*   El icono circular azul de Telegram ya **no se muestra** para `from=user`.

**Condición para dispararse:**
*   `window.ReactNativeWebView` está presente.
*   El contexto/URL fue registrado con `from=user`.

**Payload enviado:**
```json
{
  "action": "OPEN_CHAT_DISTRIBUIDOR"
}
```
**Acción esperada en la App:** La app puede iniciar el flujo de onboarding de distribuidor o abrir un canal de chat dedicado para distribuidores (diferente del soporte estándar de distribuidores en `/distribuidores`).

---

## 3. Resumen de Casos de Uso

| Escenario | Acción en la Web | Resultado esperado |
| :--- | :--- | :--- |
| **Boton "¡Compra ahora!"** con `from=user` | Click | Se bloquea el modal web. Envía `{ action: "OPEN_CHECKOUT", data: {...} }` a la App (si está presente `ReactNativeWebView`). |
| **Boton "¡Compra ahora!"** con `from=guest` | Click | Abre el checkout web normal. No envía eventos a la App. |
| **Botón de Soporte** (otras páginas) con `from=user` | Presentación UI | Dice "Chatear ahora" (sin icono de Telegram). |
| **Botón de Soporte** (otras páginas) con `from=user` | Click | Se bloquea redirección al enlace. Envía `{ action: "OPEN_CHAT" }` a la App. |
| **Botón de Soporte** (otras páginas) con `from=guest` | Presentación UI | Dice "Chatear Telegram" (con icono). |
| **Botón de Soporte** (otras páginas) con `from=guest` | Click | **Nativo Web:** Abre la URL oficial del soporte directamente. |
| **Botón de Soporte** en `/distribuidores` con `from=user` | Presentación UI | Dice "Chatear ahora" (sin icono de Telegram). |
| **Botón de Soporte** en `/distribuidores` con `from=user` | Click | Se bloquea redirección. Envía `{ action: "OPEN_CHAT_DISTRIBUIDORES" }` a la App. |
| **Botón de Soporte** en `/distribuidores` con `from=guest` | Presentación UI | Dice "Chatear Telegram" (con icono). |
| **Botón de Soporte** en `/distribuidores` con `from=guest` | Click | **Nativo Web:** Abre la URL oficial del soporte directamente. |
| **Menú flotante – "SIM's"** con `from=user` | Click | Envía `{ action: "OPEN_SIMS" }` a la App. No navega en la web. |
| **Menú flotante – "Apps"** con `from=user` | Click | Envía `{ action: "OPEN_APPS" }` a la App. No navega en la web. |
| **Menú flotante – "Sistemas"** con `from=user` | Click | Envía `{ action: "OPEN_SISTEMAS" }` a la App. No navega en la web. |
| **Menú flotante – "Routers"** con `from=user` | Click | Envía `{ action: "OPEN_ROUTERS" }` a la App. No navega en la web. |
| **Menú flotante – "Ofertas"** (cualquier modo) | Click | Navega normalmente a `/offers`. No envía evento. |
| **Card "Promotor"** en `/embajadores` con `from=user` | Presentación UI | Dice "Chatear ahora" (sin icono de Telegram). |
| **Card "Promotor"** en `/embajadores` con `from=user` | Click | Se bloquea redirección. Envía `{ action: "OPEN_CHAT_PROMOTOR" }` a la App. |
| **Card "Promotor"** en `/embajadores` con `from=guest` | Click | **Nativo Web:** Abre la URL oficial del soporte directamente. |
| **Card "Distribuidor"** en `/embajadores` con `from=user` | Presentación UI | Dice "Chatear ahora" (sin icono de Telegram). |
| **Card "Distribuidor"** en `/embajadores` con `from=user` | Click | Se bloquea redirección. Envía `{ action: "OPEN_CHAT_DISTRIBUIDOR" }` a la App. |
| **Card "Distribuidor"** en `/embajadores` con `from=guest` | Click | **Nativo Web:** Abre la URL oficial del soporte directamente. |

## 4. Ejemplo de Código para Implementación en React Native

```javascript
import React from 'react';
import { WebView } from 'react-native-webview';

const MyStoreWebPreview = ({ urlWithFromParam }) => {

  const handleWebViewMessage = (event) => {
    try {
      const payload = JSON.parse(event.nativeEvent.data);
      console.log("Mensaje de la web recibido:", payload);

      if (payload.action === 'OPEN_CHECKOUT') {
        const { productid, initialPrice, selectedOption, languageCode } = payload.data;
        // Lanzar lógica para abrir tu checkout nativo de React Native
        // openNativeCheckoutModal(productid, initialPrice);
        
      } else if (payload.action === 'OPEN_CHAT') {
        // Redirigir a tu vista de chat interna (soporte genérico)
        // navigation.navigate('SupportChat')

      } else if (payload.action === 'OPEN_CHAT_DISTRIBUIDORES') {
        // Soporte específico para el flujo de distribuidores
        // Puede abrir un chat dedicado, pantalla de onboarding de distribuidor, etc.
        // navigation.navigate('DistributorSupport')

      } else if (payload.action === 'OPEN_SIMS') {
        // Navegar a la sección de SIMs en la app
        // navigation.navigate('Products', { category: 'sims' })

      } else if (payload.action === 'OPEN_APPS') {
        // Navegar a la sección de Aplicaciones en la app
        // navigation.navigate('Products', { category: 'apps' })

      } else if (payload.action === 'OPEN_SISTEMAS') {
        // Navegar a la sección de Sistemas/Teléfonos en la app
        // navigation.navigate('Products', { category: 'sistemas' })

      } else if (payload.action === 'OPEN_ROUTERS') {
        // Navegar a la sección de Routers en la app
        // navigation.navigate('Products', { category: 'routers' })

      } else if (payload.action === 'OPEN_CHAT_PROMOTOR') {
        // Flujo de onboarding / chat dedicado para promotores (desde /embajadores)
        // navigation.navigate('AmbassadorOnboarding', { type: 'promotor' })

      } else if (payload.action === 'OPEN_CHAT_DISTRIBUIDOR') {
        // Flujo de onboarding / chat dedicado para distribuidores (desde /embajadores)
        // navigation.navigate('AmbassadorOnboarding', { type: 'distribuidor' })
      }
    } catch (e) {
      console.error("Error procesando mensaje de WebView:", e);
    }
  };

  return (
    <WebView
      // La URL debe inyectar ?from=user (o guest) ej: https://web.com/es/router/camaleon?from=user
      source={{ uri: urlWithFromParam }} 
      onMessage={handleWebViewMessage}
    />
  );
};

export default MyStoreWebPreview;
```
