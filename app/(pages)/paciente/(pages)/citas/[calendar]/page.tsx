import { getCitasByPaciente, getInfoDoctor } from '@/app/(pages)/doctor/actions'
import { getInfoPersona } from '@/app/actions'
import CalendarioPaciente from '../components/calendar-citas'
import { toast } from 'react-toastify'
// import CitasPaciente from '../calendar'

export default async function CitasPacienteCalendarPage ({
  params
}: {
  params: {
    calendar: string
  }
}) {
  const idDoctor = params.calendar

  const { InfoMedico, errorMedico } = await getInfoDoctor({ id_doctor: idDoctor })
  if (errorMedico) {
    toast.error('Error al Obtener el horario de Medico')
  }

  if (!InfoMedico) {
    return (
      <div>
        <span>Error al obtener los datos del medico</span>
      </div>
    )
  }

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
        {/* <CitasPaciente events={events} /> */}
        <CalendarioPaciente events={events} />
      </div>
  )
}
