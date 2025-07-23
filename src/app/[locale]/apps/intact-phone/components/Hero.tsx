'use client';


import Image from 'next/image';

const Hero = () => {
  return (
     <section className="w-full">
      <picture className="block w-full">
        {/* Desktop ≥1024px */}
        <source
          media="(min-width:1024px)"
          srcSet="/images/apps/intact-phone/hero-desktop.jpg"
        />
        {/* Tablet 744px–1023px */}
        <source
          media="(min-width:744px)"
          srcSet="/images/apps/intact-phone/hero-desktop.jpg"
        />
        {/* Móvil <744px */}
        <Image
          src='/images/apps/intact-phone/hero-desktop.jpg'
          alt='intact-phone'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
     </picture>
    </section>
  );
};

export default Hero;
