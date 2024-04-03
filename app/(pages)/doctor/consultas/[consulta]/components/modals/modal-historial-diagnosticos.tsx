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

import { getDiagnosticosByExpedienteAndQuery, getTotalPagesByExpedienteAndQuery } from '@/app/(pages)/doctor/actions'
import ToastServer from '@/components/toast-server'
import { ViewDiagnosticsClient } from '../view-diagnostics-client'
import Search from '@/components/search-query'

const ITEMS_PER_PAGE = 6
export async function ModalHistorialDiagnostico ({
  idExpediente,
  searchParams
}: {
  idExpediente: string
  searchParams?: {
    query?: string
    page?: string
  }
}
) {
  const query = searchParams?.query ?? ''
  console.log(query)
  const currentPage = Number(searchParams?.page) ?? 1
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const totalPages = await getTotalPagesByExpedienteAndQuery({
    expediente: idExpediente,
    query
  })

  if (totalPages === null) {
    return (
      <ToastServer message="Error al obtener el total de páginas del Expediente" />
    )
  }

  const { diagnosticos, error } = await getDiagnosticosByExpedienteAndQuery({
    idExpediente,
    query,
    offset,
    perPage: ITEMS_PER_PAGE,
    currentPage
  })

  if (error) {
    console.log(error)
  }

  if (!diagnosticos) {
    return (
      <div>
        <span>Error al obtener todos los diagnosticos</span>
      </div>
    )
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button variant={'outline'} className="justify-start font-normal duration-500 hover:bg-sec hover:text-white">
          Ver Historial
          <PlusIcon className="h-4 w-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ver Historial de Diagnosticos
          </DialogTitle>
          <DialogDescription>
            Expediente: {idExpediente}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center  gap-2 ">
          <Search placeholder="Buscar diagnóstico..." debounce={200} />
          {/* <AgregarPaciente /> */}
        </div>
        {totalPages !== null ? (
          <ViewDiagnosticsClient diagnosticos={diagnosticos} />
        ) : (
          <ToastServer message="Error al obtener el total de páginas por el numero de expediente" />
        )}
      </DialogContent>
    </Dialog>
  )
}
