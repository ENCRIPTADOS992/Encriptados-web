"use client";
import Image from "next/image";

const RouterCamaleonBenefits = () => (
  <section className="bg-[#131313] py-12">
    <div className="flex justify-center">
      <Image
        src="/images/router/beneficios.png" // Actualiza el path según donde la pongas
        alt="Beneficios clave"
        width={1200} // Ajusta según el tamaño real de tu imagen
        height={400}
        className="max-w-full h-auto"
        priority
      />
    </div>
  </section>
);

export default RouterCamaleonBenefits;
