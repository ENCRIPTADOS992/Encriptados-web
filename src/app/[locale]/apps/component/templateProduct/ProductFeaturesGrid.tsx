"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface ProductFeaturesGridProps {
  title?: string;
  features: FeatureItem[];
}

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * ProductFeaturesGrid - Componente unificado y responsive con animaciones
 * Mobile: 1 columna
 * Tablet: 2 columnas
 * Desktop: 4 columnas
 */
const ProductFeaturesGridUnified: React.FC<ProductFeaturesGridProps> = ({
  title = "Características principales",
  features,
}) => {
  if (features.length === 0) return null;

  return (
    <section className="w-full bg-slate-50 py-10 lg:py-16 lg:mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {title}
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, idx) => (
            <motion.article
              key={idx}
              className="flex flex-col h-full"
              variants={itemVariants}
            >
              {/* Imagen container - altura fija para uniformidad */}
              <motion.div
                className="bg-white rounded-2xl flex items-center justify-center p-6 sm:p-7 lg:p-8 shadow-sm h-[280px] sm:h-[320px] lg:h-[350px] overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-h-full max-w-full h-auto w-auto object-contain"
                  draggable={false}
                  loading="lazy"
                />
              </motion.div>

              {/* Texto */}
              <div className="flex flex-col flex-1 pt-4 lg:pt-5">
                <h4 className="font-semibold text-lg text-gray-900 mb-2 leading-snug min-h-[54px]">
                  {feature.title}
                </h4>
                <p className="font-normal text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductFeaturesGridUnified;
