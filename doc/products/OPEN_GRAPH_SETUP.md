# Configuración Open Graph para Compartir Productos

## ✅ Implementación Completada

Se ha implementado la funcionalidad de compartir productos con previsualizaciones en redes sociales.

### Archivos Modificados

1. **`src/app/[locale]/our-products/[productId]/page.tsx`**
   - Función `generateMetadata()` que genera dinámicamente las meta tags Open Graph
   - Incluye título, descripción, imagen y URL del producto

2. **`src/shared/components/ModalPayment/new/PurchaseHeader.tsx`**
   - Botón "Compartir" con icono de lucide-react
   - Lógica para compartir usando Web Share API o copiar al portapapeles
   - Genera URL específica del producto: `/our-products/{productId}`

3. **`.env.local`**
   - Variable `NEXT_PUBLIC_SITE_URL` para generar URLs absolutas

### Meta Tags Generados

Cuando se comparte un producto, se generan automáticamente:

```html
<!-- Open Graph (Facebook, LinkedIn, etc.) -->
<meta property="og:title" content="Nombre del Producto" />
<meta property="og:description" content="Nombre del Producto - 10 USD. Compra ahora en Encriptados." />
<meta property="og:image" content="URL de la imagen del producto" />
<meta property="og:url" content="https://www.encriptados.net/our-products/123" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Encriptados" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Nombre del Producto" />
<meta name="twitter:description" content="Nombre del Producto - 10 USD..." />
<meta name="twitter:image" content="URL de la imagen del producto" />
```

### Requisitos de Imagen

Para que las previsualizaciones se vean correctamente:

- **Tamaño recomendado**: 1200x630 píxeles
- **Formato**: JPG, PNG
- **Tamaño máximo**: 5 MB
- **Aspect ratio**: 1.91:1

### Configuración

1. **Variable de Entorno**:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://www.encriptados.net
   ```
   ⚠️ Actualiza esta URL en producción

2. **Estructura de Productos**:
   El objeto producto debe tener:
   ```typescript
   {
     id: string | number,
     name: string,
     price: number,
     images: [{ src: string }]
   }
   ```

### Cómo Funciona

1. **Usuario hace clic en "Compartir"**
2. Se genera la URL: `https://www.encriptados.net/our-products/{productId}`
3. Si el navegador soporta Web Share API → abre el selector nativo
4. Si no → copia la URL al portapapeles
5. Cuando alguien visita la URL, Next.js genera las meta tags automáticamente
6. Redes sociales leen las meta tags y muestran la preview

### Validación

Puedes validar las meta tags en:
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

### Notas

- Las meta tags se generan en el servidor (SSR)
- El cache de redes sociales puede tardar en actualizarse
- Para forzar actualización, usa los validadores mencionados
