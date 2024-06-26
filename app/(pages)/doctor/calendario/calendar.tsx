'use client'
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import {
  AlertDialog,
  AlertDialogAction,
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

import 'moment/locale/es'
import { citaCancel, citaCompleta } from '../actions'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
moment.locale('es')

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

export default function CitasDoctor ({ events, infoMedico }: { events: Events[], infoMedico: InfoMedicoJornada }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [eventSelected, setEventSelected] = React.useState<Events | null>(null)
  const router = useRouter()

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const minDate = infoMedico?.jornada?.hora_inicio ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(infoMedico?.jornada?.hora_inicio)) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  const maxDate = infoMedico?.jornada?.hora_final ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(infoMedico?.jornada?.hora_final)) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

  const scrollToTime = new Date(1970, 1, 1, 6)

  function toLocalISOString ({ date }: { date: Date }) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - offset * 60 * 1000)
    return date.toISOString().slice(0, -1)
  }

  const eliminarCita = async (cita: string) => {
    const { citasCancel, errorCitasCancel } = await citaCancel(cita)

    if (errorCitasCancel) {
      toast.error('Error al cancelar la cita')
      return
    }
    if (citasCancel) {
      toast.success('La cita ha sido cancelada')
      router.refresh()
    }
  }

  const CompletarCita = async (cita: string) => {
    const { citasCompleta, errorCitasCompleta } = await citaCompleta(cita)

    if (errorCitasCompleta) {
      toast.error('Error al completar la cita')
      return
    }
    if (citasCompleta) {
      toast.success('La cita ha sido completada')
      router.refresh()
    }
  }

  const [theme] = useState('dark')

  return (
    <div className='flex flex-col p-6 gap-4 md:mx-8 lg:mx-8 xl:mx-8'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-medium text-sec'>
            Doc. {infoMedico?.nombre}{' '}
            {infoMedico?.apellido}
          </h1>
          <p className='text-slate-500'>
            Selecciona una cita para poder cancelarla.
          </p>
        </div>
        <div className='flex flex-col'>
          <h2 className=' font-medium'>Horario de atención:</h2>
          <p className='text-slate-500'>
            {infoMedico?.jornada?.hora_inicio} -{' '}
            {infoMedico?.jornada?.hora_final}
          </p>
        </div>
      </div>
      <hr />
    <div className='App h-[70vh] flex justify-center'>
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
        defaultView='month'
        views={['month', 'week', 'day']}
        events={events}
        localizer={localizer}
        selectable
        scrollToTime={scrollToTime}
        min={minDate}
        max={maxDate}

        onDoubleClickEvent={(
          event: object,
          e: React.SyntheticEvent<HTMLElement, Event>
        ) => {
          setIsOpen(true)
          setEventSelected(event as Events)
        }}
        draggableAccessor={() => false}
        resizableAccessor={() => false}
        className={`rbc-calendar-${theme} w-full max-w-5xl`}
      />

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='capitalize'>
              Cita: {eventSelected?.info?.descripcion}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className='flex flex-col gap-3 justify-between'>
                <div>
                  <p>Información de la cita</p>
                </div>
                <div>
                  <p>Estado:
                    <span
                      className={`capitalize px-2 py-1 rounded-md mx-2
                          ${
                            eventSelected?.info?.estado === 'completada'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500'
                              : eventSelected?.info?.estado === 'pendiente'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                              : eventSelected?.info?.estado === 'no disponible'
                              ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500'
                              : eventSelected?.info?.estado === 'cancelada'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                              : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-500'
                          }
                        `}
                        >
                          {eventSelected?.info?.estado ?? 'No disponible'}
                    </span>
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form className='grid gap-3'>
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
                    disabled
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
            <footer className='w-full flex justify-between'>
              <div className='flex gap-2'>
              <AlertDialogCancel className='bg-gray-500 hover:bg-gray-600 text-white hover:text-white focus:outline-none'>Cerrar</AlertDialogCancel>
              <div>
              <AlertDialogAction className='bg-sec hover:bg-sec-var-600 dark:text-white' onClick={() => { CompletarCita(eventSelected?.id ?? '') }
                  }>Completada</AlertDialogAction>
              </div>
              </div>
              <div>
              <AlertDialogAction className='bg-rose-600 hover:bg-rose-800 dark:text-white' onClick={() => { eliminarCita(eventSelected?.id ?? '') }
                  }>Cancelar cita</AlertDialogAction>
              </div>
            </footer>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
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
