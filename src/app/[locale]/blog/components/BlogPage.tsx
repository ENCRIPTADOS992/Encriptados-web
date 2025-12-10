"use client";
import React, { useState, useEffect } from "react";
import BannerBlog from "./BannerBlog";
import DownloadAppBanner from "../../our-products/components/DownloadAppBanner";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import ListOfPosts from "./ListOfPosts";

const BLOGS_API_URL =
  "https://encriptados.es/wp-json/encriptados/v1/blogs?lang=es";

  type BlogAPIItem = {
  id: number;
  card: {
    imagen: string;
    titulo: string;
    descripcion: string;
  };
  contenido?: {
    autor?: string;
  };
};

const BlogPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState<any[]>([]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1315);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(BLOGS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los blogs");
        return res.json();
      })
      .then((data: BlogAPIItem[]) => { 
        const mappedPosts = data.map((item: BlogAPIItem) => ({
          image: item.card.imagen,
          title: item.card.titulo,
          description: item.card.descripcion,
          author: item.contenido?.autor || "Equipo Encriptados",
          id: item.id,
        }));
        setPosts(mappedPosts);
        setFetchError(null);
      })
      .catch((err) => {
        setFetchError(err.message || "Ocurrió un error inesperado");
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <BasicFormProvider defaultValue={{ category: "tech" }}>
        <BannerBlog />
        <ListOfPosts posts={posts} />

        <div>
          <DownloadAppBanner />
        </div>
        
        {/* <SubscribeBanner /> */}
      </BasicFormProvider>
    </>
  );
};

export default BlogPage;
