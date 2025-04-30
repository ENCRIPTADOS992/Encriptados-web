import AppStoreFooter from '@/shared/FooterEncrypted/icon/AppStoreFooter';
import DownloadApkSvg from '@/shared/svgs/DownloadApkSvg';
import PlayStoreSvg from '@/shared/svgs/PlayStoreSvg';
import ShoppingCart from '@/shared/svgs/ShoppingCart';
import SupportContact from '@/shared/svgs/SupportContact';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Accordion from '../shared/Accordion';
import Button from '../shared/Button';
import CardDetails from '../shared/CardDetails';
import CustomRadioGroup from '../shared/RadioGroup';
import SimCardGroup from '../shared/SimCardGroup';
import Hero from './components/Hero';
import SimpleCard from './components/SimpleCard';
import { details } from './consts/details';
import { plans } from './consts/plans';

const Page = () => {
  return (
    <div>
      <Hero />
      <main className='p-5 bg-[#F4F8FA] tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='w-[85.5%] mx-auto mb-[50px] md:mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-1/3'>
          <Image
            src='/images/apps/nord-vpn/banner.png'
            alt='nord vpn banner'
            width={320}
            height={237}
            priority
            className='w-full'
          />
          <div className='hidden md:flex gap-3 mt-6'>
            <AppStoreFooter />
            <PlayStoreSvg />
            <DownloadApkSvg />
          </div>
        </div>
        <div className='md:w-2/4 lg:w-2/5 xl:w-1/3'>
          <b className='block text-2xl mb-3 text-[#131313] md:text-[28px]'>
            NORDVPN
          </b>
          <p className='text-sm'>
            Obtén acceso remoto simple y seguro de la marca de VPN más confiable
            del mundo.
          </p>
          <ol className='my-4'>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Conexión segura con un solo clic</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Interruptor de muerte</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Pasarelas privadas</p>
            </li>
          </ol>
          <CustomRadioGroup options={plans} />

          <div className='h-px bg-[#D9D9D9] my-[18px]'></div>
          <p className='text-xs'>Desde</p>
          <b className='text-2xl'>130$ USD</b>
          <div className='flex gap-2 mt-[22px] mb-[28px] md:w-full'>
            <Button type='primary' className='md:w-full md:justify-center'>
              <p className='font-medium text-base'>Comprar ahora</p>
              <ShoppingCart color='white' height={20} width={20} />
            </Button>
            <Button type='alternative' className='md:w-full md:justify-center'>
              <p className='font-medium'>Chat soporte</p>
              <SupportContact width={20} height={18} color='#00516b' />
            </Button>
          </div>
        </div>
      </main>
      <section className='p-5 bg-[#F4F8FA] md:pt-8 md:pb-16 lg:px-24'>
        <b className='text-xl text-center block md:text-2xl md:text-left'>
          Características principales
        </b>
        <div className='flex flex-wrap mt-6 justify-between items-baseline'>
          <SimpleCard
            imageSrc='/images/apps/nord-vpn/lock.png'
            title='Conexiones seguras'
          />
          <SimpleCard
            imageSrc='/images/apps/nord-vpn/recharge.png'
            title='Pasarelas privadas'
            type='secondary'
          />
          <SimpleCard
            imageSrc='/images/apps/nord-vpn/world.png'
            title='Pasarelas compartidas'
          />
          <SimpleCard
            imageSrc='/images/apps/nord-vpn/router.png'
            title='Conexión Automática'
            type='secondary'
          />
          <SimpleCard
            imageSrc='/images/apps/nord-vpn/person.png'
            title='Gestión de equipo'
          />
          <SimpleCard
            imageSrc='/images/apps/nord-vpn/shield.png'
            title='Conexión Encriptada'
            type='secondary'
          />
        </div>
      </section>
      <section className='flex flex-col gap-8 p-5 py-[60px] bg-white text-center md:py-20 md:flex-row md:gap-24 md:text-left md:items-center lg:px-24'>
        <div className='md:ml-[10%] md:w-1/2 md:leading-none'>
          <b className='block text-[24px] md:text-[40px] md:mb-3'>
            Alcance contenido en 33 países
          </b>
          <p className='md:text-[24px]'>
            Conéctate a miles de servidores compartidos en 33 países de todo el
            mundo. Elige entre más de 20 ubicaciones de servidores dedicados.
          </p>
        </div>
        <div className='w-full md:hidden'>
          <Image
            src={'/images/apps/nord-vpn/content-scope.webp'}
            alt='alcance de contenido'
            width={376}
            height={208}
            className='mx-auto md:w-full md:mx-0'
          />
        </div>
        <div className='hidden w-2/3 md:block'>
          <Image
            src={'/images/apps/nord-vpn/content-scope.webp'}
            alt='alcance de contenido'
            width={627}
            height={346}
            className='w-full'
          />
        </div>
      </section>
      <section className='px-5 py-11 md:py-44 bg-black'>
        <ol className='flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-8 xl:w-[70%] md:mx-auto'>
          {details.map((item, idx) => (
            <CardDetails
              title={item.title}
              description={item.description}
              key={idx}
            />
          ))}
        </ol>
      </section>
      <section className='py-[60px] bg-[#F4F8FA] md:pb-0'>
        <div className='px-5 md:px-0 md:flex md:flex-wrap md:w-[89%] md:justify-center md:mx-auto md:gap-4'>
          <div className='w-full flex flex-col items-center justify-end align-baseline relative order-1 md:w-[49%] md:order-1'>
            <div className='bg-[#E9F2F6] rounded-3xl absolute left-0 right-0 z-0 h-[216px] md:w-full md:h-[364px] md:top-auto'></div>
            <Image
              src={'/images/apps/nord-vpn/remote-access.webp'}
              alt='acceso remoto'
              width={320}
              height={204}
              className='relative z-10 w-[90%] mb-[51px] md:hidden'
            />
            <Image
              src={'/images/apps/nord-vpn/remote-access.webp'}
              alt='acceso remoto'
              width={536}
              height={342}
              className='relative z-10 w-[85%] hidden md:block md:mb-[87px]'
            />
          </div>
          <div className='w-full order-2 mt-8 mb-16 md:w-[49%] md:order-3 md:mt-8'>
            <b className='block text-2xl mb-3 md:w-[85%]'>Acceso remoto</b>
            <p className='text-xl opacity-50 md:w-[85%]'>
              Acceda cómodamente a los recursos de la empresa sobre la marcha.
              Ya sea que esté trabajando desde casa, en un espacio de trabajo
              compartido o en una conferencia, una VPN le permite acceder a
              todos los datos comerciales de forma segura.
            </p>
          </div>
          <div className='w-full flex flex-col items-center justify-end relative order-3 md:w-[49%] md:order-2'>
            <div className='bg-[#E9F2F6] rounded-3xl absolute left-0 right-0 z-0 h-[216px] md:h-[364px] md:left-0 md:right-0 md:top-auto'></div>
            <Image
              src={'/images/apps/nord-vpn/international-content.png'}
              alt='acceso remoto'
              width={154}
              height={272}
              className='relative z-10 mb-[51px] md:hidden'
            />
            <Image
              src={'/images/apps/nord-vpn/international-content.png'}
              alt='acceso remoto'
              width={258}
              height={456}
              className='z-10 hidden md:block md:mb-[87px]'
            />
          </div>
          <div className='w-full order-4 mt-8 md:w-[49%] md:order-4 md:mt-8'>
            <b className='block text-2xl mb-3 md:w-[85%]'>
              Contenido internacional, cifrado de vanguardia
            </b>
            <p className='text-xl opacity-50 md:w-[85%]'>
              Investigue y supervise los mercados extranjeros conectándose a
              servidores seguros disponibles en 33 países.
            </p>
            <br />
            <p className='text-xl opacity-50 md:w-[85%]'>
              Proteja los datos de sus dispositivos con un solo clic. NordVPN
              Teams cifra todo el tráfico de Internet con el cifrado AES de 256
              bits utilizado por los principales expertos en seguridad de todo
              el mundo.
            </p>
          </div>
        </div>

        <div className='flex flex-col text-center mx-5 gap-8 my-[60px] md:flex-row md:items-center md:justify-center md:mb-[60px] md:py-24 md:pr-20 md:w-[85%] md:leading-tight md:ml-auto md:text-left md:gap-20'>
          <b className='text-[24px] lg:text-[44px] md:w-1/2'>
            NordVPN una de las mejores opciones del mercado
          </b>
          <Image
            src='/images/apps/nord-vpn/youtube.webp'
            alt='nord vpn'
            width={373}
            height={206}
            className='w-full lg:max-w-[55%]'
          />
        </div>
        <SimCardGroup />
        <section className='mt-14 py-10 px-5 bg-white'>
          <b className='block mx-auto mb-11 text-center text-2xl md:text-[34px]'>
            Preguntas frecuentas
          </b>
          <div className='flex flex-col gap-4 md:w-3/4 md:mx-auto'>
            <Accordion title='¿Qué es una VPN?' />
            <Accordion title='¿Por qué es importante tener una VPN?' />
            <Accordion title='¿Por qué es importante tener una VPN?' />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
