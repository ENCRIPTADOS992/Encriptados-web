import AppStoreFooter from '@/shared/FooterEncrypted/icon/AppStoreFooter';
import DownloadApkSvg from '@/shared/svgs/DownloadApkSvg';
import PlayStoreSvg from '@/shared/svgs/PlayStoreSvg';
import ShoppingCart from '@/shared/svgs/ShoppingCart';
import SupportContact from '@/shared/svgs/SupportContact';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Accordion from '../shared/Accordion';
import Button from '../shared/Button';
import DetailsElement from '../shared/DetailsElement';
import CustomRadioGroup from '../shared/RadioGroup';
import SimCardGroup from '../shared/SimCardGroup';
import Hero from './components/Hero';
import { characteristics } from './consts/characteristics';
import { plans } from './consts/plans';
import CardDetails from '../shared/CardDetails';
import { details } from './consts/details';

const Page = () => {
  return (
    <div>
      <Hero />
      <main className='p-5 bg-[#F4F8FA] tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='w-[85.5%] mx-auto mb-[50px] md:mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-1/3'>
          <Image
            src='/images/apps/vnc-lagoon/banner.webp'
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
            VNC Lagoon
          </b>
          <p className='text-sm'>
            Cifrado de extremo a extremo para la máxima privacidad y secreto en
            sus comunicaciones.
          </p>
          <ol className='my-4'>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Videoconferencias seguras</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Edición colaborativa de documentos</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Mensajería segura</p>
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
        <div className='md:flex gap-4'>
          {characteristics.map((item, idx) => (
            <DetailsElement
              key={idx}
              title={item.title}
              description={item.description}
              imageAlt={item.imageAlt}
              imageSrc={item.imageSrc}
              imageWidth={item.imageWidth}
              imageHeight={item.imageHeight}
              imageCenter={item.imageCenter}
              background={item.background}
            />
          ))}
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
              src={'/images/apps/vnc-lagoon/web-app.webp'}
              alt='acceso remoto'
              width={320}
              height={204}
              className='relative z-10 w-[90%] mb-[51px] md:hidden'
            />
            <Image
              src={'/images/apps/vnc-lagoon/web-app.webp'}
              alt='acceso remoto'
              width={536}
              height={342}
              className='relative z-10 w-[85%] hidden md:block md:mb-[87px]'
            />
          </div>
          <div className='w-full order-2 mt-8 mb-16 md:w-[49%] md:order-3 md:mt-8'>
            <b className='block text-2xl mb-3 md:w-[85%]'>
              Aplicación Web VNC Talk
            </b>
            <p className='text-xl opacity-50 md:w-[85%]'>
              VNCtalk Web Client le permite acceder a todas las funciones de
              comunicación profesional de VNCtalk, como chat, conferencias de
              audio y video, en el mismo navegador estándar que VNCmail o
              VNCproject. Por lo tanto, ingresa a todo su espacio de trabajo con
              su navegador, sin tener que iniciar aplicaciones separadas para
              cada actividad que le gustaría realizar. VNCtalk Web Client se
              ejecuta en cualquier navegador estándar en Windows, MacOS y Linux.
            </p>
          </div>
          <div className='w-full flex flex-col items-center justify-end relative order-3 md:w-[49%] md:order-2'>
            <div className='bg-[#E9F2F6] rounded-3xl absolute left-0 right-0 z-0 h-[216px] md:h-[364px] md:left-0 md:right-0 md:top-auto'></div>
            <Image
              src={'/images/apps/vnc-lagoon/desktop-app.webp'}
              alt='acceso remoto'
              width={320}
              height={204}
              className='relative z-10 w-[90%] mb-[51px] md:hidden'
            />
            <Image
              src={'/images/apps/vnc-lagoon/desktop-app.webp'}
              alt='acceso remoto'
              width={536}
              height={342}
              className='relative z-10 w-[85%] hidden md:block md:mb-[87px]'
            />
          </div>
          <div className='w-full order-4 mt-8 md:w-[49%] md:order-4 md:mt-8'>
            <b className='block text-2xl mb-3 md:w-[85%]'>
              Aplicación de escritorio VNC Talk
            </b>
            <p className='text-xl opacity-50 md:w-[85%]'>
              VNCtalk Desktop Client le permite ejecutar VNCtalk como una
              aplicación separada en su PC de escritorio, en Windows, Mac y
              Linux. Especialmente cuando se trabaja con muchas pestañas
              abiertas del navegador, resulta útil tener puntos de acceso
              separados para sus chats, videoconferencias y VNCpads. Y, por
              supuesto, tiene todas las funciones de VNCtalk disponibles en
              cualquiera de nuestros clientes frontend.
            </p>
          </div>
        </div>

        <div className='flex flex-col text-center mx-5 gap-8 my-[60px] md:flex-row md:items-center md:justify-center md:mb-[60px] md:py-24 md:pr-20 md:w-[85%] md:leading-tight md:ml-auto md:text-left md:gap-20'>
          <b className='text-[24px] lg:text-[44px] md:w-1/2'>
            Cuál es el sistema ideal para ti? Quieres seguir usando tu celular
            personal?
          </b>
          <Image
            src='/images/apps/vnc-lagoon/youtube.webp'
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
            <Accordion title='¿Qué es VNC?' />
            <Accordion title='¿Cómo funciona VNC Lagoon?' />
            <Accordion title='¿Qué compatibilidad tiene VNC Lagoon?' />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
