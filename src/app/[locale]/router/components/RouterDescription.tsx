"use client";

const RouterCamaleonHero = () => (
  <section className="bg-[#F6FCFF] w-full flex flex-col items-center justify-center py-10">
    {/* Botón superior pequeño */}
    <span
  className="
    inline-flex
    items-center
    justify-center
    h-[54px]
    px-6
    rounded-[24px]
    font-bold
    text-base
    mb-6
    text-[#191919]
    bg-gradient-to-r from-[#6ADDFF] to-[#A8EBFF]
    shadow
  "
>
  Navega con anonimato
</span>


    {/* Texto principal grande */}
    <h1 className="text-center font-bold text-[2rem] md:text-[2.2rem] text-[#191919] mb-5 max-w-6xl leading-tight">
      El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet.
    </h1>
    <br></br>
    {/* Texto secundario grande */}
    <h1 className="text-center font-bold text-[2rem] md:text-[2.2rem] text-[#191919] mb-5 max-w-6xl leading-tight">
      Gracias a su innovadora tecnología, cambia dinámicamente tu IMEI, garantizando que tu identidad digital no sea rastreada.<br />
      Conéctate de forma segura desde cualquier dispositivo y navega sin preocupaciones.
    </h1>
  </section>
);

export default RouterCamaleonHero;
