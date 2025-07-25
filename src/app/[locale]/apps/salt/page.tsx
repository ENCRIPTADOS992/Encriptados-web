'use client';

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
import DetailsElement from '../shared/DetailsElement';
import CustomRadioGroup from '../shared/RadioGroup';
import SimCardGroup from '../shared/SimCardGroup';
import Hero from './components/Hero';
import { characteristics } from './consts/characteristics';
import { details } from './consts/details';
import { plans } from './consts/plans';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById } from '@/features/products/services';
import type { ProductById } from '@/features/products/types/AllProductsResponse';
import TelegramButton from '@/shared/components/TelegramButton';


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
      <main className='p-5 bg-[#F4F8FA] tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='w-[85.5%] mx-auto mb-[50px] md:mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-1/3'>
          <Image
            src='/images/apps/salt/banner.png'
            alt='salt banner'
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
            Salt
          </b>
          <p className='text-sm'>
            Mantén seguras tus comunicaciones más sensibles con el mejor
            blindaje
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
          <CustomRadioGroup options={plans} />

          <div className='h-px bg-[#D9D9D9] my-[18px]'></div>
          <p className='text-xs'>Desde</p>
          <b className='text-2xl'>829$ USD</b>
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
        <div className='flex flex-col text-center mx-5 gap-8 mb-[60px] md:flex-row md:items-center md:justify-center md:mb-[60px] md:py-24 md:pr-20 md:w-[85%] md:leading-tight md:ml-auto md:text-left md:gap-20'>
          <b className='text-[24px] lg:text-[44px] md:w-1/2'>
            Diferencias entre una Aplicación Encriptada y Whatsapp
          </b>
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg lg:max-w-[55%]">
            <iframe
              src="https://www.youtube.com/embed/1tE2QDcycD4"
              title="Salt App Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
            />
          </div>

        </div>
        <SimCardGroup />
        <section className='mt-14 py-10 px-5 bg-white'>
          <b className='block mx-auto mb-11 text-center text-2xl md:text-[34px]'>
            Preguntas frecuentas
          </b>
          <div className='flex flex-col gap-4 md:w-3/4 md:mx-auto'>
            <Accordion title='¿Cómo funciona Salt?' />
            <Accordion title='¿Qué tan segura es la aplicación Salt?' />
            <Accordion title='¿Por qué mi empresa debería tener una aplicación como Salt?' />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
