"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useProductById } from "../context/ProductByIdContext";

/**
 * Advantages Grid - Beneficios del producto con iconos
 * NO se muestra si advantages[] está vacío o no viene de la API
 * 
 * - Si advantage.image viene → usa esa imagen
 * - Si advantage.image NO viene → usa CheckCircle de lucide-react
 * - title_benefits → título de la sección (opcional)
 * - image_benefits → imagen central del producto (opcional)
 */
export default function Advantages() {
  const { currentProduct } = useProductById();
  const advantages = currentProduct?.advantages;
  
  // Título de la sección (opcional)
  const titleBenefits = (currentProduct as any)?.title_benefits || "Asegura tus comunicaciones";
  
  // Imagen central del producto (celular con logo)
  const imageBenefits = (currentProduct as any)?.image_benefits;

  // NO mostrar sección si no hay advantages
  if (!advantages || advantages.length === 0) return null;

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Título de la sección */}
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
          {titleBenefits}
        </h2>
        
        {/* Imagen central del producto (opcional) */}
        {imageBenefits && (
          <div className="flex justify-center mb-10">
            <Image
              src={imageBenefits}
              alt={currentProduct?.name || "Product"}
              width={280}
              height={350}
              className="object-contain max-h-[350px] w-auto"
            />
          </div>
        )}
        
        {/* Grid de tarjetas 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages?.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5"
            >
              {/* Icono */}
              <div className="mb-3">
                {advantage.image ? (
                  <Image
                    src={advantage.image}
                    alt={advantage.name || "Benefit Icon"}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <CheckCircle className="w-7 h-7 text-[#10B4E7]" />
                )}
              </div>
              
              {/* Título */}
              <h3 className="text-white text-sm font-semibold mb-2 leading-tight">
                {advantage.name}
              </h3>
              
              {/* Descripción - siempre visible pero con altura limitada */}
              <p className="text-zinc-400 text-xs leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
