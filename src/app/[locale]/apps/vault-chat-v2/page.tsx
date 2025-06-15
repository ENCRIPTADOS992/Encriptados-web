'use client';

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
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById } from '@/features/products/services';
import type { ProductById } from '@/features/products/types/AllProductsResponse';


const prices: Record<string, string> = {
  '3': '415$ USD',
  '6': '700$ USD'
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
              src='/images/apps/vault-chat-v2/banner-6-months.jpg'
              alt='vault-chat banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
          {selected === plans[1]?.value && (
            <Image
              src='/images/apps/vault-chat-v2/banner-12-months.jpg'
              alt='vault-chat banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
          {selected === plans[2]?.value && (
            <Image
              src='/images/apps/vault-chat-v2/banner-6-months.jpg'
              alt='vault-chat banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
        </div>
        <div className='md:w-2/4 lg:w-2/5 xl:w-1/3'>
          <b className='block text-2xl mb-3 text-[#131313] md:text-[28px]'>
            VAULTCHAT
          </b>
          <p className='text-sm'>
            Comunicación y servidores totalmente cifrados. Todo desarrollado en
            una interfaz moderna.
          </p>
          {Array.isArray(product?.checks) && product.checks.length > 0 ? (
            <ol className='my-4'>
              {product.checks.map((check: { name: string }, idx: number) => (
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
            <ol className='flex flex-col gap-1 mb-[30px] lg:grid md:grid-cols-2 md:gap-3 md:mx-auto'>
              {details.map((item, idx) => (
                <CardDetails
                  title={item.title}
                  description={item.description}
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
          <picture className='relative h-[346px] overflow-hidden flex justify-center lg:h-auto lg:w-auto lg:pr-12'>
            <Image
              src='/images/apps/vault-chat-v2/encrypted-mails.png'
              alt='vault-chat details'
              width={410}
              height={800}
              className='absolute top-0 lg:relative lg:top-auto'
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
            VaultChat: Aplicación para comunicaciones encriptadas y privadas
          </b>
          <Image
            src='/images/apps/vault-chat-v2/youtube.png'
            alt='vault-chat'
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
              title='¿Cómo funciona el chat cifrado en el celular encriptado VaultChat?'
              content='El chat cifrado de vault chat implementa el sistema de grado militar OMEMO / ECC / AES256. Ningún mensaje puede ser leído en nuestro servidor por nadie en ningún momento'
            />
            <Accordion
              title='¿Qué es el correo PGP que usa el celular encriptado VaultChat?'
              content='PGP es uno de los programas más utilizados para cifrar y descifrar correos electrónicos que significa Pretty Good Privacy (PGP privacidad bastante buena). Todos los correos electrónicos no se almacenan en nuestro servidor y las claves de cifrado se generan en tu dispositivo.'
            />
            <Accordion
              title='¿Cuánto tiempo debo renovar mi licencia de VaultChat?'
              content='Dependiendo de la licencia adquirida, esta debe ser renovada cada 3, 6 o 12 meses. Conoce todas las licencias disponibles de VaultChat'
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
