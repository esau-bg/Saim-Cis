'use client'

import * as React from 'react'
import classNames from 'classnames'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AsyncSelect from 'react-select/async'
import { type MultiValue } from 'react-select'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useTransition } from 'react'
import {
  verifyUser,
  createPersona,
  createRandomCode,
  signUpWithEmailAndTempPass,
  getEspecializacionesByRol,
  setEspecializacionUser
} from '../actions'
import { useRouter } from 'next/navigation'
import { sendMailSingup } from '../actions/email'

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
    }),
  especializaciones: z.array(z.object({ id: z.string(), nombre: z.string(), id_rol: z.string() }))
    .min(1, { message: 'Debe seleccionar al menos una especialización' })

})

type ValidationSchema = z.infer<typeof validationSchema>

const multiValue: string = '!bg-sec-var-200 dark:!bg-sec-var-900 !rounded-md !text-white'
const multiValueLabel: string = '!text-sec-var-900 dark:!text-sec-var-100'
const multiValueRemove: string = 'hover:!bg-sec-var-300 dark:hover:!bg-sec-var-700 duration-300 !text-sec-var-900 dark:!text-sec-var-100'
const control: string = ' !rounded-md !border !border-input !bg-background  !ring-offset-background file:!border-0 file:!bg-transparent !text-sm file:text-sm file:font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50'
const option: string = '!text-gray-900 dark:!text-gray-100 !bg-white dark:!bg-slate-800 hover:!bg-sec-var-200 dark:hover:!bg-sec-var-900 hover:!text-sec-var-900 dark:hover:!text-sec-var-100 cursor-pointer'
const menu: string = ' !rounded-md !bg-background dark:!bg-slate-800'

export function AdministradorDoctorForm () {
  const [isPending, startTransition] = useTransition()
  // const [especializaciones, setEspecializaciones] = React.useState<Especializaciones[] | null>([])
  // const [especializacionesError, setEspecializacionesError] = React.useState<
  // { message: string }
  // | null>(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
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
      telefono: '',
      especializaciones: []
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
      const { error } = await verifyUser({
        correo: data.correo,
        dni: data.dni
      })
      if (error) {
        toast.error(error.message)
        return
      }

      // Crear person
      const personaData = { ...data, especializaciones: undefined }
      delete personaData.especializaciones
      const { persona, errorPersona } = await createPersona({ data: personaData })
      if (errorPersona) {
        toast.error(errorPersona.message)
        return
      }

      if (!persona) {
        toast.error('Error al crear la persona')
        return
      }

      const { errorEspecializaciones } = await setEspecializacionUser({
        idPersona: persona.id,
        especializaciones: data.especializaciones
      })

      if (errorEspecializaciones) {
        if (errorEspecializaciones.code === '23505') {
          toast.error('La especialización ya está registrada')
          return
        }

        toast.error(errorEspecializaciones.message)
        return
      }

      const { randomCode } = createRandomCode({ min: 6, max: 6, letras: true })

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

      const emailResponse = await sendMailSingup({
        email: persona.correo ?? '',
        passwordTemp: randomCode,
        persona
      })

      if (emailResponse.accepted.includes(persona.correo ?? '')) {
        // Email was sent successfully
        toast.success('Correo electrónico enviado exitosamente')
        router.refresh()
      } else {
        // Email was not sent successfully
        toast.error('Error al enviar el correo electrónico')
      }
    })
  }

  const promiseOptions = async () =>
    await new Promise<Especializaciones[]>((resolve) => {
      setTimeout(async () => {
        const { data } = await getEspecializacionesByRol({ rol: 'doctor' })
        const formattedData = data?.map(item => ({
          ...item,
          value: item.id,
          label: item.nombre
        })) ?? []
        resolve(formattedData)
      }, 1000)
    })

  const handleOnChange = (
    newValue: MultiValue<Especializaciones>
  ) => {
    const convertedValue = newValue.map(item => ({
      id: item.id,
      id_rol: item.id_rol,
      nombre: item.nombre
    }))
    setValue('especializaciones', convertedValue)
    trigger('especializaciones')
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
                tabIndex={0}
                autoFocus
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
                // tabIndex={1}
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
              // tabIndex={2}
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
              // tabIndex={3}
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
            <Label className="" htmlFor="genero">
              Especialidades
            </Label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              className='capitalize'

              classNames={{
                control: (base) =>
                  classNames(base, control, errors.especializaciones ? '!border-red-500  !placeholder-red-500 !text-red-500' : ''),
                option: (base) =>
                  classNames(base, option),
                multiValue: (base) =>
                  classNames(base, multiValue),
                multiValueLabel: (base) =>
                  classNames(base, multiValueLabel),
                multiValueRemove: (base) =>
                  classNames(base, multiValueRemove),
                menu: (base) =>
                  classNames(base, menu)
              }}
              noOptionsMessage={() => 'No se encontraron especialidades'}
              placeholder='Seleccione las Especialidades'
              onChange={handleOnChange}
              loadOptions={promiseOptions}
            />
            {errors.especializaciones && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.especializaciones?.message}
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
            className="py-3 px-4 inline-flex bg-sec text-white items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border   hover:bg-sec-var-600  hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Registrar doctor
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
