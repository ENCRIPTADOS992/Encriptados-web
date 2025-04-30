import React from "react";
import { useProductById } from "../context/ProductByIdContext";

const Features = () => {
  const { currentProduct } = useProductById();

  const features = currentProduct?.features;

  if (!features || features.length === 0) return null;

  const isSingleFeature = features.length === 1;

  return (
    <div className="bg-[#F3F8FA] py-16 px-4 md:px-6 lg:px-8 rounded-2xl">
      <div
        className={`w-full ${
          !isSingleFeature ? "md:w-9/12" : "md:w-6/12"
        } mx-auto`}
      >
        <h2 className="text-2xl text-center font-bold mb-8 text-gray-800">
          Características principales
        </h2>
        <div
          className={`grid ${
            isSingleFeature
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          } gap-6 justify-center`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                isSingleFeature ? "mx-auto max-w-sm" : ""
              }`}
            >
              <div className="bg-[#101010] rounded-lg shadow-sm overflow-hidden mb-2">
                <div
                  className="relative w-full"
                  style={{
                    paddingTop: "100%", // Mantiene la proporción 1:1
                  }}
                >
                  <img
                    src={feature.image ? feature.image : ""}
                    alt={feature.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black mb-2 text-lg md:text-xl text-center">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#101010] font-extralight text-center">
                  {feature.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
