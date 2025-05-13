import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='block md:hidden'>
        <Image
          src='/images/apps/threema/hero-mobile.jpg'
          alt='threema'
          width={414}
          height={174}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden md:block lg:hidden'>
        <Image
          src='/images/apps/threema/hero-tablet.jpg'
          alt='threema'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden lg:block'>
        <Image
          src='/images/apps/threema/hero-desktop.jpg'
          alt='threema'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
    </>
  );
};

export default Hero;
