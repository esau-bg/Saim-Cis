'use client'

import LogoSaimCis from '@/components/logo-saim-cis'
import Link from 'next/link'

export default function Footer () {
  return (
    <>
      <footer className="bg-slate-100 dark:bg-gray-900" id="contacto">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
              Suscríbete para recibir actualizaciones.
              </h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input
                  id="email"
                  type="text"
                  className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-sec-var-400 dark:focus:border-sec-var-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-sec-var-300"
                  placeholder="Email Address"
                />

                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-700  md:w-auto md:mx-4 focus:outline-none bg-sec rounded-lg hover:bg-sec-var-600 dark:bg-sec focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                  Suscribirse
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Importante
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <Link
                  href="/nosotros"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-sec-var-400 hover:underline hover:text-sec"
                >
                  Nosotros
                </Link>
                <Link
                  href="/doctores"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-sec-var-400 hover:underline hover:text-sec"
                >
                  Doctores
                </Link>
                <Link
                  href="/servicios"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-sec-var-400 hover:underline hover:text-sec"
                >
                  Servicios
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Contáctenos
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <div className='flex flex-row'>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"></path>
                  </svg>
                  </div>
                  <div>
                  <p
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-sec-var-400 hover:text-sec cursor-default"
                  >
                  Teléfono: +504-9999-9999
                </p>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                    <path d="M21 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V5C23 3.89543 22.1046 3 21 3Z"></path>
                    <path d="M1 5L12 12L23 5"></path>
                  </svg>
                  </div>
                  <div>
                  <p
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-sec-var-400 hover:text-sec cursor-default"
                  >
                  Correo: saimcishon@gmail.com
                </p>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                    <path d="M52.708,20.849C52.708,8.185,44.584,0,32,0S11.292,8.185,11.292,20.849c0,10.556,16.311,31.747,18.175,34.118l2.278,2.928c-9.542,0.025-17.237,1.38-17.237,3.051c0,1.686,7.836,3.053,17.502,3.053s17.502-1.367,17.502-3.053c0-1.672-7.704-3.028-17.255-3.051l2.292-2.928C36.396,52.581,52.708,31.39,52.708,20.849z M25.294,20.835c0-3.604,3.002-6.526,6.706-6.526c3.704,0,6.706,2.922,6.706,6.526S35.704,27.361,32,27.361C28.296,27.361,25.294,24.439,25.294,20.835z"/>
                  </svg>
                  </div>
                  <div>
                  <p
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-sec-var-400 hover:text-sec cursor-default"
                  >
                  Dirección: Boulevard Suyapa, UNAH.
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

          <div className="flex items-center justify-between">
            <Link href='/'>
            <LogoSaimCis className=" cursor-pointer h-6 w-6"/>
            </Link>

            <div className="flex -mx-2">
              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-sec dark:hover:text-sec-var-400"
                aria-label="Reddit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 50 50"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"/></svg>
              </a>

              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-sec dark:hover:text-sec-var-400"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z"></path>
                </svg>
              </a>

              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-sec dark:hover:text-sec-var-400"
                aria-label="Github"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
