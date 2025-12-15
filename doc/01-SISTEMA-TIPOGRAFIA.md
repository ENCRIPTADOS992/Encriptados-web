# Sistema de Tipografía - Encriptados Web

## 📋 Índice
- [Familia Tipográfica](#familia-tipográfica)
- [Escala Tipográfica Global](#escala-tipográfica-global)
- [Pesos Tipográficos](#pesos-tipográficos)
- [Guía de Uso](#guía-de-uso)
- [Clases Utility de Tailwind](#clases-utility-de-tailwind)
- [Componentes React Recomendados](#componentes-react-recomendados)

---

## Familia Tipográfica

**Fuente Principal:** Inter  
**Fuentes Secundarias:** Roboto (actualmente en uso, migración pendiente)

### Configuración en Tailwind

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
}
```

### Importación de Fuentes

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;700&display=swap');
```

---

## Escala Tipográfica Global

### Títulos y Encabezados

| Nombre | Tamaño | Line Height | Peso | Uso |
|--------|--------|-------------|------|-----|
| **Heading Title Promo** | 54px | 1.2 | 700 (Bold) | Títulos promocionales principales, heros |
| **Título Principal 1** | 44px | 1.3 | 700 (Bold) | Títulos de sección principales |
| **Título Principal 2** | 38px | 1.3 | 700 (Bold) | Títulos de subsecciones importantes |
| **Subtítulo Principal 1** | 30px | 1.4 | 500 (Medium) | Subtítulos destacados |
| **Subtítulo Principal 2** | 24px | 1.5 | 500 (Medium) | Subtítulos secundarios |
| **Subtítulo Principal 3** | 22px | 1.5 | 500 (Medium) | Subtítulos terciarios |

### Textos de Cuerpo

| Nombre | Tamaño | Line Height | Peso | Uso |
|--------|--------|-------------|------|-----|
| **Texto de Relleno 1** | 18px | 1.6 | 400 (Regular) | Párrafos destacados, leads |
| **Texto de Relleno 2** | 16px | 1.6 | 400 (Regular) | Texto de cuerpo estándar |

---

## Pesos Tipográficos

### Disponibles en Inter

| Peso | Número | Uso |
|------|--------|-----|
| **Thin** | 100 | Textos decorativos, muy limitado |
| **Regular** | 400 | Texto de cuerpo, párrafos |
| **Medium** | 500 | Subtítulos, énfasis moderado |
| **Bold** | 700 | Títulos, CTAs, énfasis fuerte |

### Guía de Aplicación

- **100 (Thin):** Solo para elementos decorativos, evitar en texto de lectura
- **400 (Regular):** Texto de cuerpo, descripciones, contenido general
- **500 (Medium):** Subtítulos, labels, navegación
- **700 (Bold):** Títulos principales, botones, llamadas a la acción

---

## Clases Utility de Tailwind

### Tamaños de Fuente (Actualizados)

```css
.text-promo     /* 54px - Heading Title Promo */
.text-h1        /* 44px - Título Principal 1 */
.text-h2        /* 38px - Título Principal 2 */
.text-h3        /* 30px - Subtítulo Principal 1 */
.text-h4        /* 24px - Subtítulo Principal 2 */
.text-h5        /* 22px - Subtítulo Principal 3 */
.text-lg        /* 18px - Texto de Relleno 1 */
.text-base      /* 16px - Texto de Relleno 2 */
```

### Pesos de Fuente

```css
.font-thin      /* 100 */
.font-normal    /* 400 */
.font-medium    /* 500 */
.font-bold      /* 700 */
```

### Combinaciones Recomendadas

```tsx
// Título Hero
<h1 className="text-promo font-bold text-primary">
  Encriptados
</h1>

// Título de Sección
<h2 className="text-h1 font-bold text-primary-text">
  Nuestros Productos
</h2>

// Subtítulo
<h3 className="text-h3 font-medium text-secondary-text">
  Seguridad Garantizada
</h3>

// Párrafo Principal
<p className="text-lg font-normal text-primary-text">
  Descripción del servicio...
</p>

// Párrafo Estándar
<p className="text-base font-normal text-secondary-text">
  Texto de contenido general...
</p>
```

---

## Componentes React Recomendados

### Typography Component

```tsx
// src/shared/components/Typography.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('', {
  variants: {
    variant: {
      'promo': 'text-[54px] leading-[1.2] font-bold',
      'h1': 'text-[44px] leading-[1.3] font-bold',
      'h2': 'text-[38px] leading-[1.3] font-bold',
      'h3': 'text-[30px] leading-[1.4] font-medium',
      'h4': 'text-[24px] leading-[1.5] font-medium',
      'h5': 'text-[22px] leading-[1.5] font-medium',
      'body-lg': 'text-[18px] leading-[1.6] font-normal',
      'body': 'text-[16px] leading-[1.6] font-normal',
    },
    color: {
      'primary': 'text-[#0AAEE1]',
      'secondary': 'text-[#35CDFB]',
      'text-primary': 'text-[#F7F7F7]',
      'text-secondary': 'text-[#CCCCCC]',
      'text-black': 'text-[#000000]',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'text-primary',
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  children,
  as: Component = 'p',
  className = '',
}) => {
  return (
    <Component className={`${typographyVariants({ variant, color })} ${className}`}>
      {children}
    </Component>
  );
};
```

### Ejemplo de Uso

```tsx
import { Typography } from '@/shared/components/Typography';

// Título Hero
<Typography variant="promo" color="primary" as="h1">
  Bienvenido a Encriptados
</Typography>

// Subtítulo
<Typography variant="h3" color="text-primary" as="h3">
  Comunicación Segura
</Typography>

// Párrafo
<Typography variant="body" color="text-secondary" as="p">
  Protege tus comunicaciones con nuestra tecnología de encriptación.
</Typography>
```

---

## Responsividad

### Breakpoints

```typescript
mobile: { max: "800px" }
tablet: { min: "801px", max: "1369px" }
desktop: { min: "1370px" }
```

### Escala Responsiva Recomendada

```tsx
// Títulos adaptativos
<h1 className="text-[32px] sm:text-[44px] lg:text-[54px] font-bold">
  Título Responsivo
</h1>

// Subtítulos adaptativos
<h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold">
  Subtítulo Responsivo
</h2>

// Texto de cuerpo adaptativo
<p className="text-[14px] sm:text-[16px] lg:text-[18px] font-normal">
  Contenido responsivo
</p>
```

---

## Problemas Actuales Detectados

### ❌ Inconsistencias Encontradas

1. **Tamaños inline hardcodeados:**
   - `text-xl`, `text-2xl`, `text-3xl` usados sin sistema consistente
   - Valores en píxeles: `text-[14px]`, `text-[12px]` dispersos

2. **Pesos inconsistentes:**
   - Uso de `font-semibold` (600) no definido en la guía
   - Mezcla de `font-bold`, `font-semibold`, `font-medium` sin criterio

3. **Familias tipográficas:**
   - Roboto importado pero Inter debe ser la principal
   - Sin implementación consistente

### ✅ Recomendaciones

1. Crear componente `Typography` centralizado
2. Reemplazar todos los tamaños inline por clases del sistema
3. Migrar de Roboto a Inter completamente
4. Documentar variantes responsive
5. Crear guía de migración página por página

---

## Paleta de Colores Tipográficos

```css
/* Colores Principales */
--color-primary: #0AAEE1;
--color-secondary: #35CDFB;

/* Colores de Texto */
--text-primary: #F7F7F7;
--text-secondary: #CCCCCC;
--text-black: #000000;

/* Colores de Fondo */
--bg-secondary: #161616;
--bg-alternate: #222222;
--bg-alternate-2: #032029;

/* Bordes */
--stroke-border: #3E3E3E;
```

---

## Próximos Pasos

1. ✅ Documentación completada
2. ⏳ Crear componente Typography
3. ⏳ Actualizar Tailwind config con escala personalizada
4. ⏳ Migrar páginas principales
5. ⏳ Auditoría completa de todas las páginas
6. ⏳ Testing y validación

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0  
**Mantenedor:** Equipo de Desarrollo Encriptados
