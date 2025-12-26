# Guía de Iconos - Material Design

## 📦 Librería Instalada

```bash
pnpm add react-icons
```

**react-icons** incluye todos los iconos de Material Design de Google junto con otras librerías populares.

---

## 🎨 Uso en Botones

### Importar Iconos

```tsx
// Material Design Icons (prefijo: Md)
import { 
  MdShoppingCart, 
  MdArrowForward, 
  MdCheck, 
  MdDownload,
  MdLock,
  MdPhone,
  MdEmail,
  MdSearch,
  MdMenu,
  MdAdd
} from 'react-icons/md';
```

---

## 💡 Ejemplos de Uso

### Botón con Icono a la Izquierda

```tsx
<Button intent="primary" icon={<MdShoppingCart />} iconPosition="left">
  Comprar
</Button>
```

### Botón con Icono a la Derecha

```tsx
<Button intent="secondary" icon={<MdArrowForward />} iconPosition="right">
  Continuar
</Button>
```

### Botón Solo Icono

```tsx
<Button 
  intent="primary" 
  icon={<MdAdd />} 
  className="!px-2"
  aria-label="Agregar"
/>
```

**Nota:** Siempre incluir `aria-label` en botones solo con icono para accesibilidad.

---

## 🎯 Iconos Más Comunes

### Comercio y Compras

```tsx
import { 
  MdShoppingCart,      // Carrito de compras
  MdShoppingBag,       // Bolsa de compras
  MdLocalOffer,        // Etiqueta de oferta
  MdPayment,           // Pago
  MdCreditCard,        // Tarjeta de crédito
  MdReceipt,           // Recibo
} from 'react-icons/md';
```

### Navegación

```tsx
import { 
  MdArrowForward,      // Flecha derecha
  MdArrowBack,         // Flecha izquierda
  MdChevronRight,      // Chevron derecha
  MdChevronLeft,       // Chevron izquierda
  MdClose,             // Cerrar X
  MdMenu,              // Menú hamburguesa
} from 'react-icons/md';
```

### Acciones

```tsx
import { 
  MdAdd,               // Más/Agregar
  MdRemove,            // Menos/Quitar
  MdEdit,              // Editar
  MdDelete,            // Eliminar
  MdSave,              // Guardar
  MdCheck,             // Check/Confirmar
  MdRefresh,           // Refrescar
  MdDownload,          // Descargar
  MdUpload,            // Subir
} from 'react-icons/md';
```

### Comunicación

```tsx
import { 
  MdEmail,             // Email
  MdPhone,             // Teléfono
  MdMessage,           // Mensaje
  MdChat,              // Chat
  MdNotifications,     // Notificaciones
  MdSend,              // Enviar
} from 'react-icons/md';
```

### Seguridad

```tsx
import { 
  MdLock,              // Candado cerrado
  MdLockOpen,          // Candado abierto
  MdSecurity,          // Escudo
  MdVisibility,        // Ojo (mostrar)
  MdVisibilityOff,     // Ojo tachado (ocultar)
  MdVerifiedUser,      // Usuario verificado
} from 'react-icons/md';
```

### Búsqueda y Filtros

```tsx
import { 
  MdSearch,            // Lupa
  MdFilterList,        // Filtros
  MdSort,              // Ordenar
  MdTune,              // Ajustes/Configuración
} from 'react-icons/md';
```

---

## 🎨 Personalizar Tamaño

### En el Icono Directamente

```tsx
<Button 
  intent="primary" 
  icon={<MdShoppingCart size={20} />}
>
  Comprar
</Button>
```

### Tamaños Recomendados

| Tamaño Botón | Tamaño Icono | Size prop |
|--------------|--------------|-----------|
| `sm` (12px) | 16px | `size={16}` |
| `md` (14px) | 18px | `size={18}` (default) |
| `lg` (16px) | 20px | `size={20}` |

---

## 🎯 Mejores Prácticas

### 1. Consistencia
Usa siempre la misma librería de iconos (Material Design) en todo el proyecto.

