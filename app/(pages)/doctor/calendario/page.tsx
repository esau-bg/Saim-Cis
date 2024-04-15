import { getCitasByDoctor, getInfoDoctor } from '@/app/(pages)/doctor/actions'
import { getInfoPersona } from '@/app/actions'
import CitasDoctor from './calendar'

export default async function page () {
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

  const { citas, errorCitas } = await getCitasByDoctor({ id_doctor: usuario.id })
  const { InfoMedico, errorMedico } = await getInfoDoctor({ id_doctor: usuario.id })

  if (errorCitas) return <div>Error</div>
  if (!citas) return <div>Loading...</div>

  if (errorMedico) return <div>Error</div>
  if (!InfoMedico) return <div>Loading...</div>

  const events = citas.map((cita) => ({
    id: cita.id,
    title: cita.doctor?.nombre ?? '',
    start: new Date(cita.fecha_inicio),
    end: new Date(cita.fecha_final),
    info: cita
  }))

  return (
      <div className="">
        <CitasDoctor events={events} infoMedico={InfoMedico} />
      </div>
  )
}
