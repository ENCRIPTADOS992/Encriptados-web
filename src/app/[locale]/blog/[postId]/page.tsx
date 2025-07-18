"use client";
import React from "react";
import PostIdPage from "./components/PostIdPage";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Page = () => {
  const params = useParams();
  const postId = params.postId;

  // Fetch de blogs (cámbialo a la API pública si lo necesitas)
  const { data: posts, error } = useSWR(
    "https://encriptados.es/wp-json/encriptados/v1/blogs?lang=es",
    fetcher
  );

  if (error) return <div>Error cargando blogs</div>;
  if (!posts) return <div>Cargando...</div>;

  // Mapear al formato esperado por tu app:
  const mappedPosts = posts.map((item: any) => ({
    id: item.id,
    image: item.card.imagen,
    title: item.card.titulo,
    description: item.card.descripcion,
    author: item.contenido?.autor || "Equipo Encriptados",
    date: item.card.fecha,
  }));

  // Asegúrate que el ID es string o number
  let currentPostId: string | number = "";
  if (Array.isArray(postId)) {
    currentPostId = postId[0];
  } else {
    currentPostId = postId ?? "";
  }

  return (
    <PostIdPage
      allPosts={mappedPosts}       // <-- ¡Este es el bueno!
      currentPostId={currentPostId}
    />
  );
};

export default Page;
