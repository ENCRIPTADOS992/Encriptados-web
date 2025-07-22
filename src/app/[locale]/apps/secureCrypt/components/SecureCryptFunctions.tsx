"use client";
import Image from "next/image";

const FEATURES = [
  {
    title: "Modo Sigiloso",
    desc: "Oculta aplicaciones detrás de una calculadora funcional. Mantén tus datos invisibles y seguros, evitando miradas curiosas en dispositivos Android.",
  },
  {
    title: "Cambiador de Voz Seguro",
    desc: "Transforma tu voz en tiempo real durante grabaciones de voz o video. Garantiza anonimato total con algoritmos avanzados e indetectables.",
  },
  {
    title: "Código de Acceso de la Bóveda",
    desc: "Agrega una capa adicional de seguridad para acceder a la bóveda encriptada, protegiendo información crítica.",
  },
  {
    title: "Eliminación Remota",
    desc: "Elimina datos de forma irreversible y rescribe el contenedor seguro con ceros. Garantiza la destrucción completa e irrecuperable de tu información.",
  },
  {
    title: "Enmascaramiento de Chat",
    desc: "Reemplaza chats con texto aleatorio en segundos, ocultando conversaciones confidenciales. Seguridad garantizada incluso en situaciones inesperadas.",
  },
  {
    title: "Bloqueo del Dispositivo al Agitar",
    desc: "Agita tu dispositivo para bloquear la aplicación rápidamente. Asegura tu información sensible en momentos críticos.",
  },
  {
    title: "Eliminación de Emergencia",
    desc: "Elimina todos los datos del dispositivo al instante en situaciones de emergencia. Protección inmediata e inquebrantable para tus archivos.",
  },
  {
    title: "Prueba de Modo de Desarrollador USB",
    desc: "Evita que la aplicación se inicie en modo desarrollador USB. Protege contra depuraciones no autorizadas y vulnerabilidades de seguridad.",
  },
  {
    title: "Contraseña de Coacción",
    desc: "Activa una respuesta segura y oculta con una contraseña secundaria. Elimina datos y protege tu información sin alertar al intruso.",
  },
];

export default function SecureSystemFeatures() {
  return (
    <section className="w-full flex flex-col items-center bg-[#F7FAFC] py-16 px-2">
      <h2 className="font-inter font-bold text-[28px] leading-none text-black mb-8 text-center">
        Funciones De Seguridad Del Sistema
      </h2>

      <div className="w-full max-w-screen-lg lg:max-w-[900px] grid grid-cols-1 sm:grid-cols-3 justify-items-center sm:justify-items-stretch gap-6 lg:gap-4 mx-auto px-2">
        {FEATURES.map((item, i) => (
          <div
            key={i}
            className="
              w-[280px] 
              sm:w-full
              lg:w-[280px]
              bg-white rounded-[12px] shadow-sm
              flex flex-col pt-[24px] px-[24px] pb-[34px]
              aspect-square        /* cuadrado en móvil */
              sm:aspect-auto       /* libera altura en ≥600px */
              lg:aspect-square     /* vuelve cuadrado en ≥1024px */
              [&_span]:font-bold
              [&_span]:text-[20px]
              sm:[&_span]:text-[16px]
              [@media(min-width:744px)]:[&_span]:text-[16px]
              md:[&_span]:text-[18px]
            "
          >
            <Image
              src="/images/apps/secureCrypt/check_circle.png"
              alt="Check"
              width={28}
              height={28}
              className="mb-3"
            />
            <span className="mb-1 text-black font-inter">
              {item.title}
            </span>
            <p
              className="
                font-inter font-normal leading-tight
                text-black opacity-60
                text-[14px]
                sm:text-[12px]
                [@media(min-width:744px)]:text-[14px]
                md:text-[14px]
                mt-1
              "
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}