'use client'
import Link from 'next/link'
import { UserAuthForm } from '../components/user-auth-form'
import LogoSaimCis from '@/components/logo-saim-cis'

export default function LoginAuth () {
  return (
    <div className='container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
        <img
          className='absolute inset-0 object-cover w-full h-full '
          src='https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Landing/login.webp'
          alt=''
        />
        <div className='absolute inset-0 bg-gray-900 bg-opacity-50'></div>
        <div>
          <Link
            className='relative z-20 inline-flex gap-2 items-center text-lg font-medium max-w-1/4'
            href='/'
          >
            <LogoSaimCis />
            Saim Cis
          </Link>
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg text-justify'>
              En Saim CIS, nos dedicamos a brindar atención médica de alta
              calidad y accesible a todos los habitantes de Honduras. Nuestra
              misión es mejorar la salud y el bienestar de nuestra comunidad a
              través de servicios médicos integrales, educación para la salud y
              programas de prevención. Creemos en un enfoque holístico para el
              cuidado de la salud, donde cada individuo reciba la atención
              personalizada que merece. Trabajamos incansablemente para asegurar
              que todos tengan acceso a los servicios médicos necesarios para
              una vida plena y saludable. ¡Únete a nosotros en nuestro
              compromiso de construir un futuro más saludable para todos!
            </p>
            <footer className='text-sm'>SAIM CIS</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Iniciar sesión
            </h1>
          </div>
          <UserAuthForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Al hacer clic en continuar, aceptas nuestros{' '}
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Términos de servicio
            </Link>{' '}
            y{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
