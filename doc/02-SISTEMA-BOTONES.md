# Sistema de Botones - Encriptados Web

## 📋 Índice
- [Introducción](#introducción)
- [Anatomía de un Botón](#anatomía-de-un-botón)
- [Variantes Actuales](#variantes-actuales)
- [Guía de Uso](#guía-de-uso)
- [Problemas Detectados](#problemas-detectados)
- [Sistema Propuesto](#sistema-propuesto)

---

## Introducción

Documentación completa del sistema de botones de Encriptados Web. Este documento describe las variantes actuales, mejores prácticas y el sistema unificado propuesto.

---

## Anatomía de un Botón

### Componente Base
Ubicación: `src/shared/components/Button.tsx`

### Props Disponibles

```typescript
interface ButtonProps {
  intent?: 
    | "primary" 
    | "secondary" 
    | "solid" 
    | "ghost" 
    | "black" 
    | "dangerMetal" 
    | "profile" 
    | "elegant" 
    | "support" 
    | "cyan" 
    | "blueT";
  size?: "small" | "medium" | "large";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  customStyles?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
```

---

## Variantes Actuales (Basadas en Diseño Real)

### 1. Primary Button

**Uso:** Acciones principales, CTAs de conversión (Comprar, Registrarse)

```tsx
<Button intent="primary">
  Comprar eSIM
</Button>
```

**Estilos:**
- Background: `#0AAEE1` (azul cyan brillante)
- Text: `#FFFFFF` (white)
- Padding: `px-8 py-3`
- Border Radius: `rounded-full`
- Font Weight: `bold`
- Font Size: `text-base`

**Ejemplo visual:**
```
╭───────────────────╮
│   Comprar eSIM    │ ← Azul cyan brillante, texto blanco, muy redondeado
╰───────────────────╯
```

---

### 2. Secondary Button

**Uso:** Acciones secundarias importantes

```tsx
<Button intent="secondary">
  Ver Más
</Button>
```

**Estilos:**
- Background: `#35CDFB` (azul claro)
- Text: `#00516B` (azul oscuro)
- Padding: `px-8 py-3`
- Border Radius: `rounded-full`
- Font Weight: `bold`

**Ejemplo visual:**
```
╭───────────────────╮
│     Ver Más       │ ← Azul claro, texto oscuro
╰───────────────────╯
```

---

### 3. Outline Button

**Uso:** CTAs secundarios sobre fondos oscuros

```tsx
<Button intent="outline">
  Apps Encriptadas
</Button>
```

**Estilos:**
- Background: `transparent`
- Border: `2px solid white`
- Text: `#FFFFFF` (white)
- Hover: Fondo blanco, texto negro
- Padding: `px-8 py-3`
- Border Radius: `rounded-full`

**Ejemplo visual:**
```
╭───────────────────╮
│ Apps Encriptadas  │ ← Transparente con borde blanco
╰───────────────────╯
```

---

### 4. Outline Dark Button

**Uso:** CTAs sobre fondos claros

```tsx
<Button intent="outlineDark">
  Más información
</Button>
```

**Estilos:**
- Background: `transparent`
- Border: `2px solid black`
- Text: `#000000` (black)
- Hover: Fondo negro, texto blanco
- Padding: `px-6 py-3`
- Border Radius: `rounded-full`

---

### 5. Light Button

**Uso:** CTAs suaves, menos agresivos

```tsx
<Button intent="light">
  Ver más
</Button>
```

**Estilos:**
- Background: `#E3F8FF` (azul muy claro)
- Text: `#1C1B1F` (casi negro)
- Padding: `px-8 py-3`
- Border Radius: `rounded-full`

**Ejemplo visual:**
```
╭───────────────────╮
│     Ver más       │ ← Azul muy claro, texto oscuro
╰───────────────────╯
```

---

### 6. Dark Button

**Uso:** CTAs destacados sobre fondos claros

```tsx
<Button intent="dark">
  Comprar 🛍️
</Button>
```

**Estilos:**
- Background: `#000000` (black)
- Text: `#FFFFFF` (white)
- Padding: `px-6 py-3`
- Border Radius: `rounded-full`
- Soporta iconos

**Ejemplo visual:**
```
╭───────────────────╮
│   Comprar 🛍️      │ ← Negro sólido, texto blanco
╰───────────────────╯
```

---

### 7. Ghost Button

**Uso:** Acciones terciarias, menos énfasis

```tsx
<Button intent="ghost">
  Cancelar
</Button>
```

**Estilos:**
- Background: `transparent`
- Text: `#000000` (black)
- Hover: `bg-black/5`
- Padding: `px-4 py-2`

---

### 8. Link Button

**Uso:** Enlaces que parecen botones, acciones no prioritarias

```tsx
<Button intent="link">
  Más información
</Button>
```

**Estilos:**
- Background: `transparent`
- Text: `#000000` (black)
- Hover: `underline`
- Padding: `none`
- Font Weight: `normal`

**Ejemplo visual:**
```
Más información  ← Solo texto, sin fondo
```

---

## Variantes Alternativas

### Alternate 1 - Dark Teal

**Uso:** Variante para diferenciación visual

```tsx
<Button intent="alternate1">
  Secondary
</Button>
```

**Estilos:**
- Background: `#054D61` (azul petróleo oscuro)
- Text: `#FFFFFF`
- Border Radius: `rounded-full`

---

### Alternate 2 - White

**Uso:** Sobre fondos oscuros o de color

```tsx
<Button intent="alternate2">
  Secondary
</Button>
```

**Estilos:**
- Background: `#FFFFFF` (white)
- Text: `#000000` (black)
- Border: `2px solid #E5E5E5`
- Border Radius: `rounded-full`

---

### Alternate 3 - Teal

**Uso:** Acciones especiales, promociones

```tsx
<Button intent="alternate3">
  Secondary
</Button>
```

**Estilos:**
- Background: `#00D4AA` (verde turquesa)
- Text: `#FFFFFF` (white)
- Border Radius: `rounded-full`

---

### 3. Black Button

**Uso:** CTAs destacados, modal footers

```tsx
<Button intent="black" rounded="md">
  Pagar Ahora
</Button>
```

**Estilos:**
- Background: `#000000` (black)
- Text: `#FFFFFF` (white)
- Padding: `py-3` full width
- Font Weight: `bold`
- Text Size: `text-sm`

**Ejemplo visual:**
```
┌─────────────────────────────┐
│       Pagar Ahora           │ ← Black background, white text, full width
└─────────────────────────────┘
```

---

### 4. Ghost Button

**Uso:** Acciones terciarias, no destructivas

```tsx
<Button intent="ghost" rounded="md">
  Cancelar
</Button>
```

**Estilos:**
- Background: `transparent`
- Border: `1px solid #000000`
- Text: `#000000` (black)
- Padding: `px-4 py-2`
- Font Weight: `bold`

**Ejemplo visual:**
```
┌─────────────────┐
│    Cancelar     │ ← Transparent, black border and text
└─────────────────┘
```

---

### 5. Support Button

**Uso:** Botones de soporte, chat

```tsx
<Button intent="support" rounded="md">
  Chat Soporte
</Button>
```

**Estilos:**
- Background: `#EDF4F6`
- Text: `#00516B`
- Padding: `py-3` full width
- Font Weight: `bold`
- Text Size: `text-sm`

**Ejemplo visual:**
```
┌─────────────────────────────┐
│      Chat Soporte           │ ← Light blue background, dark blue text
└─────────────────────────────┘
```

---

### 6. BlueT Button

**Uso:** CTAs alternativos en secciones específicas

```tsx
<Button intent="blueT" rounded="md">
  Activar SIM
</Button>
```

**Estilos:**
- Background: `#29A9EA`
- Hover: `#1590cd`
- Text: `#FFFFFF` (white)
- Padding: `px-4 py-2`
- Font Weight: `bold`

---

### 7. Cyan Button

**Uso:** Botones secundarios con estilo moderno

```tsx
<Button intent="cyan" rounded="md">
  Explorar
</Button>
```

**Estilos:**
- Background: `transparent`
- Border: `1px solid #70DEFF`
- Text: `cyan-500`
- Font Weight: `light`

---

### 8. Elegant Button

**Uso:** Interfaces premium, selección de opciones

```tsx
<Button intent="elegant" rounded="md">
  Seleccionar
</Button>
```

**Estilos:**
- Background: `#F4F4F4`
- Text: `#000000` (black)
- Padding: `px-4 py-2`

---

### 9. Profile Button

**Uso:** Secciones de perfil, dashboard

```tsx
<Button intent="profile" rounded="md">
  Editar Perfil
</Button>
```

**Estilos:**
- Background: `#1D1D1D`
- Text: `#FFFFFF` (white)
- Font Weight: `medium`

---

### 10. Danger Metal Button

**Uso:** Acciones destructivas, alertas

```tsx
<Button intent="dangerMetal" rounded="md">
  Eliminar Cuenta
</Button>
```

**Estilos:**
- Background: `#2D0505`
- Text: `#FF6C6C`
- Font Weight: `light`

---

## Tamaños de Botón

### Small
```tsx
<Button size="small">Pequeño</Button>
```
- Text Size: `text-sm` (14px)
- Uso: Botones de acción secundaria, espacios reducidos

### Medium (Default)
```tsx
<Button size="medium">Mediano</Button>
```
- Text Size: `text-base` (16px)
- Uso: Botones estándar, uso general

### Large
```tsx
<Button size="large">Grande</Button>
```
- Text Size: `text-lg` (18px)
- Uso: CTAs principales, heros

---

## Bordes Redondeados

| Variante | Clase | Uso |
|----------|-------|-----|
| `none` | `rounded-none` | Botones en grids, diseños rectangulares |
| `sm` | `rounded-sm` | Bordes sutiles |
| `md` | `rounded-md` | Estándar (8px) |
| `lg` | `rounded-lg` | Bordes suaves (12px) |
| `full` | `rounded-full` | Botones pill, CTAs destacados |

---

## Botones con Iconos

### Icono a la Izquierda
```tsx
<Button 
  intent="primary" 
  icon={<ShoppingCart />} 
  iconPosition="left"
>
  Agregar al Carrito
</Button>
```

### Icono a la Derecha
```tsx
<Button 
  intent="secondary" 
  icon={<ArrowRight />} 
  iconPosition="right"
>
  Continuar
</Button>
```

---

## Estados del Botón

### Normal
```tsx
<Button intent="primary">Normal</Button>
```

### Hover
Definido automáticamente según la variante (ej: `blueT` tiene hover `#1590cd`)

### Disabled
```tsx
<Button intent="primary" disabled>
  Deshabilitado
</Button>
```
- Opacity reducida automáticamente
- Cursor: `not-allowed`
- No interactivo

---

## Problemas Detectados

### ❌ Inconsistencias Actuales

1. **Botones inline dispersos:**
   - Múltiples implementaciones sin usar el componente `Button`
   - Ejemplo: `<button className="bg-blue-500 hover:bg-blue-600...">`

2. **Estilos hardcodeados:**
   - Clases Tailwind inline en lugar de variantes del componente
   - Difícil mantenimiento y actualización global

3. **Nomenclatura confusa:**
   - `blueT`, `dangerMetal` no son intuitivos
   - Falta documentación clara de cuándo usar cada variante

4. **Variantes sin uso claro:**
   - `solid` tiene el mismo propósito que `primary`
   - Redundancia en las opciones

5. **Responsive inconsistente:**
   - Algunos botones usan `w-full sm:w-auto`, otros no
   - Sin sistema de breakpoints unificado

---

## Sistema Propuesto

### Variantes Simplificadas

```typescript
type ButtonIntent = 
  | 'primary'      // CTA principal (#0AAEE1)
  | 'secondary'    // CTA secundario (#35CDFB)
  | 'outline'      // Ghost/Outline (border)
  | 'ghost'        // Sin fondo, solo texto
  | 'danger'       // Destructivo (rojo)
  | 'dark'         // Fondo oscuro (#000)
  | 'light'        // Fondo claro (#F4F4F4)
```

### Matriz de Uso

| Variante | Contexto | Ejemplo |
|----------|----------|---------|
| `primary` | Acción principal, conversión | "Comprar Ahora", "Registrarse" |
| `secondary` | Acción secundaria importante | "Ver Detalles", "Más Información" |
| `outline` | Acción terciaria, no prioritaria | "Cancelar", "Volver" |
| `ghost` | Navegación, acciones sutiles | "Leer más", "Cerrar" |
| `danger` | Acciones destructivas | "Eliminar", "Cancelar Suscripción" |
| `dark` | CTAs en fondos claros | "Pagar", "Confirmar" |
| `light` | CTAs en fondos oscuros | "Explorar", "Contactar" |

---

## Guía de Implementación

### Paso 1: Actualizar Componente Button

```tsx
// src/shared/components/Button.tsx
const buttonStyles = cva("px-4 py-2 font-bold flex items-center transition-all", {
  variants: {
    intent: {
      primary: "bg-[#0AAEE1] text-white hover:bg-[#0899CC]",
      secondary: "bg-[#35CDFB] text-[#00516B] hover:bg-[#2ABEE8]",
      outline: "bg-transparent border-2 border-[#0AAEE1] text-[#0AAEE1] hover:bg-[#0AAEE1] hover:text-white",
      ghost: "bg-transparent text-[#0AAEE1] hover:bg-[#0AAEE1]/10",
      danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
      dark: "bg-[#000000] text-white hover:bg-[#1A1A1A]",
      light: "bg-[#F7F7F7] text-[#000000] hover:bg-[#E5E5E5]",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
    fullWidth: {
      true: "w-full justify-center",
      false: "w-auto",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
    fullWidth: false,
  },
});
```

### Paso 2: Migrar Botones Existentes

**Antes:**
```tsx
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
  Comprar
</button>
```

**Después:**
```tsx
<Button intent="primary" rounded="md">
  Comprar
</Button>
```

---

## Mejores Prácticas UX/UI

### 1. Jerarquía Visual
- **Máximo 1 botón primary** por vista
- **2-3 botones secondary** como máximo
- Resto usar `outline` o `ghost`

### 2. Espaciado
- Entre botones: `gap-2` (8px) o `gap-4` (16px)
- Padding interno consistente con tamaños

### 3. Accesibilidad
- Siempre incluir `aria-label` en botones solo con icono
- Contraste mínimo 4.5:1 para texto
- Estados focus visibles

### 4. Responsive
```tsx
<Button 
  intent="primary" 
  className="w-full sm:w-auto"
>
  CTA Responsivo
</Button>
```

---

## Checklist de Migración

### Por Página
- [ ] Identificar todos los botones `<button>` inline
- [ ] Reemplazar con componente `<Button>`
- [ ] Verificar variante correcta según jerarquía
- [ ] Aplicar tamaños y bordes consistentes
- [ ] Testing responsive
- [ ] Validar accesibilidad

---

## Telegram Button

### Componente Especial
Ubicación: `src/shared/components/TelegramButton.tsx`

```tsx
<TelegramButton className="w-full" />
```

**Características:**
- Botón preconstruido para soporte Telegram
- Icono incluido
- Estilos consistentes con la marca
- Abre canal de Telegram en nueva pestaña

---

## Próximos Pasos

1. ✅ Documentación completada
2. ⏳ Refactorizar componente Button con variantes simplificadas
3. ⏳ Crear Storybook para todas las variantes
4. ⏳ Migración página por página
5. ⏳ Testing de accesibilidad
6. ⏳ Documentación de patrones de uso

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0  
**Mantenedor:** Equipo de Desarrollo Encriptados
