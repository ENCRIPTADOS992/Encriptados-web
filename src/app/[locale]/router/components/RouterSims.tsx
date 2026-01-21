"use client";

import CardOurProducts from "../../our-products/components/CardOurProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";

const RouterSims = () => {
  const { filters } = useProductFilters();

  return (
    <section className="bg-[#F7FAFC] py-10 px-4 lg:px-20 lg:min-h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <CardOurProducts filters={filters} />
      </div>
    </section>
  );
};

export default RouterSims;