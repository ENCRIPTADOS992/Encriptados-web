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
  "description": "Descripción completa del producto...",
  "brand": "Silent Circle",
  "sku": "SILENT-CIRCLE",
  "type_product": "Digital",
  "price": "59",
  "on_sale": false,
  "sale_price": "",
  "licensetime": "6",
  
  "category": { "id": 38, "name": "Apps" },
  
  "checks": [
    { "name": "Llamadas cifradas" },
    { "name": "Mensajes temporizados" }
  ],
  
  "advantages": [
    {
      "name": "Mensajes con autodestrucción",
      "description": "Los mensajes se eliminan automáticamente...",
      "image": "https://url-imagen.png"
    }
  ],
  
  "features": [
    {
      "name": "Protocolo Seguro",
      "description": "Encriptación de extremo a extremo...",
      "image": "https://url-icono.png"
    }
  ],
  
  "faqs": [
    {
      "name": "¿Pregunta frecuente?",
      "description": "Respuesta a la pregunta."
    }
  ],
  
  "variants": [
    { "id": 609, "licensetime": "1", "price": 15, "sku": "SILENT-1M", "image": "" },
    { "id": 610, "licensetime": "6", "price": 59, "sku": "SILENT-6M", "image": "" },
    { "id": 611, "licensetime": "12", "price": 99, "sku": "SILENT-12M", "image": "" }
  ]
}
```

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
