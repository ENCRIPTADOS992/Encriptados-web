import React from "react";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductBenefitsGridProps {
  title?: string;
  benefits: BenefitItem[];
}

/**
 * ProductBenefitsGrid - Componente unificado y responsive
 * Mobile: 1 columna centrada
 * Tablet: 2 columnas
 * Desktop: 3 columnas
 */
const ProductBenefitsGridUnified: React.FC<ProductBenefitsGridProps> = ({
  title,
  benefits,
}) => {
  if (benefits.length === 0) return null;

  return (
    <section className="w-full bg-black py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-8 text-center lg:text-left">
            {title}
          </h3>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {benefits.map((benefit, idx) => (
            <article
              key={idx}
              className="flex flex-col bg-neutral-900 rounded-xl p-6 gap-4 shadow-lg min-h-[240px] lg:min-h-[280px]"
            >
              <img
                src={benefit.icon}
                alt=""
                className="w-10 h-10 lg:w-11 lg:h-11"
                draggable={false}
                loading="lazy"
                aria-hidden="true"
              />
              <h4 className="font-semibold text-base lg:text-lg text-white leading-snug">
                {benefit.title}
              </h4>
              <p className="text-sm lg:text-base text-white/70 leading-relaxed">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsGridUnified;
