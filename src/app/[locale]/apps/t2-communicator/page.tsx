import ShoppingCart from '@/shared/svgs/ShoppingCart';
import SupportContact from '@/shared/svgs/SupportContact';
import { Check, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Accordion from '../shared/Accordion';
import Button from '../shared/Button';
import CardDetails from '../shared/CardDetails';
import DetailsElement from '../shared/DetailsElement';
import SimCardGroup from '../shared/SimCardGroup';
import Hero from './components/Hero';
import CustomRadioGroup from './components/RadioGroup';
import { characteristics } from './consts/characteristics';
import { details } from './consts/details';
import { plans } from './consts/plans';

const Page = ({ searchParams }: { searchParams: { plan?: string } }) => {
  const selected = searchParams.plan || plans[0].value;

  return (
    <div>
      <Hero />
      <main className='p-5 bg-white tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='mx-auto mb-[50px] md:mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-[37%]'>
          {selected === plans[0]?.value && (
            <Image
              src='/images/apps/t2-communicator/banner-3-months.jpg'
              alt='t2-communicator banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
          {selected === plans[1]?.value && (
            <Image
              src='/images/apps/t2-communicator/banner-3-months.jpg'
              alt='t2-communicator banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
          {selected === plans[2]?.value && (
            <Image
              src='/images/apps/t2-communicator/banner-6-months.jpg'
              alt='t2-communicator banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
        </div>
        <div className='md:w-2/4 lg:w-2/5 xl:w-1/3'>
          <b className='block text-2xl mb-3 text-[#131313] md:text-[28px]'>
            T2 COMMUNICATOR
          </b>
          <p className='text-sm'>
            Un celular encriptado con tecnología blockchain para comunicaciones
            seguras
          </p>
          <ol className='my-4'>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Sistema operativo seguro</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Aplicaciones blockchain</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Borrado remoto y botón de pánico</p>
            </li>
          </ol>
          <CustomRadioGroup
            options={plans}
            initialSelected={selected}
            className='flex-wrap'
          />

          <div className='h-px bg-[#D9D9D9] my-[18px]'></div>
          <p className='text-xs'>Desde</p>
          <b className='text-2xl'>439$ USD</b>
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

      <section className='lg:bg-[#F4F8FA] lg:px-[52px] xl:px-[84px] lg:py-[74px] overflow-hidden'>
        <div className='relative flex flex-col px-5 pt-20 bg-black lg:rounded-[44px] lg:flex-row-reverse lg:items-start lg:pt-[65px] lg:pb-[118px] xl:px-[108px] lg:gap-2'>
          <div className='absolute z-0 h-[450px] w-[450px] bg-[#3fd3ff] rounded-[24px] left-[20%] top-[15%] blur-[144px] lg:left-auto lg:top-[35%] right-[13%] lg:h-[225px] lg:w:[225px]'></div>
          <div className='z-10 flex flex-col lg:w-2/3 xl:w-[60%]'>
            <b className='text-2xl text-center text-white mb-[28px] md:text-left md:text-[32px]'>
              Nuestros dispositivos cuentan con programas y aplicaciones
              exclusivos
            </b>
            <ol className='flex flex-col gap-1 mb-[30px] lg:grid md:grid-cols-2 md:gap-[14px] md:mx-auto'>
              {details.map((item, idx) => (
                <CardDetails
                  title={item.title}
                  description={item.description}
                  descriptionClassName='lg:text-base'
                  key={idx}
                  icon={
                    <CheckCircle2
                      color='#6ADDFF'
                      width={28}
                      height={28}
                      className='min-w-[20px] min-h-[20px]'
                    />
                  }
                  className='h-[237px] max-h-[270px] lg:h-[290px] lg:max-h-none'
                />
              ))}
            </ol>
          </div>
          <picture className='relative h-[340px] overflow-hidden mt-24 flex justify-center lg:mt-0 lg:h-auto lg:w-auto lg:pr-12'>
            <Image
              src='/images/apps/t2-communicator/keys-admin.png'
              alt='t2-communicator details'
              width={340}
              height={750}
              className='absolute top-0 lg:hidden'
            />
            <Image
              src='/images/apps/t2-communicator/keys-admin.png'
              alt='t2-communicator details'
              width={415}
              height={807}
              className='hidden lg:block'
            />
          </picture>
        </div>
      </section>

      <section className='pt-11 p-5 bg-[#F4F8FA] md:pt-8 md:pb-16 lg:px-24 '>
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

      <section className='py-[40px] pb-[60px] bg-[#F4F8FA] md:pb-0'>
        <div className='flex flex-col text-center mx-5 gap-8 mb-[60px] md:flex-row md:items-center md:justify-end md:mb-[60px] md:py-24 md:pr-10 md:w-[90%] md:leading-tight md:ml-auto md:text-left md:gap-16'>
          <b className='text-[24px] lg:text-[44px] md:w-2/5'>
            Celular Encriptado 5 razones para tener uno
          </b>
          <Image
            src='/images/apps/t2-communicator/youtube.png'
            alt='t2-communicator'
            width={627}
            height={346}
            className='w-full lg:max-w-[51%] rounded-[14px]'
          />
        </div>
        <SimCardGroup />
        <section className='mt-14 py-10 px-5 bg-white'>
          <b className='block mx-auto mb-11 text-center text-2xl md:text-[34px]'>
            Preguntas frecuentas
          </b>
          <div className='flex flex-col gap-4 md:w-3/4 md:mx-auto'>
            <Accordion
              title='¿Cómo se hace la encriptación de un celular?'
              content='Al encriptar el celular, se reemplaza el sistema operativo original por uno encriptado de grado militar, con características especiales como chats cifrados, llamadas seguras, destrucción remota entre otras que puedes conocer en encriptados.io'
            />
            <Accordion
              title='¿Qué funcionalidades voy a tener al encriptar mi celular?'
              content='Además de la seguridad y privacidad que ofrece un celular encriptado se tendrán funcionalidades como chats cifrados, borrado remoto, mail cifrado, mensajes temporizados, baúl en la nube y múltiples aplicaciones cifradas.'
            />
            <Accordion
              title='¿Cómo funciona el borrado remoto en un celular encriptado?'
              content='En caso de perder el teléfono o ser víctima de robo, se podrá enviar una combinación predeterminada de caracteres al propio chat para eliminar toda la información del celular. En otros casos se podrá hacer contactando al proveedor de la licencia.'
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
