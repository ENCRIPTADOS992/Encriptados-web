"use client";

import React from "react";
import { motion } from "framer-motion";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductBenefitsGridProps {
  title?: string;
  benefits: BenefitItem[];
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

/**
 * ProductBenefitsGrid - Componente unificado y responsive con animaciones
 * Mobile: 1 columna centrada
 * Tablet: 2 columnas
 * Desktop: 3 columnas
 */
const ProductBenefitsGridUnified: React.FC<ProductBenefitsGridProps> = ({
  title,
  benefits,
}) => {
  if (benefits.length === 0) return null;

  return (
    <section className="w-full bg-black py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.h3
            className="text-xl lg:text-2xl font-bold text-white mb-8 text-center lg:text-left"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {title}
          </motion.h3>
        )}

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
                <img
                  src={benefit.icon}
                  alt=""
                  className="w-7 h-7 lg:w-8 lg:h-8"
                  draggable={false}
                  loading="lazy"
                  aria-hidden="true"
                />
              </motion.div>
              <h4 className="font-semibold text-base lg:text-lg text-white leading-snug">
                {benefit.title}
              </h4>
              <p className="text-sm lg:text-base text-white/70 leading-relaxed">
                {benefit.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductBenefitsGridUnified;
