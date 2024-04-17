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
import {
  getUserByDNI,
  getUserByCorreo,
  createPersona,
  setRolePacienteUser,
  signUpWithEmailAndTempPass,
  sendMailSingup
} from '../actions'
import { useRouter } from 'next/navigation'

const validationSchema = z.object({
  correo: z
    .string()
    .min(1, { message: 'El correo electrónico es obligatorio' })
    .email({
      message: 'Debe ser un correo electrónico válido'
    }),
  nombre: z.string().min(1, { message: 'El nombre es obligatorio' }),
  apellido: z.string().min(1, { message: 'El apellido es obligatorio' }),
  genero: z.string().min(1, { message: 'El genero es obligatorio' }),
  fecha_nacimiento: z
    .string()
    .min(1, { message: 'La fecha de nacimiento es obligatoria' }),
  direccion: z.string().min(1, { message: 'La dirección es obligatoria' }),
  dni: z
    .string()
    .min(1, { message: 'El DNI es obligatorio' })
    .regex(/^\d{4}-?\d{4}-?\d{5}$/, {
      message: 'El DNI debe tener el formato dddd-dddd-ddddd'
    }),
  telefono: z
    .string()
    .min(1, { message: 'El telefono es obligatorio' })
    .regex(/^\d{4}-?\d{4}$/, {
      message: 'El telefono debe tener el formato dddd-dddd'
    })
})

type ValidationSchema = z.infer<typeof validationSchema>

export function EnfermeroPacienteForm () {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const handleRecargar = () => {
    router.refresh() // Recarga la página
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      correo: '',
      nombre: '',
      apellido: '',
      dni: '',
      fecha_nacimiento: '',
      direccion: '',
      telefono: ''
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    // identificar si dni contiene guiones, si es así, quitarlos
    // luego si no tiene agrega guiones dddd-dddd-ddddd
    if (data.dni.includes('-')) {
      data.dni = data.dni.replace(/-/g, '')
    }
    if (data.dni.length === 13) {
      data.dni = `${data.dni.slice(0, 4)}-${data.dni.slice(
        4,
        8
      )}-${data.dni.slice(8, 13)}`
    }

    startTransition(async () => {
      const { dataDni } = await getUserByDNI({
        dni: data.dni
      })

      if (dataDni && dataDni?.length > 0) {
        toast.error('El usuario ya está registrado en el sistema.')
        return
      }

      const { dataCorreo } = await getUserByCorreo({
        correo: data.correo
      })

      if (dataCorreo && dataCorreo?.length > 0) {
        toast.error('El usuario ya está registrado en el sistema.')
        return
      }

      // Crear persona
      const { persona, errorPersona } = await createPersona({ data })
      if (errorPersona) {
        toast.error(errorPersona.message)
        return
      }

      if (!persona) {
        toast.error('Error al crear la persona')
        return
      }

      const { data: setRole, error: errorSetRole } = await setRolePacienteUser({
        id: persona.id,
        rol: 'paciente'
      })

      if (errorSetRole) {
        if (typeof errorSetRole === 'string') {
          toast.error(errorSetRole)
        } else {
          toast.error(errorSetRole.message)
        }
        return
      }

      if (!setRole) {
        toast.error('Error al asignar el rol de paciente')
        return
      }

      // Crear un codigo de 6 digitos y letras como contraseña temporal
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()

      const { userCreate, errorUserCreate } = await signUpWithEmailAndTempPass({
        email: data.correo,
        idPersona: persona.id,
        passwordTemp: randomCode
      })
      if (errorUserCreate) {
        toast.error(errorUserCreate.message)
        return
      }

      if (userCreate) {
        toast.success('Usuario creado exitosamente')
      }

      const { dataEmail, errorEmail } = await sendMailSingup({
        email: data.correo ?? '',
        nombrePersona: data.nombre,
        passwordTemp: randomCode
      })

      if (errorEmail) {
        toast.error('Error al enviar el correo electrónico')
        return
      }

      if (dataEmail) {
        toast.success('Correo electrónico enviado exitosamente')
        handleRecargar()
      }
    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <Label className="" htmlFor="first-name">
                Nombres
              </Label>
              <Input
                placeholder="Nombre"
                type="text"
                autoCapitalize="none"
                autoComplete="first-name"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.nombre
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('nombre')}
              />
              {errors.nombre && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.nombre?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="" htmlFor="family-name">
                Apellidos
              </Label>
              <Input
                placeholder="Apellidos"
                type="text"
                autoCapitalize="none"
                autoComplete="family-name"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.apellido
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('apellido')}
              />
              {errors.apellido && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.apellido?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="" htmlFor="DNI">
              DNI
            </Label>
            <Input
              placeholder="0801-12345-67890"
              type="text"
              autoCapitalize="none"
              autoComplete="dni"
              autoCorrect="off"
              disabled={isPending}
              className={
                errors.dni
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('dni')}
            />
            {errors.dni && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.dni?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="" htmlFor="email">
              Correo electrónico
            </Label>
            <Input
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              className={
                errors.correo
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('correo')}
            />
            {errors.correo && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.correo?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="" htmlFor="fecha_nacimiento">
              Fecha de nacimiento
            </Label>
            <Input
              type="date"
              autoComplete="fecha_nacimiento"
              disabled={isPending}
              className={
                errors.fecha_nacimiento
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('fecha_nacimiento')}
            />
            {errors.fecha_nacimiento && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.fecha_nacimiento?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="" htmlFor="address">
              Direccion
            </Label>
            <Input
              type="text"
              autoComplete="address"
              placeholder="Tegucigalpa, Francisco Morazán, Honduras"
              disabled={isPending}
              className={
                errors.direccion
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('direccion')}
            />
            {errors.direccion && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.direccion?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="" htmlFor="genero">
              Genero
            </Label>
            <select
              disabled={isPending}
              className={`p-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                errors.genero
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }`}
              {...register('genero')}
            >
              <option>Masculino</option>
              <option>Femenino</option>
            </select>
            {errors.genero && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.genero?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="" htmlFor="phone">
              Telefono
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="hs-inline-leading-select-label"
                className={`ps-28 ${
                  errors.telefono
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }`}
                placeholder="0000-0000"
                disabled={isPending}
                {...register('telefono')}
              />
              <div className="absolute inset-y-0 start-0 flex items-center text-gray-500 ps-px">
                <label
                  htmlFor="hs-inline-leading-select-country"
                  className="sr-only"
                >
                  Pais
                </label>
                <select
                  id="hs-inline-leading-select-country"
                  className="block w-full border-transparent rounded-lg focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-800"
                >
                  <option>HN (+504)</option>
                  {/* <option>MX (+52)</option>
                    <option>US (+1)</option> */}
                </select>
              </div>
            </div>
            {errors.telefono && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.telefono?.message}
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
            Registrar paciente
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
