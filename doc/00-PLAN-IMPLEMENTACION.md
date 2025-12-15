# Plan de Implementación - Sistema de Diseño Encriptados

## 📋 Resumen Ejecutivo

Este documento presenta un plan detallado paso a paso para implementar el sistema de diseño unificado en toda la web de Encriptados, solucionando la deuda técnica relacionada con tipografía, botones y espaciado.

---

## 🎯 Objetivos

1. **Centralizar** la tipografía con fuente Inter y escala consistente
2. **Unificar** el sistema de botones con variantes claras
3. **Estandarizar** el espaciado y párrafos siguiendo mejores prácticas UX/UI
4. **Documentar** todos los componentes y patrones
5. **Migrar** todas las páginas al nuevo sistema

---

## 📊 Estado Actual

### Páginas Identificadas (27 secciones principales)

```
✅ = Migrada | 🔄 = En progreso | ⏳ = Pendiente | ❌ = Problemas críticos
```

| # | Página | Ruta | Estado | Prioridad |
|---|--------|------|--------|-----------|
| 1 | Home | `/` | ✅ | 🔴 Alta |
| 2 | About Us | `/about-us` | ⏳ | 🟡 Media |
| 3 | Ambassadors | `/ambassadors` | ⏳ | 🟢 Baja |
| 4 | Apps | `/apps` | ⏳ | 🟡 Media |
| 5 | Become Partner | `/become-an-encrypted-partner` | ⏳ | 🟢 Baja |
| 6 | Blog | `/blog` | ⏳ | 🟡 Media |
| 7 | Dashboard | `/dashboard` | ⏳ | 🔴 Alta |
| 8 | Deliveries | `/deliveries` | ⏳ | 🟡 Media |
| 9 | Distributors | `/distributors` | ⏳ | 🟢 Baja |
| 10 | Encrypted Phones Dist. | `/encrypted-phones-distributors` | ⏳ | 🟢 Baja |
| 11 | Encrypted SIM | `/encrypted-sim` | ⏳ | 🔴 Alta |
| 12 | Encrypted Test | `/encrypted-test` | ⏳ | 🟢 Baja |
| 13 | Fast Delivery | `/fast-delivery` | ⏳ | 🟡 Media |
| 14 | Identity Verification | `/identity-verification` | ⏳ | 🟡 Media |
| 15 | IRA SIM | `/ira-sim` | ⏳ | 🟡 Media |
| 16 | Login | `/login` | ⏳ | 🔴 Alta |
| 17 | News | `/news` | ⏳ | 🟢 Baja |
| 18 | Offers | `/offers` | ⏳ | 🔴 Alta |
| 19 | Our Products | `/our-products` | ⏳ | 🔴 Alta |
| 20 | Router | `/router` | ⏳ | 🟡 Media |
| 21 | Security Test | `/security-test` | ⏳ | 🟢 Baja |
| 22 | Test | `/test` | ⏳ | 🟢 Baja |
| 23 | TIM SIM | `/tim-sim` | ⏳ | 🔴 Alta |
| 24 | Where to Find Encrypted | `/where-to-find-encrypted` | ⏳ | 🟡 Media |
| 25 | Where to Find Us | `/where-to-find-us` | ⏳ | 🟡 Media |
| 26 | Header (Global) | `shared/components` | ⏳ | 🔴 Alta |
| 27 | Footer (Global) | `shared/FooterEncrypted` | ⏳ | 🔴 Alta |

---

## 🔧 Fase 0: Preparación (1-2 días)

### 0.1 Configuración de Tailwind

**Archivo:** `tailwind.config.ts`

```typescript
// Agregar configuración de tipografía
export default {
  theme: {
    extend: {
      fontSize: {
        'promo': ['54px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['44px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['38px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['30px', { lineHeight: '1.4', fontWeight: '500' }],
        'h4': ['24px', { lineHeight: '1.5', fontWeight: '500' }],
        'h5': ['22px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#0AAEE1',
        secondary: '#35CDFB',
        'text-primary': '#F7F7F7',
        'text-secondary': '#CCCCCC',
        'text-black': '#000000',
        'bg-secondary': '#161616',
        'bg-alternate': '#222222',
        'bg-alternate-2': '#032029',
        'stroke-border': '#3E3E3E',
      },
    },
  },
};
```

