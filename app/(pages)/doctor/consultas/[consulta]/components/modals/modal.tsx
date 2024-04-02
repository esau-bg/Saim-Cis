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

export function Modal ({
  diagnostico
}: {
  diagnostico: SendInfoDiagnostico
}

) {
  return (
    <div className="bg-blue-100 w-50 h-50">
    <Dialog >

    <DialogTrigger asChild>
      <Button variant={'outline'} className="justify-start font-normal duration-500 hover:bg-sec hover:text-white">
        Ver
        <PlusIcon className="h-4 w-4 ml-1" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Ver Diagnostico
          <p className="text-sm text-gray-500">
            {diagnostico.enfermedades}
          </p>
        </DialogTitle>
      </DialogHeader>
    </DialogContent>
    </Dialog>
    </div>

  )
}
