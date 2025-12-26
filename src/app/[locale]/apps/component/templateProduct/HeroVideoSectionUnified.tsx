import React from "react";

interface HeroVideoSectionProps {
  title: string;
  videoUrl: string;
}

/**
 * HeroVideoSection - Componente unificado y responsive
 * Mobile: título arriba, video abajo (columna)
 * Tablet/Desktop: título a la izquierda, video a la derecha (fila)
 */
const HeroVideoSectionUnified: React.FC<HeroVideoSectionProps> = ({
  title,
  videoUrl,
}) => {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Título */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight text-center lg:text-left">
            {title}
          </h2>

          {/* Video */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
            <iframe
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSectionUnified;
