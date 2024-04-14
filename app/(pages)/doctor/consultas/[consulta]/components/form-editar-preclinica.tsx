'use client'

import * as React from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useTransition } from 'react'
import { updateConsulta } from '../../../actions'

const validationSchema = z.object({
  temperatura: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value)
      return !isNaN(parsedValue) && parsedValue >= 25 && parsedValue <= 45
    },
    { message: 'La temperatura debe ser un número válido entre 25 y 45' }
  ).transform(parseFloat),
  presion_arterial: z.string().regex(/\d+\/\d+/, {
    message: 'La presion_arterial debe tener el formato sistólica/diastólica'
  }),
  saturacion_oxigeno: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value)
      return !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100
    },
    { message: 'La saturación debe ser un número válido entre 0 y 100' }
  ),
  sintomas: z.string().min(1, { message: 'Los síntomas son requeridos' }),
  id_expediente: z.string(),
  id_estado_consulta: z.string()
})

type ValidationSchema = z.infer<typeof validationSchema>

export function FormEditarPreclinica ({ consulta }: { consulta: Consultas | null }) {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id_expediente: '',
      id_estado_consulta: '',
      presion_arterial: consulta?.presion_arterial ?? '',
      saturacion_oxigeno: consulta?.saturacion_oxigeno ?? ''
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    // Compara los valores actuales del formulario con los valores originales de la consulta
    const updatedData = {
      id: consulta?.id,
      ...(consulta?.temperatura !== data.temperatura && { temperatura: data.temperatura }),
      ...(consulta?.presion_arterial !== data.presion_arterial && { presion_arterial: data.presion_arterial }),
      ...(consulta?.saturacion_oxigeno !== data.saturacion_oxigeno && { saturacion_oxigeno: data.saturacion_oxigeno }),
      ...(consulta?.sintomas !== data.sintomas && { sintomas: data.sintomas })
    }

    // Si no hay cambios en los signos vitales, no enviar la actualización
    if (Object.keys(updatedData).length === 1) {
      toast.warn('No realizo ningun cambio cambio')

      return
    }

    startTransition(async () => {
      const { consultaUpdate, errorConsultaUpdate } = await updateConsulta({
        data: updatedData
      })
      console.log(consultaUpdate, errorConsultaUpdate)

      if (errorConsultaUpdate) {
        toast.error('Error al actualizar la consulta')
        return
      } else {
        toast.success('Los Datos han sido actualizados Exitosamente!')
      }

      if (!consultaUpdate) {
        toast.error('Error al actualizar la consulta')
      }
    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Peso">
                Peso (kg)
              </Label>
              <Input
                placeholder="kg.gg"
                type="text"
                autoCapitalize="none"
                autoComplete="Peso"
                autoCorrect="off"
                disabled
                defaultValue={`${consulta?.peso}`}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Estatura">
                Estatura (m)
              </Label>
              <Input
                placeholder="Estatura"
                type="text"
                autoCapitalize="none"
                autoComplete="Estatura"
                autoCorrect="off"
                disabled
                defaultValue={`${consulta?.estatura}`}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Temperatura">
                Temperatura (°C)
              </Label>
              <Input
                placeholder="00"
                type="text"
                autoCapitalize="none"
                autoComplete="Temperatura"
                autoCorrect="off"
                disabled={isPending}
                defaultValue={`${consulta?.temperatura}`}
                className={
                  errors.temperatura
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('temperatura')}
              />
              {errors.temperatura && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.temperatura?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-2">
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Presion">
                Presión Arterial (mmHg)
              </Label>
              <Input
                placeholder="SS/DD"
                type="text"
                autoCapitalize="none"
                autoComplete="Presion"
                autoCorrect="off"
                disabled={isPending}
                defaultValue={`${consulta?.presion_arterial}`}
                className={
                  errors.presion_arterial
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('presion_arterial')}
              />
              {errors.presion_arterial && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.presion_arterial?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="saturacion_oxigeno">
                Saturación Oxígeno (%)
              </Label>
              <Input
                placeholder="dd"
                type="text"
                autoCapitalize="none"
                autoComplete="saturacion_oxigeno"
                autoCorrect="off"
                disabled={isPending}
                defaultValue={`${consulta?.saturacion_oxigeno}`}
                className={
                  errors.saturacion_oxigeno
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('saturacion_oxigeno')}
              />
              {errors.saturacion_oxigeno && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.saturacion_oxigeno?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <Label className="mb-2" htmlFor="Sintomas">
              Síntomas
            </Label>
            <Input
              placeholder="Ingrese los síntomas del paciente"
              type="textarea"
              autoCapitalize="none"
              autoComplete="Sintomas"
              autoCorrect="off"
              disabled={isPending}
              defaultValue={`${consulta?.sintomas}`}
              className={
                errors.sintomas
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('sintomas')}
            />
            {errors.sintomas && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.sintomas?.message}
              </p>
            )}
          </div>

          <Button
            disabled={isPending}
            className="py-3 px-4 inline-flex bg-blue-500 text-white items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border   hover:bg-blue-600 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Actualizar signos vitales
          </Button>
        </div>
      </form>

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
