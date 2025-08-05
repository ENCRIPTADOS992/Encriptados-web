// src/app/[locale]/apps/component/templateSoftware/SecurityFeatures.tsx
import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface SecurityFeaturesProps {
  title: string;
  features: Feature[];
  imageUrl: string;
}

const SecurityFeatures: React.FC<SecurityFeaturesProps> = ({
  title,
  features,
  imageUrl,
}) => (
  // w-screen para full-bleed, py en lugar de p para controlar vertical
  <section className="hidden lg:flex justify-center py-8 bg-white">
    <div className="bg-black rounded-[44px] w-[1272px] h-[1182px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        {/* Imagen del teléfono */}
        <div className="flex-shrink-0 flex justify-center mt-[85px]">
          <div className="w-[450px] h-[736px] rounded-[24px] overflow-hidden">
            <img
              src={imageUrl}
              alt="DEC Secure Phone"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>

        {/* Wrapper relativo para grid + círculo */}
        <div className="relative flex-1 flex justify-start ml-[60px]">
          {/* Contenedor de ancho fijo PARA TÍTULO + GRID */}
          <div className="mt-[85px] w-[581px]">
            {/* Título alineado al inicio */}
            <h2
              className="
                font-inter        /* si tienes la fuente Inter registrada */
                font-bold          /* weight 700 */
                text-[28px]        /* tamaño 28px */
                leading-[28px]     /* line-height = 100% = 28px */
                tracking-[0px]     /* letter-spacing 0 */
                text-white         /* #FFFFFF */
                w-[581px]          /* ancho fijo 581px */
                h-[68px]           /* alto fijo 68px */
                mb-8
              "
            >
              {title}
            </h2>
            {/* CÍRCULO AZUL DETRÁS del grid */}
            <div
              className="absolute"
              style={{
                width: "400px", // ancho reducido
                height: "550px", // alto reducido
                borderRadius: "24px",
                backgroundColor: "#3FD3FF",
                filter: "blur(100px)", // menos blur si lo deseas
                top: "450px", // mueve más arriba
                right: "230px", // mueve más hacia la izquierda
              }}
            />

            {/* Grid de tarjetas */}
            <div
              className="grid grid-cols-2 gap-x-[15px] gap-y-[20px] relative z-10"
              style={{ width: "581px" }}
            >
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="w-[283px] h-[297px] bg-[#101010] rounded-[12px] p-[24px_24px_34px_24px] flex flex-col items-start gap-[14px]"
                >
                  {/* Icono check */}
                  <img
                    src="/images/apps/dec-secure/check_circle.png"
                    alt="check icon"
                    className="w-[34px] h-[34px] select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Contenido de la tarjeta */}
                  <div>
                    <h3
                      className="
                      font-inter            /* Inter */
                      font-semibold          /* 600 Semi Bold */
                      text-[18px]            /* 18px */
                      leading-[18px]         /* line-height 100% */
                      tracking-[0px]         /* letter-spacing 0 */
                      text-white             /* #FFFFFF */
                      w-[235px]              /* width 235px */
                      h-[44px]               /* height 44px */
                    "
                    >
                      {feat.title}
                    </h3>
                    <p
                      className="
                      font-inter            /* Inter */
                      font-normal            /* 400 Regular */
                      text-[16px]            /* 16px */
                      leading-[16px]         /* line-height 100% */
                      tracking-[0px]         /* letter-spacing 0 */
                      text-[rgba(244,248,250,0.6)] /* #F4F8FA a 60% */
                      w-[235px]              /* width 235px */
                      h-[114px]              /* height 114px */
                      mt-1
                    "
                    >
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SecurityFeatures;
