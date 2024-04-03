import React, { Suspense } from 'react'
import { getTotalPagesByExpedienteAndQuery } from '../../../actions'
import ToastServer from '@/components/toast-server'
import TitlePage from '@/components/title-page'
import Search from '@/components/search-query'
import DataTable from './components/data-table'
import Pagination from '@/components/pagination'

export default async function pageHistorial ({
  params,
  searchParams
}: {
  params: {
    consulta: string
    historial: string
  }
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query ?? ''
  console.log(params.historial)
  const currentPage = Number(searchParams?.page) ?? 1

  // obtenemos el total de paginas por el expediente y el query
  const totalPages = await getTotalPagesByExpedienteAndQuery({
    expediente: params.historial,
    query: query
  })

  if (totalPages === null) {
    return (
      <ToastServer message="Error al obtener el total de páginas por el rol y el query" />
    )
  }

  return (
    <div className="w-full px-8 py-2">
      <TitlePage title="Diagnosticos" description="Historial de Diagnósticos" />
      <div className="my-2 flex items-center  gap-2 md:mt-8">
        <Search placeholder="Buscar Diagnóstico..." debounce={200} />
        {/* <AgregarPaciente /> */}
      </div>
      <Suspense fallback={<span>Cargando...</span>}>
        <DataTable query={query} currentPage={currentPage} idExpediente={params.historial} />
      </Suspense>
      <div className="my-2 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
