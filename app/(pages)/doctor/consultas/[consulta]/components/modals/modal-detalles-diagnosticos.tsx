'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Tags from '@/components/tags'
import { Checkbox } from '@/components/ui/checkbox'
import { getConsultaByIdDiagnostico } from '@/app/(pages)/doctor/actions'
import React, { useEffect } from 'react'

export function ModalDetallesDiagnostico ({
  diagnostico
}: {
  diagnostico: SendInfoDiagnostico
}

) {
  const [consultas, setConsultas] = React.useState<consultaDiagnostico[]>([])
  useEffect(() => {
    const fetchConsultas = async () => {
      const { consultaDiagnostico, errorConsultaDiagnostico } = await getConsultaByIdDiagnostico({ idDiagnostico: diagnostico.id_diagnostico })

      if (!errorConsultaDiagnostico) {
        setConsultas(consultaDiagnostico ?? [])
      } else {
        // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
        console.error('Error al obtener consultas:', errorConsultaDiagnostico)
      }
    }

    fetchConsultas()
  }, [diagnostico.id_diagnostico])
  return (

    <Dialog >
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button variant={'outline'} className="justify-start font-normal duration-500 hover:bg-sec hover:text-white">
            Ver Detalles
            <PlusIcon className="h-4 w-4 ml-1" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
      <main className="relative container">
        <aside className='border-b py-4'>
          {consultas.map((consulta, index) => (
            <div key={index} className='border-b py-4'>
              <div className='flex flex-col items-center'>
                <Label className='text-lg p-0'>Informacion de los Diagnosticos</Label>
              </div>
              <div className="flex flex-col gap-2 my-2">
                <div className='flex justify-between'>
                  <Label className=''>Peso:</Label>
                  <Label className=''>{consulta.consultas?.peso} kg/g</Label>
                </div>
                <div className='flex justify-between'>
                  <Label className=''>Estatura:</Label>
                  <Label className=''>{consulta.consultas?.estatura} metros</Label>
                </div>
                <div className='flex justify-between'>
                  <Label className=''>Temperatura:</Label>
                  <Label className=''>{consulta.consultas?.temperatura} °C</Label>
                </div>
                <div className='flex justify-between'>
                  <Label className=''>Presion Arterial:</Label>
                  <Label className=''>{consulta.consultas?.presion_arterial} mm Hg</Label>
                </div>
                <div className='flex justify-between'>
                  <Label className=''>Saturación en Oxigeno:</Label>
                  <Label className=''>{consulta.consultas?.saturacion_oxigeno}%</Label>
                </div>
              </div>
              <div className="flex flex-col gap-2 my-2">
                <div className='flex justify-between'>
                  <Label className=''>Fecha de la consulta:</Label>
                  <Label>
                    {consulta.consultas?.fecha_consulta
                      ? new Date(consulta?.consultas?.fecha_consulta).toLocaleDateString(
                        'es-HN',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }
                      )
                      : 'No disponible'}
                  </Label>
                </div>
                <div className='flex justify-between'>
                <Label className=''>Sintomas:</Label>
                  <Label className='capitalize'>{consulta.consultas?.sintomas}</Label>
                </div>
              </div>
              <div className="flex flex-col gap-2 my-2">
                <div className='flex justify-between'>
                  <Label className=''>DNI del Doctor: </Label>
                  <Label className=''>{consulta.id_diagnosticador?.dni ?? 'N/A'}</Label>
                </div>
                <div className='flex justify-between'>
                  <Label className=''>Nombre del Doctor: </Label>
                  <Label>{consulta.id_diagnosticador?.nombre} {consulta.id_diagnosticador?.apellido}</Label>
                </div>
                <div className='flex justify-between'>
                  <Label className=''>Sexo: </Label>
                  <Label className=''>{consulta.id_diagnosticador?.genero ?? 'N/A'}</Label>
                </div>
              </div>

            </div>
          ))}
        </aside>
      </main>

      <DialogHeader>
        <DialogTitle>
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <Label className='' htmlFor='Enfermedades'>
                Enfermedades
              </Label>
              <div className='rounded-md border p-2 border-gray-100 dark:border-gray-900 '>
                <Tags input={diagnostico?.enfermedades} />
              </div>
            </div>

            <div className='flex items-center justify-end mt-0'>
              <Label htmlFor='diferencial' className='flex items-center space-x-2'>
                <span>Es Diferencial?</span>
                <Checkbox
                  checked={diagnostico?.diferencial}
                  disabled // Cambia el color del checkbox si lo deseas
                />
              </Label>
            </div>

            <div className='flex flex-col gap-4 sm:flex-row sm:gap-4'>
              <div className='flex flex-col gap-2'>
                <Label className='' htmlFor='family-name'>
                  Observacion
                </Label>
                <Input
                  placeholder='Observaciones'
                  type='text'
                  autoCapitalize='none'
                  autoComplete='family-name'
                  autoCorrect='off'
                  defaultValue={`${diagnostico?.observacion}`}
                  disabled
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label className='' htmlFor='Fecha-Diagnostico'>
                  Fecha de Diagnostico
                </Label>
                <Input
                  placeholder='Fecha-Diagnostico'
                  type='text'
                  autoCapitalize='none'
                  autoComplete='first-name'
                  autoCorrect='off'
                  autoFocus
                  defaultValue={diagnostico.fecha_diagnostico
                    ? new Date(diagnostico.fecha_diagnostico).toLocaleDateString(
                      'es-ES',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                      }
                    )
                    : 'No disponible'}
                  disabled
                />
              </div>
            </div>

            <div className='flex gap-3'>
              <div className='flex gap-2 items-center'>
                <span>Atendido Internamente</span>
                <Checkbox disabled checked={diagnostico?.interno} />
              </div>
            </div>
          </form>
        </DialogTitle>
      </DialogHeader>

      </DialogContent>
    </Dialog>

  )
}
