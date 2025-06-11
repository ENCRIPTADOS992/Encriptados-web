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


const prices: Record<string, string> = {
  '3': '425$ USD',
  '6': '825$ USD'
};


const Page = ({ searchParams }: { searchParams: { plan?: string } }) => {
  const selected = searchParams.plan || plans[0].value;

  return (
    <div>
      <Hero />
      <main className='p-5 bg-white tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='mx-auto mb-[50px] md:mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-[37%]'>
          {selected === plans[0]?.value && (
            <Image
              src='/images/apps/chat-mail/banner-3-months.jpg'
              alt='chat-mail banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
          {selected === plans[1]?.value && (
            <Image
              src='/images/apps/chat-mail/banner-6-months.jpg'
              alt='chat-mail banner'
              width={813}
              height={601}
              priority
              className='w-full'
            />
          )}
        </div>
        <div className='md:w-2/4 lg:w-2/5 xl:w-1/3'>
          <b className='block text-2xl mb-3 text-[#131313] md:text-[28px]'>
            CHATMAIL
          </b>
          <p className='text-sm'>
            Seguridad para tus comunicaciones con un sistema operativo versátil
            y seguro
          </p>
          <ol className='my-4'>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Mensajes cifrados con imágenes y voz</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Interfaz unificada</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Chats grupales cifrados</p>
            </li>
          </ol>
          <CustomRadioGroup options={plans} initialSelected={selected} />

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
        <div className='relative flex flex-col px-5 pt-20 bg-black lg:rounded-[44px] lg:flex-row-reverse lg:items-center lg:pt-[65px] lg:pb-[118px] lg xl:px-[108px] gap-5'>
          <div className='absolute z-0 h-[450px] w-[450px] bg-[#3fd3ff] rounded-[24px] left-[20%] top-[15%] blur-[144px] lg:left-auto lg:top-[35%] right-[13%] lg:h-[225px] lg:w:[225px]'></div>
          <div className='z-10 flex flex-col lg:w-2/3 xl:w-[55%]'>
            <b className='text-2xl text-center text-white mb-[28px] md:text-left md:text-[32px]'>
              Nuestros dispositivos cuentan con programas y aplicaciones
              exclusivos
            </b>
            <ol className='flex flex-col gap-4 mb-[30px] lg:grid md:grid-cols-2 md:gap-x-4 md:gap-y-8 md:mx-auto'>
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
          <picture className='relative h-[430px] overflow-hidden flex justify-center lg:h-auto lg:w-auto lg:px-12'>
            <Image
              src='/images/apps/chat-mail/details.png'
              alt='chat-mail details'
              width={272}
              height={582}
              className='absolute top-0 lg:hidden'
            />
            <Image
              src='/images/apps/chat-mail/details.png'
              alt='chat-mail details'
              width={356}
              height={764}
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
        <div className='flex flex-col text-center mx-5 gap-8 mb-[60px] md:flex-row md:items-center md:justify-center md:mb-[60px] md:py-24 md:pr-20 md:w-[85%] md:leading-tight md:ml-auto md:text-left md:gap-20'>
          <b className='text-[24px] lg:text-[44px] md:w-1/2'>
            Chatmail. Blinda tu celular, evita hackeos y protege tus
            comunicaciones
          </b>
          <Image
            src='/images/apps/chat-mail/youtube.png'
            alt='chat-mail'
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
              title='¿Es difícil usar un celular encriptado como ChatMail?'
              content='Contrario a lo que se cree, los celulares encriptados son bastante fáciles de usar. Cuentan con sistemas operativos intuitivos y amigables para que cualquier persona pueda manipularlos de forma sencilla y rápida.'
            />
            <Accordion
              title='¿Cómo funcionan los chat cifrados en ChatMail?'
              content='Puedes enviar textos, imágenes, notas de voz, videos o documentos de forma cifrada y segura. Además se pueden configurar tiempos para que esta información se elimine en ambos dispositivos sin dejar rastro. Toda la información estará segura.'
            />
            <Accordion
              title='¿Se puede hackear un celular encriptado?'
              content='Los celulares encriptados como ChatMail, están diseñados para ser impenetrables y cuentan con seguridad de grado militar que los hace imposibles de hackear. Nadie va a poder tener acceso a las comunicaciones que se emitan o reciban en un celular cifrado como ChatMail. Compruébalo y protege tus datos.'
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
