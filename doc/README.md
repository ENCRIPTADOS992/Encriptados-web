# Sistema de Diseño - Encriptados Web

## 📚 Índice de Documentación

Este directorio contiene toda la documentación del sistema de diseño de Encriptados Web, creado para resolver la deuda técnica relacionada con tipografía, botones y espaciado.

---

## 📄 Documentos Disponibles

### 1. [Plan de Implementación](./00-PLAN-IMPLEMENTACION.md) 🎯
**Documento principal** con el roadmap completo de migración.

**Contiene:**
- Timeline detallado (3-4 semanas)
- 27 páginas a migrar con prioridades
- Workflow paso a paso
- Checklist por página
- Roles y responsabilidades
- Métricas de éxito

**Cuándo usarlo:** Antes de empezar cualquier trabajo de migración

---

### 2. [Sistema de Tipografía](./01-SISTEMA-TIPOGRAFIA.md) 🔤
Guía completa del sistema tipográfico.

**Contiene:**
- Escala tipográfica (54px → 16px)
- Pesos de fuente (100, 400, 500, 700)
- Componente Typography
- Clases Tailwind
- Responsive typography
- Problemas actuales identificados

**Cuándo usarlo:** Al trabajar con títulos, subtítulos o cualquier texto

---

### 3. [Sistema de Botones](./02-SISTEMA-BOTONES.md) 🔘
Documentación de todas las variantes de botones.

**Contiene:**
- 10 variantes actuales documentadas
- Sistema propuesto simplificado
- Tamaños y estados
- Mejores prácticas UX/UI
- Matriz de uso por contexto
- Componente Button actualizado

**Cuándo usarlo:** Al agregar o modificar botones

---

### 4. [Sistema de Espaciado y Párrafos](./03-SISTEMA-ESPACIADO-PARRAFOS.md) 📏
Guía de espaciado y tipografía para contenido.

**Contiene:**
- Escala de espaciado (4px base)
- 4 tipos de párrafos
- Line height y max-width
- Mejores prácticas de legibilidad
- Componente Paragraph
- Patrones de contenido

**Cuándo usarlo:** Al maquetar contenido, secciones o artículos

---

## 🎨 Sistema de Colores

### Colores Principales
```css
--color-primary: #0AAEE1;      /* Azul principal */
--color-secondary: #35CDFB;    /* Azul secundario */
```

### Colores de Texto
```css
--text-primary: #F7F7F7;       /* Texto principal (claro) */
--text-secondary: #CCCCCC;     /* Texto secundario (gris claro) */
--text-black: #000000;         /* Texto en fondos claros */
```

### Colores de Fondo
```css
--bg-secondary: #161616;       /* Fondo oscuro secundario */
--bg-alternate: #222222;       /* Fondo alternativo */
--bg-alternate-2: #032029;     /* Fondo alternativo 2 */
```

### Bordes
```css
--stroke-border: #3E3E3E;      /* Bordes y divisores */
```

---

## 🚀 Inicio Rápido

### Para Nuevos Desarrolladores

1. **Lee primero:** [Plan de Implementación](./00-PLAN-IMPLEMENTACION.md) (sección "Workflow por Página")
2. **Familiarízate con:** [Sistema de Tipografía](./01-SISTEMA-TIPOGRAFIA.md)
3. **Revisa:** [Sistema de Botones](./02-SISTEMA-BOTONES.md)
4. **Consulta cuando necesites:** [Espaciado y Párrafos](./03-SISTEMA-ESPACIADO-PARRAFOS.md)

---

### Ejemplo Rápido

```tsx
import { Typography } from '@/shared/components/Typography';
import { Button } from '@/shared/components/Button';
import { Paragraph } from '@/shared/components/Paragraph';

export default function MyPage() {
  return (
    <section className="py-16">
      {/* Título principal */}
      <Typography variant="h1" color="primary" as="h1" className="mb-4">
        Bienvenido a Encriptados
      </Typography>
      
      {/* Párrafo destacado */}
      <Paragraph variant="lead" color="primary" spacing="relaxed">
        La mejor tecnología de comunicación segura
      </Paragraph>
      
      {/* Contenido */}
      <Paragraph variant="body" color="secondary">
        Protege tu privacidad con nuestras soluciones de encriptación.
      </Paragraph>
      
      {/* CTA */}
      <Button intent="primary" size="lg" rounded="full" className="mt-6">
        Comenzar Ahora
      </Button>
    </section>
  );
}
```

---

## 📋 Checklist de Migración

### Antes de Empezar
- [ ] Leí el plan de implementación
- [ ] Entiendo el sistema de tipografía
- [ ] Conozco las variantes de botones
- [ ] Tengo claro el sistema de espaciado

### Durante la Migración
- [ ] Crear branch específica: `refactor/[nombre-pagina]`
- [ ] Auditar elementos actuales
- [ ] Reemplazar con componentes del sistema
- [ ] Testing en 3 breakpoints (móvil, tablet, desktop)
- [ ] Validar accesibilidad

