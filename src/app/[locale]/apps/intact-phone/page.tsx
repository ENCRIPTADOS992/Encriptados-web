"use client";

import { useState } from 'react';
import ShoppingCart from '@/shared/svgs/ShoppingCart';
import SupportContact from '@/shared/svgs/SupportContact';
import { Check, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Accordion from '../shared/Accordion';
import Button from '../shared/Button';
import CardDetails from '../shared/CardDetails';
import CustomRadioGroup from '../shared/RadioGroup';
import SimCardGroup from '../shared/SimCardGroup';
import Hero from './components/Hero';
import { details } from './consts/details';
import { plans } from './consts/plans';

const prices: Record<string, string> = {
  '12.1': '150$ USD',
  '12.2': '1000$ USD',
  '12.3': '1100$ USD'
};

const Page = () => {
  const [selectedPlan, setSelectedPlan] = useState('12.1');

  return (
    <div>
      <Hero />
      <main className='p-5 bg-white tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='mx-auto mb-[50px] md:mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-[37%]'>
          <Image
            src='/images/apps/intact-phone/banner-3-months.jpg'
            alt='intact-phone banner'
            width={813}
            height={601}
            priority
            className='w-full'
          />
        </div>
        <div className='md:w-2/4 lg:w-2/5 xl:w-1/3'>
          <b className='block text-2xl mb-3 text-[#131313] md:text-[28px]'>
            INTACT PHONE
          </b>
          <p className='text-sm'>
            Seguridad completa desde el hardware hasta el sistema operativo para
            comunicaciones seguras.
          </p>
          <ol className='my-4'>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Llamadas de voz seguras</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Mensajería encriptada</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Envío de archivos adjuntos protegidos</p>
            </li>
          </ol>
          <CustomRadioGroup
            options={plans}
            flexDirection='column'
            value={selectedPlan}
            onChange={setSelectedPlan}
          />

          <div className='h-px bg-[#D9D9D9] my-[18px]'></div>
          <p className='text-xs'>Desde</p>
          <b className='text-2xl'>{prices[selectedPlan]}</b>
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
        <div className='relative flex flex-col px-5 pt-20 bg-black lg:rounded-[44px] lg:flex-row-reverse lg:items-start lg:pt-[65px] lg:pb-[118px] lg xl:px-[100px] lg:gap-[74px]'>
          <div className='absolute z-0 h-[450px] w-[450px] bg-[#3fd3ff] rounded-[24px] left-[20%] top-[15%] blur-[104px] lg:left-auto lg:top-[35%] right-[13%] lg:h-[225px] lg:w:[225px]'></div>
          <div className='z-10 flex flex-col lg:w-2/3 xl:w-[63%]'>
            <b className='text-2xl text-center text-white mb-[28px] md:text-left md:text-[28px]'>
              CommuniTake, la casa madre de Intact construye todo el hardware y
              software
            </b>
            <ol className='flex flex-col gap-4 mb-[30px] lg:grid md:grid-cols-2 md:gap-[14px] md:mx-auto'>
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
                  className='h-[180px] lg:h-[290px] lg:max-h-none'
                />
              ))}
            </ol>
          </div>
          <picture className='relative h-[350px] overflow-hidden flex justify-center lg:h-auto lg:w-auto'>
            <Image
              src='/images/apps/intact-phone/description.png'
              alt='intact-phone description'
              width={353}
              height={730}
              className='absolute top-0 lg:hidden'
            />
            <Image
              src='/images/apps/intact-phone/description.png'
              alt='intact-phone description'
              width={411}
              height={808}
              className='hidden lg:block'
            />
          </picture>
        </div>
      </section>

      <section className='py-[40px] pb-[60px] bg-[#F4F8FA] md:pb-0'>
        <div className='flex flex-col text-center mx-5 gap-8 mb-[60px] md:flex-row md:items-center md:justify-center md:mb-[60px] md:py-24 md:pr-20 md:w-[85%] md:leading-tight md:ml-auto md:text-left md:gap-20'>
          <b className='text-[24px] lg:text-[44px] md:w-1/2 lg:w-3/4'>
            Cómo Proteger mi Celular de Malware y Hackers para evitar
            Intervenciones 2023
          </b>
          <Image
            src='/images/apps/intact-phone/youtube.png'
            alt='intact-phone'
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
              title='¿Qué es y para qué sirve el celular IntactPhone?'
              content='Intactphone es un celular cifrado de grado militar con un hardware y software fuertes. No solo protege el dispositivo de ataques cibernéticos o brechas de seguridad sino contra situaciones ambientales como agua, caídas o golpes.'
            />
            <Accordion
              title='¿IntactPhone, cuál es el precio?'
              content='El precio del celular Intactphone varía de acuerdo a su modelo y licencia. Se puede adquirir en Encriptados.io desde un valor aproximado de $1000 USD.'
            />
            <Accordion
              title='¿IntactPhone, quién lo fabrica?'
              content='CommuniTake, la casa madre de Intact, manufactura completamente el dispositivo. Desde el hardware hasta el sistema operativo. Esto buscando prevenir la sustitución de código por parte de malintencionados y las brechas de información. Conócelo.'
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
