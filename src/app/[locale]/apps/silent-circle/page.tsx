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
import { details } from './consts/details';
import { characteristics } from './consts/characteristics';

const Page = () => {
  return (
    <div>
      <Hero />
      <main className='p-5 bg-[#F4F8FA] tracking-wide md:flex md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16 md:bg-white'>
        <div className='w-[85.5%] mx-auto mb-[50px] mt-9 md:w-2/4 lg:w-2/5 md:mx-0 xl:w-1/3'>
          <Image
            src='/images/apps/silent-circle/banner.png'
            alt='silent circle'
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
            Silent Phone
          </b>
          <p className='text-sm'>
            Es una app diseñada por las mejores mentes en tecnología móvil,
            centrado en mantener tus datos seguros en todo momento
          </p>
          <ol className='my-4'>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Llamadas cifradas</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Sin permisos de ubicación</p>
            </li>
            <li className='flex items-center gap-2'>
              <Check width={28} height={28} color='#1C1B1F' />
              <p>Mensajes temporizados</p>
            </li>
          </ol>
          <CustomRadioGroup options={characteristics} />
          <div className='h-px bg-[#D9D9D9] my-[18px]'></div>
          <p className='text-xs'>Desde</p>
          <b className='text-2xl'>99$ USD</b>
          <div className='flex gap-2 mt-[22px] mb-[28px] md:w-full'>
            <Button type='primary' className='md:w-full md:justify-center'>
              <p className='font-medium'>Comprar ahora</p>
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
          <DetailsElement
            title='Mensajes con autodestrucción'
            description='Los mensajes se eliminan de los dispositivos automaticamente de envío y recepción después de un «tiempo de grabación». Tú puedes elegir este tiempo: De un minuto a 90 días.'
            imageAlt='mensajes con autodestrucción'
            imageSrc='/images/apps/silent-circle/self-destructing-messages.png'
            imageWidth={200}
            imageHeight={290}
          />
          <DetailsElement
            title='Notas de voz encriptadas'
            description='Notas de voz con la capacidad de grabar y proporcionar una alternativa segura al correo de voz.'
            imageAlt='notas de voz encriptadas'
            imageSrc='/images/apps/silent-circle/encrypted-voice-notes.png'
            imageWidth={180}
            imageHeight={260}
          />
          <DetailsElement
            title='Mensajes seguros'
            description='El cifrado asegura que solo el dispositivo receptor pueda interpretar las comunicaciones desde el momento de presionar "ENVIAR". El remitente puede verificar si el mensaje fue recibido y leído.'
            imageAlt='mensajes seguros'
            imageSrc='/images/apps/silent-circle/secure-messages.png'
            imageWidth={220}
            imageHeight={180}
            imageCenter
          />
          <DetailsElement
            title='Archivos y documentos'
            description={
              <>
                Uso compartido de archivos cifrados… envía hasta 100 MB de forma
                segura. <br /> Mensajería grupal… Envía archivos y mensajes a
                grupos de usuarios sin problemas
              </>
            }
            imageSrc='/images/apps/silent-circle/files-and-documents.png'
            imageAlt='archivos y documentos'
            imageWidth={220}
            imageHeight={180}
            imageCenter
          />
        </div>
      </section>
      <section className=' bg-black px-5 py-11 md:py-44'>
        <ol className='flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-8 xl:w-[70%] md:mx-auto'>
          {details.map((item, idx) => (
            <CardDetails title={item} key={idx} />
          ))}
        </ol>
      </section>
      <section className='py-[60px] bg-[#F4F8FA] md:pt-0 md:pb-0'>
        <div className='relative flex justify-center w-full mb-12 bg-black'>
          <Image
            alt='cobertura'
            src='/images/apps/silent-circle/world-coverage-mobile.webp'
            width={414}
            height={358}
            className='w-full md:hidden'
          />
          <Image
            alt='cobertura'
            src='/images/apps/silent-circle/world-coverage-desktop.png'
            width={1440}
            height={665}
            className='w-full hidden md:block'
          />
          <div className='hidden md:block absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black from-25% to-[#415D8200] to-80%'></div>

          <div className='absolute flex flex-col gap-2 h-full justify-center text-white text-center mx-20 md:left-0 md:ml-48 md:text-left z-20'>
            <b className='text-[28px] md:text-[54px] w-3/5'>
              <span className='text-[#35CDFB]'>Cobertura en</span> más de 200
              países
            </b>
            <p className='text-xl font-normal md:text-[26px]'>
              Comunicación segura y sin fronteras
            </p>
          </div>
        </div>
        <SimCardGroup />
        <section className='mt-14 py-10 px-5 bg-white'>
          <b className='block mx-auto mb-11 text-center text-2xl md:text-[34px]'>
            Preguntas frecuentas
          </b>
          <div className='flex flex-col gap-4 md:w-3/4 md:mx-auto'>
            <Accordion title='¿Qué tan segura es la aplicación Silent Phone - Silent Circle?' />
            <Accordion title='¿En qué celular puedo instalar la aplicación Silent Phone de Silent Circle?' />
            <Accordion title='¿En qué celular puedo instalar la aplicación Silent Circle?' />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
