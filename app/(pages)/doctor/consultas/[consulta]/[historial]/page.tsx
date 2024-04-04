import React, { Suspense } from 'react'
import { getTotalPagesByExpedienteAndQuery } from '../../../actions'
import ToastServer from '@/components/toast-server'
import TitlePage from '@/components/title-page'
import DataTable from './components/data-table'
import Pagination from '@/components/pagination'
import { getPacienteByExpediente } from '@/app/actions'

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
  const currentPage = Number(searchParams?.page) ?? 1
  const expediente = params.historial

  // obtenemos el total de paginas por el expediente y el query
  const { totalPages, errortotalPages } = await getTotalPagesByExpedienteAndQuery({
    expediente,
    query
  })

  if (errortotalPages) {
    <ToastServer message="Error al obtener el total de páginas del Expediente" />
  }
  if (totalPages === null) {
    return (
      <ToastServer message="Error al obtener el total de páginas por el rol y el query" />
    )
  }
  const { dataExpediente, errorDataExpediente } = await getPacienteByExpediente({
    expediente
  })

  if (errorDataExpediente) {
    <ToastServer message="Error al obtener el numero de expediente" />
  }

  return (
    <div className="w-full px-8 py-2">
      <div className="my-2 flex flex-row flex-wrap w-full gap-6">
        <TitlePage title="Diagnosticos" description="Historial de Diagnósticos" />
        <div className='flex flex-col justify-end mb-2'>
          <span className="text-lg font-semibold">Paciente: {dataExpediente?.personas?.nombre} {dataExpediente?.personas?.apellido}</span>
          <span className="text-base font-normal">N° Expediente: {dataExpediente?.id}</span>
        </div>
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
