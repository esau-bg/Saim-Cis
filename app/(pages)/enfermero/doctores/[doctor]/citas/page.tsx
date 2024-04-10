import { getCitasByDoctor } from '../../../actions'
import CalendarClient from './calendar'
import CitasInfo from './components/citas-info'

export default async function CitasPage ({
  params
}: {
  params: { doctor: string }
}) {
  const { citas, errorCitas } = await getCitasByDoctor({ id_doctor: params.doctor })

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
    <main className="w-full  flex flex-col md:flex-row gap-5 px-8 py-2">
        <section className=' border-r p-4 w-[400px]'>
           <CitasInfo usuario={params.doctor} />
        </section>
        <CalendarClient events={events} />
    </main>
  )
}
