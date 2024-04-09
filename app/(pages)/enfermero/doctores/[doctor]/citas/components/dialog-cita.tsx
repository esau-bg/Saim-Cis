'use client'
import {
  AlertDialog,
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
        <form className='grid gap-3' onSubmit={handleSubmit(onSubmit)}>
          <aside className='grid gap-3'>
            <div>
              <Label className=' text-lg'>Informacion del paciente</Label>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label className='' htmlFor='first-name'>
                  Nombre Paciente
                </Label>
                <Input
                  placeholder='Nombre'
                  type='text'
                  autoCapitalize='none'
                  autoComplete='first-name'
                  autoCorrect='off'
                  autoFocus
                  defaultValue={
                    eventSelected?.info?.paciente?.nombre ?? 'No disponible'
                  }
                  disabled
                />
              </div>
              <div className='grid gap-2'>
                <Label className='' htmlFor='family-name'>
                  Apellido Paciente
                </Label>
                <Input
                  placeholder='Apellidos'
                  type='text'
                  autoCapitalize='none'
                  autoComplete='family-name'
                  autoCorrect='off'
                  defaultValue={
                    eventSelected?.info?.paciente?.apellido ?? 'No disponible'
                  }
                  disabled
                />
              </div>
              <div className='grid gap-2'>
                <Label className='' htmlFor='first-name'>
                  Nombre Doctor
                </Label>
                <Input
                  placeholder='Nombre'
                  type='text'
                  autoCapitalize='none'
                  autoComplete='first-name'
                  autoCorrect='off'
                  autoFocus
                  defaultValue={
                    eventSelected?.info?.paciente?.nombre ?? 'No disponible'
                  }
                  disabled
                />
              </div>
              <div className='grid gap-2'>
                <Label className='' htmlFor='first-name'>
                  Especialidad Doctor
                </Label>
                <Input
                  placeholder='Especialidad'
                  type='text'
                  autoCapitalize='none'
                  autoComplete='first-name'
                  autoCorrect='off'
                  autoFocus
                  defaultValue={
                    eventSelected?.info?.paciente?.nombre ?? 'No disponible'
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
              <AlertDialogCancel>Cerrar</AlertDialogCancel>
              <Button onClick={handleClick}>
                    {isPending ? 'Guardando...' : 'Guardar'}

                </Button>
            </div>
          </footer>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
