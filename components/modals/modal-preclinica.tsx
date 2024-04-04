'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { FormPreclinica } from './forms/form-preclinica'
import { Button } from '../ui/button'
import { PlusIcon } from '@heroicons/react/20/solid'

export function ModalPreclinica ({ persona }: { persona: Personas | null }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="justify-start font-normal  ">
        <PlusIcon className="h-4 w-4 mr-1" />
          Agregar consulta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Agregar consulta a {persona?.nombre} {persona?.apellido}
          </DialogTitle>
          <DialogDescription>
            Agregue los datos de la consulta del paciente
          </DialogDescription>
        </DialogHeader>
        <FormPreclinica id={persona?.id ?? ''} />

      </DialogContent>
    </Dialog>
  )
}
