'use client'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { DetallesPage } from '../consultas/detalle/page'

// import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useTransition } from 'react'
import { ToastContainer } from 'react-toastify'

import LogoSaimCis from '@/components/logo-saim-cis'
import { ModalDetallesDiagnostico } from '../../components/modals/modal-detalles-diagnosticos'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid'
import Search from '@/components/search-query'
import Tags from '@/components/tags'

export default function DataTableClient ({ diagnosticos }: { diagnosticos: InfoDiagnosticos | null }) {
  // Redireccionar hacia consultas
  const router = useRouter()
  // Funcion para redirijir hacia consultas y refrescar las consultas
  const handleRedirect = () => {
    router.back()
  }
  const [isPending] = useTransition()

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
        <div className="my-2 flex justify-between items-center  gap-2 md:mt-6">
          <Search placeholder="Buscar Diagnóstico..." debounce={200} />
          <Button
            variant={'secondary'}
            className="justify-start font-normal duration-500 hover:bg-sec hover:text-white"
            onClick={handleRedirect}
          >
            Regresar
            <ArrowLeftCircleIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr className=''>
                    <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400  uppercase">Diagnóstico</th>
                    <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Fecha</th>
                    <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Observación</th>
                  </tr>
                  </thead>
                  <tbody >
                  {diagnosticos?.length === 0 ? (
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
                            No se encontraron diagnosticos pendientes
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    diagnosticos?.map((diagnostico, index) => (
                      <tr
                        key={index}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-3 pr-3">
                          <div className="flex items-center gap-3">
                            <span className='whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                              <Tags input={diagnostico.enfermedades} />
                            </span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-start">
                          {diagnostico.fecha_diagnostico
                            ? new Date(diagnostico.fecha_diagnostico).toLocaleDateString(
                              'es-ES',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                              }
                            )
                            : 'No disponible'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        <div className="flex items-center gap-3">
                            <span className='truncate grid grid-cols-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                            {diagnostico.observacion}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        <ModalDetallesDiagnostico diagnostico = {diagnostico}/>

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
