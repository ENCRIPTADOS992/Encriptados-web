"use client";
import Image from "next/image";

export default function SecureFeatures() {
  return (
    <section className="w-full bg-white py-10 px-4">
      <div
        className="
          max-w-screen-lg mx-auto
          flex flex-col-reverse    /* <600px: columna inversa (imagen arriba) */
          sm:flex-row              /* ≥600px: fila (texto izquierda, imagen derecha) */
          items-center gap-8
        "
      >
        <div className="w-full sm:w-1/2">
          <h2
            className="
    font-inter font-bold
    text-[24px]                          /* móvil */
    sm:text-[26px]                       /* ≥600px */
    [@media(min-width:744px)]:text-[28px]/* ≥744px */
    md:text-[30px]                       /* ≥820px */
    leading-tight text-black mb-6
  "
          >
            Mantén tu privacidad intacta
            <br />
            con la máxima protección
          </h2>

          <div
            className="
              space-y-4
              text-[14px]                          /* párrafo: móvil */
              sm:text-[12px]                       /* ≥600px */
              [@media(min-width:744px)]:text-[12px]/* ≥744px */
              md:text-[14px]                       /* ≥820px */
              text-black font-inter
              [&_span]:font-bold                   /* todos los spans en negrita */
              [&_span]:text-[16px]                 /* span: 16px móvil */
              sm:[&_span]:text-[18px]              /* span: 18px ≥600px */
              [@media(min-width:744px)]:[&_span]:text-[14px] /* span: 20px ≥744px */
              md:[&_span]:text-[22px]              /* span: 22px ≥820px */
            "
          >
            <div>
              <span>Servidores Globales Descentralizados</span>
              <br />
              Red de servidores que se autodestruyen cada 24 horas, garantizando
              máxima seguridad. Ningún servidor almacena datos permanentemente,
              eliminando riesgos de accesos no autorizados.
            </div>
            <div>
              <span>Notificación de Emergencia SOS</span>
              <br />
              En emergencias, envía alertas inmediatas a tus contactos de
              confianza. Proporciona información clave para actuar rápidamente
              en situaciones críticas.
            </div>
            <div>
              <span>Contraseña de Coacción</span>
              <br />
              Activa una respuesta segura con una contraseña secundaria. Elimina
              datos y protege tu información sin alertar al intruso, brindando
              una defensa discreta y efectiva.
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 flex justify-center">
          <Image
            src="/images/apps/secureCrypt/imagen_setup.png"
            alt="Celular seguridad"
            width={349}
            height={656}
            className="
              object-cover rounded-xl
              w-2/4        /* móvil: 75% del contenedor */
              sm:w-1/2     /* ≥600px: 50% */
              [@media(min-width:744px)]:w-2/3
              md:w-3/5     /* ≥820px: 40% */
              lg:w- 2/3     /* ≥1024px: 33% */
              h-auto
            "
            priority
          />
        </div>
      </div>
    </section>
  );
}