**Checklist:**
- [ ] Actualizar `tailwind.config.ts`
- [ ] Verificar compilación
- [ ] Testing en dev

---

### 0.2 Importar Fuente Inter

**Archivo:** `src/app/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;700&display=swap');

@layer base {
  body {
    @apply font-sans;
  }
}
```

**Checklist:**
- [ ] Agregar import de Inter
- [ ] Remover imports innecesarios de Roboto
- [ ] Verificar carga de fuentes

---

### 0.3 Crear Componentes Base

#### Typography Component

**Archivo:** `src/shared/components/Typography.tsx`

```tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('', {
  variants: {
    variant: {
      'promo': 'text-promo',
      'h1': 'text-h1',
      'h2': 'text-h2',
      'h3': 'text-h3',
      'h4': 'text-h4',
      'h5': 'text-h5',
      'body-lg': 'text-lg leading-relaxed',
      'body': 'text-base leading-relaxed',
    },
    color: {
      'primary': 'text-primary',
      'secondary': 'text-secondary',
      'text-primary': 'text-text-primary',
      'text-secondary': 'text-text-secondary',
      'black': 'text-text-black',
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

**Checklist:**
- [ ] Crear componente Typography
- [ ] Testing de variantes
- [ ] Documentar en Storybook (opcional)

---

#### Paragraph Component

**Archivo:** `src/shared/components/Paragraph.tsx`

```tsx
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
      'primary': 'text-text-primary',
      'secondary': 'text-text-secondary',
      'tertiary': 'text-[#787878]',
      'black': 'text-text-black',
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

**Checklist:**
- [ ] Crear componente Paragraph
- [ ] Testing de variantes
- [ ] Validar max-width y legibilidad

---

#### Button Component (Actualizado)

**Archivo:** `src/shared/components/Button.tsx`

```tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "px-4 py-2 font-bold flex items-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary: "bg-primary text-white hover:bg-[#0899CC]",
        secondary: "bg-secondary text-[#00516B] hover:bg-[#2ABEE8]",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "bg-transparent text-primary hover:bg-primary/10",
        danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
        dark: "bg-black text-white hover:bg-[#1A1A1A]",
        light: "bg-text-primary text-black hover:bg-[#E5E5E5]",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full justify-center",
        false: "w-auto",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      rounded: "md",
      fullWidth: false,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  rounded,
  fullWidth,
  children,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`${buttonStyles({ intent, size, rounded, fullWidth })} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
```

**Checklist:**
- [ ] Actualizar componente Button
- [ ] Remover variantes obsoletas
- [ ] Testing de estados (hover, disabled)

---

## 🚀 Fase 1: Componentes Globales (2-3 días)

### Prioridad: 🔴 CRÍTICA

### 1.1 Header

**Archivo:** `src/shared/components/EncryptedHeader.tsx`

**Tareas:**
1. Reemplazar clases inline por componente Typography
2. Unificar botones con componente Button
3. Espaciado consistente
4. Responsive verificado

**Elementos a migrar:**
- Navegación principal
- Botones de login/registro
- Language selector
- Mega menu

**Checklist:**
- [ ] Auditar clases actuales
- [ ] Migrar a componentes
- [ ] Testing responsive
- [ ] Validar accesibilidad

---

### 1.2 Footer

**Archivo:** `src/shared/FooterEncrypted/FooterEncrypted.tsx`

**Tareas:**
1. Estandarizar tipografía de links
2. Espaciado consistente entre secciones
3. Responsive optimizado

**Checklist:**
- [ ] Migrar texto a componentes
- [ ] Unificar colores
- [ ] Testing responsive
- [ ] Validar links

---

## 🎯 Fase 2: Páginas de Alta Prioridad (1 semana)

### 2.1 Home Page

**Archivo:** `src/app/[locale]/page.tsx`

**Secciones:**
1. Hero section
2. Features/Benefits
3. Products showcase
4. CTA sections

**Proceso:**
```bash
# 1. Crear branch
git checkout -b refactor/home-page

