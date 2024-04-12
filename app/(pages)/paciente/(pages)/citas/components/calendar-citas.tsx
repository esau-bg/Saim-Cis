'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import withDragAndDrop, {
// type EventInteractionArgs
} from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// import VerEventsDoctor from './ver-event-doctor'
// import VerCitasPaciente from './modal-ver-cita'
import SolicitarCitasPaciente from './modal-solicitar-cita'
import { createCitaByPaciente } from '@/app/(pages)/doctor/actions'
import 'moment/locale/es'
moment.locale('es')

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

export default function CalendarioPaciente ({ events, eventsDoctor, eventsCrear, infoMedico }: { events: Events[], eventsDoctor: Events[], eventsCrear: Events[], infoMedico: InfoMedicoJornada }) {
  // const [state, setState] = React.useState<Events[]>(events)
  const [isOpen, setIsOpen] = React.useState(false)
  const [eventSelected, setEventSelected] = React.useState<Events | null>(null)
  const [citaCreate] = React.useState<Events | null>(null)

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const minDate = infoMedico?.jornada?.hora_inicio ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(infoMedico?.jornada?.hora_inicio)) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  const maxDate = infoMedico?.jornada?.hora_final ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(infoMedico?.jornada?.hora_final)) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

  const handleNewEvent = useCallback(() => {
    setIsOpen(true)
  }, [])

  //   const handleCancel = useCallback(() => {
  //     setIsOpen(false)
  //   }, [])

  const handleSelectSlot = useCallback(({ start, end }: { start: Date, end: Date }) => {
    // Setear el evento seleccionado para el nuevo evento
    setEventSelected({
      start,
      end,
      title: '',
      info: {
        paciente: null,
        doctor: null,
        descripcion: '',
        estado: '',
        fecha_final: '',
        fecha_inicio: '',
        fecha_registro: '',
        id: '',
        id_doctor: '',
        id_paciente: ''
      }
    })
    // Mostrar el AlertDialog
    handleNewEvent()
  }, [handleNewEvent])

  const scrollToTime = new Date(1970, 1, 1, 6)
  const router = useRouter()

  // const onEventResize = (args: EventInteractionArgs<object>) => {
  //   const { start, end } = args

  //   setState((state) => {
  //     return state.map((event) => {
  //       if (event.id === (args.event as Events).id) {
  //         return { ...event, start: start as Date, end: end as Date }
  //       } else {
  //         return event
  //       }
  //     })
  //   })
  // }

  // const onEventDrop = (args: EventInteractionArgs<object>) => {
  //   const { start, end } = args

  //   setState((prevState) => {
  //     // Creamos una nueva copia de los eventos
  //     const newEvents = [...prevState]

  //     // Buscamos el evento que se ha movido y actualizamos sus fechas
  //     const eventIndex = newEvents.findIndex(
  //       (event) => event.id === (args.event as Events).id
  //     )
  //     if (eventIndex !== -1) {
  //       newEvents[eventIndex] = {
  //         ...newEvents[eventIndex],
  //         start: start as Date,
  //         end: end as Date
  //       }
  //     }

  //     // Devolvemos los nuevos eventos como el nuevo estado
  //     return newEvents
  //   })
  // }

  useEffect(() => {
    const createCitaAsync = async () => {
      const { errorCitasInsert } = await createCitaByPaciente({
        data: {
          id: citaCreate?.id ?? '',
          fecha_inicio:
            moment(citaCreate?.start).format('YYYY-MM-DDTHH:mm:ssZ') ?? '',
          fecha_final: moment(citaCreate?.end).format('YYYY-MM-DDTHH:mm:ssZ') ?? '',
          estado: 'pendiente',
          id_doctor: 'ID_DOCTOR',
          id_paciente: 'ID_PACIENTE',
          descripcion: 'nueva cita'
        }
      })

      if (errorCitasInsert) {
        toast.error('Error al solicutar una cita')
        return
      }

      router.refresh()
    }

    // console.log(
    //   'citaCreate',
    //   new Date(citaCreate?.start ?? '').toLocaleTimeString(),
    //   new Date(citaCreate?.end ?? '').toLocaleTimeString()
    // )
    if (citaCreate) {
      // console.log('citaCreate', citaCreate)
      // console.log('citaCreate', citaCreate?.start ? moment(citaCreate.start).format('YYYY-MM-DDTHH:mm:ssZ') : '')
      createCitaAsync()
    }
  }, [citaCreate])

  const [theme] = useState('dark')

  return (
    <div className='App flex justify-center py-6 dark:text-white'>
      <DnDCalendar
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        }}
        defaultDate={moment().toDate()}
        defaultView='week'
        views={['month', 'week', 'day']}
        events={eventsDoctor}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        min={minDate}
        max={maxDate}
        // onEventDrop={onEventDrop}
        // onEventResize={onEventResize}

        onDoubleClickEvent={(
          event: object,
          e: React.SyntheticEvent<HTMLElement, Event>
        ) => {
          setIsOpen(true)
          setEventSelected(event as Events)
        }}
        style={{ height: '88vh', width: '100vh' }}
        draggableAccessor={() => false}
        resizableAccessor={() => false}
        className={`rbc-calendar-${theme}`}
      />
      <SolicitarCitasPaciente
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      eventSelected={eventSelected}/>

    {/* <VerCitasPaciente
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      eventSelected={eventSelected}/> */}

      {/* <VerEventsDoctor isOpen={isOpen}
      setIsOpen={setIsOpen}
      eventSelected={eventSelected} /> */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
