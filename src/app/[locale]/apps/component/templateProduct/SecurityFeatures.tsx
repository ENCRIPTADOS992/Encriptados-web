import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface SecurityFeaturesProps {
  title: string;
  features: Feature[];
  imageUrl?: string;
}

/**
 * SecurityFeatures - Componente unificado y responsive
 * Mobile: 1 columna
 * Tablet: 2 columnas
 * Desktop: 3 columnas
 */
const SecurityFeaturesUnified: React.FC<SecurityFeaturesProps> = ({
  title,
  features,
  imageUrl,
}) => {
  if (features.length === 0) return null;

  return (
    <section className="w-full py-12 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl lg:rounded-[44px] p-8 lg:p-16">
          <div className="flex flex-col items-center gap-8 lg:gap-12">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center max-w-4xl leading-tight">
              {title}
            </h2>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
              {features.map((feat, idx) => (
                <article
                  key={idx}
                  className="flex flex-col bg-neutral-900 rounded-xl p-6 gap-4 shadow-lg"
                >
                  <img
                    src="/images/apps/dec-secure/check_circle.png"
                    alt=""
                    className="w-10 h-10"
                    draggable={false}
                    loading="lazy"
                    aria-hidden="true"
                  />
                  <h4 className="font-medium text-lg lg:text-xl text-white leading-snug">
                    {feat.title}
                  </h4>
                  <p className="text-sm lg:text-base text-white/80 leading-relaxed">
                    {feat.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeaturesUnified;
