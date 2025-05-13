import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='block md:hidden'>
        <Image
          src='/images/apps/nord-vpn/hero-mobile.jpg'
          alt='nord vpn'
          width={414}
          height={174}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden md:block lg:hidden'>
        <Image
          src='/images/apps/nord-vpn/hero-tablet.jpg'
          alt='nord vpn'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden lg:block'>
        <Image
          src='/images/apps/nord-vpn/hero-desktop.jpg'
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
