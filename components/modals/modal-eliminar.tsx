'use client'

import {
  AlertDialog,
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
import { deletePersona } from '@/app/actions'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Icons } from '../icons'

export function AlertModalDeleteUser ({
  persona
}: {
  persona: Personas | null
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleDeleteUser () {
    startTransition(async () => {
      const { error } = await deletePersona({ id: persona?.id ?? '' })
      if (error) {
        console.log('Error al eliminar el usuario:', error)
        toast.error('Error al eliminar el usuario')
        return
      }
      if (!error) {
        router.refresh()
        console.log('Usuario eliminado correctamente')
        toast.success('Usuario eliminado correctamente')
      }
    })
  }

  return (
    <>

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
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
            <Button
              variant={'ghost'}
              onClick={handleDeleteUser}
              className=' text-red-500 dark:bg-red-900/25  bg-red-100/50 hover:text-white  hover:bg-red-500 dark:hover:bg-red-500/80'
            >
              {
                isPending
                  ? <Icons.spinner className='h-4 w-4 mr-1 animate-spin' />
                  : <TrashIcon className='h-4 w-4 mr-1' />
              }
              Eliminar
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>

    </>
  )
}
