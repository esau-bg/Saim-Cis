import { getConsultasByEstadoAndQuery } from '@/app/actions'
import DataTableClient from './data-table-client'
// import { getUsersByRoleAndQuery } from "../../(actions)";

const ITEMS_PER_PAGE = 6

export default async function DataTable ({
  query,
  currentPage,
  estado
}: {
  query: string
  currentPage: number
  estado: EstadosConsultas
}) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const { consultas, error } = await getConsultasByEstadoAndQuery({
    estado,
    query,
    offset,
    perPage: ITEMS_PER_PAGE,
    currentPage
  })

  if (error) {
    console.log(error)
  }

  if (!consultas) {
    return (
      <div>
        <span>Error al obtener las consultas</span>
      </div>
    )
  }

  return (
    <>
      <div>
        <DataTableClient consultas={consultas} />
      </div>
    </>
  )
}
