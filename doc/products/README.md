# 📁 Documentación de Páginas de Producto

> **Proyecto:** Encriptados Web  
> **Última actualización:** Diciembre 2024

---

## 📚 ÍNDICE DE DOCUMENTOS

| # | Documento | Descripción |
|---|-----------|-------------|
| 00 | [Plan de Página Global](./00-PLAN-PAGINA-PRODUCTO-GLOBAL.md) | Plan maestro para consolidar páginas de producto |
| 01 | [Template Silent Phone](./01-SILENT-PHONE-TEMPLATE.md) | Template base usando Silent Phone como referencia |
| 02 | [Referencia de Configuración](./02-PRODUCT-CONFIG-REFERENCE.md) | Configuración estática de todos los productos |
| 03 | [Guía de Migración](./03-MIGRATION-GUIDE.md) | Paso a paso para migrar productos |
| 04 | [Estructura Datos Backend](./04-BACKEND-DATA-STRUCTURE.md) | Especificación técnica para el equipo de backend |

---

## 🎯 RESUMEN DEL PROYECTO

### Objetivo
Consolidar **25+ páginas de productos individuales** en un **sistema dinámico global** que:
- Cargue datos desde la API de WordPress
- Use URLs semánticas (`/apps/silent-phone`)
- Sea fácil de mantener y escalar

### Estado Actual
- ✅ Documentación completa creada
- ✅ **Página dinámica implementada** (`src/app/[locale]/apps/[slug]/`)
- ✅ Configuración de productos creada
- ⏳ Backend pendiente de crear 11 productos faltantes

### Archivos Implementados

```
src/app/[locale]/apps/[slug]/
├── page.tsx           # Página dinámica que renderiza cualquier producto
├── productConfig.ts   # Configuración estática de todos los productos (21)
└── productUtils.ts    # Utilidades de transformación de datos API → UI
```

### Productos en BD vs Faltantes

| Categoría | Total | En BD | Faltantes |
|-----------|-------|-------|-----------|
| Apps | 21 | 8 | 11 |
| SIMs | 3 | 3 | 0 |
| Otros | 1 | 0 | 1 |

**Productos en BD (8):**
- silent-circle (ID: 122), vault-chat (ID: 127), armadillo (ID: 177)
- threema (ID: 136), threema-work (ID: 135), vnc-lagoon (ID: 134)
- salt (ID: 133), nord-vpn (ID: 137)

**Productos Faltantes (11):**
- chat-mail, cryptcom, dec-secure, elyon, intact-phone
- renati, secure-mdm-android, secure-mdm-iphone, secureCrypt
- t2-communicator, ultrax

---

## 🔗 ENDPOINTS API

```
GET /wp-json/encriptados/v1/products/by-category-language?category_id=38&lang=es
GET /wp-json/encriptados/v1/products/{productId}?lang=es
```

---

## 📞 PRÓXIMOS PASOS

1. ✅ Implementar página dinámica `[slug]`
2. ⏳ Backend crea los 11 productos faltantes
3. ⏳ Eliminar páginas individuales antiguas
4. ⏳ Migrar SIMs al mismo sistema
