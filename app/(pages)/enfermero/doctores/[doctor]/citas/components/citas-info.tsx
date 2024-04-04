import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import CitasListInfo from './citas-list-info'
import { ArrowDownIcon } from '@heroicons/react/20/solid'
import { getCitasByDoctor } from '@/app/(pages)/doctor/actions'

export default async function CitasInfo ({ usuario }: { usuario: string }) {
  if (!usuario) return null
  const { citas } = await getCitasByDoctor({
    id_doctor: usuario
  })

  const citasAgrupadas = citas?.reduce<
  Record<string, Array<Citas & { paciente: Personas }>>
  >((acc, cita) => {
    const fechaInicio = new Date(cita.fecha_inicio).toLocaleDateString('en-US')
    if (!acc[fechaInicio]) {
      acc[fechaInicio] = []
    }
    if (cita.paciente) {
      acc[fechaInicio].push({ ...cita, paciente: cita.paciente })
    }
    return acc
  }, {})

  const citasFuturas = Object.entries(citasAgrupadas ?? {}).filter(
    ([fecha, citasPorFecha]) => new Date(fecha) >= new Date()
  )

  return (
    <div className='relative'>
      {citasFuturas.length >= 6 && (
        <div className='absolute flex justify-center items-end h-full w-full  pointer-events-none'>
          <div className='animate-bounce h-10 w-10 flex justify-center items-center  bg-white dark:bg-slate-900/80 border shadow-md  rounded-full '>
            <span className='sr-only'>Hay mas citas</span>

            <ArrowDownIcon className='h-5 w-5 text-sec' />
          </div>
        </div>
      )}

      <div className=' w-full bg-white dark:bg-slate-900  p-8 min-h-full overflow-hidden overflow-y-auto'>
        <h4 className='text-xl text-gray-900 dark:text-gray-100 font-bold'>
          Citas Próximas
        </h4>
        {citasFuturas.length > 0 ? (
          citasFuturas.map(([fecha, citasPorFecha], index) => (
            <ul key={index} className=''>
              <div className=' flex justify-center items-center gap-2 w-fit text-gray-700 dark:text-gray-300 mt-4'>
                <CalendarDaysIcon className='h-4 w-4 ' />
                <h5 className='text-sm'>
                  {new Date(fecha).toLocaleDateString('es-HN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </h5>
              </div>

              <CitasListInfo citasPorFecha={citasPorFecha} />
            </ul>
          ))
        ) : (
          <div className='grid place-items-center h-full w-full '>
            <div className='flex flex-col items-center justify-center gap-1'>
              <h5 className='text-gray-300 dark:text-gray-700 text-center'>
                No hay citas próximas
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
