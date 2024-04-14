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
    <main className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-5 px-8 py-2">
        <section className=' border-r pr-4 py-4 w-[360px]'>
           <CitasInfo usuario={params.doctor} />
        </section>
        <section className='w-full h-full py-4'>
        <CalendarClient events={events} />
        </section>
    </main>
  )
}
