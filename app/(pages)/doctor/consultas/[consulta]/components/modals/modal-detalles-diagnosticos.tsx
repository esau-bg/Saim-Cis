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

export function ModalDetallesDiagnostico ({
  diagnostico
}: {
  diagnostico: SendInfoDiagnostico
}

) {
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
        <DialogHeader>
          <DialogTitle>
            <form className='grid gap-4'>
              <aside className='grid gap-4'>
                <div>
                  <Label className=' text-lg'>Informacion de los Diagnosticos</Label>
                </div>
                <div className='grid gap-2'>
                    <Label className='' htmlFor='Enfermedades'>
                      Enfermedades
                    </Label>
                    <div className='rounded-md border p-2 border-gray-100 dark:border-gray-900 '>

                    <Tags input={diagnostico?.enfermedades} />
                    </div>
                  </div>

                  <div className='flex w-full justify-end -mt-2'>
                    <Label htmlFor='diferencial' className='flex items-center space-x-2'>
                      <span>Es Diferencial?</span>
                      <Checkbox
                        checked={diagnostico?.diferencial}
                        disabled // Cambia el color del checkbox si lo deseas
                      />
                    </Label>
                  </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                  <div className='grid gap-2'>
                    <Label className='' htmlFor='family-name'>
                      Observacion
                    </Label>
                    <Input
                      placeholder='Obersevaciones'
                      type='text'
                      autoCapitalize='none'
                      autoComplete='family-name'
                      autoCorrect='off'
                      defaultValue={`${diagnostico?.observacion}`}
                      disabled
                    />
                  </div>
                  <div className='grid gap-2'>
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
              </aside>

              <aside className='grid gap-3'>
                  <div className='grid gap-2'>
                    <Label htmlFor='interno' className='flex items-center space-x-2'>
                      <span>Atendido Internamente</span>
                        <Checkbox disabled checked={diagnostico?.interno} />
                    </Label>
                  </div>
              </aside>
            </form>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}
