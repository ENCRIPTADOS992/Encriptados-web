"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductBenefitsGridProps {
  title?: string;
  benefits: BenefitItem[];
  imageBenefits?: string;
  productName?: string;
}

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * ProductBenefitsGrid - Componente para mostrar beneficios del producto
 * - title_benefits → título de la sección (opcional)
 * - image_benefits → imagen central del producto (opcional)
 * - Si benefit.icon viene vacío → usa CheckCircle icon
 */
const ProductBenefitsGrid: React.FC<ProductBenefitsGridProps> = ({
  title = "Asegura tus comunicaciones",
  benefits,
  imageBenefits,
  productName,
}) => {
  if (benefits.length === 0) return null;

  return (
    <section className="w-full flex justify-center py-12 lg:py-16">
      {/* Contenedor negro con ancho ajustado al contenido */}
      <div className="bg-black rounded-2xl px-6 py-10 sm:px-10 sm:py-12 lg:px-48 lg:py-16 mx-4">
        <div className="max-w-5xl mx-auto">
          {/* Título centrado */}
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-10 text-center"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {title}
          </motion.h2>

          {/* Imagen central del producto (opcional) */}
          {imageBenefits && (
            <motion.div 
              className="flex justify-center mb-10"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image
                src={imageBenefits}
                alt={productName || "Product"}
                width={280}
                height={350}
                className="object-contain max-h-[350px] w-auto"
              />
            </motion.div>
          )}

          {/* Grid de tarjetas 3x2 */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefits.map((benefit, idx) => (
              <motion.article
                key={idx}
                className="flex flex-col bg-neutral-900 rounded-xl p-6 gap-4 shadow-lg min-h-[240px] lg:min-h-[280px]"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgb(38, 38, 38)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="bg-[#323232] rounded-[8.38px] p-2 w-fit"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {benefit.icon ? (
                    <img
                      src={benefit.icon}
                      alt=""
                      className="w-7 h-7 lg:w-8 lg:h-8"
                      draggable={false}
                      loading="lazy"
                      aria-hidden="true"
                    />
                  ) : (
                    <CheckCircle className="w-7 h-7 lg:w-8 lg:h-8 text-[#10B4E7]" />
                  )}
                </motion.div>
                <h4 className="font-semibold text-base text-white leading-snug">
                  {benefit.title}
                </h4>
                <p className="font-normal text-sm text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsGrid;
