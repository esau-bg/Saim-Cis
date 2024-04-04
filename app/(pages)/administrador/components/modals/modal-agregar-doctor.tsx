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

import { AdministradorDoctorForm } from '../forms/form-doctor'

export function ModalAgregarDoctor () {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant={'outline'} className="justify-start font-normal duration-500 hover:bg-sec hover:text-white">
          Agregar Doctor
        <PlusIcon className="h-4 w-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Agregar doctor
          </DialogTitle>
          <DialogDescription>
            Ingrese los datos del doctor
          </DialogDescription>
        </DialogHeader>
        <AdministradorDoctorForm/>

      </DialogContent>
    </Dialog>
  )
}
