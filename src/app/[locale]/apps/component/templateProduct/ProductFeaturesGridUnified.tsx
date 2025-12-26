import React from "react";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface ProductFeaturesGridProps {
  title?: string;
  features: FeatureItem[];
}

/**
 * ProductFeaturesGrid - Componente unificado y responsive
 * Mobile: 1 columna
 * Tablet: 2 columnas
 * Desktop: 4 columnas
 */
const ProductFeaturesGridUnified: React.FC<ProductFeaturesGridProps> = ({
  title = "Características principales",
  features,
}) => {
  if (features.length === 0) return null;

  return (
    <section className="w-full bg-slate-50 py-10 lg:py-16 lg:mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">
          {title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, idx) => (
            <article key={idx} className="flex flex-col h-full">
              {/* Imagen container - aspect ratio 3:4 (más alto que ancho) */}
              <div className="bg-white rounded-2xl flex items-center justify-center p-4 sm:p-5 lg:p-6 shadow-sm aspect-[3/4]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                  loading="lazy"
                />
              </div>

              {/* Texto */}
              <div className="flex flex-col flex-1 pt-4 lg:pt-5">
                <h4 className="font-semibold text-base lg:text-lg text-gray-900 mb-2 leading-snug">
                  {feature.title}
                </h4>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesGridUnified;
