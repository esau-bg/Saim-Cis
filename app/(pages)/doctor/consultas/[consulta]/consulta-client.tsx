'use client'

import { calcularEdad } from '@/app/actions'
import FormDiagnostic from './components/form-diagnostic'
import { ModalEditarPreclinica } from './components/modal-editar-preclinica'
import { ArrowLeftCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
// import { ModalHistorialDiagnostico } from './components/modals/modal-historial-diagnosticos'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FolderOpenIcon } from '@heroicons/react/24/outline'

export default function ConsultaClient ({ consulta }: { consulta: Consultas & { expedientes: Expedientes & { personas: Personas | null } | null } & { estado: EstadoConsultas | null } }) {
  const pathname = usePathname()
  // Redireccionar hacia consultas
  const router = useRouter()
  // Funcion para redirijir hacia consultas y refrescar las consultas
  const handleRedirect = () => {
    router.push('/doctor/consultas')
    router.refresh()
  }

  return (
    <main className="relative container">

    <aside className='flex flex-col md:flex-row border-b py-4'>
    <div className='w-full text-center'>
      <h2 className="text-2xl font-medium my-2">Detalles del Paciente</h2>
      <div>
        <div className="flex flex-col gap-2 my-2">
          <div className=''>
            <span className='font-semibold'>DNI: </span>
            <span className='capitalize'>{consulta.expedientes?.personas?.dni ?? 'N/A'}</span>
          </div>
          <div className=''>
            <span className='font-semibold'>Nombre: </span>
            <span>{consulta.expedientes?.personas?.nombre} {consulta.expedientes?.personas?.apellido}</span>
          </div>
          <div>
            <span className='font-semibold'>Fecha de nacimiento: </span>
            <span>
              {consulta.expedientes?.personas?.fecha_nacimiento
                ? `${new Date(consulta.expedientes?.personas?.fecha_nacimiento).toLocaleDateString(
                  'es-HN',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }
                )} (${calcularEdad(new Date(consulta.expedientes?.personas?.fecha_nacimiento))})`
                : 'No disponible'}
            </span>
          </div>
          <div>
            <span className='font-semibold'>Sexo: </span>
            <span className='capitalize'>{consulta.expedientes?.personas?.genero ?? 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>

    <div className='w-full text-center'>
    <h2 className="text-2xl font-medium my-2">Estado Fisico</h2>
    <div>
      <div className="flex flex-col gap-2 my-2">
        <div>
          <span className='font-semibold'>Peso: </span>
          <span className=''>{consulta.peso} kg/g</span>
        </div>
        <div>
          <span className='font-semibold'>Estatura: </span>
          <span className=''>{consulta.estatura} metros</span>
        </div>
        <div>
          <span className='font-semibold'>Temperatura: </span>
          <span className=''>{consulta.peso} °C</span>
        </div>
        <div>
          <span className='font-semibold'>Presion Arterial: </span>
          <span className=''>{consulta.presion_arterial} mm Hg</span>
        </div>
        <div>
          <span className='font-semibold'>Saturacion en Oxigeno: </span>
          <span className=''>{consulta.saturacion_oxigeno}%</span>
        </div>
      </div>
    </div>
    </div>

    <div className='w-full text-center'>
    <h2 className="text-2xl font-medium my-2">Detalles de la Consulta</h2>
    <div>
      <div className="flex flex-col gap-2 my-2">
        <div>
          <span className='font-semibold'>Fecha de la consulta: </span>
          <span>
            {consulta.fecha_consulta
              ? new Date(consulta?.fecha_consulta).toLocaleDateString(
                'es-HN',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              )
              : 'No disponible'}
          </span>
        </div>
        <div>
          <span className='font-semibold'>Estado: </span>
          <span className='capitalize px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-md'>
            {consulta.estado?.estado === 'preclinica' ? 'Diagnostico' : consulta.estado?.estado }
            </span>
        </div>
        <div>
          <span className='font-semibold'>Sintomas: </span>
          <span className='capitalize'>{consulta.sintomas}</span>
        </div>
        <div className="my-2 flex justify-end items-center md:mt-6">
          <Button
            variant={'secondary'}
            className="justify-start font-normal duration-500 hover:bg-sec hover:text-white"
            onClick={handleRedirect}
          >
            Regresar
            <ArrowLeftCircleIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
    </div>

    <div className="absolute end-5 top-5 col-start-1 text-end">
    <div className="hs-tooltip inline-block [--placement:left]">

    <Button type="button"
              data-hs-overlay="#hs-modal-editar-preclinica"
                size={'icon'}
                variant={'ghost'}
                className='hs-tooltip-toggle'
            >
              <PencilSquareIcon className="h-5 " />
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-sec-var-900/90 text-xs font-medium text-white rounded shadow-sm  " role="tooltip">
                Actualizar signos vitales
        </span>
            </Button>
    </div>
  </div>

    </aside>

      <aside className="max-w-lg mx-auto relative">
        <h2 className="text-2xl font-medium my-3 text-center">
          Diagnostico
        </h2>
        <div className='absolute end-0 top-0'>
        <Link href={`${pathname}/${consulta.expedientes?.id}`} className=' whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
          <Button variant={'outline'} className="justify-start font-normal duration-500 hover:bg-sec hover:text-white">
            Ver Historial
            <FolderOpenIcon className="h-4 w-4 ml-1" />
          </Button>
        </Link>
        </div>
        <FormDiagnostic consulta={consulta} />
      </aside>
      <div>
        <ModalEditarPreclinica consulta={consulta} />
      </div>
    </main>
  )
}
