'use client'
import React, { useTransition } from 'react'
import { toast } from 'react-toastify'
import { Icons } from '@/components/icons'
// import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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

import { formatFecha } from '@/app/actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import Link from 'next/link'

const validationSchema = z.object({
  descripcion: z.string(),
  estado: z.string(),
  fecha_inicio: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'La fecha de inicio no es válida'
  }),
  fecha_fin: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'La fecha de finalización no es válida'
  }),
  id_paciente: z.string(),
  id_doctor: z.string(),
  fecha_registro: z.string()
}).refine(data => data.fecha_inicio < data.fecha_fin, {
  message: 'La fecha de inicio debe ser anterior a la fecha de finalización',
  path: ['fecha_inicio']
})

  type ValidationSchema = z.infer<typeof validationSchema>

export default function SolicitarCitasPaciente ({
  isOpen,
  setIsOpen,
  eventSelected
}: {
  eventSelected: Events | null
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}) {
  const [isPending, startTransition] = useTransition()

  // const router = useRouter()
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
    if (errors.fecha_inicio ?? errors.fecha_fin) return
    startTransition(async () => {
      // comprobar si hay cambios en las fechas
      if (eventSelected?.start.toISOString() === data.fecha_inicio.toISOString() && eventSelected?.end.toISOString() === data.fecha_fin.toISOString()) {
        toast.error('No se puede crear la cita')
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
    setValue('fecha_inicio', new Date(e.target.value))
    trigger('fecha_inicio')
  }

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('fecha_fin', new Date(e.target.value))
    trigger('fecha_fin')
  }

  const handleClick = () => {
    const fechaInicio = getValues('fecha_inicio')
    const fechaFin = getValues('fecha_fin')
    if (!fechaInicio) {
      setValue('fecha_inicio', new Date(eventSelected?.start?.toISOString() ?? ''))
      trigger('fecha_inicio')
    }
    if (!fechaFin) {
      setValue('fecha_fin', new Date(eventSelected?.end?.toISOString() ?? ''))
      trigger('fecha_fin')
    }

    onSubmit(getValues())
  }

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='capitalize'>
              Nueva Cita
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
                    placeholder='Ingrese una descripcion'
                    type='text'
                    autoCapitalize='none'
                    autoComplete='descripcion'
                    autoCorrect='off'
                    autoFocus
                    // defaultValue={
                    //   eventSelected?.info?.descripcion ?? 'No disponible'
                    // }
                    disabled={isPending}
                    tabIndex={0}
                    className={
                        errors.descripcion
                          ? 'border-red-500  !placeholder-red-500 text-red-500'
                          : ''
                      }
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
                      errors.fecha_inicio && (
                          <p className='text-xs italic text-red-500 mt-0'>
                          {errors.fecha_inicio?.message}
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
                      errors.fecha_fin && (
                          <p className='text-xs italic text-red-500 mt-0'>
                          {errors.fecha_fin?.message}
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
              <div className='flex gap-3'>
              <AlertDialogCancel className='bg-gray-500 hover:bg-gray-600 text-white hover:text-white focus:outline-none'>Cerrar</AlertDialogCancel>
                <Button
                onClick={handleClick}
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

      </>
  )
}
