"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductById } from "../context/ProductByIdContext";

export default function Advantages() {
  const shieldImage = "/images/our-products/shield.png";
  const { currentProduct } = useProductById();
  const advantages = currentProduct?.advantages;

  const [activeCards, setActiveCards] = useState(new Set());

  const handleToggleContent = (index: number) => {
    setActiveCards((prevActiveCards) => {
      const updatedSet = new Set(prevActiveCards);
      if (updatedSet.has(index)) {
        updatedSet.delete(index);
      } else {
        updatedSet.add(index);
      }
      return updatedSet;
    });
  };

  return (
    <div className="bg-black p-6 w-full">
      <div className="bg-black w-full lg:w-7/12 mx-auto mt-24 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages?.map((advantage, index) => (
            <div key={index} className="relative">
              <motion.div
                className="flex justify-center flex-col cursor-pointer gap-3 bg-zinc-900/50 rounded-lg p-6 mx-auto w-full hover:bg-zinc-900/70 transition-colors min-h-[100px]"
                onClick={() => handleToggleContent(index)}
                layout
              >
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center w-10 h-10">
                    <Image
                      src={shieldImage}
                      alt="Shield Icon"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white text-base font-sm">
                    {advantage.title}
                  </p>
                </div>
                <AnimatePresence>
                  {activeCards.has(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white text-sm mt-2">
                        {advantage.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
