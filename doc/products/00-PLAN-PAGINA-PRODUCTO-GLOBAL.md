# 📋 PLAN: Página de Producto Global Dinámica

> **Fecha:** Diciembre 2024  
> **Estado:** En Implementación  
> **Prioridad:** Alta  

---

## 🎯 OBJETIVO

Consolidar **25+ páginas de productos** individuales en una **única página dinámica** que:
- Cargue datos desde la API de WordPress
- Use URLs semánticas basadas en el slug del producto
- Mantenga datos hardcodeados solo donde sea estrictamente necesario
- Sea mantenible, escalable y optimizada para SEO

---

## 📊 ESTADO ACTUAL

### Páginas Existentes (Hardcodeadas)

| Categoría | Cantidad | Páginas |
|-----------|----------|---------|
| **Apps** | 21 | armadillo, armadillo-v2, chat-mail, cryptcom, dec-secure, elyon, intact-phone, nord-vpn, renati, salt, secure-mdm-android, secure-mdm-iphone, secureCrypt, silent-circle, t2-communicator, threema, threema-work, ultrax, vault-chat, vault-chat-v2, vnc-lagoon |
| **SIMs** | 3 | encrypted-sim, tim-sim, ira-sim |
| **Otros** | 1 | router |
| **TOTAL** | **25** | |

### Productos en Base de Datos (API WordPress)

#### Apps (Categoría 38)
| ID | Nombre | Slug Web |
|----|--------|----------|
| 122 | Silent Phone | `silent-circle` |
| 127 | VaultChat | `vault-chat` |
| 177 | Armadillo Chat | `armadillo` |
| 136 | Threema | `threema` |
| 135 | Threema Work | `threema-work` |
| 134 | VNC Lagoon | `vnc-lagoon` |
| 133 | Salt App | `salt` |
| 137 | Nord VPN | `nord-vpn` |

---

## 🗂️ ESTRUCTURA DE DATOS

### Datos desde API (Ya Disponibles)

```typescript
interface ProductById {
  id: number;
  name: string;
  description: string;
  brand: string;
  sku: string;
  type_product: string;
  price: string;
  on_sale: boolean;
  sale_price: string;
  licensetime: string;
  category: { id: number; name: string };
  image: string;
  image_full: string;
  images: Array<{ src: string }>;
  checks: Array<{ name: string }>;
  faqs: Array<{ name: string; description: string }>;
  advantages: Array<{ name: string; description: string; image: string }>;
  features: Array<{ name: string; description: string; image: string }>;
  variants: Array<{ id: number; licensetime: string; price: number; sku: string }>;
}
```

### Datos Hardcodeados (Archivo de Configuración)

```typescript
interface ProductStaticConfig {
  slug: string;
  productId: number;
  heroBanners: { desktop: string; tablet: string; mobile: string };
  productImage: string;
  iconUrl: string;
  benefitIcon: string;
  videoUrl?: string;
  videoTitle?: string;
  benefitsTitle?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  relatedProducts: { simProductId: string; esimProductId: string };
}
```

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
src/app/[locale]/apps/
├── [slug]/                    # ← NUEVA carpeta dinámica
│   ├── page.tsx               # Página que carga datos por slug
│   ├── productConfig.ts       # Configuración estática de todos los productos
│   └── productUtils.ts        # Funciones de transformación de datos
├── component/                 # Componentes reutilizables (mantener)
├── shared/                    # Recursos compartidos (mantener)
└── layout.tsx                 # Layout de la sección (mantener)
```

---

## 🔄 FLUJO DE DATOS

```
1. Usuario visita: /es/apps/silent-circle
                      ↓
2. Next.js extrae: slug = "silent-circle"
                      ↓
3. productConfig.ts: getProductConfig("silent-circle") → { productId: 122, ... }
                      ↓
4. API WordPress: getProductById(122, "es") → { name, description, faqs, ... }
                      ↓
5. productUtils.ts: Transforma datos API → formato de componentes
                      ↓
6. Render: Componentes reciben datos combinados (API + config estática)
```

---

## ✅ IMPLEMENTACIÓN

### Fase 1: Crear Estructura (COMPLETADA)
- [x] Crear carpeta `[slug]/`
- [x] Crear `productConfig.ts` con 21 productos
- [x] Crear `productUtils.ts` con transformaciones
- [x] Crear `page.tsx` dinámico

### Fase 2: Validación (PENDIENTE)
- [ ] Probar con productos en BD (8 productos)
- [ ] Verificar productos sin BD muestran mensaje apropiado
- [ ] Probar en todos los idiomas

### Fase 3: Limpieza (PENDIENTE - REQUIERE CUIDADO)
- [ ] Hacer backup de páginas antiguas
- [ ] Eliminar carpetas individuales una por una
- [ ] Verificar que no hay imports rotos

---

## ⚠️ NOTAS IMPORTANTES

1. **NO eliminar** `component/`, `shared/`, `layout.tsx`
2. Los productos sin ID en BD mostrarán mensaje de "próximamente"
3. Cuando backend cree los 11 productos faltantes, funcionarán automáticamente
