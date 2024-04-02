'use server'
import { getDiagnosticosByExpedienteAndQuery } from '@/app/(pages)/doctor/actions'
import { ViewDiagnosticsClient } from './view-diagnostics-client'

const ITEMS_PER_PAGE = 6

export async function ViewDiagnostics ({
  query,
  currentPage,
  expediente,
  onDataLoaded
}: {
  query?: string
  currentPage: number
  expediente: string
  onDataLoaded: () => void
}) {
  const safeQuery = query ?? ''
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const { diagnosticos, error } = await getDiagnosticosByExpedienteAndQuery({
    expediente,
    safeQuery,
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
        <span>Error al obtener los diagnosticos</span>
      </div>
    )
  }

  onDataLoaded()
  return (
    <>
      <div>
        {/* <ViewDiagnosticsClient diagnosticos={diagnosticos} /> */}
        {JSON.stringify(diagnosticos)}
      </div>
    </>
  )
}
