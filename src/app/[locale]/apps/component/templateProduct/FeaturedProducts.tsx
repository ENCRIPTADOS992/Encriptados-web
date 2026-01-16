"use client";

import React from "react";
import { motion } from "framer-motion";
import CardSimEsim from "../../../our-products/components/svgs/CardSimEsim";

interface FeaturedProductsProps {
  left: {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
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
    <section className="w-full bg-white">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 py-1">
        <motion.div
          className="relative w-screen left-1/2 -translate-x-1/2 sm:static sm:w-auto sm:left-0 sm:translate-x-0 grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-2 mt-0 sm:mt-1 mb-0 sm:mb-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <CardSimEsim
              title={left.title}
              description={left.description}
              imageSrc={left.image}
              altText={left.title}
              background="bg-custom-gradient-our-products-black"
              titleColor="text-white"
              descriptionColor="text-white"
              showMoreInfo={false}
              buyText={left.buttonLabel}
              onBuyClick={left.onButtonClick}
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <CardSimEsim
              title={right.title}
              description={right.subtitle}
              imageSrc={right.image}
              altText={right.title}
              background="bg-custom-gradient-our-sim-blue2"
              titleColor="text-black"
              descriptionColor="text-black"
              showMoreInfo={false}
              buyText={right.buttonLabel}
              onBuyClick={right.onButtonClick}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