### 2. Tamaño Proporcional
El icono debe ser ligeramente más grande que el texto del botón.

```tsx
// ✅ Bueno
<Button intent="primary" size="md" icon={<MdCheck size={18} />}>
  Confirmar
</Button>

// ❌ Malo - icono demasiado grande
<Button intent="primary" size="sm" icon={<MdCheck size={32} />}>
  Confirmar
</Button>
```

### 3. Posición del Icono

**Izquierda:** Para iconos que describen la acción
```tsx
<Button icon={<MdDownload />} iconPosition="left">
  Descargar
</Button>
```

**Derecha:** Para iconos de navegación o continuación
```tsx
<Button icon={<MdArrowForward />} iconPosition="right">
  Continuar
</Button>
```

### 4. Accesibilidad

Siempre incluye `aria-label` en botones solo con icono:

```tsx
<Button 
  intent="primary" 
  icon={<MdShoppingCart />}
  className="!px-2"
  aria-label="Agregar al carrito"
/>
```

### 5. Color del Icono

El icono hereda el color del texto del botón automáticamente:

```tsx
// El icono será blanco
<Button intent="primary" icon={<MdCheck />}>
  Confirmar
</Button>

// El icono será negro
<Button intent="outlineDark" icon={<MdCheck />}>
  Confirmar
</Button>
```

---

## 📚 Recursos

### Explorar Todos los Iconos

**React Icons Gallery:**  
[https://react-icons.github.io/react-icons/icons/md/](https://react-icons.github.io/react-icons/icons/md/)

**Material Design Icons (Original):**  
[https://fonts.google.com/icons](https://fonts.google.com/icons)

### Otras Librerías Incluidas en react-icons

```tsx
// Font Awesome
import { FaShoppingCart } from 'react-icons/fa';

// Feather Icons
import { FiShoppingCart } from 'react-icons/fi';

// Heroicons
import { HiShoppingCart } from 'react-icons/hi';
```

**Recomendación:** Mantener Material Design (`Md`) para consistencia.

---

## 🔍 Buscar Iconos

### Por Categoría

1. **Actions** - Acciones comunes (add, edit, delete, etc.)
2. **Alert** - Alertas y notificaciones
3. **Communication** - Email, phone, chat
4. **Content** - Contenido (copy, paste, save)
5. **Navigation** - Navegación (arrows, menu, close)
6. **Social** - Redes sociales
7. **Toggle** - Switches y checkboxes

### Por Nombre

Busca en la galería: [react-icons.github.io](https://react-icons.github.io/react-icons/)

Todos los iconos Material Design tienen prefijo `Md`:
- `MdHome` - Casa
- `MdSettings` - Configuración
- `MdAccount` - Cuenta
- `MdFavorite` - Corazón/Favorito
- `MdStar` - Estrella

---

## 🎨 Ejemplo Completo

```tsx
import Button from '@/shared/components/Button';
import { 
  MdShoppingCart, 
  MdArrowForward, 
  MdDownload,
  MdLock 
} from 'react-icons/md';

export default function ProductCard() {
  return (
    <div className="space-y-4">
      {/* Botón principal con icono */}
      <Button 
        intent="primary" 
        icon={<MdShoppingCart size={18} />}
        iconPosition="left"
      >
        Comprar Ahora
      </Button>

      {/* Botón secundario con navegación */}
      <Button 
        intent="secondary" 
        icon={<MdArrowForward size={18} />}
        iconPosition="right"
      >
        Ver Detalles
      </Button>

      {/* Botón de descarga */}
      <Button 
        intent="outlineDark" 
        icon={<MdDownload size={18} />}
      >
        Descargar PDF
      </Button>

      {/* Botón solo icono */}
      <Button 
        intent="dark" 
        icon={<MdLock size={18} />}
        className="!px-2"
        aria-label="Seguridad"
      />
    </div>
  );
}
```

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0  
**Librería:** react-icons v5.x
