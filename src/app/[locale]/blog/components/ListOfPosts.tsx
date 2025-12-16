import React, { useState } from "react";
import CardOfPost from "./CardOfPost";
import SectionWrapper from "@/shared/components/SectionWrapper";

type Post = {
  id: number | string;
  image: string;
  title: string;
  description: string;
  author: string;
};

type ListOfPostsProps = {
  posts: Post[];
};

const POSTS_PER_PAGE = 6;

const ListOfPosts = ({ posts }: ListOfPostsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Función para generar números de páginas a mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Si hay 7 o menos páginas, mostrarlas todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Páginas alrededor de la actual
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Siempre mostrar última página
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave al inicio de la lista
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black py-12 md:py-16 lg:py-20">
      <SectionWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post, index) => (
            <CardOfPost
              key={post.id || index}
              id={post.id}
              image={post.image}
              title={post.title}
              description={post.description}
              author={post.author}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <nav 
            className="flex items-center justify-center mt-8 gap-2"
            aria-label="Paginación del blog"
          >
            {/* Botón Anterior */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                flex items-center gap-1 px-3 py-2 rounded-md border text-sm transition
                ${currentPage === 1
                  ? "opacity-50 cursor-not-allowed bg-transparent text-gray-500 border-gray-700"
                  : "bg-transparent text-white border-gray-600 hover:bg-gray-800"
                }
              `}
              aria-label="Página anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Números de página */}
            <div className="flex items-center gap-1 sm:gap-2">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span 
                    key={`ellipsis-${index}`}
                    className="px-2 text-white"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page as number)}
                    className={`
                      min-w-[40px] px-3 py-2 rounded-md border text-sm transition
                      ${currentPage === page
                        ? "bg-white text-black font-semibold border-white"
                        : "bg-transparent text-white border-gray-600 hover:bg-gray-800"
                      }
                    `}
                    aria-label={`Página ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                flex items-center gap-1 px-3 py-2 rounded-md border text-sm transition
                ${currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed bg-transparent text-gray-500 border-gray-700"
                  : "bg-transparent text-white border-gray-600 hover:bg-gray-800"
                }
              `}
              aria-label="Página siguiente"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        )}

      </SectionWrapper>
    </div>
  );
};

export default ListOfPosts;