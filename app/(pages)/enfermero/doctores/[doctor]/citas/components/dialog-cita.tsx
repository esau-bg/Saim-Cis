'use client'
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
import { formatFecha } from '@/app/actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { citaCancel } from '@/app/(pages)/doctor/actions'
import { useRouter } from 'next/navigation'

const validationSchema = z.object({
  fechaInicio: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'La fecha de inicio no es válida'
  }),
  fechaFin: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'La fecha de finalización no es válida'
  })
}).refine(data => data.fechaInicio < data.fechaFin, {
  message: 'La fecha de inicio debe ser anterior a la fecha de finalización',
  path: ['fechaInicio']
})
type ValidationSchema = z.infer<typeof validationSchema>

export default function DialogCita ({
  isOpen,
  setIsOpen,
  eventSelected
}: {
  eventSelected: Events | null
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    if (errors.fechaInicio ?? errors.fechaFin) return
    startTransition(async () => {
      // comprobar si hay cambios en las fechas
      if (eventSelected?.start.toISOString() === data.fechaInicio.toISOString() && eventSelected?.end.toISOString() === data.fechaFin.toISOString()) {
        toast.warn('No realizo ningun cambio en la cita')
        setIsOpen(false)
        return
      }

      toast.success('Cita actualizada correctamente')
      setIsOpen(false)
    })
  }

  function toLocalISOString ({ date }: { date: Date }) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - offset * 60 * 1000)
    return date.toISOString().slice(0, -1)
  }

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('fechaInicio', new Date(e.target.value))
    trigger('fechaInicio')
  }

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('fechaFin', new Date(e.target.value))
    trigger('fechaFin')
  }

  const handleClick = () => {
    const fechaInicio = getValues('fechaInicio')
    const fechaFin = getValues('fechaFin')
    if (!fechaInicio) {
      setValue('fechaInicio', new Date(eventSelected?.start?.toISOString() ?? ''))
      trigger('fechaInicio')
    }
    if (!fechaFin) {
      setValue('fechaFin', new Date(eventSelected?.end?.toISOString() ?? ''))
      trigger('fechaFin')
    }

    onSubmit(getValues())
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

  return (
    <>
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
        <form className='grid gap-3' onSubmit={handleSubmit(onSubmit)}>
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
                      ? toLocalISOString({
                        date: new Date(eventSelected?.start.toISOString())
                      })
                      : new Date().toISOString().split('Z')[0]
                  }
                  onChange={(e) => {
                    handleChangeStart(e)
                  }}
                />
                {
                    errors.fechaInicio && (
                        <p className='text-xs italic text-red-500 mt-0'>
                        {errors.fechaInicio?.message}
                        </p>
                    )
                }
              </div>
              <div className='grid gap-2'>
                <Label className='' htmlFor='family-name'>
                  Fecha de finalización
                </Label>
                <Input
                  type='datetime-local'
                  defaultValue={
                    eventSelected?.end
                      ? toLocalISOString({
                        date: new Date(eventSelected?.end.toISOString())
                      })
                      : new Date().toISOString().split('Z')[0]
                  }
                  onChange={(e) => {
                    handleChangeEnd(e)
                  }}
                />
                {
                    errors.fechaFin && (
                        <p className='text-xs italic text-red-500 mt-0'>
                        {errors.fechaFin?.message}
                        </p>
                    )
                }
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
            <div className='flex gap-2'>
              <AlertDialogCancel className='bg-slate-500 hover:bg-slate-600 text-white hover:text-white focus:outline-none'>Cerrar</AlertDialogCancel>
              <Button onClick={handleClick} className='bg-sec hover:bg-sec-var-600'>
                    {isPending ? 'Guardando...' : 'Guardar'}

                </Button>
                <div>
              <AlertDialogAction className='bg-rose-600 hover:bg-rose-800 dark:text-white' onClick={() => { eliminarCita(eventSelected?.id ?? '') }
                  }>Cancelar cita</AlertDialogAction>
              </div>
            </div>
          </footer>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
