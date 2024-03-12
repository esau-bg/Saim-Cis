import { calcularEdad } from '@/app/actions'
import { getConsultasById, getEstadoConsultaAndChange } from '../../actions'
import FormDiagnostic from './components/form-diagnostic'

export default async function page ({
  params
}: {
  params: { consulta: string }
}) {
  const { consulta, errorConsulta } = await getConsultasById({
    id_consulta: params.consulta
  })

  if (errorConsulta) {
    return <h1>Error al cargar la consulta</h1>
  }

  if (!consulta) {
    return <h1>Consulta no encontrada</h1>
  }

  if (consulta.id_estado_consulta === '5961389c-363d-4a9a-8c76-025b0421caff') {
    await getEstadoConsultaAndChange({ idConsulta: consulta.id, estado: 'diagnostico' })
  }

  return (
    <main className=" container">

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
          <span className='capitalize'>{consulta.peso} kg/g</span>
        </div>
        <div>
          <span className='font-semibold'>Estatura: </span>
          <span className='capitalize'>{consulta.estatura} m</span>
        </div>
        <div>
          <span className='font-semibold'>Temperatura: </span>
          <span className='capitalize'>{consulta.peso} c</span>
        </div>
        <div>
          <span className='font-semibold'>Presion Arterial: </span>
          <span className='capitalize'>{consulta.presion_arterial}</span>
        </div>
        <div>
          <span className='font-semibold'>Saturacion en Oxigeno: </span>
          <span className='capitalize'>{consulta.saturacion_oxigeno}</span>
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
          <span className='capitalize px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-md'>{consulta.estado?.estado}</span>
        </div>
        <div>
          <span className='font-semibold'>Sintomas: </span>
          <span className='capitalize'>{consulta.sintomas}</span>
        </div>
      </div>
    </div>
    </div>
    </aside>

      <aside className="">
        <h2 className="text-2xl font-medium my-3 text-center">Diagnostico</h2>

        <FormDiagnostic consulta={consulta} />
      </aside>
    </main>
  )
}
