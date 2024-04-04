import DataTableClient from './data-table-client'
import { getDiagnosticosByExpedienteAndQuery } from '../../../../actions'

const ITEMS_PER_PAGE = 6

export default async function DataTable ({
  query,
  currentPage,
  idExpediente
}: {
  query: string
  currentPage: number
  idExpediente: string
}) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

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
    <>
      <div>
        <DataTableClient diagnosticos={diagnosticos} />
      </div>
    </>
  )
}
