'use client'

import * as React from 'react'
import classNames from 'classnames'
import { Label } from '@/components/ui/label'
import AsyncSelect from 'react-select/async'
// import { type SingleValue, type MultiValue } from 'react-select'
import { getDoctoresByEspecializacion, getEspecializacionesByDoctor } from '@/app/actions'
import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

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
  const [show, setShow] = React.useState(true)
  const [doctores, setDoctores] = React.useState<InfoMedico[]>([
    {
      id_especializacion: '4769744e-92a7-402e-91c4-b9a8ce4fcfa9',
      id_persona: '90b4168c-8aa6-4548-9055-4c00bf36ee32',
      personas: {
        nombre: 'Esdras',
        apellido: 'Banegas',
        idJornada: {
          jornada: 'Matutina'
        },
        idUsuario: [
          {
            correo: 'banegasesau15@gmail.com',
            avatar_url: 'https://res.cloudinary.com/dlfdaiz5u/image/upload/v1710346313/saim-cis/fdj50578vv9eucqn8ghp.webp'
          }
        ]
      }
    },
    {
      id_especializacion: '4769744e-92a7-402e-91c4-b9a8ce4fcfa9',
      id_persona: '3c185d8c-f0bf-4c48-988c-2909fa576c14',
      personas: {
        nombre: 'Sara',
        apellido: 'Banegas',
        idJornada: {
          jornada: 'Vespertina'
        },
        idUsuario: [
          {
            correo: 'tesir28163@glaslack.com',
            avatar_url: null
          }
        ]
      }
    },
    {
      id_especializacion: '4769744e-92a7-402e-91c4-b9a8ce4fcfa9',
      id_persona: '05009338-ea34-4293-95c2-c4e635579e49',
      personas: {
        nombre: 'Andrea',
        apellido: 'Martinez',
        idJornada: {
          jornada: 'Vespertina'
        },
        idUsuario: [
          {
            correo: 'andrea.martinez@unah.edu.hn',
            avatar_url: null
          }
        ]
      }
    },
    {
      id_especializacion: '4769744e-92a7-402e-91c4-b9a8ce4fcfa9',
      id_persona: '498c9a13-9479-4917-a7de-b9e84a25be52',
      personas: {
        nombre: 'Jorge',
        apellido: 'Martinez',
        idJornada: {
          jornada: 'Matutina'
        },
        idUsuario: [
          {
            correo: 'ceweco3572@agromgt.com',
            avatar_url: null
          }
        ]
      }
    }
  ])
  const [doctorSelected, setDoctorSelected] = React.useState<InfoMedico | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const handleCardClick = (doctor: InfoMedico) => {
    setDoctorSelected(doctor)
    router.push(`${pathname}/${doctor.id_persona}`)
    router.refresh()
  }

  const handleOnChange = async (selectedOption: Especializacion | null) => {
    if (selectedOption) {
      const { data: doctoresData, error: errorDoctor } = await getDoctoresByEspecializacion({ idEspecializacion: selectedOption.value })
      console.log(doctoresData, errorDoctor)
      if (!errorDoctor) {
        setDoctores(doctoresData ?? [])
        setShow(true)
      }
    } else {
      setShow(false) // Desactivar el estado show si no se selecciona ninguna opción
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
    <div className='grid gap-6 px-2 py-2 justify-items-center bg-slate-100 dark:bg-slate-900'>
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
              onChange={handleOnChange}
              loadOptions={promiseEspecializaciones}
            />
          </div>
        </div>
        </div>
      </form>

      {show && (
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
             <CardFooter className=" w-full flex-col overflow-hidden absolute bg-white/30 bottom-0 start-0 border-t-1 border-zinc-100/50 z-10 justify-between p-2 backdrop-blur-sm">
               <p className="text-tiny text-sec uppercase font-bold w-full">{doctor.personas?.nombre} {doctor.personas?.apellido}</p>
               <p className="text-tiny text-neutral-500 capitalize text-sm w-full">Jornada: {doctor.personas?.idJornada?.jornada}</p>
               <span className="text-black font-medium w-full truncate">{doctor.personas?.idUsuario.map(usuario => usuario.correo).join(', ')}</span>
             </CardFooter>
          </CardContent>
        </Card>
        ))}
      </div>

      )}
    </div>

  )
}
