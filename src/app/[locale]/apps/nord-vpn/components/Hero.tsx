import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='block md:hidden'>
        <Image
          src='/images/apps/nord-vpn/hero-mobile.webp'
          alt='nord vpn'
          width={414}
          height={174}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden md:block'>
        <Image
          src='/images/apps/nord-vpn/hero-desktop.webp'
          alt='nord vpn'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
    </>
  );
};

export default Hero;
