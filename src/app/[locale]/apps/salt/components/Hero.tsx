import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='block md:hidden'>
        <Image
          src='/images/apps/salt/hero-mobile.jpg'
          alt='salt'
          width={414}
          height={174}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden md:block lg:hidden'>
        <Image
          src='/images/apps/salt/hero-tablet.jpg'
          alt='salt'
          width={960}
          height={401}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden lg:block'>
        <Image
          src='/images/apps/salt/hero-desktop.jpg'
          alt='salt'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
    </>
  );
};

export default Hero;
