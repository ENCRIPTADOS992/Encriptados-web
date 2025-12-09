const SimMoreInfoHeroMobile = () => {
  return (
    <section className="bg-[#010101] text-white sm:hidden">
      <div className="mx-auto max-w-md px-6 py-10 flex flex-col items-center text-center relative overflow-hidden">
        <img
          src="/images/our-products/Group 480956507.png"
          alt="Ícono seguridad"
          className="w-[40px] h-[40px] mb-4"
        />

        <h1 className="font-inter font-bold text-[24px] leading-[1.2] mb-6">
          Seguridad encriptada en tus comunicaciones
        </h1>

        <div className="relative w-full h-[230px]">
          <div className="absolute top-[20px] left-[10%] w-[140px] h-[160px] bg-white rounded-3xl opacity-80" />
          <img
            src="/images/our-products/b198b560787a72b14fb6394f2ff13a96bb052654.png"
            alt="Edificios"
            className="absolute -top-[90px] right-[0] w-[220px] h-[220px] object-cover rounded-full opacity-70"
          />
          <img
            src="/images/our-products/e9c83d58fd547770ff45021f31ef2be160f87e3a.png"
            alt="Usuario hablando"
            className="absolute -top-[10px] right-[18%] w-[180px] h-[190px] object-contain rotate-180"
          />
        </div>
      </div>
    </section>
  );
};