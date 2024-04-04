'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { UserIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'

import { AdministradorRolEspecializacion } from './forms/form-rol-especializacion'

export function ModalAgregarRolEspecializacion ({ persona }: { persona: Personas | null }) {
  if (!persona) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='justify-start font-normal  '>
          <UserIcon className='h-4 w-4 mr-1' />
          Asignar Rol
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Rol</DialogTitle>
          <DialogDescription>Agregar un rol a <strong>{persona.nombre} {persona.apellido}</strong></DialogDescription>
        </DialogHeader>
        <AdministradorRolEspecializacion persona={persona} />
      </DialogContent>
    </Dialog>
  )
}
