import { getCitasByPaciente } from '@/app/(pages)/doctor/actions'
import { getInfoPersona } from '@/app/actions'
import VisualizarCitasPaciente from './ver-citas'

export default async function page () {
  const { usuario, errorUsuario } = await getInfoPersona()

  if (errorUsuario) {
    return (

        <span>Error al obtener los datos del usuario</span>
    )
  }

  if (!usuario) {
    return (<div>Cargando...</div>)
  }

  // obtener citas que tiene asignadas un paciente
  const { citasPaciente, errorCitasPaciente } = await getCitasByPaciente({ id_paciente: usuario.id })

  if (errorCitasPaciente) return <div>Error</div>

  if (!citasPaciente) return <div>Cargando...</div>

  const events = citasPaciente.map((cita) => ({
    id: cita.id,
    title: cita.paciente?.nombre ?? '',
    start: new Date(cita.fecha_inicio),
    end: new Date(cita.fecha_final),
    info: cita
  }))

  return (
      <div className="">
        <VisualizarCitasPaciente events={events} paciente={usuario}/>
      </div>
  )
}
