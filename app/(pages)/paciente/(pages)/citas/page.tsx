import { getCitasByPaciente } from '@/app/(pages)/doctor/actions'
import { getInfoPersona } from '@/app/actions'
// import CitasPaciente from './calendar'
import CardMedicos from './components/CardMedicos'
import CalendarioPaciente from './components/calendar-citas'

export default async function CitasPacientePage () {
  const { usuario, errorUsuario } = await getInfoPersona()

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  if (!usuario) {
    return (<div>Loading...</div>)
  }

  const { citas, errorCitas } = await getCitasByPaciente({ id_paciente: usuario.id })

  if (errorCitas) return <div>Error</div>

  if (!citas) return <div>Loading...</div>

  const events = citas.map((cita) => ({
    id: cita.id,
    title: cita.paciente?.nombre ?? '',
    start: new Date(cita.fecha_inicio),
    end: new Date(cita.fecha_final),
    info: cita
  }))

  return (
      <div className="">
        <CardMedicos/>
        {/* <CitasPaciente events={events} /> */}
        <CalendarioPaciente events={events} />
      </div>
  )
}
