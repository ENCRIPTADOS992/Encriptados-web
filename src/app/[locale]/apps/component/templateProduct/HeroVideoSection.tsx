import React from "react";

interface HeroVideoSectionProps {
  title: string;
  videoUrl: string;
}

/**
 * Convierte una URL de YouTube del formato watch al formato embed
 * Ej: https://www.youtube.com/watch?v=X9iE-f8briY&t=1s -> https://www.youtube.com/embed/X9iE-f8briY
 * También maneja URLs que ya están en formato embed
 */
function toEmbedUrl(url: string): string {
  if (!url) return "";
  
  // Si ya es formato embed, retornar tal cual
  if (url.includes("/embed/")) {
    return url;
  }
  
  // Extraer el video ID de diferentes formatos de URL
  let videoId: string | null = null;
  
  // Formato: youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }
  
  // Formato: youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (!videoId && shortMatch) {
    videoId = shortMatch[1];
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Si no se puede parsear, retornar la URL original
  return url;
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
  const embedUrl = toEmbedUrl(videoUrl);
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
              src={embedUrl}
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
