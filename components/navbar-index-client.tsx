'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ModeToggle } from '@/components/theme-toggle'
import { logoutUser } from '@/lib/actions'

import LogoSaimCis from '@/components/logo-saim-cis'
import { usePathname, useRouter } from 'next/navigation'

const navigation = [
  { name: 'Inicio', href: '/', current: true },
  { name: 'Nosotros', href: '/nosotros', current: false },
  { name: 'Servicios', href: '/servicios', current: false },
  { name: 'Doctores', href: '/doctores', current: false },
  { name: 'Contacto', href: '#contacto', current: false }
]

function classNames (...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarIndexClient ({ user }: { user: UserType }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push('/')
  }

  return (
    <Disclosure className="bg-white dark:bg-gray-900 border-b border-slate-100 dark:border-gray-800" as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir el menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link className="flex flex-shrink-0 items-center" href='/'>
                  <LogoSaimCis />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                            : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800  hover:text-black dark:hover:text-white hover:transition-colors hover:duration-200',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={
                          pathname === item.href ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ModeToggle />

                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-neutral-200 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-300 dark:focus:ring-offset-gray-700">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
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
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <div className="flex flex-col gap-1 p-4">
                            <span className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                              Iniciaste con:
                            </span>
                            <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                              {user.usuario.correo}
                            </span>
                          </div>
                        </Menu.Item>
                        <hr />
                        {user.role.length > 0 ? (
                          user.role.map((rol, index) => (
                          <Menu.Item key={index}>
                            {
                              <Link
                                href={`/${rol.rol.toLowerCase()}`}
                                className={classNames(
                                  rol.rol.toLowerCase() === pathname.split('/')[1] ? 'bg-gray-100 dark:bg-gray-800 pointer-events-none' : '',
                                  'block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start hover:bg-neutral-100 dark:hover:bg-gray-800'
                                )}
                                aria-current={rol.rol.toLowerCase() === pathname.split('/')[1] ? 'page' : undefined}

                              >
                                Perfil de {rol.rol}
                              </Link>
                            }
                          </Menu.Item>
                          ))
                        ) : (
                        <Menu.Item>
                          <span className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start">
                            No hay roles asignados
                          </span>
                        </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/perfil"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                'block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start'
                              )}
                            >
                              Editar perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                'block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start'
                              )}
                            >
                              Cerrar sesión
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link className="hover:text-sec" href="/login">Iniciar sesión</Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-white dark:bg-gray-900">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-gray-100 dark:bg-slate-800  text-gray-900 dark:text-gray-100'
                      : 'text-gray-900 dark:text-gray-100  hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-800',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
