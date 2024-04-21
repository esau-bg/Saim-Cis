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
import { createCitaByPaciente } from '../../../actions'
import { useRouter } from 'next/navigation'
// import Link from 'next/link'

const validationSchema = z.object({
  fecha_inicio: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'La fecha de inicio no es válida'
  }),
  fecha_final: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'La fecha de finalización no es válida'
  }),
  id_paciente: z.string(),
  id_doctor: z.string(),
  fecha_registro: z.string(),
  descripcion: z
    .string({
      required_error: 'La descripción es obligatoria'
    })
    .min(1, { message: 'La descripción es obligatoria' })
    .max(20, { message: 'La descripción no debe exceder los 20 caracteres' })
    .nonempty({ message: 'La descripción no debe estar vacía' }),
  estado: z.string()

}).refine(data => data.fecha_inicio < data.fecha_final, {
  message: 'La fecha de inicio debe ser anterior a la fecha de finalización',
  path: ['fecha_inicio']
})

  type ValidationSchema = z.infer<typeof validationSchema>

export default function SolicitarCitasPaciente ({
  isOpen,
  setIsOpen,
  eventSelected,
  infoDoctor,
  infoPaciente
}: {
  infoDoctor: InfoMedicoJornada
  eventSelected: Events | null
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
  infoPaciente: UserType
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // const router = useRouter()
  const {
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      estado: 'pendiente',
      id_paciente: infoPaciente?.id ?? '',
      id_doctor: infoDoctor?.id ?? ''
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    if (errors.fecha_inicio ?? errors.fecha_final ?? errors.descripcion) return
    if (data.descripcion === '') return

    startTransition(async () => {
      // comprobar si la cita no traslapa con otra

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { fecha_inicio, fecha_final, ...rest } = data
      const formattedData = {
        ...rest,
        fecha_inicio: fecha_inicio.toISOString(),
        fecha_final: fecha_final.toISOString()
      }

      const { citasInsert, errorCitasInsert } = await createCitaByPaciente({ data: formattedData })

      if (errorCitasInsert) {
        toast.error('Error al crear la cita')
        return
      }

      if (!citasInsert) {
        toast.error('Error al crear la cita')
        return
      }
      toast.success('Cita actualizada correctamente')
      setIsOpen(false)
      router.refresh()
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
    setValue('fecha_final', new Date(e.target.value))
    trigger('fecha_final')
  }

  const handleClick = () => {
    const fechaInicio = getValues('fecha_inicio')
    const fechaFin = getValues('fecha_final')
    const descripcion = getValues('descripcion')
    if (!fechaInicio) {
      setValue('fecha_inicio', new Date(eventSelected?.start?.toISOString() ?? ''))
      trigger('fecha_inicio')
    }
    if (!fechaFin) {
      setValue('fecha_final', new Date(eventSelected?.end?.toISOString() ?? ''))
      trigger('fecha_final')
    }

    if (!descripcion) {
      setValue('descripcion', '')
      trigger('descripcion')
    }

    onSubmit(getValues())
  }

  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('descripcion', e.target.value)
    trigger('descripcion')
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
                    defaultValue={`${infoPaciente?.nombre} ${infoPaciente?.apellido}` ?? 'No disponible'}
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
                      `${infoDoctor?.nombre} ${infoDoctor?.apellido}` ?? 'No disponible'
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
                      infoPaciente?.genero ?? 'No disponible'
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
                      infoPaciente?.fecha_nacimiento
                        ? formatFecha(
                          new Date(
                            infoPaciente?.fecha_nacimiento
                          ),
                          'es-HN',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }
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
                    onChange={(e) => { changeDescription(e) }}
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
                      errors.fecha_final && (
                          <p className='text-xs italic text-red-500 mt-0'>
                          {errors.fecha_final?.message}
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
              <AlertDialogCancel className='bg-slate-500 hover:bg-slate-600 text-white hover:text-white focus:outline-none'>Cerrar</AlertDialogCancel>
                <Button
                onClick={handleClick}
                disabled={isPending}
                className='bg-sec hover:bg-sec-var-600'
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
