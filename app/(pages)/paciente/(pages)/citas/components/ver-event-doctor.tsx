'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  // AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

export default function VerEventsDoctor ({
  isOpen,
  setIsOpen,
  eventSelected
}: {
  eventSelected: Events | null
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}) {
//   const [state, setState] = React.useState<Events[]>(eventsDoctor)
//   const [isOpen, setIsOpen] = React.useState(false)
//   const [eventSelected] = React.useState<Events | null>(null)

  //   const onEventResize = (args: EventInteractionArgs<object>) => {
  //     const { start, end } = args

  //     setState((state) => {
  //       return state.map((event) => {
  //         if (event.id === (args.event as Events).id) {
  //           return { ...event, start: start as Date, end: end as Date }
  //         } else {
  //           return event
  //         }
  //       })
  //     })
  //   }

  //   const onEventDrop = (args: EventInteractionArgs<object>) => {
  //     const { start, end } = args

  //     setState((prevState) => {
  //       // Creamos una nueva copia de los eventos
  //       const newEvents = [...prevState]

  //       // Buscamos el evento que se ha movido y actualizamos sus fechas
  //       const eventIndex = newEvents.findIndex(
  //         (event) => event.id === (args.event as Events).id
  //       )
  //       if (eventIndex !== -1) {
  //         newEvents[eventIndex] = {
  //           ...newEvents[eventIndex],
  //           start: start as Date,
  //           end: end as Date
  //         }
  //       }

  //       // Devolvemos los nuevos eventos como el nuevo estado
  //       return newEvents
  //     })
  //   }

  return (
    <>
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
          <AlertDialogFooter>
            <footer className='w-full flex justify-between '>
              <div className='flex gap-3'>
              <AlertDialogCancel className='bg-gray-500 hover:bg-gray-600 text-white hover:text-white focus:outline-none'>Cerrar</AlertDialogCancel>
              </div>
            </footer>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
