'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
// import { DetallesPage } from '../consultas/detalle/page'

import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { getEstadoConsultaAndChange } from '../actions'
import { useTransition } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import LogoSaimCis from '@/components/logo-saim-cis'

interface SendInfoConsultas {
  estado_consulta: string
  id_consulta: string
}

export default function DataTableClient ({ consultas }: { consultas: InfoConsultas }) {
  const pathname = usePathname()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const handleRedirect = (consulta: SendInfoConsultas) => {
    startTransition(async () => {
      if (consulta.estado_consulta === 'preclinica') {
        const { dataIDEstado, errorIDEstado } = await getEstadoConsultaAndChange({ idConsulta: consulta.id_consulta, estado: 'diagnostico' })
        if (errorIDEstado) {
          toast.error('Error al cambiar el estado de la consulta')
        }
        if (!dataIDEstado) {
          toast.error('Error al cambiar el estado de la consulta')
        }
      }
    })
    router.push(`${pathname}/${consulta.id_consulta}`)
    router.refresh()
  }

  return (
<>
        {
          isPending && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/50 ">
              <div className="flex flex-col items-center gap-3 p-3">
              <LogoSaimCis className="h-16 w-16 animate-bounce animate-infinite" />
                <p className="text-lg text-gray-800 dark:text-gray-200">Cargando...</p>
              </div>
            </div>
          )
        }
        <div className="flex flex-col my-4">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                    <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400  uppercase">Paciente</th>
                    <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">DNI</th>
                    <th scope="col" className="px-3 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Fecha Consulta</th>
                    <th scope="col" className="px-3 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Estado</th>
                  </tr>
                  </thead>
                  <tbody >
                  {consultas.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="">
                        <div className="w-full flex flex-col justify-center items-center p-4 gap-2">
                          <div className="rounded-full stroke-neutral-600 dark:stroke-slate-600 bg-neutral-200 dark:bg-slate-900 p-4">
                            <svg
                              className="w-16 h-16"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M17 16L22 21M22 16L17 21"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-neutral-500 dark:text-slate-600">
                            No se encontraron Consultas pendientes
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    consultas.map((consulta, index) => (
                      <tr
                        key={index}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            {/* <img
                              src={consulta.consulta?.avatar_url ?? 'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'}
                              className="rounded-full w-6 h-6"

                              alt={`Fotografia perfil de ${consulta.nombre}`}
                            /> */}
                            <Link href={`${pathname}/${consulta.id_consulta}`} className=' whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                              {consulta.nombre} {consulta.apellido}
                            </Link>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {consulta.dni}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-end">
                          {consulta.fecha_consulta
                            ? new Date(consulta.fecha_consulta).toLocaleDateString(
                              'es-ES',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                              }
                            )
                            : 'No disponible'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-end">
                          <span
                            className={`capitalize px-2 py-1 rounded-md
                              ${
                                consulta.estado_consulta === 'preclinica'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500'
                                  : consulta.estado_consulta === 'diagnostico'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                                  : consulta.estado_consulta === 'completa'
                                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500'
                                  : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-500'
                              }
                            `}
                          >
                            {consulta.estado_consulta ?? 'No disponible'}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-end">
                            <button className="py-2 px-3 my-1 mx-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border border-blue-600 text-blue-600 hover:bg-blue-500 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              onClick={ () => {
                                handleRedirect(
                                  consulta
                                )
                              }}
                              >
                                  <span className="hidden md:block">Atender</span>{' '}
                                  <PencilSquareIcon className="h-5 md:ml-4" />

                              </button>
                            {/* <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-icon-trigger">
                              <button data-hs-overlay="#hs-modal-preclinica" className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" >
                                  Atender
                              </button>
                            </div> */}
                          </div>
                        </td>
                    </tr>
                    ))
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        </div>
</>

  )
}
