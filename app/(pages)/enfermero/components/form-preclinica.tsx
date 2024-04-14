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
import { createConsulta, getExpedienteByIDPaciente } from '../actions'
import { getIDEstadoConsultaByEstado } from '@/app/actions'

const validationSchema = z.object({
  peso: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value)
      if (isNaN(parsedValue)) return false
      const decimalPart = value.split('.')[1]
      return decimalPart ? decimalPart.length <= 2 : true
    },
    { message: 'El peso debe ser un número válido y tener hasta dos decimales' }
  ).transform(parseFloat),
  estatura: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value)
      if (isNaN(parsedValue)) return false
      const decimalPart = value.split('.')[1]
      return decimalPart ? decimalPart.length <= 2 : true
    },
    {
      message:
        'La estatura debe ser un número válido y tener hasta dos decimales'
    }
  ).transform(parseFloat),
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

export function FormPreclinica ({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      presion_arterial: '',
      saturacion_oxigeno: '',
      sintomas: '',
      id_expediente: '',
      id_estado_consulta: '',
      peso: 0,
      estatura: 0,
      temperatura: 0
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      const { dataID, errorID } = await getExpedienteByIDPaciente({ id })

      const estado: EstadosConsultas = 'preclinica'
      const { dataIDEstado, errorIDEstado } = await getIDEstadoConsultaByEstado({ estado })
      if (errorID) {
        toast.error('La persona que intentas atender no posee un expediente')
        return
      }

      if (!dataID) {
        toast.error('La persona que intentas atender no posee un expediente')
        return
      }

      if (errorIDEstado) {
        toast.error('Error al crear consulta')
        return
      }

      if (!dataIDEstado) {
        toast.error('Error al crear consulta')
        return
      }

      // añadir a data el id del expediente
      data.id_expediente = dataID.id

      // añadir a data el id del estado predefinido (preclinica)
      data.id_estado_consulta = dataIDEstado.id

      const { consulta, errorConsulta } = await createConsulta({
        data
      })

      if (errorConsulta) {
        toast.error('La persona que intentas atender no posee un expediente')
        return
      } else {
        toast.success('Los Datos han sido guardados Exitosamente!')
        reset()
      }

      if (!consulta) {
        toast.error('Error al crear la consulta')
      }
    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col ">
              <Label className="mb-2" htmlFor="Peso">
                Peso (kg)
              </Label>
              <Input
                placeholder="kg.gg"
                type="text"
                autoCapitalize="none"
                autoComplete="Peso"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.peso
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('peso')}
              />
              {errors.peso && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.peso?.message}
                </p>
              )}
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
                disabled={isPending}
                className={
                  errors.estatura
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('estatura')}
              />
              {errors.estatura && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.estatura?.message}
                </p>
              )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
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
            Registrar datos
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
