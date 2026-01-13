# Sistema de Espaciado y Párrafos - Encriptados Web

## 📋 Índice
- [Introducción](#introducción)
- [Sistema de Espaciado](#sistema-de-espaciado)
- [Librería de Párrafos](#librería-de-párrafos)
- [Mejores Prácticas UX/UI](#mejores-prácticas-uxui)
- [Componentes React](#componentes-react)
- [Guía de Implementación](#guía-de-implementación)

---

## Introducción

Este documento establece el sistema de espaciado y tipografía para párrafos de la web Encriptados, siguiendo las mejores prácticas de UX/UI para mejorar la legibilidad y experiencia del usuario.

---

## Sistema de Espaciado

### Escala Base (Tailwind)

```css
/* Espaciado en multiplos de 4px */
0   = 0px      (0)
1   = 4px      (0.25rem)
2   = 8px      (0.5rem)
3   = 12px     (0.75rem)
4   = 16px     (1rem)
5   = 20px     (1.25rem)
6   = 24px     (1.5rem)
8   = 32px     (2rem)
10  = 40px     (2.5rem)
12  = 48px     (3rem)
16  = 64px     (4rem)
20  = 80px     (5rem)
24  = 96px     (6rem)
```

---

## Espaciado Semántico

### 1. Espaciado entre Secciones

| Uso | Móvil | Tablet | Desktop | Clase |
|-----|-------|--------|---------|-------|
| **Pequeño** | 32px | 48px | 64px | `py-8 md:py-12 lg:py-16` |
| **Mediano** | 48px | 64px | 80px | `py-12 md:py-16 lg:py-20` |
| **Grande** | 64px | 80px | 96px | `py-16 md:py-20 lg:py-24` |
| **Extra Grande** | 80px | 96px | 128px | `py-20 md:py-24 lg:py-32` |

**Ejemplo:**
```tsx
<section className="py-12 md:py-16 lg:py-20">
  {/* Contenido de sección */}
</section>
```

---

### 2. Espaciado entre Elementos

| Tipo | Espaciado | Clase | Uso |
|------|-----------|-------|-----|
| **Título → Subtítulo** | 12px | `mb-3` | Jerarquía visual |
| **Subtítulo → Párrafo** | 16px | `mb-4` | Separación clara |
| **Párrafo → Párrafo** | 16px | `mb-4` | Legibilidad |
| **Párrafo → Botón** | 24px | `mb-6` | Espacio para acción |
| **Título → Grupo de Cards** | 32px | `mb-8` | Separación de contenido |

---

### 3. Espaciado Interno (Padding)

| Componente | Móvil | Tablet/Desktop | Clase |
|------------|-------|----------------|-------|
| **Container** | 16px | 24px | `px-4 md:px-6` |
| **Card** | 16px | 24px | `p-4 md:p-6` |
| **Modal** | 20px | 32px | `p-5 md:p-8` |
| **Button** | 16px × 8px | 24px × 12px | `px-4 py-2 md:px-6 md:py-3` |

---

## Librería de Párrafos

### Tipo 1: Lead Paragraph (Párrafo Principal)

**Uso:** Introducción de secciones, texto destacado

```tsx
<p className="text-lg leading-relaxed text-[#F7F7F7] max-w-2xl">
  Encriptados ofrece la mejor tecnología de comunicación segura 
  del mercado, protegiendo tu privacidad en todo momento.
</p>
```

**Especificaciones:**
- Font Size: `18px` (text-lg)
- Line Height: `1.75` (leading-relaxed = 28.8px)
- Color: `#F7F7F7` (text-primary)
- Max Width: `672px` (max-w-2xl)
- Margin Bottom: `24px` (mb-6)

**Cuándo usar:**
- Hero sections
- Introducciones de página
- Descripciones destacadas de producto

---

### Tipo 2: Body Paragraph (Párrafo de Cuerpo)

**Uso:** Contenido general, descripciones estándar

```tsx
<p className="text-base leading-relaxed text-[#CCCCCC] max-w-prose">
  Nuestras SIM encriptadas funcionan en más de 200 países, 
  ofreciendo cobertura global sin comprometer tu seguridad.
</p>
```

**Especificaciones:**
- Font Size: `16px` (text-base)
- Line Height: `1.75` (leading-relaxed = 28px)
- Color: `#CCCCCC` (text-secondary)
- Max Width: `65ch` (max-w-prose)
- Margin Bottom: `16px` (mb-4)

**Cuándo usar:**
- Descripciones de producto
- Contenido informativo
- Textos de soporte

---

### Tipo 3: Caption Paragraph (Párrafo de Nota)

**Uso:** Notas aclaratorias, texto secundario

```tsx
<p className="text-sm leading-normal text-[#787878] max-w-lg">
  * Sujeto a disponibilidad en tu región
</p>
```

**Especificaciones:**
- Font Size: `14px` (text-sm)
- Line Height: `1.5` (leading-normal = 21px)
- Color: `#787878`
- Max Width: `512px` (max-w-lg)
- Margin Bottom: `12px` (mb-3)

**Cuándo usar:**
- Disclaimers
- Notas al pie
- Textos legales secundarios

---

### Tipo 4: Small Paragraph (Párrafo Pequeño)

**Uso:** Etiquetas, metadatos, información complementaria

```tsx
<p className="text-xs leading-tight text-[#7E7E7E] max-w-md">
  Última actualización: Diciembre 2025
</p>
```

**Especificaciones:**
- Font Size: `12px` (text-xs)
- Line Height: `1.25` (leading-tight = 15px)
- Color: `#7E7E7E`
- Max Width: `448px` (max-w-md)
- Margin Bottom: `8px` (mb-2)

**Cuándo usar:**
- Metadatos
- Timestamps
- Labels de formulario

---

## Mejores Prácticas UX/UI

### 1. Longitud Óptima de Línea

**Regla de Oro:** 50-75 caracteres por línea (65 ideal)

```tsx
// Bueno ✅
<p className="text-base max-w-prose">
  Texto con longitud óptima para lectura
</p>

// Malo ❌
<p className="text-base w-full">
  Línea demasiado larga que dificulta la lectura en pantallas grandes
</p>
```

**Clases recomendadas:**
- `max-w-prose` (65ch)
- `max-w-2xl` (672px)
- `max-w-3xl` (768px)

---

### 2. Line Height (Interlineado)

| Tamaño de Fuente | Line Height | Clase |
|------------------|-------------|-------|
| 12-14px (xs-sm) | 1.5 | `leading-normal` |
| 16-18px (base-lg) | 1.75 | `leading-relaxed` |
| 20px+ (xl+) | 1.6 | `leading-relaxed` |

**Principio:** Texto más pequeño necesita más espacio entre líneas

```tsx
// Bueno ✅
<p className="text-sm leading-normal">
  Texto pequeño con interlineado adecuado
</p>

// Malo ❌
<p className="text-sm leading-tight">
  Texto apretado, difícil de leer
</p>
```

---

### 3. Contraste de Color

**Ratios mínimos (WCAG AA):**
- Texto normal (16px+): **4.5:1**
- Texto grande (18px+): **3:1**

**Colores recomendados:**

```css
/* Sobre fondo oscuro (#000000) */
.text-primary    /* #F7F7F7 - Ratio: 16:1 ✅ */
.text-secondary  /* #CCCCCC - Ratio: 10:1 ✅ */

/* Sobre fondo claro (#FFFFFF) */
.text-black      /* #000000 - Ratio: 21:1 ✅ */
.text-[#3D3D3D]  /* Ratio: 10:1 ✅ */
```

---

### 4. Espaciado entre Párrafos

**Regla:** El espaciado entre párrafos debe ser mayor que el line height

```tsx
// Bueno ✅
<div className="space-y-4">
  <p className="leading-relaxed">Primer párrafo</p>
  <p className="leading-relaxed">Segundo párrafo</p>
</div>

// Malo ❌
<div className="space-y-1">
  <p>Párrafos muy juntos</p>
  <p>Dificulta la lectura</p>
</div>
```

**Clases recomendadas:**
- `space-y-4` (16px) - Estándar
- `space-y-6` (24px) - Espaciado amplio
- `space-y-8` (32px) - Separación de secciones

---

### 5. Alineación de Texto

| Tipo | Uso | Clase |
|------|-----|-------|
| **Left** | Contenido general | `text-left` |
| **Center** | Títulos, CTAs | `text-center` |
| **Right** | Datos numéricos | `text-right` |
| **Justify** | ❌ Evitar | - |

**Nota:** `text-justify` dificulta la lectura, evitar en web.

---

## Componentes React

### Paragraph Component

```tsx
// src/shared/components/Paragraph.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const paragraphVariants = cva('', {
  variants: {
    variant: {
      'lead': 'text-lg leading-relaxed max-w-2xl',
      'body': 'text-base leading-relaxed max-w-prose',
      'caption': 'text-sm leading-normal max-w-lg',
      'small': 'text-xs leading-tight max-w-md',
    },
    color: {
      'primary': 'text-[#F7F7F7]',
      'secondary': 'text-[#CCCCCC]',
      'tertiary': 'text-[#787878]',
      'black': 'text-[#000000]',
    },
    spacing: {
      'tight': 'mb-2',
      'normal': 'mb-4',
      'relaxed': 'mb-6',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'secondary',
    spacing: 'normal',
  },
});

interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  variant,
  color,
  spacing,
  children,
  className = '',
}) => {
  return (
    <p className={`${paragraphVariants({ variant, color, spacing })} ${className}`}>
      {children}
    </p>
  );
};
```

---

### Ejemplo de Uso

```tsx
import { Paragraph } from '@/shared/components/Paragraph';

// Párrafo principal
<Paragraph variant="lead" color="primary" spacing="relaxed">
  Protege tus comunicaciones con tecnología de punta
</Paragraph>

// Párrafo de cuerpo
<Paragraph variant="body" color="secondary" spacing="normal">
  Nuestras soluciones están disponibles en más de 200 países.
</Paragraph>

// Nota
<Paragraph variant="caption" color="tertiary" spacing="tight">
  * Sujeto a disponibilidad regional
</Paragraph>
```

---

## Patrones de Contenido

### Pattern 1: Hero Section

```tsx
<section className="py-20 text-center">
  <h1 className="text-[54px] font-bold text-primary mb-4">
    Comunicación Segura
  </h1>
  <Paragraph variant="lead" color="primary" spacing="relaxed" className="mx-auto">
    Protege tu privacidad con la tecnología de encriptación más avanzada
  </Paragraph>
  <Button intent="primary" size="lg" className="mt-6">
    Comenzar Ahora
  </Button>
</section>
```

**Espaciado:**
- Título → Párrafo: 16px (mb-4)
- Párrafo → Botón: 24px (mt-6)
- Padding sección: 80px vertical (py-20)

---

### Pattern 2: Feature Section

```tsx
<section className="py-16">
  <h2 className="text-[38px] font-bold text-primary mb-3">
    Características
  </h2>
  <Paragraph variant="body" color="secondary" spacing="relaxed">
    Descubre todo lo que ofrecemos para proteger tu privacidad
  </Paragraph>
  
  <div className="grid grid-cols-3 gap-6 mt-8">
    {/* Cards */}
  </div>
</section>
```

**Espaciado:**
- Título → Párrafo: 12px (mb-3)
- Párrafo → Grid: 32px (mt-8)
- Entre cards: 24px (gap-6)

---

### Pattern 3: Content Section (Artículo)

```tsx
<article className="max-w-3xl mx-auto py-12">
  <h1 className="text-[44px] font-bold text-black mb-4">
    Título del Artículo
  </h1>
  
  <div className="space-y-4">
    <Paragraph variant="lead" color="black">
      Introducción del artículo con párrafo destacado
    </Paragraph>
    
    <Paragraph variant="body" color="black">
      Primer párrafo del contenido principal...
    </Paragraph>
    
    <Paragraph variant="body" color="black">
      Segundo párrafo del contenido...
    </Paragraph>
  </div>
  
  <Paragraph variant="caption" color="tertiary" className="mt-8">
    Publicado: Diciembre 2025
  </Paragraph>
</article>
```

**Espaciado:**
- Max width: 768px (max-w-3xl)
- Entre párrafos: 16px (space-y-4)
- Footer metadata: 32px separación (mt-8)

---

## Responsive Typography

### Mobile First Approach

```tsx
// Escalado responsivo
<p className="text-sm sm:text-base lg:text-lg leading-relaxed">
  Texto que crece con el viewport
</p>

// Alineación responsive
<p className="text-center sm:text-left">
  Centrado en móvil, izquierda en desktop
</p>

// Ancho máximo responsive
<p className="max-w-full sm:max-w-2xl lg:max-w-3xl">
  Ancho adaptativo
</p>
```

---

## Checklist de Implementación

### Por Párrafo
- [ ] Verificar tamaño de fuente apropiado
- [ ] Aplicar line height correcto
- [ ] Establecer max-width para legibilidad
- [ ] Usar color con contraste adecuado
- [ ] Espaciado consistente con elementos vecinos
- [ ] Responsive en todos los breakpoints

---

## Herramientas Útiles

### Clases Utility de Tailwind

```css
/* Ancho máximo */
.max-w-prose  /* 65ch - ideal para lectura */
.max-w-2xl    /* 672px */
.max-w-3xl    /* 768px */

/* Line height */
.leading-tight    /* 1.25 */
.leading-normal   /* 1.5 */
.leading-relaxed  /* 1.75 */

/* Espaciado */
.space-y-4   /* 16px entre hijos */
.space-y-6   /* 24px entre hijos */
.mb-4        /* 16px margen inferior */
```

---

## Próximos Pasos

1. ✅ Documentación completada
2. ⏳ Crear componente `Paragraph`
3. ⏳ Migrar párrafos existentes
4. ⏳ Crear componente `ContentSection`
5. ⏳ Testing de legibilidad
6. ⏳ Validación de accesibilidad

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0  
**Mantenedor:** Equipo de Desarrollo Encriptados
