'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'
import { TrashIcon } from '@heroicons/react/20/solid'

export function AlertModalDeleteUser ({
  persona
}: {
  persona: Personas | null
}) {
  function handleDeleteUser () {
    console.log(`Eliminando usuario ${persona?.nombre} ${persona?.apellido}`)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'ghost'}
          className='justify-start font-normal hover:text-red-500 dark:hover:bg-red-900/25  hover:bg-red-100/50'
        >
          <TrashIcon className='h-4 w-4 mr-1' />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar el usuario:{' '}
            <strong>
              {persona?.nombre} {persona?.apellido}
            </strong>
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={'ghost'}
              onClick={handleDeleteUser}
              className=' text-red-500 dark:bg-red-900/25  bg-red-100/50 hover:text-white  hover:bg-red-500 dark:hover:bg-red-500/80'
            >
              <TrashIcon className='h-4 w-4 mr-1' />
              Eliminar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
