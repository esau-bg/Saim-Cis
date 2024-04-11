'use client'

import * as React from 'react'
import classNames from 'classnames'
import { Label } from '@/components/ui/label'
import AsyncSelect from 'react-select/async'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
// import { type SingleValue, type MultiValue } from 'react-select'
import { getDoctoresByEspecializacion, getEspecializacionesByDoctor } from '@/app/actions'
import { usePathname, useRouter } from 'next/navigation'

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
interface Especializacion {
  value: string
  label: string
}

export default function cardMedicos () {
  const [show, setShow] = React.useState(false)
  const [doctores, setDoctores] = React.useState<InfoMedico[]>([])
  const pathname = usePathname()
  const router = useRouter()

  const handleCardClick = (doctor: InfoMedico) => {
    router.push(`${pathname}/${doctor.id_persona}`)
    router.refresh()
  }

  const handleOnChange = async (selectedOption: Especializacion | null) => {
    if (selectedOption) {
      const { data: doctoresData, error: errorDoctor } = await getDoctoresByEspecializacion({ idEspecializacion: selectedOption.value })
      if (!errorDoctor) {
        setDoctores(doctoresData ?? [])
        setShow(true)
      }
    } else {
      setShow(false) // Desactivar el estado show si no se selecciona ninguna opción
    }
  }

  const handleMenuOpen = () => {
    setShow(false) // Activar el estado show cuando se abre el menú
  }

  const promiseEspecializaciones = async () =>
    await new Promise<Especializaciones[]>((resolve) => {
      setTimeout(async () => {
        const { data } = await getEspecializacionesByDoctor()
        const formattedData =
          data?.map((item) => ({
            ...item,
            value: item.id,
            label: item.nombre
          })) ?? []
        resolve(formattedData)
      }, 1000)
    })

  return (
    <div className='grid gap-6 px-2 py-2'>
      <form>
      <div className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
            <Label className='' htmlFor='rol'>
              Seleccione una especialidad para posteriormente seleccionar un doctor
            </Label>
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
              onMenuOpen={handleMenuOpen}
              onChange={handleOnChange}
              loadOptions={promiseEspecializaciones}
            />
          </div>
        </div>
        </div>
      </form>

      {show && (
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {doctores.map((doctor) => (
        <Card isFooterBlurred shadow="sm" key={doctor.id_persona} isPressable onPress={() => { handleCardClick(doctor) }} >
          <CardBody className="overflow-visible p-0">
             <img
               className="w-100 object-cover shadow-sm rounded-lg aspect-square border-white dark:border-slate-900 bg-sec"
               src={doctor.personas?.idUsuario.map(usuario => usuario.avatar_url ??
                 'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png').join(', ')}
             />
             <CardFooter className="!items-start flex-col absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
               <p className="text-tiny text-black/60 uppercase font-bold">{doctor.personas?.nombre} {doctor.personas?.apellido}</p>
               <p className="text-tiny text-black/60 uppercase font-bold">Jornada: {doctor.personas?.idJornada?.jornada}</p>
               <h4 className="text-black font-medium text-large">{doctor.personas?.idUsuario.map(usuario => usuario.correo).join(', ')}</h4>
             </CardFooter>
          </CardBody>
        </Card>
        ))}
      </div>

      )}
    </div>

  )
}
