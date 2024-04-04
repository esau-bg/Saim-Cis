'use client'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function CitasListInfo ({
  citasPorFecha
}: {
  citasPorFecha: Array<Citas & { paciente: Personas }>
}) {
  const [citaSelected, setCitaSelected] = useState<
  (Citas & { paciente: Personas }) | null
  >(null)

  const [isOpen, setIsOpen] = useState(false)

  function closeModal () {
    setIsOpen(false)
  }

  function openModal ({
    cita
  }: {
    cita: (Citas & { paciente: Personas }) | null
  }) {
    setCitaSelected(cita)
    setIsOpen(true)
  }

  return (
    <>
      {citasPorFecha.map((cita, index) => (
        <li key={index} className="flex flex-col px-2 py-3 gap-1 border-b">
          <span className="flex  justify-center items-center gap-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded-md w-fit text-sm">
            <ClockIcon className="h-4 w-4 " />
            {new Date(cita.fecha_inicio).toLocaleTimeString('es-HN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
            {' - '}
            {new Date(cita.fecha_final).toLocaleTimeString('es-HN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
          <button
            className="flex flex-col"
            onClick={() => {
              openModal({ cita })
            }}
          >
            <h5 className="font-semibold">
              {cita.paciente?.nombre} {cita.paciente?.apellido}
            </h5>
          </button>
          <span className="text-sm">
            {cita.descripcion ?? 'Sin descripcion'}
          </span>
        </li>
      ))}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Cita
                  </Dialog.Title>
                  <div className="my-5">
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-justify">

                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">
                            Paciente
                          </span>
                          <span className="text-sm">
                            {citaSelected?.paciente?.nombre}{' '}
                            {citaSelected?.paciente?.apellido}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">Fecha</span>
                          <span className="text-sm">
                            {new Date(
                              citaSelected?.fecha_inicio ?? ''
                            ).toLocaleDateString('es-HN', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-justify">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">Hora</span>
                          <span className="text-sm">
                            {new Date(
                              citaSelected?.fecha_inicio ?? ''
                            ).toLocaleTimeString('es-HN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {' - '}
                            {new Date(
                              citaSelected?.fecha_final ?? ''
                            ).toLocaleTimeString('es-HN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">
                            Descripcion
                          </span>
                          <span className="text-sm">
                            {citaSelected?.descripcion ?? 'Sin descripcion'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">Fecha de registro</span>
                        <span className="text-sm">
                          {
                           citaSelected?.fecha_registro && new Date(citaSelected?.fecha_registro).toLocaleDateString('es-HN', {
                             weekday: 'long',
                             day: 'numeric',
                             month: 'long',
                             year: 'numeric'
                           })
                          }
                        </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">
                            Estado
                          </span>
                          <span className="text-sm">
                            {citaSelected?.estado}
                          </span>
                        </div>

                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
