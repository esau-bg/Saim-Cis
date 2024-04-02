'use client'
import { useState, useEffect } from 'react'
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
export function ModalHistorialDiagnostico ({
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
  const currentPage = Number(searchParams?.page) ?? 1
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [diagnosticos, setDiagnosticos] = useState<InfoDiagnosticos | null>(null)

  useEffect(() => {
    let isMounted = true

    getDiagnosticosByExpedienteAndQuery({
      idExpediente,
      query,
      offset,
      perPage: ITEMS_PER_PAGE,
      currentPage
    }).then((data) => {
      if (isMounted) {
        setDiagnosticos(data.diagnosticos)
        setIsLoading(false)
      }
    }).catch((error) => {
      console.error('Error al obtener los datos:', error)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [idExpediente, query, currentPage])

  // obtenemos el total de paginas por el expediente y el query
  useEffect(() => {
    let isMounted = true

    getTotalPagesByExpedienteAndQuery({
      expediente: idExpediente,
      query
    }).then((data) => {
      if (isMounted) {
        setTotalPages(data)
        setIsLoading(false)
      }
    }).catch((error) => {
      console.error('Error al obtener los datos:', error)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [idExpediente, query])

  if (totalPages === null || isLoading) {
    return (
      <ToastServer message="Cargando..." />
    )
  }
  // const [diagnosticos, setDiagnosticos] = useState([])

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
