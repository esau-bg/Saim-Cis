'use client'

import * as React from 'react'
import classNames from 'classnames'
import { Label } from '@/components/ui/label'
import AsyncSelect from 'react-select/async'
import { Card, CardHeader, Image } from '@nextui-org/react'
// import { type SingleValue, type MultiValue } from 'react-select'
import { getDoctoresByEspecializacion, getEspecializacionesByDoctor } from '@/app/actions'

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
  // const router = useRouter()
  const handleOnChange = async (selectedOption: Especializacion | null) => {
    if (selectedOption) {
      const { data: doctoresData, error: errorDoctor } = await getDoctoresByEspecializacion({ idEspecializacion: selectedOption.value })
      if (!errorDoctor) {
        setDoctores(doctoresData || [])
        setShow(true)
      }
    }
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
    <div className='grid gap-6'>
      <form>
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
              onChange={handleOnChange}
              loadOptions={promiseEspecializaciones}
            />
          </div>
        </div>
      </form>

      {show && (
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        {doctores.map(doctores => (
          <Card key={doctores.id} className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">{doctores.nombre}</p>
              <h4 className="text-white font-medium text-large">{doctores.apellido}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={doctores.avatar_url}
            />
          </Card>
        ))}
      </div>
      )}
    </div>
  )
}
