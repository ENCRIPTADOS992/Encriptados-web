"use client";
import Image from "next/image";

export default function SecureGrid() {
  return (
    <section className="w-full flex justify-center items-center bg-[#F7FAFC] py-16 px-4">
      <div className="relative w-full max-w-[1272px] rounded-2xl flex flex-col lg:flex-row items-start justify-center gap-10 mx-auto px-6 py-10 bg-[#0F0F0F] border border-[#B3E6FC] overflow-hidden">
        <div className="pointer-events-none absolute right-[20px] lg:right-[60px] top-1/2 -translate-y-1/2 z-0">
          <div className="w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full bg-[#32C7FF] opacity-90 blur-[140px]" />
        </div>

        <div className="w-full max-w-[465px] h-auto flex justify-center items-start pt-4 lg:pt-[68px] z-10 mx-auto relative">
          <Image
            src="/images/apps/secureCrypt/phone_image.png"
            alt="Celular encriptado"
            width={465}
            height={916}
            className="object-contain rounded-2xl w-full h-auto"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-start w-full">
          <h2 className="text-white font-bold text-[24px] lg:text-[28px] leading-tight mt-8 lg:mt-[68px] mb-8 font-['Inter',sans-serif] max-w-[580px] text-center w-full">
            Te mantenemos conectado con
            <br />
            encriptación de inicio a fin
          </h2>

          <div className="hidden md:block w-full h-28 -mt-14 bg-gradient-to-t from-[#0F0F0F] to-transparent z-10 relative " />

          {/* GRID AJUSTADO */}
          <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-3
    [@media(min-width:744px)]:grid-cols-3
    md:grid-cols-3
    gap-[14px]
    z-20
    mt-0 md:-mt-24
    mx-auto
    px-2 sm:px-4 md:px-0
    lg:mt-8
  "
  style={{ maxWidth: '922px' }}
>

            {[
              {
                title: "Enmascaramiento y Rotación de IMEI",
                desc: "El IMEI se enmascara y rota cada 30 minutos sin intervención del usuario. Protege tu identidad y ubicación, evitando rastreos y garantizando anonimato total en tus comunicaciones.",
              },
              {
                title: "Enmascaramiento de IP de Sistemas",
                desc: "Tecnología avanzada que enmascara direcciones IP dinámicamente. Evita el rastreo de actividades en línea y protege identidades, brindando una capa adicional de privacidad.",
              },
              {
                title: "Mensajes Autodestructivos",
                desc: "Envía mensajes que se eliminan automáticamente tras un periodo establecido. Seguridad garantizada tanto para el remitente como el destinatario.",
              },
              {
                title: "Chat Encriptado",
                desc: "Mensajería cifrada de extremo a extremo que garantiza que tus conversaciones personales sean totalmente privadas y seguras.",
              },
              {
                title: "Bóveda Encriptada",
                desc: "Almacena información crítica de forma segura en nuestra bóveda encriptada y protegida.",
              },
              {
                title: "Cámara Encriptada",
                desc: "Captura y guarda fotos y videos de forma segura, evitando cualquier acceso no autorizado.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
        w-full
        h-[297px]        
        rounded-[12px]
        bg-[#181818]
        pt-[24px] pb-[34px] px-[24px]
        flex flex-col items-start text-left gap-[14px]
        "
              >
                <Image
                  src="/images/apps/secureCrypt/check_circle.png"
                  alt="Check"
                  width={34}
                  height={34}
                />
                <span className="text-white font-bold text-[15px] md:text-[16px] lg:text-[15px] leading-[1.1]">
                  {item.title}
                </span>
                <p className="text-[#A3A3A3] text-[13px] md:text-[14px] lg:text-[13px] leading-tight">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
