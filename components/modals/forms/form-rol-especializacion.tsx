'use client'

import * as React from 'react'
import classNames from 'classnames'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import AsyncSelect from 'react-select/async'
import { type SingleValue, type MultiValue } from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useTransition } from 'react'

import { useRouter } from 'next/navigation'
import { getEspecializacionesByRol, getRoles, setEspecializacionUser, setRoleUser } from '@/app/actions'

const validationSchema = z.object({
  roles: z
    .object({ id: z.string(), nombre: z.string() })
    .refine((value) => value.id !== '', {
      message: 'Debe seleccionar un rol'
    }),
  especializaciones: z
    .array(z.object({ id: z.string(), nombre: z.string(), id_rol: z.string() }))
    .min(1, { message: 'Debe seleccionar al menos una especialización' })
})

type ValidationSchema = z.infer<typeof validationSchema>

const multiValue: string =
  '!bg-sec-var-200 dark:!bg-sec-var-900 !rounded-md !text-white'
const multiValueLabel: string = '!text-sec-var-900 dark:!text-sec-var-100'
const multiValueRemove: string =
  'hover:!bg-sec-var-300 dark:hover:!bg-sec-var-700 duration-300 !text-sec-var-900 dark:!text-sec-var-100'
const control: string =
  ' !rounded-md !border !border-input !bg-background  !ring-offset-background file:!border-0 file:!bg-transparent !text-sm file:text-sm file:font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50'
const option: string =
  '!text-gray-900 dark:!text-gray-100 !bg-white dark:!bg-slate-800 hover:!bg-sec-var-200 dark:hover:!bg-sec-var-900 hover:!text-sec-var-900 dark:hover:!text-sec-var-100 !cursor-pointer '
const menu: string = ' !rounded-md !bg-background dark:!bg-slate-800'

export function AdministradorRolEspecializacion ({
  persona
}: {
  persona: Personas
}) {
  const [isPending, startTransition] = useTransition()
  const [show, setShow] = React.useState(false)

  const router = useRouter()

  const {
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      roles: { id: '', nombre: '' },
      especializaciones: []
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      if (data.roles.nombre !== 'doctor') {
        const { data: setRole, error: errorSetRole } = await setRoleUser({
          id: persona.id,
          rol: data.roles.nombre
        })

        if (errorSetRole) {
          if (errorSetRole.code === '23505') {
            toast.error('El rol ya está asignado')
            return
          }

          toast.error(errorSetRole.message)
          return
        }

        if (!setRole) {
          toast.error('Error al asignar el rol de doctor')
          return
        }

        toast.success('Rol asignado correctamente')
        router.refresh()
        return
      }

      console.log(data.especializaciones)
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

      toast.success('Rol y especializaciones asignadas correctamente')
      router.refresh()
    })
  }

  const promiseOptionsEspecializaciones = async () =>
    await new Promise<Especializaciones[]>((resolve) => {
      setTimeout(async () => {
        const { data } = await getEspecializacionesByRol({
          rol: getValues('roles').nombre
        })
        const formattedData =
          data?.map((item) => ({
            ...item,
            value: item.id,
            label: item.nombre
          })) ?? []
        resolve(formattedData)
      }, 1000)
    })

  const promiseRoles = async () =>
    await new Promise<Roles[]>((resolve) => {
      setTimeout(async () => {
        const { data } = await getRoles()
        const formattedData =
          data?.map((item) => ({
            ...item,
            value: item.id,
            label: item.nombre
            // isDisabled: item.nombre === 'administrador' // no se puede asignar el rol que ya tiene
          })) ?? []
        resolve(formattedData)
      }, 1000)
    })

  const handleOnChangeEspecializaciones = (
    newValue: MultiValue<Especializaciones>
  ) => {
    const convertedValue = newValue.map((item) => ({
      id: item.id,
      id_rol: item.id_rol,
      nombre: item.nombre
    }))
    setValue('especializaciones', convertedValue)
    trigger('especializaciones')
  }

  const handleOnChangeRol = (newValue: SingleValue<Roles>) => {
    if (newValue?.nombre === 'doctor') {
      setShow(true)
    }

    if (newValue?.nombre !== 'doctor') {
      setShow(false)
    }

    setValue('roles', newValue ?? { id: '', nombre: '' })
    setValue('especializaciones', [{ id: '', nombre: '', id_rol: '' }])
    trigger('roles')
    trigger('especializaciones')
  }

  return (
    <div className='grid gap-6'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-3'>
          <div className='grid gap-1'>
            <Label className='' htmlFor='rol'>
              Rol
            </Label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              className='capitalize'
              classNames={{
                control: (base) =>
                  classNames(
                    base,
                    control,
                    errors.roles
                      ? '!border-red-500  !placeholder-red-500 !text-red-500'
                      : ''
                  ),
                option: (base) => classNames(base, option),
                multiValue: (base) => classNames(base, multiValue),
                multiValueLabel: (base) => classNames(base, multiValueLabel),
                multiValueRemove: (base) => classNames(base, multiValueRemove),
                menu: (base) => classNames(base, menu)
              }}
              noOptionsMessage={() => 'No se encontraron roles'}
              placeholder='Seleccione el Rol'
              onChange={handleOnChangeRol}
              loadOptions={promiseRoles}
            />
            {errors.roles && (
              <p className='text-xs italic text-red-500 mt-0'>
                {errors.roles?.message}
              </p>
            )}
          </div>

          {show && (
            <div className='grid gap-1'>
              <Label className='' htmlFor='genero'>
                Especialidades
              </Label>
              <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                className='capitalize'
                classNames={{
                  control: (base) =>
                    classNames(
                      base,
                      control,
                      errors.especializaciones
                        ? '!border-red-500  !placeholder-red-500 !text-red-500'
                        : ''
                    ),
                  option: (base) => classNames(base, option),
                  multiValue: (base) => classNames(base, multiValue),
                  multiValueLabel: (base) => classNames(base, multiValueLabel),
                  multiValueRemove: (base) =>
                    classNames(base, multiValueRemove),
                  menu: (base) => classNames(base, menu)
                }}
                noOptionsMessage={() => 'No se encontraron especialidades'}
                placeholder='Seleccione las Especialidades'
                onChange={handleOnChangeEspecializaciones}
                loadOptions={promiseOptionsEspecializaciones}
              />
              {errors.especializaciones && (
                <p className='text-xs italic text-red-500 mt-0'>
                  {errors.especializaciones?.message}
                </p>
              )}
            </div>
          )}

          <Button
            disabled={isPending}
            className='py-3 px-4 inline-flex bg-sec text-white items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border   hover:bg-sec-var-600  hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
          >
            {isPending && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin ' />
            )}
            Asignar Rol
          </Button>
        </div>
      </form>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}
