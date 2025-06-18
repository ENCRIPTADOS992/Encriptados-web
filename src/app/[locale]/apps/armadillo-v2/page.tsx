'use client';


import ShoppingCart from '@/shared/svgs/ShoppingCart';
import SupportContact from '@/shared/svgs/SupportContact';
import { Check, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Accordion from '../shared/Accordion';
import Button from '../shared/Button';
import CardDetails from '../shared/CardDetails';
import SimCardGroup from '../shared/SimCardGroup';
import Hero from './components/Hero';
import CustomRadioGroup from './components/RadioGroup';
import { details } from './consts/details';
import { plans } from './consts/plans';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById } from '@/features/products/services';
import type { ProductById } from '@/features/products/types/AllProductsResponse';
import TelegramButton from '@/shared/components/TelegramButton';

const prices: Record<string, string> = {
  '6': '349$ USD',
  '12': '595$ USD',
  '12.1': '1495$ USD'
};

const Page = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const productId = searchParams.get('productId');
  const selected = plan || plans[0].value;
  const [product, setProduct] = useState<ProductById | null>(null);


  useEffect(() => {
    if (productId) {
      getProductById(productId, 'es')
        .then(setProduct)
        .catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <Hero />
      <main className='p-5 bg-white tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='mx-auto mb-[50px] md:mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-[37%]'>
          {selected === plans[0]?.value && (
            <Image
              src='/images/apps/armadillo-v2/banner-6-months.jpg'
              alt='armadillo banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
          {selected === plans[1]?.value && (
            <Image
              src='/images/apps/armadillo-v2/banner-12-months.jpg'
              alt='armadillo banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
          {selected === plans[2]?.value && (
            <Image
              src='/images/apps/armadillo-v2/banner-6-months.jpg'
              alt='armadillo banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
        </div>
        <div className='md:w-2/4 lg:w-2/5 xl:w-1/3'>
          <b className='block text-2xl mb-3 text-[#131313] md:text-[28px]'>
            ARMADILLO
          </b>
          <p className='text-sm'>
            Un equipo ultra seguro a prueba de ataques y fácil de usar.
          </p>
          {Array.isArray(product?.checks) && product.checks.length > 0 ? (
            <ol className='my-4'>
              {product.checks.map((check, idx) => (
                <li key={idx} className='flex items-center gap-2'>
                  <Check width={28} height={28} color='#1C1B1F' />
                  <p>{check.name}</p>
                </li>
              ))}
            </ol>
          ): productId ? (
            <p className="text-sm text-gray-400 my-4">Cargando características...</p>
          ) : null}

          <CustomRadioGroup
            options={plans}
            initialSelected={selected}
            className='flex-wrap'
          />

          <div className='h-px bg-[#D9D9D9] my-[18px]'></div>
          <p className='text-xs'>Desde</p>
          <b className='text-2xl'>{prices[selected]}</b>
          <div className='flex gap-2 mt-[22px] mb-[28px] md:w-full'>
            <Button type='primary' className='md:w-full md:justify-center'>
              <p className='font-medium text-base'>Comprar ahora</p>
              <ShoppingCart color='white' height={20} width={20} />
            </Button>
            <TelegramButton />
            {/* <Button type='alternative' className='md:w-full md:justify-center'>
              <p className='font-medium'>Chat soporte</p>
              <SupportContact width={20} height={18} color='#00516b' />
            </Button> */}
          </div>
        </div>
      </main>

      <section className='lg:bg-[#F4F8FA] lg:px-[52px] xl:px-[84px] lg:py-[74px] overflow-hidden'>
        <div className='relative flex flex-col px-5 pt-20 bg-black lg:rounded-[44px] lg:flex-row-reverse lg:items-start lg:pt-[65px] lg:pb-[118px] xl:pl-9 xl:pr-[108px] xl:gap-3'>
          <div className='absolute z-0 h-[450px] w-[450px] bg-[#3fd3ff] rounded-[24px] left-[20%] top-[12%] blur-[114px] lg:left-auto lg:top-[35%] right-[13%] lg:h-[225px] lg:w:[225px]'></div>
          <div className='z-10 flex flex-col lg:w-11/12 xl:w-[71%]'>
            <b className='text-2xl text-center text-white mb-[28px] md:text-left md:text-[32px] lg:mb-11'>
              Nuestros dispositivos cuentan con programas y aplicaciones
              exclusivos
            </b>
            <ol className='flex flex-col gap-1 mb-[30px] lg:grid md:grid-cols-2 md:gap-[14px] md:mx-auto'>
              {details.map((item, idx) => (
                <CardDetails
                  title={item.title}
                  description={item.description}
                  descriptionClassName='xl:text-base'
                  key={idx}
                  icon={
                    <CheckCircle2
                      color='#6ADDFF'
                      width={28}
                      height={28}
                      className='min-w-[20px] min-h-[20px]'
                    />
                  }
                  className='h-max px-6 pt-6 pb-[34px] lg:h-full'
                />
              ))}
            </ol>
          </div>
          <picture className='relative h-[330px] overflow-hidden flex justify-center lg:h-auto lg:w-auto xl:px-[66px]'>
            <Image
              src='/images/apps/armadillo-v2/details.png'
              alt='armadillo-v2 details'
              width={541}
              height={807}
              className='absolute top-0 lg:hidden w-[335px]'
            />
            <Image
              src='/images/apps/armadillo-v2/details.png'
              alt='armadillo-v2 details'
              width={541}
              height={807}
              className='hidden lg:block'
            />
          </picture>
        </div>
      </section>

      <section className='flex flex-col items-center pt-11 px-5 bg-white md:pt-8 md:pb-0 lg:pl-24 lg:pr-20 lg:pt-11 lg:grid lg:grid-cols-2 lg:gap-x-4'>
        <div className='text-lg leading-tight mb-8 lg:ml-24 lg:text-[20px]'>
          <h4 className='text-[34px] leading-[41px] font-bold mb-[14px]'>
            Chat
          </h4>
          <b>Correo electrónico:</b>
          <p>Asegurado con cifrado PGP-N.</p>
          <br />
          <b>Descentralizado:</b>
          <p>
            No permitas que terceros controlen tus datos. Protégete con la red
            de comunicaciones incluida, o usa la tuya. Podemos suministrarte
            servidores privados, completamente bajo tu control.
          </p>
          <br />
          <p>
            Correo electrónico PGP cifrado: el correo electrónico utiliza
            asuntos aleatorios; utiliza una conexión cifrada para el servidor de
            claves y el servidor de correo; requiere claves PGP de 4096 bits.
          </p>
        </div>
        <figure className='relative w-[82%] lg:w-full lg:px-28 lg:self-end'>
          <div className='hidden absolute left-0 right-0 bottom-0 rounded-t-3xl h-2/3 z-0 bg-[#F4F8FA] lg:block'></div>
          <Image
            src='/images/apps/armadillo-v2/chat.png'
            alt='armadillo-v2 chat'
            width={377}
            height={497}
            className='relative mx-auto z-10'
          />
        </figure>
      </section>

      <section className='py-[60px] bg-[#F4F8FA] md:pb-0'>
        <div className='flex flex-col text-center mx-5 gap-8 mb-[60px] md:flex-row md:items-center md:justify-center md:mb-[60px] md:py-24 md:pr-20 md:w-[85%] md:leading-tight md:ml-auto md:text-left md:gap-20'>
          <b className='text-[24px] lg:text-[44px] md:w-5/6'>
            Teléfonos Seguros y Celulares Encriptados Que No Conoces ¿Cómo tener
            Uno?
          </b>
          <Image
            src='/images/apps/armadillo-v2/youtube.png'
            alt='armadillo youtube'
            width={627}
            height={346}
            className='w-full lg:max-w-[55%] rounded-[14px]'
          />
        </div>
        <SimCardGroup />
        <section className='mt-14 py-10 px-5 bg-white'>
          <b className='block mx-auto mb-11 text-center text-2xl md:text-[34px]'>
            Preguntas frecuentas
          </b>
          <div className='flex flex-col gap-4 md:w-3/4 md:mx-auto'>
            <Accordion
              title='¿Qué es el celular cifrado Armadillo Phone?'
              content='Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.'
            />
            <Accordion
              title='¿Dónde comprar Armadillo Phone Celular cifrado?'
              content='Puedes adquirir tu celular Armadillo Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.'
            />
            <Accordion
              title='¿Que es el cifrado OMEMO que utiliza Armadillo Phone?'
              content='OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.'
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
