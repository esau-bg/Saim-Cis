'use client'
import { useRouter } from 'next/navigation'
import { FormDetallesDiagnostico } from './forms/form-detalles-diagnostico'

export function ModalDetallesDiagnostico ({ diagnostico }: { diagnostico: SendInfoDiagnostico | null }) {
  const route = useRouter()
  const handleRedirect = () => {
    route.refresh()
  }

  return (
    <>
    <div
        id="hs-modal-detalles-diagnostico"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none bg-amber-300"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl pointer-events-auto shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center flex justify-end">
                <button
                onClick={handleRedirect}
                  type="button"
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-modal-detalles-diagnostico"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Agregar Signos Vitales del Paciente

                </h2>
              </div>
              <div className="mt-5">
                <FormDetallesDiagnostico
                  diagnostico = {diagnostico}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