# 2. Auditar componentes
# 3. Migrar sección por sección
# 4. Testing
# 5. PR y revisión
```

**Checklist:**
- [ ] Hero: Título promo (54px), párrafo lead
- [ ] Features: Títulos h2 (38px), párrafos body
- [ ] Products: Cards con tipografía consistente
- [ ] CTAs: Botones primary/secondary
- [ ] Espaciado: py-16 entre secciones
- [ ] Responsive: Móvil, tablet, desktop

**Estimado:** 1-2 días

---

### 2.2 Our Products

**Archivo:** `src/app/[locale]/our-products/page.tsx`

**Componentes específicos:**
- `BannerActivate.tsx`
- Product cards
- Feature lists

**Checklist:**
- [ ] Banner: Título h1, descripción lead
- [ ] Cards: Títulos h4, descripciones body
- [ ] Botones: Primary para compra
- [ ] Espaciado: Consistente con guía

**Estimado:** 1 día

---

### 2.3 Encrypted SIM

**Archivo:** `src/app/[locale]/encrypted-sim/page.tsx`

**Checklist:**
- [ ] Hero SIM: Tipografía destacada
- [ ] Pricing tables: Números legibles
- [ ] Features: Icons + texto consistente
- [ ] CTAs: Botones destacados

**Estimado:** 1 día

---

### 2.4 TIM SIM

**Archivo:** `src/app/[locale]/tim-sim/page.tsx`

**Componentes:**
- `SimSelection.tsx`
- `WhereUseSimSection.tsx`

**Checklist:**
- [ ] Formularios: Labels consistentes
- [ ] Selector de región: Tipografía clara
- [ ] Botones: Primary para acciones principales
- [ ] Responsive: Testing completo

**Estimado:** 1 día

---

### 2.5 Dashboard

**Archivo:** `src/app/[locale]/dashboard/page.tsx`

**Áreas críticas:**
- User info
- Recent orders
- Account settings

**Checklist:**
- [ ] Títulos de sección: h2
- [ ] Datos de usuario: Typography component
- [ ] Botones de acción: Variantes claras
- [ ] Tables: Legibilidad optimizada

**Estimado:** 1-2 días

---

### 2.6 Login

**Archivo:** `src/app/[locale]/login/page.tsx`

**Checklist:**
- [ ] Formulario: Labels h5, inputs consistentes
- [ ] Botón submit: Primary, full width
- [ ] Links: Typography caption
- [ ] Espaciado: Relaxed para usabilidad

**Estimado:** 0.5 días

---

### 2.7 Offers

**Archivo:** `src/app/[locale]/offers/page.tsx`

**Checklist:**
- [ ] Títulos de ofertas: h2
- [ ] Precios: Tipografía destacada
- [ ] Descripciones: Paragraph body
- [ ] CTAs: Botones primary

**Estimado:** 1 día

---

## 📄 Fase 3: Páginas de Media Prioridad (1 semana)

### Páginas a migrar:
1. **About Us** - `/about-us`
2. **Apps** - `/apps`
3. **Blog** - `/blog`
4. **Deliveries** - `/deliveries`
5. **Fast Delivery** - `/fast-delivery`
6. **Identity Verification** - `/identity-verification`
7. **IRA SIM** - `/ira-sim`
8. **Router** - `/router`
9. **Where to Find Encrypted** - `/where-to-find-encrypted`
10. **Where to Find Us** - `/where-to-find-us`

**Proceso por página:**
1. Crear branch específica
2. Auditar elementos
3. Migrar a componentes
4. Testing
5. PR

**Estimado:** 0.5-1 día por página

---

## 📦 Fase 4: Páginas de Baja Prioridad (3-4 días)

### Páginas finales:
1. Ambassadors
2. Become Partner
3. Distributors
4. Encrypted Phones Distributors
5. Encrypted Test
6. News
7. Security Test
8. Test

**Estas páginas pueden seguir el patrón establecido**

**Estimado:** 0.25-0.5 días por página

---

## 🧪 Fase 5: Testing y Validación (2-3 días)

### 5.1 Testing Visual

**Herramientas:**
- Chromatic (visual regression)
- Manual testing en dispositivos reales

**Checklist:**
- [ ] Chrome, Firefox, Safari, Edge
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive breakpoints

---

### 5.2 Testing de Accesibilidad

**Herramientas:**
- axe DevTools
- WAVE
- Lighthouse

**Criterios:**
- [ ] Contraste mínimo 4.5:1
- [ ] Navegación por teclado
- [ ] Screen reader friendly
- [ ] Focus indicators visibles

---

### 5.3 Performance

**Métricas:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

**Checklist:**
- [ ] Fuentes optimizadas (font-display: swap)
- [ ] Tree-shaking de componentes
- [ ] Bundle size verificado

---

## 📊 Fase 6: Documentación Final (1-2 días)

### 6.1 Guía de Estilo Actualizada

**Archivo:** `doc/00-GUIA-ESTILO.md`

**Contenido:**
- Sistema de diseño completo
- Ejemplos de código
- Do's and Don'ts
- Capturas de pantalla

---

### 6.2 Storybook (Opcional)

**Setup:**
```bash
npx storybook@latest init
```

**Stories a crear:**
- Typography variants
- Button variants
- Paragraph variants
- Common patterns

---

## 📈 Métricas de Éxito

### KPIs Técnicos

| Métrica | Antes | Meta | Actual |
|---------|-------|------|--------|
| **Variantes de botones inline** | ~50+ | 0 | ⏳ |
| **Clases de tipografía únicas** | ~100+ | <20 | ⏳ |
| **Tiempo de carga (LCP)** | 3.5s | <2.5s | ⏳ |
| **Score de accesibilidad** | 85 | >95 | ⏳ |
| **Páginas migradas** | 0/27 | 27/27 | 0/27 |

---

### KPIs de Negocio

| Métrica | Meta |
|---------|------|
| **Reducción de tiempo de desarrollo** | 30% |
| **Mejora en consistencia visual** | 100% |
| **Reducción de bugs de UI** | 50% |
| **Satisfacción del equipo** | +20% |

---

## 🔄 Workflow por Página

### Template de Migración

```markdown
## [Nombre de Página]

