'use client'
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop, {
  type EventInteractionArgs
} from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// import { Button } from '@/components/ui/button'
// import Link from 'next/link'

import 'moment/locale/es'
import { updateCita } from '../../../actions'
import DialogCita from './components/dialog-cita'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
moment.locale('es')

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

export default function CalendarClient ({ events }: { events: Events[] }) {
  const [state, setState] = React.useState<Events[]>(events)
  const [isOpen, setIsOpen] = React.useState(false)
  const [eventSelected, setEventSelected] = React.useState<Events | null>(null)
  const [citaMod, setCitaMod] = React.useState<Events | null>(null)

  const router = useRouter()

  const comprobacion = ({ start, end }: { start: Date, end: Date }) => {
    // comprobamos que el nuevo evento no sea en el pasado
    if (start < new Date()) {
      toast.error('No puedes agendar una cita en el pasado')
      return
    }

    // comprobar que el nuevo evento no traslape con los eventos existentes cuando se haga resize o drag
    const isOverlap = state.some(
      (event) =>
        (start >= event.start && start <= event.end) ||
        (end >= event.start && end <= event.end) ||
        (start <= event.start && end >= event.end)
    )
    console.log('isOverlap', isOverlap)
    if (isOverlap) {
      toast.error('No puedes agendar una cita en un horario ocupado')
      return
    }

    // comprobar que el nuevo evento no dure mas de 1 hora
    if (end.getTime() - start.getTime() > 3600000) {
      toast.error('No puedes agendar una cita que dure mas de 1 hora')
      return
    }

    return true
  }

  const onEventResize = (args: EventInteractionArgs<object>) => {
    const { start, end } = args

    if (!comprobacion({ start: start as Date, end: end as Date })) {
      return
    }

    setState((state) => {
      return state.map((event) => {
        if (event.id === (args.event as Events).id) {
          const updatedEvent = {
            ...event,
            start: start as Date,
            end: end as Date
          }
          setCitaMod(updatedEvent) // Seteamos citaMod con el evento actualizado
          return updatedEvent
        } else {
          return event
        }
      })
    })
  }

  const onEventDrop = (args: EventInteractionArgs<object>) => {
    const { start, end } = args

    if (!comprobacion({ start: start as Date, end: end as Date })) {
      return
    }

    setState((prevState) => {
      // Creamos una nueva copia de los eventos
      const newEvents = [...prevState]

      // Buscamos el evento que se ha movido y actualizamos sus fechas
      const eventIndex = newEvents.findIndex(
        (event) => event.id === (args.event as Events).id
      )
      if (eventIndex !== -1) {
        const updatedEvent = {
          ...newEvents[eventIndex],
          start: start as Date,
          end: end as Date
        }
        setCitaMod(updatedEvent) // Seteamos citaMod con el evento actualizado
        newEvents[eventIndex] = updatedEvent
      }

      // Devolvemos los nuevos eventos como el nuevo estado
      return newEvents
    })
  }

  useEffect(() => {
    const updateCitaAsync = async () => {
      const { errorCita } = await updateCita({
        id: citaMod?.id ?? '',
        data: {
          fecha_inicio:
            moment(citaMod?.start).format('YYYY-MM-DDTHH:mm:ssZ') ?? '',
          fecha_final: moment(citaMod?.end).format('YYYY-MM-DDTHH:mm:ssZ') ?? ''
        }
      })

      if (errorCita) {
        toast.error('Error al actualizar la cita')
        return
      }

      router.refresh()
    }

    // console.log(
    //   'citaMod',
    //   new Date(citaMod?.start ?? '').toLocaleTimeString(),
    //   new Date(citaMod?.end ?? '').toLocaleTimeString()
    // )
    if (citaMod) {
      // console.log('citaMod', citaMod)
      // console.log('citaMod', citaMod?.start ? moment(citaMod.start).format('YYYY-MM-DDTHH:mm:ssZ') : '')
      updateCitaAsync()
    }
  }, [citaMod])

  const [theme] = useState('dark')

  return (
    <div className='App flex h-[85vh] justify-center'>
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
        events={state}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onDoubleClickEvent={(
          event: object,
          e: React.SyntheticEvent<HTMLElement, Event>
        ) => {
          setIsOpen(true)
          setEventSelected(event as Events)
        }}
        resizable
        className={`rbc-calendar-${theme} w-full max-w-5xl`}
      />
      <DialogCita
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        eventSelected={eventSelected}
      />

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
