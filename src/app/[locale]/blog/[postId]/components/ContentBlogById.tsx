"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

const BLOGS_API_URL = "https://encriptados.es/wp-json/encriptados/v1/blogs?lang=es";

type PostContent = {
  imagen: string;
  titulo: string;
  cuerpo: string;
};

type PostCard = {
  imagen: string;
  titulo: string;
  descripcion: string;
};

type BlogPost = {
  id: number;
  card: PostCard;
  contenido: PostContent;
};

const ContentBlogById = () => {
  const params = useParams();
  const postId = params?.postId;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      console.log("No hay postId en params:", params);
      return;
    }

    setLoading(true);
    console.log("Buscando postId:", postId, typeof postId);

    fetch(BLOGS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el post");
        return res.json();
      })
      .then((data: BlogPost[]) => {
        console.log("Ids de posts del endpoint:", data.map((item) => item.id));
        const found = data.find((item) => String(item.id) === String(postId));
        console.log("Resultado del find:", found);
        if (!found) throw new Error("Artículo no encontrado");
        setPost(found);
        setFetchError(null);
      })
      .catch((err) => {
        console.error("Error en fetch/postId:", err);
        setFetchError(err.message || "Error inesperado");
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-24">
        <span className="text-gray-400 animate-pulse">Cargando artículo...</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="w-full flex justify-center items-center py-24">
        <span className="text-red-400">{fetchError}</span>
      </div>
    );
  }

  if (!post) {
    console.log("No se encontró el post para mostrar.");
    return null;
  }

  return (
    <SectionWrapper className="max-w-3xl bg-[#191919] rounded-2xl shadow-lg mt-6 p-4">
      <div className="relative w-full h-56 sm:h-80 rounded-lg overflow-hidden mb-4">
        <Image
          src={post.card.imagen}
          alt={post.card.titulo}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        {post.card.titulo}
      </h1>
      <div className="flex items-center text-gray-400 text-sm mb-8 gap-3">
      </div>
      <article
        className="prose prose-invert max-w-none text-gray-200"
        dangerouslySetInnerHTML={{ __html: post.contenido.cuerpo }}
      />
    </SectionWrapper>
  );
};

export default ContentBlogById;