### Análisis
- [ ] Elementos de texto identificados
- [ ] Botones catalogados
- [ ] Espaciado auditado

### Implementación
- [ ] Títulos migrados a Typography
- [ ] Párrafos migrados a Paragraph
- [ ] Botones migrados a Button
- [ ] Espaciado estandarizado

### Testing
- [ ] Visual en 3 breakpoints
- [ ] Funcionalidad verificada
- [ ] Accesibilidad validada
- [ ] Performance optimizado

### Revisión
- [ ] PR creado
- [ ] Code review aprobado
- [ ] Merge a develop
```

---

## 🛠️ Herramientas y Scripts

### Script de Auditoría

```bash
# src/scripts/audit-typography.sh
#!/bin/bash

echo "Auditando clases de tipografía..."
grep -r "className.*text-" src/app --exclude-dir=node_modules | wc -l

echo "Auditando botones inline..."
grep -r "<button" src/app --exclude-dir=node_modules | wc -l

echo "Auditando font-weight..."
grep -r "font-" src/app --exclude-dir=node_modules | wc -l
```

---

### Script de Migración Asistida

```javascript
// src/scripts/migrate-button.js
// Script para identificar botones que necesitan migración
const fs = require('fs');
const path = require('path');

function findButtons(dir) {
  // Buscar patrones de <button className="...">
  // Sugerir reemplazo con <Button intent="...">
}

