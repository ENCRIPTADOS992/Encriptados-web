"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface HeroVideoSectionProps {
  title: string;
  videoUrl?: string;
  /** Thumbnail de YouTube generado desde el videoId — se usa para comprobar si el video existe */
  videoThumbnail?: string;
  /** Imagen de fallback explícita configurada en el admin (tiene prioridad sobre productImage) */
  videoImage?: string;
  /** Imagen principal del producto (último recurso de fallback) */
  productImage?: string;
  /** Imagen de fallback legacy (compatibilidad con usos anteriores) */
  imageUrl?: string;
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
 *
 * Lógica de visualización:
 *  1. Si hay videoUrl y el thumbnail de YouTube carga OK  → mostrar iframe del video
 *  2. Si el thumbnail falla o no hay videoUrl             → mostrar videoImage (admin) o imageUrl o productImage
 *  3. Si no hay nada                                      → no renderizar
 *
 * Mobile: título arriba, contenido abajo (columna)
 * Tablet/Desktop: título a la izquierda, contenido a la derecha (fila)
 */
const HeroVideoSectionUnified: React.FC<HeroVideoSectionProps> = ({
  title,
  videoUrl,
  videoThumbnail,
  videoImage,
  productImage,
  imageUrl,
}) => {
  const embedUrl = videoUrl ? toEmbedUrl(videoUrl) : "";

  // null = pendiente, true = video válido, false = usar fallback
  const [videoValid, setVideoValid] = useState<boolean | null>(
    embedUrl ? null : false
  );

  useEffect(() => {
    if (!embedUrl) {
      setVideoValid(false);
      return;
    }

    const thumbnailSrc = videoThumbnail || (() => {
      // Intentar extraer el thumbnail localmente si no viene del backend
      const m = embedUrl.match(/embed\/([^?&/]+)/);
      return m ? `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg` : "";
    })();

    if (!thumbnailSrc) {
      // Sin thumbnail para verificar → mostrar video directamente
      setVideoValid(true);
      return;
    }

    const img = new window.Image();
    img.onload = () => setVideoValid(true);
    img.onerror = () => setVideoValid(false);
    img.src = thumbnailSrc;
  }, [embedUrl, videoThumbnail]);

  // Imagen de fallback: prioridad videoImage (admin) > imageUrl (legacy) > productImage (WooCommerce)
  const fallbackSrc = videoImage || imageUrl || productImage || "";

  // No renderizar si no hay nada que mostrar
  if (videoValid === false && !fallbackSrc) return null;
  if (videoValid === null && !fallbackSrc && !embedUrl) return null;

  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Título */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight text-center lg:text-left">
            {title}
          </h2>

          {/* Contenido: video o imagen de fallback */}
          {videoValid === true && embedUrl ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ) : videoValid === false && fallbackSrc ? (
            <div className="flex justify-center lg:justify-end">
              <Image
                src={fallbackSrc}
                alt={title}
                width={521}
                height={313}
                className="w-[373px] h-[200px] rounded-[31.5px] md:w-[287px] md:h-[172px] md:rounded-[24.24px] lg:w-[521px] lg:h-[313px] lg:rounded-[44px] object-cover"
                sizes="(max-width: 768px) 373px, (max-width: 1024px) 287px, 521px"
              />
            </div>
          ) : fallbackSrc ? (
            /* Estado pendiente (videoValid === null): mostrar imagen mientras se valida */
            <div className="flex justify-center lg:justify-end">
              <Image
                src={fallbackSrc}
                alt={title}
                width={521}
                height={313}
                className="w-[373px] h-[200px] rounded-[31.5px] md:w-[287px] md:h-[172px] md:rounded-[24.24px] lg:w-[521px] lg:h-[313px] lg:rounded-[44px] object-cover"
                sizes="(max-width: 768px) 373px, (max-width: 1024px) 287px, 521px"
              />
            </div>
          ) : (
            /* Estado pendiente sin fallback: espacio reservado para evitar layout shift */
            <div className="relative w-full aspect-video rounded-2xl bg-gray-100 animate-pulse" />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSectionUnified;

