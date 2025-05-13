import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='block md:hidden'>
        <Image
          src='/images/apps/vault-chat/hero-mobile.jpg'
          alt='vault chat'
          width={414}
          height={174}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden md:block lg:hidden'>
        <Image
          src='/images/apps/vault-chat/hero-tablet.jpg'
          alt='vault chat'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
      <div className='hidden md:block'>
        <Image
          src='/images/apps/vault-chat/hero-desktop.jpg'
          alt='vault chat'
          width={1440}
          height={284}
          className='w-full h-auto'
        />
      </div>
    </>
  );
};

export default Hero;
