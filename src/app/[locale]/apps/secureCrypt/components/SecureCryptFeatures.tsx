"use client";
import Image from "next/image";

export default function SecureFeatures() {
  return (
    <section className="w-full flex justify-center py-10 px-2 bg-[#F7FAFC]">
      <div className="w-[1440px] h-[540px] flex items-center justify-center mx-auto rounded-none bg-white">
        <div className="w-[440px] flex flex-col justify-center mr-[80px] ml-[80px]">
          <h2 className="font-inter font-bold text-[28px] leading-[100%] text-black mb-4">
            Mantén tu privacidad intacta<br />con la máxima protección
          </h2>
          <div className="text-[16px] text-black font-inter">
            <div className="mb-2">
              <span className="font-bold">Servidores Globales Descentralizados</span><br />
              Red de servidores que se autodestruyen cada 24 horas, garantizando máxima seguridad. Ningún servidor almacena datos permanentemente, eliminando riesgos de accesos no autorizados.
            </div>
            <div className="mb-2">
              <span className="font-bold">Notificación de Emergencia SOS</span><br />
              En emergencias, envía alertas inmediatas a tus contactos de confianza. Proporciona información clave para actuar rápidamente en situaciones críticas.
            </div>
            <div>
              <span className="font-bold">Contraseña de Coacción</span><br />
              Activa una respuesta segura con una contraseña secundaria. Elimina datos y protege tu información sin alertar al intruso, brindando una defensa discreta y efectiva.
            </div>
          </div>
        </div>
        <div className="w-[349px] h-[656px] flex items-center justify-center ml-[48px] mr-[54px]">
          <Image
            src="/images/apps/secureCrypt/imagen_setup.png"
            alt="Celular seguridad"
            width={349}
            height={656}
            className="rounded-[14px] object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
