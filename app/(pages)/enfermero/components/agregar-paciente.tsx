import { PlusIcon } from '@heroicons/react/24/outline'
import { EnfermeroPacienteForm } from './form-paciente'

export function AgregarPaciente () {
  return (
    <>
      <button
        data-hs-overlay="#hs-modal-agregar-paciente"
        className="h-10 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border border-blue-600 text-blue-600 hover:bg-blue-500 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <span className="hidden md:block">Agregar Paciente</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
      <div
        id="hs-modal-agregar-paciente"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl pointer-events-auto shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center flex justify-end">
                <button
                  type="button"
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-modal-agregar-paciente"
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
                  Agregar Paciente
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Ingrese los datos del paciente
                </p>
              </div>
              <div className="mt-5">
                <EnfermeroPacienteForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
