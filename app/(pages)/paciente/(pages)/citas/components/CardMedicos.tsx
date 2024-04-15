'use client'

import * as React from 'react'
import classNames from 'classnames'
import { Label } from '@/components/ui/label'
import AsyncSelect from 'react-select/async'
// import { type SingleValue, type MultiValue } from 'react-select'
// import { getDoctoresByEspecializacion } from '@/app/actions'
import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
// import { type SingleValue } from 'react-select'
import LogoSaimCis from '@/components/logo-saim-cis'
import { getEspecializacionesByRol } from '@/app/(pages)/administrador/components/actions'

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
// interface Especializacion {
//   value: string
//   label: string
// }

export default function cardMedicos () {
  const [show] = React.useState(false)
  const [doctores] = React.useState<InfoMedico[]>([])
  const [doctorSelected, setDoctorSelected] = React.useState<InfoMedico | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const pathname = usePathname()
  const router = useRouter()

  const handleCardClick = (doctor: InfoMedico) => {
    setDoctorSelected(doctor)
    startTransition(() => {
      router.push(`${pathname}/${doctor.id_persona}`)
    })
  }

  // const handleOnChange = (
  //   newValue: SingleValue<Especializacion >
  // ) => {
  //   if (newValue) {
  //     startTransition(() => {
  //       getDoctoresByEspecializacion({ idEspecializacion: newValue.value }).then(({ data }) => {
  //         setDoctores(data ?? [])
  //         setShow(true)
  //       })
  //     })
  //   } else {
  //     setShow(false)
  //   }
  // }

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

  return (
    <div className='grid gap-6 px-2 py-2 justify-items-center bg-slate-100 dark:bg-slate-900'>
      {
        isPending && (
        <div className='absolute top-0 left-0 w-full h-full bg-white/50 dark:bg-black/50 z-50 flex items-center  justify-center'>
          <div className='flex flex-col justify-center items-center animate-bounce animate-infinite'>
            <div role='status'>
              <LogoSaimCis className='h-16 w-16 ' />
            </div>

            {/* <p>Cargando...</p> */}
          </div>
        </div>
        )
      }
      <form>
          <div className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="grid gap-2">
            <div className='flex flex-col text-center'>
            <Label className='text-xl' htmlFor='rol'>
              Agendar Cita
            </Label>
            <p className='text-neutral-500'>
            Seleccione una especialidad para posteriormente seleccionar un doctor
            </p>
            </div>
            <AsyncSelect
              cacheOptions
              defaultOptions
              className='capitalize'
              classNames={{
                control: (base) =>
                  classNames(
                    base,
                    control
                  ),
                option: (base) => classNames(base, option),
                multiValue: (base) => classNames(base, multiValue),
                multiValueLabel: (base) => classNames(base, multiValueLabel),
                multiValueRemove: (base) => classNames(base, multiValueRemove),
                menu: (base) => classNames(base, menu)
              }}
              noOptionsMessage={() => 'No se encontraron Especializaciones'}
              placeholder='Seleccione la Especializacion'
              // onChange={handleOnChange}
              loadOptions={promiseOptions}
            />
          </div>
        </div>
        </div>
      </form>

      {show && (

        <>
        {
          doctores.length > 0 ? (
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 p-6">
            {doctores.map((doctor) => (
            <Card key={doctor.id_persona} onClick={() => { handleCardClick(doctor) }} className={` overflow-hidden hover:scale-105 transition-transform cursor-pointer ${
              doctorSelected?.id_persona === doctor.id_persona ? 'ring-2 ring-ring ring-sec ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' : ''

            }`} >
              <CardContent className=" p-1 relative">
                 <img
                   className="w-100  object-cover shadow-sm rounded-lg aspect-square border-white dark:border-slate-900 bg-sec"
                   src={doctor.personas?.idUsuario.map(usuario => usuario.avatar_url ??
                     'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png').join(', ')}
                 />
                 <CardFooter className=" w-full flex-col overflow-hidden absolute bg-white/30 bottom-0 start-0 border-t-1 border-zinc-100/50 justify-between p-2 backdrop-blur-sm">
                   <p className="text-tiny text-sec uppercase font-bold w-full">{doctor.personas?.nombre} {doctor.personas?.apellido}</p>
                   <p className="text-tiny text-neutral-500 capitalize text-sm w-full">Jornada: {doctor.personas?.idJornada?.jornada}</p>
                   <span className="text-black font-medium w-full truncate">{doctor.personas?.idUsuario.map(usuario => usuario.correo).join(', ')}</span>
                 </CardFooter>
              </CardContent>
            </Card>
            ))}
          </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-32 text-center">
              <h3 className='text-slate-600 dark:text-slate-400 text-lg'>Oops!</h3>
              <span className=' text-slate-500'>No se encontraron doctores</span>
            </div>
          )
        }

        </>

      )}
    </div>

  )
}
