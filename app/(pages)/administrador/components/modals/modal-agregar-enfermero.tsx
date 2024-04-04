'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'

import { AdministradorEnfermeroForm } from '../forms/form-enfermero'

export function ModalAgregarEnfermero () {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant={'outline'} className="justify-start font-normal duration-500 hover:bg-sec hover:text-white">
          Agregar Enfermero
        <PlusIcon className="h-4 w-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Agregar enfermero
          </DialogTitle>
          <DialogDescription>
            Ingrese los datos del enfermero
          </DialogDescription>
        </DialogHeader>
        <AdministradorEnfermeroForm/>

      </DialogContent>
    </Dialog>
  )
}