// Ejecutar
findButtons('./src/app');
```

---

## 📅 Timeline Estimado

### Resumen

| Fase | Duración | Dependencias |
|------|----------|--------------|
| **Fase 0: Preparación** | 1-2 días | Ninguna |
| **Fase 1: Globales** | 2-3 días | Fase 0 |
| **Fase 2: Alta Prioridad** | 1 semana | Fase 1 |
| **Fase 3: Media Prioridad** | 1 semana | Fase 2 |
| **Fase 4: Baja Prioridad** | 3-4 días | Fase 3 |
| **Fase 5: Testing** | 2-3 días | Fase 4 |
| **Fase 6: Documentación** | 1-2 días | Fase 5 |

**Total: 3-4 semanas (15-20 días hábiles)**

---

## 👥 Roles y Responsabilidades

### Equipo Sugerido

| Rol | Responsabilidad | Tiempo |
|-----|-----------------|--------|
| **Lead Developer** | Componentes base, revisión técnica | 100% |
| **Frontend Developer 1** | Páginas alta prioridad | 100% |
| **Frontend Developer 2** | Páginas media/baja prioridad | 100% |
| **QA Engineer** | Testing y validación | 50% |
| **Designer** | Validación visual, feedback | 25% |

---

## 🚨 Riesgos y Mitigación

### Riesgos Identificados

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| **Regresiones visuales** | Alto | Media | Testing exhaustivo, screenshots |
| **Performance degradado** | Medio | Baja | Monitoring continuo, bundle analysis |
| **Resistencia al cambio** | Bajo | Media | Documentación clara, training |
| **Scope creep** | Alto | Alta | Scope bien definido, priorización |

---

## ✅ Checklist General de Proyecto

### Setup Inicial
- [ ] Tailwind config actualizado
- [ ] Fuente Inter importada
- [ ] Componentes base creados
- [ ] Branch principal creada
- [ ] Documentación base completada

### Componentes Globales
- [ ] Header migrado
- [ ] Footer migrado
- [ ] Testing de componentes globales

### Páginas Alta Prioridad
- [x] Home
- [x] Our Products (incluye componentes Hero, Banners, productos)
- [ ] Encrypted SIM
- [ ] TIM SIM
- [ ] Dashboard
- [ ] Login
- [ ] Offers

### Páginas Media Prioridad
- [ ] About Us
- [ ] Apps
- [ ] Blog
- [ ] Deliveries
- [ ] Fast Delivery
- [ ] Identity Verification
- [ ] IRA SIM
- [ ] Router
- [ ] Where to Find Encrypted
- [ ] Where to Find Us

### Páginas Baja Prioridad
- [ ] Ambassadors
- [ ] Become Partner
- [ ] Distributors
- [ ] Encrypted Phones Distributors
- [ ] Encrypted Test
- [ ] News
- [ ] Security Test
- [ ] Test

### Testing y QA
- [ ] Testing visual completo
- [ ] Testing de accesibilidad
- [ ] Performance optimizado
- [ ] Cross-browser testing

### Finalización
- [ ] Documentación actualizada
- [ ] Storybook (opcional)
- [ ] Training del equipo
- [ ] Deploy a producción

---

## 📚 Recursos Adicionales

### Documentos Relacionados
- [01-SISTEMA-TIPOGRAFIA.md](./01-SISTEMA-TIPOGRAFIA.md)
- [02-SISTEMA-BOTONES.md](./02-SISTEMA-BOTONES.md)
- [03-SISTEMA-ESPACIADO-PARRAFOS.md](./03-SISTEMA-ESPACIADO-PARRAFOS.md)

### Referencias Externas
- [Tailwind CSS Typography](https://tailwindcss.com/docs/font-size)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Spacing](https://material.io/design/layout/spacing-methods.html)

---

## 🎓 Training y Onboarding

### Sesión 1: Componentes Base (1h)
- Typography component
- Paragraph component
- Button component actualizado
- Q&A

### Sesión 2: Patrones y Prácticas (1h)
- Espaciado semántico
- Responsive typography
- Accesibilidad básica
- Q&A

### Sesión 3: Workflow de Migración (30min)
- Template de migración
- Branch strategy
- PR guidelines
- Q&A

---

## 📞 Contacto y Soporte

### Para Dudas Técnicas
- Lead Developer: [Especificar contacto]
- Canal Slack: #diseño-sistema
- Daily standup: 9:00 AM

### Para Validación de Diseño
- Designer: [Especificar contacto]
- Review meetings: Lunes y Jueves 3:00 PM

---

## 🎉 Siguiente Nivel

Una vez completada la implementación:

### Mejoras Futuras
1. **Design Tokens** - Variables CSS para temas
2. **Dark Mode** - Implementar tema oscuro
3. **Animaciones** - Sistema de transiciones consistente
4. **Component Library** - NPM package interno
5. **Design System Site** - Documentación pública

---

**Versión:** 1.0  
**Fecha de Creación:** Diciembre 2025  
**Última Actualización:** Diciembre 2025  
**Estado:** 📝 Borrador - Pendiente de Aprobación
