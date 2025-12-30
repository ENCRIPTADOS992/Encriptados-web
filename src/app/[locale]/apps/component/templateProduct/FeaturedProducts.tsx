"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeaturedProductsProps {
  left: {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
    moreInfoLabel: string;
    onMoreInfo: () => void;
    image: string;
  };
  right: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    onButtonClick: () => void;
    image: string;
  };
}

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

/**
 * FeaturedProducts - Componente unificado y responsive con animaciones
 * Mobile: 1 columna (cards apiladas), cada card con 2 columnas internas (55% texto, 45% imagen)
 * Tablet (sm+): 2 columnas (cards lado a lado)
 */
const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ left, right }) => {
  return (
    <section className="w-full bg-slate-50 py-8 lg:py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          {/* Left Card - Dark gradient */}
          <motion.article 
            className="rounded-3xl overflow-hidden p-5 sm:p-6 lg:p-8 min-h-[180px] sm:min-h-0"
            style={{
              background: "radial-gradient(120% 120% at 100% 0%, #004A60 0%, #000 100%)",
            }}
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Grid 55% texto / 45% imagen */}
            <div className="grid grid-cols-[55%_45%] gap-3 sm:gap-4 items-center h-full">
              {/* Contenido texto */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-white leading-tight">
                  {left.title}
                </h2>
                <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                  {left.description}
                </p>
                
                <div className="flex flex-col gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                  <motion.button
                    onClick={left.onButtonClick}
                    className="bg-cyan-100 text-gray-900 font-medium rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-base w-fit hover:bg-cyan-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {left.buttonLabel}
                  </motion.button>
                  <button
                    onClick={left.onMoreInfo}
                    className="text-white text-base font-medium underline w-fit hover:text-white/80 transition-colors"
                  >
                    {left.moreInfoLabel}
                  </button>
                </div>
              </div>

              {/* Imagen */}
              <motion.div 
                className="flex items-center justify-center"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={left.image}
                  alt={left.title}
                  className="w-full h-auto object-contain max-h-[200px] lg:max-h-[280px]"
                  draggable={false}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.article>

          {/* Right Card - Cyan gradient */}
          <motion.article 
            className="rounded-3xl overflow-hidden p-5 sm:p-6 lg:p-8 min-h-[180px] sm:min-h-0"
            style={{
              background: "linear-gradient(90deg, #35CDFB 0%, #A8EBFF 100%)",
            }}
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Grid 55% texto / 45% imagen */}
            <div className="grid grid-cols-[55%_45%] gap-3 sm:gap-4 items-center h-full">
              {/* Contenido texto */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 leading-tight">
                  {right.title}
                </h2>
                <p className="text-gray-900/70 text-sm">
                  {right.subtitle}
                </p>
                
                <motion.button
                  onClick={right.onButtonClick}
                  className="bg-white text-gray-900 font-medium rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-base w-fit mt-1 sm:mt-2 hover:bg-white/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {right.buttonLabel}
                </motion.button>
              </div>

              {/* Imagen */}
              <motion.div 
                className="flex items-center justify-center"
                variants={imageVariants}
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={right.image}
                  alt={right.title}
                  className="w-full h-auto object-contain max-h-[200px] lg:max-h-[280px]"
                  draggable={false}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
