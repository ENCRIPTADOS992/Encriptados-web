# 📋 Estructura de Datos Requerida - API de Productos

> **Documento para el equipo de Backend**  
> **Fecha:** Diciembre 2024  
> **Versión:** 1.0

---

## 🎯 RESUMEN

El frontend consume datos dinámicos de la API de WordPress para renderizar páginas de productos.

---

## 📡 ENDPOINTS UTILIZADOS

### 1. Listar productos por categoría
```
GET /wp-json/encriptados/v1/products/by-category-language?category_id=38&lang=es
```

### 2. Obtener producto por ID
```
GET /wp-json/encriptados/v1/products/{productId}?lang=es
```

---

## 📊 ESTRUCTURA JSON REQUERIDA

```json
{
  "id": 122,
  "name": "Silent Phone",
  "description": "Es una app diseñada por las mejores mentes en tecnología móvil para proteger tus comunicaciones personales y empresariales con cifrado de extremo a extremo.",
  "brand": "Silent Circle",
  "sku": "SILENT-CIRCLE",
  "type_product": "Digital",
  "price": "59",
  "on_sale": true,
  "sale_price": "49",
  "licensetime": "6",
  
  "category": { "id": 38, "name": "Apps" },
  
  "checks": [
    { "name": "Llamadas cifradas de extremo a extremo" },
    { "name": "Mensajes con autodestrucción" },
    { "name": "Sin permisos de ubicación" }
  ],
  
  "variants": [
    { "id": 59801, "licensetime": "3", "price": 59, "sku": "SILENT-3M", "image": "" },
    { "id": 59803, "licensetime": "6", "price": 99, "sku": "SILENT-6M", "image": "" },
    { "id": 59805, "licensetime": "12", "price": 159, "sku": "SILENT-12M", "image": "" }
  ],
  
  "features": [
    {
      "name": "Protocolo de Cifrado Único",
      "description": "Silent Phone utiliza el protocolo ZRTP diseñado específicamente para comunicaciones de voz seguras.",
      "image": "https://encriptados.es/wp-content/uploads/2025/06/feature-cifrado.png"
    }
  ],
  
  "title_benefits": "Asegura tus comunicaciones",
  
  "advantages": [
    {
      "name": "Chat Seguro",
      "description": "Los mensajes se eliminan automáticamente después del tiempo configurado.",
      "image": "https://url-imagen.png"
    },
    {
      "name": "Llamadas Cifradas",
      "description": "Realiza llamadas de voz y video con cifrado de extremo a extremo.",
      "image": ""
    }
  ],
  
  "faqs": [
    {
      "name": "¿Qué tan segura es la aplicación Silent Phone?",
      "description": "Silent Phone es una de las aplicaciones más seguras del mercado."
    }
  ],
  
  "heroBanners": {
    "desktop": "https://encriptados.es/wp-content/uploads/2025/06/silent-hero-desktop.png",
    "tablet": "https://encriptados.es/wp-content/uploads/2025/06/silent-hero-tablet.png",
    "mobile": "https://encriptados.es/wp-content/uploads/2025/06/silent-hero-mobile.jpg"
  },
  
  "productImage": "https://encriptados.es/wp-content/uploads/2025/06/silent-phone-producto.png",
  "iconUrl": "https://encriptados.es/wp-content/uploads/2025/06/silent-logo.png",
  "image_benefits": "https://encriptados.es/wp-content/uploads/2025/06/celular-silent-logo.png",
  
  "videoUrl": "https://www.youtube.com/embed/X9iE-f8briY",
  "video_text": "Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023",
  
  "appStoreUrl": "https://apps.apple.com/app/silent-phone",
  "googlePlayUrl": "https://play.google.com/store/apps/details?id=com.silentcircle.silentphone",
  
  "image_full": "https://encriptados.es/wp-content/uploads/2025/06/silent-full-resolution.jpg",
  "images": [
    { "src": "https://encriptados.es/wp-content/uploads/2025/06/silent-thumb-1.jpg" }
  ]
}
```

### 📝 NOTAS IMPORTANTES

| Campo | Nota |
|-------|------|
| `advantages[].image` | **OPCIONAL** - Si viene vacío o null, se muestra icono CheckCircle |
| `title_benefits` | **OPCIONAL** - Default: "Asegura tus comunicaciones" |
| `video_text` | **OPCIONAL** - Texto acompañante del video YouTube |
| `heroBanners` | **OPCIONAL** - Si no viene, usa `image_full` o `images[]` |

---

## ⚠️ PRODUCTOS FALTANTES EN BD

| Slug Frontend | Nombre Sugerido | Categoría |
|---------------|-----------------|-----------|
| `chat-mail` | ChatMail | Apps (38) |
| `cryptcom` | CryptCom | Apps (38) |
| `dec-secure` | DEC Secure | Apps (38) |
| `elyon` | Elyon | Apps (38) |
| `intact-phone` | Intact Phone | Apps (38) |
| `renati` | Renati | Apps (38) |
| `secure-mdm-android` | Secure MDM Android | Apps (38) |
| `secure-mdm-iphone` | Secure MDM iPhone | Apps (38) |
| `secureCrypt` | SecureCrypt | Apps (38) |
| `t2-communicator` | T2 Communicator | Apps (38) |
| `ultrax` | UltraX | Apps (38) |

---

## 🔄 MULTIIDIOMA

Campos traducibles: `name`, `description`, `checks[].name`, `advantages[]`, `features[]`, `faqs[]`

Idiomas: es, en, pt, fr, it
