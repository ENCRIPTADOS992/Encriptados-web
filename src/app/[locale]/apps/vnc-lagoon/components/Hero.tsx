import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='block md:hidden'>
        <Image
          src='/images/apps/vnc-lagoon/hero-mobile.jpg'
          alt='vnc lagoon'
          width={414}
          height={174}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden md:block lg:hidden'>
        <Image
          src='/images/apps/vnc-lagoon/hero-tablet.jpg'
          alt='vnc lagoon'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden lg:block'>
        <Image
          src='/images/apps/vnc-lagoon/hero-desktop.jpg'
          alt='vnc lagoon'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
    </>
  );
};

export default Hero;
