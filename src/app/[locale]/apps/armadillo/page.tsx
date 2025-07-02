'use client';

import { useEffect,useState } from 'react';
import AppStoreFooter from '@/shared/FooterEncrypted/icon/AppStoreFooter';
import DownloadApkSvg from '@/shared/svgs/DownloadApkSvg';
import PlayStoreSvg from '@/shared/svgs/PlayStoreSvg';
import ShoppingCart from '@/shared/svgs/ShoppingCart';
import SupportContact from '@/shared/svgs/SupportContact';
import { Check, ChevronDown } from 'lucide-react';
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
import { plans, plansDesktop } from './consts/plans';
import { useSearchParams } from 'next/navigation';
import { getProductById } from '@/features/products/services';
import type { ProductById } from '@/features/products/types/AllProductsResponse';
import TelegramButton from '@/shared/components/TelegramButton';


const prices: Record<string, number> = {
  '1': 15,
  '6': 75,
  '12': 125
};

const Page = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState<ProductById | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('1');

  const faqs = [
    {
      question: '¿Qué es el celular cifrado Armadillo Phone?',
      answer: 'Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.',
    },
    {
      question: '¿Dónde comprar Armadillo Phone Celular cifrado?',
      answer: 'Puedes adquirir tu celular Armadillo Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.',
    },
    {
      question: '¿Qué es el cifrado OMEMO que utiliza Armadillo Phone?',
      answer: 'OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa, lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.',
    },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  useEffect(() => {
    if (productId) {
      getProductById(productId, 'es').then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <Hero />
      <main className='p-5 bg-[#F4F8FA] tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='w-[85.5%] mx-auto mb-[50px] mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-1/3'>
          <Image
            src='/images/apps/armadillo/banner.png'
            alt='armadillo banner'
            width={320}
            height={251}
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
            Armadillo
          </b>
          <p className='text-sm'>
            Aplicación de mensajería instantánea de alta seguridad que respeta
            tu privacidad
          </p>
          {product?.checks ? (
            <ol className='my-4'>
              {product.checks.map((check, idx) => (
                <li key={idx} className='flex items-center gap-2'>
                  <Check width={28} height={28} color='#1C1B1F' />
                  <p>{check.name}</p>
                </li>
              ))}
            </ol>
          ): (
            <p className="text-sm text-gray-400 my-4">Cargando características...</p>
          )}
           <CustomRadioGroup
            options={plans}
            className='md:hidden'
            defaultValue={selectedPlan}
            onChange={setSelectedPlan}
          />

          {/* Desktop */}
          <CustomRadioGroup
            options={plansDesktop}
            className='hidden md:flex flex-wrap'
            defaultValue={selectedPlan}
            onChange={setSelectedPlan}
          />

          <div className='h-px bg-[#D9D9D9] my-[18px]'></div>
          <p className='text-xs'>Desde</p>
          <b className='text-2xl'>{prices[selectedPlan]}$ USD</b>
          <div className='flex gap-2 mt-[22px] mb-[28px] md:w-full'>
            <Button type='primary' className='md:w-full md:justify-center'>
              <p className='font-medium'>Comprar ahora</p>
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
      <section className='py-[60px] bg-[#F4F8FA] md:pt-0 md:pb-0'>
        <div className='flex flex-col text-center mx-5 gap-8 mb-[60px] md:flex-row md:items-center md:justify-center md:mb-[60px] md:py-24 md:pr-20 md:w-[85%] md:leading-tight md:ml-auto md:text-left md:gap-20'>
          <b className='text-[24px] lg:text-[44px] md:w-1/2'>
            Armadillo Chat. Aplicación de mensajería instantánea de alta
            seguridad
          </b>
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg lg:max-w-[55%]">
            <iframe
              src="https://www.youtube.com/embed/-h92Hqn-hQM"
              title="Armadillo Chat Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
        <SimCardGroup />
        {/* Sección de FAQ integrada */}
      <section className='mt-14 py-10 px-5 bg-white'>
        <b className='block mx-auto mb-11 text-center text-2xl md:text-[34px]'>
          Preguntas frecuentes
        </b>
        <div className='flex flex-col gap-4 md:w-3/4 md:mx-auto'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='bg-[#F9F9F9] rounded-xl px-6 py-4 cursor-pointer'
              onClick={() => toggleFaq(index)}
            >
              <div className='flex items-center justify-between'>
                <h3 className='text-black font-medium text-base'>
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-black transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {openFaq === index && (
                <p className='text-gray-600 text-sm mt-4'>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      </section>
    </div>
  );
};

export default Page;
