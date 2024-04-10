'use client'
import React, { useCallback, useState, useTransition } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify'
import { Icons } from '@/components/icons'
import { createCitaByPaciente } from '@/app/(pages)/doctor/actions'
// import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import withDragAndDrop, {
// type EventInteractionArgs
} from 'react-big-calendar/lib/addons/dragAndDrop'
import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { formatFecha } from '@/app/actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import Link from 'next/link'

import 'moment/locale/es'
moment.locale('es')

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

const validationSchema = z.object({
  descripcion: z.string(),
  estado: z.string(),
  fecha_final: z.string().min(1, { message: 'La fecha es obligatoria' }),
  fecha_inicio: z.string(),
  id_paciente: z.string(),
  id_doctor: z.string(),
  fecha_registro: z.string()
})

  type ValidationSchema = z.infer<typeof validationSchema>

export default function SolicitarCitasPaciente ({ events }: { events: Events[] }) {
  // const [state, setState] = React.useState<Events[]>(events)
  const [isOpen, setIsOpen] = React.useState(false)
  const [eventSelected, setEventSelected] = React.useState<Events | null>(null)

  const handleNewEvent = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleCancel = useCallback(() => {
    setIsOpen(false)
  }, [])

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

  const [isPending, startTransition] = useTransition()

  // const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      descripcion: eventSelected?.info?.descripcion ?? 'No disponible',
      estado: '',
      fecha_final: '',
      fecha_inicio: '',
      id_paciente: '',
      id_doctor: '',
      fecha_registro: ''
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      const { citasInsert, errorCitasInsert } = await createCitaByPaciente({
        data
      })

      if (errorCitasInsert) {
        toast.error('Error al crear la cita')
        return
      } else {
        toast.success('La cita ha sido creada Exitosamente!')
        reset()
      }

      if (!citasInsert) {
        toast.error('Error al crear la cita')
      }
    })
  }

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

  function toLocalISOString ({ date }: { date: Date }) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - offset * 60 * 1000)
    return date.toISOString().slice(0, -1)
  }

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
        events={events}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
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

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='capitalize'>
              Cita: {eventSelected?.info?.descripcion}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Información de la cita
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
            <aside className='grid gap-3'>
              <div>
                <Label className=' text-lg'>Informacion del paciente</Label>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label className='' htmlFor='full-name'>
                    Nombre del paciente
                  </Label>
                  <Input
                    placeholder='Nombre Completo'
                    type='text'
                    autoCapitalize='none'
                    autoComplete='full-name'
                    autoCorrect='off'
                    autoFocus
                    defaultValue={
                      `${eventSelected?.info?.paciente?.nombre ?? 'No disponible'} ${eventSelected?.info?.paciente?.apellido ?? 'No disponible'}`
                    }
                    disabled={isPending}
                    tabIndex={0}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label className='' htmlFor='full-name'>
                    Nombre del doctor
                  </Label>
                  <Input
                    placeholder='Nombre Completo Doctor'
                    type='text'
                    autoCapitalize='none'
                    autoComplete='full-name'
                    autoCorrect='off'
                    autoFocus
                    defaultValue={
                      `${eventSelected?.info?.doctor?.nombre ?? 'No disponible'} ${eventSelected?.info?.doctor?.apellido ?? 'No disponible'}`
                    }
                    disabled
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label className='' htmlFor='genero'>
                    Genero
                  </Label>
                  <Input
                    placeholder='Nombre'
                    type='text'
                    autoCapitalize='none'
                    autoComplete='first-name'
                    autoCorrect='off'
                    autoFocus
                    defaultValue={
                      eventSelected?.info?.paciente?.genero ?? 'No disponible'
                    }
                    disabled
                  />
                </div>
                <div className='grid gap-2'>
                  <Label className='' htmlFor='fecha-nacimiento'>
                    Fecha de nacimiento
                  </Label>
                  <Input
                    placeholder='Apellidos'
                    type='text'
                    autoCapitalize='none'
                    autoComplete='family-name'
                    autoCorrect='off'
                    defaultValue={
                      eventSelected?.info?.paciente?.fecha_nacimiento
                        ? formatFecha(
                          new Date(
                            eventSelected?.info?.paciente?.fecha_nacimiento
                          ),
                          'es-HN'
                        )
                        : 'No disponible'
                    }
                    disabled
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-1 gap-4'>
                <div className='grid gap-2'>
                  <Label className='' htmlFor='descripcion'>
                    Descripcion
                  </Label>
                  <Input
                    placeholder='Nombre'
                    type='text'
                    autoCapitalize='none'
                    autoComplete='descripcion'
                    autoCorrect='off'
                    autoFocus
                    defaultValue={
                      eventSelected?.info?.descripcion ?? 'No disponible'
                    }
                    disabled={isPending}
                    tabIndex={0}
                    className={
                        errors.descripcion
                          ? 'border-red-500  !placeholder-red-500 text-red-500'
                          : ''
                      }
                      {...register('descripcion')}
                  />
                  {errors.descripcion && (
                    <p className="text-xs italic text-red-500 mt-0">
                    {errors.descripcion?.message}
                     </p>)}
                </div>
              </div>
            </aside>

            <aside className='grid gap-3'>
              <div>
                <Label className=' text-lg'>Detalles de la cita</Label>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label className='' htmlFor='first-name'>
                    Fecha de inicio
                  </Label>
                  <Input
                    type='datetime-local'
                    defaultValue={
                      eventSelected?.start
                        ? toLocalISOString({ date: new Date(eventSelected?.start.toISOString()) })
                        : new Date().toISOString().split('Z')[0]
                    }
                  />

                </div>
                <div className='grid gap-2'>
                  <Label className='' htmlFor='family-name'>
                    Fecha de finalización
                  </Label>
                  <Input
                    type='datetime-local'
                    defaultValue={
                      eventSelected?.end
                        ? toLocalISOString({ date: new Date(eventSelected?.end.toISOString()) })
                        : new Date().toISOString().split('Z')[0]
                    }
                  />
                </div>
              </div>
            </aside>
          </form>
          <AlertDialogFooter>
            <footer className='w-full flex justify-between '>

              {/* <Button asChild variant={'link'}>
                  <Link href={`calendario/${eventSelected?.info?.id}`}>
                    Ver detalles
                  </Link>
              </Button> */}
              <div className='flex gap-3'>
                <AlertDialogCancel className='bg-gray-600 text-white' onClick={handleCancel}>Cerrar</AlertDialogCancel>
                <Button
                disabled={isPending}
                className='bg-sec-var-800'
                >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
                )}
                Guardar
                </Button>
                {/* <Button
                disabled={isPending}
                className='bg-red-700'
                >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
                )}
                Eliminar
                </Button> */}
              </div>
            </footer>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
