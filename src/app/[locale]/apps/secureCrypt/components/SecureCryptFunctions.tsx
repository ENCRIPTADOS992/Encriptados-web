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
      <h2 className="font-inter font-bold text-[28px] leading-[100%] text-black mb-8 text-center">
        Funciones De Seguridad Del Sistema
      </h2>
      <div className="w-[878px] grid grid-cols-3 gap-[14px] mx-auto">
        {FEATURES.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-[12px] shadow-sm"
            style={{
              width: 283,
              height: 237,
              paddingTop: 24,
              paddingRight: 24,
              paddingBottom: 34,
              paddingLeft: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Image
              src="/images/apps/secureCrypt/check_circle.png"
              alt="Check"
              width={28}
              height={28}
              className="mb-3"
            />
            <span className="font-bold text-black text-[16px] mb-1 font-inter">
              {item.title}
            </span>
            <p
              className="font-inter text-[16px] font-normal leading-[100%] text-black"
              style={{ width: 235, height: 114, opacity: 0.6 }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
