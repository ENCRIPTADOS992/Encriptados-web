"use client";
import Image from "next/image";

export default function SecureGrid() {
  return (
    <section className="w-full flex justify-center items-center bg-[#F7FAFC] py-16 px-2">
      <div className="relative w-[1272px] h-[1241px] rounded-2xl flex flex-col lg:flex-row items-start justify-center gap-8 mx-auto px-6 py-10 bg-[#0F0F0F] border border-[#B3E6FC]">
        <div className="pointer-events-none absolute right-[60px] top-1/2 -translate-y-1/2 z-0">
          <div className="w-[500px] h-[500px] rounded-full bg-[#32C7FF] opacity-90 blur-[140px]" />
        </div>

        {/* Columna izquierda: celular */}
        <div className="w-[465px] h-[916px] flex justify-center items-start pt-[68px] bg-[#0F0F0F]">
          <Image
            src="/images/apps/secureCrypt/phone_image.png"
            alt="Celular encriptado"
            width={465}
            height={916}
            className="object-contain rounded-2xl"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-start">
          <h2
            className="
				text-white
				font-bold
				text-[28px]
				leading-[100%]
				w-[581px]
				mt-[68px]
				mb-8
				font-['Inter',sans-serif]
			"
          	>
            Te mantenemos conectado con
            <br />
            encriptación de inicio a fin
          </h2>

          <div className="grid grid-cols-2 gap-[14px] w-[580px]">
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
                className="w-[283px] h-[297px] rounded-[12px] bg-[#181818] pt-[24px] pb-[34px] px-[24px] flex flex-col items-start text-left gap-[14px]"
              >
                <Image
                  src="/images/apps/secureCrypt/check_circle.png"
                  alt="Check"
                  width={34}
                  height={34}
                />
                <span className="text-white font-bold text-[18px] leading-[1.1]">
                  {item.title}
                </span>
                <p className="text-[#A3A3A3] text-[16px] leading-tight">
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
