'use client'
import LogoSaimCis from '@/components/logo-saim-cis'
import React, { useEffect, useState } from 'react'
import { UserCircleIcon, UsersIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid'
import { logoutUser } from '@/lib/actions'
import { usePathname, useRouter } from 'next/navigation'
import { CiLogout } from 'react-icons/ci'
import Link from 'next/link'
import { ModeToggle } from '../../../../components/theme-toggle'

const navigation = [
  { name: 'Perfil', href: '/enfermero', current: true, icono: UserCircleIcon },
  { name: 'Pacientes', href: '/enfermero/pacientes', current: false, icono: UsersIcon }
]

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function SidebarEnfermeroClient ({ user }: { user: UserType }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarFixed, setIsSidebarFixed] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push('/')
  }

  function toggleSidebar () {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const [isUserMainOpen, setIsUsernameOpen] = useState(false)
  const toggleUserMain = () => {
    setIsUsernameOpen(!isUserMainOpen)
  }
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarFixed(window.innerWidth > 768) // Cambiar a false si el ancho es menor que 768px
    }

    handleResize() // Llamar al inicio para establecer el estado inicial

    window.addEventListener('resize', handleResize) // Escuchar cambios en el tamaño de la ventana

    return () => {
      window.removeEventListener('resize', handleResize) // Limpiar el listener al desmontar el componente
    }
  }, [])

  return (
    <>
      <nav className='fixed top-0 z-50 w-screen bg-neutral-100 dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700'>
        <div className='px-3 py-2 lg:px-5 lg:pl-3 w-full'>
          <div className='flex items-center justify-between'>
            {!isSidebarFixed && (<div className='flex items-center justify-start rtl:justify-end'>
              <button
                onClick={toggleSidebar}
                type='button'
                className='text-gray-600 inline-flex items-center p-2 text-sm rounded-lg sm:hidden dark:hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-slate-700 dark:focus:ring-gray-600'>
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'></path>
                </svg>
              </button>
            </div>)}
            <div
              className={isSidebarFixed ? 'justify-self-start' : 'justify-self-center'}>
              <a href='/' className='flex ms-2 md:me-24 gap-2'>
                <LogoSaimCis className='w-8 h-8 rounded-full text-cyan-600' />
                <span className='text-gray-800 self-center text-xl font-medium sm:text-2xl whitespace-nowrap dark:text-neutral-100'>
                  Saim Cis
                </span>
              </a>
            </div>
            <div className='flex items-center'>
              <div className='flex gap-2 items-center mr-3'>
              <ModeToggle />
                <div>
                  {user ? (
                    <button
                      type='button'
                      className='relative flex rounded-full bg-neutral-200 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-300 dark:focus:ring-offset-gray-700'
                      aria-expanded={isUserMainOpen}
                      onClick={toggleUserMain}
                      aria-controls='dropdown-user'>
                      <span className='sr-only'>Open user menu</span>
                      {user?.usuario.avatar_url ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={user?.usuario.avatar_url}
                          alt={`Foto de perfil de ${user?.nombre}`}
                        />
                      ) : (
                        <span className="h-8 w-8 rounded-full flex justify-center items-center ">
                          {user?.nombre?.charAt(0).toUpperCase() +
                            user?.apellido?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </button>
                  ) : (
                    <Link className="hover:text-blue-500" href="/login">Iniciar sesión</Link>
                  )}
                </div>
                {isUserMainOpen && (
                  <div
                    className='z-50 absolute top-14 right-1 list-none mt-1 w-48 origin-top-right rounded-md bg-neutral-100 dark:bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    id='dropdown-user'
                    onClick={() => { setIsUsernameOpen(false) }}>
                    <div className="flex flex-col gap-1 p-4 border-b border-neutral-100 dark:border-slate-800">
                      <span className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                        Iniciaste con:
                      </span>
                      <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                        {user?.usuario.correo}
                      </span>
                    </div>
                    <ul className='py-1'>
                      {user?.role.length ? user?.role.length > 0 ? (
                        user?.role.map((rol, index) => (
                          <li key={index}>
                            <Link
                              href={`/${rol.rol.toLowerCase()}`}
                              className={classNames(
                                rol.rol.toLowerCase() === pathname.split('/')[1] ? 'bg-neutral-200 dark:bg-slate-800 pointer-events-none' : '',
                                'block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start hover:bg-neutral-200 dark:hover:bg-slate-800'
                              )}
                              aria-current={rol.rol.toLowerCase() === pathname.split('/')[1] ? 'page' : undefined}
                            >
                              Perfil de {rol.rol}
                            </Link>
                          </li>))
                      ) : (
                        <span className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start">
                          No hay roles asignados
                        </span>
                      ) : (
                        <span className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start">
                          No hay roles asignados
                        </span>
                      )}
                      <li>
                        <Link
                          href="/administrador/perfil"
                          className='block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start hover:bg-neutral-200 dark:hover:bg-slate-800'
                        >
                          Editar perfil
                        </Link>
                      </li>
                      <li className='pt-1 border-t border-neutral-100 dark:border-slate-800'>
                        <button
                          onClick={handleLogout}
                          className='flex gap-1 justify-center px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start hover:bg-neutral-200 dark:hover:bg-slate-800'
                        >
                          <CiLogout className='self-center size-3'/>
                          <p>Cerrar sesión</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id='logo-sidebar'
        className={`min-h-screen overflow-hidden border-r hover:w-64 fixed top-0 left-0 z-40 h-screen transition-all duration-700 bg-neutral-100  border-gray-200 sm:translate-x-0 dark:bg-slate-900 dark:border-gray-700 ${
          isSidebarOpen ? 'translate-x-0 min-w-64' : '-translate-x-full w-[3.35rem]'
        } ${
          isSidebarFixed ? 'pt-12' : 'pt-14'
        }`}
        aria-label='Sidebar'>
        <div
          className='flex flex-col justify-between sidebar h-full  bg-neutral-100 dark:bg-slate-900 hover:shadow-lg'>
          <div className='flex flex-col justify-between pt-2 pb-6 h-full'>
            <div className='w-full'>
              <ul className='tracking-wide'>
                {
                  navigation.map((item) => {
                    return (
                      <li className='min-w-max' key={item.name}>
                        <a
                          href={item.href}
                          aria-label='dashboard'
                          className={
                            classNames(
                              pathname === item.href
                                ? 'bg-gradient-to-r from-sec to-cyan-400 text-white'
                                : 'text-gray-800 dark:text-gray-200 hover:bg-neutral-200 dark:hover:bg-slate-800  hover:text-black dark:hover:text-white hover:transition-colors hover:duration-200',
                              'relative flex items-center space-x-5 px-5 py-3 transition-colors duration-1000 w-full'
                            )}
                          aria-current={pathname === item.href ? 'page' : undefined}
                        >
                          <item.icono className='-ml-1 h-5 w-5'/>
                          <span className='-mr-1 font-medium'>
                            {item.name}
                          </span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className='w-max -mb-3'>
              <button
                onClick={handleLogout}
                className='text-gray-800 dark:text-gray-300 hover:text-sec dark:hover:text-sec flex items-center space-x-4 rounded-md px-4 py-3'>
                <ArrowLeftStartOnRectangleIcon className='size-5'/>
                <span className='font-light'>
                  Cerrar Sesión
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
