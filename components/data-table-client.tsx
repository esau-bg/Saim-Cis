'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ButtonMoreDataTable from './button-more-data-table'
import { Button } from './ui/button'
import { ModalPreclinica } from './modals/modal-preclinica'
import { EllipsisVerticalIcon, LinkIcon } from '@heroicons/react/20/solid'
import { AlertModalDeleteUser } from './modals/modal-eliminar'
import { ModalAgregarRolEspecializacion } from './modals/modal-agregar-rol-especializacion'

export default function DataTableClient ({
  users,
  permissons
}: {
  users: DataTableUsers
  permissons?: boolean
}) {
  const [personaSeleccionada, setPersonaSeleccionada] =
    useState<Personas | null>(null)
  const pathname = usePathname()

  return (
    <div className='flex flex-col my-4'>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='p-1.5 min-w-full inline-block align-middle'>
          <div className='border rounded-lg overflow-hidden dark:border-gray-700'>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400  uppercase'
                  >
                    Nombre
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'
                  >
                    Correo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'
                  >
                    DNI
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'
                  >
                    Fecha Nacimiento
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className=''>
                      <div className='w-full flex flex-col justify-center items-center p-4 gap-2'>
                        <div className='rounded-full stroke-neutral-600 dark:stroke-slate-600 bg-neutral-200 dark:bg-slate-900 p-4'>
                          <svg
                            className='w-16 h-16'
                            viewBox='0 0 28 28'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            ></path>
                            <path
                              d='M17 16L22 21M22 16L17 21'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            ></path>
                          </svg>
                        </div>
                        <span className='text-neutral-500 dark:text-slate-600'>
                          No se encontraron usuarios
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users?.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                    >
                      <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={
                              usuario.url_avatar ??
                              'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'
                            }
                            className='rounded-full w-6 h-6 object-cover'
                            alt={`Fotografia perfil de ${usuario.nombre}`}
                          />
                          <Link
                            href={`${pathname}/${usuario.id}`}
                            className=' whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'
                          >
                            {usuario.nombre} {usuario.apellido}
                          </Link>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-3'>
                        {usuario.correo}
                      </td>
                      <td className='whitespace-nowrap px-3 py-3'>
                        {usuario.dni}
                      </td>
                      <td className='whitespace-nowrap px-3 py-3 text-end'>
                        {usuario.fecha_nacimiento
                          ? new Date(
                            usuario.fecha_nacimiento
                          ).toLocaleDateString('hn', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                          : 'No disponible'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-3 text-end'>
                        <span
                          className={`capitalize px-2 py-1 rounded-md
                          ${
                            usuario.estado_usuario === 'activo'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500'
                              : usuario.estado_usuario === 'pendiente'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                              : usuario.estado_usuario === 'no disponible'
                              ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500'
                              : usuario.estado_usuario === 'cancelado'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                              : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-500'
                          }
                        `}
                        >
                          {usuario.estado_usuario ?? 'No disponible'}
                        </span>
                      </td>
                      <td>
                        <ButtonMoreDataTable
                          className='flex flex-col max-w-[180px] p-1 mr-10 '
                          trigger={
                            <Button
                              size={'icon'}
                              variant={'ghost'}
                              onClick={() => {
                                setPersonaSeleccionada(usuario)
                              }}
                            >

                              <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />

                            </Button>
                          }
                        >
                          <Button
                            asChild
                            variant={'ghost'}
                            className='justify-start font-normal'
                          >
                            <Link href={`${pathname}/${usuario.id}`}>
                              <LinkIcon className='h-4 w-4 mr-1' />
                              Ver perfil
                            </Link>
                          </Button>
                          <ModalPreclinica persona={personaSeleccionada} />

                          {
                            permissons && (
                              <>
                              <ModalAgregarRolEspecializacion persona={personaSeleccionada} />

                              <AlertModalDeleteUser persona={personaSeleccionada} />
                              </>
                            )
                          }
                        </ButtonMoreDataTable>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
