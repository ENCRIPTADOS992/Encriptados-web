'use client';

import Image from 'next/image';

const Hero = () => {
  return (
    <section className="w-full">
      <picture className="block w-full">
        {/* Desktop ≥1024px */}
        <source
          media="(min-width:1024px)"
          srcSet="/images/apps/dec-secure/hero-desktop.jpg"
        />
        {/* Tablet 744px–1023px */}
        <source
          media="(min-width:744px)"
          srcSet="/images/apps/dec-secure/hero-tablet.jpg"
        />
        {/* Móvil <744px */}
        <Image
          src="/images/apps/dec-secure/hero-mobile.jpg"
          alt="dec-secure"
          width={1440}   // puedes dejar el width/height más grandes que el contenedor
          height={284}
          className="w-full h-auto"
          priority
        />
      </picture>
    </section>
  );
};

export default Hero;
