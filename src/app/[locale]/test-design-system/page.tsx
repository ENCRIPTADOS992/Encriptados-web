// Archivo de prueba temporal para validar los componentes del sistema de diseño
// Este archivo puede ser eliminado después de verificar que todo funciona correctamente

import React from 'react';
import { Typography } from '@/shared/components/Typography';
import { Paragraph } from '@/shared/components/Paragraph';
import Button from '@/shared/components/Button';
// Material Design Icons
import { MdShoppingCart, MdArrowForward, MdCheck, MdAdd, MdDownload, MdLock, MdPhone, MdEmail, MdSearch, MdMenu } from 'react-icons/md';

export default function TestDesignSystem() {
  return (
    <div className="p-8 space-y-12 bg-white">
      {/* Test Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Typography Component Test</h2>
        
        <Typography variant="promo" color="primary" as="h1">
          Heading Promo (54px)
        </Typography>
        
        <Typography variant="h1" color="primary" as="h1">
          Heading 1 (44px)
        </Typography>
        
        <Typography variant="h2" color="secondary" as="h2">
          Heading 2 (38px)
        </Typography>
        
        <Typography variant="h3" color="text-primary" as="h3">
          Heading 3 (30px)
        </Typography>
        
        <Typography variant="h4" color="text-secondary" as="h4">
          Heading 4 (24px)
        </Typography>
        
        <Typography variant="h5" color="black" as="h5">
          Heading 5 (22px)
        </Typography>
        
        <Typography variant="body-lg" color="black">
          Body Large (18px) - Este es un texto de ejemplo para demostrar el tamaño
        </Typography>
        
        <Typography variant="body" color="black">
          Body (16px) - Este es un texto de ejemplo para demostrar el tamaño
        </Typography>
      </section>

      {/* Test Paragraph */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Paragraph Component Test</h2>
        
        <Paragraph variant="lead" color="black" spacing="relaxed">
          Lead Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
        
        <Paragraph variant="body" color="black" spacing="normal">
          Body Paragraph: Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Paragraph>
        
        <Paragraph variant="caption" color="tertiary" spacing="tight">
          Caption Paragraph: Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
        
        <Paragraph variant="small" color="tertiary">
          Small Paragraph: Texto pequeño para notas o información secundaria.
        </Paragraph>
      </section>

      {/* Test Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Button Component Test</h2>
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Main Variants (Based on Real Design):</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button intent="primary">
              Comprar eSIM
            </Button>
            
            <Button intent="secondary">
              Ver Más
            </Button>
            
            <Button intent="light">
              Ver más
            </Button>
            
            <Button intent="ghost">
              Cancelar
            </Button>
            
            <Button intent="link">
              Más información
            </Button>
          </div>
        </div>

        <div className="space-y-3 bg-black p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white">On Dark Background:</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="outline">
              Apps Encriptadas
            </Button>
            
            <Button intent="primary">
              Comprar eSIM
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Dark & Outline Dark:</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="dark" icon={<MdShoppingCart />}>
              Comprar
            </Button>
            
            <Button intent="outlineDark" icon={<MdArrowForward />} iconPosition="right">
              Más información
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Alternate Variants:</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="alternate1">
              Alternate 1
            </Button>
            
            <Button intent="alternate2">
              Alternate 2
            </Button>
            
            <Button intent="alternate3">
              Alternate 3
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Sizes:</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button intent="primary" size="sm">
              Small
            </Button>
            
            <Button intent="primary" size="md">
              Medium
            </Button>
            
            <Button intent="primary" size="lg">
              Large
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Rounded Variants:</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="primary" rounded="none">
              None
            </Button>
            
            <Button intent="primary" rounded="sm">
              Small
            </Button>
            
            <Button intent="primary" rounded="md">
              Medium
            </Button>
            
            <Button intent="primary" rounded="lg">
              Large
            </Button>
            
            <Button intent="primary" rounded="full">
              Full
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">States:</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="primary" size="md">
              Normal
            </Button>
            
            <Button intent="primary" size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Full Width:</h3>
          <Button intent="primary" size="md" fullWidth>
            Full Width Button
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Buttons with Material Design Icons:</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="primary" icon={<MdShoppingCart />} iconPosition="left">
              Comprar
            </Button>
            
            <Button intent="secondary" icon={<MdArrowForward />} iconPosition="right">
              Continuar
            </Button>
            
            <Button intent="dark" icon={<MdShoppingCart />}>
              Comprar
            </Button>
            
            <Button intent="outlineDark" icon={<MdDownload />}>
              Descargar
            </Button>
            
            <Button intent="light" icon={<MdCheck />}>
              Confirmar
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Icon Buttons (Solo icono):</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button intent="primary" icon={<MdAdd />} className="!px-2" />
            <Button intent="secondary" icon={<MdSearch />} className="!px-2" />
            <Button intent="dark" icon={<MdMenu />} className="!px-2" />
            <Button intent="outlineDark" icon={<MdLock />} className="!px-2" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Icon Positions:</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="primary" icon={<MdPhone />} iconPosition="left">
              Llamar
            </Button>
            
            <Button intent="primary" icon={<MdEmail />} iconPosition="right">
              Contactar
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Legacy Variants (Deprecated):</h3>
          <div className="flex flex-wrap gap-3">
            <Button intent="blueT">
              BlueT
            </Button>
            
            <Button intent="elegant">
              Elegant
            </Button>
            
            <Button intent="cyan">
              Cyan
            </Button>
            
            <Button intent="profile">
              Profile
            </Button>
            
            <Button intent="dangerMetal">
              Danger Metal
            </Button>
          </div>
        </div>
      </section>

      {/* Responsive Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Responsive Typography Test</h2>
        
        <Typography 
          variant="h1" 
          color="primary" 
          as="h1"
          className="text-2xl sm:text-3xl md:text-h1"
        >
          Responsive Heading
        </Typography>
        
        <Paragraph variant="body" color="black">
          Este texto debería verse bien en todos los tamaños de pantalla.
          Prueba redimensionando la ventana del navegador.
        </Paragraph>
      </section>

      {/* Combined Example */}
      <section className="space-y-6 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Combined Example (Hero Section)</h2>
        
        <div className="text-center space-y-6">
          <Typography variant="promo" color="primary" as="h1">
            Bienvenido a Encriptados
          </Typography>
          
          <Paragraph variant="lead" color="black" spacing="relaxed" className="mx-auto">
            Protege tu privacidad con la tecnología de encriptación más avanzada del mercado
          </Paragraph>
          
          <div className="flex gap-4 justify-center">
            <Button intent="primary" size="lg" icon={<MdArrowForward />} iconPosition="right">
              Comenzar Ahora
            </Button>
            
            <Button intent="outlineDark" size="lg" icon={<MdLock />} iconPosition="left">
              Más Información
            </Button>
          </div>
        </div>
      </section>

      {/* Material Icons Reference */}
      <section className="space-y-4 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Material Design Icons Reference</h2>
        
        <Paragraph variant="body" color="black">
          Usando <code className="bg-gray-200 px-2 py-1 rounded">react-icons/md</code> para Material Design Icons
        </Paragraph>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdShoppingCart size={32} />
            <span className="text-xs text-center">MdShoppingCart</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdArrowForward size={32} />
            <span className="text-xs text-center">MdArrowForward</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdCheck size={32} />
            <span className="text-xs text-center">MdCheck</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdDownload size={32} />
            <span className="text-xs text-center">MdDownload</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdLock size={32} />
            <span className="text-xs text-center">MdLock</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdPhone size={32} />
            <span className="text-xs text-center">MdPhone</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdEmail size={32} />
            <span className="text-xs text-center">MdEmail</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 border rounded">
            <MdSearch size={32} />
            <span className="text-xs text-center">MdSearch</span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <h4 className="font-semibold mb-2">📦 Librería instalada:</h4>
          <code className="text-sm">pnpm add react-icons</code>
          
          <h4 className="font-semibold mt-4 mb-2">🔗 Más iconos:</h4>
          <a 
            href="https://react-icons.github.io/react-icons/icons/md/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Ver todos los Material Design Icons →
          </a>
        </div>
      </section>
    </div>
  );
}