### Antes del PR
- [ ] Sin errores de TypeScript
- [ ] Sin warnings en consola
- [ ] Testing visual completado
- [ ] Responsive verificado
- [ ] Screenshots adjuntados

---

## 🛠️ Componentes Disponibles

### Core Components

| Componente | Archivo | Uso |
|------------|---------|-----|
| **Typography** | `shared/components/Typography.tsx` | Títulos y headings |
| **Paragraph** | `shared/components/Paragraph.tsx` | Párrafos y textos de cuerpo |
| **Button** | `shared/components/Button.tsx` | Botones de acción |

### Variantes de Typography
- `promo` - 54px (Hero titles)
- `h1` - 44px (Main titles)
- `h2` - 38px (Section titles)
- `h3` - 30px (Subsection titles)
- `h4` - 24px (Card titles)
- `h5` - 22px (Small headings)
- `body-lg` - 18px (Lead paragraphs)
- `body` - 16px (Standard text)

### Variantes de Button
- `primary` - CTA principal (#0AAEE1)
- `secondary` - CTA secundario (#35CDFB)
- `outline` - Botón con borde
- `ghost` - Botón transparente
- `danger` - Acciones destructivas
- `dark` - Fondo oscuro
- `light` - Fondo claro

---

## 📊 Estado del Proyecto

### Páginas Migradas: 0/27

**Alta Prioridad (7):**
- ⏳ Home
- ⏳ Dashboard
- ⏳ Encrypted SIM
- ⏳ TIM SIM
- ⏳ Our Products
- ⏳ Login
- ⏳ Offers

**Media Prioridad (10):**
- ⏳ About Us, Apps, Blog, Deliveries, Fast Delivery
- ⏳ Identity Verification, IRA SIM, Router
- ⏳ Where to Find Encrypted, Where to Find Us

**Baja Prioridad (8):**
- ⏳ Ambassadors, Become Partner, Distributors
- ⏳ Encrypted Phones Distributors, Encrypted Test
- ⏳ News, Security Test, Test

**Componentes Globales (2):**
- ⏳ Header
- ⏳ Footer

---

## 🎯 Objetivos del Sistema

1. **Consistencia:** Diseño uniforme en toda la web
2. **Mantenibilidad:** Cambios centralizados, fácil actualización
3. **Escalabilidad:** Sistema que crece con el proyecto
4. **Accesibilidad:** WCAG 2.1 AA compliance
5. **Performance:** Optimización de carga y rendering
6. **Developer Experience:** Componentes fáciles de usar

---

## 📖 Glosario

| Término | Definición |
|---------|-----------|
| **CVA** | Class Variance Authority - Librería para variants |
| **Lead Paragraph** | Párrafo destacado, más grande que el body |
| **Max-width prose** | 65 caracteres, ancho óptimo de lectura |
| **Line height** | Espacio entre líneas de texto (interlineado) |
| **Intent** | Propósito/variante de un componente (ej: primary, secondary) |
| **Semantic spacing** | Espaciado con significado (sección, elemento, etc.) |

---

## 🔗 Links Útiles

### Documentación Externa
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design](https://material.io/design)
- [CVA Documentation](https://cva.style/docs)

### Herramientas
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Tailwind Play](https://play.tailwindcss.com/)

---

## ❓ FAQ

### ¿Puedo usar clases de Tailwind directamente?
**Sí**, pero solo para casos específicos. Prefiere los componentes del sistema para elementos comunes.

### ¿Qué hago si necesito una variante que no existe?
1. Verifica si puedes lograr con `className` adicional
2. Si es recurrente, propone agregar al sistema
3. Documenta en el PR

### ¿Cómo testing accesibilidad?
Usa axe DevTools en Chrome. Todas las páginas deben pasar sin errores críticos.

### ¿El sistema es obligatorio?
Para nuevas páginas, **sí**. Para páginas existentes, migración gradual según el plan.

---

## 🤝 Contribuir

### Proponer Cambios

1. Crea un issue describiendo el problema
2. Propone solución con ejemplos
3. Si es aceptado, actualiza documentación
4. PR con cambios en código y docs

### Agregar Componente

1. Justifica necesidad (¿por qué no existe?)
2. Propone API (props, variants)
3. Implementa con tests
4. Documenta con ejemplos
5. PR para revisión

---

## 📞 Contacto

### Dudas sobre Documentación
- Canal Slack: #diseño-sistema
- Email: [especificar]

### Dudas Técnicas
- Lead Developer: [especificar]
- Daily standup: 9:00 AM

---

## 📝 Historial de Cambios

### v1.0 - Diciembre 2025
- ✅ Documentación inicial completa
- ✅ Plan de implementación
- ✅ Sistema de tipografía
- ✅ Sistema de botones
- ✅ Sistema de espaciado y párrafos

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0  
**Mantenedor:** Equipo de Desarrollo Encriptados
