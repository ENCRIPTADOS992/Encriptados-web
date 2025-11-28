// ../../encrypted-sim/components/SimBenefits.tsx
"use client";

import React from "react";
import Image from "next/image";

const benefits = [
  {
    title: "Privacidad y Anonimato",
    description:
      "No requerimos ningún dato personal, ni siquiera su dirección de correo electrónico, y recomendamos realizar pagos anónimos utilizando tarjetas prepagadas.",
    icon: "/images/encrypted-sim/icons/visibility_lock.png",
  },
  {
    title: "Comunicaciones encriptadas",
    description:
      "Las comunicaciones encriptadas garantizan llamadas y mensajes seguros, protegiendo la privacidad y evitando interceptaciones o rastreos no autorizados.",
    icon: "/images/encrypted-sim/icons/key_visualizer.png",
  },
  {
    title: "Número sustituto",
    description:
      "Las SIM encriptadas generan un número aleatorio para cada llamada, aumentando la privacidad y evitando rastreos.",
    icon: "/images/encrypted-sim/icons/published_with_changes.png",
  },
  {
    title: "SIM irrastreable con cambios de IMSI",
    description:
      "Los cambios de IMSI permiten modificar la identidad de la SIM para evitar rastreos y mejorar la seguridad, protegiendo la privacidad del usuario en redes móviles.",
    icon: "/images/encrypted-sim/icons/frame_person_off.png",
  },
  {
    title: "Filtros de voz",
    description:
      "Los filtros de voz alteran el sonido de las llamadas para proteger la identidad del usuario, añadiendo una capa extra de seguridad y privacidad.",
    icon: "/images/encrypted-sim/icons/record_voice_over.png",
  },
  {
    title: "Planes vitalicios",
    description:
      "Los usuarios tienen un plan de datos activo durante períodos extensos, adaptándose a necesidades de uso continuo sin necesidad de renovaciones frecuentes.",
    icon: "/images/encrypted-sim/icons/cell_wifi.png",
  },
];

const SimBenefits = () => {
  return (
    <section
      className="
        mx-auto
        w-[1276px] max-w-full
        rounded-[34px]
        bg-[#F4F8FA] sm:bg-white
        px-6 md:px-10
        py-8 md:py-12
      "
    >
      <h2 className="text-center text-[22px] md:text-[26px] font-semibold mb-10">
        Beneficios al usar la eSIM de Encriptados en Colombia
      </h2>

      <div
        className="
          grid
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-8 md:gap-10
        "
      >
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="
              flex flex-col items-center text-center
              bg-white 
              w-[250px]rounded-[34px]
              sm:w-[322px] sm:h-[344px] rounded-[34px]
              mx-auto
              pb-4 sm:pb-0
              md:w-auto md:h-auto md:rounded-[24px]
              px-4 py-6 sm:px-6 sm:py-8
            "
          >
            <div className="relative w-[64px] h-[64px] mb-4">
              <Image
                src={benefit.icon}
                alt={benefit.title}
                fill
                className="object-contain"
              />
            </div>

            <div
              className="
                mb-2
                sm:min-h-[64px]
                flex items-center justify-center
              "
            >
              <h3 className="text-[18px] sm:text-[20px] font-semibold">
                {benefit.title}
              </h3>
            </div>

            <p className="text-[14px] sm:text-[14px] leading-relaxed text-black">
              {benefit.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SimBenefits;
