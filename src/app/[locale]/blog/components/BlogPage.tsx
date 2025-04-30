"use client";
import React, { useState, useEffect } from "react";
import BannerBlog from "./BannerBlog";
import DownloadAppBanner from "../../our-products/components/DownloadAppBanner";
import SubscribeBanner from "./SubscribeBanner";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import ListOfPosts from "./ListOfPosts";
import MenuCategory from "./MenuCategory";
import MenuCategoryResponsive from "./MenuCategoryResponsive";

const BlogPage = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  const listOfPosts = [
    {
      image: "/images/blog/girlandman.png",
      title:
        "Optimiza la experiencia del cliente en tu tienda online con tecnología avanzada",
      description:
        "Lorem ipsum dolor sit amet consectetur. Cursus est nulla ipsum commodo sem dolor vitae massa. Mi mi adipiscing pulvinar iaculis...",
      author: "Ronald Hernandez",
    },
    {
      image: "/images/blog/girlandman.png",
      title:
        "Optimiza la experiencia del cliente en tu tienda online con tecnología avanzada",
      description:
        "Lorem ipsum dolor sit amet consectetur. Cursus est nulla ipsum commodo sem dolor vitae massa. Mi mi adipiscing pulvinar iaculis...",
      author: "Ronald Hernandez",
    },
    {
      image: "/images/blog/girlandman.png",
      title:
        "Optimiza la experiencia del cliente en tu tienda online con tecnología avanzada",
      description:
        "Lorem ipsum dolor sit amet consectetur. Cursus est nulla ipsum commodo sem dolor vitae massa. Mi mi adipiscing pulvinar iaculis...",
      author: "Ronald Hernandez",
    },
    {
      image: "/images/blog/girlandman.png",
      title:
        "Optimiza la experiencia del cliente en tu tienda online con tecnología avanzada",
      description:
        "Lorem ipsum dolor sit amet consectetur. Cursus est nulla ipsum commodo sem dolor vitae massa. Mi mi adipiscing pulvinar iaculis...",
      author: "Ronald Hernandez",
    },
    {
      image: "/images/blog/girlandman.png",
      title:
        "Optimiza la experiencia del cliente en tu tienda online con tecnología avanzada",
      description:
        "Lorem ipsum dolor sit amet consectetur. Cursus est nulla ipsum commodo sem dolor vitae massa. Mi mi adipiscing pulvinar iaculis...",
      author: "Ronald Hernandez",
    },
    {
      image: "/images/blog/girlandman.png",
      title:
        "Optimiza la experiencia del cliente en tu tienda online con tecnología avanzada",
      description:
        "Lorem ipsum dolor sit amet consectetur. Cursus est nulla ipsum commodo sem dolor vitae massa. Mi mi adipiscing pulvinar iaculis...",
      author: "Ronald Hernandez",
    },
  ];

  return (
    <>
      <BasicFormProvider defaultValue={{ category: "tech" }}>
        <BannerBlog />
        <div className="bg-[#141414] flex justify-center items-center py-4">
          {/* Renderizar el menú según el tamaño del navegador */}
          {isMobile ? (
            <div className="w-full">
              <MenuCategoryResponsive
                name="os"
                options={[
                  { value: "tech", label: "Tecnología" },
                  { value: "venture", label: "Emprendimiento" },
                  { value: "ecommerce", label: "Commerce" },
                  { value: "marketing", label: "Marketing" },
                  { value: "tools", label: "Herramientas" },
                  { value: "publicity", label: "Publicidad" },
                ]}
              />
            </div>
          ) : (
            <MenuCategory
              name={"category"}
              options={[
                { value: "tech", label: "Tecnología" },
                { value: "venture", label: "Emprendimiento" },
                { value: "ecommerce", label: "Commerce" },
                { value: "marketing", label: "Marketing" },
                { value: "tools", label: "Herramientas" },
                { value: "publicity", label: "Publicidad" },
              ]}
            />
          )}
        </div>

        <ListOfPosts posts={listOfPosts} />

        <div>
          <DownloadAppBanner />
        </div>
        <div className="bg-[#151515] py-3 relative z-20"></div>

        <SubscribeBanner />
      </BasicFormProvider>
    </>
  );
};

export default BlogPage;
